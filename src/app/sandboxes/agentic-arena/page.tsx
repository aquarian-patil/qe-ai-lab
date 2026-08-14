"use client";
import { useState, useRef, useEffect } from 'react';

type SwarmEvent = {
  id: string;
  agent: string;
  role: 'Orchestrator' | 'Worker';
  message: string;
  avatar: string;
  color: string;
};

const mockAgents = [
  { id: 'orchestrator', name: 'Lead Orchestrator', icon: '🧠', color: 'text-violet-400' },
  { id: 'dev', name: 'DevBot', icon: '👨‍💻', color: 'text-blue-400' },
  { id: 'qa', name: 'QABot', icon: '🕵️', color: 'text-emerald-400' },
  { id: 'sec', name: 'SecOps', icon: '🛡️', color: 'text-rose-400' }
];

const generateSwarmTrace = (trigger: string, objective: string): Omit<SwarmEvent, 'id'>[] => {
  const isSecurity = trigger.toLowerCase().includes('vulnerability') || objective.toLowerCase().includes('security');
  
  if (isSecurity) {
    return [
      { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `Trigger received: "${trigger}". Objective: "${objective}". Initiating Swarm.` },
      { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `Delegating initial triage to SecOps.` },
      { agent: 'SecOps', role: 'Worker', avatar: '🛡️', color: 'text-rose-400', message: `Running static analysis on the targeted repository...` },
      { agent: 'SecOps', role: 'Worker', avatar: '🛡️', color: 'text-rose-400', message: `Critical SQL injection vulnerability found in user-auth.ts line 42. Reporting back to Orchestrator.` },
      { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `Vulnerability confirmed. Delegating patch creation to DevBot.` },
      { agent: 'DevBot', role: 'Worker', avatar: '👨‍💻', color: 'text-blue-400', message: `Analyzing user-auth.ts... Parameterized query implementation drafted. Applying patch.` },
      { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `Patch applied. Delegating regression testing to QABot.` },
      { agent: 'QABot', role: 'Worker', avatar: '🕵️', color: 'text-emerald-400', message: `Running automated test suite (142 tests)...` },
      { agent: 'QABot', role: 'Worker', avatar: '🕵️', color: 'text-emerald-400', message: `Tests passed. SQL injection payloads successfully blocked. System stable.` },
      { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `Swarm objective achieved. Deployment authorized.` }
    ];
  }

  // Generic / QA Self-Healing Trace
  return [
    { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `Trigger received: "${trigger}". Objective: "${objective}". Initiating Swarm.` },
    { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `Delegating failure analysis to QABot.` },
    { agent: 'QABot', role: 'Worker', avatar: '🕵️', color: 'text-emerald-400', message: `Analyzing pipeline logs. Found UI failure: Element <button class="login-legacy"> is no longer in the DOM.` },
    { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `DOM mutation detected. Delegating CSS selector extraction to DevBot.` },
    { agent: 'DevBot', role: 'Worker', avatar: '👨‍💻', color: 'text-blue-400', message: `Scraping new DOM structure from staging. The button was renamed to <button class="auth-submit btn-primary">.` },
    { agent: 'DevBot', role: 'Worker', avatar: '👨‍💻', color: 'text-blue-400', message: `Patching Playwright automation scripts with the new selector.` },
    { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `Test scripts patched. Delegating verification run to QABot.` },
    { agent: 'QABot', role: 'Worker', avatar: '🕵️', color: 'text-emerald-400', message: `Re-running Playwright smoke suite...` },
    { agent: 'QABot', role: 'Worker', avatar: '🕵️', color: 'text-emerald-400', message: `Smoke suite passed (14/14). UI has been successfully self-healed.` },
    { agent: 'Lead Orchestrator', role: 'Orchestrator', avatar: '🧠', color: 'text-violet-400', message: `Swarm objective achieved. Pipeline unblocked.` }
  ];
};

