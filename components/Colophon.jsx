import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import MorphBlob from './MorphBlob';

export default function Colophon() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer ref={ref} className="relative py-32 px-6 overflow-hidden" style={{ background: '#0c0802' }}>

      {/* Morphing ambiance */}
      <MorphBlob variant="gold" size={600} className="top-1/2 left-1/2 opacity-40 -translate-x-1/2 -translate-y-1/2" speed={25} />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 80%, rgba(201,168,76,0.07) 0%, transparent 70%)'
      }} />

      {/* Top border ornament */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '280px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25), transparent)' }}
      />

      <div className="max-w-xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          {/* Ornament */}
          <div className="flex items-center justify-center gap-5">
            <motion.div
              className="h-px"
              initial={{ width: 0 }}
              animate={inView ? { width: 60 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3))' }}
            />
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{ color: 'rgba(201,168,76,0.45)', fontSize: '1.4rem', display: 'inline-block' }}
            >
              ✦
            </motion.span>
            <motion.div
              className="h-px"
              initial={{ width: 0 }}
              animate={inView ? { width: 60 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.3))' }}
            />
          </div>

          {/* FINIS */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={inView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '4rem',
                fontWeight: 300,
                color: 'rgba(245,234,216,0.1)',
                letterSpacing: '0.3em',
                lineHeight: 1,
              }}
            >
              FINIS
            </h2>
          </motion.div>

          {/* Closing quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{
              fontFamily: "'Crimson Text', serif",
              fontStyle: 'italic',
              color: 'rgba(245,234,216,0.28)',
              fontSize: '1.15rem',
              lineHeight: '1.85',
              maxWidth: '380px',
              margin: '0 auto',
            }}
          >
            "Memory is the thing that does not burn."
          </motion.blockquote>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="space-y-2"
          >
            <p className="chapter-number" style={{ color: 'rgba(201,168,76,0.18)', letterSpacing: '0.28em', fontSize: '0.58rem' }}>
              Warsaw Uprising · August 1 – October 2, 1944
            </p>
            <div className="h-px mx-auto mt-8" style={{ maxWidth: '80px', background: 'rgba(201,168,76,0.1)' }} />
            <p className="chapter-number mt-6" style={{ color: 'rgba(245,234,216,0.08)', letterSpacing: '0.18em', fontSize: '0.52rem' }}>
              A work of narrative fiction inspired by historical events
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
