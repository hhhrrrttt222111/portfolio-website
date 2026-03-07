// eslint-disable-next-line @typescript-eslint/no-require-imports
const { TextEncoder, TextDecoder } = require("util");
Object.assign(global, { TextEncoder, TextDecoder });

// Suppress console.error for Three.js/R3F element warnings in tests
/* eslint-disable no-console */
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const fullMessage = args.map((arg) => String(arg)).join(" ");

  // Suppress Three.js/R3F related warnings
  const suppressedPatterns = [
    "is using incorrect casing",
    "is unrecognized in this browser",
    "React does not recognize the",
    "If you meant to render a React component",
    "lowercase for HTML elements",
    "on a DOM element",
    "prop on a DOM element",
    "non-boolean attribute",
    "pass a string instead",
  ];

  if (suppressedPatterns.some((pattern) => fullMessage.includes(pattern))) {
    return;
  }

  originalConsoleError(...args);
};
/* eslint-enable no-console */

// Mock matchMedia for GSAP ScrollTrigger
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver for GSAP
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
window.ResizeObserver = ResizeObserverMock;

import "@testing-library/jest-dom";
