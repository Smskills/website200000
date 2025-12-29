
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { MapPin, Phone, Mail, CheckCircle2, Send, Database } from 'lucide-react';
import { db } from '../lib/db';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', course: '', message: '', security: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const settings = db.getSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.security !== "11") {
      alert("Encryption verification failed. Please check the math.");
      return;
    }

    // BUSINESS LOGIC: Transmit to Database
    db.addEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      course: formData.course,
      message: formData.message
    });

    setIsSubmitted(true);
    setFormData({ name: '', phone: '', email: '', course: '', message: '', security: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO pageId="contact" />
      <PageHeader title="Contact Center" subtitle="Institutional Correspondence" />

      <div className="container mx-auto px-4 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h2 className="text-5xl font-black text-slate-900 mb-10 tracking-tighter uppercase">Institutional Nodes</h2>
            <div className="w-24 h-2 bg-green-600 rounded-full mb-16"></div>
            
            <div className="space-y-12">
              <ContactNode icon={<MapPin/>} label="Location" value={settings.address} />
              <ContactNode icon={<Phone/>} label="Phone" value={settings.phone} />
              <ContactNode icon={<Mail/>} label="Email" value={settings.email} />
            </div>
            
            <div className="mt-20 p-8 bg-slate-900 rounded-[2.5rem] text-white/50 text-[10px] font-mono leading-relaxed tracking-widest uppercase">
              <div className="flex items-center space-x-3 text-green-500 mb-3">
                 <Database size={14}/>
                 <span>Data Privacy Protocol v4.2</span>
              </div>
              All transmissions are logged securely in our institutional database for review by the admissions board. Response latency: 24-48 Hours.
            </div>
          </div>

          <div className="relative animate-in fade-in duration-1000">
            {isSubmitted ? (
              <div className="bg-white p-16 rounded-[3rem] shadow-2xl border border-green-100 flex flex-col items-center justify-center text-center h-full min-h-[550px]">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2.5rem] flex items-center justify-center mb-8 animate-bounce shadow-xl">
                  <CheckCircle2 size={56} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Data Logged</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-10 font-medium">Your lead has been successfully committed to our central database cluster. Transmission ID: {Date.now().toString().slice(-6)}</p>
                <button onClick={() => setIsSubmitted(false)} className="text-green-600 font-black uppercase text-xs tracking-[0.3em] hover:scale-105 transition-transform">Send Another Pulse</button>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100%] pointer-events-none opacity-50"></div>
                <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-tighter">Enquiry Terminal</h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <FormPart label="Identity" name="name" value={formData.name} onChange={v => setFormData({...formData, name: v})} placeholder="Full Name" />
                    <FormPart label="Phone" name="phone" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} placeholder="+1..." />
                  </div>
                  <FormPart label="Target Program" name="course" value={formData.course} isSelect options={['Computer Science', 'Business Admin', 'Graphic Design', 'Data Science']} onChange={v => setFormData({...formData, course: v})} />
                  <FormPart label="Message" name="message" value={formData.message} isTextarea onChange={v => setFormData({...formData, message: v})} placeholder="Describe your query..." />
                  
                  <div className="pt-6 border-t border-slate-50 flex items-center space-x-8">
                    <div className="flex-grow">
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Human Verify: 4 + 7 = ?</label>
                      <input type="text" value={formData.security} onChange={e => setFormData({...formData, security: e.target.value})} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-black" />
                    </div>
                    <button type="submit" className="mt-6 bg-slate-900 hover:bg-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center space-x-3 shadow-xl active:scale-95 transition-all group">
                      <span>Transmit</span>
                      <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactNode = ({ icon, label, value }: any) => (
  <div className="flex items-start group">
    <div className="w-16 h-16 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-all duration-500 shadow-xl shadow-transparent group-hover:shadow-green-500/10">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="ml-8">
      <h3 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em] mb-2">{label}</h3>
      <p className="text-slate-500 text-lg font-medium leading-relaxed">{value}</p>
    </div>
  </div>
);

const FormPart = ({ label, value, onChange, placeholder, isTextarea, isSelect, options }: any) => (
  <div className="relative">
    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">{label}</label>
    {isTextarea ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:border-green-500 transition-all font-bold text-slate-800 resize-none" placeholder={placeholder} />
    ) : isSelect ? (
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-800 appearance-none">
        <option value="">Select Category</option>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    ) : (
      <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-800" placeholder={placeholder} />
    )}
  </div>
);

export default Contact;
