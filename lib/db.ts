
import { SITE_CONFIG, NOTICES, COURSES } from '../data/siteData.ts';

export interface DbCourse {
  id: number;
  name: string;
  description: string;
  duration: string;
  isPublished: boolean;
}

export interface DbNotice {
  id: number;
  date: string;
  tag?: string;
  title: string;
  desc: string;
  isActive: boolean;
}

/**
 * Institutional Data Registry
 * Provides a stable source of truth for the frontend preview.
 */
class InstitutionalService {
  private _settings = { ...SITE_CONFIG };

  getSettings() {
    return {
      siteName: this._settings.name,
      tagline: this._settings.tagline,
      phone: this._settings.contact.phone,
      email: this._settings.contact.email,
      address: this._settings.contact.address,
      socials: this._settings.contact.socials
    };
  }

  async getCourses(): Promise<DbCourse[]> {
    return COURSES.map(c => ({
      id: c.id,
      name: c.title,
      description: c.description,
      duration: c.duration,
      isPublished: true
    }));
  }

  async getNotices(): Promise<DbNotice[]> {
    return NOTICES.map((n, i) => ({ ...n, id: i, isActive: true }));
  }

  getPage(pageId: string) {
    const pages: any = {
      'home': { id: 'home', seo: { title: 'SM Skills | Training Institute', description: 'Institutional framework for core skills.' } },
      'contact': { id: 'contact', seo: { title: 'Contact | SM Skills', description: 'Institutional contact directory.' } },
    };
    return pages[pageId] || pages['home'];
  }
}

export const db = new InstitutionalService();
