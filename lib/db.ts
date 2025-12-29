
import { SITE_CONFIG, NAV_LINKS, REVIEWS, NOTICES, COURSES, GALLERY_IMAGES, ABOUT_CONTENT } from '../data/siteData';

// Types for the Virtual Database
export type UserRole = 'SUPER_ADMIN' | 'CONTENT_MANAGER';

export interface AdminUser {
  id: string;
  username: string;
  role: UserRole;
  passwordHash: string; // Simulating hashed storage
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl?: string;
  phone: string;
  email: string;
  admissionsEmail: string;
  address: string;
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

export interface PageContent {
  id: string;
  title: string;
  subtitle?: string;
  sections: Record<string, any>;
  seo: {
    title: string;
    description: string;
  };
}

export interface DbCourse {
  id: number;
  name: string;
  description: string;
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  isPublished: boolean;
  image?: string;
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

export interface DbNotice {
  id: number;
  date: string;
  tag?: string;
  title: string;
  desc: string;
  isActive: boolean;
}

// Database Store Structure
interface DatabaseSchema {
  users: AdminUser[];
  settings: SiteSettings;
  pages: Record<string, PageContent>;
  courses: DbCourse[];
  enquiries: DbEnquiry[];
  notices: DbNotice[];
  gallery: any[];
}

const DB_KEY = 'sm_skills_enterprise_db';

class VirtualDB {
  private data: DatabaseSchema;

  constructor() {
    const saved = localStorage.getItem(DB_KEY);
    if (saved) {
      this.data = JSON.parse(saved);
    } else {
      this.data = this.seed();
      this.save();
    }
  }

  private seed(): DatabaseSchema {
    return {
      users: [
        { id: '1', username: 'admin', role: 'SUPER_ADMIN', passwordHash: 'admin' },
        { id: '2', username: 'editor', role: 'CONTENT_MANAGER', passwordHash: 'editor' }
      ],
      settings: {
        siteName: SITE_CONFIG.name,
        tagline: SITE_CONFIG.tagline,
        phone: SITE_CONFIG.contact.phone,
        email: SITE_CONFIG.contact.email,
        admissionsEmail: SITE_CONFIG.contact.admissionsEmail,
        address: SITE_CONFIG.contact.address,
        socials: { ...SITE_CONFIG.contact.socials }
      },
      pages: {
        home: {
          id: 'home',
          title: 'Master New Skills',
          subtitle: 'Build Your Future',
          sections: {
            heroDesc: `${SITE_CONFIG.name} Training Institute provides modern, industry-relevant education designed to launch your career. Join us in ${SITE_CONFIG.estd} to discover your true potential.`,
            welcomeTitle: `Welcome to ${SITE_CONFIG.name}`,
            welcomeDesc1: ABOUT_CONTENT.paragraphs[0],
            welcomeDesc2: ABOUT_CONTENT.paragraphs[1],
            showReviews: true,
            showStats: true
          },
          seo: { title: 'Home | SM Skills', description: 'Official website of SM Skills Institute.' }
        },
        about: {
          id: 'about',
          title: 'About Us',
          subtitle: 'Discover our vision and mission',
          sections: {
            mainTitle: ABOUT_CONTENT.mainTitle,
            mission: ABOUT_CONTENT.mission,
            vision: ABOUT_CONTENT.vision,
            paragraphs: ABOUT_CONTENT.paragraphs
          },
          seo: { title: 'About | SM Skills', description: 'Learn about our history and values.' }
        },
        courses: {
          id: 'courses',
          title: 'Our Programs',
          subtitle: 'Explore our diverse academic offerings',
          sections: {},
          seo: { title: 'Courses | SM Skills', description: 'Professional training programs.' }
        }
      },
      courses: COURSES.map(c => ({
        id: c.id,
        name: c.title,
        description: c.description,
        duration: c.duration,
        mode: 'Offline',
        isPublished: true,
        image: c.image
      })),
      enquiries: [],
      notices: NOTICES.map((n, idx) => ({
        id: idx,
        date: n.date,
        tag: n.tag,
        title: n.title,
        desc: n.desc,
        isActive: true
      })),
      gallery: GALLERY_IMAGES
    };
  }

  private save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.data));
    // Trigger global event for reactive components
    window.dispatchEvent(new Event('db-update'));
  }

  // --- Auth Methods ---
  getUsers() { return this.data.users; }
  
  // --- Settings ---
  getSettings() { return this.data.settings; }
  updateSettings(settings: SiteSettings) {
    this.data.settings = settings;
    this.save();
  }

  // --- Content ---
  getPage(id: string) { return this.data.pages[id]; }
  updatePage(id: string, content: Partial<PageContent>) {
    this.data.pages[id] = { ...this.data.pages[id], ...content };
    this.save();
  }

  // --- Courses ---
  getCourses() { return this.data.courses; }
  saveCourse(course: DbCourse) {
    const idx = this.data.courses.findIndex(c => c.id === course.id);
    if (idx >= 0) this.data.courses[idx] = course;
    else this.data.courses.push(course);
    this.save();
  }
  deleteCourse(id: number) {
    this.data.courses = this.data.courses.filter(c => c.id !== id);
    this.save();
  }

  // --- Enquiries ---
  getEnquiries() { return this.data.enquiries; }
  addEnquiry(enquiry: Omit<DbEnquiry, 'id' | 'timestamp' | 'status'>) {
    const newEnq: DbEnquiry = {
      ...enquiry,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'NEW'
    };
    this.data.enquiries.unshift(newEnq);
    this.save();
  }
  updateEnquiryStatus(id: number, status: DbEnquiry['status']) {
    const enq = this.data.enquiries.find(e => e.id === id);
    if (enq) enq.status = status;
    this.save();
  }
  deleteEnquiry(id: number) {
    this.data.enquiries = this.data.enquiries.filter(e => e.id !== id);
    this.save();
  }

  // --- Notices ---
  getNotices() { return this.data.notices; }
  saveNotice(notice: DbNotice) {
    const idx = this.data.notices.findIndex(n => n.id === notice.id);
    if (idx >= 0) this.data.notices[idx] = notice;
    else this.data.notices.push({ ...notice, id: Date.now() });
    this.save();
  }

  // --- Gallery ---
  getGallery() { return this.data.gallery; }
  addToGallery(img: any) {
    this.data.gallery.push({ ...img, id: Date.now() });
    this.save();
  }
  removeFromGallery(id: number) {
    this.data.gallery = this.data.gallery.filter(g => g.id !== id);
    this.save();
  }
}

export const db = new VirtualDB();
