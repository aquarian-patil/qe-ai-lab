"use client";
import { useState, useEffect } from 'react';

export default function ApprovalsPage() {
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/governance/hitl')
      .then(res => res.json())
      .then(data => {
        setQueue(data.queue);
        setLoading(false);
      });
  }, []);

  const resolve = async (id: string, action: 'APPROVED' | 'REJECTED') => {
    await fetch('/api/governance/hitl', {
      method: 'POST',
      body: JSON.stringify({ id, action })
    });
    setQueue(queue.filter(q => q.id !== id));
  };

  return (
    <div className="h-full m-0 md:m-4 flex flex-col relative overflow-hidden glass-panel !border-0 md:!border !rounded-none md:!rounded-2xl">
      <header className="px-4 md:px-8 py-6 border-b border-slate-300 bg-slate-50 shrink-0">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-wide">Human-in-the-Loop (HITL) Queue</h2>
        <p className="text-sm text-slate-800 mt-1">Review and approve high-risk autonomous AI actions before execution.</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {loading ? (
          <p className="text-slate-800">Loading queue...</p>
        ) : queue.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-800">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-lg">No pending approvals.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {queue.map((req) => (
              <div key={req.id} className="p-4 md:p-6 rounded-xl border border-slate-300 bg-slate-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-slate-800">{req.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-widest ${req.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {req.riskLevel} RISK
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 uppercase tracking-widest font-bold">
                      {req.pipeline}
                    </span>
                  </div>
                  <p className="text-slate-900 font-medium text-lg">{req.description}</p>
                  <p className="text-xs text-slate-800 mt-2">Requested: {new Date(req.requestedAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                  <button onClick={() => resolve(req.id, 'REJECTED')} className="flex-1 xl:flex-none px-6 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 font-bold transition-all text-center">
                    Reject
                  </button>
                  <button onClick={() => resolve(req.id, 'APPROVED')} className="flex-1 xl:flex-none px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] text-center">
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
