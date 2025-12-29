
import React from 'react';
import PageHeader from '../components/PageHeader';
import { Clock } from 'lucide-react';
import { COURSES } from '../data/siteData';

const Courses: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader title="Our Courses" subtitle="Explore our diverse academic programs" />

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
              {course.image && (
                <div className="h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              
              <div className={`p-8 flex-grow flex flex-col ${course.image ? '' : 'pt-10'}`}>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{course.title}</h3>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <Clock size={16} className="mr-2" />
                  <span>{course.duration}</span>
                </div>
                <p className="text-slate-600 mb-6 flex-grow">{course.description}</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition-colors mt-auto">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
