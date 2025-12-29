
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Courses from './pages/Courses.tsx';
import Admissions from './pages/Admissions.tsx';
import Placement from './pages/Placement.tsx';
import Gallery from './pages/Gallery.tsx';
import Contact from './pages/Contact.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import AdminCourses from './pages/AdminCourses.tsx'; // NEW
import AdminNotices from './pages/AdminNotices.tsx'; // NEW
import AdminEnquiries from './pages/AdminEnquiries.tsx'; // NEW
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { SITE_CONFIG } from './data/siteData.ts';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const FloatingActions = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');
  const isLogin = location.pathname === '/login';

  if (isDashboard || isLogin) return null;

  const phoneNumber = SITE_CONFIG.contact.phone.replace(/\D/g, '');
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in the courses at SM Skills Institute. Could you provide more details?");

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col space-y-2.5 items-end">
      <a 
        href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-white border border-slate-100 pl-1 pr-4 py-1 rounded-xl shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)] transition-all hover:scale-105 active:scale-95 group animate-in slide-in-from-right duration-500"
      >
        <div className="w-9 h-9 bg-[#25D366] rounded-lg flex items-center justify-center shadow-sm mr-2.5 flex-shrink-0 relative overflow-hidden">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white z-10">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.602 6.04L0 24l6.117-1.605a11.837 11.837 0 005.925 1.586h.005c6.632 0 12.028-5.396 12.031-12.03a11.817 11.817 0 00-3.417-8.444" />
          </svg>
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[12px] font-bold text-slate-800 uppercase tracking-wider leading-none">WhatsApp</span>
        </div>
      </a>
      <a 
        href={`tel:${phoneNumber}`}
        className="flex items-center bg-white border border-slate-100 pl-1 pr-4 py-1 rounded-xl shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)] transition-all hover:scale-105 active:scale-95 group animate-in slide-in-from-right duration-500"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-[#5FFB62] to-[#25D366] rounded-lg flex items-center justify-center shadow-sm mr-2.5 flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[12px] font-bold text-slate-800 uppercase tracking-wider leading-none">Call Now</span>
        </div>
      </a>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isMinimalPage = location.pathname === '/login' || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isMinimalPage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      <FloatingActions />
      {!isMinimalPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/courses" 
            element={
              <ProtectedRoute>
                <AdminCourses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/notices" 
            element={
              <ProtectedRoute>
                <AdminNotices />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/enquiries" 
            element={
              <ProtectedRoute>
                <AdminEnquiries />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
