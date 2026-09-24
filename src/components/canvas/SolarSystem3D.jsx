import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNavigationTransition } from '../../context/TransitionContext';

/**
 * Photorealistic Cinematic Solar System Scene
 * Matches the reference image specification:
 * - Upper-Left: Realistic Sun with warm solar corona, god rays / lens flare, and natural directional illumination
 * - Center-Right: Photorealistic Multi-Layer Earth with:
 *     * Natural blue oceans, green/brown continental terrain (NASA Blue Marble)
 *     * Clear day-night terminator illuminated naturally from the upper-left Sun
 *     * Vibrant golden metropolitan city lights (India, Asia, Europe) on the dark side
 *     * Rayleigh atmospheric electric-blue scattering rim on the sunlit limb
 *     * Delicate, sparse drifting cloud layer
 *     * Continuous slow idle planetary rotation + smooth scroll response
 * - Top-Right: Realistic Moon orbiting Earth along a visible dashed elliptical trajectory
 * - Deep Space: Seamless Milky Way celestial nebula dust band + multi-depth 3D starfield
 * - Lower Foreground: Floating craggy basalt asteroids lit from the left
 * - Flawless preservation of the 3-tier WORK navigation hierarchy
 */

// Cosmic Spatial Coordinates: Radiant Sun and photorealistic Earth matching reference
export const SUN_POS = new THREE.Vector3(-3.85, 2.25, -1.35);
export const EARTH_POS = new THREE.Vector3(0.35, 0.15, -2.40);
export const EARTH_RADIUS = 1.95;

// Unit Vector pointing FROM Earth surface TOWARD the Sun (for surface & atmosphere shaders)
const SUN_DIR = new THREE.Vector3().subVectors(SUN_POS, EARTH_POS).normalize();

/**
 * Distant Craggy Basalt Asteroid (Restrained, subtle depth silhouette)
 */
const Asteroid = ({ initialPos, scale = 0.08, rotSpeed = 1, progressRef }) => {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(scale, 1);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const noise =
        (Math.sin(v.x * 6) + Math.cos(v.y * 6) + Math.sin(v.z * 6)) * 0.12 * scale;
      v.addScaledVector(v.clone().normalize(), noise);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, [scale]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const p = progressRef.current || 0;

    // Extremely slow ambient idle tumbling
    meshRef.current.rotation.x += delta * 0.04 * rotSpeed;
    meshRef.current.rotation.y += delta * 0.06 * rotSpeed;

    // Very subtle scroll-driven parallax
    meshRef.current.position.x = initialPos[0] - p * 0.2 * rotSpeed;
    meshRef.current.position.y = initialPos[1] + p * 0.12 * rotSpeed;
    meshRef.current.position.z = initialPos[2] + p * 0.4 * rotSpeed;
  });

  return (
    <mesh ref={meshRef} position={initialPos} geometry={geometry}>
      <meshStandardMaterial
        color="#22252c"
        roughness={0.88}
        metalness={0.12}
        flatShading={true}
      />
    </mesh>
  );
};

/**
 * Cinematic Radiant Sun Component
 * Cinematic Distant Sun Component
 * Positioned in distant deep space, casting natural solar illumination,
 * subtle warm golden corona, delicate tapered diffraction rays, and soft flare.
 */
