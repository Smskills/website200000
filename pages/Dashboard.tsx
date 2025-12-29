
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, ImageIcon, Bell, Settings, LogOut, 
  Plus, Edit2, Trash2, ShieldCheck, User, Lock, Eye, EyeOff, 
  CheckCircle2, Star, Check, Inbox, Clock, Mail, Activity, 
  PhoneCall, XCircle, FileText, Globe, Download, Save, Search
} from 'lucide-react';
import { db, DbEnquiry, DbCourse, DbNotice, UserRole, AdminUser } from '../lib/db';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'courses' | 'queries' | 'notices' | 'gallery' | 'settings' | 'security'>('overview');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  
  // Real-time Database state
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

  const exportEnquiries = () => {
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Course', 'Status'];
    const rows = enquiries.map(e => [e.id, e.timestamp, e.name, e.phone, e.email, e.course, e.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(r => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback("Enquiries exported successfully");
  };

  // Permission Checks
  const isSuper = currentUser?.role === 'SUPER_ADMIN';

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-300">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#1e293b] flex flex-col shadow-2xl z-20 border-r border-slate-800">
        <div className="p-8 border-b border-slate-800 bg-[#0f172a]/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-500/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight uppercase text-white">SM Terminal</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em]">Inst. Control Core</p>
        </div>
        
        <nav className="flex-grow p-6 space-y-1 overflow-y-auto custom-scrollbar">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={18}/>} label="Mission Control" />
          
          <div className="pt-8 pb-3 px-4">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Business Ops</span>
          </div>
          <TabButton active={activeTab === 'queries'} onClick={() => setActiveTab('queries')} icon={<Inbox size={18}/>} label="Enquiry Hub" badge={enquiries.filter(e => e.status === 'NEW').length} />
          <TabButton active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={<BookOpen size={18}/>} label="Course Inventory" />
          <TabButton active={activeTab === 'notices'} onClick={() => setActiveTab('notices')} icon={<Bell size={18}/>} label="Notice Board" />
          
          <div className="pt-8 pb-3 px-4">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">UI & Presence</span>
          </div>
          <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={<Globe size={18}/>} label="Page Architect" />
          <TabButton active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={<ImageIcon size={18}/>} label="Media Vault" />

          {isSuper && (
            <>
              <div className="pt-8 pb-3 px-4">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">System</span>
              </div>
              <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={18}/>} label="Global Config" />
              <TabButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={<Lock size={18}/>} label="Access Control" />
            </>
          )}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-4 hover:bg-red-500/10 text-red-400 rounded-2xl transition-all group font-bold uppercase text-[10px] tracking-widest border border-transparent hover:border-red-500/20"
          >
            <LogOut size={16} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-grow p-12 overflow-y-auto bg-[#0f172a]">
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-12 bg-[#1e293b] px-10 py-6 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center space-x-4">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
             <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Database Engine: Online</span>
          </div>
          <div className="flex items-center space-x-8">
             <div className="text-right">
                <p className="text-[11px] font-bold uppercase text-white leading-none">{currentUser?.username}</p>
                <p className="text-[9px] font-bold text-green-500 uppercase tracking-tighter mt-1">{currentUser?.role.replace('_', ' ')}</p>
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

        {/* --- ROUTED VIEWS --- */}
        
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="mb-12">
               <h2 className="text-5xl font-extrabold text-white tracking-tight uppercase mb-4">Dashboard</h2>
               <p className="text-slate-500 font-medium">System status and key performance indicators.</p>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <StatCard icon={<Inbox className="text-blue-500"/>} label="Total Enquiries" value={enquiries.length} />
                <StatCard icon={<BookOpen className="text-green-500"/>} label="Active Programs" value={courses.length} />
                <StatCard icon={<Bell className="text-amber-500"/>} label="Broadcasts" value={notices.length} />
                <StatCard icon={<Activity className="text-purple-500"/>} label="Uptime" value="99.9%" />
             </div>

             <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800">
                   <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-6 flex items-center"><Clock size={20} className="mr-3 text-slate-500"/> Recent Activity</h3>
                   <div className="space-y-6">
                      {enquiries.slice(0, 3).map(e => (
                        <div key={e.id} className="flex items-center justify-between p-4 bg-[#0f172a] rounded-2xl border border-slate-800">
                           <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><User size={18}/></div>
                              <div>
                                 <p className="text-sm font-bold text-white">{e.name}</p>
                                 <p className="text-[10px] text-slate-500 uppercase font-bold">Enquired for {e.course}</p>
                              </div>
                           </div>
                           <span className="text-[10px] font-bold text-green-500 uppercase">{e.status}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-center items-center text-center">
                   <Activity size={48} className="text-green-500 mb-6 animate-pulse" />
                   <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-2">Syncing Data</h3>
                   <p className="text-slate-400 text-sm max-w-xs">The terminal is currently synchronized with the master database cluster.</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'queries' && (
          <div className="animate-in fade-in duration-500">
             <header className="flex justify-between items-end mb-12">
               <div>
                  <h2 className="text-5xl font-extrabold text-white tracking-tight uppercase mb-2">Enquiry Hub</h2>
                  <p className="text-slate-500 font-medium">Review and process student lead transmissions.</p>
               </div>
               <button onClick={exportEnquiries} className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest flex items-center space-x-3 transition-all">
                  <Download size={18} />
                  <span>Export CSV</span>
               </button>
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
                          <select 
                            value={q.status}
                            onChange={(e) => db.updateEnquiryStatus(q.id, e.target.value as any)}
                            className={`text-[10px] font-bold uppercase tracking-widest rounded-lg px-3 py-1.5 border-none outline-none cursor-pointer ${
                              q.status === 'NEW' ? 'bg-blue-500/20 text-blue-400' : q.status === 'CONTACTED' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'
                            }`}
                          >
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="CLOSED">Closed</option>
                          </select>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button onClick={() => { if(confirm('Delete?')) db.deleteEnquiry(q.id); }} className="p-3 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} className="p-20 text-center text-slate-600 uppercase font-bold">Database Empty</td></tr>
                    )}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {/* ... Other modules like Courses, Notices, Settings would follow same pattern ... */}
        {activeTab === 'settings' && isSuper && (
          <div className="max-w-3xl animate-in fade-in duration-500">
            <header className="mb-12">
               <h2 className="text-5xl font-extrabold text-white tracking-tight uppercase mb-2">Global Config</h2>
               <p className="text-slate-500 font-medium">Centralized control for institutional metadata.</p>
            </header>

            <div className="bg-[#1e293b] p-10 rounded-[2.5rem] border border-slate-800 space-y-10 shadow-2xl">
               <div className="grid grid-cols-2 gap-8">
                  <FormInput label="Institute Name" value={settings.siteName} onChange={(v) => setSettings({...settings, siteName: v})} />
                  <FormInput label="Tagline" value={settings.tagline} onChange={(v) => setSettings({...settings, tagline: v})} />
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <FormInput label="Public Phone" value={settings.phone} onChange={(v) => setSettings({...settings, phone: v})} />
                  <FormInput label="General Email" value={settings.email} onChange={(v) => setSettings({...settings, email: v})} />
               </div>
               <FormInput label="Physical Address" value={settings.address} onChange={(v) => setSettings({...settings, address: v})} />
               
               <div className="pt-8 border-t border-slate-800 flex justify-end">
                  <button onClick={() => { db.updateSettings(settings); showFeedback("Settings deployed"); }} className="bg-green-600 hover:bg-green-500 text-white px-12 py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center space-x-3">
                     <Save size={18} />
                     <span>Save & Deploy</span>
                  </button>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// UI Components for Dashboard
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

const FormInput = ({ label, value, onChange, type = "text" }: any) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 ml-1">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-green-600 transition-all font-bold text-white placeholder:text-slate-700"
    />
  </div>
);

export default Dashboard;
