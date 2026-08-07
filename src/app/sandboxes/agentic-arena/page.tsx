export default function AgenticArena() {
  return (
    <div className="h-full flex flex-col">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">Agentic <span className="text-pink-400">Arena</span></h2>
        <p className="text-sm text-zinc-400 mt-1">Visualize an autonomous AI's step-by-step reasoning and action loop.</p>
      </header>

      <div className="flex-1 glass-panel relative overflow-hidden flex flex-col">
        {/* Top Bar Goal */}
        <div className="p-4 border-b border-[var(--panel-border)] bg-black/30 flex items-center justify-between z-10">
          <div>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Current Autonomous Goal</p>
            <p className="text-sm font-medium text-white">"Navigate the filesystem, find the broken login component, and fix the CSS bug."</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-colors">
            Interrupt Loop
          </button>
        </div>

        {/* Node Graph Area */}
        <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
          
          {/* Node 1: Thought */}
          <div className="absolute top-12 left-1/4 w-64 glass-panel p-4 border-t-4 border-t-purple-500">
            <p className="text-[10px] uppercase font-bold text-purple-400 mb-1">Step 1: Thought</p>
            <p className="text-xs text-zinc-300">I need to list the contents of the `src/components` directory to find the login component.</p>
          </div>

          {/* Line connecting 1 to 2 */}
          <svg className="absolute top-28 left-[35%] w-32 h-16 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
             <path d="M 0 0 C 20 50, 80 50, 100 80" stroke="#a855f7" strokeWidth="2" fill="transparent" className="animate-dash" strokeDasharray="5,5" />
          </svg>

          {/* Node 2: Action */}
          <div className="absolute top-48 left-1/3 w-64 glass-panel p-4 border-t-4 border-t-cyan-500 ml-12">
            <p className="text-[10px] uppercase font-bold text-cyan-400 mb-1">Step 2: Action</p>
            <p className="text-xs text-zinc-300 font-mono bg-black/50 p-2 rounded mt-1">list_dir("src/components")</p>
          </div>

          {/* Line connecting 2 to 3 */}
          <svg className="absolute top-[16rem] left-[45%] w-32 h-24 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
             <path d="M 0 0 C 20 80, 80 80, 100 120" stroke="#06b6d4" strokeWidth="2" fill="transparent" className="animate-dash" strokeDasharray="5,5" />
          </svg>

          {/* Node 3: Observation */}
          <div className="absolute top-80 left-1/2 w-64 glass-panel p-4 border-t-4 border-t-green-500 ml-12 animate-pulse">
            <p className="text-[10px] uppercase font-bold text-green-400 mb-1">Step 3: Observation</p>
            <p className="text-xs text-zinc-300 h-16 overflow-hidden">
              [<br/>
              &nbsp;&nbsp;"Header.tsx",<br/>
              &nbsp;&nbsp;"LoginForm.tsx"<br/>
              ]
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
