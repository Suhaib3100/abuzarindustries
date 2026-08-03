"use client";

import { motion } from "framer-motion";

/* ── Real Karnataka outline from official GeoJSON data ── */
const KA_PATH =
  "M183.6,10.7 L187.5,12.3 L185.0,15.0 L190.5,16.7 L192.8,15.1 L197.9,16.0 L195.8,18.7 L197.6,22.7 L194.8,23.7 L200.5,26.6 L192.9,32.3 L195.7,34.2 L189.7,36.1 L189.1,39.8 L202.4,42.7 L192.9,45.1 L193.8,47.0 L189.8,47.0 L189.9,50.3 L185.9,52.2 L184.8,54.2 L190.3,56.1 L192.3,59.4 L189.8,62.8 L190.8,67.2 L189.0,67.1 L188.2,69.4 L190.5,70.7 L187.9,71.2 L190.7,71.8 L190.4,73.9 L186.5,74.5 L187.8,76.2 L185.2,77.3 L178.2,77.9 L183.9,80.9 L197.2,82.3 L197.3,83.9 L191.7,85.3 L192.8,96.6 L175.2,95.6 L166.8,99.6 L169.0,99.9 L168.1,103.2 L172.3,105.5 L167.2,106.4 L167.0,110.9 L164.0,111.2 L168.9,117.0 L174.4,119.2 L172.1,120.4 L174.3,122.5 L169.8,128.0 L153.5,125.6 L152.9,129.0 L158.4,130.1 L157.5,134.7 L153.8,135.5 L152.8,141.8 L158.6,146.2 L164.2,145.8 L162.5,148.5 L159.3,148.8 L159.1,150.3 L162.9,152.1 L162.6,154.1 L171.2,154.9 L173.7,150.6 L180.6,150.9 L180.5,152.7 L184.8,153.0 L186.1,155.6 L187.8,154.9 L186.2,151.1 L192.3,153.3 L192.4,157.0 L184.2,157.9 L186.7,158.6 L183.0,161.4 L188.6,163.2 L186.8,166.2 L184.2,165.7 L184.5,162.8 L182.4,161.3 L173.5,162.4 L172.1,160.7 L166.9,160.3 L166.6,156.3 L159.8,156.7 L164.2,159.9 L161.9,161.4 L167.5,164.7 L163.9,168.5 L165.2,171.0 L174.5,170.5 L172.2,167.3 L175.1,165.0 L175.2,166.9 L178.1,165.7 L179.0,167.6 L188.3,167.8 L187.5,169.0 L190.1,169.1 L189.4,172.6 L191.1,173.2 L193.5,172.8 L193.4,170.9 L198.8,171.5 L200.3,169.8 L203.5,171.3 L203.7,169.3 L209.9,166.9 L209.4,164.4 L214.4,165.7 L218.0,163.9 L216.1,168.3 L221.3,166.0 L225.2,167.6 L223.6,171.3 L224.7,172.9 L222.2,173.5 L223.4,174.6 L227.4,174.2 L229.5,175.3 L228.9,177.3 L240.0,176.6 L238.1,184.2 L240.4,185.0 L238.7,185.4 L247.0,187.6 L248.8,186.1 L250.0,187.4 L248.0,189.9 L249.6,191.0 L243.3,195.2 L243.6,197.6 L241.7,197.4 L243.4,201.3 L237.6,198.8 L235.3,201.5 L232.0,201.5 L230.9,204.8 L221.6,201.7 L219.2,203.3 L216.2,201.5 L214.3,202.5 L215.0,200.5 L209.8,201.1 L207.6,202.0 L208.4,203.6 L204.7,207.8 L197.2,208.0 L196.1,211.4 L198.0,213.4 L196.4,214.5 L199.0,214.2 L198.8,216.5 L194.6,220.8 L190.7,221.5 L190.5,223.6 L204.5,224.8 L206.7,226.9 L201.2,232.5 L191.5,232.8 L188.0,239.0 L178.5,237.2 L171.1,238.6 L171.4,240.3 L164.1,237.3 L159.9,238.1 L156.4,242.6 L156.9,245.0 L142.8,243.9 L139.1,240.8 L134.0,241.9 L133.9,238.9 L130.0,239.7 L121.9,235.1 L118.3,235.8 L117.8,231.5 L105.5,232.5 L101.1,227.9 L96.9,228.3 L89.4,225.3 L84.4,220.7 L81.0,220.7 L81.1,217.9 L78.1,216.6 L80.7,213.5 L76.8,214.9 L73.6,212.8 L73.1,211.4 L76.1,210.5 L73.4,209.6 L70.5,211.3 L69.3,209.1 L66.2,208.8 L66.6,207.4 L61.1,207.9 L61.2,206.1 L57.7,205.5 L58.1,203.5 L51.4,204.7 L48.0,198.7 L47.3,192.9 L42.0,184.4 L44.1,186.8 L37.5,166.7 L38.9,167.3 L31.9,161.4 L24.0,145.0 L25.8,143.5 L23.1,142.7 L24.1,144.3 L21.6,144.4 L18.4,136.9 L16.0,137.6 L10.0,134.7 L12.0,133.5 L10.6,131.3 L19.5,129.1 L22.3,121.7 L18.8,119.2 L23.3,118.0 L18.8,111.3 L20.4,110.0 L18.7,105.7 L10.2,105.1 L17.2,101.2 L18.4,102.7 L24.6,101.6 L25.9,99.2 L23.5,98.9 L25.1,97.6 L27.1,98.9 L26.0,97.2 L30.2,92.5 L24.7,92.0 L31.6,90.4 L32.0,86.0 L22.7,84.5 L22.5,80.9 L24.8,80.4 L21.1,76.7 L18.6,76.9 L20.3,76.7 L19.8,75.3 L21.9,76.7 L22.7,74.9 L25.9,75.8 L30.6,71.3 L34.6,72.2 L35.8,75.0 L42.0,73.2 L40.4,72.1 L42.4,69.4 L54.5,67.6 L53.8,64.6 L56.8,62.9 L55.3,61.7 L63.4,61.5 L70.1,65.2 L73.7,64.0 L74.0,61.2 L83.6,60.2 L84.9,61.6 L89.1,60.9 L89.4,59.4 L94.7,61.1 L94.5,58.5 L93.0,58.5 L94.9,56.5 L92.2,53.9 L93.9,50.8 L89.5,46.6 L91.5,46.3 L92.6,43.4 L101.5,47.1 L102.7,45.3 L106.0,45.4 L108.4,48.6 L118.6,47.2 L121.5,49.5 L121.3,47.8 L125.1,46.9 L132.5,49.0 L133.9,47.1 L129.9,44.9 L132.1,42.8 L130.5,42.8 L131.7,41.9 L129.8,39.4 L138.3,37.1 L140.1,33.8 L142.7,33.7 L142.7,35.7 L145.0,33.5 L149.0,36.5 L150.4,33.0 L154.2,31.5 L151.7,29.0 L155.0,30.0 L161.1,28.4 L161.2,24.4 L163.9,22.2 L161.4,21.6 L163.1,19.2 L171.4,20.3 L170.7,18.9 L176.6,16.1 L178.4,11.6 L183.6,10.7 Z";

