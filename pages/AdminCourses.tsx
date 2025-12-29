
import React, { useEffect, useState } from 'react';
import { adminGetCourses, adminCreateCourse, adminUpdateCourse, adminDeleteCourse } from '../services/adminService';
import { ArrowLeft, Plus, Trash2, Edit2, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', duration: '', mode: 'offline' });

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetCourses();
      setCourses(res.data);
    } catch (err) { console.error(err); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminUpdateCourse(editingId, formData);
      } else {
        await adminCreateCourse(formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: '', description: '', duration: '', mode: 'offline' });
      fetchCourses();
    } catch (err) { alert('Save failed'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Purge this program?')) return;
    try {
      await adminDeleteCourse(id);
      fetchCourses();
    } catch (err) { alert('Delete failed'); }
  };

  const openEdit = (course: any) => {
    setEditingId(course.id);
    setFormData({ title: course.title, description: course.description, duration: course.duration, mode: course.mode });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white p-6 shadow-lg mb-12">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center text-[10px] font-bold uppercase tracking-widest hover:text-green-400">
            <ArrowLeft size={16} className="mr-2"/> Back to Hub
          </Link>
          <button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-bold uppercase text-[10px] tracking-widest flex items-center transition-all">
            <Plus size={16} className="mr-2"/> New Course
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Course Inventory</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 size={48} className="animate-spin text-slate-300"/></div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Title</th>
                  <th className="px-8 py-4">Mode</th>
                  <th className="px-8 py-4">Duration</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{course.title}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-slate-100 text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter">{course.mode}</span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">{course.duration}</td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => openEdit(course)} className="p-2 text-slate-400 hover:text-blue-600"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-6">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-black uppercase tracking-tight">{editingId ? 'Edit Program' : 'New Program'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <input 
                required placeholder="Course Title" 
                className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none"
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <textarea 
                required placeholder="Detailed Description" 
                className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 h-32 resize-none"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  required placeholder="Duration (e.g. 6 Months)" 
                  className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100"
                  value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}
                />
                <select 
                  className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100"
                  value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})}
                >
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl uppercase tracking-widest shadow-xl">Commit Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
