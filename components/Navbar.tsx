
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/siteData';
import { db } from '../lib/db';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(db.getSettings());
  const location = useLocation();

  useEffect(() => {
    const refresh = () => setSettings(db.getSettings());
    window.addEventListener('db-update', refresh);
    return () => window.removeEventListener('db-update', refresh);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center space-x-5 group">
            <svg viewBox="0 0 200 200" className="w-16 h-16 flex-shrink-0 transition-transform duration-500 group-hover:rotate-[360deg]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="navTextPathTop" d="M 25,100 A 75,75 0 0,1 175,100" />
                <path id="navTextPathBottom" d="M 175,100 A 75,75 0 0,1 25,100" />
              </defs>
              <circle cx="100" cy="100" r="95" fill="none" stroke="#15803d" strokeWidth="2" />
              <text fill="#15803d" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
                <textPath href="#navTextPathTop" startOffset="50%" textAnchor="middle">CORE SKILLS TRAINING</textPath>
              </text>
              <text fill="#15803d" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
                <textPath href="#navTextPathBottom" startOffset="50%" textAnchor="middle">INSTITUTE SYSTEM</textPath>
              </text>
              <circle cx="100" cy="100" r="52" fill="#15803d" />
              <text x="100" y="116" fill="white" fontSize="42" fontFamily="serif" fontWeight="500" textAnchor="middle">SM</text>
            </svg>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">{settings.siteName}</span>
              <span className="text-[10px] text-green-600 font-black tracking-[0.4em] uppercase mt-1">{settings.tagline}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'text-green-600 bg-green-50 shadow-inner' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-green-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-6 py-8 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest ${
                  isActive(link.path) ? 'bg-green-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