// Real city coordinates projected into the SVG viewBox using the same transform
const CITIES = [
  { label: "Belagavi",     x: 31.8,  y: 99.0 },
  { label: "Hubballi",     x: 65.0,  y: 115.7 },
  { label: "Ballari",      x: 161.3, y: 122.9 },
  { label: "Davangere",    x: 107.8, y: 146.4 },
  { label: "Chitradurga",  x: 133.5, y: 154.3, hub: true },
  { label: "Shivamogga",   x: 89.1,  y: 164.6 },
  { label: "Udupi",        x: 44.6,  y: 184.7 },
  { label: "Mangaluru",    x: 51.1,  y: 199.4 },
  { label: "Bengaluru",    x: 197.2, y: 197.3 },
  { label: "Mysuru",       x: 146.9, y: 220.2 },
];

// Routes from Chitradurga hub to each destination — slight bezier arc
const ROUTES = CITIES.filter((c) => !c.hub).map((c) => {
  const cx = (133.5 + c.x) / 2;
  const cy = Math.min(154.3, c.y) - 10;
  return {
    city: c.label,
    d: `M133.5,154.3 Q${cx},${cy} ${c.x},${c.y}`,
  };
});

/* Tiny truck icon */
function TruckIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect x="8" y="1.5" width="6" height="6" rx="1" fill="#5A3D24" />
      <rect x="1" y="3" width="7" height="6" rx="0.5" fill="#B9772E" />
      <circle cx="4" cy="10" r="2" fill="#241B12" />
      <circle cx="11" cy="10" r="2" fill="#241B12" />
    </svg>
  );
}

