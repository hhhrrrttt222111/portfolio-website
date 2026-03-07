export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Material-UI",
    githubUrl: "https://github.com/hemanthr/portfolio-website",
    tags: ["React", "TypeScript", "MUI"],
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "An intelligent chatbot powered by machine learning algorithms",
    githubUrl: "https://github.com/hemanthr/ai-assistant",
    tags: ["Python", "TensorFlow", "NLP"],
  },
  {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    githubUrl: "https://github.com/hemanthr/e-commerce-platform",
    tags: ["Node.js", "React", "MongoDB"],
  },
  {
    id: "task-manager",
    title: "Task Manager",
    description: "A productivity app for managing tasks and projects efficiently",
    githubUrl: "https://github.com/hemanthr/task-manager",
    tags: ["React", "Redux", "Firebase"],
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Real-time weather tracking with beautiful visualizations",
    githubUrl: "https://github.com/hemanthr/weather-dashboard",
    tags: ["Vue.js", "D3.js", "API"],
  },
  {
    id: "code-editor",
    title: "Code Editor",
    description: "A lightweight browser-based code editor with syntax highlighting",
    githubUrl: "https://github.com/hemanthr/code-editor",
    tags: ["JavaScript", "Monaco", "WebAssembly"],
  },
];
