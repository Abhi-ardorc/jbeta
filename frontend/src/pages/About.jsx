import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MaskedLines, FadeUp } from "@/components/Reveal";
import { BookCover } from "@/components/BookCover";
import { MarqueeStrip } from "@/components/MarqueeStrip";

const THEMES = [
  { title: "Grief & Grace", text: "Loss splits Millstone open — and becomes the place where the light gets in.", img: "/illustrations/ch37.jpg", span: "md:col-span-3" },
  { title: "Brothers", text: "Three boys, one sister, and a love measured in innings.", img: "/illustrations/ch21.jpg", span: "md:col-span-3" },
  { title: "Small-Town Heart", text: "The Gazette, the ballfield, the neighbors who show up.", img: "/illustrations/ch23.jpg", span: "md:col-span-2" },
  { title: "The Long Game", text: "Belief isn't a feeling. It's a practice, one swing at a time.", img: "/illustrations/ch39.jpg", span: "md:col-span-4" },
];

const AUDIENCE = [
  "Readers who love illustrated fiction with emotional depth",
  "Families reading aloud — a chapter a night, together",
  "Anyone who has ever been counted out and kept swinging",
];

export default function About() {
  return (
    <div data-testid="about-page">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:pt-28">
        <p className="eyebrow" data-testid="about-kicker">About the Book</p>
        <h1 className="mt-6 font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-tight">
          <MaskedLines lines={[<>The story of</>, <><em className="italic text-copper">Joanie</em></>]} />
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 sm:px-8 lg:grid-cols-12" data-testid="synopsis-section">
        <FadeUp className="lg:col-span-7">
          <p className="eyebrow">Synopsis</p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-umber">
            <p>
              Joanie is the youngest of four, the only girl, and — ask anyone on her street —
              the best stickball hitter Millstone has ever produced. Raised above her family's
              corner store with the Manhattan skyline on the horizon, she learns early that
              love in her family is measured in innings.
            </p>
            <p>
              When tragedy finds the family, the game stops. The town holds its breath. And
              Joanie — grieving, furious, twelve kinds of stubborn — has to decide what
              believing means when the scoreboard says it's over.
            </p>
            <p>
              Across thirty-nine hand-illustrated chapters, <em className="font-serif italic">Believe Joanie Believe</em> follows
              one girl, three brothers, and a small town as they learn that hope is not the
              absence of sorrow — it's what you do in the middle of it.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.15} className="lg:col-span-5">
          <div className="overflow-hidden rounded-sm border border-clay lg:translate-y-8">
            <img src="/illustrations/ch01.jpg" alt="Joanie at bat, Chapter 1 illustration" className="h-full w-full object-cover" />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-umber/70">Joanie at the plate — Chapter 1</p>
        </FadeUp>
      </section>

      <MarqueeStrip />

      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-28 sm:px-8 lg:grid-cols-12" data-testid="inspiration-section">
        <FadeUp className="lg:col-span-5">
          <div className="overflow-hidden rounded-sm border border-clay">
            <img src="/illustrations/ch07.jpg" alt="A wedding portrait above a mother with triplets, Chapter 7 illustration" className="h-full w-full object-cover" />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-umber/70">The family portrait — Chapter 7</p>
        </FadeUp>
        <FadeUp delay={0.15} className="lg:col-span-7 lg:pl-8">
          <p className="eyebrow">The Inspiration</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Every family has a Joanie.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-umber">
            The book began as a handful of sketches — a girl with a bat, a stoop, a skyline —
            and grew into a story about the families that hold us and the towns that raise us.
            It is fiction, but it is built from real kitchens, real ballfields, and real loss.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-umber">
            The illustrations came first, and the words learned to keep up.
          </p>
        </FadeUp>
      </section>

      <section className="bg-cream" data-testid="themes-section">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <FadeUp>
            <p className="eyebrow">Key Themes</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              What the story carries
            </h2>
          </FadeUp>
          <div className="mt-14 grid gap-6 md:grid-cols-6" data-testid="themes-grid">
            {THEMES.map((t, i) => (
              <FadeUp key={t.title} delay={i * 0.1} className={`group overflow-hidden rounded-sm border border-clay bg-linen ${t.span}`}>
                <div className="overflow-hidden">
                  <img src={t.img} alt={t.title} className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-espresso">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-umber">{t.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-28 sm:px-8 lg:grid-cols-12" data-testid="audience-section">
        <FadeUp className="lg:col-span-6">
          <p className="eyebrow">Who It's For</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Written for the stubborn believers
          </h2>
          <ul className="mt-8 space-y-4">
            {AUDIENCE.map((a, i) => (
              <li key={i} className="flex items-start gap-4 text-lg text-umber">
                <svg viewBox="0 0 24 24" className="mt-1.5 h-4 w-4 shrink-0 fill-copper" aria-hidden="true">
                  <path d="M12 2l2.2 6.4L21 10l-6.8 1.6L12 18l-2.2-6.4L3 10l6.8-1.6L12 2z" />
                </svg>
                {a}
              </li>
            ))}
          </ul>
        </FadeUp>
        <FadeUp delay={0.15} className="lg:col-span-6">
          <div className="rounded-sm border border-clay bg-cream p-9 sm:p-12">
            <p className="eyebrow">A First Look</p>
            <blockquote className="mt-6 font-serif text-2xl leading-relaxed text-espresso">
              "The strike zone was chalk on brick, the ball was half tape, and the whole
              block held its breath. Joanie spat on her palms, gripped the broom handle,
              and waited for her pitch like the world depended on it. Maybe it did."
            </blockquote>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-umber/70">Chapter 1 — Believe Joanie Believe</p>
          </div>
        </FadeUp>
      </section>

      <section className="bg-espresso text-linen" data-testid="about-cta-section">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-28 sm:px-8 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            <p className="eyebrow">Bring the story home</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              Available soon in hardcover, paperback, and eBook.
            </h2>
            <Link to="/purchase" className="btn-primary mt-9" data-testid="about-purchase-button">
              See purchase options <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>
          <FadeUp delay={0.15} className="lg:col-span-5">
            <div className="mx-auto max-w-xs">
              <BookCover />
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
