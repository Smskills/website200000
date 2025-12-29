
import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowLeft, Folder, Image as ImageIcon } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/siteData';

const Gallery: React.FC = () => {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const categories = Array.from(new Set(GALLERY_IMAGES.map(img => img.category)));

  const filteredImages = activeAlbum 
    ? GALLERY_IMAGES.filter(img => img.category === activeAlbum) 
    : [];

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) setSelectedIndex((prev) => (prev! + 1) % filteredImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) setSelectedIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev! + 1) % filteredImages.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredImages.length]);

  const getAlbumPreview = (category: string) => GALLERY_IMAGES.find(i => i.category === category)?.src || '';
  const getAlbumCount = (category: string) => GALLERY_IMAGES.filter(i => i.category === category).length;

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Gallery" subtitle="Life at SM Skills" />
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {!activeAlbum ? (
          <div className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {categories.map((cat) => (
                 <div key={cat} onClick={() => setActiveAlbum(cat)} className="group cursor-pointer">
                   <div className="relative h-64 rounded-xl overflow-hidden shadow-md mb-4 bg-slate-100">
                     <img src={getAlbumPreview(cat)} alt={cat} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <Folder className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-110 transition-all duration-300" size={48} />
                     </div>
                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <span className="text-white font-medium flex items-center gap-2"><ImageIcon size={16} /> {getAlbumCount(cat)} Photos</span>
                     </div>
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-green-600 transition-colors">{cat}</h3>
                 </div>
               ))}
             </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-4 duration-300">
             <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
               <button onClick={() => setActiveAlbum(null)} className="flex items-center text-slate-600 hover:text-green-600 transition-colors font-medium">
                 <ArrowLeft size={20} className="mr-2" /> Back to Albums
               </button>
               <h2 className="text-2xl font-bold text-slate-800">{activeAlbum}</h2>
               <div className="text-slate-400 text-sm">{filteredImages.length} Photos</div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((img, index) => (
                  <div key={img.id} className="group relative rounded-lg overflow-hidden h-64 shadow-md cursor-pointer" onClick={() => handleOpen(index)}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100" size={32} />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {selectedIndex !== null && filteredImages.length > 0 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={handleClose}>
          <button className="absolute top-6 right-6 text-white hover:text-green-400 z-50" onClick={handleClose}><X size={40} /></button>
          <button className="absolute left-8 text-white hidden md:block z-50" onClick={handlePrev}><ChevronLeft size={48} /></button>
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={filteredImages[selectedIndex].src} alt={filteredImages[selectedIndex].alt} className="max-h-[80vh] w-auto max-w-full object-contain rounded shadow-2xl" />
            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-semibold">{filteredImages[selectedIndex].category}</h3>
              <p className="text-slate-300 mt-1">{filteredImages[selectedIndex].alt}</p>
            </div>
          </div>
          <button className="absolute right-8 text-white hidden md:block z-50" onClick={handleNext}><ChevronRight size={48} /></button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
