
import { apiFetch } from './api';
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
 * Synchronized with the production backend with a stability fallback.
 */
export const getPublicCourses = async (): Promise<CourseData[]> => {
  try {
    const response = await apiFetch('/courses');
    return response.data;
  } catch (error) {
    // BORING RELIABILITY: Fallback to local registry if backend is unreachable
    console.warn('Backend courses unreachable, pivoting to local registry.');
    const localCourses = await db.getCourses();
    return localCourses.map(c => ({
      id: c.id,
      title: c.name,
      description: c.description,
      duration: c.duration,
      mode: 'Offline' // Defaulting for local fallback
    }));
  }
};
