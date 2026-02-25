import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 180, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 180, damping: 28 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const over = (e) => {
      if (e.target.closest('button, a, [role="button"]')) setIsHovering(true);
    };
    const out = () => setIsHovering(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 56 : 38,
          height: isHovering ? 56 : 38,
          border: `1px solid rgba(201,168,76,${isHovering ? 0.55 : 0.3})`,
          boxShadow: isHovering
            ? '0 0 20px rgba(201,168,76,0.2), inset 0 0 20px rgba(201,168,76,0.05)'
            : '0 0 12px rgba(201,168,76,0.1)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 5 : 4,
          height: isHovering ? 5 : 4,
          background: isHovering ? '#e8c96d' : '#c9a84c',
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 8px rgba(201,168,76,0.6)',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
        }}
      />
      {/* Ambient glow under cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 280,
          height: 280,
          background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
