import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeUp } from "@/components/Reveal";

export const ParallaxBand = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-espresso text-linen" data-testid="parallax-band">
      <motion.div style={{ y }} className="absolute -inset-y-24 inset-x-0" aria-hidden="true">
        <img src="/illustrations/ch37.jpg" alt="" className="h-full w-full object-cover opacity-35" />
      </motion.div>
      <div className="absolute inset-0 bg-espresso/55" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-5 py-32 sm:px-8 sm:py-40">
        <FadeUp>
          <p className="eyebrow !text-copper-light">From the Book</p>
          <blockquote className="mt-8 font-serif text-3xl leading-snug tracking-tight sm:text-5xl sm:leading-[1.15]">
            "Hope is not the absence of sorrow — it's what you do in the middle of it."
          </blockquote>
          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-linen/60">Chapter 37 · Believe, Joanie, Believe</p>
        </FadeUp>
      </div>
    </section>
  );
};