export default function AgenticAiEvaluator() {
  const [trigger, setTrigger] = useState('');
  const [objective, setObjective] = useState('');
  const [activeAgents, setActiveAgents] = useState<string[]>(['orchestrator', 'dev', 'qa']);
  const [running, setRunning] = useState(false);
  const [trace, setTrace] = useState<SwarmEvent[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [trace]);

  const toggleAgent = (id: string) => {
    setActiveAgents(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const runSimulation = () => {
    if (!trigger.trim() || !objective.trim()) return;
    setRunning(true);
    setTrace([]);
    
    const dynamicTrace = generateSwarmTrace(trigger, objective);
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < dynamicTrace.length) {
        setTrace(prev => [...prev, { ...dynamicTrace[step], id: Math.random().toString() }]);
        step++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 1500); // 1.5s delay between agent communications
  };

  return (
    <div className="h-full m-4 flex flex-col relative overflow-hidden glass-panel">
      <header className="px-8 py-6 border-b border-slate-700 bg-slate-950/50 shrink-0 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
            <svg className="w-6 h-6 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Agentic AI Evaluator
          </h2>
          <p className="text-sm text-slate-400 mt-1">Evaluate Multi-Agent Swarms by testing orchestration, task delegation, and swarm collaboration.</p>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-8 overflow-hidden bg-slate-950/50">
        
        {/* Left Side: Environment Setup */}
        <div className="lg:w-[55%] flex flex-col relative h-full">
          <div className="flex-1 border border-slate-700 rounded-xl bg-slate-900 shadow-sm p-6 flex flex-col">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6">Swarm Configuration</h3>
            
            <div className="flex flex-col gap-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {/* Swarm Trigger */}
              <div className="flex flex-col shrink-0">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Swarm Trigger / Event</h4>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] rounded-xl p-4 text-slate-300 text-sm leading-relaxed focus:bg-white focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all resize-none outline-none"
                  rows={2}
                  placeholder="What event kicks off the agents? (e.g., 'Playwright nightly pipeline failed on Login step')"
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                />
              </div>

              {/* Participating Agents */}
              <div className="flex flex-col shrink-0">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Participating Agents</h4>
                <div className="flex flex-wrap gap-2">
                  {mockAgents.map(agent => (
                    <div 
                      key={agent.id}
                      onClick={() => toggleAgent(agent.id)}
                      className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors select-none
                        ${activeAgents.includes(agent.id) ? 'bg-fuchsia-100 border-fuchsia-500 text-fuchsia-900' : 'bg-slate-900 border-slate-700 text-slate-600 hover:border-slate-300'}`}
                    >
                      <span>{agent.icon}</span> {agent.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Swarm Objective */}
              <div className="flex flex-col shrink-0">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Swarm Objective</h4>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] rounded-xl p-4 text-slate-300 text-sm leading-relaxed focus:bg-white focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all resize-none outline-none"
                  rows={2}
                  placeholder="What is the final success criteria? (e.g., 'Self-heal the code and verify the fix')"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <button 
            onClick={runSimulation}
            disabled={running || !trigger.trim() || !objective.trim()}
            className="mt-4 py-4 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_0_rgba(192,38,211,0.39)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {running ? 'Orchestrating Swarm...' : 'Deploy Agent Swarm'}
          </button>
        </div>

        {/* Right Side: Swarm Chat Stream */}
        <div className="lg:w-[45%] border border-slate-800 rounded-xl bg-slate-950 shadow-2xl p-6 flex flex-col relative h-full">
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-xs text-slate-400 tracking-widest font-mono uppercase">Multi-Agent_Stream</span>
          </div>
          
          <div ref={terminalRef} className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
            {trace.length === 0 && !running && (
              <div className="text-slate-600 italic font-mono text-sm text-center mt-10">Awaiting Swarm Deployment...</div>
            )}
            
            {trace.map((evt) => (
              <div key={evt.id} className="animate-slide-up bg-slate-900 border border-slate-800 p-4 rounded-xl flex gap-4">
                <div className="text-2xl mt-1 shrink-0">{evt.avatar}</div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-sm ${evt.color}`}>{evt.agent}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800">{evt.role}</span>
                  </div>
                  <span className="text-slate-300 text-sm leading-relaxed">{evt.message}</span>
                </div>
              </div>
            ))}
            
            {running && (
              <div className="flex items-center gap-3 text-slate-400 mt-2 px-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
                </div>
                <span className="text-sm font-mono italic">Agents collaborating...</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
