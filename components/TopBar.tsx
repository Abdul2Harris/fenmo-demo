'use client';
import { Download } from 'lucide-react';
import { Button } from 'antd';

interface TopBarProps {
  hasResults: boolean;
  onExport: () => void;
}

export default function TopBar({ hasResults, onExport }: TopBarProps) {
  return (
    <header className="h-[60px] px-8 flex items-center justify-between bg-surface border-b border-border sticky top-0 z-10">
      <div>
        <h1 className="m-0 text-[16px] font-bold text-text1">Bank Reconciliation</h1>
        <p className="m-0 text-[12px] text-text3">Upload CSV files to begin</p>
      </div>
      {hasResults && (
        <Button
          onClick={onExport}
          icon={<Download size={14} />}
          className="flex items-center gap-1.5 font-semibold rounded"
        >
          Export Results
        </Button>
      )}
    </header>
  );
}
