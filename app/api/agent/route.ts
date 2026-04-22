import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { askFinanceAgent } from "@/lib/agent";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json({ error: "Question required" }, { status: 400 });
  }

  // Fetch all transactions from DB
  const bank = await prisma.bankTransaction.findMany();
  const ledger = await prisma.ledgerEntry.findMany();

  const answer = await askFinanceAgent(question, { bank, ledger });

  return NextResponse.json({ answer });
}