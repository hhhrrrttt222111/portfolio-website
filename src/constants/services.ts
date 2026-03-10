import WebIcon from "@mui/icons-material/Web";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "website-creation",
    title: "Website Creation",
    description:
      "Building modern, responsive, and high-performance websites tailored to your business needs",
    icon: WebIcon,
    features: [
      "Custom web applications",
      "Responsive design",
      "SEO optimization",
      "Performance tuning",
    ],
  },
  {
    id: "ideation",
    title: "Ideation",
    description:
      "Transforming your vision into actionable plans with creative brainstorming and strategic thinking",
    icon: LightbulbIcon,
    features: [
      "Product conceptualization",
      "Market research",
      "Feature prioritization",
      "MVP planning",
    ],
  },
  {
    id: "web-designing",
    title: "Web Designing",
    description:
      "Crafting visually stunning and user-friendly interfaces that captivate and engage your audience",
    icon: DesignServicesIcon,
    features: ["UI/UX design", "Wireframing", "Prototyping", "Design systems"],
  },
  {
    id: "tech-consulting",
    title: "Tech Consulting",
    description:
      "Providing expert guidance on technology decisions, architecture, and best practices",
    icon: SupportAgentIcon,
    features: ["Architecture review", "Technology selection", "Code audits", "Team mentoring"],
  },
];
