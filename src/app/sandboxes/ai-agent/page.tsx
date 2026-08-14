"use client";
import { useState, useRef, useEffect } from 'react';

type TraceEvent = {
  id: string;
  type: 'THOUGHT' | 'ACTION' | 'OBSERVATION' | 'FINAL';
  text: string;
};

const mockTools = [
  { id: 'github', name: 'GitHub_API', icon: '🐙' },
  { id: 'jira', name: 'Jira_Cloud', icon: '🔷' },
  { id: 'bash', name: 'Bash_Terminal', icon: '⌨️' },
  { id: 'sql', name: 'SQL_Client', icon: '🗄️' },
  { id: 'playwright', name: 'Playwright_Runner', icon: '🎭' }
];

const generateDynamicTrace = (goal: string): Omit<TraceEvent, 'id'>[] => {
  const lowerGoal = goal.toLowerCase();
  
  if (lowerGoal.includes('playwright') || lowerGoal.includes('ui') || lowerGoal.includes('test')) {
    return [
      { type: 'THOUGHT', text: `Goal received: "${goal}". I will start by analyzing the Playwright test suite for failures.` },
      { type: 'ACTION', text: 'Tool Call: Playwright_Runner.executeSuite(tags="@smoke")' },
      { type: 'OBSERVATION', text: 'Test failed: "Timeout waiting for selector \'.login-btn-legacy\' to be visible".' },
      { type: 'THOUGHT', text: 'The selector ".login-btn-legacy" is no longer valid. I should check the DOM tree of the login page.' },
      { type: 'ACTION', text: 'Tool Call: GitHub_API.getFile(path="src/components/Login.tsx")' },
      { type: 'OBSERVATION', text: 'File contents reveal the button now uses className="btn-primary auth-submit".' },
      { type: 'THOUGHT', text: 'I found the updated CSS selector. I will now update the Playwright test script to fix the failure.' },
      { type: 'ACTION', text: 'Tool Call: Bash_Terminal.execute("sed -i s/.login-btn-legacy/.auth-submit/g tests/login.spec.ts")' },
      { type: 'FINAL', text: 'I have successfully healed the broken UI test by updating the legacy CSS selector.' }
    ];
  }
  
  if (lowerGoal.includes('sql') || lowerGoal.includes('database') || lowerGoal.includes('data')) {
    return [
      { type: 'THOUGHT', text: `Goal received: "${goal}". I need to query the database to accomplish this.` },
      { type: 'ACTION', text: 'Tool Call: SQL_Client.query("SELECT count(*) FROM users WHERE status=\'active\'")' },
      { type: 'OBSERVATION', text: 'Result: 14,239' },
      { type: 'THOUGHT', text: 'I have the active user count. I will format this into a report.' },
      { type: 'ACTION', text: 'Tool Call: Bash_Terminal.execute("echo \'Active Users: 14,239\' > report.txt")' },
      { type: 'FINAL', text: 'Database query executed successfully and report generated.' }
    ];
  }

  // Generic fallback for any other goal
  return [
    { type: 'THOUGHT', text: `Goal received: "${goal}". Analyzing best approach based on available tools...` },
    { type: 'ACTION', text: 'Tool Call: Bash_Terminal.execute("env | grep NEXUS")' },
    { type: 'OBSERVATION', text: 'NEXUS_ENV=production' },
    { type: 'THOUGHT', text: 'Environment confirmed as production. Proceeding with caution. I will check the system logs.' },
    { type: 'ACTION', text: 'Tool Call: GitHub_API.getRecentCommits(branch="main")' },
    { type: 'OBSERVATION', text: 'Latest commit: "fix: resolve memory leak in worker node"' },
    { type: 'THOUGHT', text: 'I have gathered the necessary system context. I will compile the final summary.' },
    { type: 'FINAL', text: 'Task execution completed successfully. All constraints were respected.' }
  ];
};

