
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  profile: {
    name: "Dr. Imene Ahmed Omar, MD",
    title: "Consultant Physician & Clinical Researcher",
    summary: "Dedicated medical professional with over 8 years of experience in clinical practice and health systems research. Specializing in internal medicine with a strong focus on leveraging technology to improve patient outcomes and healthcare delivery in resource-constrained environments.",
    email: "dr.imene.ahmed@example.com",
    linkedin: "linkedin.com/in/dr-imene-ahmed-omar",
    website: "imene-medical.org"
  },
  skillsSummary: "Extensive expertise in clinical diagnostics and patient management within complex hospital settings. Proven ability to bridge the gap between traditional medicine and digital health solutions. Highly skilled in medical research methodology, data interpretation, and clinical trial coordination.",
  experience: [
    {
      id: "1",
      title: "Senior Consultant Physician",
      organization: "General Medical Center - Department of Internal Medicine",
      duration: "2021 - Present",
      description: "Leading a multidisciplinary team of 15 healthcare professionals. Overseeing inpatient care protocols and implementing digital health records to reduce diagnostic errors by 20%."
    },
    {
      id: "2",
      title: "Clinical Research Fellow",
      organization: "Institute of Global Health & Epidemiology",
      duration: "2018 - 2021",
      description: "Coordinated phase III clinical trials for novel anti-hypertensive treatments. Analyzed patient data from a cohort of 2,000+ individuals, leading to a breakthrough publication in the Lancet."
    }
  ],
  certifications: [
    {
      id: "c1",
      title: "Board Certified in Internal Medicine",
      issuer: "American Board of Internal Medicine",
      year: "2019",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "c2",
      title: "Advanced Cardiac Life Support (ACLS)",
      issuer: "American Heart Association",
      year: "2023",
      imageUrl: "https://images.unsplash.com/photo-1505751172177-51ad0c91ad13?auto=format&fit=crop&q=80&w=400"
    }
  ],
  courses: [
    {
      id: "cr1",
      title: "Epidemiology in Public Health Practice",
      institution: "Johns Hopkins University",
      year: "2022",
      imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "cr2",
      title: "Medical Data Science & AI",
      institution: "Stanford Online",
      year: "2021"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Tele-Health Community Outreach",
      description: "A mobile-first platform providing remote consultations for rural communities, facilitating over 5,000 digital appointments annually.",
      technologies: ["React Native", "WebRTC", "HIPAA Compliant Cloud"],
      link: "https://community-health-demo.com"
    },
    {
      id: "p2",
      title: "Digital Triage Algorithm",
      description: "Developed an AI-driven symptom checker for ER waiting rooms to prioritize urgent cases based on vital sign inputs.",
      technologies: ["Python", "TensorFlow", "IoT Sensors"],
      link: "https://github.com/imene-md/triage-ai"
    }
  ],
  research: [
    {
      id: "r1",
      title: "Impact of Digital Health Interventions on Chronic Disease Management",
      field: "Clinical Informatics",
      year: "2023",
      link: "https://pubmed.ncbi.nlm.nih.gov/example"
    }
  ],
  skills: [
    { id: "s1", name: "Internal Medicine", category: "Clinical" },
    { id: "s2", name: "Diagnosis & Treatment", category: "Clinical" },
    { id: "s3", name: "Epidemiology", category: "Research" },
    { id: "s4", name: "Data Analysis (SPSS/R)", category: "Research" },
    { id: "s5", name: "Telemedicine Systems", category: "Technology" },
    { id: "s6", name: "Electronic Health Records (EHR)", category: "Technology" }
  ]
};
