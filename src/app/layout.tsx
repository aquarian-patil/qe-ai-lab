import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aegis QE',
  description: 'Enterprise Agentic Quality Engineering Framework',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen overflow-hidden antialiased flex-col">
        
        {/* Background Glows */}
        <div className="bg-glow-purple top-[-100px] left-[-100px]" />
        <div className="bg-glow-cyan bottom-[-100px] right-[-100px]" />

        {/* Global Executive Header */}
        <header className="h-16 glass-panel mx-4 mt-4 px-6 flex justify-between items-center z-20">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            {/* Highly Creative CSS Logo */}
            <div className="relative w-9 h-9 rounded-xl bg-black/50 border border-cyan-500/50 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.3)] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute w-4 h-4 bg-cyan-400 rounded-full blur-[8px] animate-pulse" />
              <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
              Nexus <span className="font-light text-cyan-500/80">AI</span>
            </h1>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Search tests, agents..." className="bg-black/20 border border-[var(--panel-border)] rounded-full px-4 py-1.5 text-sm text-white w-64 focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 cursor-pointer overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CEO" alt="Profile" />
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 glass-panel m-4 mt-2 flex flex-col p-4 z-10">
            <nav className="flex-1 space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-3 mt-2 px-4">Command Center</p>
              <NavItem href="/" label="Executive Dashboard" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              <NavItem href="/pipeline" label="CI/CD Pipeline Viewer" icon="M13 10V3L4 14h7v7l9-11h-7z" />
              
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-3 mt-8 px-4">Testing Sandboxes</p>
              <NavItem href="/sandboxes/gen-ai" label="GenAI Evaluator" icon="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <NavItem href="/sandboxes/ai-agent" label="Agent Simulator" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <NavItem href="/sandboxes/agentic-arena" label="Agentic Arena" icon="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-3 mt-8 px-4">Ecosystem</p>
              <NavItem href="/integrations" label="Enterprise Integrations" icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </nav>
            
            <div className="mt-auto pt-6 border-t border-[var(--panel-border)] px-4 pb-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="text-xs font-semibold text-zinc-200">Engine Online</p>
                  <p className="text-[10px] text-zinc-500">v1.0.0-beta</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-4 pl-0 mt-[-8px] relative z-10 flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-4">
               {children}
            </div>
            
            {/* Universal Footer */}
            <footer className="mt-4 py-3 border-t border-[var(--panel-border)] flex justify-between items-center text-xs text-zinc-500 pr-4">
               <div className="flex gap-4">
                 <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
                 <a href="#" className="hover:text-zinc-300">Security Audits</a>
                 <a href="#" className="hover:text-zinc-300">Terms of Service</a>
               </div>
               <div className="flex gap-4">
                 <a href="#" className="hover:text-zinc-300 flex items-center gap-1">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                   Confluence Wiki
                 </a>
                 <span>&copy; {new Date().getFullYear()} Nexus AI Enterprise</span>
               </div>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-zinc-400 hover:text-zinc-200 hover:bg-white/5`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <span className="font-medium text-sm tracking-wide">{label}</span>
    </Link>
  );
}
