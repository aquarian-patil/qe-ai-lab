export default function Home() {
  return (
    <div className="h-full glass-panel m-4 flex flex-col relative overflow-hidden">
      
      {/* Header */}
      <header className="px-8 py-6 border-b border-[var(--panel-border)] flex justify-between items-center bg-black/20">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">Command Center</h2>
          <p className="text-sm text-zinc-400 mt-1">Monitor your Agentic QE pipeline in real-time.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-sm font-medium hover:bg-zinc-700 transition-colors">
            View CI/CD Logs
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
            Run Pipeline
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 overflow-y-auto p-8">
        
        {/* Metric Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="animate-slide-up"><MetricCard title="Tests Generated" value="1,204" trend="+12% this week" color="text-cyan-400" /></div>
          <div className="animate-slide-up delay-100"><MetricCard title="Self-Healed Scripts" value="89" trend="98% Success Rate" color="text-purple-400" /></div>
          <div className="animate-slide-up delay-200"><MetricCard title="Maturity Level" value="Level 3" trend="Autonomous Mode" color="text-pink-400" /></div>
        </div>

        {/* Modules */}
        <h3 className="text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-2 animate-slide-up delay-100">
          <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
          Testing Sandboxes
        </h3>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="animate-slide-up delay-100">
          <ModuleCard 
            title="GenAI Evaluator"
            description="Test pure LLM inputs/outputs for structure and hallucinations."
            icon="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            status="Active"
            color="from-cyan-500/20 to-blue-500/5"
            borderHover="hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)]"
          />
          </div>
          <div className="animate-slide-up delay-200">
          <ModuleCard 
            title="AI Agent Simulator"
            description="Evaluate if the AI correctly identifies and triggers external tools."
            icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            status="Active"
            color="from-purple-500/20 to-pink-500/5"
            borderHover="hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]"
          />
          </div>
          <div className="animate-slide-up delay-300">
          <ModuleCard 
            title="Agentic Arena"
            description="Visualize an autonomous AI's thought process as it executes multi-step goals."
            icon="M13 10V3L4 14h7v7l9-11h-7z"
            status="In Development"
            color="from-pink-500/20 to-orange-500/5"
            borderHover="hover:border-pink-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(236,72,153,0.2)]"
          />
          </div>
        </div>

        {/* Node Graph Mock Visualization */}
        <div className="mt-8 rounded-2xl border border-[var(--panel-border)] bg-black/40 h-64 p-6 relative overflow-hidden group cursor-pointer animate-slide-up delay-300 hover:border-cyan-500/30 transition-colors duration-500">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay group-hover:opacity-20 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full group-hover:scale-105 transition-transform duration-500">
            <svg className="w-12 h-12 text-zinc-500 mb-4 group-hover:text-cyan-400 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
            </svg>
            <p className="text-zinc-400 font-medium group-hover:text-white transition-colors duration-500">Live Agentic Thought-Graph Simulation</p>
            <p className="text-xs text-cyan-500/0 mt-2 group-hover:text-cyan-500/100 transition-colors duration-500">Click to enter the Arena &rarr;</p>
          </div>
          
          {/* Animated Mock Nodes */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#06b6d4] animate-pulse group-hover:shadow-[0_0_25px_#06b6d4] transition-shadow"></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_#a855f7] animate-pulse delay-75 group-hover:shadow-[0_0_25px_#a855f7] transition-shadow"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_15px_#ec4899] animate-pulse delay-150 group-hover:shadow-[0_0_25px_#ec4899] transition-shadow"></div>
          
          {/* Connecting Line Mock */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg">
             <path d="M 25% 25% Q 40% 50% 66% 50%" stroke="#06b6d4" strokeWidth="2" fill="transparent" className="animate-dash" strokeDasharray="5,5" />
             <path d="M 66% 50% Q 50% 75% 33% 75%" stroke="#a855f7" strokeWidth="2" fill="transparent" className="animate-dash" strokeDasharray="5,5" />
          </svg>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, color }: { title: string; value: string; trend: string; color: string }) {
  return (
    <div className="bg-white/5 border border-[var(--panel-border)] rounded-xl p-5 hover:bg-white/10 transition-colors shimmer-hover">
      <p className="text-sm font-medium text-zinc-400 mb-1">{title}</p>
      <h4 className="text-3xl font-bold text-white mb-2">{value}</h4>
      <p className={`text-xs font-semibold ${color}`}>{trend}</p>
    </div>
  );
}

function ModuleCard({ title, description, icon, status, color, borderHover }: { title: string; description: string; icon: string; status: string; color: string; borderHover: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} border border-[var(--panel-border)] rounded-xl p-6 transition-all duration-300 cursor-pointer ${borderHover} group relative overflow-hidden h-full shimmer-hover`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-black/30 rounded-lg group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border ${status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'}`}>
          {status}
        </span>
      </div>
      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">{title}</h4>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
