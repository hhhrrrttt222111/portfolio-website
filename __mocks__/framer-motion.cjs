// Mock for framer-motion to prevent issues with MUI styled() in tests
const React = require('react');

const createMotionComponent = (tag) => {
  const Component = React.forwardRef((props, ref) => {
    const { children, initial, animate, exit, variants, whileHover, whileTap, whileFocus, transition, style, custom, layoutId, ...rest } = props;
    return React.createElement(tag, { ...rest, ref, style }, children);
  });
  Component.displayName = `motion.${tag}`;
  Component.__emotion_styles = [];
  return Component;
};

const createFromComponent = (BaseComponent) => {
  if (!BaseComponent) {
    return createMotionComponent('div');
  }
  const Component = React.forwardRef((props, ref) => {
    const { initial, animate, exit, variants, whileHover, whileTap, whileFocus, transition, custom, layoutId, ...rest } = props;
    if (typeof BaseComponent === 'string') {
      return React.createElement(BaseComponent, { ...rest, ref });
    }
    return React.createElement(BaseComponent, { ...rest, ref });
  });
  Component.displayName = `motion(${BaseComponent?.displayName || BaseComponent?.name || 'Component'})`;
  return Component;
};

// Create motion object with create method and all HTML elements
const motion = {};

// Define create as a non-enumerable property to ensure it's accessible
Object.defineProperty(motion, 'create', {
  value: createFromComponent,
  writable: false,
  enumerable: true,
  configurable: false,
});

// Add all common HTML elements
const htmlElements = [
  'div', 'span', 'p', 'a', 'button', 'input', 'form', 'img', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'main', 'nav', 'section',
  'article', 'aside', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
  'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'defs', 'use',
  'label', 'textarea', 'select', 'option', 'fieldset', 'legend', 'video', 'audio', 'canvas',
  'iframe', 'embed', 'object', 'source', 'track', 'picture', 'map', 'area'
];

htmlElements.forEach(tag => {
  Object.defineProperty(motion, tag, {
    value: createMotionComponent(tag),
    writable: false,
    enumerable: true,
    configurable: false,
  });
});

const AnimatePresence = ({ children, mode, initial, onExitComplete }) => {
  return React.createElement(React.Fragment, null, children);
};
AnimatePresence.displayName = 'AnimatePresence';

const useAnimation = () => ({
  start: jest.fn().mockResolvedValue(undefined),
  stop: jest.fn(),
  set: jest.fn(),
});

const createMotionValue = (initial) => {
  let value = initial;
  const subscribers = [];
  return {
    get: () => value,
    set: (newValue) => { 
      value = newValue;
      subscribers.forEach(fn => fn(value));
    },
    onChange: (callback) => {
      subscribers.push(callback);
      return () => {
        const idx = subscribers.indexOf(callback);
        if (idx > -1) subscribers.splice(idx, 1);
      };
    },
    on: jest.fn(() => () => {}),
    current: initial,
    getPrevious: () => initial,
    getVelocity: () => 0,
    stop: jest.fn(),
    isAnimating: () => false,
    destroy: jest.fn(),
  };
};

const useMotionValue = (initial) => {
  return React.useMemo(() => createMotionValue(initial), []);
};

const useSpring = (source, config) => {
  const isMotionValue = source && typeof source === 'object' && typeof source.get === 'function';
  const initialValue = isMotionValue ? source.get() : source;
  return React.useMemo(() => createMotionValue(initialValue), []);
};

const useTransform = (source, inputRange, outputRange) => {
  const value = source && typeof source === 'object' && typeof source.get === 'function' ? source.get() : 0;
  let transformed = value;
  if (typeof inputRange === 'function') {
    transformed = inputRange(value);
  } else if (Array.isArray(inputRange) && Array.isArray(outputRange)) {
    transformed = outputRange[0] || 0;
  }
  return React.useMemo(() => createMotionValue(transformed), []);
};

const useInView = (ref, options) => true;

const useReducedMotion = () => false;

const useScroll = (options) => ({
  scrollX: createMotionValue(0),
  scrollY: createMotionValue(0),
  scrollXProgress: createMotionValue(0),
  scrollYProgress: createMotionValue(0),
});

const useDragControls = () => ({
  start: jest.fn(),
});

const useAnimationControls = useAnimation;

const MotionConfig = ({ children }) => children;
MotionConfig.displayName = 'MotionConfig';

const LazyMotion = ({ children }) => children;
LazyMotion.displayName = 'LazyMotion';

const domAnimation = {};
const domMax = {};

const m = motion;

module.exports = {
  __esModule: true,
  default: { motion },
  motion,
  m,
  AnimatePresence,
  MotionConfig,
  LazyMotion,
  domAnimation,
  domMax,
  useAnimation,
  useAnimationControls,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  useScroll,
  useDragControls,
};
