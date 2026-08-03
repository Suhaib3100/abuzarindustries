"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Float,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { makeWoodTexture, makeEndGrainTexture, endFaceMask, SPECIES } from "./wood";

/* ------------------------------------------------------------------ */
/*  A single plank — flat-sawn faces + real end-grain on the sawn ends */
/* ------------------------------------------------------------------ */
function Plank({
  args,
  axis,
  position,
  rotation,
  color,
  longTex,
  endTex,
}: {
  args: [number, number, number];
  axis: "x" | "z";
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  longTex: THREE.Texture;
  endTex: THREE.Texture;
}) {
  const mask = useMemo(() => endFaceMask(axis), [axis]);
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      {mask.map((isEnd, i) => (
        <meshStandardMaterial
          key={i}
          attach={`material-${i}`}
          map={isEnd ? endTex : longTex}
          bumpMap={isEnd ? endTex : longTex}
          bumpScale={isEnd ? 0.035 : 0.014}
          color={color}
          roughness={0.58}
          metalness={0}
          envMapIntensity={0.55}
        />
      ))}
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticker-stacked timber pile — cross-hatched so ends face outward   */
/* ------------------------------------------------------------------ */
function TimberStack({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  // one texture per species so teak / white teak / neem read distinctly
  const longTex = useMemo(() => SPECIES.map((s) => makeWoodTexture(s.key.length + 7, s.key)), []);
  const endTex = useMemo(() => SPECIES.map((_, i) => makeEndGrainTexture(11 + i * 13)), []);

  const planks = useMemo(() => {
    const L = 3.0;
    const W = 0.56;
    const T = 0.22;
    const GX = 0.06;
    const GY = 0.02;
    const LAYERS = 4;
    const PER = 4;
    const spanW = PER * W + (PER - 1) * GX;
    const totalH = LAYERS * T + (LAYERS - 1) * GY;

    let seed = 1;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const out: {
      key: string;
      args: [number, number, number];
      axis: "x" | "z";
      pos: [number, number, number];
      rot: [number, number, number];
      color: string;
      long: THREE.Texture;
      end: THREE.Texture;
    }[] = [];

    for (let l = 0; l < LAYERS; l++) {
      const odd = l % 2 === 1;
      const y = -totalH / 2 + T / 2 + l * (T + GY);
      for (let p = 0; p < PER; p++) {
        const offset = -spanW / 2 + W / 2 + p * (W + GX);
        const spIdx = (l + p) % SPECIES.length;
        const sp = SPECIES[spIdx];
        const ti = spIdx; // texture matches the plank's species
        // small imperfections so it reads like a real hand-made stack
        const jx = (rnd() - 0.5) * 0.05;
        const jz = (rnd() - 0.5) * 0.05;
        const jr = (rnd() - 0.5) * 0.03;
        const pos: [number, number, number] = odd
          ? [offset + jx, y, jz]
          : [jx, y, offset + jz];
        out.push({
          key: `${l}-${p}`,
          args: odd ? [W, T, L] : [L, T, W],
          axis: odd ? "z" : "x",
          pos,
          rot: [0, jr, 0],
          color: sp.color,
          long: longTex[ti],
          end: endTex[ti],
        });
      }
    }
    return out;
  }, [longTex, endTex]);

  useFrame((state) => {
    if (!group.current || reduced) return;
    const px = state.pointer.x;
    const py = state.pointer.y;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.06 - py * 0.1, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, px * 0.04, 0.05);
  });

  return (
    <group ref={group}>
      {planks.map((pk) => (
        <Plank
          key={pk.key}
          args={pk.args}
          axis={pk.axis}
          position={pk.pos}
          rotation={pk.rot}
          color={pk.color}
          longTex={pk.long}
          endTex={pk.end}
        />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene — studio environment (reflections) + key light (shadows)    */
/* ------------------------------------------------------------------ */
export default function TimberScene() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [4.6, 3.0, 5.6], fov: 40 }}
      style={{ background: "transparent" }}
    >
      {/* Image-based lighting built from light rectangles — no network fetch */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.2} color="#fff2df" position={[0, 5, -3]} scale={[10, 5, 1]} />
        <Lightformer form="rect" intensity={1.1} color="#e6efff" position={[-5, 2, 3]} scale={[5, 6, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#ffe0b0" position={[5, 3, 2]} scale={[5, 5, 1]} rotation={[0, -Math.PI / 3, 0]} />
        <Lightformer form="ring" intensity={1.6} color="#ffd9a0" position={[3, 4, -4]} scale={2.5} />
      </Environment>

      <ambientLight intensity={0.18} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.7}
        color="#fff1da"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
      />

      <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.12} floatIntensity={reduced ? 0 : 0.35}>
        <TimberStack reduced={reduced} />
      </Float>

      <ContactShadows position={[0, -0.72, 0]} opacity={0.6} scale={11} blur={2.4} far={4} color="#2a1c0e" />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.85}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
