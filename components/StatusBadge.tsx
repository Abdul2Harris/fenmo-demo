import { Check, X, AlertTriangle, Info } from 'lucide-react';

type Confidence = 'exact' | 'fuzzy' | 'unmatched_bank' | 'unmatched_ledger';

const config: Record<Confidence, { className: string; label: string; Icon: React.ElementType }> = {
  exact:            { className: 'bg-green-light text-green',        label: 'Matched',          Icon: Check },
  fuzzy:            { className: 'bg-amber-light text-amber',        label: 'Fuzzy',            Icon: AlertTriangle },
  unmatched_bank:   { className: 'bg-red-light text-red',            label: 'Unmatched Bank',   Icon: X },
  unmatched_ledger: { className: 'bg-accent-light text-accent',      label: 'Unmatched Ledger', Icon: Info },
};

export default function StatusBadge({ confidence }: { confidence: Confidence }) {
  const { className, label, Icon } = config[confidence];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-[12px] font-semibold whitespace-nowrap ${className}`}>
      <Icon size={11} strokeWidth={2.5} />
      {label}
    </span>
  );
}
