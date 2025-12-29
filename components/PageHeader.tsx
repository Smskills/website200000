import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-slate-900 py-16 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-3">{title}</h1>
        {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;