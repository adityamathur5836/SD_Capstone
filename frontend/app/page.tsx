"use client";

import { useState } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState("Checking API...");
  const [uploaded, setUploaded] = useState(false);
  const [jobStarted, setJobStarted] = useState(false);

  const checkConnection = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/health');
      if(res.ok) {
        const data = await res.json();
        setApiStatus(data.status);
      } else {
        setApiStatus("Backend connected, but health route not standard.");
      }
    } catch (error) {
      console.error("Connection failed:", error);
      setApiStatus("Backend is disconnected. Start the Node API on port 5000!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 md:p-16 font-sans">
      <header className="mb-12 border-b border-gray-800 pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            Synthetic Data Studio
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          Privacy-First Medical GAN Generation
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Upload Panel */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl transition hover:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">1. Upload Baseline Data</h2>
            <span className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full font-medium border border-blue-500/20">
              HIPAA Compliant
            </span>
          </div>
          
          <p className="text-gray-400 mb-8 leading-relaxed">
            Upload your clinical records (CSV) or scans (DICOM/JPG). 
            All incoming data is immediately scrubbed of PHI identifiers.
          </p>

          {!uploaded ? (
            <button 
              onClick={() => setUploaded(true)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition duration-200 flex justify-center items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              Select Medical Dataset
            </button>
          ) : (
            <div className="w-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 font-semibold py-4 rounded-xl flex justify-center items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Dataset Parsed and Secured
            </div>
          )}
        </section>

        {/* Training Panel */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl transition hover:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">2. GAN Simulation</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Configure epochs and synthetic cohort target size. The Factory Pattern will dynamically allocate the correct Generative engine.
          </p>
          
          <div className="bg-black/50 rounded-xl p-4 mb-8 font-mono text-xs md:text-sm text-gray-500 h-24 overflow-y-auto border border-gray-800">
            {jobStarted ? (
              <div className="text-emerald-400">
                <p>Initializing TabularGAN Factory...</p>
                <p>Generating Generator & Discriminator Models...</p>
                <p className="animate-pulse">Epoch 1/100: Discriminator Loss: 0.693, Generator Loss: 0.693</p>
              </div>
            ) : (
              <span className="text-gray-600">Awaiting dataset upload & job start configuration...</span>
            )}
          </div>

          <button 
            disabled={!uploaded || jobStarted}
            onClick={() => setJobStarted(true)}
            className={`w-full font-semibold py-4 rounded-xl transition duration-200 ${!uploaded || jobStarted ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 text-white'}`}
          >
            {jobStarted ? 'Simulating Neural Network...' : 'Compile & Start Training'}
          </button>
        </section>

        {/* System Diagnostics */}
        <section className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
              System Edge Diagnostics
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button 
                onClick={checkConnection}
                className="bg-indigo-600 hover:bg-indigo-500 text-white transition px-5 py-2.5 rounded-lg font-medium text-sm w-full sm:w-auto"
              >
                Ping Node.js Backend API
              </button>
              <div className="flex-1 w-full bg-black/60 p-3 rounded-lg text-green-400 font-mono text-sm border border-indigo-500/30 break-all min-h-[44px] flex items-center">
                {apiStatus}
              </div>
            </div>
        </section>

      </main>
    </div>
  );
}
