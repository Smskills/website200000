
import { SITE_CONFIG, NOTICES, COURSES, GALLERY_IMAGES } from '../data/siteData.ts';

/**
 * ARCHITECTURAL NOTE:
 * In a production environment, these methods should be replaced with 
 * native fetch() calls to a Node.js/Python/PHP backend.
 */

// Added missing UserRole type for permissions
export type UserRole = 'SUPER_ADMIN' | 'MANAGER';

// Added missing AdminUser interface for authentication
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

// Added missing DbCourse interface for inventory management
export interface DbCourse {
  id: number;
  name: string;
  description: string;
  duration: string;
  isPublished: boolean;
}

// Added missing DbNotice interface for announcement management
export interface DbNotice {
  id: number;
  date: string;
  tag?: string;
  title: string;
  desc: string;
  isActive: boolean;
}

// Added missing DbPage interface for SEO management
export interface DbPage {
  id: string;
  seo: {
    title: string;
    description: string;
  };
}

class InstitutionalService {
  private isDevelopment = true;

  // --- Configuration ---
  getSettings() {
    // Priority: Saved Settings > Static Config
    const saved = localStorage.getItem('inst_settings');
    if (saved) return JSON.parse(saved);
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
    localStorage.setItem('inst_settings', JSON.stringify(settings));
    this.sync();
  }

  // --- Enquiry Management (Critical Path) ---
  async submitEnquiry(data: Omit<DbEnquiry, 'id' | 'timestamp' | 'status'>): Promise<boolean> {
    console.info("TRANSITION: Transmitting enquiry to institutional cluster...");
    
    // Simulate API Latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const enquiries = this.getEnquiries();
      const newEnquiry: DbEnquiry = {
        ...data,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'NEW'
      };
      
      enquiries.unshift(newEnquiry);
      localStorage.setItem('inst_enquiries', JSON.stringify(enquiries));
      
      console.log("SUCCESS: Lead committed to database.");
      this.sync();
      return true;
    } catch (e) {
      console.error("CRITICAL: Database write failure.", e);
      return false;
    }
  }

  getEnquiries(): DbEnquiry[] {
    const data = localStorage.getItem('inst_enquiries');
    return data ? JSON.parse(data) : [];
  }

  // Added missing updateEnquiryStatus method
  updateEnquiryStatus(id: number, status: 'NEW' | 'CONTACTED' | 'CLOSED') {
    const enquiries = this.getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      enquiries[index].status = status;
      localStorage.setItem('inst_enquiries', JSON.stringify(enquiries));
      this.sync();
    }
  }

  // Added missing deleteEnquiry method
  deleteEnquiry(id: number) {
    const enquiries = this.getEnquiries();
    const filtered = enquiries.filter(e => e.id !== id);
    localStorage.setItem('inst_enquiries', JSON.stringify(filtered));
    this.sync();
  }

  // --- Program Inventory ---
  getCourses(): DbCourse[] {
    const data = localStorage.getItem('inst_courses');
    return data ? JSON.parse(data) : COURSES.map(c => ({
      id: c.id,
      name: c.title,
      description: c.description,
      duration: c.duration,
      isPublished: true
    }));
  }

  // --- Broadcasts (Notices) ---
  getNotices(): DbNotice[] {
    const data = localStorage.getItem('inst_notices');
    return data ? JSON.parse(data) : NOTICES.map((n, i) => ({ ...n, id: i, isActive: true }));
  }

  // --- Auth Simulation ---
  // Added missing getUsers method to provide hardcoded credentials
  getUsers(): AdminUser[] {
    return [
      { id: '1', username: 'admin', passwordHash: 'admin', role: 'SUPER_ADMIN' },
      { id: '2', username: 'editor', passwordHash: 'editor', role: 'MANAGER' }
    ];
  }

  async authenticate(username: string, pass: string): Promise<boolean> {
    // Hardcoded for prototype; replace with secure Argon2/Bcrypt verification on backend
    const users = this.getUsers();
    return users.some(u => u.username === username && u.passwordHash === pass);
  }

  // Added missing getPage method for SEO metadata retrieval
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
