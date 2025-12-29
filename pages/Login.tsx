
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, LogIn, Loader2, AlertCircle } from 'lucide-react';
import { adminLogin } from '../services/adminService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await adminLogin(formData);
      sessionStorage.setItem('sm_skills_token', response.token);
      sessionStorage.setItem('sm_skills_username', formData.username);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Identity verification failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="absolute top-10 left-10 hidden lg:block text-slate-400 hover:text-slate-900">
        <Link to="/" className="flex items-center transition-colors font-bold text-[10px] uppercase tracking-widest group">
          <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Return Home
        </Link>
      </div>

      <div className="w-full max-w-[420px]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-3xl mb-6 shadow-2xl">
            <ShieldCheck className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter tracking-widest leading-none">Management</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-2">Institutional Terminal</p>
        </div>
        
        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            
            {error && (
              <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start space-x-3 animate-in shake duration-300">
                <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-red-700 font-bold uppercase tracking-tight leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity</label>
              <input 
                required
                type="text"
                disabled={isLoading}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full h-16 bg-slate-50 rounded-2xl border border-slate-100 px-6 text-slate-900 font-bold text-sm focus:bg-white focus:border-slate-900 transition-all outline-none" 
                placeholder="Username" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Authority Key</label>
              <input 
                required
                type="password"
                disabled={isLoading}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-16 bg-slate-50 rounded-2xl border border-slate-100 px-6 text-slate-900 font-bold text-sm focus:bg-white focus:border-slate-900 transition-all outline-none" 
                placeholder="••••••••" 
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center space-x-3 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-2xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Establish Session</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.5em]">
            Institutional Control Center &copy; 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
