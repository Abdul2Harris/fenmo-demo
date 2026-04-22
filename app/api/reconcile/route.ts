import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import { prisma } from "@/lib/prisma";
import { reconcile } from "@/lib/reconcile";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const bankFile = formData.get("bank") as File;
  const ledgerFile = formData.get("ledger") as File;

  if (!bankFile || !ledgerFile) {
    return NextResponse.json({ error: "Both files required" }, { status: 400 });
  }

  // Parse CSVs
  const bankText = await bankFile.text();
  const ledgerText = await ledgerFile.text();

  const bankRows = Papa.parse<Record<string, string>>(bankText, { header: true, skipEmptyLines: true }).data;
  const ledgerRows = Papa.parse<Record<string, string>>(ledgerText, { header: true, skipEmptyLines: true }).data;

  // Save to DB
  await prisma.reconciliationResult.deleteMany();
  await prisma.bankTransaction.deleteMany();
  await prisma.ledgerEntry.deleteMany();

  const savedBank = await Promise.all(
    bankRows.map((r) =>
      prisma.bankTransaction.create({
        data: {
          date: r.date,
          description: r.description,
          amount: parseFloat(r.amount) || 0,
          reference: r.reference || null,
        },
      })
    )
  );

  const savedLedger = await Promise.all(
    ledgerRows.map((r) =>
      prisma.ledgerEntry.create({
        data: {
          date: r.date,
          vendor: r.vendor,
          amount: parseFloat(r.amount) || 0,
          invoiceNumber: r.invoice_number || null,
        },
      })
    )
  );

  // Run reconciliation
  const result = reconcile(
    savedBank.map((b) => ({ id: b.id, date: b.date, description: b.description, amount: b.amount, reference: b.reference ?? undefined })),
    savedLedger.map((l) => ({ id: l.id, date: l.date, vendor: l.vendor, amount: l.amount, invoiceNumber: l.invoiceNumber ?? undefined }))
  );

  // Save results to DB
  await Promise.all([
    ...result.matched.map((m) =>
      prisma.reconciliationResult.create({
        data: { bankId: m.bank.id, ledgerId: m.ledger.id, confidence: m.confidence, note: m.note },
      })
    ),
    ...result.unmatchedBank.map((b) =>
      prisma.reconciliationResult.create({
        data: { bankId: b.id, confidence: "unmatched_bank", note: "No matching ledger entry" },
      })
    ),
    ...result.unmatchedLedger.map((l) =>
      prisma.reconciliationResult.create({
        data: { ledgerId: l.id, confidence: "unmatched_ledger", note: "Payment not received" },
      })
    ),
  ]);

  return NextResponse.json(result);
}