
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, User, ShieldAlert, ShieldCheck, ChevronRight, Info } from 'lucide-react';
import { db } from '../lib/db.ts';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const settings = db.getSettings();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (sessionStorage.getItem('sm_skills_auth_user_id')) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate Server Request with institutional latency
    setTimeout(() => {
      const user = db.getUsers().find(u => 
        u.username === credentials.username && 
        u.passwordHash === credentials.password
      );

      if (user) {
        sessionStorage.setItem('sm_skills_auth_user_id', user.id);
        sessionStorage.setItem('sm_skills_session_start', new Date().toISOString());
        navigate(from, { replace: true });
      } else {
        setError('Verification failed. Identity mismatch in mock database.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="absolute top-10 left-10 hidden lg:block text-slate-400 hover:text-slate-900">
        <Link to="/" className="flex items-center transition-colors font-bold text-[10px] uppercase tracking-widest group">
          <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Institutional Home
        </Link>
      </div>

      <div className="w-full max-w-[440px]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-2xl mb-6 shadow-2xl">
            <ShieldCheck className="text-white" size={40} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{settings.siteName}</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em]">Administrative Governance</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-10">
            <h2 className="text-xl font-bold text-slate-800 mb-8 uppercase tracking-tight">Identity Verification</h2>

            {error && (
              <div className="mb-8 p-4 bg-slate-50 border border-slate-200 flex items-center text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-xl animate-in fade-in slide-in-from-top-2">
                <ShieldAlert size={16} className="mr-3 text-red-500" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Mock Identity</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-slate-400 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2.5 ml-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Mock Token</label>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sandbox Protocol</span>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="password"
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-slate-400 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-[0.3em] text-[11px] py-5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-2xl active:scale-95"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Begin Session</span>
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 text-center flex items-center justify-center space-x-3">
             <Info size={14} className="text-slate-400" />
             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               DEMO ACCESS:<br/>
               <span className="text-slate-600">admin / admin</span> • <span className="text-slate-600">editor / editor</span>
             </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">
            Institutional Record Prototype &copy; 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
