"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function GenesisPortal() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('frontendCode');

  const handleIgnite = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/genesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });
      
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to ignite');
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col relative overflow-y-auto custom-scrollbar lg:overflow-hidden h-full">
      
      <header className="px-4 md:px-8 py-6 mb-2 md:mb-6 shrink-0">
        <h2 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 tracking-wide">Genesis Engine</h2>
        <p className="text-slate-300 mt-2 text-[10px] md:text-lg">The Omni-Ingestion Portal. Input a requirement, output a software factory.</p>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 px-4 md:px-8 overflow-y-auto custom-scrollbar lg:overflow-hidden pb-8 lg:pb-0">
        
        {/* Left Side: Input Zone */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 shrink-0">
          <div className="glass-panel p-6 flex flex-col flex-1 relative shimmer-hover">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Requirement Input
            </h3>
            <textarea 
              className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
              placeholder="Paste a Jira URL, type a raw idea, or paste an API spec here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            
            <div className="mt-4 p-4 border border-dashed border-slate-700 rounded-xl bg-slate-950 text-center flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors">
              <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              <p className="text-sm text-slate-300 font-medium">Drag & Drop Image or PDF Spec</p>
              <p className="text-xs text-slate-300 mt-1">Multi-modal analysis powered by Gemini 2.0</p>
            </div>

            <button 
              onClick={handleIgnite}
              disabled={loading || !input.trim()}
              className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Igniting Swarm...
                </>
              ) : 'Ignite Genesis'}
            </button>
            {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
          </div>
        </div>

        {/* Right Side: SDLC Output Matrix */}
        <div className="w-full lg:w-2/3 glass-panel p-6 flex flex-col shrink-0 min-h-[500px] lg:min-h-0">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            SDLC Generation Matrix
          </h3>

          {!result && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-300 border border-dashed border-slate-700 rounded-xl bg-slate-950">
              <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <p>Awaiting Input Matrix...</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-blue-400 border border-slate-700 rounded-xl bg-slate-800">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full border-t-2 border-blue-400 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-b-2 border-violet-400 animate-spin flex items-center justify-center">
                  <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
              </div>
              <p className="animate-pulse font-medium tracking-widest uppercase">Orchestrating AI Swarm...</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:grid md:grid-cols-4 lg:grid-cols-8 md:gap-2 text-xs text-slate-300">
                <div className="flex flex-col items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>Product</div>
                <div className="flex flex-col items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500 animate-ping delay-75"></div>Frontend</div>
                <div className="flex flex-col items-center gap-1"><div className="w-2 h-2 rounded-full bg-violet-500 animate-ping delay-150"></div>Backend</div>
                <div className="flex flex-col items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500 animate-ping delay-[225ms]"></div>API</div>
                <div className="flex flex-col items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping delay-300"></div>Mobile</div>
                <div className="flex flex-col items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500 animate-ping delay-[350ms]"></div>Infra</div>
                <div className="flex flex-col items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500 animate-ping delay-[400ms]"></div>SDET</div>
                <div className="flex flex-col items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500 animate-ping delay-500"></div>DevOps</div>
              </div>
            </div>
          )}

          {result && (
            <div className="flex-1 flex flex-col overflow-hidden animate-slide-up">
              <div className="flex gap-2 border-b border-slate-700 pb-4 mb-4 flex-nowrap overflow-x-auto hide-scrollbar custom-scrollbar">
                <TabButton active={activeTab === 'productDocs'} onClick={() => setActiveTab('productDocs')} icon="📄" label="BDD Specs" />
                <TabButton active={activeTab === 'frontendCode'} onClick={() => setActiveTab('frontendCode')} icon="⚛️" label="React UI" />
                <TabButton active={activeTab === 'backendSql'} onClick={() => setActiveTab('backendSql')} icon="🗄️" label="SQL Schema" />
                <TabButton active={activeTab === 'apiSpecs'} onClick={() => setActiveTab('apiSpecs')} icon="🔌" label="API Specs" />
                <TabButton active={activeTab === 'mobileCode'} onClick={() => setActiveTab('mobileCode')} icon="📱" label="Mobile App" />
                <TabButton active={activeTab === 'infraCost'} onClick={() => setActiveTab('infraCost')} icon="☁️" label="Cloud Infra" />
                <TabButton active={activeTab === 'qaTests'} onClick={() => setActiveTab('qaTests')} icon="🎭" label="Playwright" />
                <TabButton active={activeTab === 'devOpsConfig'} onClick={() => setActiveTab('devOpsConfig')} icon="🚀" label="CI/CD YAML" />
              </div>
              <div className="flex-1 bg-\[#ffffff\] rounded-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-8 bg-\[#e2e8f0\] flex items-center px-4 border-b border-slate-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-slate-300 font-mono ml-4">generated_output.{activeTab === 'qaTests' ? 'spec.ts' : activeTab === 'devOpsConfig' ? 'yml' : activeTab === 'backendSql' ? 'sql' : activeTab === 'apiSpecs' ? 'yaml' : activeTab === 'mobileCode' ? 'tsx' : activeTab === 'productDocs' || activeTab === 'infraCost' ? 'md' : 'tsx'}</span>
                </div>
                <pre className="p-4 pt-12 overflow-auto h-full text-sm font-mono text-slate-300">
                  <code>{result[activeTab]}</code>
                </pre>
              </div>

              {/* Validation Suite Action Bar */}
              <div className="mt-4 p-4 rounded-xl border border-dashed border-blue-500/30 bg-blue-500/5 flex items-center justify-between animate-slide-up delay-300 flex-shrink-0">
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Validate AI Output
                  </h4>
                  <p className="text-xs text-blue-500/70 mt-1">AI-generated code requires verification. Choose a sandbox to evaluate this matrix:</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <Link href="/sandboxes/gen-ai" title="Best for validating BDD Docs & SQL" className="px-3 py-1.5 rounded-lg bg-slate-800 border border-blue-500/20 hover:border-blue-400 hover:bg-blue-500/10 text-xs text-slate-300 transition-all text-center">
                    Evaluate Logic
                  </Link>
                  <Link href="/sandboxes/ai-agent" title="Best for validating API Specs & DevOps" className="px-3 py-1.5 rounded-lg bg-slate-800 border border-violet-500/20 hover:border-violet-400 hover:bg-violet-500/10 text-xs text-slate-300 transition-all">
                    Simulate APIs
                  </Link>
                  <Link href="/sandboxes/agentic-arena" title="Best for running Playwright & React UI" className="px-3 py-1.5 rounded-lg bg-slate-800 border border-rose-500/20 hover:border-rose-400 hover:bg-rose-500/10 text-xs text-slate-300 transition-all flex items-center gap-1">
                    Arena Test Run <span className="text-rose-400">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center gap-1.5 md:gap-2 whitespace-nowrap
        ${active ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-transparent text-slate-300 hover:bg-slate-200/50 border border-transparent'}`}
    >
      <span>{icon}</span> {label}
    </button>
  );
}
