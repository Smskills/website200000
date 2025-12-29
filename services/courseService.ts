
import { db } from '../lib/db';

export interface CourseData {
  id: number;
  title: string;
  description: string;
  duration: string;
  mode: string;
}

/**
 * Institutional Course Registry
 * Currently pulling from local database until backend synchronization is finalized.
 */
export const getPublicCourses = async (): Promise<CourseData[]> => {
  // Use local registry for maximum stability during the frontend-only preview phase
  const localCourses = await db.getCourses();
  return localCourses.map(c => ({
    id: c.id,
    title: c.name,
    description: c.description,
    duration: c.duration,
    mode: 'Offline' 
  }));
};
