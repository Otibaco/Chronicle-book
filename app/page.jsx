"use client"; // required for hooks and framer motion

import { useState, useCallback } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import ReadingProgress from "@/components/ReadingProgress";
import ChapterNav from "@/components/ChapterNav";
import ScrollToTop from "@/components/ScrollToTop";
import Hero from "@/components/Hero";
import TableOfContents from "@/components/TableOfContents";
import Chapter from "@/components/Chapter";
import Colophon from "@/components/Colophon";
import { chapters, storyMeta } from "./data/story";



// Cinematic page entrance
function CinematicEntrance({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, delay: 1.8 }}
      onAnimationComplete={onComplete}
      style={{ background: "#0c0802" }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.95] }}
        transition={{ duration: 1.8, times: [0, 0.2, 0.7, 1] }}
      >
        <p
          className="chapter-number"
          style={{
            color: "rgba(201,168,76,0.5)",
            letterSpacing: "0.4em",
            fontSize: "0.6rem",
          }}
        >
          ✦ &nbsp; A Chronicle &nbsp; ✦
        </p>
        <h1
          className="mt-3"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 8vw, 5rem)",
            fontWeight: 600,
            color: "rgba(244,232,208,0.9)",
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {storyMeta.title}
        </h1>
      </motion.div>
    </motion.div>
  );
}

export default function HomePage() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [entranceDone, setEntranceDone] = useState(false);

  const scrollToChapter = useCallback((id) => {
    const el = document.getElementById(`chapter-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleChapterVisible = useCallback((id) => {
    setActiveChapter(id);
  }, []);

  return (
    <>
      <Head>
        <title>{storyMeta.title} — A Cinematic Chronicle</title>
        <meta name="description" content={storyMeta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={storyMeta.title} />
      </Head>

      {/* Cinematic entrance */}
      {!entranceDone && <CinematicEntrance onComplete={() => setEntranceDone(true)} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Fixed UI chrome */}
      <ReadingProgress />
      <ChapterNav activeChapter={activeChapter} onSelect={scrollToChapter} />
      <ScrollToTop />

      <main style={{ cursor: "none" }}>
        {/* Hero section */}
        <Hero />

        {/* Small divider */}
        <div className="h-[1px] bg-[#100b02]" />

        {/* Table of contents */}
        <TableOfContents onSelect={scrollToChapter} />

        {/* Section transition */}
        <div className="h-20 bg-gradient-to-b from-[#100b02] to-[#f4e8d0]" />

        {/* Chapters */}
        <div className="relative bg-[#f4e8d0]">
          {chapters.map((chapter, i) => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              chapterIndex={i}
              onVisible={handleChapterVisible}
            />
          ))}
        </div>

        {/* Outro transition */}
        <div className="h-20 bg-gradient-to-b from-[#f4e8d0] to-[#0c0802]" />

        {/* Colophon */}
        <Colophon />
      </main>
    </>
  );
}