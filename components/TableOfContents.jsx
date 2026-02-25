import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { chapters, storyMeta } from '../app/data/story';
import MorphBlob from './MorphBlob';

function ChapterRow({ ch, index, onSelect }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.button
      ref={ref}
      onClick={() => onSelect(ch.id)}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="w-full text-left group relative"
    >
      {/* Hover background wash */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none"
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.04), transparent)' }}
        transition={{ duration: 0.3 }}
      />

      <div
        className="relative flex items-baseline gap-5 py-5 border-b"
        style={{ borderColor: 'rgba(201,168,76,0.1)' }}
      >
        {/* Number */}
        <motion.span
          className="chapter-number flex-shrink-0"
          variants={{ hover: { color: '#e8c96d' } }}
          style={{ color: 'rgba(201,168,76,0.45)', fontSize: '0.62rem', letterSpacing: '0.22em' }}
          transition={{ duration: 0.3 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        {/* Title */}
        <motion.span
          className="flex-1"
          variants={{ hover: { x: 6, color: '#f4e8d0' } }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.35rem',
            fontWeight: 400,
            color: 'rgba(245,234,216,0.65)',
            display: 'block',
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch.title}
        </motion.span>

        {/* Date */}
        <span
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: '0.6rem',
            color: 'rgba(201,168,76,0.28)',
            letterSpacing: '0.06em',
            flexShrink: 0,
          }}
        >
          {ch.date.split(',')[0]}
        </span>

        {/* Arrow */}
        <motion.span
          variants={{ hover: { opacity: 1, x: 0 } }}
          initial={{ opacity: 0, x: -4 }}
          style={{ color: '#c9a84c', fontSize: '0.9rem', flexShrink: 0 }}
          transition={{ duration: 0.25 }}
        >
          →
        </motion.span>
      </div>

      {/* Hover accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
        variants={{ hover: { scaleY: 1, opacity: 1 } }}
        initial={{ scaleY: 0, opacity: 0 }}
        style={{ background: 'linear-gradient(to bottom, transparent, #c9a84c, transparent)', transformOrigin: 'top' }}
        transition={{ duration: 0.35 }}
      />
    </motion.button>
  );
}

export default function TableOfContents({ onSelect }) {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ background: '#100b02' }}>

      {/* Morphing background blobs */}
      <MorphBlob variant="gold" size={500} className="top-[-100px] left-[-150px] opacity-50" speed={20} />
      <MorphBlob variant="crimson" size={340} className="bottom-[-80px] right-[-100px] opacity-40" speed={16} />

      {/* Corner decorations — refined SVG */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ width: 40, height: 40, ...pos }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <path
              d={i === 0 ? 'M 38,2 L2,2 L2,38' : i === 1 ? 'M 2,2 L38,2 L38,38' : i === 2 ? 'M 38,38 L2,38 L2,2' : 'M 2,38 L38,38 L38,2'}
              stroke="rgba(201,168,76,0.2)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx={i < 2 ? (i === 0 ? 2 : 38) : (i === 2 ? 2 : 38)} cy={i < 2 ? 2 : 38} r="2" fill="rgba(201,168,76,0.35)" />
          </svg>
        </motion.div>
      ))}

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="chapter-number mb-5" style={{ color: 'rgba(201,168,76,0.45)', letterSpacing: '0.38em', fontSize: '0.58rem' }}>
              ✦ &nbsp; Contents &nbsp; ✦
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                color: '#f4e8d0',
                letterSpacing: '0.05em',
                lineHeight: 1.1,
              }}
            >
              Eight Chapters
            </h2>
            <div className="gold-rule mx-auto mt-5 mb-4" style={{ maxWidth: '160px' }} />
            <p
              style={{
                color: 'rgba(245,234,216,0.3)',
                fontFamily: "'Crimson Text', serif",
                fontStyle: 'italic',
                fontSize: '1rem',
                lineHeight: 1.7,
              }}
            >
              {storyMeta.description}
            </p>
          </motion.div>
        </div>

        {/* Chapter list */}
        <div>
          {chapters.map((ch, i) => (
            <ChapterRow key={ch.id} ch={ch} index={i} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}
