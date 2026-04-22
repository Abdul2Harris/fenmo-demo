'use client';
import { RefreshCw, BarChart2, Settings } from 'lucide-react';

const navItems = [
  { icon: RefreshCw, label: 'Reconcile', active: true },
  // { icon: BarChart2, label: 'History', active: false },
  // { icon: Settings, label: 'Settings', active: false },
];

export default function Sidebar() {
  return (
    <aside className="w-[220px] bg-sidebar flex flex-col px-3 py-6 h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="px-2 pb-6 mb-5 border-b border-sidebar-active">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-accent rounded-sm flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-white font-bold text-[15px]">ReconcileAI</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1">
        <p className="text-[11px] font-semibold text-text3 uppercase tracking-[0.08em] pl-2 mb-2">
          Main
        </p>
        {navItems.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-sm text-[14px] cursor-pointer mb-0.5 transition-all duration-150
              ${active
                ? 'bg-sidebar-active text-white font-semibold'
                : 'text-text3 hover:bg-sidebar-hover hover:text-white'
              }`}
          >
            <Icon size={16} />
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
}
