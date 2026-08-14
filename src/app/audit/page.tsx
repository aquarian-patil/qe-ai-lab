"use client";
import { useState, useEffect } from 'react';

export default function AuditPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/governance/audit')
      .then(res => res.json())
      .then(data => setLogs(data.logs));
  }, []);

  return (
    <div className="flex flex-col relative overflow-hidden glass-panel !border-0 md:!border !rounded-none md:!rounded-2xl h-full">
      <header className="px-4 md:px-8 py-6 border-b border-slate-700 bg-slate-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Immutable Audit Log</h2>
          <p className="text-sm text-slate-300 mt-1">SOC2 compliant tracking of all AI and User actions.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-slate-800 border border-slate-700 rounded-lg w-full md:w-auto mt-2 md:mt-0">
          <svg className="w-3 h-3 md:w-4 md:h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search logs..." className="bg-transparent border-none text-[10px] md:text-sm text-white focus:outline-none w-full md:w-48" />
        </div>
      </header>

      <div className="flex-1 overflow-hidden p-4 md:p-8">
        <div className="w-full h-full rounded-xl border border-slate-700 bg-slate-800 overflow-hidden flex flex-col">
          
          <div className="flex-1 overflow-auto custom-scrollbar">
            <div className="w-full">
              {/* Header - Hidden on mobile */}
              <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 border-b border-slate-700 bg-slate-800 text-[10px] md:text-xs uppercase tracking-widest font-bold text-slate-300 sticky top-0 z-10 shadow-sm">
                <div>Timestamp</div>
                <div>Actor</div>
                <div className="col-span-2">Action</div>
                <div>Status</div>
              </div>

              <div>
                {logs.map((log) => (
                  <div key={log.id} className="flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-4 px-4 md:px-6 py-4 border-b border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                    {/* Mobile Only: Top Row */}
                    <div className="flex justify-between md:hidden mb-1">
                      <span className="text-white font-medium text-xs">{log.actorName}</span>
                      <span className="text-slate-400 font-mono text-[10px]">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>

                    {/* Desktop Only: Grid cells */}
                    <div className="hidden md:flex text-slate-300 font-mono text-[10px] md:text-xs items-center">{new Date(log.timestamp).toLocaleString()}</div>
                    <div className="hidden md:flex text-white font-medium items-center text-xs md:text-sm">{log.actorName}</div>
                    
                    <div className="md:col-span-2 flex flex-col justify-center">
                      <span className="text-white font-bold text-[11px] md:text-sm leading-tight md:leading-normal">{log.action}</span>
                      <span className="text-slate-400 text-[10px] md:text-xs truncate mt-0.5 md:mt-0">{log.target}</span>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-start mt-2 md:mt-0">
                      <span className="md:hidden text-[10px] text-slate-500 uppercase tracking-widest font-bold">Status</span>
                      <span className={`px-2 py-0.5 md:py-1 rounded text-[9px] md:text-xs font-bold tracking-widest ${
                        log.status === 'SUCCESS' ? 'bg-green-500/10 text-green-400' :
                        log.status === 'FAILURE' ? 'bg-red-500/10 text-red-400' :
                        'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
