import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STEPS = [
  {
    chapter: "The Cover",
    title: "The promise",
    caption: "A skyline, a ballfield, three brothers — and a girl named Joanie.",
    img: "/illustrations/cover.png",
  },
  {
    chapter: "Chapter 1",
    title: "Where it begins",
    caption: "A girl, a bat, and a chalk strike zone on a Millstone street.",
    img: "/illustrations/ch01.jpg",
  },
  {
    chapter: "Chapter 6",
    title: "The dark inning",
    caption: "Grief finds the family — and believing gets hard.",
    img: "/illustrations/ch06.jpg",
  },
  {
    chapter: "Chapter 39",
    title: "The long game",
    caption: "A whole town holding its breath, swinging together.",
    img: "/illustrations/ch39.jpg",
  },
];

export const ScrollBook = () => {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const bookScale = useTransform(p, [0, 0.07], [0.8, 1]);
  const bookRotate = useTransform(p, [0, 1], [-6, 6]);
  const bookTilt = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [-3, 3, -3, 3, -3]);
  const bookY = useTransform(p, [0, 1], [80, -80]);

  const o0 = useTransform(p, [0, 0.19, 0.26], [1, 1, 0]);
  const o1 = useTransform(p, [0.21, 0.28, 0.45, 0.52], [0, 1, 1, 0]);
  const o2 = useTransform(p, [0.47, 0.54, 0.71, 0.78], [0, 1, 1, 0]);
  const o3 = useTransform(p, [0.73, 0.8, 1], [0, 1, 1]);
  const fades = [o0, o1, o2, o3];

  return (
    <section ref={ref} className="relative bg-cream" style={{ height: "420vh" }} data-testid="scroll-book-section">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-5">
            <p className="eyebrow">Inside the Book</p>
            <div className="relative mt-6 h-60 sm:h-64">
              {STEPS.map((s, i) => (
                <motion.div key={s.chapter} style={{ opacity: fades[i] }} className="absolute inset-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-espresso/50">{s.chapter}</p>
                  <h3 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight text-espresso sm:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-lg leading-relaxed text-umber">{s.caption}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex gap-2" data-testid="scroll-book-dots">
              {STEPS.map((s, i) => (
                <motion.span
                  key={s.chapter}
                  style={{ opacity: fades[i] }}
                  className="h-1.5 w-8 rounded-full bg-copper"
                />
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:col-span-7">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
              {STEPS.map((s, i) => (
                <motion.span
                  key={s.chapter}
                  style={{ opacity: fades[i] }}
                  className="absolute font-serif text-[11rem] leading-none text-espresso/5 sm:text-[16rem]"
                >
                  0{i + 1}
                </motion.span>
              ))}
            </div>
            <motion.div
              style={{ scale: bookScale, rotate: bookRotate, rotateY: bookTilt, y: bookY, transformPerspective: 1200 }}
              className="relative w-60 sm:w-80"
            >
              <div className="absolute -inset-8 rounded-full bg-copper/25 blur-3xl" aria-hidden="true" />
              <div className="relative aspect-[798/1084] overflow-hidden rounded-[4px] shadow-[0_40px_80px_-20px_rgba(30,37,54,0.55)]" data-testid="scroll-book-frame">
                {STEPS.map((s, i) => (
                  <motion.img
                    key={s.chapter}
                    src={s.img}
                    alt={`${s.chapter} — ${s.title}`}
                    style={{ opacity: fades[i] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
