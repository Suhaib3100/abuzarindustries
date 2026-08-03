import * as THREE from "three";

/** Species → base material colour (multiplies the neutral grain texture). */
export const SPECIES_COLOR: Record<string, string> = {
  "Teak Wood": "#8a5a2e",
  Teak: "#8a5a2e",
  "White Teak": "#c4ad80",
  "Neem Wood": "#9c854f",
  Neem: "#9c854f",
};

export const SPECIES = [
  { key: "Teak Wood", color: "#8a5a2e" },
  { key: "White Teak", color: "#ccb789" },
  { key: "Neem Wood", color: "#9c854f" },
] as const;

export function speciesColor(name: string): string {
  return SPECIES_COLOR[name] ?? "#9a7448";
}

/* ------------------------------------------------------------------ */
/*  Per-species grain character                                        */
/*  Teak: dense dark grain, high contrast.                             */
/*  White teak: pale base, sparse fine grain, cloudy white patches.    */
/*  Neem: medium, warm-tan streaky.                                    */
/* ------------------------------------------------------------------ */
export interface WoodProfile {
  base: string; // canvas base fill (material colour still multiplies this)
  bands: number; // broad tonal bands
  streaks: number; // fine fibre streak count
  streakDark: number; // 0..1 how dark the streaks are
  cathedral: number; // strength of the arch figure (0 = none)
  patches: number; // pale cloudy blotches (white teak)
}

const PROFILES: Record<string, WoodProfile> = {
  "Teak Wood": { base: "#c3a373", bands: 7, streaks: 320, streakDark: 1, cathedral: 1, patches: 0 },
  "White Teak": { base: "#cdba90", bands: 4, streaks: 150, streakDark: 0.55, cathedral: 0.4, patches: 4 },
  "Neem Wood": { base: "#cbb488", bands: 5, streaks: 200, streakDark: 0.7, cathedral: 0.6, patches: 0 },
};

export function woodProfile(name: string): WoodProfile {
  return PROFILES[name] ?? PROFILES["Neem Wood"];
}

function prng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function makeCanvas(size = 512) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  return { c, ctx: c.getContext("2d")!, size };
}

