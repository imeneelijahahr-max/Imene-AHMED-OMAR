
export interface Experience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  imageUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  institution: string;
  year: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Research {
  id: string;
  title: string;
  field: string;
  year: string;
  link?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  email: string;
  linkedin: string;
  website: string;
  phone?: string;
}

export interface PortfolioData {
  profile: Profile;
  experience: Experience[];
  certifications: Certification[];
  courses: Course[];
  projects: Project[];
  research: Research[];
  skills: Skill[];
  skillsSummary: string;
}

export enum SectionType {
  EXPERIENCE = 'experience',
  CERTIFICATIONS = 'certifications',
  COURSES = 'courses',
  PROJECTS = 'projects',
  RESEARCH = 'research',
  SKILLS = 'skills'
}
