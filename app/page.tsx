"use client";
import { useState, useRef, useEffect } from "react";
import { message } from "antd";
import { Send, Sparkles } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import UploadZone from "@/components/UploadZone";
import SummaryCards from "@/components/SummaryCards";
import ResultsTable from "@/components/ResultsTable";

interface MatchResult {
  matched: {
    bank: { id: string; date: string; description: string; amount: number; reference?: string };
    ledger: { id: string; date: string; vendor: string; amount: number; invoiceNumber?: string };
    confidence: "exact" | "fuzzy";
    note?: string;
  }[];
  unmatchedBank: { id: string; date: string; description: string; amount: number; reference?: string }[];
  unmatchedLedger: { id: string; date: string; vendor: string; amount: number; invoiceNumber?: string }[];
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ q: string; a: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleReconcile = async (bank: File, ledger: File) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("bank", bank);
      form.append("ledger", ledger);
      const res = await fetch("/api/reconcile", { method: "POST", body: form });
      if (!res.ok) throw new Error("Reconciliation failed");
      const data: MatchResult = await res.json();
      setResult(data);
      message.success("Reconciliation complete");
    } catch {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!result) return;
    const rows = [
      ["Status", "Bank Date", "Description", "Bank Amount", "Ledger Date", "Vendor", "Ledger Amount", "Note"],
      ...result.matched.map((m) => [m.confidence, m.bank.date, m.bank.description, m.bank.amount, m.ledger.date, m.ledger.vendor, m.ledger.amount, m.note ?? ""]),
      ...result.unmatchedBank.map((b) => ["unmatched_bank", b.date, b.description, b.amount, "", "", "", "No matching ledger entry"]),
      ...result.unmatchedLedger.map((l) => ["unmatched_ledger", "", "", "", l.date, l.vendor, l.amount, "Payment not received"]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reconciliation-results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    const q = question.trim();
    setAsking(true);
    setQuestion("");
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setChatHistory((prev) => [...prev, { q, a: data.answer }]);
    } catch {
      setChatHistory((prev) => [...prev, { q, a: "Sorry, something went wrong." }]);
    } finally {
      setAsking(false);
    }
  };

  const summaryData = result
    ? {
        exact: result.matched.filter((m) => m.confidence === "exact").length,
        fuzzy: result.matched.filter((m) => m.confidence === "fuzzy").length,
        unmatchedBank: result.unmatchedBank.length,
        unmatchedLedger: result.unmatchedLedger.length,
      }
    : null;

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar hasResults={!!result} onExport={handleExport} />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* AI Agent Chat */}
            <div className="bg-surface rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="flex items-center gap-2.5 px-6 py-4 border-b border-border">
                <div className="w-7 h-7 bg-accent-light rounded-sm flex items-center justify-center">
                  <Sparkles size={14} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold text-text1 leading-none">Ask AI</h2>
                  <p className="text-[12px] text-text3 mt-0.5">Ask questions about your transactions</p>
                </div>
              </div>

              {/* Chat history */}
              <div className="px-6 py-4 space-y-4 min-h-[160px] max-h-[280px] overflow-y-auto">
                {chatHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[120px] gap-2">
                    <p className="text-[13px] text-text3">No questions yet. Try asking something below.</p>
                    <div className="flex gap-2 flex-wrap justify-center">
                      {['What is the total unmatched amount?', 'Which vendor has the highest invoice?'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuestion(s)}
                          className="text-[12px] text-accent bg-accent-light px-3 py-1.5 rounded-pill border border-accent-light hover:border-accent transition-colors cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  chatHistory.map((c, i) => (
                    <div key={i} className="space-y-2 animate-[fadeUp_0.3s_ease]">
                      <div className="flex justify-end">
                        <div className="bg-accent text-white text-[13px] px-4 py-2 rounded-lg rounded-tr-sm max-w-[75%]">
                          {c.q}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-surface2 text-text1 text-[13px] px-4 py-2 rounded-lg rounded-tl-sm max-w-[75%] border border-border">
                          {c.a}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {asking && (
                  <div className="flex justify-start">
                    <div className="bg-surface2 text-text3 text-[13px] px-4 py-2 rounded-lg rounded-tl-sm border border-border animate-pulse">
                      Thinking...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="px-6 py-4 border-t border-border bg-surface2 flex gap-3">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !asking && handleAsk()}
                  placeholder='e.g. "What is the total unmatched bank amount?"'
                  className="flex-1 bg-surface border border-border rounded text-[13px] text-text1 px-4 py-2.5 outline-none placeholder:text-text3 focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-dim)] transition-all"
                />
                <button
                  onClick={handleAsk}
                  disabled={asking || !question.trim()}
                  className="flex items-center gap-2 bg-accent text-white text-[13px] font-semibold px-4 py-2.5 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  style={{ boxShadow: '0 4px 16px var(--accent-dim)' }}
                >
                  <Send size={13} />
                  Ask
                </button>
              </div>
            </div>

            {/* Upload */}
            <div className="bg-surface rounded-lg border border-border shadow-sm p-8">
              <h2 className="text-[18px] font-semibold text-text1 mb-1">Upload Files</h2>
              <p className="text-[14px] text-text3 mb-6">Upload your bank statement and ledger CSV to run reconciliation.</p>
              <UploadZone onReconcile={handleReconcile} loading={loading} />
            </div>

            {/* Results */}
            {summaryData && (
              <>
                <SummaryCards data={summaryData} />
                <ResultsTable result={result!} />
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
