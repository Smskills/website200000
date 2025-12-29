
import { apiFetch } from './api';
import { db } from '../lib/db';

export interface NoticeData {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

/**
 * Notice Board Feed
 * Sourced from live institutional data with stability fallback.
 */
export const getPublicNotices = async (): Promise<NoticeData[]> => {
  try {
    const response = await apiFetch('/notices');
    return response.data;
  } catch (error) {
    // BORING RELIABILITY: Fallback to local registry if backend is unreachable
    console.warn('Backend notices unreachable, pivoting to local registry.');
    const localNotices = await db.getNotices();
    return localNotices.map(n => ({
      id: n.id,
      title: n.title,
      content: n.desc,
      created_at: n.date
    }));
  }
};
