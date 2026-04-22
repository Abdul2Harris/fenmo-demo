'use client';
import { useState } from 'react';
import { Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import StatusBadge from './StatusBadge';

type Confidence = 'exact' | 'fuzzy' | 'unmatched_bank' | 'unmatched_ledger';

interface TableRow {
  key: string;
  confidence: Confidence;
  bankDate?: string;
  bankDescription?: string;
  bankAmount?: number;
  bankReference?: string;
  ledgerDate?: string;
  ledgerVendor?: string;
  ledgerAmount?: number;
  ledgerInvoice?: string;
  note?: string;
}

interface MatchResult {
  matched: {
    bank: { id: string; date: string; description: string; amount: number; reference?: string };
    ledger: { id: string; date: string; vendor: string; amount: number; invoiceNumber?: string };
    confidence: 'exact' | 'fuzzy';
    note?: string;
  }[];
  unmatchedBank: { id: string; date: string; description: string; amount: number; reference?: string }[];
  unmatchedLedger: { id: string; date: string; vendor: string; amount: number; invoiceNumber?: string }[];
}

const columns: ColumnsType<TableRow> = [
  {
    title: 'Status',
    dataIndex: 'confidence',
    width: 160,
    render: (v: Confidence) => <StatusBadge confidence={v} />,
  },
  {
    title: 'Bank Date',
    dataIndex: 'bankDate',
    width: 110,
    render: (v) => v
      ? <span className="font-mono text-[13px] text-text2">{v}</span>
      : <span className="font-mono text-text3">—</span>,
  },
  {
    title: 'Description',
    dataIndex: 'bankDescription',
    render: (v, row) => v ? (
      <div>
        <div className="text-[13px] text-text1">{v}</div>
        {row.bankReference && <div className="font-mono text-[11px] text-text3 mt-0.5">{row.bankReference}</div>}
      </div>
    ) : <span className="text-text3">—</span>,
  },
  {
    title: 'Bank Amount',
    dataIndex: 'bankAmount',
    width: 130,
    render: (v) => v != null
      ? <span className="font-mono font-medium text-[13px] text-green">₹{v.toLocaleString()}</span>
      : <span className="font-mono text-text3">—</span>,
  },
  {
    title: 'Ledger Date',
    dataIndex: 'ledgerDate',
    width: 110,
    render: (v) => v
      ? <span className="font-mono text-[13px] text-text2">{v}</span>
      : <span className="font-mono text-text3">—</span>,
  },
  {
    title: 'Vendor',
    dataIndex: 'ledgerVendor',
    render: (v, row) => v ? (
      <div>
        <div className="text-[13px] text-text1">{v}</div>
        {row.ledgerInvoice && <div className="font-mono text-[11px] text-text3 mt-0.5">{row.ledgerInvoice}</div>}
      </div>
    ) : <span className="text-text3">—</span>,
  },
  {
    title: 'Ledger Amount',
    dataIndex: 'ledgerAmount',
    width: 130,
    render: (v) => v != null
      ? <span className="font-mono font-medium text-[13px] text-green">₹{v.toLocaleString()}</span>
      : <span className="font-mono text-text3">—</span>,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    render: (v) => v ? <span className="text-[12px] text-text3">{v}</span> : null,
  },
];

function flattenResult(result: MatchResult): TableRow[] {
  const matched = result.matched.map((m) => ({
    key: m.bank.id,
    confidence: m.confidence as Confidence,
    bankDate: m.bank.date,
    bankDescription: m.bank.description,
    bankAmount: m.bank.amount,
    bankReference: m.bank.reference,
    ledgerDate: m.ledger.date,
    ledgerVendor: m.ledger.vendor,
    ledgerAmount: m.ledger.amount,
    ledgerInvoice: m.ledger.invoiceNumber,
    note: m.note,
  }));

  const unmatchedBank = result.unmatchedBank.map((b) => ({
    key: b.id,
    confidence: 'unmatched_bank' as Confidence,
    bankDate: b.date,
    bankDescription: b.description,
    bankAmount: b.amount,
    bankReference: b.reference,
    note: 'No matching ledger entry',
  }));

  const unmatchedLedger = result.unmatchedLedger.map((l) => ({
    key: l.id,
    confidence: 'unmatched_ledger' as Confidence,
    ledgerDate: l.date,
    ledgerVendor: l.vendor,
    ledgerAmount: l.amount,
    ledgerInvoice: l.invoiceNumber,
    note: 'Payment not received in bank',
  }));

  return [...matched, ...unmatchedBank, ...unmatchedLedger];
}

export default function ResultsTable({ result }: { result: MatchResult }) {
  const [activeTab, setActiveTab] = useState('all');
  const all = flattenResult(result);

  const filterMap: Record<string, Confidence[]> = {
    all:              ['exact', 'fuzzy', 'unmatched_bank', 'unmatched_ledger'],
    matched:          ['exact'],
    fuzzy:            ['fuzzy'],
    unmatched_bank:   ['unmatched_bank'],
    unmatched_ledger: ['unmatched_ledger'],
  };

  const filtered = activeTab === 'all' ? all : all.filter((r) => filterMap[activeTab].includes(r.confidence));

  const count = (types: Confidence[]) => all.filter((r) => types.includes(r.confidence)).length;

  const tabs = [
    { key: 'all',              label: `All (${all.length})` },
    { key: 'matched',          label: `Matched (${count(['exact'])})` },
    { key: 'fuzzy',            label: `Fuzzy (${count(['fuzzy'])})` },
    { key: 'unmatched_bank',   label: `Unmatched Bank (${count(['unmatched_bank'])})` },
    { key: 'unmatched_ledger', label: `Unmatched Ledger (${count(['unmatched_ledger'])})` },
  ];

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm animate-[fadeUp_0.4s_ease]">
      <div className="px-6 pt-4 border-b border-border">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabs.map((t) => ({ key: t.key, label: t.label }))}
          size="small"
        />
      </div>
      <Table
        columns={columns}
        dataSource={filtered}
        pagination={{ pageSize: 10, size: 'small' }}
        size="middle"
        rowClassName="cursor-pointer hover:bg-accent-light transition-colors"
      />
      <div className="px-6 py-3 border-t border-border bg-surface2 rounded-b-lg flex justify-between items-center text-[12px] text-text3">
        <span>Showing {filtered.length} of {all.length} records</span>
        <span>{result.matched.length} matched · {result.unmatchedBank.length + result.unmatchedLedger.length} unmatched</span>
      </div>
    </div>
  );
}
