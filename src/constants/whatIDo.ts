import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import SpeedIcon from "@mui/icons-material/Speed";
import StorageIcon from "@mui/icons-material/Storage";
import type { SvgIconComponent } from "@mui/icons-material";

export interface WhatIDoCard {
  title: string;
  description: string;
  Icon: SvgIconComponent;
}

export const WHAT_I_DO_CARDS: WhatIDoCard[] = [
  {
    title: "Frontend Architecture",
    description:
      "Designing scalable, maintainable frontend systems with modular patterns, state management strategies, and clean component hierarchies.",
    Icon: CodeIcon,
  },
  {
    title: "UI Engineering",
    description:
      "Crafting pixel-perfect interfaces with fluid animations, responsive layouts, and accessible design that delights users across every device.",
    Icon: BrushIcon,
  },
  {
    title: "Performance Optimization",
    description:
      "Squeezing every millisecond out of load times through code splitting, lazy loading, caching strategies, and runtime profiling.",
    Icon: SpeedIcon,
  },
  {
    title: "Backend APIs",
    description:
      "Building robust RESTful and GraphQL APIs with clean architecture, authentication layers, and efficient database interactions.",
    Icon: StorageIcon,
  },
] as const;
