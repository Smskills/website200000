
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.tsx';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { db } from '../lib/db.ts';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const settings = db.getSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Logic: Form validates input then calls the ephemeral service
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
      <PageHeader title="Contact Admissions" subtitle="Professional enquiries and support." />

      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Institutional Contacts</h2>
            <div className="space-y-10">
              <ContactInfo icon={<MapPin/>} label="Campus Address" value={settings.address} />
              <ContactInfo icon={<Phone/>} label="Admissions Helpline" value={settings.phone} />
              <ContactInfo icon={<Mail/>} label="General Email" value={settings.email} />
            </div>

            <div className="mt-16 p-6 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-4">
              <AlertTriangle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                <strong>Honesty Disclaimer:</strong> This is a frontend-only demonstration. Submitting this form will NOT send an email or store data permanently. It is for UI evaluation only.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded border border-slate-200">
            {status === 'success' ? (
              <div className="text-center py-12 animate-in fade-in zoom-in">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Demo Submitted</h3>
                <p className="text-slate-600 mb-8 font-medium">
                  Frontend validation passed. In a production environment, this data would now be transmitted to our secure servers.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-slate-900 font-bold uppercase text-xs tracking-widest border-b-2 border-slate-900 pb-1"
                >
                  Return to form
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
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Program</label>
                    <select 
                      required
                      className="bg-white border border-slate-300 rounded px-4 py-3 focus:border-green-500 outline-none font-medium"
                      value={formData.course}
                      onChange={e => setFormData({...formData, course: e.target.value})}
                    >
                      <option value="">Select Course</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Business Admin">Business Admin</option>
                      <option value="Graphic Design">Graphic Design</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Message</label>
                  <textarea 
                    rows={4}
                    required
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
                    <><span>Test Submission</span> <Send size={16} /></>
                  )}
                </button>
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
