import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import MorphBlob from './MorphBlob';

const accentMap = {
  crimson: {
    line: '#8b1a1a', num: '#8b1a1a',
    glow: 'rgba(139,26,26,0.07)',
    glowStrong: 'rgba(139,26,26,0.13)',
    blob: 'crimson',
    titleGrad: 'linear-gradient(135deg, #1a0808 0%, #5c1010 100%)',
  },
  gold: {
    line: '#c9a84c', num: '#c9a84c',
    glow: 'rgba(201,168,76,0.07)',
    glowStrong: 'rgba(201,168,76,0.14)',
    blob: 'gold',
    titleGrad: 'linear-gradient(135deg, #1a1208 0%, #5c3d10 100%)',
  },
  parchment: {
    line: '#9a7a30', num: '#9a7a30',
    glow: 'rgba(154,122,48,0.06)',
    glowStrong: 'rgba(154,122,48,0.12)',
    blob: 'parchment',
    titleGrad: 'linear-gradient(135deg, #120f04 0%, #3d2e0a 100%)',
  },
};

function Paragraph({ text, index, isDropCap }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 22, filter: 'blur(2px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.0, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className={isDropCap && index === 0 ? 'drop-cap' : ''}
      style={{
        color: '#261808',
        lineHeight: '2.05',
        fontSize: '1.14rem',
        fontFamily: "'Crimson Text', Georgia, serif",
      }}
    >
      {text}
    </motion.p>
  );
}

function OrnamentDivider({ color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scaleX: 0.4 }}
      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center gap-5 my-12"
    >
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${color})`, opacity: 0.5 }} />
      <motion.span
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ color, fontSize: '1rem', opacity: 0.7, display: 'inline-block' }}
      >
        ✦
      </motion.span>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${color})`, opacity: 0.5 }} />
    </motion.div>
  );
}

// SVG decorative mark that reveals on scroll
function ChapterMark({ color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className="flex justify-center mb-8">
      <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
        <motion.line
          x1="0" y1="10" x2="120" y2="10"
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="120"
          initial={{ strokeDashoffset: 120 }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          opacity={0.4}
        />
        <motion.circle
          cx="60" cy="10" r="3"
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.8 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
        <motion.circle
          cx="60" cy="10" r="7"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.35 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        {[20, 40, 80, 100].map(cx => (
          <motion.circle
            key={cx}
            cx={cx} cy="10" r="1.5"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.4 } : {}}
            transition={{ duration: 0.4, delay: 0.4 + Math.abs(cx - 60) * 0.006 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

export default function Chapter({ chapter, chapterIndex, onVisible }) {
  const ref = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const headerInView = useInView(headerRef, { once: false, margin: '-200px' });
  const colors = accentMap[chapter.accent] || accentMap.gold;
  const isEven = chapterIndex % 2 === 0;

  useEffect(() => {
    if (headerInView) onVisible(chapter.id);
  }, [headerInView, chapter.id, onVisible]);

  return (
    <section
      ref={ref}
      id={`chapter-${chapter.id}`}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: chapterIndex % 2 === 0 ? 'transparent' : 'rgba(22,15,4,0.022)' }}
    >
      {/* Morphing blob accent — alternates sides */}
      <MorphBlob
        variant={colors.blob}
        size={480}
        speed={16}
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          [isEven ? 'left' : 'right']: '-180px',
          opacity: 0.65,
        }}
      />

      {/* Soft gradient spotlight */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '50vw', height: '50vw',
          left: isEven ? '-10vw' : 'auto',
          right: isEven ? 'auto' : '-10vw',
          top: '50%', transform: 'translateY(-50%)',
          background: `radial-gradient(ellipse, ${colors.glow} 0%, transparent 65%)`,
        }}
      />

      <motion.div
        ref={cardRef}
        className="relative max-w-3xl mx-auto chapter-card rounded-sm"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          padding: '2px',
          background: 'transparent',
        }}
      >
        {/* Chapter header */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          {/* Chapter label + rules */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${colors.line})`, opacity: 0.35 }} />
            <span className="chapter-number" style={{ color: colors.num, letterSpacing: '0.38em', fontSize: '0.6rem' }}>
              Chapter {String(chapterIndex + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${colors.line})`, opacity: 0.35 }} />
          </div>

          {/* Title — with soft text shadow for depth */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
              fontWeight: 600,
              lineHeight: 1.08,
              color: '#160f04',
              letterSpacing: '-0.01em',
              textShadow: '0 2px 24px rgba(100,50,10,0.1)',
            }}
          >
            {chapter.title}
          </motion.h2>

          {/* Date + location meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 space-y-1"
          >
            <p className="chapter-number" style={{ color: colors.num, letterSpacing: '0.22em', fontSize: '0.62rem' }}>
              {chapter.date}
            </p>
            <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: 'italic', color: 'rgba(22,15,4,0.42)', fontSize: '1rem' }}>
              {chapter.location}
            </p>
          </motion.div>

          {/* SVG decorative mark */}
          <div className="mt-8">
            <ChapterMark color={colors.line} index={chapterIndex} />
          </div>
        </motion.header>

        {/* Paragraphs */}
        <div className="space-y-8">
          {chapter.paragraphs.map((para, i) => (
            <Paragraph key={i} text={para} index={i} isDropCap={true} />
          ))}
        </div>

        {/* Bottom ornament */}
        {chapterIndex < 7 && <OrnamentDivider color={colors.line} />}

        {/* Chapter close mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-2"
        >
          <span className="chapter-number" style={{ color: `${colors.line}44`, letterSpacing: '0.4em', fontSize: '0.55rem' }}>◆</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
