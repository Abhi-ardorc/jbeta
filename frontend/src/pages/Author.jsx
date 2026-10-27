import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MaskedLines, FadeUp } from "@/components/Reveal";

const PORTRAIT =
  "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwd2FybSUyMGxpZ2h0aW5nfGVufDB8fHx8MTc5MzExOTU5Mnww&ixlib=rb-4.1.0&q=85";

export default function Author() {
  return (
    <div data-testid="author-page">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:pt-28">
        <p className="eyebrow" data-testid="author-kicker">Meet the Author</p>
        <h1 className="mt-6 font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-tight">
          <MaskedLines lines={[<>The person behind</>, <><em className="italic text-copper">the pen</em></>]} />
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 sm:px-8 lg:grid-cols-12" data-testid="author-bio-section">
        <FadeUp className="lg:col-span-5">
          <div className="overflow-hidden rounded-sm border border-clay">
            <img src={PORTRAIT} alt="Portrait of the author in warm light" className="aspect-[4/5] w-full object-cover" data-testid="author-portrait" />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-umber/70">The author, at home</p>
        </FadeUp>
        <FadeUp delay={0.15} className="lg:col-span-7 lg:pt-6">
          <p className="eyebrow">Biography</p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-umber">
            <p>
              Jay. A Lions, author and illustrator of <em className="font-serif italic">Believe, Joanie, Believe</em>,
              grew up in a small town not unlike Millstone — the kind of place where the
              ballfield lights hum, the diner knows your order, and everybody's business
              travels faster than the local paper can print it.
            </p>
            <p>
              A lifelong sketcher and a late-blooming novelist, Jay spent years filling
              notebooks with a girl named Joanie before finally letting her story become a
              book — writing and illustrating all thirty-nine chapters as a single work.
            </p>
            <p className="text-sm italic text-umber/70">
              (Sample biography — Jay's own story goes here.)
            </p>
          </div>
        </FadeUp>
      </section>

      <section className="bg-espresso text-linen" data-testid="author-message-section">
        <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8">
          <FadeUp>
            <p className="eyebrow">A Personal Message</p>
            <blockquote className="mt-8 font-serif text-3xl leading-snug tracking-tight sm:text-4xl sm:leading-[1.2]">
              "If you take one thing from Joanie, take this: believing is not something you
              feel. It is something you do — on the ordinary Tuesdays, in the ninth inning,
              when nobody would blame you for walking away. Thank you for reading her. She
              has been waiting a long time to meet you."
            </blockquote>
            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-linen/60">— Jay. A Lions</p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-28 sm:px-8 lg:grid-cols-12" data-testid="author-inspiration-section">
        <FadeUp className="lg:col-span-7">
          <p className="eyebrow">Why This Book</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            The sketches came first.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-umber">
            Joanie began as pencil drawings — a girl at bat, three brothers holding wildflowers,
            a small-town newspaper office at dusk. The story grew around the pictures, chapter
            by chapter, until the pictures and the words couldn't be separated. That is why the
            novel is illustrated throughout: some things Joanie's world can only show you.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary" data-testid="author-contact-button">
              Media &amp; speaking inquiries <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/press" className="btn-ghost" data-testid="author-press-button">
              Visit the press room
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.15} className="lg:col-span-5">
          <div className="overflow-hidden rounded-sm border border-clay lg:translate-y-8">
            <img src="/illustrations/ch21.jpg" alt="Three brothers holding wildflowers, Chapter 21 illustration" className="h-full w-full object-cover" />
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-umber/70">The brothers — Chapter 21</p>
        </FadeUp>
      </section>
    </div>
  );
}
