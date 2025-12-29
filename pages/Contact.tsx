
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.tsx';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle, Info } from 'lucide-react';
import { db } from '../lib/db.ts';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const settings = db.getSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const result = await db.submitEnquiry(formData);
    
    if (result) {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <PageHeader title="Contact Admissions" subtitle="Start your professional journey today." />

      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Institutional Contacts</h2>
            <div className="space-y-10">
              <ContactInfo icon={<MapPin/>} label="Campus Address" value={settings.address} />
              <ContactInfo icon={<Phone/>} label="Admissions Helpline" value={settings.phone} />
              <ContactInfo icon={<Mail/>} label="General Email" value={settings.email} />
            </div>

            <div className="mt-16 p-6 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-4">
              <Info className="text-slate-400 mt-1 flex-shrink-0" size={20} />
              <p className="text-xs text-slate-500 leading-relaxed italic">
                <strong>System Note:</strong> This website is currently in "Frontend Evaluation Mode". Contact forms save to your local browser storage and do not transmit to our servers.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded border border-slate-200">
            {status === 'success' ? (
              <div className="text-center py-12 animate-in fade-in zoom-in">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase">Saved to Local Store</h3>
                <p className="text-slate-600 mb-8 font-medium">Your demo enquiry has been successfully committed to this browser's database. Visit the Admin Terminal to review it.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-green-600 font-bold uppercase text-xs tracking-widest border-b-2 border-green-600 pb-1"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" required value={formData.name} onChange={v => setFormData({...formData, name: v})} />
                  <Input label="Email Address" type="email" required value={formData.email} onChange={v => setFormData({...formData, email: v})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Phone Number" required value={formData.phone} onChange={v => setFormData({...formData, phone: v})} />
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Preferred Program</label>
                    <select 
                      required
                      className="bg-white border border-slate-300 rounded px-4 py-3 focus:border-green-500 outline-none font-medium"
                      value={formData.course}
                      onChange={e => setFormData({...formData, course: e.target.value})}
                    >
                      <option value="">Select a Course</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Business Admin">Business Admin</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Message / Query</label>
                  <textarea 
                    rows={4}
                    required
                    maxLength={1000}
                    className="bg-white border border-slate-300 rounded px-4 py-3 focus:border-green-500 outline-none font-medium resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-slate-900 hover:bg-black text-white font-bold uppercase tracking-widest py-4 rounded transition-all flex items-center justify-center space-x-2"
                >
                  {status === 'sending' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <><span>Submit (Demo Mode)</span> <Send size={16} /></>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-xs font-bold text-center uppercase tracking-tighter">Transmission blocked by security settings.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = ({ icon, label, value }: any) => (
  <div className="flex items-start space-x-6">
    <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center text-slate-900 flex-shrink-0">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</h4>
      <p className="text-lg text-slate-800 font-medium">{value}</p>
    </div>
  </div>
);

const Input = ({ label, type = "text", ...props }: any) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">{label}</label>
    <input 
      type={type}
      className="bg-white border border-slate-300 rounded px-4 py-3 focus:border-green-500 outline-none font-medium"
      onChange={e => props.onChange(e.target.value)}
      {...props}
    />
  </div>
);

export default Contact;
