"use client";

import React, { useState } from 'react';
import { Lock, User, Loader2, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';
import { medicalApi } from '@/services/api';

export default function LoginModal() {
  const { isAuthModalOpen, setAuth, setAuthModalOpen, logout } = useMedicalStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const handleUnauthorized = () => {
      logout(); // Clear stale user/token state
      setAuthModalOpen(true);
    };
    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth-unauthorized', handleUnauthorized);
  }, [setAuthModalOpen, logout]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await medicalApi.login(username, password);
      // For now, we manually decode or just set a dummy user object since backend verify doesn't return user details in login
      // Actually, we can just set the username we used
      setAuth(response.access_token, { username: username, role: 'researcher' });
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        <div className="relative p-8 text-center bg-slate-900 text-white overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-medical-accent/20 blur-3xl -mr-16 -mt-16" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl -ml-16 -mb-16" />

           <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/10 ring-1 ring-white/20">
                 <ShieldCheck className="w-8 h-8 text-medical-accent" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Access Secure Cluster</h2>
              <p className="text-slate-400 text-xs font-medium mt-2 uppercase tracking-widest">Research Identity Verification Required</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Research ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400 group-focus-within:text-medical-accent transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-accent/20 focus:border-medical-accent transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Security Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-medical-accent transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-accent/20 focus:border-medical-accent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-2 text-rose-600 text-xs font-bold animate-in shake duration-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden py-3.5 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none shadow-xl shadow-slate-200"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Authenticate Session</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-slate-400 font-medium">
            Authorized institutional personnel only. Session activity is audited under HIPAA guidelines.
          </p>
        </form>
      </div>
    </div>
  );
}
