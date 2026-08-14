"use client";
import { useState, useEffect, useRef } from 'react';

type Stage = 'idle' | 'parallel' | 'nfr' | 'complete';

export default function PipelineViewer() {
  const [logs, setLogs] = useState<string[]>([]);
  const [stage, setStage] = useState<Stage>('idle');
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (log: string) => setLogs(prev => [...prev, log]);

  const triggerPipeline = () => {
    if (stage !== 'idle' && stage !== 'complete') return;
    setLogs([]);
    setStage('parallel');
    addLog("[SYSTEM] CI/CD Webhook Intercepted: PR #42");
    addLog("[ORCHESTRATOR] Spawning parallel Swarm Agents...");
    
    // Simulate Agentic and Security parallel execution
    setTimeout(() => addLog("[Agentic Swarm] Spawning 12 concurrent headless browsers..."), 1000);
    setTimeout(() => addLog("[Security Swarm] Initiating DAST vulnerability scan..."), 1500);
    setTimeout(() => addLog("[Agentic Swarm] Visual regression passed. Generating Playwright specs."), 3000);
    setTimeout(() => addLog("[Security Swarm] DAST scan found 0 critical CVEs. Dependencies secure."), 4000);
    setTimeout(() => addLog("[Agentic Swarm] SUCCESS: All 12/12 Agentic UI flows validated."), 5000);
    
    // Transition to NFR
    setTimeout(() => {
      setStage('nfr');
      addLog("[ORCHESTRATOR] Parallel phase complete. Merging execution paths.");
      addLog("[NFR Swarm] Initiating L-Size Load Test (5000 VUs) across 3 regions...");
    }, 6000);
    
    setTimeout(() => addLog("[NFR Swarm] Real-time metrics: P(95) < 300ms, 0% Error Rate."), 8000);
    setTimeout(() => addLog("[NFR Swarm] SUCCESS: Load threshold validated."), 10000);
    
    // Complete
    setTimeout(() => {
      setStage('complete');
      addLog("[SYSTEM] Pipeline Execution Complete. Validation Passed. Ready for Production.");
    }, 11000);
  };

  const getNodeState = (node: 'agentic' | 'security' | 'nfr') => {
    if (stage === 'idle') return 'waiting';
    if (node === 'agentic' || node === 'security') {
      if (stage === 'parallel') return 'running';
      return 'complete';
    }
    if (node === 'nfr') {
      if (stage === 'parallel') return 'waiting';
      if (stage === 'nfr') return 'running';
      return 'complete';
    }
    return 'waiting';
  };

  const renderNode = (id: string, title: string, subtitle: string, state: string, colorGroup: 'blue' | 'violet' | 'rose', posClasses: string) => {
    const isRunning = state === 'running';
    const isComplete = state === 'complete';
    
    let borderClass = 'border-slate-300';
    let bgClass = 'bg-white';
    let dotClass = 'bg-slate-300';
    let iconColor = '';

    if (colorGroup === 'blue') {
      if (isRunning) { borderClass = 'border-blue-500/50'; bgClass = 'bg-blue-500/10'; dotClass = 'bg-blue-400 animate-ping'; }
      if (isComplete) { borderClass = 'border-blue-500'; bgClass = 'bg-blue-500/20'; dotClass = 'bg-blue-400'; iconColor = 'text-blue-400'; }
    } else if (colorGroup === 'violet') {
      if (isRunning) { borderClass = 'border-violet-500/50'; bgClass = 'bg-violet-500/10'; dotClass = 'bg-violet-400 animate-ping'; }
      if (isComplete) { borderClass = 'border-violet-500'; bgClass = 'bg-violet-500/20'; dotClass = 'bg-violet-400'; iconColor = 'text-violet-400'; }
    } else if (colorGroup === 'rose') {
      if (isRunning) { borderClass = 'border-rose-500/50'; bgClass = 'bg-rose-500/10'; dotClass = 'bg-rose-400 animate-ping'; }
      if (isComplete) { borderClass = 'border-rose-500'; bgClass = 'bg-rose-500/20'; dotClass = 'bg-rose-400'; iconColor = 'text-rose-400'; }
    }

    return (
      <div className={`absolute w-64 p-4 rounded-xl border ${borderClass} ${bgClass} flex items-center gap-4 transition-all duration-500 z-10 shadow-lg ${posClasses}`}>
        <div className={`w-3 h-3 rounded-full ${dotClass} shrink-0`}></div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-bold text-sm ${isComplete || isRunning ? 'text-slate-900' : 'text-slate-500'}`}>{title}</h4>
          <p className="text-[10px] text-slate-500 truncate">{subtitle}</p>
        </div>
        {isComplete && (
          <svg className={`w-5 h-5 ${iconColor} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        )}
      </div>
    );
  };

  return (
    <div className="h-full m-4 flex flex-col relative overflow-y-auto lg:overflow-hidden glass-panel">
      
      <header className="px-8 py-6 border-b border-slate-300 flex justify-between items-center bg-slate-50 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-wide flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            CI/CD Pipeline Viewer
          </h2>
          <p className="text-sm text-slate-800 mt-1">Real-time DAG orchestration of the Agentic, Security, and NFR Swarms.</p>
        </div>
        <button 
          onClick={triggerPipeline}
          disabled={stage === 'parallel' || stage === 'nfr'}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50"
        >
          {stage === 'parallel' || stage === 'nfr' ? 'Executing...' : 'Trigger Pipeline'}
        </button>
      </header>

      <div className="flex-1 flex flex-col xl:flex-row overflow-y-auto lg:overflow-hidden pb-8 lg:pb-0">
        
        {/* Left Side: DAG Visualizer */}
        <div className="w-full xl:w-[60%] min-h-[400px] xl:min-h-0 xl:h-auto p-4 md:p-8 border-b xl:border-b-0 xl:border-r border-slate-300 flex items-center justify-start xl:justify-center relative bg-slate-50 overflow-auto shrink-0">
          
          <div className="relative w-[700px] h-[400px] shrink-0">
            {/* SVG Connectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
               {/* Agentic to NFR (Flowing from Left to Right) */}
               <path 
                 d="M 296 74 L 350 74 L 350 200 L 404 200" 
                 fill="none" 
                 stroke={stage === 'nfr' || stage === 'complete' ? '#3b82f6' : '#cbd5e1'} 
                 strokeWidth="2" 
                 className={stage === 'parallel' ? 'animate-pulse text-blue-500' : ''}
                 strokeDasharray="4"
               />
               {/* Security to NFR */}
               <path 
                 d="M 296 326 L 350 326 L 350 200 L 404 200" 
                 fill="none" 
                 stroke={stage === 'nfr' || stage === 'complete' ? '#3b82f6' : '#cbd5e1'} 
                 strokeWidth="2" 
                 className={stage === 'parallel' ? 'animate-pulse text-violet-500' : ''}
                 strokeDasharray="4"
               />
            </svg>

            {/* Nodes */}
            {renderNode('agentic', 'Agentic UI Pipeline', 'Playwright Generation & Healing', getNodeState('agentic'), 'blue', 'top-10 left-10')}
            {renderNode('security', 'Security Pipeline', 'DAST/SAST Auto-Remediation', getNodeState('security'), 'violet', 'bottom-10 left-10')}
            {renderNode('nfr', 'NFR Pipeline', 'T-Shirt k6 Load Generation', getNodeState('nfr'), 'rose', 'top-[166px] right-10')}
          </div>

        </div>

        {/* Right Side: Terminal */}
        <div className="w-full xl:w-[40%] min-h-[300px] xl:min-h-0 xl:h-auto p-4 md:p-6 bg-slate-950 flex flex-col font-mono text-sm relative shrink-0">
          <div className="flex gap-2 mb-4 border-b border-slate-800 pb-3 items-center shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-500 ml-4 font-sans tracking-widest uppercase">nexus-orchestrator-tty</span>
          </div>
          
          <div className="flex-1 overflow-y-auto font-mono pr-2" ref={terminalRef}>
            {logs.length === 0 ? (
              <p className="text-slate-500">Awaiting pipeline trigger...</p>
            ) : (
              logs.map((log, i) => {
                let colorClass = 'text-slate-300';
                if (log.includes('SUCCESS') || log.includes('passed') || log.includes('Complete')) colorClass = 'text-green-400 font-bold';
                else if (log.includes('FAILED')) colorClass = 'text-red-400 font-bold';
                else if (log.includes('SYSTEM')) colorClass = 'text-blue-400';
                else if (log.includes('ORCHESTRATOR')) colorClass = 'text-purple-400';
                else if (log.includes('Agentic Swarm')) colorClass = 'text-cyan-300';
                else if (log.includes('Security Swarm')) colorClass = 'text-rose-300';
                else if (log.includes('NFR Swarm')) colorClass = 'text-yellow-300';

                return (
                  <div key={i} className="mb-2 flex gap-4 leading-relaxed">
                    <span className="text-slate-600 shrink-0">{`[14:0${i}:12]`}</span>
                    <span className={colorClass}>{log}</span>
                  </div>
                )
              })
            )}
            {(stage === 'parallel' || stage === 'nfr') && (
              <div className="flex gap-2 mt-4 items-center">
                <div className="w-2 h-4 bg-slate-400 animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
