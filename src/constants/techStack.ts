export interface SkillCategory {
  id: string;
  label: string;
  command: string;
  skills: string[];
  accentColor: string;
}

export const TECH_STACK: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    command: "ls ~/languages",
    skills: ["C/C++", "Python", "Java", "Dart", "Ruby"],
    accentColor: "#e57373",
  },
  {
    id: "webdev",
    label: "Web Development",
    command: "ls ~/webdev",
    skills: [
      "HTML/CSS/Javascript",
      "ReactJS, Vite",
      "TailwindCSS, Material-UI",
      "Node.js",
      "GraphQL",
      "Angular",
    ],
    accentColor: "#64b5f6",
  },
  {
    id: "appdev",
    label: "App Development",
    command: "ls ~/appdev",
    skills: ["Flutter", "React Native"],
    accentColor: "#4dd0e1",
  },
  {
    id: "databases",
    label: "Databases",
    command: "ls ~/databases",
    skills: ["MySQL", "MongoDB", "SQLite3", "Firebase", "Supabase", "PostgresSQL"],
    accentColor: "#ffb74d",
  },
  {
    id: "ml",
    label: "Machine Learning",
    command: "ls ~/machine-learning",
    skills: ["scikit-learn", "TensorFlow", "Keras", "PyTorch", "OpenCV"],
    accentColor: "#ba68c8",
  },
  {
    id: "dataviz",
    label: "Data Visualization",
    command: "ls ~/dataviz",
    skills: ["Matplotlib", "Seaborn"],
    accentColor: "#f06292",
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    command: "ls ~/devops",
    skills: ["Git", "AWS", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Linux", "Shell Scripting"],
    accentColor: "#aed581",
  },
  {
    id: "os",
    label: "Operating Systems",
    command: "ls ~/os",
    skills: ["Ubuntu", "Kali Linux", "Windows", "Parrot OS"],
    accentColor: "#90a4ae",
  },
  {
    id: "apps",
    label: "Applications",
    command: "ls ~/apps",
    skills: ["Microsoft Office"],
    accentColor: "#a1887f",
  },
];