export default function DeliveryMap() {
  return (
    <div className="relative w-full h-full min-h-[240px] flex items-center justify-center overflow-hidden">
      {/* Warm brand gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F3ECE0] via-[#FAF6EF] to-[#EBD8BD]" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle, #5A3D24 0.5px, transparent 0.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Decorative blur blobs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-ochre/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-gold/10 blur-3xl" />

      <svg
        viewBox="0 0 260 255"
        className="relative w-full h-full z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B9772E" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#C79A4B" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C79A4B" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#B9772E" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#B9772E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Karnataka outline ── */}
        <path
          d={KA_PATH}
          fill="rgba(90,61,36,0.04)"
          stroke="rgba(90,61,36,0.25)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Secondary subtle inner glow */}
        <path
          d={KA_PATH}
          fill="none"
          stroke="rgba(185,119,46,0.08)"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* ── Hub glow ring ── */}
        <circle cx="133.5" cy="154.3" r="60" fill="url(#hubGlow)" />

        {/* ── Animated route lines ── */}
        {ROUTES.map((r) => (
          <g key={r.city}>
            {/* Static dashed route */}
            <path
              d={r.d}
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="3 4"
              opacity="0.5"
            />
            {/* Travelling glow dot */}
            <motion.circle
              r="2.5"
              fill="#B9772E"
              filter="url(#glow)"
              style={{ offsetPath: `path("${r.d}")` }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: 4 + CITIES.indexOf(CITIES.find((c) => c.label === r.city)!) * 0.8,
                repeat: Infinity,
                ease: "linear",
                delay: CITIES.indexOf(CITIES.find((c) => c.label === r.city)!) * 0.3,
              }}
            />
            {/* Trailing smaller dot */}
            <motion.circle
              r="1.2"
              fill="#C79A4B"
              style={{ offsetPath: `path("${r.d}")` }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: 4 + CITIES.indexOf(CITIES.find((c) => c.label === r.city)!) * 0.8,
                repeat: Infinity,
                ease: "linear",
                delay: CITIES.indexOf(CITIES.find((c) => c.label === r.city)!) * 0.3 + 0.25,
              }}
            />
          </g>
        ))}

        {/* ── Zonal range rings ── */}
        {[28, 50, 75].map((r, i) => (
          <circle
            key={i}
            cx="133.5"
            cy="154.3"
            r={r}
            fill="none"
            stroke="#B9772E"
            strokeWidth="0.5"
            opacity={0.12 - i * 0.03}
            strokeDasharray={[3, 6, 8][i]}
          />
        ))}

        {/* ── Destination city markers ── */}
        {CITIES.filter((c) => !c.hub).map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r="3.5" fill="#5A3D24" opacity={0.7} />
            <circle cx={c.x} cy={c.y} r="5" fill="#B9772E" opacity={0.12} />
            <text
              x={c.x}
              y={c.y + 13}
              textAnchor="middle"
              fontSize="5"
              fill="#6E5E4E"
              fontFamily="system-ui"
              fontWeight="600"
              letterSpacing="0.02em"
            >
              {c.label}
            </text>
          </g>
        ))}

        {/* ── Chitradurga HUB ── */}
        {/* Pulsing outer rings */}
        <motion.circle
          cx="133.5"
          cy="154.3"
          r="14"
          fill="none"
          stroke="#B9772E"
          strokeWidth="2"
          opacity={0.4}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.6, 0.08, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="133.5"
          cy="154.3"
          r="14"
          fill="none"
          stroke="#C79A4B"
          strokeWidth="1"
          opacity={0.2}
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: [0.8, 1.7, 0.8], opacity: [0.4, 0.04, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Hub dot */}
        <circle cx="133.5" cy="154.3" r="6" fill="#B9772E" filter="url(#softGlow)" />
        <circle cx="133.5" cy="154.3" r="3.5" fill="#5A3D24" />
        {/* Hub label */}
        <text
          x="133.5"
          y={154.3 - 18}
          textAnchor="middle"
          fontSize="6"
          fill="#5A3D24"
          fontFamily="system-ui"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          CHITRADURGA
        </text>
        {/* Headquarters badge */}
        <rect x={133.5 - 24} y={154.3 + 10} width="48" height="8" rx="4" fill="#5A3D24" opacity={0.85} />
        <text
          x="133.5"
          y={154.3 + 16}
          textAnchor="middle"
          fontSize="4.5"
          fill="#FAF6EF"
          fontFamily="system-ui"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          DELIVERY HUB
        </text>

        {/* ── Animated truck on longest route ── */}
        <motion.g
          style={{ offsetPath: `path("${ROUTES[6].d}")` }}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <TruckIcon />
        </motion.g>
      </svg>

      {/* Legend strip at bottom */}
      <div className="absolute bottom-1.5 left-0 right-0 flex items-center justify-center gap-4 z-20 px-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-ochre" />
          <span className="text-[8px] text-ink-soft/70 font-medium">Hub</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-px border-t border-dashed border-ochre/50" />
          <span className="text-[8px] text-ink-soft/70 font-medium">Coverage</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-[10px]"
          >
            🚛
          </motion.span>
          <span className="text-[8px] text-ink-soft/70 font-medium">Live tracking</span>
        </div>
      </div>
    </div>
  );
}
