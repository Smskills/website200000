import React from 'react';
import PageHeader from '../components/PageHeader';
import { FileText, Users, CheckCircle, PenTool, Rocket } from 'lucide-react';

const Admissions: React.FC = () => {
  const steps = [
    { icon: FileText, title: 'Enquiry', desc: 'Fill the online form or visit campus' },
    { icon: Users, title: 'Counseling', desc: 'Meet our academic counselors' },
    { icon: FileText, title: 'Admission', desc: 'Submit documents & pay fees' },
    { icon: PenTool, title: 'Training', desc: 'Start your academic journey' },
    { icon: Rocket, title: 'Outcome', desc: 'Graduate with placement support' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Admissions" subtitle="Join the SM Skills Family" />

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-20">
          <p className="text-green-600 font-semibold text-sm tracking-wider uppercase mb-2">Simple & Transparent</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Admission Process</h2>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded"></div>
        </div>

        {/* Steps Visualizer */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-slate-200 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 ring-8 ring-white">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm max-w-[150px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            Start Your Enquiry
          </button>
          <p className="mt-4 text-slate-500">Need help? Call us at +1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default Admissions;