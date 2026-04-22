export type BankRow = {
  id: string;
  date: string;
  description: string;
  amount: number;
  reference?: string;
};

export type LedgerRow = {
  id: string;
  date: string;
  vendor: string;
  amount: number;
  invoiceNumber?: string;
};

export type MatchResult = {
  matched: {
    bank: BankRow;
    ledger: LedgerRow;
    confidence: "exact" | "fuzzy";
    note?: string;
  }[];
  unmatchedBank: BankRow[];
  unmatchedLedger: LedgerRow[];
};

function daysDiff(d1: string, d2: string): number {
  return Math.abs(
    (new Date(d1).getTime() - new Date(d2).getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function reconcile(bank: BankRow[], ledger: LedgerRow[]): MatchResult {
  const matched: MatchResult["matched"] = [];
  const usedBank = new Set<string>();
  const usedLedger = new Set<string>();

  // Pass 1 — Exact match (same amount + same date)
  for (const b of bank) {
    for (const l of ledger) {
      if (usedBank.has(b.id) || usedLedger.has(l.id)) continue;
      if (Math.abs(b.amount - l.amount) < 0.01 && b.date === l.date) {
        matched.push({ bank: b, ledger: l, confidence: "exact" });
        usedBank.add(b.id);
        usedLedger.add(l.id);
      }
    }
  }

  // Pass 2 — Fuzzy match (same amount + date within 3 days)
  for (const b of bank) {
    for (const l of ledger) {
      if (usedBank.has(b.id) || usedLedger.has(l.id)) continue;
      if (Math.abs(b.amount - l.amount) < 0.01 && daysDiff(b.date, l.date) <= 3) {
        matched.push({
          bank: b,
          ledger: l,
          confidence: "fuzzy",
          note: `Date differs by ${Math.round(daysDiff(b.date, l.date))} day(s) — possible processing delay`,
        });
        usedBank.add(b.id);
        usedLedger.add(l.id);
      }
    }
  }

  return {
    matched,
    unmatchedBank: bank.filter((b) => !usedBank.has(b.id)),
    unmatchedLedger: ledger.filter((l) => !usedLedger.has(l.id)),
  };
}