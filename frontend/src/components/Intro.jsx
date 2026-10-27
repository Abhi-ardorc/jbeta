import { useEffect } from "react";
import { motion } from "framer-motion";

export const Intro = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-espresso"
      exit={{ scale: 2.8, opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 1.05, ease: [0.6, 0, 0.2, 1] }}
      data-testid="intro-overlay"
    >
      <div className="absolute h-[30rem] w-[30rem] rounded-full bg-copper/25 blur-3xl" aria-hidden="true" />
      <motion.img
        src="/illustrations/cover.png"
        alt="Believe, Joanie, Believe — book cover"
        initial={{ opacity: 0, scale: 0.7, rotate: -5, y: 40 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-52 rounded-[4px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.75)] sm:w-64"
      />
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.15em" }}
        animate={{ opacity: 1, letterSpacing: "0.45em" }}
        transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}
        className="relative mt-9 text-[11px] font-semibold uppercase text-linen/80 sm:text-xs"
      >
        Believe · Joanie · Believe
      </motion.p>
    </motion.div>
  );
};
