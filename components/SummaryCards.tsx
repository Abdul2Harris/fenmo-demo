'use client';

interface SummaryData {
  exact: number;
  fuzzy: number;
  unmatchedBank: number;
  unmatchedLedger: number;
}

const cards = [
  { key: 'exact',          label: 'Exact Matches',     borderColor: 'var(--green)'  },
  { key: 'fuzzy',          label: 'Fuzzy Matches',     borderColor: 'var(--amber)'  },
  { key: 'unmatchedBank',  label: 'Unmatched Bank',    borderColor: 'var(--red)'    },
  { key: 'unmatchedLedger',label: 'Unmatched Ledger',  borderColor: 'var(--accent)' },
] as const;

export default function SummaryCards({ data }: { data: SummaryData }) {
  return (
    <div className="flex gap-4 mb-6">
      {cards.map(({ key, label, borderColor }) => (
        <div
          key={key}
          className="flex-1 bg-surface rounded-lg border border-border shadow-sm p-5 animate-[countUp_0.4s_ease]"
          style={{ borderTop: `3px solid ${borderColor}` }}
        >
          <div className="text-[28px] font-bold font-mono tracking-tight text-text1">
            {data[key]}
          </div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.04em] text-text3 mt-1">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
