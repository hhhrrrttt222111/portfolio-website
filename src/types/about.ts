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
