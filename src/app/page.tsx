"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pipeline')
      .then(res => res.json())
      .then(d => {
        if (d.success) {
          setData(d.metrics);
        }
      });
  }, []);

  if (!data) {
    return <div className="h-full flex items-center justify-center text-slate-300">Loading Command Center...</div>;
  }

  // Mock historical data for the trend graph based on the current score
  const trendData = [
    { name: 'Jan', score: 2.1 },
    { name: 'Feb', score: 2.4 },
    { name: 'Mar', score: 2.9 },
    { name: 'Apr', score: 3.2 },
    { name: 'May', score: 3.8 },
    { name: 'Jun', score: data.maturityLevel }
  ];

  return (
    <div className="flex flex-col gap-6 relative pb-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:h-[400px] shrink-0">
        {/* Trend Graph */}
        <div className="flex-1 glass-panel p-6 flex flex-col h-[300px] lg:h-auto">
          <h3 className="text-base md:text-lg font-bold text-white mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
            6-Month Maturity Trend
          </h3>
          <div className="flex-1 w-full min-h-[200px] lg:min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" axisLine={false} tickLine={false} />
                <YAxis stroke="#666" axisLine={false} tickLine={false} domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Score */}
        <div className="w-full lg:w-[300px] py-12 lg:py-6 glass-panel p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10 text-center">
            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-2">Current Maturity</p>
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-2">
              L{data.maturityLevel.toFixed(1)}
            </h1>
            <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">Autonomous Execution</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        <MaturityCard title="Code Quality" score={data.codeQuality.score} icon="💻" color="from-blue-500/20 to-blue-600/20" borderColor="border-blue-500/30" textColor="text-blue-400" />
        <MaturityCard title="Agentic Testing" score={data.agenticTesting.score} icon="🤖" color="from-violet-500/20 to-violet-600/20" borderColor="border-violet-500/30" textColor="text-violet-400" />
        <MaturityCard title="CI/CD Velocity" score={data.cicd.score} icon="🚀" color="from-rose-500/20 to-rose-600/20" borderColor="border-rose-500/30" textColor="text-rose-400" />
        <MaturityCard title="Security & NFR" score={data.securityNfr.score} icon="🛡️" color="from-orange-500/20 to-orange-600/20" borderColor="border-orange-500/30" textColor="text-orange-400" />
      </div>





      <div className="mt-6 glass-panel p-6 shrink-0">
        <h3 className="text-base md:text-lg font-bold text-white mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          DevSecOps Autonomous Maturity Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <MaturityLevel level={1} title="Manual / Ad-Hoc" desc="Siloed testing, manual security scans, disconnected delivery." active={data.maturityLevel >= 1 && data.maturityLevel < 2} />
          <MaturityLevel level={2} title="Automated Pipeline" desc="CI/CD integration, unit test automation, basic SAST." active={data.maturityLevel >= 2 && data.maturityLevel < 3} />
          <MaturityLevel level={3} title="Predictive Intelligence" desc="Test impact analysis, anomaly detection, data-driven." active={data.maturityLevel >= 3 && data.maturityLevel < 4} />
          <MaturityLevel level={4} title="Agentic Self-Healing" desc="Autonomous UI healing, dynamic DAST patching, AI agents." active={data.maturityLevel >= 4 && data.maturityLevel < 5} />
          <MaturityLevel level={5} title="Autonomous Ecosystem" desc="Zero-touch factory, omni-ingestion generation, Skynet." active={data.maturityLevel >= 5} />
        </div>
      </div>

      <header className="px-8 py-6 glass-panel flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10" />
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">Executive Command Center</h2>
          <p className="text-sm text-slate-300 mt-1">Holistic DevSecOps Maturity & Autonomous Ecosystem Status</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
          <Link href="/audit" className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-300 text-white font-bold text-sm transition-colors border border-slate-700 flex items-center justify-center">
            View Audit Log
          </Link>
          <Link href="/genesis" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center">
            Trigger Autonomous Run
          </Link>
        </div>
      </header>
    </div>
  );
}

function MaturityCard({ title, score, icon, color, borderColor, textColor }: any) {
  const scaledScore = score / 20;
  return (
    <div className={`p-6 rounded-2xl border ${borderColor} bg-gradient-to-br ${color} backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-bold text-slate-300 mb-1">{title}</p>
          <p className={`text-3xl font-black ${textColor}`}>{scaledScore.toFixed(1)}<span className="text-lg opacity-50">/5</span></p>
        </div>
        <span className="text-2xl bg-slate-700 p-2 rounded-xl">{icon}</span>
      </div>
      
      <div className="mt-6 w-full h-2 bg-slate-900/90 rounded-full overflow-hidden relative z-10">
        <div 
          className={`h-full ${textColor.replace('text-', 'bg-')} transition-all duration-1000 ease-out`}
          style={{ width: `${(scaledScore / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

function MaturityLevel({ level, title, desc, active }: { level: number, title: string, desc: string, active: boolean }) {
  return (
    <div className={`p-4 rounded-xl border transition-all duration-500 relative overflow-hidden
      ${active ? 'border-blue-500 bg-blue-50 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.02]' : 'border-slate-700 bg-slate-950 opacity-60'}`}
    >
      {active && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-blue-500" />}
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-black px-2 py-1 rounded-md ${active ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-700'}`}>L{level}</span>
        <h4 className={`text-sm font-bold ${active ? 'text-blue-600' : 'text-slate-700'}`}>{title}</h4>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}