function toTexture(c: HTMLCanvasElement, srgb: boolean): THREE.Texture {
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/* ------------------------------------------------------------------ */
/*  Flat-sawn face — long fibre streaks + cathedral figure            */
/* ------------------------------------------------------------------ */
export function makeWoodTexture(seed: number, species?: string): THREE.Texture {
  const { c, ctx, size } = makeCanvas();
  const rnd = prng(seed);
  const p = species ? woodProfile(species) : PROFILES["Teak Wood"];

  // species base tone (material colour still multiplies this)
  ctx.fillStyle = p.base;
  ctx.fillRect(0, 0, size, size);

  // broad low-frequency tonal bands along the grain
  for (let i = 0; i < p.bands; i++) {
    const y = rnd() * size;
    const h = 30 + rnd() * 90;
    const dark = rnd() > 0.5;
    const g = ctx.createLinearGradient(0, y - h, 0, y + h);
    const a = (0.06 + rnd() * 0.08) * (dark ? p.streakDark : 1);
    const col = dark ? `rgba(70,45,22,${a})` : `rgba(232,214,178,${a})`;
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.5, col);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, y - h, size, h * 2);
  }

  // pale cloudy patches — the "white patch" character of white teak
  for (let i = 0; i < p.patches; i++) {
    const bx = rnd() * size;
    const by = rnd() * size;
    const br = 40 + rnd() * 120;
    const g = ctx.createRadialGradient(bx, by, 4, bx, by, br);
    const a = 0.14 + rnd() * 0.16;
    g.addColorStop(0, `rgba(230,218,192,${a})`);
    g.addColorStop(1, "rgba(230,218,192,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(bx, by, br, br * (0.5 + rnd() * 0.4), rnd() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // cathedral figure — nested arches near the centre
  if (p.cathedral > 0) {
    const cx = size * (0.3 + rnd() * 0.4);
    for (let a = 0; a < 5; a++) {
      const spread = 26 + a * 20 + rnd() * 8;
      ctx.strokeStyle = `rgba(75,48,24,${(0.18 - a * 0.02) * p.cathedral})`;
      ctx.lineWidth = 1 + rnd() * 1.5;
      ctx.beginPath();
      for (let x = -20; x <= size + 20; x += 10) {
        const dx = x - cx;
        const y = size * 0.55 - Math.exp(-(dx * dx) / (2 * spread * spread)) * (90 + a * 26);
        x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  // fine fibre streaks running the length (U axis)
  for (let i = 0; i < p.streaks; i++) {
    const y = rnd() * size;
    const shade = 55 + rnd() * 60;
    const a = (0.05 + rnd() * 0.2) * p.streakDark;
    ctx.strokeStyle = `rgba(${shade},${shade * 0.62},${shade * 0.34},${a})`;
    ctx.lineWidth = 0.4 + rnd() * 1.4;
    ctx.beginPath();
    const amp = 2 + rnd() * 6;
    for (let x = 0; x <= size; x += 22) {
      const yy = y + Math.sin((x / size) * Math.PI * (1 + rnd() * 0.3)) * amp;
      x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }

  return toTexture(c, true);
}

/* ------------------------------------------------------------------ */
/*  Sawn END face — concentric growth rings + radial checks           */
/* ------------------------------------------------------------------ */
export function makeEndGrainTexture(seed: number): THREE.Texture {
  const { c, ctx, size } = makeCanvas();
  const rnd = prng(seed);

  ctx.fillStyle = "#c1a06d";
  ctx.fillRect(0, 0, size, size);

  // pith offset toward one edge (rings are eccentric on a real board end)
  const px = size * (0.3 + rnd() * 0.4);
  const py = size * (0.2 + rnd() * 0.3);
  const squash = 0.72 + rnd() * 0.22; // rings are slightly elliptical
  const tilt = (rnd() - 0.5) * 0.8;

  // subtle radial darkening around the pith
  const bg = ctx.createRadialGradient(px, py, 4, px, py, size * 0.9);
  bg.addColorStop(0, "rgba(90,58,28,0.28)");
  bg.addColorStop(0.4, "rgba(120,86,44,0.10)");
  bg.addColorStop(1, "rgba(190,158,110,0.0)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  // growth rings
  let r = 5;
  let gap = 6;
  while (r < size * 1.15) {
    const wobble = 1 + (rnd() - 0.5) * 0.08;
    const dark = 0.28 + rnd() * 0.22;
    ctx.strokeStyle = `rgba(78,50,24,${dark})`;
    ctx.lineWidth = 0.8 + rnd() * 2.2;
    ctx.beginPath();
    ctx.ellipse(px, py, r * wobble, r * squash * wobble, tilt, 0, Math.PI * 2);
    ctx.stroke();
    // lighter earlywood band just outside each latewood line
    ctx.strokeStyle = `rgba(226,198,150,${0.12 + rnd() * 0.1})`;
    ctx.lineWidth = 0.6 + rnd() * 1.4;
    ctx.beginPath();
    ctx.ellipse(px, py, r * wobble + 1.5, (r + 1.5) * squash * wobble, tilt, 0, Math.PI * 2);
    ctx.stroke();
    r += gap;
    gap *= 1.03 + rnd() * 0.02;
  }

  // radial checks / drying cracks from the pith
  const checks = 2 + Math.floor(rnd() * 3);
  for (let i = 0; i < checks; i++) {
    const ang = rnd() * Math.PI * 2;
    const len = size * (0.2 + rnd() * 0.5);
    ctx.strokeStyle = `rgba(50,30,14,${0.28 + rnd() * 0.2})`;
    ctx.lineWidth = 0.8 + rnd() * 1.6;
    ctx.beginPath();
    ctx.moveTo(px, py);
    let cxp = px;
    let cyp = py;
    const steps = 8;
    for (let s = 1; s <= steps; s++) {
      const t = (s / steps) * len;
      cxp = px + Math.cos(ang) * t + (rnd() - 0.5) * 6;
      cyp = py + Math.sin(ang) * t + (rnd() - 0.5) * 6;
      ctx.lineTo(cxp, cyp);
    }
    ctx.stroke();
  }

  // dark pith centre
  ctx.fillStyle = "rgba(60,38,18,0.5)";
  ctx.beginPath();
  ctx.arc(px, py, 2.5, 0, Math.PI * 2);
  ctx.fill();

  return toTexture(c, true);
}

/**
 * BoxGeometry face order is [+x, -x, +y, -y, +z, -z].
 * Returns which of the six faces are the sawn ENDS for a given long-axis.
 */
export function endFaceMask(axis: "x" | "z"): boolean[] {
  return axis === "x"
    ? [true, true, false, false, false, false]
    : [false, false, false, false, true, true];
}
