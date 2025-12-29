
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

export interface DbPage {
  id: string;
  seo: {
    title: string;
    description: string;
  };
}

class InstitutionalService {
  // SECURITY: Ephemeral in-memory storage only. No localStorage to prevent false trust.
  private _enquiries: DbEnquiry[] = [];
  private _settings = { ...SITE_CONFIG };
  private _courses: DbCourse[] = COURSES.map(c => ({
    id: c.id,
    name: c.title,
    description: c.description,
    duration: c.duration,
    isPublished: true
  }));

  /**
   * SECURITY: Sanitizes user input to prevent XSS.
   */
  private sanitize(str: string): string {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

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

  updateSettings(settings: any) {
    // In demo mode, we just update memory
    this._settings.name = this.sanitize(settings.siteName);
    this.sync();
  }

  // --- Enquiry Management (Hardened) ---
  async submitEnquiry(data: Omit<DbEnquiry, 'id' | 'timestamp' | 'status'>): Promise<boolean> {
    // Artificial delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 600));

    const newEnquiry: DbEnquiry = {
      name: this.sanitize(data.name),
      phone: this.sanitize(data.phone),
      email: this.sanitize(data.email),
      course: this.sanitize(data.course),
      message: this.sanitize(data.message),
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'NEW'
    };
    
    this._enquiries.unshift(newEnquiry);
    this.sync();
    return true;
  }

  getEnquiries(): DbEnquiry[] {
    return [...this._enquiries];
  }

  deleteEnquiry(id: number) {
    this._enquiries = this._enquiries.filter(e => e.id !== id);
    this.sync();
  }

  // --- Program Inventory ---
  getCourses(): DbCourse[] {
    return [...this._courses];
  }

  // --- Broadcasts (Notices) ---
  getNotices(): DbNotice[] {
    return NOTICES.map((n, i) => ({ ...n, id: i, isActive: true }));
  }

  getUsers(): AdminUser[] {
    // Demo credentials
    return [
      { id: '1', username: 'admin', passwordHash: 'admin', role: 'SUPER_ADMIN' },
      { id: '2', username: 'editor', passwordHash: 'editor', role: 'MANAGER' }
    ];
  }

  getPage(pageId: string): DbPage | undefined {
    const pages: Record<string, DbPage> = {
      'home': { id: 'home', seo: { title: 'Home | SM Skills', description: 'SM Skills Institute' } },
      'about': { id: 'about', seo: { title: 'About | SM Skills', description: 'About SM Skills' } },
      'courses': { id: 'courses', seo: { title: 'Courses | SM Skills', description: 'Our Courses' } },
      'admissions': { id: 'admissions', seo: { title: 'Admissions | SM Skills', description: 'Join Us' } },
      'placement': { id: 'placement', seo: { title: 'Placements | SM Skills', description: 'Careers' } },
      'gallery': { id: 'gallery', seo: { title: 'Gallery | SM Skills', description: 'Campus Life' } },
      'contact': { id: 'contact', seo: { title: 'Contact | SM Skills', description: 'Contact Us' } },
    };
    return pages[pageId];
  }

  private sync() {
    window.dispatchEvent(new Event('db-update'));
  }
}

export const db = new InstitutionalService();
