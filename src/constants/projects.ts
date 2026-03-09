export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "online-fatigue-detector",
    title: "Online Fatigue Detector",
    description:
      "A Flask application that detects fatigue during online classes by monitoring eye movements, helping students stay alert and attentive.",
    githubUrl: "https://github.com/hhhrrrttt222111/fatigue-detector",
    tags: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "travel-app",
    title: "TravelApp",
    description:
      "A travel planning web application built using the MERN stack for exploring and managing travel destinations.",
    githubUrl: "https://github.com/hhhrrrttt222111/TravelApp",
    tags: ["React", "MongoDB", "Node.js", "CSS"],
  },
  {
    id: "covid-19-tracker",
    title: "COVID-19 Tracker",
    description:
      "A real-time COVID-19 statistics tracker built with React and Material-UI to visualize global pandemic data.",
    githubUrl: "https://github.com/hhhrrrttt222111/covid-tracker",
    tags: ["React", "Material UI", "CSS"],
  },
  {
    id: "dorkify",
    title: "Dorkify",
    description:
      "A Python tool that helps perform Google Dork searches efficiently for security research and information discovery.",
    githubUrl: "https://github.com/hhhrrrttt222111/Dorkify",
    tags: ["Python"],
  },
  {
    id: "ethical-hacking-tools",
    title: "Ethical Hacking Tools",
    description:
      "A curated collection and guide of tools used in ethical hacking and cybersecurity research.",
    githubUrl: "https://github.com/hhhrrrttt222111/Ethical-Hacking-Tools",
    tags: ["Cybersecurity", "Ethical Hacking", "Security Tools"],
  },
];
