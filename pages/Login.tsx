
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ChevronRight, AlertTriangle } from 'lucide-react';

const Login: React.FC = () => {
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
          <h1 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter tracking-widest">SM Skills</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em]">Administrative Governance</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="text-amber-500" size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-tight">Terminal Offline</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Access to the administrative terminal is currently restricted for scheduled institutional maintenance.
            </p>

            <Link 
              to="/"
              className="w-full bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-[0.3em] text-[11px] py-5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-2xl active:scale-95"
            >
              <span>Return to Public Site</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">
            Institutional Control Center &copy; 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
