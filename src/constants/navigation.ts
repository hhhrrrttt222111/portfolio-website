export interface NavLink {
  label: string;
  path: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
] as const;

export const LOGO_TEXT = "HRT";

export const CTA_LINK: NavLink = {
  label: "Contact Me",
  path: "/contact",
};
