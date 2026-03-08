import { motion } from "framer-motion";
import {
  LoaderRoot,
  NetworkContainer,
  CenterNode,
  OrbitRing,
  OrbitNode,
  ProgressBar,
  ProgressFill,
} from "./Loader.styles";

const orbitNodes = [
  { angle: 0, distance: 40, delay: 0 },
  { angle: 72, distance: 40, delay: 0.2 },
  { angle: 144, distance: 40, delay: 0.4 },
  { angle: 216, distance: 40, delay: 0.6 },
  { angle: 288, distance: 40, delay: 0.8 },
];

const Loader = () => {
  return (
    <LoaderRoot role="status" aria-label="Loading content" aria-live="polite">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <NetworkContainer>
          <OrbitRing size={80} duration={3} delay={0} />
          <OrbitRing size={100} duration={4} delay={0.5} />
          <OrbitRing size={120} duration={5} delay={1} />

          {orbitNodes.map((node, index) => (
            <OrbitNode key={index} angle={node.angle} distance={node.distance} delay={node.delay} />
          ))}

          <CenterNode />
        </NetworkContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 200 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ProgressBar>
          <ProgressFill />
        </ProgressBar>
      </motion.div>
    </LoaderRoot>
  );
};

export default Loader;
