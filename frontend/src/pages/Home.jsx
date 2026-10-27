import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskedLines, FadeUp } from "@/components/Reveal";
import { BookCover } from "@/components/BookCover";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ScrollBook } from "@/components/ScrollBook";
import { ParallaxBand } from "@/components/ParallaxBand";
import { Intro } from "@/components/Intro";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem("bjb-intro");
    } catch {
      return false;
    }
  });
  const D = showIntro ? 2.7 : 0;
  const finishIntro = () => {
    try {
      sessionStorage.setItem("bjb-intro", "1");
    } catch {}
    setShowIntro(false);
  };

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    axios.get(`${API}/reviews`).then((r) => setReviews(r.data.slice(0, 3))).catch(() => {});
    axios.get(`${API}/blog`).then((r) => setPosts(r.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      <AnimatePresence>{showIntro && <Intro onDone={finishIntro} />}</AnimatePresence>

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden" data-testid="hero-section">
        <div className="absolute -top-32 right-0 h-[34rem] w-[34rem] rounded-full bg-copper/10 blur-3xl" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-12 lg:pt-24">
          <motion.div style={{ y: textY }} className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: D + 0.15, duration: 0.8 }}
              className="eyebrow"
              data-testid="hero-kicker"
            >
              An Illustrated Novel · Jay. A Lions
            </motion.p>
            <h1 className="mt-6 font-serif text-[clamp(3.4rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-tight text-espresso">
              <MaskedLines
                delay={D + 0.15}
                lines={[
                  <>Believe,</>,
                  <><em className="italic text-copper">Joanie,</em></>,
                  <>Believe<span className="text-copper">.</span></>,
                ]}
              />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: D + 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-umber"
              data-testid="hero-tagline"
            >
              In the streets of Millstone, a girl with a bat, a stubborn heart, and a town
              that learns — one swing at a time — how to believe again.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: D + 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/about" className="btn-primary" data-testid="hero-discover-button">
                Discover the Story <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/purchase" className="btn-ghost" data-testid="hero-preorder-button">
                Pre-order the Book
              </Link>
            </motion.div>
          </motion.div>
          <motion.div style={{ y: coverY }} className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: D + 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-sm"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: D + 1.4 }}
              >
                <BookCover />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <MarqueeStrip />

      {/* THE STORY */}
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-28 sm:px-8 lg:grid-cols-12" data-testid="story-section">
        <FadeUp className="lg:col-span-7">
          <p className="eyebrow">The Story</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            A girl. A game. A town that forgot how to hope.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-umber">
            Joanie grew up playing stickball beneath the Manhattan skyline, the youngest —
            and the only girl — in a family that measured love in innings. When loss splits
            Millstone open, she becomes the one thing nobody expected: the reason it heals.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-umber">
            Told in prose and thirty-nine hand-illustrated chapters, <em className="font-serif italic">Believe, Joanie, Believe</em> is
            about grief and grace, brothers and ballfields, and the long, brave practice of believing.
          </p>
          <Link to="/about" className="btn-ghost mt-9" data-testid="story-discover-button">
            Discover the Story <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
        <FadeUp delay={0.15} className="lg:col-span-5">
          <figure className="lg:translate-y-10">
            <div className="overflow-hidden rounded-sm border border-clay">
              <img src="/illustrations/ch23.jpg" alt="The Millstone Gazette building, Chapter 23 illustration" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
            </div>
            <figcaption className="mt-3 text-xs uppercase tracking-[0.25em] text-umber/70">
              The Millstone Gazette — Chapter 23
            </figcaption>
          </figure>
        </FadeUp>
      </section>

      {/* APPLE-STYLE SCROLL SHOWCASE */}
      <ScrollBook />

      {/* AUTHOR NOTE — dark band */}
      <section className="bg-espresso text-linen" data-testid="author-note-section">
        <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8">
          <FadeUp>
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-copper" aria-hidden="true">
              <path d="M12 2l2.2 6.4L21 10l-6.8 1.6L12 18l-2.2-6.4L3 10l6.8-1.6L12 2z" />
            </svg>
            <blockquote className="mt-8 font-serif text-3xl leading-snug tracking-tight sm:text-5xl sm:leading-[1.15]">
              "I wrote Joanie for everyone who has ever stood at the plate with the count
              against them — and swung anyway."
            </blockquote>
            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-linen/60">Jay. A Lions · Author &amp; Illustrator</p>
            <Link to="/author" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-copper-light transition-colors hover:text-copper" data-testid="author-note-link">
              Meet the Author <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8" data-testid="testimonials-section">
        <FadeUp>
          <p className="eyebrow">Early Readers</p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            What readers are already saying
          </h2>
        </FadeUp>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-clay bg-clay md:grid-cols-3" data-testid="testimonials-grid">
          {reviews.map((r, i) => (
            <FadeUp key={r.id || i} delay={i * 0.12} className="bg-linen p-9">
              <span className="font-serif text-5xl leading-none text-copper">"</span>
              <p className="mt-2 font-serif text-xl leading-relaxed text-espresso">{r.quote}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-umber">
                {r.name}{r.location ? ` · ${r.location}` : ""}
              </p>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2}>
          <Link to="/reviews" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-copper transition-colors hover:text-copper-dark" data-testid="testimonials-more-link">
            Read more reader words <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </section>

      {/* PARALLAX QUOTE */}
      <ParallaxBand />

      {/* LATEST POSTS */}
      <section className="bg-cream" data-testid="latest-posts-section">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <FadeUp className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">From the Blog</p>
              <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
                Notes from Millstone
              </h2>
            </div>
            <Link to="/blog" className="btn-ghost" data-testid="blog-all-link">All posts <ArrowRight className="h-4 w-4" /></Link>
          </FadeUp>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {posts.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.12}>
                <Link to={`/blog/${p.slug}`} className="group block" data-testid={`post-card-${p.slug}`}>
                  <div className="overflow-hidden rounded-sm border border-clay">
                    <img src={p.image} alt={p.title} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <p className="eyebrow mt-5">{p.category}</p>
                  <h3 className="mt-2 font-serif text-2xl leading-snug text-espresso transition-colors group-hover:text-copper">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-umber">{p.excerpt}</p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8" data-testid="newsletter-section">
        <FadeUp className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">Book Updates</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              Believe first.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-umber">
              Release news, pre-order access, and the occasional letter from the author.
              No noise — just the good stuff.
            </p>
          </div>
          <div className="lg:col-span-6 lg:justify-self-end">
            <NewsletterForm testId="home-newsletter" />
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
