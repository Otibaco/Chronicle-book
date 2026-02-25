import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// The morphing paths cycle through 3 organic shapes
const morphPaths = [
  "M24,4 C30,4 44,12 44,24 C44,36 36,44 24,44 C12,44 4,36 4,24 C4,12 18,4 24,4 Z",
  "M24,3 C32,5 45,14 43,26 C41,38 32,46 20,44 C8,42 3,32 5,20 C7,8 18,1 24,3 Z",
  "M26,4 C34,3 46,13 44,25 C42,37 31,46 19,43 C7,40 2,29 5,17 C8,5 18,5 26,4 Z",
];

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [morphIndex, setMorphIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const circumference = 2 * Math.PI * 20; // r=20
  const dashOffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cycle morphing every 2.5s
  useEffect(() => {
    const t = setInterval(() => setMorphIndex(i => (i + 1) % morphPaths.length), 2500);
    return () => clearInterval(t);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollUp}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 group"
          style={{
            width: 52,
            height: 52,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'none', // we have custom cursor
          }}
        >
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Progress ring */}
            <circle
              cx="24" cy="24" r="20"
              stroke="rgba(201,168,76,0.15)"
              strokeWidth="1"
              fill="none"
            />
            <motion.circle
              cx="24" cy="24" r="20"
              stroke="#c9a84c"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: dashOffset }}
              transform="rotate(-90 24 24)"
            />

            {/* Morphing blob background */}
            <motion.path
              d={morphPaths[morphIndex]}
              fill="rgba(22,15,4,0.88)"
              animate={{ d: morphPaths[morphIndex] }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />

            {/* Inner gold ring */}
            <motion.path
              d={morphPaths[(morphIndex + 1) % morphPaths.length]}
              fill="none"
              stroke="rgba(201,168,76,0.25)"
              strokeWidth="0.5"
              animate={{ d: morphPaths[(morphIndex + 1) % morphPaths.length] }}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.1 }}
            />

            {/* Arrow up */}
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <line x1="24" y1="29" x2="24" y2="17" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round"/>
              <polyline points="18,22 24,16 30,22" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.g>

            {/* Hover shimmer dot */}
            <motion.circle
              cx="24" cy="24" r="16"
              fill="none"
              stroke="rgba(232,201,109,0)"
              strokeWidth="1"
              className="group-hover:stroke-[rgba(232,201,109,0.2)] transition-all duration-500"
            />
          </svg>

          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, x: 4 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap chapter-number px-3 py-1.5 rounded pointer-events-none"
            style={{
              background: 'rgba(22,15,4,0.92)',
              color: 'rgba(201,168,76,0.8)',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              border: '1px solid rgba(201,168,76,0.15)',
              opacity: 0,
            }}
          >
            BACK TO TOP
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
