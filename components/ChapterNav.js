import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { chapters } from '../app/data/story';

export default function ChapterNav({ activeChapter, onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <motion.nav
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed left-7 top-1/2 z-50 hidden xl:flex flex-col gap-4 items-center"
      style={{ transform: 'translateY(-50%)' }}
    >
      {/* Top connecting line */}
      <div className="w-px h-12 opacity-20" style={{ background: 'linear-gradient(to bottom, transparent, #c9a84c)' }} />

      {chapters.map((ch, i) => {
        const isActive = activeChapter === ch.id;
        const isHovered = hoveredId === ch.id;
        return (
          <motion.button
            key={ch.id}
            onHoverStart={() => setHoveredId(ch.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => onSelect(ch.id)}
            className="relative flex items-center gap-3"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            {/* Dot */}
            <motion.div
              className="rounded-full flex-shrink-0"
              animate={{
                width: isActive ? 10 : isHovered ? 7 : 5,
                height: isActive ? 10 : isHovered ? 7 : 5,
                background: isActive ? '#c9a84c' : isHovered ? 'rgba(201,168,76,0.6)' : 'rgba(22,15,4,0.25)',
                boxShadow: isActive ? '0 0 10px rgba(201,168,76,0.55)' : isHovered ? '0 0 6px rgba(201,168,76,0.25)' : 'none',
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Tooltip label */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.div
                  initial={{ opacity: 0, x: -6, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -6, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-5 whitespace-nowrap pointer-events-none"
                  style={{
                    background: 'rgba(16,11,2,0.92)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '2px',
                    padding: '5px 10px',
                  }}
                >
                  <span className="chapter-number" style={{ color: isActive ? '#c9a84c' : 'rgba(245,234,216,0.6)', fontSize: '0.55rem', letterSpacing: '0.14em' }}>
                    {String(i + 1).padStart(2, '0')} · {ch.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}

      {/* Bottom connecting line */}
      <div className="w-px h-12 opacity-20" style={{ background: 'linear-gradient(to top, transparent, #c9a84c)' }} />
    </motion.nav>
  );
}
