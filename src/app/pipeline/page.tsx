export default function PipelineViewer() {
  return (
    <div className="h-full flex flex-col">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">CI/CD <span className="text-cyan-400">Pipeline</span></h2>
        <p className="text-sm text-zinc-400 mt-1">Real-time view of the Agentic Engine analyzing git diffs and running tests.</p>
      </header>

      <div className="flex-1 glass-panel overflow-hidden flex flex-col">
        {/* Pipeline Header */}
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-[var(--panel-border)] bg-black/40 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          <div className="col-span-1">Commit / Trigger</div>
          <div className="col-span-1">Domain</div>
          <div className="col-span-1">AI Action</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Duration</div>
        </div>

        {/* Pipeline Rows */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          
          <PipelineRow 
            commit="Update dashboard layout" 
            hash="a1b2c3d" 
            domain="ui/dashboard" 
            action="Generated 2 Playwright Tests" 
            status="Passed" 
            time="45s" 
          />
          
          <PipelineRow 
            commit="Change submit button ID" 
            hash="f9e8d7c" 
            domain="ui/product" 
            action="Self-Healed Locator" 
            status="Healed" 
            time="12s" 
            isWarning 
          />
          
          <PipelineRow 
            commit="Refactor auth logic" 
            hash="b5n6m7l" 
            domain="api/auth" 
            action="Updated Jest Suite" 
            status="Passed" 
            time="30s" 
          />
          
          {/* Active Running Row */}
          <div className="grid grid-cols-5 gap-4 p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 items-center animate-pulse">
            <div className="col-span-1 flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <div>
                <p className="text-sm font-medium text-cyan-400">Add payment gateway</p>
                <p className="text-xs text-cyan-500/70 font-mono">Running (HEAD)</p>
              </div>
            </div>
            <div className="col-span-1 text-sm text-cyan-300">api/checkout</div>
            <div className="col-span-1 text-sm text-cyan-300">Analyzing git diff...</div>
            <div className="col-span-1">
              <span className="px-2 py-1 rounded text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">In Progress</span>
            </div>
            <div className="col-span-1 text-right text-sm text-cyan-300">04s</div>
          </div>

        </div>
      </div>
    </div>
  );
}

function PipelineRow({ commit, hash, domain, action, status, time, isWarning }: any) {
  const statusColor = status === 'Passed' ? 'text-green-400 bg-green-500/20 border-green-500/30' : 
                      status === 'Healed' ? 'text-orange-400 bg-orange-500/20 border-orange-500/30' : 
                      'text-red-400 bg-red-500/20 border-red-500/30';

  return (
    <div className={`grid grid-cols-5 gap-4 p-4 rounded-xl border border-[var(--panel-border)] bg-black/20 hover:bg-white/5 transition-colors items-center ${isWarning ? 'border-l-4 border-l-orange-500' : ''}`}>
      <div className="col-span-1">
        <p className="text-sm font-medium text-white truncate">{commit}</p>
        <p className="text-xs text-zinc-500 font-mono">{hash}</p>
      </div>
      <div className="col-span-1 text-sm text-zinc-400">{domain}</div>
      <div className="col-span-1 text-sm text-zinc-300 flex items-center gap-2">
        {isWarning && <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        {action}
      </div>
      <div className="col-span-1">
        <span className={`px-2 py-1 rounded text-xs font-bold border ${statusColor}`}>{status}</span>
      </div>
      <div className="col-span-1 text-right text-sm text-zinc-500">{time}</div>
    </div>
  );
}
