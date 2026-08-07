'use client';

import { useState } from 'react';

export default function GenAISandbox() {
  const [prompt, setPrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleRunTest = () => {
    setIsRunning(true);
    // Mock API delay to show loading state
    setTimeout(() => {
      setResult(`{\n  "status": "success",\n  "model": "gemini-2.0-flash",\n  "tokens": 42,\n  "hallucinationRisk": "Low",\n  "output": "This is a mock response demonstrating the GenAI Sandbox."\n}`);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">GenAI <span className="text-cyan-400">Evaluator</span></h2>
        <p className="text-sm text-zinc-400 mt-1">Test pure LLM inputs/outputs for structure and hallucinations.</p>
      </header>

      <div className="flex gap-6 flex-1 h-full">
        {/* Input Panel */}
        <div className="w-1/2 glass-panel p-6 flex flex-col relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
           <h3 className="text-sm font-semibold text-zinc-200 mb-4 uppercase tracking-wider">Test Configuration</h3>
           
           <div className="mb-4">
             <label className="block text-xs font-medium text-zinc-500 mb-1">Target Model</label>
             <select className="w-full bg-black/30 border border-[var(--panel-border)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500">
               <option>gemini-2.0-flash</option>
               <option>gemini-2.5-pro</option>
             </select>
           </div>

           <div className="flex-1 flex flex-col">
             <label className="block text-xs font-medium text-zinc-500 mb-1">Prompt Injection / Input</label>
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="Enter the system prompt or user input to test the AI's structural response..."
               className="flex-1 w-full bg-black/30 border border-[var(--panel-border)] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none font-mono"
             />
           </div>

           <button 
             onClick={handleRunTest}
             disabled={isRunning || prompt.length === 0}
             className="mt-6 w-full py-3 rounded-lg bg-cyan-600 text-white font-semibold text-sm hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
           >
             {isRunning ? (
               <>
                 <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 Evaluating...
               </>
             ) : 'Run GenAI Test'}
           </button>
        </div>

        {/* Output Panel */}
        <div className="w-1/2 glass-panel p-6 flex flex-col relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
           <h3 className="text-sm font-semibold text-zinc-200 mb-4 uppercase tracking-wider flex justify-between">
             Evaluation Results
             {result && <span className="text-green-400 text-xs bg-green-500/20 px-2 py-0.5 rounded border border-green-500/30">Passed</span>}
           </h3>
           
           <div className="flex-1 bg-black/50 border border-[var(--panel-border)] rounded-lg p-4 font-mono text-xs overflow-auto">
              {isRunning ? (
                <div className="h-full flex items-center justify-center text-zinc-600">Waiting for LLM response...</div>
              ) : result ? (
                <pre className="text-green-300">{result}</pre>
              ) : (
                <div className="h-full flex items-center justify-center text-zinc-600">Run a test to see structural output.</div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
