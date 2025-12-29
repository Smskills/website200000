
import { db } from '../lib/db';

export interface NoticeData {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

/**
 * Notice Board Feed
 * Sourced from local institutional data to ensure zero-downtime during preview.
 */
export const getPublicNotices = async (): Promise<NoticeData[]> => {
  const localNotices = await db.getNotices();
  return localNotices.map(n => ({
    id: n.id,
    title: n.title,
    content: n.desc,
    created_at: n.date
  }));
};
