"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Database,
  Settings,
  BarChart3,
  Activity,
  UploadCloud,
  ShieldCheck,
  BrainCircuit,
  GraduationCap,
  LogOut
} from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Activity },
  { name: '1. Upload Dataset', href: '/upload', icon: UploadCloud },
  { name: '2. Train GAN', href: '/train', icon: BrainCircuit },
  { name: '3. Generate Data', href: '/generate', icon: Database },
  { name: '4. Analyze Results', href: '/analyze', icon: BarChart3 },
  { name: '5. Export Data', href: '/export', icon: ShieldCheck },
  { name: 'Audit Trail', href: '/audit', icon: ShieldCheck },
  { name: 'Compliance', href: '/settings/compliance', icon: ShieldCheck },
  { name: 'System Health', href: '/settings/health', icon: Activity },
  { name: 'Research Docs', href: '/docs', icon: GraduationCap },
];
export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useMedicalStore();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-medical-surface border-r border-slate-200 z-50 flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-medical-accent flex items-center justify-center">
              <Database className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-medical-text">
              Med<span className="text-medical-accent">Synth</span>
            </span>
          </div>

          <nav className="space-y-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-medical-accent/10 text-medical-accent'
                      : 'text-medical-muted hover:bg-slate-50 hover:text-medical-text'
                  }`}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mt-auto p-6 space-y-4 border-t border-slate-100 bg-slate-50/50">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-medical-accent text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-100 uppercase">
              {user.username.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user.username}</p>
              <p className="text-[10px] font-black text-medical-accent uppercase tracking-wider">{user.role}</p>
            </div>
            <button
              onClick={logout}
              className="ml-auto p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}

        <Link href="/settings/health" className="p-4 rounded-xl bg-white border border-slate-200 block group hover:border-medical-accent transition-all shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-hover:text-medical-accent">Systems Status</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-medical-success"></span>
            </span>
            <span className="text-xs font-bold text-slate-700">All nodes online</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
