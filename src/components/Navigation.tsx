"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ComingSoon from '@/components/ComingSoon';
import HitlBadge from '@/components/HitlBadge';

export default function Navigation({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Background Glows (Hidden on Mobile) */}
      <div className="hidden md:block bg-glow-purple top-[-100px] left-[-100px] absolute z-0" />
      <div className="hidden md:block bg-glow-cyan bottom-[-100px] right-[-100px] absolute z-0" />

      {/* Global Executive Header */}
      <header className="h-16 glass-panel mx-0 mt-0 md:mx-4 md:mt-4 !rounded-none md:!rounded-2xl !border-x-0 !border-t-0 md:!border-x md:!border-t px-4 flex justify-between items-center z-30 relative shrink-0">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="relative w-9 h-9 rounded-xl bg-slate-900/90 border border-blue-500/50 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.3)] group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-violet-500/20 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute w-4 h-4 bg-blue-400 rounded-full blur-[8px] animate-pulse" />
            <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-700 to-blue-500">
            Nexus <span className="font-light text-blue-500/80">AI</span>
          </h1>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6">
          {/* Hamburger Icon for Mobile */}
          <button 
            className="md:hidden p-2 -mr-2 text-slate-300 hover:bg-slate-200/50 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <ComingSoon className="hidden md:block">
            <div className="relative">
              <input type="text" placeholder="Search tests, agents..." className="bg-slate-950 border border-slate-700 rounded-full px-4 py-1.5 text-sm text-white placeholder-slate-500 w-64 focus:outline-none focus:border-violet-500 transition-colors pointer-events-none" />
            </div>
          </ComingSoon>
          <ComingSoon className="hidden md:block">
            <button className="relative text-slate-300 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
            </button>
          </ComingSoon>
          <ComingSoon className="hidden md:block">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden hover:opacity-80 transition-opacity">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CEO" alt="Profile" />
            </div>
          </ComingSoon>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

      {/* Mobile Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 md:z-10
        w-64 glass-panel md:m-4 md:mt-2 flex flex-col p-4 overflow-y-auto 
        border-r border-slate-700 shadow-2xl md:shadow-none
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="md:hidden flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
          <h2 className="font-bold text-slate-300">Menu</h2>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-slate-200 rounded-full text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        {/* Mobile Header Elements */}
        <div className="md:hidden flex flex-col gap-4 mb-6 pb-6 border-b border-slate-700">
          <ComingSoon>
            <input type="text" placeholder="Search tests, agents..." className="bg-slate-950 border border-slate-700 rounded-full px-4 py-2 text-sm text-white placeholder-slate-500 w-full focus:outline-none focus:border-violet-500 transition-colors pointer-events-none" />
          </ComingSoon>
          <div className="flex justify-between items-center px-2">
            <ComingSoon>
              <button className="relative text-slate-300 hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium">
                <div className="relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                </div>
                Alerts
              </button>
            </ComingSoon>
            <ComingSoon>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CEO" alt="Profile" />
                </div>
                <span className="text-sm text-slate-300 font-medium">Profile</span>
              </div>
            </ComingSoon>
          </div>
        </div>
        
        <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold mb-3 mt-2 px-4">Command Center</p>
        <nav className="space-y-1">
          <NavItem href="/" label="Executive Dashboard" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" onClick={() => setMobileMenuOpen(false)} active={pathname === '/'} />
          <NavItem href="/pipeline" label="CI/CD Pipeline Viewer" icon="M13 10V3L4 14h7v7l9-11h-7z" onClick={() => setMobileMenuOpen(false)} active={pathname === '/pipeline'} />
        </nav>
        
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-6 mb-3 px-3">God Mode</p>
        <Link href="/genesis" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm transition-colors group relative overflow-hidden mb-6 ${pathname === '/genesis' ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold' : 'border-transparent text-slate-300 hover:text-blue-600 hover:bg-slate-200/50'}`}>
          <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <span className="font-medium tracking-wide relative z-10">Genesis Engine</span>
        </Link>

        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-2 mb-3 px-3">Enterprise Governance</p>
        <nav className="space-y-1 mb-6">
          <Link href="/approvals" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors group cursor-pointer ${pathname === '/approvals' ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : 'text-slate-300 hover:bg-slate-200/50 hover:text-blue-600 border border-transparent'}`}>
            <span className="text-xl group-hover:scale-110 transition-transform">🛡️</span>
            HITL Approvals
            <HitlBadge />
          </Link>
          <Link href="/audit" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors group cursor-pointer ${pathname === '/audit' ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : 'text-slate-300 hover:bg-slate-200/50 hover:text-blue-600 border border-transparent'}`}>
            <span className="text-xl group-hover:scale-110 transition-transform">📜</span>
            Audit Logs
          </Link>
          <Link href="/integrations" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors group cursor-pointer ${pathname === '/integrations' ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : 'text-slate-300 hover:bg-slate-200/50 hover:text-blue-600 border border-transparent'}`}>
            <span className="text-xl group-hover:scale-110 transition-transform">🔌</span>
            Integrations Config
          </Link>
        </nav>

        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-2 mb-3 px-3">Testing Sandboxes</p>
        <nav className="space-y-1 mb-6">
          <NavItem href="/sandboxes/gen-ai" label="GenAI Evaluator" icon="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" onClick={() => setMobileMenuOpen(false)} active={pathname === '/sandboxes/gen-ai'} />
          <NavItem href="/sandboxes/ai-agent" label="AI Agent Evaluator" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" onClick={() => setMobileMenuOpen(false)} active={pathname === '/sandboxes/ai-agent'} />
          <NavItem href="/sandboxes/agentic-arena" label="Agentic AI Evaluator" icon="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" onClick={() => setMobileMenuOpen(false)} active={pathname === '/sandboxes/agentic-arena'} />
        </nav>
        
        <div className="mt-auto pt-6 border-t border-slate-700 flex flex-col gap-4">
          <ComingSoon>
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-3 hover:bg-slate-200 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center font-bold text-white text-xs shadow-lg shrink-0">
                SA
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">System Admin</span>
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Admin Role</span>
              </div>
            </div>
          </ComingSoon>
          
          <ComingSoon>
            <div className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-slate-200/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-300">Engine Online</p>
                <p className="text-[10px] text-slate-400">v1.0.0-rc1</p>
              </div>
            </div>
          </ComingSoon>
        </div>
      </aside>

      {/* Main Content Rendered Next to Sidebar */}
      {children}
      </div>
    </div>
  );
}

function NavItem({ href, label, icon, onClick, active }: { href: string; label: string; icon: string; onClick?: () => void; active?: boolean }) {
  return (
    <Link href={href} onClick={onClick} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${active ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : 'text-slate-300 hover:text-blue-600 hover:bg-slate-200/50 border border-transparent'}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <span className="font-medium text-sm tracking-wide">{label}</span>
    </Link>
  );
}
