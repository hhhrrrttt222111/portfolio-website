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
    year: 2011,
    title: "First Introduction to Computers",
    description:
      "Discovered computers for the first time and became curious about how software and technology work.",
  },
  {
    year: 2015,
    title: "Built My First Website",
    description:
      "Created my first simple website, learning the basics of HTML, CSS, and how the web works.",
  },
  {
    year: 2016,
    title: "Started Learning to Code",
    description:
      "Began learning programming seriously, exploring core concepts and building small projects.",
  },
  {
    year: 2020,
    title: "First Freelance Project",
    description:
      "Completed my first freelance project, building a real-world application and gaining hands-on experience.",
  },
  {
    year: 2021,
    title: "First Internship",
    description:
      "Worked in a professional development environment, collaborating with experienced developers and shipping real features.",
  },
  {
    year: 2022,
    title: "Started Freelancing",
    description:
      "Began taking on freelance work regularly, delivering projects and refining practical development skills.",
  },
  {
    year: 2023,
    title: "Landed My First Job",
    description:
      "Started my professional career as a software developer, working on production systems and real-world products.",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "Consultant Developer",
    company: "Thoughtworks",
    dateRange: "Jul 2023 — Present",
    description:
      "Working as a consultant developer building scalable enterprise applications. Contributing to backend and frontend systems using Node.js, TypeScript, and modern development practices in a collaborative agile environment.",
  },
  {
    title: "Web Manager",
    company: "Excel MEC",
    dateRange: "Jun 2022 — Sep 2023",
    description:
      "Managed and developed the organization's web presence, maintaining websites and building new features using React.js and modern web technologies while coordinating with the web team.",
  },
  {
    title: "Full Stack Developer (Freelance)",
    company: "Svasthi Charitable Trust",
    dateRange: "May 2023 — Jun 2023",
    description:
      "Developed the official website for Svasthi Charitable Trust using React.js and Firebase, focusing on performance, responsiveness, and maintainable frontend architecture.",
  },
  {
    title: "Full Stack Developer (Freelance)",
    company: "Advantus Life Sciences",
    dateRange: "Sep 2021 — Jul 2022",
    description:
      "Built the official website for Advantus Life Sciences using Next.js, delivering a responsive and production-ready web platform for the organization.",
  },
  {
    title: "Frontend Developer Intern",
    company: "TGH Tech",
    dateRange: "Jun 2021 — Sep 2021",
    description:
      "Worked on two frontend projects using React.js and Firebase, gaining experience in building responsive interfaces and collaborating in a professional development environment.",
  },
  {
    title: "React Developer",
    company: "Indic Law",
    dateRange: "Nov 2020 — Mar 2021",
    description:
      "Developed the IndicLaw website using React.js and Material-UI, focusing on building reusable UI components and a clean, responsive interface.",
  },
];

export const PHILOSOPHY_QUOTE =
  "Great products aren't just built. They are carefully crafted through empathy, iteration, and obsession with detail.";
