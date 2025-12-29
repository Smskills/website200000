
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, Settings, LogOut, 
  Trash2, ShieldCheck, Inbox, Activity, Info, AlertTriangle
} from 'lucide-react';
import { db, DbEnquiry, DbCourse, DbNotice, AdminUser } from '../lib/db';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'queries' | 'settings'>('overview');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  
  const [enquiries, setEnquiries] = useState<DbEnquiry[]>([]);
  const [courses, setCourses] = useState<DbCourse[]>([]);
  const [notices, setNotices] = useState<DbNotice[]>([]);
  const [settings, setSettings] = useState(db.getSettings());

  useEffect(() => {
    const authId = sessionStorage.getItem('sm_skills_auth_user_id');
    const user = db.getUsers().find(u => u.id === authId);
    
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    const refreshData = async () => {
      // SECURITY: Methods are async to simulate backend latency and provide non-blocking UI
      const [e, c, n] = await Promise.all([
        db.getEnquiries(),
        db.getCourses(),
        db.getNotices()
      ]);
      setEnquiries(e);
      setCourses(c);
      setNotices(n);
      setSettings(db.getSettings());
    };

    refreshData();
    window.addEventListener('db-update', refreshData);
    return () => window.removeEventListener('db-update', refreshData);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleDelete = async (id: number) => {
    await db.deleteEnquiry(id);
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-300">
      <aside className="w-72 bg-[#1e293b] flex flex-col shadow-2xl z-20 border-r border-slate-800">
        <div className="p-8 border-b border-slate-800 bg-[#0f172a]/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-slate-700 p-2 rounded-xl shadow-lg">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight uppercase text-white">SM Core</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em]">Institutional Sandbox</p>
        </div>
        
        <nav className="flex-grow p-6 space-y-1">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={18}/>} label="Overview" />
          <TabButton active={activeTab === 'queries'} onClick={() => setActiveTab('queries')} icon={<Inbox size={18}/>} label="Session Leads" badge={enquiries.length} />
          <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={18}/>} label="Governance" />
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-4 hover:bg-red-500/10 text-red-400 rounded-2xl transition-all group font-bold uppercase text-[10px] tracking-widest border border-transparent hover:border-red-500/20"
          >
            <LogOut size={16} />
            <span>End Session</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-12 overflow-y-auto bg-[#0f172a]">
        <div className="mb-8 p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center space-x-4 text-slate-400">
          <AlertTriangle size={24} className="text-amber-500 flex-shrink-0" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Prototype Operating State</p>
            <p className="text-[11px] font-medium opacity-80 mt-1 leading-relaxed">
              SECURITY ADVISORY: This dashboard is a decoupled frontend prototype. All data is ephemeral and stored in current tab memory. No permanent data persistence is active.
            </p>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="mb-12">
               <h2 className="text-5xl font-extrabold text-white tracking-tight uppercase mb-4">Institutional Core</h2>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard icon={<Inbox className="text-blue-500"/>} label="Session Enquiry Buffer" value={enquiries.length} />
                <StatCard icon={<BookOpen className="text-green-500"/>} label="Active Program Modules" value={courses.length} />
                <StatCard icon={<Activity className="text-purple-500"/>} label="System Health" value="DEMO" />
             </div>
          </div>
        )}

        {activeTab === 'queries' && (
          <div className="animate-in fade-in duration-500">
             <header className="mb-12">
               <h2 className="text-5xl font-extrabold text-white tracking-tight uppercase mb-2">Session Leads</h2>
               <p className="text-slate-500 font-medium text-xs uppercase tracking-widest">Reviewing ephemeral lead capture.</p>
             </header>

             <div className="bg-[#1e293b] rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-[#0f172a] text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                    <tr>
                      <th className="px-10 py-6">Applicant Entity</th>
                      <th className="px-10 py-6">Target Module</th>
                      <th className="px-10 py-6 text-right">Sanitization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {enquiries.length > 0 ? enquiries.map(q => (
                      <tr key={q.id} className="hover:bg-[#0f172a]/50 transition-colors">
                        <td className="px-10 py-8">
                          {/* SECURITY: React renders these as text nodes, inherently preventing XSS */}
                          <div className="font-bold text-white mb-1">{q.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{q.email}</div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{q.course}</span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button onClick={() => handleDelete(q.id)} className="p-3 text-slate-600 hover:text-red-500 transition-colors">
                            <Trash2 size={16}/>
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={3} className="p-20 text-center text-slate-600 uppercase font-black text-xs tracking-[0.5em]">No Ephemeral Leads</td></tr>
                    )}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-3xl animate-in fade-in duration-500">
            <header className="mb-12">
               <h2 className="text-5xl font-extrabold text-white tracking-tight uppercase mb-2">Governance</h2>
               <p className="text-slate-500 font-medium text-xs uppercase tracking-widest">Mock system configuration.</p>
            </header>

            <div className="bg-[#1e293b] p-10 rounded-[2.5rem] border border-slate-800 space-y-10 shadow-2xl">
               <div>
                 <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">Institution Label (Memory Only)</label>
                 <input 
                   type="text"
                   value={settings.siteName}
                   onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                   className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-slate-600 transition-all font-bold text-white"
                 />
               </div>
               <button 
                 onClick={() => db.updateSettings(settings)} 
                 className="bg-slate-700 hover:bg-slate-600 text-white px-10 py-5 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all"
               >
                 Apply Session Sync
               </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label, badge }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-widest group ${active ? 'bg-slate-700 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-800 hover:text-white'}`}
  >
    <div className="flex items-center space-x-4">
      <div className={`transition-colors ${active ? 'text-white' : 'text-slate-700 group-hover:text-slate-400'}`}>{icon}</div>
      <span>{label}</span>
    </div>
    {badge !== undefined && badge > 0 && (
      <span className="bg-slate-900 text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-lg shadow-lg border border-slate-800">{badge}</span>
    )}
  </button>
);

const StatCard = ({ icon, label, value }: any) => (
  <div className="bg-[#1e293b] p-8 rounded-[2rem] border border-slate-800 hover:border-slate-700 transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-[#0f172a] rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-4xl font-extrabold text-white tracking-tight">{value}</span>
    </div>
    <h3 className="text-slate-600 font-bold uppercase text-[10px] tracking-widest">{label}</h3>
  </div>
);

export default Dashboard;
