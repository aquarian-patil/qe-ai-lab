'use client';
import { useState } from 'react';

export default function Integrations() {
  return (
    <div className="h-full flex flex-col">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">Enterprise <span className="text-cyan-400">Integrations</span></h2>
        <p className="text-sm text-zinc-400 mt-1">Configure external services for the Agentic QE Framework.</p>
      </header>

      <div className="grid grid-cols-2 gap-6 overflow-y-auto pb-8">
        <IntegrationCard 
          title="Jira Ticketing" 
          description="Allow the self-healing agent to autonomously log unhealable defects as Jira issues."
          icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          fields={[{ label: 'Workspace URL', placeholder: 'https://company.atlassian.net' }, { label: 'API Token', type: 'password' }]}
          isActive={true}
        />
        
        <IntegrationCard 
          title="Confluence Wiki" 
          description="Automatically publish test run summaries and AI coverage reports to Confluence."
          icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          fields={[{ label: 'Space Key', placeholder: 'QA' }, { label: 'API Token', type: 'password' }]}
          isActive={false}
        />

        <IntegrationCard 
          title="Database Seed Engine" 
          description="Allow the framework to query databases to verify backend states or seed fixtures."
          icon="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          fields={[{ label: 'Connection String', type: 'password', placeholder: 'postgresql://user:pass@localhost:5432/db' }]}
          isActive={true}
        />
      </div>
    </div>
  );
}

function IntegrationCard({ title, description, icon, fields, isActive: defaultActive }: any) {
  const [active, setActive] = useState(defaultActive);

  return (
    <div className="glass-panel p-6 flex flex-col relative overflow-hidden transition-all hover:border-zinc-500/50">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-zinc-800/50 rounded-lg text-cyan-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-zinc-400 mt-1">Integration Settings</p>
          </div>
        </div>
        
        {/* Toggle Switch */}
        <button 
          onClick={() => setActive(!active)}
          className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-cyan-500' : 'bg-zinc-700'}`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${active ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <p className="text-sm text-zinc-400 mb-6">{description}</p>
      
      <div className={`space-y-4 transition-opacity ${active ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
        {fields.map((f: any, i: number) => (
          <div key={i}>
            <label className="block text-xs font-medium text-zinc-500 mb-1">{f.label}</label>
            <input 
              type={f.type || 'text'} 
              placeholder={f.placeholder}
              className="w-full bg-black/30 border border-[var(--panel-border)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        ))}
        <button className="w-full py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm font-medium hover:bg-zinc-700 transition-colors">
          Save Configuration
        </button>
      </div>
    </div>
  );
}
