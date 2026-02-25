import { motion } from 'framer-motion';

// SVG morphing organic blobs — slow, ambient, cinematic
const paths = {
  crimson: [
    "M 200,80 C 280,60 340,120 360,200 C 380,280 340,360 260,380 C 180,400 100,360 80,280 C 60,200 120,100 200,80 Z",
    "M 210,70 C 300,50 360,130 370,210 C 380,290 320,370 240,385 C 160,400 90,350 75,270 C 60,190 130,90 210,70 Z",
    "M 190,90 C 270,65 350,115 365,195 C 380,275 335,365 255,382 C 175,399 95,358 78,278 C 61,198 115,110 190,90 Z",
  ],
  gold: [
    "M 200,60 C 300,40 380,110 390,200 C 400,290 340,380 250,395 C 160,410 70,350 60,260 C 50,170 110,80 200,60 Z",
    "M 215,55 C 315,38 385,115 388,205 C 391,295 328,385 238,398 C 148,411 62,348 58,258 C 54,168 118,72 215,55 Z",
    "M 195,65 C 295,45 375,118 385,208 C 395,298 335,382 245,396 C 155,410 68,348 62,258 C 56,168 108,83 195,65 Z",
  ],
  parchment: [
    "M 200,70 C 290,45 365,115 375,205 C 385,295 325,375 235,390 C 145,405 65,345 60,255 C 55,165 115,90 200,70 Z",
    "M 205,62 C 295,40 370,112 378,202 C 386,292 328,372 238,388 C 148,404 68,342 62,252 C 56,162 118,82 205,62 Z",
    "M 198,75 C 288,50 362,118 372,208 C 382,298 322,378 232,393 C 142,408 62,348 58,258 C 54,168 112,96 198,75 Z",
  ],
};

const colors = {
  crimson: { fill: 'rgba(139,26,26,0.055)', stroke: 'rgba(139,26,26,0.12)' },
  gold: { fill: 'rgba(201,168,76,0.055)', stroke: 'rgba(201,168,76,0.14)' },
  parchment: { fill: 'rgba(154,122,48,0.04)', stroke: 'rgba(154,122,48,0.1)' },
};

export default function MorphBlob({
  variant = 'gold',
  size = 420,
  style = {},
  className = '',
  speed = 12,
}) {
  const pts = paths[variant] || paths.gold;
  const col = colors[variant] || colors.gold;

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <svg
        viewBox="0 0 450 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.path
          d={pts[0]}
          fill={col.fill}
          stroke={col.stroke}
          strokeWidth="1"
          animate={{ d: [pts[0], pts[1], pts[2], pts[0]] }}
          transition={{ duration: speed, repeat: Infinity, ease: 'easeInOut', times: [0, 0.33, 0.67, 1] }}
        />
        {/* Inner ring */}
        <motion.path
          d={pts[2]}
          fill="none"
          stroke={col.stroke}
          strokeWidth="0.5"
          strokeDasharray="4 8"
          opacity={0.4}
          animate={{ d: [pts[2], pts[0], pts[1], pts[2]] }}
          transition={{ duration: speed * 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}
