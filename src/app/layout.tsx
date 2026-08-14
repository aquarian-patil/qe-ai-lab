import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import ComingSoon from '@/components/ComingSoon';
import HitlBadge from '@/components/HitlBadge';

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
            <div className="relative w-9 h-9 rounded-xl bg-white/90 border border-blue-500/50 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.3)] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-violet-500/20 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute w-4 h-4 bg-blue-400 rounded-full blur-[8px] animate-pulse" />
              <svg className="w-5 h-5 text-slate-900 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-700 to-blue-500">
              Nexus <span className="font-light text-blue-500/80">AI</span>
            </h1>
          </Link>
          
          <div className="flex items-center gap-6">
            <ComingSoon>
              <div className="relative">
                <input type="text" placeholder="Search tests, agents..." className="bg-slate-50 border border-slate-300 rounded-full px-4 py-1.5 text-sm text-slate-900 placeholder-slate-500 w-64 focus:outline-none focus:border-violet-500 transition-colors pointer-events-none" />
              </div>
            </ComingSoon>
            <ComingSoon>
              <button className="relative text-slate-800 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              </button>
            </ComingSoon>
            <ComingSoon>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-300 overflow-hidden hover:opacity-80 transition-opacity">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CEO" alt="Profile" />
              </div>
            </ComingSoon>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 glass-panel m-4 mt-2 flex flex-col p-4 z-10 overflow-y-auto">
            
            <p className="text-[10px] text-slate-800 uppercase tracking-widest font-bold mb-3 mt-2 px-4">Command Center</p>
            <nav className="space-y-1">
              <NavItem href="/" label="Executive Dashboard" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              <NavItem href="/pipeline" label="CI/CD Pipeline Viewer" icon="M13 10V3L4 14h7v7l9-11h-7z" />
            </nav>
            
            <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mt-6 mb-3 px-3">God Mode</p>
            <Link href="/genesis" className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent text-slate-800 hover:text-blue-600 hover:bg-slate-200/50 transition-colors group relative overflow-hidden mb-6">
              <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="font-medium text-sm tracking-wide relative z-10">Genesis Engine</span>
            </Link>

            <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mt-2 mb-3 px-3">Enterprise Governance</p>
            <nav className="space-y-1 mb-6">
              <Link href="/approvals" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-800 hover:bg-slate-200/50 hover:text-blue-600 rounded-lg transition-colors group cursor-pointer">
                <span className="text-xl group-hover:scale-110 transition-transform">🛡️</span>
                HITL Approvals
                <HitlBadge />
              </Link>
              <Link href="/audit" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-800 hover:bg-slate-200/50 hover:text-blue-600 rounded-lg transition-colors group cursor-pointer">
                <span className="text-xl group-hover:scale-110 transition-transform">📜</span>
                Audit Logs
              </Link>
              <Link href="/integrations" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-800 hover:bg-slate-200/50 hover:text-blue-600 rounded-lg transition-colors group cursor-pointer">
                <span className="text-xl group-hover:scale-110 transition-transform">🔌</span>
                Integrations Config
              </Link>
            </nav>

            <p className="text-xs font-bold text-slate-800 uppercase tracking-widest mt-2 mb-3 px-3">Testing Sandboxes</p>
            <nav className="space-y-1 mb-6">
              <NavItem href="/sandboxes/gen-ai" label="GenAI Evaluator" icon="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <NavItem href="/sandboxes/ai-agent" label="AI Agent Evaluator" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <NavItem href="/sandboxes/agentic-arena" label="Agentic AI Evaluator" icon="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </nav>
            
            <div className="mt-auto pt-6 border-t border-slate-300 flex flex-col gap-4">
              {/* IAM RBAC Indicator */}
              <ComingSoon>
                <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 flex items-center gap-3 hover:bg-slate-200 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center font-bold text-slate-900 text-xs shadow-lg shrink-0">
                    SA
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 leading-tight">System Admin</span>
                    <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Admin Role</span>
                  </div>
                </div>
              </ComingSoon>
              
              {/* Engine Status */}
              <ComingSoon>
                <div className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-slate-200/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Engine Online</p>
                    <p className="text-[10px] text-slate-500">v1.0.0-rc1</p>
                  </div>
                </div>
              </ComingSoon>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-4 pl-0 mt-[-8px] relative z-10 flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-4">
               {children}
            </div>
            
            {/* Universal Footer */}
            <footer className="mt-4 py-3 border-t border-slate-300 flex justify-between items-center text-xs text-slate-800 pr-4">
               <div className="flex gap-4">
                 <ComingSoon><span className="hover:text-blue-600 transition-colors">Privacy Policy</span></ComingSoon>
                 <ComingSoon><span className="hover:text-blue-600 transition-colors">Security Audits</span></ComingSoon>
                 <ComingSoon><span className="hover:text-blue-600 transition-colors">Terms of Service</span></ComingSoon>
               </div>
               <div className="flex gap-4">
                 <ComingSoon>
                   <span className="hover:text-blue-600 transition-colors flex items-center gap-1">
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                     Confluence Wiki
                   </span>
                 </ComingSoon>
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
    <Link href={href} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-slate-800 hover:text-blue-600 hover:bg-slate-200/50`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <span className="font-medium text-sm tracking-wide">{label}</span>
    </Link>
  );
}
