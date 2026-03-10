export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: "50%",
} as const;

export const transitions = {
  fast: "0.15s ease",
  normal: "0.3s ease",
  slow: "0.5s ease",
  bounce: "0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.15)",
  glow: (color: string) => `0 0 20px ${color}`,
} as const;

export const zIndex = {
  background: -1,
  base: 0,
  content: 1,
  overlay: 10,
  modal: 100,
  tooltip: 1000,
  navbar: 1100,
} as const;
