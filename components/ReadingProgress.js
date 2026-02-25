import { useScroll, useSpring, motion, useTransform } from 'framer-motion';

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 32, restDelta: 0.001 });
  // Percentage for aria/display
  const pct = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 origin-left"
        style={{
          scaleX,
          height: '2px',
          background: 'linear-gradient(to right, #8b1a1a 0%, #c9a84c 60%, #e8c96d 100%)',
          transformOrigin: '0%',
          boxShadow: '0 0 12px rgba(201,168,76,0.35)',
        }}
      />
      {/* Glowing tip */}
      <motion.div
        className="fixed top-0 z-50 w-2 h-2 rounded-full"
        style={{
          left: useTransform(scaleX, v => `calc(${v * 100}% - 4px)`),
          top: '-3px',
          background: '#e8c96d',
          boxShadow: '0 0 8px rgba(232,201,109,0.8)',
          opacity: useTransform(scrollYProgress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]),
        }}
      />
    </>
  );
}
