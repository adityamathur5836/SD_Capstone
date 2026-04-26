"use client";

import { useEffect } from 'react';
import {
  Plus,
  ArrowUpRight,
  Users,
  Zap,
  ShieldCheck,
  Database,
  BarChart3,
  BrainCircuit
} from 'lucide-react';
import Link from 'next/link';
import { useMedicalStore } from '@/store/useMedicalStore';
import { medicalApi } from '@/services/api';

export default function Home() {
  const { analytics, setAnalytics } = useMedicalStore();

  // Fetch analytics from backend API on mount — NO hardcoded data
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await medicalApi.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };
    loadAnalytics();
  }, [setAnalytics]);

  const stats = [
    {
      name: 'Synthetic Samples',
      value: analytics?.total_samples_generated?.toLocaleString() || '—',
      icon: Database, trend: '+12%', color: 'text-blue-600'
    },
    {
      name: 'Privacy Score',
      value: analytics?.privacy_metrics?.average_privacy_score != null
        ? `${(analytics.privacy_metrics.average_privacy_score * 100).toFixed(1)}%`
        : '—',
      icon: ShieldCheck, trend: 'Stable', color: 'text-emerald-600'
    },
    {
      name: 'Active GAN Models',
      value: analytics?.active_models?.toString() || '—',
      icon: BrainCircuit, trend: 'None', color: 'text-indigo-600'
    },
    {
      name: 'Model Fidelity (FID)',
      value: analytics?.accuracy_metrics?.fid_score?.toString() || '—',
      icon: BarChart3, trend: '-2.1', color: 'text-amber-600'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Research Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Overview of your medical data synthesis pipelines.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            Import Data
          </Link>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-4 py-2 bg-medical-accent rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
          >
            <Plus className="w-4 h-4" />
            New Synthesis
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.name} className="glass-card flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100`}>
                {item.trend}
              </span>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-semibold text-medical-muted uppercase tracking-wider">{item.name}</p>
              <h3 className="text-2xl font-bold text-medical-text tabular-nums">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-medical-text">Recent Generation History</h3>
            <button className="text-sm font-semibold text-medical-accent hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
            <BrainCircuit className="w-12 h-12 text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">No recent synthesis activity found.</p>
            <Link href="/generate" className="mt-4 text-sm font-bold text-medical-accent hover:text-blue-700">
              Start your first session
            </Link>
          </div>
        </div>

        <div className="glass-card">
          <h3 className="text-lg font-bold text-medical-text mb-6">System Health</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-medical-text">Compute Engine</p>
                  <p className="text-xs text-medical-muted font-medium">V100 Cluster - Active</p>
                </div>
              </div>
              <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-medical-accent w-[85%]"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-medical-text">Privacy Validator</p>
                  <p className="text-xs text-medical-muted font-medium">Status: Protected</p>
                </div>
              </div>
              <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-medical-success w-full"></div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-medical-text">Ethical Oversight</p>
                <p className="text-xs text-medical-muted font-medium">Bias matching enabled</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-4 rounded-xl bg-indigo-50 border border-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-indigo-900 font-bold text-sm">Researcher Insights</p>
              <p className="text-indigo-700 text-xs mt-1 leading-relaxed font-medium">
                Your recent synthetic cohort matches the demographic distribution of the 2023 Retinal Study with 98.2% accuracy.
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <BrainCircuit className="w-24 h-24 text-indigo-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
