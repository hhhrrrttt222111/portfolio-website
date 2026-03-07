// Mock for visualization components to avoid @react-three/fiber conflicts in tests
const React = require('react');

const NetworkVisualization = () => null;
const SphereNetworkScene = () => null;

module.exports = {
  NetworkVisualization,
  SphereNetworkScene,
  default: NetworkVisualization,
};
