'use client';
import { useState } from 'react';

export default function AgentSimulator() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'Agent Simulator initialized. Define a tool to evaluate.' }]);

  return (
    <div className="h-full flex flex-col">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">AI Agent <span className="text-purple-400">Simulator</span></h2>
        <p className="text-sm text-zinc-400 mt-1">Evaluate if the AI correctly identifies and triggers external tools.</p>
      </header>

      <div className="flex gap-6 flex-1 overflow-hidden pb-4">
        {/* Tool Definition Panel */}
        <div className="w-1/3 glass-panel p-6 flex flex-col">
          <h3 className="text-sm font-semibold text-zinc-200 mb-4 uppercase tracking-wider border-b border-[var(--panel-border)] pb-2">Tool Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Tool Name</label>
              <input type="text" defaultValue="getWeather" className="w-full bg-black/30 border border-[var(--panel-border)] rounded-lg px-3 py-2 text-sm text-white font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Description (Seen by AI)</label>
              <textarea defaultValue="Fetches the current weather for a given city." className="w-full bg-black/30 border border-[var(--panel-border)] rounded-lg p-3 text-sm text-white resize-none h-24" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Parameters (JSON Schema)</label>
              <textarea defaultValue={`{\n  "city": "string"\n}`} className="w-full bg-black/30 border border-[var(--panel-border)] rounded-lg p-3 text-sm text-green-400 font-mono resize-none h-24" />
            </div>
            <button className="w-full py-2 rounded-lg bg-zinc-800 text-white text-sm font-medium border border-zinc-700 hover:bg-zinc-700 transition-colors">
              Update Tool Schema
            </button>
          </div>
        </div>

        {/* Chat / Evaluation Panel */}
        <div className="flex-1 glass-panel flex flex-col overflow-hidden relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
           
           <div className="flex-1 p-6 overflow-y-auto space-y-4">
             {messages.map((msg, i) => (
               <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-zinc-800/80 text-zinc-200 border border-zinc-700 rounded-bl-none'}`}>
                   {msg.content}
                 </div>
               </div>
             ))}
             
             {/* Mock AI Tool Call */}
             <div className="flex justify-start">
               <div className="max-w-[80%] rounded-2xl p-4 text-sm bg-black/50 border border-purple-500/30 text-purple-300 font-mono">
                 <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold uppercase text-[10px] tracking-wider">
                   <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0..."></path></svg>
                   Executing Tool
                 </div>
                 Tool: getWeather<br/>
                 Params: {`{ "city": "London" }`}
               </div>
             </div>
           </div>

           <div className="p-4 border-t border-[var(--panel-border)] bg-black/20">
             <div className="flex gap-3">
               <input type="text" placeholder="Send a message to test tool triggering... (e.g. Is it raining in London?)" className="flex-1 bg-black/40 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500" />
               <button className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold text-sm hover:bg-purple-500 transition-colors">
                 Send
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
