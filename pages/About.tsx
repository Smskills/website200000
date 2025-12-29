
import React from 'react';
import PageHeader from '../components/PageHeader';
import { Zap, Eye, BookOpen, Microscope, Handshake } from 'lucide-react';
import { ABOUT_CONTENT } from '../data/siteData';

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="About Us" subtitle="Discover our vision and mission" />

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Who We Are</h2>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">{ABOUT_CONTENT.mainTitle}</h3>
            {ABOUT_CONTENT.paragraphs.map((p, idx) => (
              <p key={idx} className="text-slate-600 text-lg leading-relaxed mb-6">{p}</p>
            ))}
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
              alt="Campus" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-10 rounded-lg shadow-md border-t-4 border-green-500">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Zap className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">{ABOUT_CONTENT.mission}</p>
          </div>

          <div className="bg-white p-10 rounded-lg shadow-md border-t-4 border-purple-500">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Eye className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">{ABOUT_CONTENT.vision}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
