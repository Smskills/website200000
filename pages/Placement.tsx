import React from 'react';
import PageHeader from '../components/PageHeader';

const Placement: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Placements" subtitle="Your Career Starts Here" />

      {/* Highlights */}
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Placement Opportunities</h2>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-green-50 p-10 rounded-lg text-center border border-green-100">
            <h3 className="text-4xl font-bold text-green-600 mb-2">Target</h3>
            <p className="text-slate-600 font-medium">100% Placement Support</p>
          </div>
          <div className="bg-teal-50 p-10 rounded-lg text-center border border-teal-100">
            <h3 className="text-4xl font-bold text-teal-600 mb-2">Industry</h3>
            <p className="text-slate-600 font-medium">Recognized Certifications</p>
          </div>
          <div className="bg-purple-50 p-10 rounded-lg text-center border border-purple-100">
            <h3 className="text-4xl font-bold text-purple-600 mb-2">50+</h3>
            <p className="text-slate-600 font-medium">Corporate Partners</p>
          </div>
        </div>

        {/* Recruiters */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-12">Our Corporate Network</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Text placeholders for logos as per standard styling, simpler than finding logos */}
             <div className="text-2xl font-bold text-slate-400 border-2 border-slate-200 px-8 py-4 rounded-lg">Google</div>
             <div className="text-2xl font-bold text-slate-400 border-2 border-slate-200 px-8 py-4 rounded-lg">Microsoft</div>
             <div className="text-2xl font-bold text-slate-400 border-2 border-slate-200 px-8 py-4 rounded-lg">Deloitte</div>
             <div className="text-2xl font-bold text-slate-400 border-2 border-slate-200 px-8 py-4 rounded-lg">Amazon</div>
             <div className="text-2xl font-bold text-slate-400 border-2 border-slate-200 px-8 py-4 rounded-lg">Adobe</div>
          </div>
        </div>

        {/* Cell Info */}
        <div className="bg-slate-900 rounded-xl p-12 text-center text-white max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Training & Placement Cell</h3>
          <p className="text-slate-300 leading-relaxed mb-0">
            Our dedicated placement cell works round the clock to ensure every student gets the best opportunity. From resume building workshops to mock interviews, we guide you at every step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Placement;