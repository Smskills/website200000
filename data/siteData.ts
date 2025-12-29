
export interface NavLink {
  name: string;
  path: string;
}

export interface Course {
  id: number;
  title: string;
  duration: string;
  description: string;
  image?: string;
}

export interface Review {
  id: number;
  name: string;
  course: string;
  rating: number;
  comment: string;
  image: string;
  isTopReview?: boolean;
}

export interface GalleryImage {
  id: number;
  category: string;
  src: string;
  alt: string;
}

export interface Notice {
  date: string;
  tag?: string;
  title: string;
  desc: string;
}

export interface SiteConfig {
  name: string;
  estd: string;
  tagline: string;
  description: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    admissionsEmail: string;
    socials: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    };
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "SM Skills",
  estd: "2024",
  tagline: "TRAINING INSTITUTE",
  description: "Empowering the next generation of professionals through cutting-edge skills training and holistic development.",
  contact: {
    address: "123 Skills Avenue, Tech Park, New York, NY 10012",
    phone: "+1 (555) 123-4567",
    email: "info@smskills.edu",
    admissionsEmail: "admissions@smskills.edu",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  }
};

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Placement', path: '/placement' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
  { name: 'Login', path: '/login' },
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    course: "Data Science Bootcamp",
    rating: 5,
    comment: "The practical approach at SM Skills changed my career trajectory. I went from zero coding knowledge to a Junior Data Analyst role within 6 months.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    isTopReview: true
  },
  {
    id: 2,
    name: "Michael Chen",
    course: "Computer Science Engineering",
    rating: 5,
    comment: "Excellent faculty and state-of-the-art labs. The curriculum is perfectly aligned with what the tech industry actually demands today.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    isTopReview: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    course: "Graphic Design Diploma",
    rating: 4,
    comment: "Loved the creative environment here. The mentors don't just teach tools; they teach design thinking. Highly recommend for aspiring creatives!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    isTopReview: true
  },
  {
    id: 4,
    name: "David Smith",
    course: "Business Administration (MBA)",
    rating: 5,
    comment: "The networking opportunities provided by SM Skills are unmatched. I've already connected with three industry leaders through their seminars.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    isTopReview: true
  },
  {
    id: 5,
    name: "Jessica Taylor",
    course: "Digital Marketing Masterclass",
    rating: 5,
    comment: "The placement cell is incredible. They helped me land an internship at a top ad agency before I even finished the course!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    isTopReview: true
  },
  {
    id: 6,
    name: "Robert Wilson",
    course: "Full Stack Web Dev",
    rating: 4,
    comment: "Strong focus on industry standards. Learned React, Node, and AWS in-depth. The project-based learning is very effective.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    isTopReview: false
  },
  {
    id: 7,
    name: "Aisha Khan",
    course: "UI/UX Design",
    rating: 5,
    comment: "I finally understand the 'User' in User Experience. SM Skills provides a very supportive community and great portfolio guidance.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    isTopReview: false
  },
  {
    id: 8,
    name: "James Anderson",
    course: "Cloud Architecture",
    rating: 5,
    comment: "The labs are top-notch. Having access to actual server hardware for learning was a game-changer for my understanding of infrastructure.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    isTopReview: false
  }
];

export const NOTICES: Notice[] = [
  { date: '2024-03-25', tag: 'NEW', title: 'Admissions Open for Summer 2024', desc: 'Join our inaugural batch. Applications are now being accepted.' },
  { date: '2024-03-20', tag: 'NEW', title: 'Industry Partnership Announcement', desc: 'SM Skills partners with leading tech firms for curriculum development.' },
  { date: '2024-03-15', title: 'Scholarship Test', desc: 'Register for the upcoming scholarship test to avail up to 50% fee waiver.' },
  { date: '2024-03-10', title: 'Free Webinar: Future of Tech', desc: 'Join us for a free webinar on emerging technologies this weekend.' },
  { date: '2024-03-05', title: 'Campus Visit Day', desc: 'Open house for prospective students and parents this Saturday.' },
];

export const ABOUT_CONTENT = {
  mainTitle: "A New Era of Excellence",
  paragraphs: [
    "Established in 2024, SM Skills Training Institute was founded with a singular vision: to democratize access to high-quality, job-oriented education. As a modern institution, we focus on what matters most in today's fast-paced world—practical skills and innovation.",
    "We pride ourselves on our fresh approach to learning, bringing together expert faculty and ambitious students. Our goal is to create a community that fosters growth, creativity, and professional success."
  ],
  mission: "To empower students with the cutting-edge skills and values necessary to thrive in a dynamic global economy. We strive to create an inclusive learning environment that fosters curiosity, critical thinking, and social responsibility.",
  vision: "To be a premier destination for skill development and innovation, contributing significantly to the workforce of the future and the betterment of society."
};

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Computer Science Engineering',
    duration: '4 Years',
    description: 'A comprehensive program covering algorithms, data structures, and modern software development.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Business Administration (MBA)',
    duration: '2 Years',
    description: 'Master leadership, finance, and strategic management in this intensive 2-year program.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Graphic Design Diploma',
    duration: '1 Year',
    description: 'Learn visual communication, typography, and branding with industry-standard tools.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    title: 'Data Science Bootcamp',
    duration: '6 Months',
    description: 'Intensive training in Python, Machine Learning, and statistical analysis.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80'
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, category: 'Classroom', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Modern Classroom Session' },
  { id: 2, category: 'Practical', src: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Engineering Lab Work' },
  { id: 3, category: 'Events', src: 'https://images.unsplash.com/photo-1544531696-297eb9009f78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Annual Sports Meet' },
  { id: 4, category: 'Placements', src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Graduation Day Ceremony' },
  { id: 5, category: 'Classroom', src: 'https://images.unsplash.com/photo-1501290836517-b223502fe7ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Library Study Area' },
  { id: 6, category: 'Practical', src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Research & Development' },
  { id: 7, category: 'Events', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Tech Fest Seminar' },
  { id: 8, category: 'Practical', src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Computer Lab Session' },
  { id: 9, category: 'Classroom', src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Guest Lecture' },
];
