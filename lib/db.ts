
import { SITE_CONFIG, NOTICES, COURSES, GALLERY_IMAGES } from '../data/siteData.ts';

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
  /**
   * SECURITY: Sanitizes user input to prevent XSS.
   * In a real app, this would be handled by a backend library like DOMPurify.
   */
  private sanitize(str: string): string {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m] || m));
  }

  // --- Configuration ---
  getSettings() {
    try {
      const saved = localStorage.getItem('inst_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Storage access restricted.");
    }
    return {
      siteName: SITE_CONFIG.name,
      tagline: SITE_CONFIG.tagline,
      phone: SITE_CONFIG.contact.phone,
      email: SITE_CONFIG.contact.email,
      address: SITE_CONFIG.contact.address,
      socials: SITE_CONFIG.contact.socials
    };
  }

  updateSettings(settings: any) {
    try {
      localStorage.setItem('inst_settings', JSON.stringify(settings));
      this.sync();
    } catch (e) {
      console.error("Failed to update settings locally.");
    }
  }

  // --- Enquiry Management (Hardened) ---
  async submitEnquiry(data: Omit<DbEnquiry, 'id' | 'timestamp' | 'status'>): Promise<boolean> {
    // Simulate network delay for honesty
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const enquiries = this.getEnquiries();
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
      
      enquiries.unshift(newEnquiry);
      localStorage.setItem('inst_enquiries', JSON.stringify(enquiries));
      this.sync();
      return true;
    } catch (e) {
      return false;
    }
  }

  getEnquiries(): DbEnquiry[] {
    try {
      const data = localStorage.getItem('inst_enquiries');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  updateEnquiryStatus(id: number, status: 'NEW' | 'CONTACTED' | 'CLOSED') {
    const enquiries = this.getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      enquiries[index].status = status;
      localStorage.setItem('inst_enquiries', JSON.stringify(enquiries));
      this.sync();
    }
  }

  deleteEnquiry(id: number) {
    const enquiries = this.getEnquiries();
    const filtered = enquiries.filter(e => e.id !== id);
    localStorage.setItem('inst_enquiries', JSON.stringify(filtered));
    this.sync();
  }

  // --- Program Inventory ---
  getCourses(): DbCourse[] {
    try {
      const data = localStorage.getItem('inst_courses');
      return data ? JSON.parse(data) : COURSES.map(c => ({
        id: c.id,
        name: c.title,
        description: c.description,
        duration: c.duration,
        isPublished: true
      }));
    } catch (e) {
      return [];
    }
  }

  // --- Broadcasts (Notices) ---
  getNotices(): DbNotice[] {
    try {
      const data = localStorage.getItem('inst_notices');
      return data ? JSON.parse(data) : NOTICES.map((n, i) => ({ ...n, id: i, isActive: true }));
    } catch (e) {
      return [];
    }
  }

  getUsers(): AdminUser[] {
    return [
      { id: '1', username: 'admin', passwordHash: 'admin', role: 'SUPER_ADMIN' },
      { id: '2', username: 'editor', passwordHash: 'editor', role: 'MANAGER' }
    ];
  }

  async authenticate(username: string, pass: string): Promise<boolean> {
    const users = this.getUsers();
    return users.some(u => u.username === username && u.passwordHash === pass);
  }

  getPage(pageId: string): DbPage | undefined {
    const pages: Record<string, DbPage> = {
      'home': { id: 'home', seo: { title: 'Home | SM Skills', description: 'Welcome to SM Skills Institute' } },
      'about': { id: 'about', seo: { title: 'About Us | SM Skills', description: 'Learn about our history and mission' } },
      'courses': { id: 'courses', seo: { title: 'Courses | SM Skills', description: 'Explore our wide range of professional courses' } },
      'admissions': { id: 'admissions', seo: { title: 'Admissions | SM Skills', description: 'Join our institute today' } },
      'placement': { id: 'placement', seo: { title: 'Placements | SM Skills', description: 'Our career support and corporate network' } },
      'gallery': { id: 'gallery', seo: { title: 'Gallery | SM Skills', description: 'Life and events at SM Skills' } },
      'contact': { id: 'contact', seo: { title: 'Contact Us | SM Skills', description: 'Get in touch with our admissions team' } },
    };
    return pages[pageId];
  }

  private sync() {
    window.dispatchEvent(new Event('db-update'));
  }
}

export const db = new InstitutionalService();
