"use client";
import { useState } from 'react';

type ConnectionStatus = 'idle' | 'testing' | 'success' | 'error';

export default function IntegrationsPage() {
  const [gitProvider, setGitProvider] = useState('github');
  const [dbProvider, setDbProvider] = useState('postgres');
  const [almProvider, setAlmProvider] = useState('jira');
  const [saved, setSaved] = useState(false);
  
  const [gitStatus, setGitStatus] = useState<ConnectionStatus>('idle');
  const [dbStatus, setDbStatus] = useState<ConnectionStatus>('idle');
  const [almStatus, setAlmStatus] = useState<ConnectionStatus>('idle');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const testConnection = (setStatus: (s: ConnectionStatus) => void) => {
    setStatus('testing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    }, 2000);
  };

  const renderInput = (label: string, type: string = 'text', placeholder: string = '') => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
      />
    </div>
  );

  const renderBadge = (status: ConnectionStatus) => {
    if (status === 'idle') return null;
    if (status === 'testing') return <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 animate-pulse">Testing API...</span>;
    if (status === 'success') return <span className="text-xs px-2 py-1 rounded-md bg-green-100 text-green-700 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> Connected</span>;
    return <span className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-700">Failed</span>;
  };

  const renderTestButton = (status: ConnectionStatus, setStatus: (s: ConnectionStatus) => void) => (
    <button 
      onClick={() => testConnection(setStatus)}
      disabled={status === 'testing'}
      className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
    >
      {status === 'testing' ? 'Connecting...' : 'Test Connection'}
    </button>
  );

  return (
    <div className="flex flex-col relative glass-panel mb-8 !border-0 md:!border !rounded-none md:!rounded-2xl overflow-y-auto">
      <header className="px-4 md:px-8 py-6 border-b border-slate-700 bg-slate-950/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-2 md:gap-3">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Enterprise Integrations
          </h2>
          <p className="text-[10px] md:text-sm text-slate-400 mt-1">Configure vendor-agnostic IntegrationFactory adapters for the AI Swarms.</p>
        </div>
        <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all transform hover:-translate-y-0.5">
          {saved ? 'Configurations Saved!' : 'Save All Configurations'}
        </button>
      </header>

      <div className="p-4 md:p-8 flex flex-col gap-8 bg-slate-950/50 overflow-y-auto">
        
        {/* Version Control */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-sm p-4 md:p-6 flex flex-col xl:flex-row gap-6 md:gap-8">
          <div className="w-full xl:w-1/2">
            <h3 className="text-base md:text-lg font-bold text-white">Version Control (Git)</h3>
            <p className="text-[10px] md:text-xs text-slate-400 mb-4">Required for Agentic code analysis and automated PR generation.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <ProviderCard title="GitHub" active={gitProvider === 'github'} onClick={() => setGitProvider('github')} icon="🐙" />
              <ProviderCard title="GitLab" active={gitProvider === 'gitlab'} onClick={() => setGitProvider('gitlab')} icon="🦊" />
              <ProviderCard title="Bitbucket" active={gitProvider === 'bitbucket'} onClick={() => setGitProvider('bitbucket')} icon="🪣" />
              <ProviderCard title="Azure Repos" active={gitProvider === 'azure'} onClick={() => setGitProvider('azure')} icon="☁️" />
            </div>
          </div>
          <div className="w-full xl:w-1/2 bg-slate-950/50 rounded-xl p-6 border border-slate-800 flex flex-col shadow-inner">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-sm font-bold text-slate-300 capitalize">{gitProvider} Configuration</h4>
              {renderBadge(gitStatus)}
            </div>
            <div className="space-y-4 flex-1">
              {gitProvider === 'github' && (
                <>{renderInput('Personal Access Token', 'password', 'ghp_...')} {renderInput('Organization Name', 'text', 'acme-corp')}</>
              )}
              {gitProvider === 'gitlab' && (
                <>{renderInput('Instance URL', 'url', 'https://gitlab.com')} {renderInput('Personal Access Token', 'password', 'glpat-...')}</>
              )}
              {gitProvider === 'bitbucket' && (
                <>{renderInput('Workspace ID', 'text', 'acme')} {renderInput('App Password', 'password', '...')}</>
              )}
              {gitProvider === 'azure' && (
                <>{renderInput('Organization URL', 'url', 'https://dev.azure.com/acme')} {renderInput('Personal Access Token', 'password', '...')}</>
              )}
            </div>
            <div className="mt-6 pt-5 border-t border-slate-700 flex justify-end">
              {renderTestButton(gitStatus, setGitStatus)}
            </div>
          </div>
        </div>

        {/* Databases */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-sm p-4 md:p-6 flex flex-col xl:flex-row gap-6 md:gap-8">
          <div className="w-full xl:w-1/2">
            <h3 className="text-base md:text-lg font-bold text-white">Database Operations</h3>
            <p className="text-[10px] md:text-xs text-slate-400 mb-4">Required for automated schema generation and data verification.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <ProviderCard title="PostgreSQL" active={dbProvider === 'postgres'} onClick={() => setDbProvider('postgres')} icon="🐘" />
              <ProviderCard title="MySQL" active={dbProvider === 'mysql'} onClick={() => setDbProvider('mysql')} icon="🐬" />
              <ProviderCard title="MongoDB" active={dbProvider === 'mongo'} onClick={() => setDbProvider('mongo')} icon="🍃" />
              <ProviderCard title="Redis" active={dbProvider === 'redis'} onClick={() => setDbProvider('redis')} icon="🔴" />
              <ProviderCard title="Snowflake" active={dbProvider === 'snowflake'} onClick={() => setDbProvider('snowflake')} icon="❄️" />
            </div>
          </div>
          <div className="w-full xl:w-1/2 bg-slate-950/50 rounded-xl p-6 border border-slate-800 flex flex-col shadow-inner">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-sm font-bold text-slate-300 capitalize">{dbProvider} Configuration</h4>
              {renderBadge(dbStatus)}
            </div>
            <div className="space-y-4 flex-1">
              {(dbProvider === 'postgres' || dbProvider === 'mysql') && (
                <>
                  <div className="flex gap-4">
                    {renderInput('Host', 'text', 'localhost')}
                    {renderInput('Port', 'number', dbProvider === 'postgres' ? '5432' : '3306')}
                  </div>
                  {renderInput('Database Name', 'text', 'nexus_db')}
                  <div className="flex gap-4">
                    {renderInput('Username', 'text', 'admin')}
                    {renderInput('Password', 'password', '••••••••')}
                  </div>
                </>
              )}
              {dbProvider === 'mongo' && (
                <>{renderInput('Connection String URI', 'password', 'mongodb+srv://...')}</>
              )}
              {dbProvider === 'redis' && (
                <>{renderInput('Host', 'text', 'localhost')} {renderInput('Port', 'number', '6379')} {renderInput('Password', 'password', '...')}</>
              )}
              {dbProvider === 'snowflake' && (
                <>{renderInput('Account Identifier', 'text', 'xy12345.us-east-1')} {renderInput('Username', 'text', 'admin')} {renderInput('Password', 'password', '••••••••')} {renderInput('Warehouse', 'text', 'COMPUTE_WH')}</>
              )}
            </div>
            <div className="mt-6 pt-5 border-t border-slate-700 flex justify-end">
              {renderTestButton(dbStatus, setDbStatus)}
            </div>
          </div>
        </div>

        {/* ALM & Issue Tracking */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-sm p-4 md:p-6 flex flex-col xl:flex-row gap-6 md:gap-8">
          <div className="w-full xl:w-1/2">
            <h3 className="text-base md:text-lg font-bold text-white">ALM & Issue Tracking</h3>
            <p className="text-[10px] md:text-xs text-slate-400 mb-4">Required for automatic bug filing and BDD spec ingestion.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <ProviderCard title="Jira Cloud" active={almProvider === 'jira'} onClick={() => setAlmProvider('jira')} icon="🔷" />
              <ProviderCard title="Azure DevOps" active={almProvider === 'azure'} onClick={() => setAlmProvider('azure')} icon="🟦" />
              <ProviderCard title="Confluence" active={almProvider === 'confluence'} onClick={() => setAlmProvider('confluence')} icon="📄" />
              <ProviderCard title="ServiceNow" active={almProvider === 'servicenow'} onClick={() => setAlmProvider('servicenow')} icon="🟢" />
              <ProviderCard title="Linear" active={almProvider === 'linear'} onClick={() => setAlmProvider('linear')} icon="📐" />
            </div>
          </div>
          <div className="w-full xl:w-1/2 bg-slate-950/50 rounded-xl p-6 border border-slate-800 flex flex-col shadow-inner">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-sm font-bold text-slate-300 capitalize">{almProvider} Configuration</h4>
              {renderBadge(almStatus)}
            </div>
            <div className="space-y-4 flex-1">
              {almProvider === 'jira' && (
                <>{renderInput('Jira Domain', 'url', 'https://acme.atlassian.net')} {renderInput('User Email', 'email', 'admin@acme.com')} {renderInput('API Token', 'password', '...')}</>
              )}
              {almProvider === 'azure' && (
                <>{renderInput('Organization URL', 'url', 'https://dev.azure.com/acme')} {renderInput('Project Name', 'text', 'NexusCore')} {renderInput('Personal Access Token', 'password', '...')}</>
              )}
              {almProvider === 'confluence' && (
                <>{renderInput('Confluence Domain', 'url', 'https://acme.atlassian.net/wiki')} {renderInput('User Email', 'email', 'admin@acme.com')} {renderInput('API Token', 'password', '...')}</>
              )}
              {almProvider === 'servicenow' && (
                <>{renderInput('Instance URL', 'url', 'https://dev12345.service-now.com')} {renderInput('Client ID', 'text', '...')}{renderInput('Client Secret', 'password', '...')}</>
              )}
              {almProvider === 'linear' && (
                <>{renderInput('Personal API Key', 'password', 'lin_api_...')} {renderInput('Team ID', 'text', 'NEXUS')}</>
              )}
            </div>
            <div className="mt-6 pt-5 border-t border-slate-700 flex justify-end">
              {renderTestButton(almStatus, setAlmStatus)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ProviderCard({ title, active, onClick, icon }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 select-none text-center
        ${active ? 'border-indigo-500 bg-indigo-50/50 shadow-[0_0_0_1px_rgba(99,102,241,1)] scale-[1.02]' : 'border-slate-700 bg-slate-900 hover:border-slate-300 hover:shadow-sm'}`}
    >
      <span className="text-2xl drop-shadow-sm">{icon}</span>
      <span className={`font-semibold text-[11px] tracking-wide ${active ? 'text-indigo-900' : 'text-slate-600'}`}>{title}</span>
    </div>
  );
}
