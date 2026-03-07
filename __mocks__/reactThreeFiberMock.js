// Mock for @react-three/fiber to prevent JSX type conflicts in tests
const React = require('react');

const Canvas = ({ children }) => React.createElement('div', { 'data-testid': 'r3f-canvas' }, children);
const useFrame = () => {};
const useThree = () => ({ clock: { getElapsedTime: () => 0 } });
const extend = () => {};

module.exports = {
  Canvas,
  useFrame,
  useThree,
  extend,
};
