
import { SITE_CONFIG, NOTICES, COURSES } from '../data/siteData.ts';

export type UserRole = 'SUPER_ADMIN' | 'MANAGER';

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
}

export interface DbEnquiry {
  id: number;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
}

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
 * SECURITY: Sanitizes strings by removing HTML tags and potential script injections.
 */
const strictSanitize = (str: string): string => {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
};

class InstitutionalService {
  // SECURITY: Data is ephemeral (in-memory). No localStorage to prevent false trust.
  private _enquiries: DbEnquiry[] = [];
  private _settings = { ...SITE_CONFIG };

  // --- Configuration ---
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

  async updateSettings(settings: any): Promise<boolean> {
    // Backend Readiness: Simulated network latency
    await new Promise(r => setTimeout(r, 400));
    this._settings.name = strictSanitize(settings.siteName);
    this.sync();
    return true;
  }

  // --- Enquiry Management ---
  async validateEnquiry(data: Omit<DbEnquiry, 'id' | 'timestamp' | 'status'>): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newEnquiry: DbEnquiry = {
      name: strictSanitize(data.name),
      phone: strictSanitize(data.phone),
      email: strictSanitize(data.email),
      course: strictSanitize(data.course),
      message: strictSanitize(data.message),
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'NEW'
    };
    
    this._enquiries.unshift(newEnquiry);
    this.sync();
    return true;
  }

  async getEnquiries(): Promise<DbEnquiry[]> {
    return [...this._enquiries];
  }

  async deleteEnquiry(id: number): Promise<boolean> {
    this._enquiries = this._enquiries.filter(e => e.id !== id);
    this.sync();
    return true;
  }

  // --- Static Data (Backend Ready) ---
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

  getUsers(): AdminUser[] {
    // Mock identities for demo access
    return [
      { id: '1', username: 'admin', passwordHash: 'admin', role: 'SUPER_ADMIN' },
      { id: '2', username: 'editor', passwordHash: 'editor', role: 'MANAGER' }
    ];
  }

  getPage(pageId: string) {
    const pages: any = {
      'home': { id: 'home', seo: { title: 'SM Skills | Training Institute', description: 'Institutional framework for core skills.' } },
      'contact': { id: 'contact', seo: { title: 'Contact | SM Skills', description: 'Institutional enquiry portal.' } },
      // ... other pages
    };
    return pages[pageId] || pages['home'];
  }

  private sync() {
    window.dispatchEvent(new Event('db-update'));
  }
}

export const db = new InstitutionalService();
