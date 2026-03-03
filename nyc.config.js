module.exports = {
  // Use the TypeScript extension for NYC
  extends: "@istanbuljs/nyc-config-typescript",

  // Include all source files to get an accurate 0% if they aren't tested
  all: true,

  // Specific folders to include/exclude
  include: ["src/**/*.{ts,tsx}"],
  exclude: [
    "**/*.test.{ts,tsx}",
    "src/**/index.ts",
    "src/main.tsx",
    "src/vite-env.d.ts",
    "dist/**",
    "coverage/**",
  ],

  // Reporting options
  reporter: [
    "text", // Terminal output
    "lcov", // For SonarQube/Coveralls
    "html", // Generates a 'coverage' folder with a clickable UI
  ],

  // Enforcement (Fails build if coverage drops below these %)
  "check-coverage": true,
  branches: 80,
  lines: 80,
  functions: 80,
  statements: 80,

  // Misc
  cache: true,
  "report-dir": "./coverage",
};
