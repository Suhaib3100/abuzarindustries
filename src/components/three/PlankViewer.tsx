"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Float,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { makeWoodTexture, makeEndGrainTexture, endFaceMask, speciesColor } from "./wood";

/* A single plank whose box proportions follow the real dimensions. */
function Plank({
  length,
  width,
  thickness,
  species,
  autoRotate,
}: {
  length: number;
  width: number;
  thickness: number;
  species: string;
  autoRotate: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const longTex = useMemo(() => makeWoodTexture(species.length + 7, species), [species]);
  const endTex = useMemo(() => makeEndGrainTexture(species.length + 19), [species]);
  const mask = useMemo(() => endFaceMask("x"), []);

  // normalise: longest real dimension → 3.6 scene units, aspect preserved
  const args = useMemo<[number, number, number]>(() => {
    const dims = [length, width, thickness].map((v) => Math.max(v, 0.0001));
    const scale = 3.6 / Math.max(...dims);
    const L = Math.max(dims[0] * scale, 0.05);
    const W = Math.max(dims[1] * scale, 0.05);
    const T = Math.max(dims[2] * scale, 0.05);
    return [L, T, W]; // length→X (ends on ±X), thickness→Y, width→Z
  }, [length, width, thickness]);

  useFrame((_, delta) => {
    if (ref.current && autoRotate) ref.current.rotation.y += delta * 0.4;
  });

  const color = speciesColor(species);

  return (
    <group ref={ref} rotation={[0.12, 0.5, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={args} />
        {mask.map((isEnd, i) => (
          <meshStandardMaterial
            key={i}
            attach={`material-${i}`}
            map={isEnd ? endTex : longTex}
            bumpMap={isEnd ? endTex : longTex}
            bumpScale={isEnd ? 0.035 : 0.014}
            color={color}
            roughness={0.56}
            metalness={0}
            envMapIntensity={0.55}
          />
        ))}
      </mesh>
    </group>
  );
}

export default function PlankViewer({
  length,
  width,
  thickness,
  species,
  autoRotate = true,
}: {
  length: number;
  width: number;
  thickness: number;
  species: string;
  autoRotate?: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [3.4, 2.2, 4.2], fov: 42 }}
      style={{ background: "transparent" }}
    >
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.2} color="#fff2df" position={[0, 5, -3]} scale={[9, 5, 1]} />
        <Lightformer form="rect" intensity={1.1} color="#e6efff" position={[-4, 2, 3]} scale={[5, 5, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#ffd9a0" position={[3, 4, -3]} scale={2.2} />
      </Environment>

      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.7}
        color="#fff1da"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
      />

      <Float speed={1} rotationIntensity={0.08} floatIntensity={0.3}>
        <Plank
          length={length}
          width={width}
          thickness={thickness}
          species={species}
          autoRotate={autoRotate}
        />
      </Float>

      <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={10} blur={2.4} far={4} color="#2a1c0e" />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}
