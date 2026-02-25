import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { storyMeta } from '../app/data/story';
import MorphBlob from './MorphBlob';

// Stable particle data — computed once, not on every render
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  w: (i * 1.618 % 2.5) + 0.8,
  left: (i * 37.1 + 11) % 100,
  top: (i * 29.3 + 7) % 100,
  color: i % 3 === 0 ? '#e8c96d' : i % 3 === 1 ? '#8b1a1a' : '#c9a84c',
  dur: 5 + (i * 1.3 % 5),
  delay: (i * 0.8) % 7,
  driftX: ((i * 13.7) % 80) - 40,
}));

const stats = [
  { num: '63', label: 'Days of Resistance' },
  { num: '200K', label: 'Lives Taken' },
  { num: '1', label: 'City Unbowed' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: '#100b02' }}>

      {/* Deep layered background gradient */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 38%, rgba(139,26,26,0.22) 0%, rgba(201,168,76,0.07) 45%, transparent 70%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 40% 50% at 20% 80%, rgba(139,26,26,0.08) 0%, transparent 60%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 30% 40% at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 60%)'
        }} />
      </motion.div>

      {/* SVG Morphing accent blobs */}
      <MorphBlob variant="crimson" size={520} className="top-[-80px] left-[-120px] opacity-70" speed={14} />
      <MorphBlob variant="gold" size={380} className="bottom-[-60px] right-[-80px] opacity-60" speed={18} />
      <MorphBlob variant="parchment" size={260} className="top-[30%] right-[8%] opacity-40" speed={22} />

      {/* Horizontal gold rules (parallax) */}
      {[{ top: '12%' }, { bottom: '12%' }].map((pos, i) => (
        <motion.div key={i} className="absolute left-0 right-0 px-12" style={{ ...pos, y }}>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25))' }} />
            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(201,168,76,0.4)' }} />
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.25))' }} />
          </div>
        </motion.div>
      ))}

      {/* Ember particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.w, height: p.w, left: `${p.left}%`, top: `${p.top}%`, background: p.color }}
          animate={{ y: [0, -130, 0], x: [0, p.driftX, 0], opacity: [0, 0.8, 0], scale: [0, 1.6, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Main content */}
      <motion.div className="relative z-10 text-center px-8 max-w-4xl" style={{ y, opacity }}>

        {/* Pre-title eyebrow */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.9em' }}
          animate={{ opacity: 1, letterSpacing: '0.38em' }}
          transition={{ duration: 2.2, delay: 0.2, ease: 'easeOut' }}
          className="chapter-number mb-10"
          style={{ color: 'rgba(201,168,76,0.6)' }}
        >
          ✦ &nbsp; A Chronicle &nbsp; ✦
        </motion.div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="flicker text-shadow-warm"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(4.5rem, 13vw, 10rem)',
              fontWeight: 600,
              lineHeight: 0.88,
              letterSpacing: '-0.015em',
              color: '#f4e8d0',
            }}
          >
            <span style={{ display: 'block' }}>Ashes</span>
            <span
              style={{
                display: 'block',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '0.55em',
                letterSpacing: '0.12em',
                color: '#c9a84c',
                marginTop: '0.08em',
                marginBottom: '0.08em',
              }}
            >
              &amp;
            </span>
            <span style={{ display: 'block' }}>Ember</span>
          </h1>
        </motion.div>

        {/* Subtitle band */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-10 mb-8"
        >
          <div className="gold-rule mx-auto mb-5" style={{ maxWidth: '240px' }} />
          <p className="chapter-number" style={{ color: 'rgba(245,234,216,0.55)', letterSpacing: '0.26em' }}>
            {storyMeta.subtitle}
          </p>
          <p style={{ color: 'rgba(245,234,216,0.32)', fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', fontStyle: 'italic', marginTop: '0.4rem' }}>
            {storyMeta.byline}
          </p>
          <div className="gold-rule mx-auto mt-5" style={{ maxWidth: '240px' }} />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-10 mt-14"
        >
          {stats.map((s, i) => (
            <div key={s.num}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.15, duration: 0.7 }}
                className="text-center"
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 300, color: '#c9a84c', lineHeight: 1, letterSpacing: '-0.01em' }}>
                  {s.num}
                </div>
                <div className="chapter-number mt-1.5" style={{ color: 'rgba(245,234,216,0.35)', fontSize: '0.58rem' }}>
                  {s.label}
                </div>
              </motion.div>
              {i < stats.length - 1 && (
                <div className="absolute ml-[calc(50%+2rem)] top-0 bottom-0 w-px opacity-20" style={{ background: 'rgba(201,168,76,0.4)' }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1.2 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
          >
            <svg width="24" height="36" viewBox="0 0 24 36" className="mx-auto" fill="none">
              <rect x="1" y="1" width="22" height="34" rx="11" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>
              <motion.rect
                x="10" y="8" width="4" height="8" rx="2"
                fill="rgba(201,168,76,0.6)"
                animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
            <p className="chapter-number mt-3" style={{ color: 'rgba(201,168,76,0.3)', letterSpacing: '0.3em', fontSize: '0.55rem' }}>
              Begin Reading
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(20,12,2,0.6))' }} />
    </section>
  );
}
