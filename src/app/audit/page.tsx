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
    <div className="h-full m-4 flex flex-col relative overflow-hidden glass-panel">
      <header className="px-4 md:px-8 py-6 border-b border-slate-300 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-wide">Immutable Audit Log</h2>
          <p className="text-sm text-slate-800 mt-1">SOC2 compliant tracking of all AI and User actions.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg">
          <svg className="w-4 h-4 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search logs..." className="bg-transparent border-none text-sm text-slate-900 focus:outline-none w-48" />
        </div>
      </header>

      <div className="flex-1 overflow-hidden p-4 md:p-8">
        <div className="w-full h-full rounded-xl border border-slate-300 bg-slate-100 overflow-hidden flex flex-col">
          
          <div className="flex-1 overflow-auto">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-slate-300 bg-slate-100 text-xs uppercase tracking-widest font-bold text-slate-800 sticky top-0 z-10 shadow-sm">
                <div>Timestamp</div>
                <div>Actor</div>
                <div className="col-span-2">Action</div>
                <div>Status</div>
              </div>

              <div>
                {logs.map((log) => (
                  <div key={log.id} className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-slate-300/50 hover:bg-slate-200/50 transition-colors text-sm">
                    <div className="text-slate-800 font-mono text-xs flex items-center">{new Date(log.timestamp).toLocaleString()}</div>
                    <div className="text-slate-900 font-medium flex items-center">{log.actorName}</div>
                    <div className="col-span-2 flex flex-col justify-center">
                      <span className="text-slate-900 font-bold">{log.action}</span>
                      <span className="text-slate-800 text-xs truncate">{log.target}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold tracking-widest ${
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
