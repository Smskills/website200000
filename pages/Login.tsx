
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import { db } from '../lib/db';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

    // Simulate Server Request
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
        setError('Authentication Failed: Protocol Rejected');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-green-500 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-600 blur-[150px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-white transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            <span className="font-bold uppercase text-[10px] tracking-[0.3em]">Exit to Portal</span>
          </Link>
        </div>
        
        <div className="bg-[#1e293b] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-12 border border-slate-800 backdrop-blur-xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#0f172a] rounded-[2.5rem] mb-6 shadow-2xl border border-slate-800 ring-8 ring-[#1e293b]">
              <ShieldCheck className="text-green-500" size={48} />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-none mb-3">ADMIN CORE</h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]">Secure Terminal Entry</p>
          </div>

          {error && (
            <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 flex items-center text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-2xl animate-in shake-in">
              <AlertCircle size={18} className="mr-3 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Terminal ID</label>
              <div className="relative">
                <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input 
                  type="text"
                  required
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl pl-14 pr-6 py-4.5 focus:outline-none focus:border-green-600 transition-all font-bold text-white placeholder:text-slate-800"
                  placeholder="USERNAME"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Access Key</label>
              <div className="relative">
                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input 
                  type="password"
                  required
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl pl-14 pr-6 py-4.5 focus:outline-none focus:border-green-600 transition-all font-bold text-white placeholder:text-slate-800"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-[0.3em] py-5 rounded-2xl transition-all transform active:scale-95 shadow-2xl flex items-center justify-center space-x-3 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Verify Identity</span>
                  <ShieldCheck size={18} className="group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-800 text-center">
             <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest leading-relaxed">
               Seed Credentials:<br/>
               Super Admin: admin / admin<br/>
               Manager: editor / editor
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
