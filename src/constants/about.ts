export interface Education {
  startYear: number;
  endYear: number | "Present";
  institution: string;
  level?: string;
  degree?: string;
}

export interface JourneyMilestone {
  year: number;
  title: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  dateRange: string;
  description: string;
}

export const EDUCATION: Education[] = [
  {
    startYear: 2005,
    endYear: 2007,
    institution: "Bhavans Bala Mandir, Eroor",
    level: "Primary Secondary Education",
  },
  {
    startYear: 2007,
    endYear: 2019,
    institution: "Bhavans Vidya Mandir, Eroor",
    level: "Higher Secondary Education",
  },
  {
    startYear: 2019,
    endYear: "Present",
    institution: "Model Engineering College, Thrikkakara",
    degree: "B.Tech in Computer Science",
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    year: 2017,
    title: "Started Coding",
    description: "Wrote my first lines of code and fell in love with building things from scratch.",
  },
  {
    year: 2020,
    title: "First Freelance Project",
    description:
      "Delivered a full-stack web app for a local business — learned more in weeks than months of tutorials.",
  },
  {
    year: 2022,
    title: "Joined a Startup",
    description: "Shipped production features at speed, wore many hats, and grew as an engineer.",
  },
  {
    year: 2024,
    title: "Built Products Used by Thousands",
    description: "Designed and developed applications that scaled to thousands of active users.",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "Software Engineer",
    company: "TechNova Solutions",
    dateRange: "Jan 2024 — Present",
    description:
      "Leading frontend architecture for a SaaS platform serving 10k+ users. Building performant, accessible interfaces with React, TypeScript, and a custom design system.",
  },
  {
    title: "Frontend Developer",
    company: "PixelCraft Studios",
    dateRange: "Jun 2022 — Dec 2023",
    description:
      "Developed interactive web experiences and marketing sites for high-profile clients. Focused on animation, performance optimization, and cross-browser consistency.",
  },
  {
    title: "Junior Developer Intern",
    company: "CodeBridge Labs",
    dateRange: "Jan 2022 — May 2022",
    description:
      "Built internal tools and contributed to the component library. Learned production workflows, code review culture, and agile development practices.",
  },
];

export const PHILOSOPHY_QUOTE =
  "Great products aren't just built. They are carefully crafted through empathy, iteration, and obsession with detail.";

export const BOOK_REVIEW_BLOG_URL = "https://hemanthr.com/blog";
