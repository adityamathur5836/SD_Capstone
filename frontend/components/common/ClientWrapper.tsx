"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import PipelineStepper from "@/components/PipelineStepper";
import HelpTray from "@/components/docs/HelpTray";
import GuidedTutorial from "@/components/docs/GuidedTutorial";
import { HelpCircle, Loader2 } from "lucide-react";
import { useMedicalStore } from "@/store/useMedicalStore";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import ServiceWorkerRegistration from "@/components/common/ServiceWorkerRegistration";
import LoginModal from "@/components/auth/LoginModal";
import { Suspense } from "react";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { isHelpTrayOpen, setHelpTrayOpen } = useMedicalStore();

  return (
    <ErrorBoundary>
      <ServiceWorkerRegistration />
      <LoginModal />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64 p-8" role="main">
          <div className="max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-center" role="banner">
              <Breadcrumbs />
              <PipelineStepper />
            </header>
            <Suspense fallback={
              <div className="flex items-center justify-center p-24">
                <Loader2 className="w-12 h-12 text-medical-accent animate-spin" />
              </div>
            }>
              {children}
            </Suspense>
          </div>
        </main>

        <HelpTray />
        <GuidedTutorial />

        <button
          onClick={() => setHelpTrayOpen(!isHelpTrayOpen)}
          className="fixed bottom-8 right-8 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl hover:bg-black hover:scale-110 transition-all z-[90] active:scale-95 group overflow-hidden pointer-events-auto"
          aria-label="Open AI Help Tray"
        >
           <div className="relative z-10 flex items-center gap-3">
              <HelpCircle className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] w-0 group-hover:w-16 transition-all opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden">Ask AI</span>
           </div>
           <div className="absolute top-0 right-0 w-12 h-12 bg-medical-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </ErrorBoundary>
  );
}