export default function AiAgentEvaluator() {
  const [goal, setGoal] = useState('');
  const [constraints, setConstraints] = useState('');
  const [activeTools, setActiveTools] = useState<string[]>(['github', 'jira']);
  const [running, setRunning] = useState(false);
  const [trace, setTrace] = useState<TraceEvent[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [trace]);

  const toggleTool = (id: string) => {
    setActiveTools(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const runSimulation = () => {
    if (!goal.trim()) return;
    setRunning(true);
    setTrace([]);
    
    const dynamicTrace = generateDynamicTrace(goal);
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < dynamicTrace.length) {
        setTrace(prev => [...prev, { ...dynamicTrace[step], id: Math.random().toString() }]);
        step++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 1200); // 1.2s delay between agent actions
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden glass-panel !border-0 md:!border !rounded-none md:!rounded-2xl">
      <header className="px-4 md:px-8 py-6 border-b border-slate-700 bg-slate-950/50 shrink-0 flex justify-between items-center w-full">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3">
            <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
            AI Agent Evaluator
          </h2>
          <p className="text-sm text-slate-400 mt-1">Evaluate autonomous agent trajectories, tool-calling sequences, and DevSecOps logic.</p>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-8 overflow-y-auto lg:overflow-hidden bg-slate-950/50 min-w-0 w-full">
        
        {/* Left Side: Environment Setup */}
        <div className="w-full lg:w-[55%] flex flex-col relative shrink-0 lg:h-full min-w-0">
          <div className="flex-1 border border-slate-700 rounded-xl bg-slate-900 shadow-sm p-4 md:p-6 flex flex-col">
            <h3 className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 md:mb-6">Evaluation Environment</h3>
            
            <div className="flex flex-col gap-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {/* Task/Goal */}
              <div className="flex flex-col shrink-0">
                <h4 className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Agent Goal / Objective</h4>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] rounded-xl p-4 text-slate-300 text-sm leading-relaxed focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none outline-none"
                  rows={2}
                  placeholder="What is the objective? e.g. Find bug & create Jira ticket"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>

              {/* Tools Selection */}
              <div className="flex flex-col shrink-0">
                <h4 className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Available Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {mockTools.map(tool => (
                    <div 
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg border text-[10px] md:text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors select-none
                        ${activeTools.includes(tool.id) ? 'bg-violet-100 border-violet-500 text-violet-900' : 'bg-slate-900 border-slate-700 text-slate-600 hover:border-slate-300'}`}
                    >
                      <span>{tool.icon}</span> {tool.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              <div className="flex flex-col flex-1 min-h-[100px]">
                <h4 className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Agent Constraints (System Prompt)</h4>
                <textarea 
                  className="flex-1 w-full bg-slate-950 border border-slate-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] rounded-xl p-4 text-slate-300 text-sm leading-relaxed focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none outline-none"
                  placeholder="What are the rules? e.g. Do not merge, open PRs only"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <button 
            onClick={runSimulation}
            disabled={running || !goal.trim()}
            className="mt-4 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {running ? 'Simulating Trajectory...' : 'Run Agent Evaluation'}
          </button>
        </div>

        {/* Right Side: Trajectory Terminal */}
        <div className="w-full lg:w-[45%] border border-slate-800 rounded-xl bg-slate-950 shadow-2xl p-6 flex flex-col relative shrink-0 lg:h-full min-h-[400px] min-w-0">
          <div className="flex gap-2 mb-4 border-b border-slate-800 pb-4 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="text-[10px] md:text-xs text-slate-400 ml-4 tracking-widest font-mono uppercase">Agent_Trajectory_Stream</span>
          </div>
          
          <div ref={terminalRef} className="flex-1 overflow-y-auto font-mono text-[11px] md:text-[13px] leading-relaxed md:leading-loose pr-2 custom-scrollbar">
            {trace.length === 0 && !running && (
              <div className="text-slate-600 italic">Waiting for environment initialization...</div>
            )}
            
            {trace.map((evt) => (
              <div key={evt.id} className="mb-4 animate-slide-up opacity-90">
                {evt.type === 'THOUGHT' && (
                  <div>
                    <span className="text-fuchsia-400 font-bold mr-2">[{evt.type}]</span>
                    <span className="text-slate-300 italic">{evt.text}</span>
                  </div>
                )}
                {evt.type === 'ACTION' && (
                  <div className="bg-blue-950/40 p-2 rounded border border-blue-900/50 mt-1">
                    <span className="text-blue-400 font-bold mr-2">[{evt.type}]</span>
                    <span className="text-blue-200 font-medium">{evt.text}</span>
                  </div>
                )}
                {evt.type === 'OBSERVATION' && (
                  <div className="mt-1">
                    <span className="text-emerald-400 font-bold mr-2">[{evt.type}]</span>
                    <span className="text-emerald-100/70">{evt.text}</span>
                  </div>
                )}
                {evt.type === 'FINAL' && (
                  <div className="mt-4 p-3 bg-violet-900/30 border border-violet-500/30 rounded-lg">
                    <span className="text-violet-400 font-bold mr-2">[FINAL ANSWER]</span>
                    <span className="text-white font-medium">{evt.text}</span>
                  </div>
                )}
              </div>
            ))}
            
            {running && (
              <div className="flex gap-2 mt-2 items-center">
                <div className="w-2 h-4 bg-violet-400 animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