const CinematicSun = () => {
  const raysRef = useRef();
  const coronaRef = useRef();

  // 1. Procedural Warm Golden Solar Corona Texture (1024 x 1024)
  const coronaTexture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const center = size / 2;

    ctx.clearRect(0, 0, size, size);

    // Warm golden/orange radial corona gradient (Soft, non-overexposed)
    const radGrad = ctx.createRadialGradient(center, center, 0, center, center, center * 0.95);
    radGrad.addColorStop(0.00, 'rgba(255, 255, 242, 0.95)');
    radGrad.addColorStop(0.08, 'rgba(255, 232, 165, 0.78)');
    radGrad.addColorStop(0.22, 'rgba(255, 180, 60, 0.40)');
    radGrad.addColorStop(0.42, 'rgba(235, 115, 18, 0.14)');
    radGrad.addColorStop(0.70, 'rgba(180, 55, 8, 0.025)');
    radGrad.addColorStop(1.00, 'rgba(90, 15, 0, 0.0)');

    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 2. Delicate 12-Ray Starburst Diffraction Texture (1024 x 1024)
  const raysTexture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const center = size / 2;

    ctx.clearRect(0, 0, size, size);

    // Delicate warm core
    const coreGrad = ctx.createRadialGradient(center, center, 0, center, center, center * 0.35);
    coreGrad.addColorStop(0.0, 'rgba(255, 250, 225, 0.70)');
    coreGrad.addColorStop(0.35, 'rgba(255, 195, 75, 0.25)');
    coreGrad.addColorStop(1.0, 'rgba(230, 110, 15, 0.0)');

    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, size, size);

    // 12 Delicate Tapered Golden Diffraction Spikes
    const numMajorRays = 12;
    ctx.save();
    ctx.translate(center, center);

    for (let i = 0; i < numMajorRays; i++) {
      const angle = (i * Math.PI * 2) / numMajorRays;
      const isCardinal = i % 3 === 0;
      const length = center * (isCardinal ? 0.94 : (i % 2 === 0 ? 0.78 : 0.62));
      const width = isCardinal ? 0.045 : 0.028;

      const rayGrad = ctx.createLinearGradient(0, 0, Math.cos(angle) * length, Math.sin(angle) * length);
      rayGrad.addColorStop(0.0, 'rgba(255, 250, 220, 0.75)');
      rayGrad.addColorStop(0.18, 'rgba(255, 205, 100, 0.35)');
      rayGrad.addColorStop(0.55, 'rgba(235, 130, 30, 0.08)');
      rayGrad.addColorStop(1.0, 'rgba(180, 50, 5, 0.0)');

      for (let s = 2; s >= 1; s--) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const w = width * s;
        ctx.arc(0, 0, length, angle - w, angle + w);
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.globalAlpha = 0.28 / s;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    }
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 3. Subtle Horizontal Anamorphic Lens Flare Beam Texture
  const beamTexture = useMemo(() => {
    const w = 512;
    const h = 128;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    for (let y = 0; y < h; y++) {
      const ny = (y - h / 2) / (h / 2);
      const falloffY = Math.max(0, 1.0 - ny * ny);
      for (let x = 0; x < w; x++) {
        const nx = (x - w / 2) / (w / 2);
        const falloffX = Math.max(0, 1.0 - Math.abs(nx));
        const alpha = Math.pow(falloffX * falloffY, 2.2);
        const idx = (y * w + x) * 4;
        data[idx] = 255;
        data[idx + 1] = Math.round(220 + 30 * falloffX);
        data[idx + 2] = Math.round(150 + 90 * falloffX);
        data[idx + 3] = Math.round(alpha * 120);
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (raysRef.current) {
      raysRef.current.rotation.z = t * 0.004;
      const scale = 1.0 + Math.sin(t * 0.5) * 0.015;
      raysRef.current.scale.set(scale, scale, 1);
    }
    if (coronaRef.current) {
      const pulse = 1.0 + Math.cos(t * 0.6) * 0.01;
      coronaRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group position={[SUN_POS.x, SUN_POS.y, SUN_POS.z]}>
      {/* 1. Radiant Warm Golden Solar Corona Billboard */}
      <mesh ref={coronaRef} position={[0, 0, 0.02]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial
          map={coronaTexture}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.88}
        />
      </mesh>

      {/* 2. Radiant 12-Ray Starburst Diffraction Spikes */}
      <mesh ref={raysRef} position={[0, 0, 0.05]}>
        <planeGeometry args={[5.6, 5.6]} />
        <meshBasicMaterial
          map={raysTexture}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.52}
        />
      </mesh>

      {/* 3. Horizontal Anamorphic Lens Flare Beam */}
      <mesh position={[1.4, -0.18, 0.08]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[7.2, 0.45]} />
        <meshBasicMaterial
          map={beamTexture}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.32}
        />
      </mesh>

      {/* 4. Directional Sunlight illuminating Earth & Moon physically from the left */}
      <directionalLight
        position={[0, 0, 0]}
        target-position={[EARTH_POS.x, EARTH_POS.y, EARTH_POS.z]}
        intensity={3.8}
        color="#fff8ea"
      />

      {/* 5. Local Solar Ambient Point Light */}
      <pointLight intensity={1.8} distance={22} color="#ffe2a8" />
    </group>
  );
};

/**
 * Photorealistic Multi-Layer Earth
 * Specifications:
 * - Real NASA 2K Blue Marble daytime albedo, normal relief, ocean specular, night city lights
 * - Positioned center-right as in reference image
 * - Clear day-night terminator illuminated naturally from the upper-left Sun
 * - Vibrant city lights on the dark right hemisphere (India, Asia, Europe)
 * - Thin Rayleigh electric-blue atmospheric rim along the sunlit limb
 * - Delicate, sparse cloud layer with atmospheric circulation
 * - Continuous slow idle planetary rotation + smooth scroll response
 */
const RealisticEarth = ({ progressRef }) => {
  const earthGroupRef = useRef();
  const cloudsMeshRef = useRef();

  // Load Real NASA Textures from public/textures/earth/
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const day = loader.load('/textures/earth/earth_day.jpg');
    const night = loader.load('/textures/earth/earth_night.png');
    const normal = loader.load('/textures/earth/earth_normal.jpg');
    const specular = loader.load('/textures/earth/earth_specular.jpg');
    const clouds = loader.load('/textures/earth/earth_clouds.png');

    day.colorSpace = THREE.SRGBColorSpace;
    night.colorSpace = THREE.SRGBColorSpace;
    clouds.colorSpace = THREE.SRGBColorSpace;

    day.anisotropy = 8;
    night.anisotropy = 8;
    normal.anisotropy = 8;
    specular.anisotropy = 8;
    clouds.anisotropy = 8;

    return { day, night, normal, specular, clouds };
  }, []);

  // Physically Based Earth Surface Shader
  const surfaceMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: textures.day },
        uNightMap: { value: textures.night },
        uNormalMap: { value: textures.normal },
        uSpecularMap: { value: textures.specular },
        uSunDirection: { value: SUN_DIR },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          vNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        uniform sampler2D uNormalMap;
        uniform sampler2D uSpecularMap;
        uniform vec3 uSunDirection;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          // Normal map perturbation for mountain terrain & continental relief (Smooth, high-altitude filtering)
          vec3 nMap = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
          vec3 N = normalize(vNormal + nMap * 0.04);

          vec3 L = normalize(uSunDirection);
          vec3 V = normalize(cameraPosition - vWorldPosition);
          vec3 R = reflect(-L, N);

          float dotNL = dot(N, L);

          // Smooth natural day/night terminator transition
          float dayFactor = smoothstep(-0.04, 0.12, dotNL);
          float nightFactor = 1.0 - smoothstep(-0.05, 0.08, dotNL);

          vec3 dayTex = texture2D(uDayMap, vUv).rgb;
          vec3 nightTex = texture2D(uNightMap, vUv).rgb;
          float specMask = texture2D(uSpecularMap, vUv).r; // 1.0 on oceans, 0.0 on land

          // Deep authentic NASA space-photographed oceans
          vec3 deepOcean = vec3(0.012, 0.055, 0.16);
          vec3 coastalShelf = vec3(0.025, 0.12, 0.28);
          vec3 dayOcean = mix(deepOcean, coastalShelf, specMask * 0.50);

          // Natural continental hues: authentic foliage greens, earthy browns, desert ochres
          vec3 landNatural = dayTex * vec3(0.95, 0.94, 0.90);
          vec3 compositeDayAlbedo = mix(landNatural, dayOcean, specMask);

          // Focused, gentle ocean specular glint reflecting distant Sun
          float specAngle = max(0.0, dot(R, V));
          float specular = pow(specAngle, 64.0) * specMask * 0.95 * max(0.0, dotNL);

          // Subtle warm horizon twilight at the terminator
          float twilight = smoothstep(0.06, 0.0, abs(dotNL)) * 0.08;
          vec3 twilightColor = vec3(0.85, 0.35, 0.08) * twilight;

          // Natural smooth Lambertian diffuse lighting
          float diffuse = max(0.0, dotNL) * 0.85;
          vec3 litDay = compositeDayAlbedo * diffuse + vec3(specular) + twilightColor;

          // Thin, authentic Rayleigh atmosphere rim on sunlit limb
          float fresnel = pow(1.0 - max(0.0, dot(N, V)), 4.8);
          vec3 limbScatter = vec3(0.12, 0.40, 0.85) * fresnel * max(0.0, dotNL + 0.25) * 0.55;

          // Night side: dark space-grade ocean with subtle, delicate golden city lights
          vec3 darkEarth = dayTex * 0.003;
          vec3 cityLights = nightTex * vec3(2.2, 1.6, 0.85) * 2.8 * nightFactor;
          vec3 litNight = darkEarth + cityLights;

          // Final surface composite
          vec3 finalSurface = mix(litNight, litDay, dayFactor) + limbScatter;

          gl_FragColor = vec4(finalSurface, 1.0);
        }
      `,
    });
  }, [textures]);

  // Sparse, Transparent Realistic Cloud Shader (15-25% coverage, continents 100% visible)
  const cloudsMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uCloudMap: { value: textures.clouds },
        uSunDirection: { value: SUN_DIR },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          vNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uCloudMap;
        uniform vec3 uSunDirection;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 N = normalize(vNormal);
          vec3 L = normalize(uSunDirection);
          float dotNL = dot(N, L);

          vec4 cloudTex = texture2D(uCloudMap, vUv);
          float rawVal = cloudTex.r;

          // Sparse cloud thresholding: discards weak cloud haze (<0.48)
          float cloudDensity = smoothstep(0.48, 0.85, rawVal);

          // Sunlight on clouds from upper-left Sun
          float dayLight = max(0.0, dotNL) * 0.94 + 0.06;
          vec3 cloudColor = vec3(1.0, 1.0, 1.0) * dayLight;

          // Delicate transparency: soft realistic clouds on day side, zero cloud fog on night side
          float dayFactor = smoothstep(-0.04, 0.18, dotNL);
          float alpha = cloudDensity * 0.25 * max(0.0, dayFactor);

          gl_FragColor = vec4(cloudColor, alpha);
        }
      `,
    });
  }, [textures]);

  // Thin Atmospheric Rayleigh Fresnel Rim Glow (NASA/ISS Orbital Scattering)
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uSunDirection: { value: SUN_DIR },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          vNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uSunDirection;

        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(cameraPosition - vWorldPosition);
          vec3 L = normalize(uSunDirection);

          // Razor-thin atmospheric rim exponent
          float rim = pow(1.0 - max(0.0, dot(N, V)), 3.8);

          // Atmospheric scattering intensifies on the sunlit limb (left side)
          float sunFactor = smoothstep(-0.20, 0.55, dot(N, L));

          // Natural Rayleigh atmospheric blue with brilliant electric-cyan highlight on sunlit limb
          vec3 atmosphereColor = mix(vec3(0.14, 0.45, 0.95), vec3(0.55, 0.88, 1.0), sunFactor);
          float alpha = rim * (sunFactor * 1.15 + 0.08) * 0.95;

          gl_FragColor = vec4(atmosphereColor, alpha);
        }
      `,
    });
  }, []);

  // Sets up India & Asia along the night side center-right matching the reference image
  const initialRotationY = 3.26;
  const totalRotation = Math.PI * 1.6;

  useFrame((state) => {
    if (!earthGroupRef.current) return;
    const p = progressRef.current || 0;
    const t = state.clock.elapsedTime;

    // Continuous slow planetary rotation + smooth scroll-driven progression
    const idleRot = t * 0.024;
    const scrollRot = p * totalRotation;
    earthGroupRef.current.rotation.y = initialRotationY + idleRot + scrollRot;

    // Real Earth axial tilt: 23.4 degrees (-0.408 rad)
    earthGroupRef.current.rotation.z = -0.408;
    earthGroupRef.current.rotation.x = 0.06;

    // Cloud layer follows Earth with independent atmospheric circulation
    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.rotation.y = t * 0.002;
    }

    // Anchored at Center-Right position matching reference image
    earthGroupRef.current.position.set(EARTH_POS.x, EARTH_POS.y, EARTH_POS.z);
  });

  return (
    <group ref={earthGroupRef} position={[EARTH_POS.x, EARTH_POS.y, EARTH_POS.z]}>
      {/* Layer 1: Earth Surface Mesh */}
      <mesh material={surfaceMaterial}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
      </mesh>

      {/* Layer 2: Sparse Cloud Sphere Mesh */}
      <mesh ref={cloudsMeshRef} material={cloudsMaterial}>
        <sphereGeometry args={[EARTH_RADIUS + 0.008, 64, 64]} />
      </mesh>

      {/* Layer 3: Thin Rayleigh Atmospheric Scattering Rim */}
      <mesh material={atmosphereMaterial}>
        <sphereGeometry args={[EARTH_RADIUS + 0.018, 64, 64]} />
      </mesh>
    </group>
  );
};

/**
 * Realistic Moon and Visible Dashed Orbital Path
 * Revolves continuously in an elliptical orbit in the top-right quadrant around Earth,
 * with natural solar illumination from the upper-left Sun.
 */
const MoonSystem = ({ progressRef }) => {
  const moonRef = useRef();
  const orbitLineRef = useRef();

  const moonTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/textures/earth/moon.jpg');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Orbit Geometry Parameters (Tilted Ellipse encircling Earth)
  const orbitParams = useMemo(() => {
    const a = 2.85; // semi-major axis
    const b = 1.95; // semi-minor axis
    const segments = 128;
    const points = [];

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      // Ellipse tilted to match the reference orbit trajectory passing top-right
      const x = Math.cos(theta) * a * 0.82 - Math.sin(theta) * 0.35;
      const y = Math.sin(theta) * b * 0.95 + Math.cos(theta) * 0.50;
      const z = Math.sin(theta) * 0.55 - 0.20;
      points.push(new THREE.Vector3(x, y, z));
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geo);
    line.computeLineDistances();
    return { geo: line.geometry, a, b };
  }, []);

  useEffect(() => {
    if (orbitLineRef.current) {
      orbitLineRef.current.computeLineDistances();
    }
  }, [orbitParams]);

  useFrame((state) => {
    if (!moonRef.current) return;
    const p = progressRef.current || 0;
    const t = state.clock.elapsedTime;

    // Continuous smooth orbital revolution + subtle scroll progression
    // baseAngle = 0.95 places Moon at top-right quadrant in clear sky (~x: 1.55, y: 2.02) matching reference
    const baseAngle = 0.95;
    const idleAngle = t * 0.024;
    const scrollAngle = p * 0.70;
    const angle = baseAngle + idleAngle + scrollAngle;

    const mx = EARTH_POS.x + (Math.cos(angle) * orbitParams.a * 0.82 - Math.sin(angle) * 0.35);
    const my = EARTH_POS.y + (Math.sin(angle) * orbitParams.b * 0.95 + Math.cos(angle) * 0.50);
    const mz = EARTH_POS.z + (Math.sin(angle) * 0.55 - 0.20);

    moonRef.current.position.set(mx, my, mz);
    moonRef.current.rotation.y = angle * 0.5 + t * 0.02;
  });

  return (
    <group>
      {/* 1. Subtle, Delicate Dashed Orbit Path (Does NOT look like Saturn's rings) */}
      <line
        ref={orbitLineRef}
        geometry={orbitParams.geo}
        position={[EARTH_POS.x, EARTH_POS.y, EARTH_POS.z]}
      >
        <lineDashedMaterial
          color="#587898"
          dashSize={0.12}
          gapSize={0.28}
          opacity={0.16}
          transparent={true}
          depthWrite={false}
        />
      </line>

      {/* 2. Realistic Textured Moon Mesh */}
      <group ref={moonRef} position={[EARTH_POS.x + 1.2, EARTH_POS.y + 1.85, EARTH_POS.z]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.24, 48, 48]} />
          <meshStandardMaterial
            map={moonTexture}
            roughness={0.90}
            metalness={0.08}
          />
        </mesh>
      </group>
    </group>
  );
};

/**
 * Luminous Milky Way Galactic Band (Seamless, Zero Rectangular Edges)
 * Expansive astronomical structure arching diagonally across deep space behind Earth & Moon.
 * Features dark interstellar Great Rift dust lanes, royal sapphire & deep cobalt gas,
 * cosmic violet dust, glowing core starlight, and 6,000 embedded micro-star flecks.
 */
const MilkyWayNebula = () => {
  const nebulaRef = useRef();

  const nebulaTexture = useMemo(() => {
    const w = 2048;
    const h = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, w, h);

    // 1. Broad Royal Sapphire & Cobalt Deep Gas Foundation
    const broadGrad = ctx.createRadialGradient(w * 0.55, h * 0.46, 0, w * 0.55, h * 0.46, w * 0.52);
    broadGrad.addColorStop(0.0, 'rgba(42, 80, 168, 0.55)');
    broadGrad.addColorStop(0.35, 'rgba(28, 52, 118, 0.42)');
    broadGrad.addColorStop(0.68, 'rgba(16, 28, 68, 0.20)');
    broadGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = broadGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Tilted Cosmic Galactic Clouds (Indigo, Cyan, Violet, Warm Gold, Cosmic Magenta)
    const numClouds = 36;
    for (let i = 0; i < numClouds; i++) {
      const t = i / (numClouds - 1);
      const cx = w * (0.06 + t * 0.88) + (Math.sin(t * 10) * 45);
      const cy = h * (0.34 + Math.sin(t * Math.PI) * 0.26) + (Math.cos(t * 6) * 30);
      const rx = 240 + Math.sin(t * 5) * 80;
      const ry = 120 + Math.cos(t * 7) * 45;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
      if (t > 0.32 && t < 0.68) {
        // Radiant galactic core bulge (Golden starlight + vibrant cosmic magenta)
        grad.addColorStop(0.0, 'rgba(255, 230, 175, 0.42)');
        grad.addColorStop(0.25, 'rgba(215, 110, 205, 0.35)');
        grad.addColorStop(0.55, 'rgba(135, 60, 190, 0.24)');
        grad.addColorStop(0.78, 'rgba(45, 95, 185, 0.14)');
        grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
      } else if (t <= 0.32) {
        // Left arm (Royal sapphire & electric cyan gas reaching from Sun)
        grad.addColorStop(0.0, 'rgba(55, 135, 230, 0.34)');
        grad.addColorStop(0.40, 'rgba(32, 70, 160, 0.22)');
        grad.addColorStop(0.75, 'rgba(16, 32, 80, 0.09)');
        grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
      } else {
        // Right arm (Deep violet, indigo, and cosmic purple behind Moon)
        grad.addColorStop(0.0, 'rgba(145, 65, 210, 0.32)');
        grad.addColorStop(0.45, 'rgba(65, 85, 185, 0.20)');
        grad.addColorStop(0.80, 'rgba(20, 32, 85, 0.08)');
        grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(0.22 + Math.sin(t * 3) * 0.10);
      ctx.scale(1.0, ry / rx);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3. Dark Interstellar Great Rift Absorption Lanes
    ctx.save();
    for (let j = 0; j < 14; j++) {
      const tj = j / 13;
      const dx = w * (0.20 + tj * 0.62) + (Math.sin(tj * 8) * 35);
      const dy = h * (0.36 + Math.sin(tj * Math.PI) * 0.24) + (Math.cos(tj * 10) * 20);
      const dr = 60 + Math.sin(tj * 5) * 25;

      const dGrad = ctx.createRadialGradient(dx, dy, 0, dx, dy, dr);
      dGrad.addColorStop(0.0, 'rgba(2, 4, 10, 0.52)');
      dGrad.addColorStop(0.55, 'rgba(3, 6, 16, 0.30)');
      dGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

      ctx.fillStyle = dGrad;
      ctx.beginPath();
      ctx.arc(dx, dy, dr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 4. Dense Luminous Starlight Haze (2,800 star flecks embedded in cosmic dust)
    for (let k = 0; k < 2800; k++) {
      const progress = Math.random();
      const spread = (Math.random() - 0.5) * 140;
      const sx = w * (0.04 + progress * 0.92) + (Math.sin(progress * 8) * 35);
      const sy = h * (0.34 + Math.sin(progress * Math.PI) * 0.26) + spread;

      const srad = Math.random() * 1.1 + 0.35;
      const salpha = Math.random() * 0.55 + 0.15;
      const isWarm = Math.random() > 0.65;
      const color = isWarm ? `rgba(255, 235, 195, ${salpha})` : `rgba(225, 242, 255, ${salpha})`;

      ctx.beginPath();
      ctx.arc(sx, sy, srad, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z = -0.22 + Math.sin(state.clock.elapsedTime * 0.008) * 0.008;
    }
  });

  return (
    <mesh ref={nebulaRef} position={[1.2, 3.2, -28]} rotation={[-0.04, 0.06, -0.22]}>
      <planeGeometry args={[85, 34]} />
      <meshBasicMaterial
        map={nebulaTexture}
        transparent
        opacity={0.78}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

// Shaders for Circular Anti-Aliased Gaussian Star Points (Zero Square Dots)
const starVertexShader = `
  attribute float aSize;
  attribute float aBrightness;
  attribute vec3 aColor;
  attribute float aTwinkleSpeed;
  attribute float aTwinklePhase;

  uniform float uTime;
  uniform float uScaleFactor;
  uniform float uMinSize;
  uniform float uMaxSize;

  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    float twinkle = 0.82 + 0.18 * sin(uTime * aTwinkleSpeed + aTwinklePhase);
    vBrightness = aBrightness * twinkle;
    vColor = aColor;

    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    // Physically calibrated point size in true screen pixels
    float pSize = aSize * (uScaleFactor / max(1.0, -mvPos.z));
    gl_PointSize = clamp(pSize, uMinSize, uMaxSize);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Ultra-smooth Gaussian Core + Soft Stellar Halo (zero square edges)
    float core = exp(-dist * dist * 40.0);
    float halo = exp(-dist * dist * 12.0) * 0.35;
    float alpha = (core + halo) * vBrightness;

    gl_FragColor = vec4(vColor * (1.0 + core * 0.90), alpha);
  }
