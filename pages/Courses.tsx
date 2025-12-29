
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Clock, Loader2, AlertCircle } from 'lucide-react';
import { getPublicCourses, CourseData } from '../services/courseService';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getPublicCourses();
        setCourses(data);
        setError(null);
      } catch (err: any) {
        setError('Institutional programs temporarily unavailable.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Our Courses" subtitle="Explore our diverse academic programs" />

      <div className="container mx-auto px-4 lg:px-8 py-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="animate-spin text-green-600 mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing Program Database...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-2xl mx-auto border border-slate-200">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Sync Failure</h3>
            <p className="text-slate-500 mb-8">{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No courses currently listed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
                <div className="p-8 flex-grow flex flex-col pt-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">{course.title}</h3>
                    <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-1 rounded tracking-tighter">{course.mode}</span>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <Clock size={16} className="mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <p className="text-slate-600 mb-6 flex-grow leading-relaxed">{course.description}</p>
                  <button className="w-full bg-slate-900 hover:bg-black text-white font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded transition-all mt-auto shadow-lg active:scale-95">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
