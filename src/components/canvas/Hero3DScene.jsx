import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Organic Sculptural Rock Mesh
 */
const SculpturalRock = ({ progressRef }) => {
  const meshRef = useRef();

  // Create an organic sculpted form with perturbed vertices
  const geometry = useMemo(() => {
    const geo = new THREE.DodecahedronGeometry(1.5, 2);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // Subtle organic noise perturbation
      const noise = Math.sin(v.x * 2.5) * Math.cos(v.y * 2.5) * Math.sin(v.z * 2.5) * 0.18;
      v.addScaledVector(v.clone().normalize(), noise);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = progressRef.current || 0;
    const idleTime = state.clock.elapsedTime * 0.25;

    // Scroll-driven position & rotation waypoints
    // At p=0: anchored back-left behind typography [-2.8, -0.4, -2.5]
    // At p=0.2: shifts laterally and rotates
    const targetX = -2.6 - p * 2.2 + Math.sin(idleTime) * 0.04;
    const targetY = -0.3 + p * 0.8 + Math.cos(idleTime) * 0.04;
    const targetZ = -2.5 - p * 1.5;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);

    meshRef.current.rotation.y = 0.3 + p * 1.6 + idleTime * 0.05;
    meshRef.current.rotation.x = 0.2 + p * 0.9;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#101010"
        roughness={0.85}
        metalness={0.25}
        flatShading={false}
      />
    </mesh>
  );
};

/**
 * Translucent / Glossy Obsidian Sphere
 */
const GlossySphere = ({ progressRef }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = progressRef.current || 0;
    const idleTime = state.clock.elapsedTime * 0.3;

    // At p=0: positioned midground right [2.4, -0.9, -1.2]
    // At p=0.2: glides upward and deepens
    const targetX = 2.4 - p * 1.2 + Math.cos(idleTime) * 0.03;
    const targetY = -0.9 + p * 1.4 + Math.sin(idleTime) * 0.03;
    const targetZ = -1.2 + p * 0.8;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);

    meshRef.current.rotation.y = idleTime * 0.2 + p;
  });

  return (
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[0.75, 48, 48]} />
      <meshPhysicalMaterial
        color="#151515"
        roughness={0.12}
        metalness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        reflectivity={0.9}
      />
    </mesh>
  );
};

/**
 * Thin Minimal Orbital Ring
 */
const OrbitalRing = ({ progressRef }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = progressRef.current || 0;
    const idleTime = state.clock.elapsedTime * 0.15;

    // At p=0: centered-right framing the portrait [1.8, 0.2, -1.8]
    // At p=0.2: tilts dynamically with scroll
    const targetRotX = 1.15 + p * 1.8;
    const targetRotY = 0.35 + p * 1.2 + idleTime * 0.05;
    const targetRotZ = p * 0.8;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.08);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.08);

    const targetY = 0.2 - p * 0.9;
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
  });

  return (
    <mesh ref={meshRef} position={[1.8, 0.2, -1.8]}>
      <torusGeometry args={[2.5, 0.014, 16, 120]} />
      <meshStandardMaterial
        color="#1a1a1a"
        roughness={0.4}
        metalness={0.8}
        emissive="#080808"
      />
    </mesh>
  );
};

/**
 * Flowing Acid-Lime Ribbon Curve
 */
const LimeRibbon = ({ progressRef }) => {
  const meshRef = useRef();

  // Create an elegant flowing 3D ribbon curve
  const tubeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.5, 2.2, -3.5),
      new THREE.Vector3(-1.2, 0.8, -2.0),
      new THREE.Vector3(0.8, -0.6, -1.2),
      new THREE.Vector3(2.5, -1.8, -2.5),
      new THREE.Vector3(3.8, 0.4, -4.0),
    ]);
    return new THREE.TubeGeometry(curve, 80, 0.032, 12, false);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const p = progressRef.current || 0;

    // Gentle scroll slide along depth
    const targetZ = -0.5 + p * 1.8;
    const targetRotZ = p * 0.45;

    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.08);
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeometry}>
      <meshStandardMaterial
        color="#CCFF00"
        emissive="#2d3d00"
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
};

/**
 * Subtle Atmospheric Motes (Minimal, Restrained)
 */
const AtmosphericMotes = () => {
  const count = 35;
  const points = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#CCFF00"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
};

/**
 * Scroll-Driven Camera Controller
 */
const CameraRig = ({ progressRef }) => {
  useFrame(({ camera }) => {
    const p = progressRef.current || 0;

    // Waypoints:
    // p=0.00 -> camera at [0, 0, 5.5], lookAt [0, 0, 0]
    // p=0.15 -> camera glides forward [0.35, -0.15, 4.4]
    // p=0.30 -> camera depth shifts to [0.65, -0.3, 3.6]
    const targetX = p * 1.8;
    const targetY = -p * 0.7;
    const targetZ = 5.5 - p * 5.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    camera.lookAt(p * 0.6, 0, 0);
  });

  return null;
};

/**
 * Master Hero 3D Scene Component
 * Cleanly active during the Hero & Statement phases (progress < 0.35)
 */
export const Hero3DScene = ({ progress = 0 }) => {
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // The 3D scene fades smoothly as the acid-lime transition takes over at 0.20-0.32
  const sceneOpacity = Math.max(0, Math.min(1, 1 - (progress - 0.18) / 0.14));

  // If scrolled well past the hero/statement, don't render to save GPU
  if (progress > 0.38) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
      style={{ opacity: sceneOpacity }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Controlled Studio & Acid-Lime Lighting */}
        <ambientLight intensity={0.5} color="#080808" />
        {/* Soft Neutral Key Light */}
        <directionalLight position={[-4, 5, 4]} intensity={1.2} color="#ffffff" />
        {/* Signature Acid-Lime Rim Light from bottom-right */}
        <directionalLight position={[4, -3, -2]} intensity={2.4} color="#CCFF00" />
        {/* Soft Fill Light */}
        <pointLight position={[0, -2, 2]} intensity={0.6} color="#222222" />

        {/* Camera Rig driven by Scroll */}
        <CameraRig progressRef={progressRef} />

        {/* 3D Depth Layer Objects */}
        <group>
          <SculpturalRock progressRef={progressRef} />
          <GlossySphere progressRef={progressRef} />
          <OrbitalRing progressRef={progressRef} />
          <LimeRibbon progressRef={progressRef} />
          <AtmosphericMotes />
        </group>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
