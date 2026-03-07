import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

const NODE_COUNT = 120;
const SPHERE_RADIUS = 4;
const FLOAT_RANGE = 8;
const CONNECTION_DISTANCE = 3.5;

function generateNodes(count) {
  const nodes = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const sphereX = Math.cos(theta) * radiusAtY * SPHERE_RADIUS;
    const sphereY = y * SPHERE_RADIUS;
    const sphereZ = Math.sin(theta) * radiusAtY * SPHERE_RADIUS;

    const initialX = (Math.random() - 0.5) * FLOAT_RANGE * 2;
    const initialY = (Math.random() - 0.5) * FLOAT_RANGE * 2;
    const initialZ = (Math.random() - 0.5) * FLOAT_RANGE;

    nodes.push({
      id: i,
      initialPosition: new THREE.Vector3(initialX, initialY, initialZ),
      spherePosition: new THREE.Vector3(sphereX, sphereY, sphereZ),
      currentPosition: new THREE.Vector3(initialX, initialY, initialZ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01
      ),
      connections: [],
    });
  }

  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dist = nodes[i].spherePosition.distanceTo(nodes[j].spherePosition);
      if (dist < CONNECTION_DISTANCE) {
        nodes[i].connections.push(j);
        nodes[j].connections.push(i);
      }
    }
  }

  return nodes;
}

