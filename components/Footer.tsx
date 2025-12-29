
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { db } from '../lib/db';

const Footer: React.FC = () => {
  const [settings, setSettings] = useState(db.getSettings());

  useEffect(() => {
    const refresh = () => setSettings(db.getSettings());
    window.addEventListener('db-update', refresh);
    return () => window.removeEventListener('db-update', refresh);
  }, []);

  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-32 pb-16 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-5 mb-10">
              <svg viewBox="0 0 200 200" className="w-16 h-16 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="95" fill="none" stroke="#16a34a" strokeWidth="2" />
                <circle cx="100" cy="100" r="52" fill="#16a34a" />
                <text x="100" y="116" fill="white" fontSize="42" fontFamily="serif" fontWeight="500" textAnchor="middle">SM</text>
              </svg>
              <div>
                <span className="text-3xl font-black text-white tracking-tighter uppercase leading-none">{settings.siteName}</span>
                <p className="text-[10px] text-green-500 font-black tracking-[0.4em] uppercase mt-1">{settings.tagline}</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-10 text-slate-500 max-w-lg">
              Empowering global professionals through hyper-focused skill development and next-gen academic frameworks.
            </p>
            <div className="flex space-x-6">
              <SocialLink href={settings.socials.facebook} icon={<Facebook/>} />
              <SocialLink href={settings.socials.twitter} icon={<Twitter/>} />
              <SocialLink href={settings.socials.instagram} icon={<Instagram/>} />
              <SocialLink href={settings.socials.linkedin} icon={<Linkedin/>} />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Core Nodes</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/about" className="hover:text-green-500 transition-colors">History</Link></li>
                <li><Link to="/courses" className="hover:text-green-500 transition-colors">Programs</Link></li>
                <li><Link to="/admissions" className="hover:text-green-500 transition-colors">Admissions</Link></li>
                <li><Link to="/login" className="flex items-center space-x-2 text-slate-600 hover:text-white transition-colors">
                  <ShieldCheck size={14}/> <span>Terminal</span>
                </Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Hub Access</h3>
              <ul className="space-y-6 text-sm">
                <li className="flex items-start space-x-4">
                  <MapPin size={20} className="text-green-500 flex-shrink-0" />
                  <span className="font-medium leading-relaxed">{settings.address}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Phone size={20} className="text-green-500 flex-shrink-0" />
                  <span className="font-medium">{settings.phone}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <Mail size={20} className="text-green-500 flex-shrink-0" />
                  <span className="font-medium">{settings.email}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-32 pt-16 flex flex-col md:row justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
          <p>&copy; 2024 INSTITUTIONAL RECORD. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
             <a href="#" className="hover:text-slate-400">Privacy Protocol</a>
             <a href="#" className="hover:text-slate-400">Terms of Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: any) => (
  <a href={href} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:bg-green-600 hover:text-white transition-all shadow-xl">
    {React.cloneElement(icon, { size: 20 })}
  </a>
);

export default Footer;
