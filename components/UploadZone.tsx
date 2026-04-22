'use client';
import { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { Landmark, BookOpen, Trash2, Play } from 'lucide-react';

const { Dragger } = Upload;

interface UploadZoneProps {
  onReconcile: (bank: File, ledger: File) => void;
  loading: boolean;
}

export default function UploadZone({ onReconcile, loading }: UploadZoneProps) {
  const [bankFile, setBankFile] = useState<File | null>(null);
  const [ledgerFile, setLedgerFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!bankFile || !ledgerFile) {
      message.error('Please upload both CSV files');
      return;
    }
    onReconcile(bankFile, ledgerFile);
  };

  return (
    <div className="animate-[fadeUp_0.4s_ease]">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <FileDropZone
          label="Bank Statement"
          icon={<Landmark size={28} strokeWidth={1.5} className="text-text3" />}
          file={bankFile}
          onFile={setBankFile}
        />
        <FileDropZone
          label="Ledger Export"
          icon={<BookOpen size={28} strokeWidth={1.5} className="text-text3" />}
          file={ledgerFile}
          onFile={setLedgerFile}
        />
      </div>

      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          loading={loading}
          disabled={!bankFile || !ledgerFile}
          onClick={handleSubmit}
          icon={<Play size={14} />}
          className="flex items-center gap-2 font-semibold rounded px-8 h-11"
          style={{ background: 'var(--accent)', border: 'none', boxShadow: '0 4px 16px var(--accent-dim)' }}
        >
          Run Reconciliation
        </Button>
      </div>
    </div>
  );
}

function FileDropZone({ label, icon, file, onFile }: {
  label: string;
  icon: React.ReactNode;
  file: File | null;
  onFile: (f: File | null) => void;
}) {
  if (file) {
    return (
      <div className="border-2 border-border rounded-lg bg-surface p-6 flex items-center justify-between shadow animate-[fadeIn_0.3s_ease]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-green-light flex items-center justify-center">
            <span className="text-[10px] font-bold text-green font-mono tracking-[0.05em]">CSV</span>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-text1">{file.name}</div>
            <div className="text-[12px] text-text3">{(file.size / 1024).toFixed(1)} KB · {label}</div>
          </div>
        </div>
        <button
          onClick={() => onFile(null)}
          className="bg-transparent border-none cursor-pointer text-text3 hover:text-red p-1 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  }

  return (
    <Dragger
      accept=".csv"
      showUploadList={false}
      beforeUpload={(f) => { onFile(f); return false; }}
      className="rounded-lg"
    >
      <div className="flex flex-col items-center gap-3 py-2">
        {icon}
        <div>
          <div className="text-[14px] font-semibold text-text1">{label}</div>
          <div className="text-[13px] text-text3 mt-1">Drop CSV here or click to browse</div>
        </div>
      </div>
    </Dragger>
  );
}
