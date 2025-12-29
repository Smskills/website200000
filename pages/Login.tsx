
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, User, AlertCircle, ShieldCheck, ChevronRight } from 'lucide-react';
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
        setError('Invalid credentials. Access denied by institutional security.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header Navigation */}
      <div className="absolute top-10 left-10 hidden lg:block text-slate-500 hover:text-slate-900">
        <Link to="/" className="flex items-center transition-colors font-semibold text-sm group">
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Back to Website
        </Link>
      </div>

      <div className="w-full max-w-[440px]">
        {/* Institutional Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-6 shadow-lg shadow-green-600/20">
            <ShieldCheck className="text-white" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-tight">{settings.siteName}</h1>
          <p className="text-slate-500 font-medium text-sm">Administrative Governance Portal</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="p-10">
            <h2 className="text-xl font-bold text-slate-800 mb-8">Sign In</h2>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 flex items-center text-red-700 text-xs font-bold rounded-lg animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} className="mr-3 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 ml-1">Username</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    required
                    autoFocus
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-green-600 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2.5 ml-1">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                  <a href="#" className="text-[10px] font-bold text-green-600 hover:text-green-700 uppercase tracking-wider">Forgot Password?</a>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="password"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-green-600 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-widest py-4.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-slate-900/10 active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Authorize Access</span>
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 text-center">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               Seed Access:<br/>
               <span className="text-slate-600">Admin: admin/admin</span> • <span className="text-slate-600">Editor: editor/editor</span>
             </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            Institutional Record System &copy; 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
