
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BookOpen, Bell, Inbox, LogOut, ShieldCheck, ChevronRight 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('sm_skills_username');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white p-6 shadow-xl">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <ShieldCheck className="text-green-500" size={32} />
            <div>
              <h1 className="text-xl font-black uppercase tracking-widest">Admin Control Center</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Logged in as {username}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest hover:text-red-400 transition-colors">
            <LogOut size={16} />
            <span>Terminate Session</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-slate-900 mb-12 uppercase tracking-tighter">Institutional Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AdminCard 
            to="/admin/courses" 
            icon={<BookOpen size={32} className="text-blue-600"/>} 
            title="Manage Courses" 
            desc="Add, modify, or remove academic programs."
          />
          <AdminCard 
            to="/admin/notices" 
            icon={<Bell size={32} className="text-amber-600"/>} 
            title="Notice Board" 
            desc="Control public announcements and alerts."
          />
          <AdminCard 
            to="/admin/enquiries" 
            icon={<Inbox size={32} className="text-green-600"/>} 
            title="Enquiry Leads" 
            desc="Review and process student applications."
          />
        </div>
      </main>
    </div>
  );
};

const AdminCard = ({ to, icon, title, desc }: any) => (
  <Link to={to} className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all group">
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">{title}</h3>
    <p className="text-slate-500 text-sm mb-8 leading-relaxed">{desc}</p>
    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
      <span>Access Portal</span>
      <ChevronRight size={14} className="ml-1" />
    </div>
  </Link>
);

export default Dashboard;
