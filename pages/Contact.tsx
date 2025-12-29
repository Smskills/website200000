
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.tsx';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { db } from '../lib/db.ts';
import { submitEnquiry } from '../services/enquiryService';

const Contact: React.FC = () => {
  const settings = db.getSettings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    course: 'General'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitEnquiry(formData);
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '', course: 'General' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Transmission failed.');
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <PageHeader title="Contact Admissions" subtitle="Institutional contact directory." />

      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Institutional Contacts</h2>
            <div className="space-y-10">
              <ContactInfo icon={<MapPin/>} label="Campus Address" value={settings.address} />
              <ContactInfo icon={<Phone/>} label="Admissions Helpline" value={settings.phone} />
              <ContactInfo icon={<Mail/>} label="General Email" value={settings.email} />
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight flex items-center">
              <span className={`w-2 h-2 rounded-full mr-3 ${status === 'loading' ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></span>
              Enquiry Portal
            </h3>
            
            {status === 'success' ? (
              <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                <h4 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Transmission Received</h4>
                <p className="text-slate-500 text-sm max-w-xs mx-auto mb-10">Your enquiry has been logged in the institutional queue. An advisor will contact you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-green-600 font-black uppercase text-[10px] tracking-widest hover:underline"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center space-x-3">
                    <AlertCircle size={18} className="text-red-500" />
                    <p className="text-[10px] text-red-700 font-bold uppercase tracking-tight">{errorMsg}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-slate-900 transition-colors" 
                      placeholder="Student Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <input 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-slate-900 transition-colors" 
                      placeholder="+1..." 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-slate-900 transition-colors" 
                    placeholder="email@example.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl h-32 resize-none outline-none focus:border-slate-900 transition-colors" 
                    placeholder="How can we help?"
                  ></textarea>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col items-center">
                  <button 
                    disabled={status === 'loading'}
                    className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center space-x-3 transition-all active:scale-95 disabled:opacity-50 shadow-xl"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Establish Connection</span>
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-[9px] text-slate-300 font-bold uppercase tracking-widest text-center">
                    Secure institutional transmission layer active
                  </p>
                </div>
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
    <div className="w-12 h-12 bg-slate-900 rounded flex items-center justify-center text-white flex-shrink-0 shadow-lg">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</h4>
      <p className="text-lg text-slate-800 font-medium">{value}</p>
    </div>
  </div>
);

export default Contact;
