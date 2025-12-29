
import React, { useEffect, useState } from 'react';
import { adminGetNotices, adminCreateNotice, adminUpdateNotice, adminToggleNoticeStatus } from '../services/adminService';
import { ArrowLeft, Plus, Edit2, X, Loader2, Power } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminNotices: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetNotices();
      setNotices(res.data);
    } catch (err) { console.error(err); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminUpdateNotice(editingId, formData);
      } else {
        await adminCreateNotice(formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: '', content: '' });
      fetchNotices();
    } catch (err) { alert('Save failed'); }
  };

  const handleToggle = async (id: number, current: boolean) => {
    try {
      await adminToggleNoticeStatus(id, !current);
      fetchNotices();
    } catch (err) { alert('Toggle failed'); }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white p-6 shadow-lg mb-12">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center text-[10px] font-bold uppercase tracking-widest hover:text-green-400">
            <ArrowLeft size={16} className="mr-2"/> Back to Hub
          </Link>
          <button onClick={() => setIsModalOpen(true)} className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-lg font-bold uppercase text-[10px] tracking-widest flex items-center">
            <Plus size={16} className="mr-2"/> Post Notice
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Institutional Notices</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 size={48} className="animate-spin text-slate-300"/></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notices.map(notice => (
              <div key={notice.id} className={`p-8 rounded-3xl border bg-white shadow-sm transition-all ${notice.is_active ? 'border-slate-200' : 'border-dashed opacity-50'}`}>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-slate-900">{notice.title}</h4>
                  <div className="flex space-x-2">
                    <button onClick={() => {
                       setEditingId(notice.id);
                       setFormData({ title: notice.title, content: notice.content });
                       setIsModalOpen(true);
                    }} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Edit2 size={16}/></button>
                    <button onClick={() => handleToggle(notice.id, !!notice.is_active)} className={`p-2 rounded-lg transition-colors ${notice.is_active ? 'text-green-600 bg-green-50' : 'text-slate-400 bg-slate-100'}`}>
                      <Power size={16}/>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{notice.content}</p>
                <div className="mt-6 pt-4 border-t border-slate-50 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                  Published: {new Date(notice.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-6">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-black uppercase tracking-tight">{editingId ? 'Edit Notice' : 'New Notice'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <input required placeholder="Notice Heading" className="w-full p-4 bg-slate-50 rounded-xl" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <textarea required placeholder="Notice Content" className="w-full p-4 bg-slate-50 rounded-xl h-48 resize-none" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl uppercase tracking-widest">Broadcast Notice</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotices;
