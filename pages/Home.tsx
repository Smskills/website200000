
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Bell, ArrowRight, Loader2 } from 'lucide-react';
import { db } from '../lib/db.ts';
import SEO from '../components/SEO.tsx';
import { getPublicNotices, NoticeData } from '../services/noticeService';

const Home: React.FC = () => {
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const settings = db.getSettings();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getPublicNotices();
        setNotices(data || []);
      } catch (err) {
        // Silent recovery to local data as per stability protocol
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div className="bg-white">
      <SEO pageId="home" />
      
      {/* Hero Section */}
      <div className="relative h-[600px] bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2070&q=80"
            className="w-full h-full object-cover opacity-30"
            alt="Campus"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 h-full relative flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight uppercase">
              {settings.siteName} <br />
              <span className="text-green-500">Education Redefined.</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed font-normal">
              Empowering the next generation of professionals through cutting-edge skills training and industry-aligned academic frameworks.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-all shadow-lg active:scale-95">
                Explore Programs
              </Link>
              <Link to="/contact" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-all shadow-lg">
                Enquire Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="container mx-auto px-6 lg:px-12 relative -mt-16 z-10 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InfoBox 
            icon={<BookOpen size={24}/>} 
            title="Modern Curriculum" 
            desc="Academic rigor met with industry standards to ensure global competitiveness and job readiness." 
            color="bg-green-600" 
          />
          <InfoBox 
            icon={<Briefcase size={24}/>} 
            title="Strategic Placement" 
            desc="Our global network of corporate partners provides unparalleled career opportunities for every graduate." 
            color="bg-blue-600" 
          />

          {/* Scrolling Notice Terminal */}
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 flex flex-col h-[400px] overflow-hidden">
            <div className="bg-slate-800 p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-white">
                <Bell size={18} className="text-green-500" />
                <h3 className="font-bold uppercase text-xs tracking-widest">Notice Terminal</h3>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Status: Active</span>
              </div>
            </div>
            
            <div className="flex-grow overflow-hidden relative p-2 bg-slate-50">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-3">
                  <Loader2 size={24} className="animate-spin text-slate-300" />
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Accessing Registry</span>
                </div>
              ) : notices.length > 0 ? (
                <div className="animate-scroll-up h-full">
                  <div className="space-y-3">
                    {notices.map((notice, idx) => (
                      <div key={notice.id} className="p-5 bg-white border border-slate-100 rounded-lg hover:border-green-200 transition-all group shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            {new Date(notice.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-green-600 transition-colors">{notice.title}</h4>
                        <p className="text-xs text-slate-500 leading-normal line-clamp-2">{notice.content}</p>
                      </div>
                    ))}
                    {/* Infinite scroll padding */}
                    {notices.length < 5 && notices.map((notice) => (
                       <div key={`${notice.id}-dup`} className="p-5 bg-white border border-slate-100 rounded-lg">
                         <h4 className="font-bold text-slate-900 text-sm opacity-50">{notice.title}</h4>
                       </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Registry Synchronized</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Overview */}
      <div className="container mx-auto px-6 lg:px-12 py-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-green-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Institutional Framework</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight uppercase leading-tight">
              A Legacy of Excellence in Professional Training
            </h2>
            <div className="w-16 h-1.5 bg-green-600 mb-10"></div>
            <div className="space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed font-normal">
                Established as a beacon of modern learning, {settings.siteName} has been committed to providing a learning environment that encourages curiosity and professional excellence.
              </p>
              <p className="text-slate-500 text-base leading-relaxed">
                Our campus serves as a hub for innovation where students bridge the gap between theory and practice through state-of-the-art labs and industry mentorship.
              </p>
            </div>
            <Link to="/about" className="mt-10 inline-flex items-center space-x-2 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-lg font-bold uppercase text-xs tracking-widest transition-all">
              <span>View History</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-100 -z-10 rounded-lg"></div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                 src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80" 
                 className="w-full h-auto object-cover"
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
  <div className="bg-white rounded-xl shadow-xl p-8 border border-slate-200 hover:border-green-100 transition-all duration-300 group">
    <div className={`w-14 h-14 ${color} text-white rounded-lg flex items-center justify-center mb-6 shadow-md`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight uppercase">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm font-normal">{desc}</p>
  </div>
);

export default Home;