function NetworkNodes({ progress, nodeCount, isDarkMode }) {
  const meshRef = useRef(null);
  const linesRef = useRef(null);
  const glowRef = useRef(null);
  const { clock } = useThree();

  const nodes = useMemo(() => generateNodes(nodeCount), [nodeCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const linePositions = useMemo(() => {
    let totalConnections = 0;
    nodes.forEach((node) => {
      node.connections.forEach((connId) => {
        if (connId > node.id) totalConnections++;
      });
    });
    return new Float32Array(totalConnections * 6);
  }, [nodes]);

  const lineColors = useMemo(() => {
    let totalConnections = 0;
    nodes.forEach((node) => {
      node.connections.forEach((connId) => {
        if (connId > node.id) totalConnections++;
      });
    });
    return new Float32Array(totalConnections * 6);
  }, [nodes]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    return geometry;
  }, [linePositions, lineColors]);

  // Theme colors
  const primaryHue = 0.35; // Green hue (around 126 degrees)
  const secondaryHue = 0.46; // Teal hue (around 165 degrees)

  useFrame(() => {
    if (!meshRef.current || !linesRef.current || !glowRef.current) return;

    const time = clock.getElapsedTime();

    const stage1End = 0.25;
    const stage2End = 0.5;
    const stage3End = 0.75;

    const visibleNodes = Math.floor(
      nodeCount *
        Math.min(
          1,
          progress < stage1End
            ? 0.4 + (progress / stage1End) * 0.3
            : progress < stage2End
              ? 0.7 + ((progress - stage1End) / (stage2End - stage1End)) * 0.3
              : 1
        )
    );

    const sphereBlend = progress < stage3End ? 0 : (progress - stage3End) / (1 - stage3End);

    const connectionOpacity =
      progress < stage1End
        ? (progress / stage1End) * 0.4
        : progress < stage2End
          ? 0.4 + ((progress - stage1End) / (stage2End - stage1End)) * 0.4
          : progress < stage3End
            ? 0.8
            : 0.8 + ((progress - stage3End) / (1 - stage3End)) * 0.2;

    nodes.forEach((node, i) => {
      if (i >= visibleNodes) {
        dummy.position.set(0, 0, -1000);
        dummy.scale.set(0, 0, 0);
      } else {
        const floatX = Math.sin(time * 0.5 + i * 0.1) * 0.15 * (1 - sphereBlend);
        const floatY = Math.cos(time * 0.3 + i * 0.15) * 0.15 * (1 - sphereBlend);
        const floatZ = Math.sin(time * 0.4 + i * 0.2) * 0.08 * (1 - sphereBlend);

        const targetX =
          node.initialPosition.x * (1 - sphereBlend) + node.spherePosition.x * sphereBlend;
        const targetY =
          node.initialPosition.y * (1 - sphereBlend) + node.spherePosition.y * sphereBlend;
        const targetZ =
          node.initialPosition.z * (1 - sphereBlend) + node.spherePosition.z * sphereBlend;

        node.currentPosition.x = targetX + floatX;
        node.currentPosition.y = targetY + floatY;
        node.currentPosition.z = targetZ + floatZ;

        if (sphereBlend > 0.5) {
          const rotationSpeed = 0.15;
          const angle = time * rotationSpeed;
          const x = node.currentPosition.x;
          const z = node.currentPosition.z;
          node.currentPosition.x = x * Math.cos(angle) - z * Math.sin(angle);
          node.currentPosition.z = x * Math.sin(angle) + z * Math.cos(angle);
        }

        dummy.position.copy(node.currentPosition);

        const pulse = 1 + Math.sin(time * 2 + i * 0.5) * 0.2;
        const baseScale = 0.08 + sphereBlend * 0.03;
        dummy.scale.setScalar(baseScale * pulse);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const glowScale = dummy.scale.x * 4;
      dummy.scale.setScalar(i < visibleNodes ? glowScale : 0);
      dummy.updateMatrix();
      glowRef.current.setMatrixAt(i, dummy.matrix);

      // Animate between primary green and secondary teal
      const hueShift = Math.sin(time + i * 0.1) * 0.05;
      const hue = primaryHue + hueShift;
      const saturation = isDarkMode ? 0.7 : 0.6;
      const lightness = isDarkMode ? 0.55 : 0.45;
      
      tempColor.setHSL(hue, saturation, lightness);
      meshRef.current.setColorAt(i, tempColor);

      // Glow with slightly different shade
      tempColor.setHSL(hue, saturation + 0.1, lightness + 0.1);
      glowRef.current.setColorAt(i, tempColor);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceColor.needsUpdate = true;

    let lineIndex = 0;
    const positions = lineGeometry.attributes.position.array;
    const colors = lineGeometry.attributes.color.array;

    nodes.forEach((node, i) => {
      if (i >= visibleNodes) return;

      node.connections.forEach((connId) => {
        if (connId > node.id && connId < visibleNodes) {
          const connNode = nodes[connId];

          positions[lineIndex * 6] = node.currentPosition.x;
          positions[lineIndex * 6 + 1] = node.currentPosition.y;
          positions[lineIndex * 6 + 2] = node.currentPosition.z;
          positions[lineIndex * 6 + 3] = connNode.currentPosition.x;
          positions[lineIndex * 6 + 4] = connNode.currentPosition.y;
          positions[lineIndex * 6 + 5] = connNode.currentPosition.z;

          const pulse = (Math.sin(time * 3 + lineIndex * 0.2) + 1) * 0.5;
          const intensity = connectionOpacity * (0.5 + pulse * 0.5);

          // Use theme colors for lines
          const lineHue = primaryHue + Math.sin(time * 0.5 + lineIndex * 0.1) * 0.08;
          const lineSaturation = isDarkMode ? 0.6 : 0.5;
          const lineLightness = isDarkMode ? intensity * 0.5 : intensity * 0.4;
          
          tempColor.setHSL(lineHue, lineSaturation, lineLightness);
          colors[lineIndex * 6] = tempColor.r;
          colors[lineIndex * 6 + 1] = tempColor.g;
          colors[lineIndex * 6 + 2] = tempColor.b;
          colors[lineIndex * 6 + 3] = tempColor.r;
          colors[lineIndex * 6 + 4] = tempColor.g;
          colors[lineIndex * 6 + 5] = tempColor.b;

          lineIndex++;
        }
      });
    });

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={glowRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0.25} />
      </instancedMesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial vertexColors />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

function DataPulses({ progress, isDarkMode }) {
  const pulsesRef = useRef(null);
  const { clock } = useThree();

  const pulseCount = 80;

  const { positions, velocities, lifetimes } = useMemo(() => {
    const pos = new Float32Array(pulseCount * 3);
    const vel = new Float32Array(pulseCount * 3);
    const life = new Float32Array(pulseCount);

    for (let i = 0; i < pulseCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      vel[i * 3] = (Math.random() - 0.5) * 0.05;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      life[i] = Math.random();
    }

    return { positions: pos, velocities: vel, lifetimes: life };
  }, []);

  useFrame(() => {
    if (!pulsesRef.current || progress < 0.1) return;

    const time = clock.getElapsedTime();
    const posAttr = pulsesRef.current.geometry.attributes.position;
    const posArray = posAttr.array;

    for (let i = 0; i < pulseCount; i++) {
      lifetimes[i] += 0.01;
      if (lifetimes[i] > 1) {
        lifetimes[i] = 0;
        posArray[i * 3] = (Math.random() - 0.5) * 12;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 12;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }

      posArray[i * 3] += velocities[i * 3] + Math.sin(time + i) * 0.01;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(time + i) * 0.01;
      posArray[i * 3 + 2] += velocities[i * 3 + 2];
    }

    posAttr.needsUpdate = true;
  });

  const pulseOpacity = progress < 0.1 ? 0 : Math.min(1, (progress - 0.1) * 2);
  // Theme-aware pulse color
  const pulseColor = isDarkMode ? "#80cbc4" : "#00897b"; // secondary.light / secondary.main

  return (
    <points ref={pulsesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={pulseCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={pulseColor}
        transparent
        opacity={pulseOpacity * 0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ progress, isDarkMode }) {
  // Theme-aware lighting colors
  const primaryLight = isDarkMode ? "#66bb6a" : "#2e7d32"; // primary.main
  const secondaryLight = isDarkMode ? "#80cbc4" : "#00897b"; // secondary
  const accentLight = isDarkMode ? "#a5d6a7" : "#4caf50"; // primary.light

  // Theme-aware fog
  const fogColor = isDarkMode ? "#0a1a0f" : "#e8f5e9";

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.6 : 0.8} />
      <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 2 : 1.5} color={primaryLight} />
      <pointLight position={[-10, -10, -10]} intensity={isDarkMode ? 1 : 0.8} color={secondaryLight} />
      <pointLight position={[0, 0, 5]} intensity={isDarkMode ? 1.5 : 1} color={accentLight} />

      <NetworkNodes progress={progress} nodeCount={NODE_COUNT} isDarkMode={isDarkMode} />
      <DataPulses progress={progress} isDarkMode={isDarkMode} />

      <fog attach="fog" args={[fogColor, 10, 25]} />
    </>
  );
}

const SphereNetworkScene = ({ progress, isDarkMode = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene progress={progress} isDarkMode={isDarkMode} />
      </Canvas>
    </motion.div>
  );
};

export default SphereNetworkScene;
