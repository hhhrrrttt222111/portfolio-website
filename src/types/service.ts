import type { SvgIconComponent } from "@mui/icons-material";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: SvgIconComponent;
  features: string[];
}

export interface WhatIDoCard {
  title: string;
  description: string;
  Icon: SvgIconComponent;
}
