
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { FileText, Users, PenTool, Rocket, ShieldCheck } from 'lucide-react';

const Admissions: React.FC = () => {
  const navigate = useNavigate();
  const steps = [
    { icon: FileText, title: 'Enquiry', desc: 'Institutional validation process' },
    { icon: Users, title: 'Counseling', desc: 'Academic advisor consultation' },
    { icon: FileText, title: 'Admission', desc: 'Secure document verification' },
    { icon: PenTool, title: 'Training', desc: 'Industry-aligned development' },
    { icon: Rocket, title: 'Outcome', desc: 'Professional placement' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Admissions" subtitle="Professional enrollment framework." />

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-20">
          <p className="text-green-600 font-semibold text-sm tracking-wider uppercase mb-2">Institutional Protocol</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Admission Lifecycle</h2>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded"></div>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-slate-200 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 ring-8 ring-white">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tight">{step.title}</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-[150px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <button 
            onClick={() => navigate('/contact')}
            className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[12px] shadow-2xl transition-all transform hover:-translate-y-1 flex items-center space-x-3 mx-auto"
          >
            <ShieldCheck size={18} />
            <span>Visit Contact Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admissions;
