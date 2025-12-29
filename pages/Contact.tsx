
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.tsx';
import { MapPin, Phone, Mail, ShieldAlert, AlertTriangle } from 'lucide-react';
import { db } from '../lib/db.ts';

const Contact: React.FC = () => {
  const settings = db.getSettings();

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

            <div className="mt-16 p-6 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-4">
              <ShieldAlert className="text-slate-400 mt-1 flex-shrink-0" size={20} />
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium uppercase tracking-tight">
                <strong>Data Governance:</strong> All institutional communications are recorded for quality and academic assurance.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle size={32} className="text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Portal Update in Progress</h3>
            <p className="text-slate-500 mb-8 text-sm leading-relaxed max-w-sm">
              The online enquiry portal is currently being synchronized with our central student database. 
              <br/><br/>
              <strong>For immediate admissions support, please utilize our WhatsApp or Phone helpline.</strong>
            </p>
            <div className="flex flex-col space-y-4 w-full max-w-xs">
              <a href={`tel:${settings.phone}`} className="bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg">Call Admissions</a>
              <div className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Service expected to resume shortly</div>
            </div>
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

export default Contact;