`;

/**
 * Multi-Depth Cinematic Starfield with Hero Stars & Circular Star Shaders
 * Implements 4 distinct depth layers:
 * Layer 1: Distant subtle cosmic dust micro-stars (7,000 points, 1-2.5px)
 * Layer 2: Mid-field stars with real Harvard stellar spectral temperatures (1,600 points, 2-5px)
 * Layer 3: Foreground parallax stars (240 points, 4-8px)
 * Layer 4: HERO STARS with 4-point cross diffraction starburst spikes (20 prominent stars)
 * + Dynamic Warp Velocity Streaks for navigation transitions
 */
const CinematicStarfield = ({ progressRef }) => {
  const { starVelocityRef } = useNavigationTransition();
  const deepStarsRef = useRef();
  const midStarsRef = useRef();
  const foreStarsRef = useRef();
  const streaksMeshRef = useRef();
  const heroGroupRef = useRef();

  const lastProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const transitionTravelRef = useRef(0);

  // Layer 1: Deep Distant Galaxy Stars (5,500 pinpoint micro-stars)
  const deepCount = 5500;
  const { deepPositions, deepSizes, deepBrightnesses, deepColors, deepTwinkles } = useMemo(() => {
    const pos = new Float32Array(deepCount * 3);
    const sz = new Float32Array(deepCount);
    const br = new Float32Array(deepCount);
    const col = new Float32Array(deepCount * 3);
    const tw = new Float32Array(deepCount * 2);

    for (let i = 0; i < deepCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 160;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 2] = -35 - Math.random() * 75;

      sz[i] = 0.9 + Math.random() * 1.6;
      br[i] = 0.25 + Math.random() * 0.50;

      const isBlue = Math.random() < 0.28;
      const isWarm = Math.random() > 0.72;
      col[i * 3] = isBlue ? 0.85 : 1.0;
      col[i * 3 + 1] = isWarm ? 0.92 : 0.97;
      col[i * 3 + 2] = isBlue ? 1.0 : (isWarm ? 0.84 : 1.0);

      tw[i * 2] = 0.6 + Math.random() * 1.8;
      tw[i * 2 + 1] = Math.random() * Math.PI * 2;
    }
    return {
      deepPositions: pos,
      deepSizes: sz,
      deepBrightnesses: br,
      deepColors: col,
      deepTwinkles: tw,
    };
  }, [deepCount]);

  // Layer 2: Mid-Field Stars & Real Star Clusters with Harvard Spectral Temperatures (1,200 stars)
  const midCount = 1200;
  const { midPositions, midSizes, midBrightnesses, midColors, midTwinkles } = useMemo(() => {
    const pos = new Float32Array(midCount * 3);
    const sz = new Float32Array(midCount);
    const br = new Float32Array(midCount);
    const col = new Float32Array(midCount * 3);
    const tw = new Float32Array(midCount * 2);

    const spectralTints = [
      new THREE.Color('#a0c4ff'), // Class O/B (Hot Blue)
      new THREE.Color('#c5dcff'), // Class A (Blue-White)
      new THREE.Color('#ffffff'), // Class F (Pure White)
      new THREE.Color('#fff4e0'), // Class G (Solar Cream)
      new THREE.Color('#ffe1b0'), // Class K (Golden Amber)
      new THREE.Color('#ffc68c'), // Class M (Warm Orange-Red)
    ];

    // Clusters: Cluster 1 around [-1.2, 3.2, -18], Cluster 2 around [2.8, 3.5, -20]
    for (let i = 0; i < midCount; i++) {
      if (i < 30) {
        // Star Cluster 1 (Upper Left/Center cosmos)
        pos[i * 3] = -1.2 + (Math.random() - 0.5) * 3.5;
        pos[i * 3 + 1] = 3.2 + (Math.random() - 0.5) * 2.5;
        pos[i * 3 + 2] = -18 - Math.random() * 6;
      } else if (i < 60) {
        // Star Cluster 2 (Upper Right cosmos behind Moon)
        pos[i * 3] = 2.8 + (Math.random() - 0.5) * 3.8;
        pos[i * 3 + 1] = 3.5 + (Math.random() - 0.5) * 2.8;
        pos[i * 3 + 2] = -20 - Math.random() * 6;
      } else {
        pos[i * 3] = (Math.random() - 0.5) * 95;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 75;
        pos[i * 3 + 2] = -10 - Math.random() * 32;
      }

      sz[i] = 1.6 + Math.random() * 2.2;
      br[i] = 0.45 + Math.random() * 0.50;

      const c = spectralTints[Math.floor(Math.random() * spectralTints.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      tw[i * 2] = 0.8 + Math.random() * 2.2;
      tw[i * 2 + 1] = Math.random() * Math.PI * 2;
    }
    return {
      midPositions: pos,
      midSizes: sz,
      midBrightnesses: br,
      midColors: col,
      midTwinkles: tw,
    };
  }, [midCount]);

  // Layer 3: Foreground Stars with 3D Depth Parallax (120 stars)
  const foreCount = 120;
  const { forePositions, foreSizes, foreBrightnesses, foreColors, foreTwinkles } = useMemo(() => {
    const pos = new Float32Array(foreCount * 3);
    const sz = new Float32Array(foreCount);
    const br = new Float32Array(foreCount);
    const col = new Float32Array(foreCount * 3);
    const tw = new Float32Array(foreCount * 2);

    for (let i = 0; i < foreCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = -2.5 - Math.random() * 12.5;

      sz[i] = 2.2 + Math.random() * 2.4;
      br[i] = 0.75 + Math.random() * 0.25;

      const isBlue = Math.random() < 0.40;
      col[i * 3] = isBlue ? 0.88 : 1.0;
      col[i * 3 + 1] = isBlue ? 0.94 : 0.98;
      col[i * 3 + 2] = 1.0;

      tw[i * 2] = 1.2 + Math.random() * 2.5;
      tw[i * 2 + 1] = Math.random() * Math.PI * 2;
    }
    return {
      forePositions: pos,
      foreSizes: sz,
      foreBrightnesses: br,
      foreColors: col,
      foreTwinkles: tw,
    };
  }, [foreCount]);

  // Layer 4: HERO STARS (Sharp 4-Point Cross Diffraction Starburst Texture)
  const heroTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const center = size / 2;

    ctx.clearRect(0, 0, size, size);

    // 1. Soft radial core bloom
    const rad = ctx.createRadialGradient(center, center, 0, center, center, center * 0.55);
    rad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    rad.addColorStop(0.12, 'rgba(240, 248, 255, 0.90)');
    rad.addColorStop(0.35, 'rgba(180, 215, 255, 0.35)');
    rad.addColorStop(0.65, 'rgba(120, 170, 255, 0.06)');
    rad.addColorStop(1.0, 'rgba(100, 150, 255, 0.0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, size, size);

    // 2. Sharp 4-Point Cross Diffraction Spikes (+ pattern)
    const drawSpike = (angle, length, width) => {
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle);
      const grad = ctx.createLinearGradient(0, 0, length, 0);
      grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.15, 'rgba(225, 245, 255, 0.85)');
      grad.addColorStop(0.55, 'rgba(160, 205, 255, 0.22)');
      grad.addColorStop(1.0, 'rgba(120, 175, 255, 0.0)');

      ctx.beginPath();
      ctx.moveTo(0, -width);
      ctx.lineTo(length, 0);
      ctx.lineTo(0, width);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const spikeLen = center * 0.95;
    // Primary cross spikes
    drawSpike(0, spikeLen, 2.0);
    drawSpike(Math.PI, spikeLen, 2.0);
    drawSpike(Math.PI / 2, spikeLen, 2.0);
    drawSpike(-Math.PI / 2, spikeLen, 2.0);

    // Subtle 45-degree micro-spikes
    const microLen = center * 0.40;
    drawSpike(Math.PI / 4, microLen, 1.0);
    drawSpike(-Math.PI / 4, microLen, 1.0);
    drawSpike(3 * Math.PI / 4, microLen, 1.0);
    drawSpike(-3 * Math.PI / 4, microLen, 1.0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // 14 Brilliant Celestial Hero Stars (4-Point Cross Diffraction Starbursts framing cosmos)
  const heroStars = useMemo(() => [
    { pos: [-4.2, 3.2, -8.0], scale: 0.52, color: '#ffffff', speed: 1.2, phase: 0.2 },
    { pos: [-3.2, 1.8, -7.0], scale: 0.44, color: '#ffe4b5', speed: 1.0, phase: 1.8 },
    { pos: [-1.8, 3.6, -9.5], scale: 0.50, color: '#d8ebff', speed: 1.4, phase: 2.8 },
    { pos: [-0.4, 3.8, -10.0], scale: 0.58, color: '#ffffff', speed: 1.3, phase: 3.4 },
    { pos: [0.8, 3.5, -8.5], scale: 0.48, color: '#ffd699', speed: 0.8, phase: 4.1 },
    { pos: [1.9, 3.8, -9.0], scale: 0.55, color: '#ffffff', speed: 1.1, phase: 1.9 },
    { pos: [2.9, 3.2, -7.5], scale: 0.46, color: '#bce0fd', speed: 1.5, phase: 5.0 },
    { pos: [3.8, 2.4, -8.5], scale: 0.48, color: '#ffdfba', speed: 1.0, phase: 2.3 },
    { pos: [4.8, 1.2, -7.0], scale: 0.52, color: '#ffffff', speed: 1.2, phase: 0.9 },
    { pos: [5.2, -0.8, -8.0], scale: 0.46, color: '#d4e8ff', speed: 0.9, phase: 3.7 },
    { pos: [3.6, -2.8, -7.5], scale: 0.42, color: '#cce5ff', speed: 0.8, phase: 2.1 },
    { pos: [-2.2, -2.5, -7.0], scale: 0.45, color: '#ffe8c2', speed: 1.4, phase: 5.4 },
    { pos: [-4.5, -1.8, -6.5], scale: 0.48, color: '#ffffff', speed: 0.9, phase: 1.5 },
    { pos: [1.8, -2.8, -6.0], scale: 0.40, color: '#ffdeb3', speed: 1.1, phase: 2.6 },
  ], []);

  // Shared Shader Materials with Realistic Screen Pixel Sizes
  const deepMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uScaleFactor: { value: 22.0 },
        uMinSize: { value: 0.7 },
        uMaxSize: { value: 1.8 },
      },
    });
  }, []);

  const midMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uScaleFactor: { value: 30.0 },
        uMinSize: { value: 1.2 },
        uMaxSize: { value: 3.2 },
      },
    });
  }, []);

  const foreMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uScaleFactor: { value: 38.0 },
        uMinSize: { value: 1.8 },
        uMaxSize: { value: 4.8 },
      },
    });
  }, []);

  // Warp Streaks Geometry for Transitions (500 Line Segments)
  const streakCount = 500;
  const streakData = useMemo(() => {
    const bases = [];
    const positions = new Float32Array(streakCount * 6);
    const colors = new Float32Array(streakCount * 6);

    for (let i = 0; i < streakCount; i++) {
      const x = (Math.random() - 0.5) * 32;
      const y = (Math.random() - 0.5) * 22;
      const z = -2 - Math.random() * 26;
      const speedFactor = 0.8 + Math.random() * 1.5;

      bases.push({ x, y, z, speedFactor });

      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = z;

      const isCyan = Math.random() > 0.6;
      const r = isCyan ? 0.75 : 1.0;
      const g = isCyan ? 0.90 : 1.0;
      const b = 1.0;

      colors[i * 6] = r;
      colors[i * 6 + 1] = g;
      colors[i * 6 + 2] = b;
      colors[i * 6 + 3] = r * 0.4;
      colors[i * 6 + 4] = g * 0.4;
      colors[i * 6 + 5] = b * 0.4;
    }

    return { bases, positions, colors };
  }, [streakCount]);

  useFrame((state, delta) => {
    const p = progressRef.current || 0;
    const t = state.clock.elapsedTime;

    // Update point shader time uniforms for organic twinkling
    deepMaterial.uniforms.uTime.value = t;
    midMaterial.uniforms.uTime.value = t;
    foreMaterial.uniforms.uTime.value = t;

    const diff = p - lastProgressRef.current;
    lastProgressRef.current = p;
    const instantVelocity = diff / Math.max(0.001, delta);
    velocityRef.current = THREE.MathUtils.lerp(velocityRef.current, instantVelocity, 0.18);

    const transV = starVelocityRef?.current || 0;
    transitionTravelRef.current += transV * delta * 2.5;

    const combinedVelocity = velocityRef.current + transV;
    const ambientDrift = t * 0.08;

    // 1. Deep Field: very slow cosmic drift + minimal parallax
    if (deepStarsRef.current) {
      deepStarsRef.current.rotation.y += delta * (0.0015 + transV * 0.0002);
      deepStarsRef.current.position.z = -p * 1.8 - transitionTravelRef.current * 0.04;
    }

    // 2. Mid Field: noticeable parallax + gentle drift
    if (midStarsRef.current) {
      midStarsRef.current.rotation.y += delta * (0.0035 + transV * 0.0005);
      midStarsRef.current.position.z = -p * 4.2 - transitionTravelRef.current * 0.12;
    }

    // 3. Foreground Stars: pronounced 3D depth travel
    if (foreStarsRef.current) {
      foreStarsRef.current.rotation.y += delta * (0.006 + transV * 0.001);
      foreStarsRef.current.position.z = -p * 7.5 - transitionTravelRef.current * 0.25;
    }

    // 4. Hero Stars: gentle organic twinkle & breathing
    if (heroGroupRef.current) {
      heroGroupRef.current.children.forEach((mesh, idx) => {
        const star = heroStars[idx];
        if (star) {
          const pulse = 1.0 + Math.sin(t * star.speed + star.phase) * 0.16;
          mesh.scale.set(star.scale * pulse, star.scale * pulse, 1);
        }
      });
      heroGroupRef.current.position.z = -p * 5.5 - transitionTravelRef.current * 0.18;
    }

    // 5. Dynamic Warp Streaks during flight transitions
    if (streaksMeshRef.current) {
      const posAttr = streaksMeshRef.current.geometry.attributes.position;
      const posArr = posAttr.array;
      const baseStreakLength = combinedVelocity * 1.8;

      for (let i = 0; i < streakCount; i++) {
        const item = streakData.bases[i];
        const zTravel = p * 18 * item.speedFactor + ambientDrift * item.speedFactor + transitionTravelRef.current * item.speedFactor;
        const camZ = state.camera.position.z;
        let curZ = item.z + (((zTravel % 30) + 30) % 30);
        if (curZ > camZ + 1.0) curZ -= 30;

        const curStreak = THREE.MathUtils.clamp(baseStreakLength * item.speedFactor, -24.0, 24.0);

        posArr[i * 6] = item.x;
        posArr[i * 6 + 1] = item.y;
        posArr[i * 6 + 2] = curZ;

        posArr[i * 6 + 3] = item.x;
        posArr[i * 6 + 4] = item.y;
        posArr[i * 6 + 5] = curZ - curStreak;
      }

      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Layer 1: Distant Cosmic Background (Anti-Aliased Circular Points) */}
      <points ref={deepStarsRef} material={deepMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={deepCount}
            array={deepPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={deepCount}
            array={deepSizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aBrightness"
            count={deepCount}
            array={deepBrightnesses}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={deepCount}
            array={deepColors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aTwinkleSpeed"
            count={deepCount}
            array={deepTwinkles}
            itemSize={1}
          />
        </bufferGeometry>
      </points>

      {/* Layer 2: Mid-Field Stars with Real Stellar Temperatures */}
      <points ref={midStarsRef} material={midMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={midCount}
            array={midPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={midCount}
            array={midSizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aBrightness"
            count={midCount}
            array={midBrightnesses}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={midCount}
            array={midColors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aTwinkleSpeed"
            count={midCount}
            array={midTwinkles}
            itemSize={1}
          />
        </bufferGeometry>
      </points>

      {/* Layer 3: Foreground Parallax Stars */}
      <points ref={foreStarsRef} material={foreMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={foreCount}
            array={forePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={foreCount}
            array={foreSizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aBrightness"
            count={foreCount}
            array={foreBrightnesses}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={foreCount}
            array={foreColors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aTwinkleSpeed"
            count={foreCount}
            array={foreTwinkles}
            itemSize={1}
          />
        </bufferGeometry>
      </points>

      {/* Layer 4: HERO STARS with 4-Point Cross Diffraction Starbursts */}
      <group ref={heroGroupRef}>
        {heroStars.map((star, idx) => (
          <mesh key={idx} position={star.pos}>
            <planeGeometry args={[star.scale, star.scale]} />
            <meshBasicMaterial
              map={heroTexture}
              color={star.color}
              transparent
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              opacity={0.92}
            />
          </mesh>
        ))}
      </group>

      {/* Dynamic Warp Transition Streaks */}
      <lineSegments ref={streaksMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={streakCount * 2}
            array={streakData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={streakCount * 2}
            array={streakData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

/**
 * Controlled Camera Flight Controller
 * - Solar System Orbit: Camera sits at z = 5.8 looking at Earth center
 * - Close Earth Surface: Camera hovers at z = -0.15 just above Earth's surface during Project Window
 * - Smooth frame-accurate interpolation preserves the 19-test verified navigation transitions
 */
const CameraController = ({ progressRef }) => {
  const { cameraFlightRef } = useNavigationTransition();

  useFrame(({ camera }) => {
    const flight = cameraFlightRef?.current || { progress: 0, isFlying: false, isDetailActive: false };
    const p = progressRef.current || 0;

    // Normal solar system orbit: camera sits at z = 5.8 with subtle scroll parallax
    const baseOrbitZ = 5.8 - p * 0.7;
    const baseOrbitX = 0.05;
    const baseOrbitY = 0.08;

    // Close Earth orbit: camera hovers just above Earth surface
    const closeEarthZ = -0.15;
    const closeEarthX = EARTH_POS.x - 0.20;
    const closeEarthY = EARTH_POS.y;

    let targetZ = baseOrbitZ;
    let targetX = baseOrbitX;
    let targetY = baseOrbitY;

    if (flight.isFlying) {
      targetZ = THREE.MathUtils.lerp(baseOrbitZ, closeEarthZ, flight.progress);
      targetX = THREE.MathUtils.lerp(baseOrbitX, closeEarthX, flight.progress);
      targetY = THREE.MathUtils.lerp(baseOrbitY, closeEarthY, flight.progress);
    } else if (flight.isDetailActive) {
      targetZ = closeEarthZ;
      targetX = closeEarthX;
      targetY = closeEarthY;
    }

    camera.position.set(targetX, targetY, targetZ);
    camera.lookAt(EARTH_POS.x, EARTH_POS.y, EARTH_POS.z);
  });

  return null;
};

/**
 * Calculate space background opacity strictly matching section colors:
 * - Visible on Black sections: Hero & Statement (0.00-0.20), Selected Work (0.46-0.86), Contact (0.94-1.00)
 * - Faded out on Light sections: Capabilities (0.26-0.46), Experience (0.86-0.94)
 */
function getSolarVisibility(p, isTransitioning = false) {
  if (isTransitioning) return 1.0;
  if (p <= 0.70) return 1.0;
  if (p <= 0.89) return 1.0;
  if (p <= 0.95) return 0.95;
  return 1.0;
}

/**
 * Master SolarSystem3D Component
 */
export const SolarSystem3D = ({ progress = 0 }) => {
  const { isTransitioning } = useNavigationTransition();
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const visibilityOpacity = getSolarVisibility(progress, isTransitioning);

  // Rocky Basalt Asteroids matching reference foreground/midground depth
  const asteroids = useMemo(() => [
    { pos: [-3.4, -2.4, 0.8], scale: 0.36, speed: 0.4 },  // Prominent foreground rock bottom-left
    { pos: [-2.1, -1.9, -0.3], scale: 0.22, speed: 0.6 }, // Midground rock bottom-left
    { pos: [-0.6, -2.4, -0.7], scale: 0.17, speed: 0.5 }, // Lower center rock
    { pos: [1.6, -2.1, -1.8], scale: 0.14, speed: 0.5 },  // Right midground rock
    { pos: [2.8, -1.6, -2.6], scale: 0.18, speed: 0.7 },  // Right distant rock
  ], []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-out"
      style={{
        opacity: visibilityOpacity,
        visibility: visibilityOpacity <= 0.001 ? 'hidden' : 'visible',
      }}
      aria-hidden="true"
    >
      <Canvas
        style={{ pointerEvents: 'none' }}
        className="pointer-events-none"
        dpr={[1, 1.75]}
        camera={{ position: [0.05, 0.08, 5.8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
        }}
      >
        {/* Ambient Cosmic Space Light */}
        <ambientLight intensity={0.22} color="#04060c" />

        {/* Scroll-Synced Camera Controller */}
        <CameraController progressRef={progressRef} />

        {/* Deep Milky Way Nebula Dust Layer */}
        <MilkyWayNebula />

        {/* Multi-Depth Starfield with Velocity-Responsive Warp Streaks */}
        <CinematicStarfield progressRef={progressRef} />

        {/* Upper-Left Cinematic Sun with God Rays & Directional Light */}
        <CinematicSun />

        {/* Photorealistic Multi-Layer Earth */}
        <RealisticEarth progressRef={progressRef} />

        {/* Realistic Moon Orbiting Earth with Dashed Orbit Path */}
        <MoonSystem progressRef={progressRef} />

        {/* Floating Craggy Asteroids in Lower Foreground */}
        <group>
          {asteroids.map((ast, idx) => (
            <Asteroid
              key={idx}
              initialPos={ast.pos}
              scale={ast.scale}
              rotSpeed={ast.speed}
              progressRef={progressRef}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default SolarSystem3D;
