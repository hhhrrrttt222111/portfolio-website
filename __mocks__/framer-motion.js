// Mock for framer-motion to prevent issues with MUI styled() in tests
const React = require('react');

const createMotionComponent = (tag) => {
  const Component = React.forwardRef((props, ref) => {
    const { children, initial, animate, exit, variants, whileHover, whileTap, transition, style, ...rest } = props;
    return React.createElement(tag, { ...rest, ref, style }, children);
  });
  Component.displayName = `motion.${tag}`;
  Component.__emotion_styles = [];
  return Component;
};

const createFromComponent = (BaseComponent) => {
  const Component = React.forwardRef((props, ref) => {
    const { initial, animate, exit, variants, whileHover, whileTap, transition, ...rest } = props;
    return React.createElement(BaseComponent, { ...rest, ref });
  });
  Component.displayName = `motion(${BaseComponent.displayName || 'Component'})`;
  return Component;
};

const motion = new Proxy({
  create: createFromComponent,
}, {
  get: (target, prop) => {
    if (prop === 'create') {
      return createFromComponent;
    }
    if (typeof prop === 'string') {
      return createMotionComponent(prop);
    }
    return undefined;
  }
});

const AnimatePresence = ({ children }) => React.createElement(React.Fragment, null, children);

const useAnimation = () => ({
  start: jest.fn(),
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

const useTransform = (source, transformer) => {
  const value = source && typeof source === 'object' && typeof source.get === 'function' ? source.get() : 0;
  const transformed = typeof transformer === 'function' ? transformer(value) : value;
  return React.useMemo(() => createMotionValue(transformed), []);
};

const useInView = () => true;

module.exports = {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
};
