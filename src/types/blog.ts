export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export interface Blog {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  topics: string[];
  theme: "hacker" | "literary";
  posts: BlogPost[];
}

export interface LegacyBlogPost {
  id: number;
  title: string;
  date: string;
  url: string;
  tag: string;
}
