
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, ImageIcon, Bell, Settings, LogOut, 
  Trash2, ShieldCheck, User, Lock, 
  CheckCircle2, Inbox, Clock, Activity, 
  Download, Save, Info
} from 'lucide-react';
import { db, DbEnquiry, DbCourse, DbNotice, AdminUser } from '../lib/db';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'queries' | 'courses' | 'notices' | 'content' | 'gallery' | 'settings' | 'security'>('overview');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  
  const [enquiries, setEnquiries] = useState<DbEnquiry[]>([]);
  const [courses, setCourses] = useState<DbCourse[]>([]);
  const [notices, setNotices] = useState<DbNotice[]>([]);
  const [settings, setSettings] = useState(db.getSettings());
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    const authId = sessionStorage.getItem('sm_skills_auth_user_id');
    const user = db.getUsers().find(u => u.id === authId);
    
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    const refresh = () => {
      setEnquiries(db.getEnquiries());
      setCourses(db.getCourses());
      setNotices(db.getNotices());
      setSettings(db.getSettings());
    };

    refresh();
    window.addEventListener('db-update', refresh);
    return () => window.removeEventListener('db-update', refresh);
  }, [navigate]);

  const showFeedback = (msg: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const isSuper = currentUser?.role === 'SUPER_ADMIN';

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-300">
      <aside className="w-72 bg-[#1e293b] flex flex-col shadow-2xl z-20 border-r border-slate-800">
        <div className="p-8 border-b border-slate-800 bg-[#0f172a]/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-500/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight uppercase text-white">SM Terminal</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em]">Demo Environment</p>
        </div>
        
        <nav className="flex-grow p-6 space-y-1 overflow-y-auto">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={18}/>} label="Status Core" />
          
          <div className="pt-8 pb-3 px-4">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Business Ops</span>
          </div>
          <TabButton active={activeTab === 'queries'} onClick={() => setActiveTab('queries')} icon={<Inbox size={18}/>} label="Local Enquiries" badge={enquiries.filter(e => e.status === 'NEW').length} />
          <TabButton active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={<BookOpen size={18}/>} label="Programs" />
          
          {isSuper && (
            <>
              <div className="pt-8 pb-3 px-4">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">System</span>
              </div>
              <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={18}/>} label="Config" />
            </>
          )}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-4 hover:bg-red-500/10 text-red-400 rounded-2xl transition-all group font-bold uppercase text-[10px] tracking-widest border border-transparent hover:border-red-500/20"
          >
            <LogOut size={16} />
            <span>Terminate</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-12 overflow-y-auto bg-[#0f172a]">
        <div className="flex justify-between items-center mb-12 bg-[#1e293b] px-10 py-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center space-x-4">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
             <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Sandbox Mode: Active</span>
          </div>
          <div className="flex items-center space-x-8">
             <div className="text-right">
                <p className="text-[11px] font-bold uppercase text-white leading-none">{currentUser?.username}</p>
                <p className="text-[9px] font-bold text-green-500 uppercase tracking-tighter mt-1">Audit Ready</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white text-xs font-bold ring-1 ring-slate-700">
               {currentUser?.username.substring(0, 2).toUpperCase()}
             </div>
          </div>
        </div>

        {feedback && (
          <div className={`mb-8 p-4 rounded-2xl flex items-center space-x-3 animate-in fade-in zoom-in duration-300 ${feedback.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            <CheckCircle2 size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">{feedback.msg}</span>
          </div>
        )}

        <div className="mb-12 p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl flex items-center space-x-4 text-slate-400">
          <Info size={20} className="text-blue-500" />
          <p className="text-xs font-medium">
            <strong>Security Audit Active:</strong> This dashboard is operating on client-side storage only. Cross-Site Scripting (XSS) protections are active for user-provided strings.
          </p>
        </div>
        
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="mb-12">
               <h2 className="text-5xl font-extrabold text-white tracking-tight uppercase mb-4">Security Overview</h2>
               <p className="text-slate-500 font-medium">Frontend state report.</p>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <StatCard icon={<Inbox className="text-blue-500"/>} label="Local Leads" value={enquiries.length} />
                <StatCard icon={<BookOpen className="text-green-500"/>} label="UI Modules" value={courses.length} />
                <StatCard icon={<Bell className="text-amber-500"/>} label="Logs" value={notices.length} />
                <StatCard icon={<Activity className="text-purple-500"/>} label="API Status" value="OFFLINE" />
             </div>
          </div>
        )}

        {activeTab === 'queries' && (
          <div className="animate-in fade-in duration-500">
             <header className="mb-12">
               <h2 className="text-5xl font-extrabold text-white tracking-tight uppercase mb-2">Local Leads</h2>
               <p className="text-slate-500 font-medium">Reviewing data stored in current browser session.</p>
             </header>

             <div className="bg-[#1e293b] rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-[#0f172a] text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                    <tr>
                      <th className="px-10 py-6">Identity</th>
                      <th className="px-10 py-6">Course</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {enquiries.length > 0 ? enquiries.map(q => (
                      <tr key={q.id} className="hover:bg-[#0f172a]/50 transition-colors">
                        <td className="px-10 py-8">
                          <div className="font-bold text-white mb-1">{q.name}</div>
                          <div className="text-[10px] text-slate-500">{q.email} | {q.phone}</div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{q.course}</span>
                        </td>
                        <td className="px-10 py-8">
                          <span className="text-[10px] font-bold uppercase tracking-widest rounded-lg px-3 py-1.5 bg-slate-800 text-slate-400 border border-slate-700">
                            {q.status}
                          </span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button onClick={() => db.deleteEnquiry(q.id)} className="p-3 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} className="p-20 text-center text-slate-600 uppercase font-bold">No Leads Found</td></tr>
                    )}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'settings' && isSuper && (
          <div className="max-w-3xl animate-in fade-in duration-500">
            <header className="mb-12">
               <h2 className="text-5xl font-extrabold text-white tracking-tight uppercase mb-2">Global Config</h2>
               <p className="text-slate-500 font-medium">Simulated environment settings.</p>
            </header>

            <div className="bg-[#1e293b] p-10 rounded-[2.5rem] border border-slate-800 space-y-10 shadow-2xl">
               <FormInput label="Institute Name" value={settings.siteName} onChange={(v: string) => setSettings({...settings, siteName: v})} />
               <div className="pt-8 border-t border-slate-800 flex justify-end">
                  <button onClick={() => { db.updateSettings(settings); showFeedback("UI Refresh Triggered"); }} className="bg-green-600 hover:bg-green-500 text-white px-12 py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center space-x-3">
                     <Save size={18} />
                     <span>Sync UI</span>
                  </button>
               </div>
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
    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all font-bold text-[13px] group ${active ? 'bg-green-600 text-white shadow-xl shadow-green-600/20 translate-x-1' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
  >
    <div className="flex items-center space-x-4">
      <div className={`transition-colors ${active ? 'text-white' : 'text-slate-600 group-hover:text-slate-300'}`}>{icon}</div>
      <span>{label}</span>
    </div>
    {badge !== undefined && badge > 0 && (
      <span className="bg-red-500 text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-lg shadow-lg">{badge}</span>
    )}
  </button>
);

const StatCard = ({ icon, label, value }: any) => (
  <div className="bg-[#1e293b] p-8 rounded-[2rem] border border-slate-800 hover:border-slate-700 transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-[#0f172a] rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-4xl font-extrabold text-white tracking-tight">{value}</span>
    </div>
    <h3 className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{label}</h3>
  </div>
);

const FormInput = ({ label, value, onChange }: any) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 ml-1">{label}</label>
    <input 
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-green-600 transition-all font-bold text-white placeholder:text-slate-700"
    />
  </div>
);

export default Dashboard;
