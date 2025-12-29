
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Bell, Quote, Star, MessageSquare, ArrowRight } from 'lucide-react';
import { db } from '../lib/db';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [content, setContent] = useState(db.getPage('home'));
  const [notices, setNotices] = useState(db.getNotices().filter(n => n.isActive));
  const [courses, setCourses] = useState(db.getCourses().filter(c => c.isPublished));

  useEffect(() => {
    const refresh = () => {
      setContent(db.getPage('home'));
      setNotices(db.getNotices().filter(n => n.isActive));
      setCourses(db.getCourses().filter(c => c.isPublished));
    };
    window.addEventListener('db-update', refresh);
    return () => window.removeEventListener('db-update', refresh);
  }, []);

  if (!content) return null;

  return (
    <div className="bg-slate-50">
      <SEO pageId="home" />
      
      {/* Dynamic Hero Section */}
      <div className="relative h-[650px] bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2070&q=80"
            className="w-full h-full object-cover opacity-20"
            alt="Campus"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 h-full relative flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8 tracking-tight uppercase animate-in slide-in-from-left duration-700">
              {content.title} <br />
              <span className="text-green-500">{content.subtitle}</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-400 mb-10 leading-relaxed font-medium max-w-xl">
              {content.sections.heroDesc}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/courses" className="bg-green-600 hover:bg-green-500 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-2xl shadow-green-600/20 active:scale-95">
                Explore Programs
              </Link>
              <Link to="/admissions" className="bg-white/5 border border-white/10 text-white hover:bg-white hover:text-slate-900 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all backdrop-blur-sm">
                Apply Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Notice Board & Info */}
      <div className="container mx-auto px-4 lg:px-8 relative -mt-24 z-10 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <InfoBox icon={<BookOpen/>} title="Modern Curriculum" desc="Academic rigor met with industry standards." color="green" />
          <InfoBox icon={<Briefcase/>} title="Strategic Placement" desc="Global network of corporate partners." color="blue" />

          {/* Dynamic Notice Scroller */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-full min-h-[400px] border border-slate-100">
            <div className="bg-slate-900 p-6 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center space-x-3">
                <Bell className="text-green-500" size={20} />
                <h3 className="text-white font-bold uppercase text-sm tracking-widest">Notice Terminal</h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Live Updates</span>
            </div>
            <div className="flex-grow overflow-hidden relative custom-scrollbar p-2">
              <div className="animate-scroll-up">
                <div className="divide-y divide-slate-100">
                  {notices.map((notice) => (
                    <div key={notice.id} className="p-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{notice.date}</span>
                        {notice.tag && <span className="text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold uppercase">{notice.tag}</span>}
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-green-600 transition-colors">{notice.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">"{notice.desc}"</p>
                    </div>
                  ))}
                  {/* Duplicate for infinite effect if few items */}
                  {notices.length < 5 && notices.map((notice) => (
                    <div key={`${notice.id}-dup`} className="p-6 hover:bg-slate-50 transition-colors group">
                       <h4 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-green-600 transition-colors">{notice.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Managed Sections */}
      <div className="container mx-auto px-4 lg:px-8 py-32 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="animate-in fade-in duration-1000">
            <h2 className="text-5xl font-extrabold text-slate-900 mb-8 tracking-tight uppercase">{content.sections.welcomeTitle}</h2>
            <div className="w-24 h-2 bg-green-600 rounded-full mb-12"></div>
            <div className="space-y-8">
              <p className="text-slate-500 text-xl leading-relaxed font-medium">
                {content.sections.welcomeDesc1}
              </p>
              <p className="text-slate-500 text-lg leading-relaxed">
                {content.sections.welcomeDesc2}
              </p>
            </div>
            <Link to="/about" className="mt-12 inline-flex items-center space-x-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold uppercase text-xs tracking-widest shadow-2xl hover:bg-black transition-all active:scale-95">
              <span>View Full History</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative group perspective-1000">
            <div className="absolute -inset-6 bg-green-600/10 rounded-[3rem] blur-3xl group-hover:bg-green-600/20 transition-all duration-1000"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white">
               <img 
                 src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80" 
                 className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                 alt="Library"
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ icon, title, desc, color }: any) => (
  <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 hover:shadow-green-600/5 transition-all duration-500 group">
    <div className={`w-16 h-16 bg-${color}-500 text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl group-hover:rotate-6 transition-transform`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight uppercase">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

export default Home;
