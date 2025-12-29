
import React, { useEffect, useState } from 'react';
import { adminGetEnquiries } from '../services/adminService';
import { ArrowLeft, Loader2, Calendar, User, Mail, Phone, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await adminGetEnquiries();
        setEnquiries(res.data);
      } catch (err) { console.error(err); }
      finally { setIsLoading(false); }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 text-white p-6 shadow-lg mb-12">
        <div className="container mx-auto">
          <Link to="/dashboard" className="flex items-center text-[10px] font-bold uppercase tracking-widest hover:text-green-400">
            <ArrowLeft size={16} className="mr-2"/> Back to Hub
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Applicant Vault</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 size={48} className="animate-spin text-slate-300"/></div>
        ) : (
          <div className="space-y-6">
            {enquiries.length > 0 ? enquiries.map(q => (
              <div key={q.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
                <div className="flex-grow space-y-6">
                  <div className="flex items-center space-x-3 text-slate-400 mb-2">
                    <Calendar size={14}/>
                    <span className="text-[9px] font-black uppercase tracking-widest">{new Date(q.created_at).toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-slate-50 p-2 rounded-lg text-slate-900"><User size={18}/></div>
                      <div>
                        <div className="text-[9px] text-slate-400 font-black uppercase mb-1">Applicant</div>
                        <div className="font-bold text-slate-900">{q.name}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-slate-50 p-2 rounded-lg text-slate-900"><Book size={18}/></div>
                      <div>
                        <div className="text-[9px] text-slate-400 font-black uppercase mb-1">Interest</div>
                        <div className="font-bold text-green-600 uppercase text-xs">{q.course}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[9px] text-slate-400 font-black uppercase mb-3">Statement</div>
                    <p className="text-sm text-slate-600 leading-relaxed italic">"{q.message}"</p>
                  </div>
                </div>
                <div className="md:w-72 bg-slate-900 p-8 rounded-3xl text-white flex flex-col justify-center space-y-4">
                   <div className="flex items-center space-x-3">
                     <Mail size={16} className="text-green-500" />
                     <span className="text-xs font-medium truncate">{q.email}</span>
                   </div>
                   <div className="flex items-center space-x-3">
                     <Phone size={16} className="text-green-500" />
                     <span className="text-xs font-medium">{q.phone}</span>
                   </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 text-slate-300 font-black uppercase tracking-widest">Vault is empty.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
