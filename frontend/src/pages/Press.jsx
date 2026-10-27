import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, FileText, Image, Mic } from "lucide-react";
import { MaskedLines, FadeUp } from "@/components/Reveal";

const GALLERY = [
  { src: "/illustrations/ch01.jpg", label: "Chapter 1 — Joanie at the plate" },
  { src: "/illustrations/ch07.jpg", label: "Chapter 7 — The family portrait" },
  { src: "/illustrations/ch23.jpg", label: "Chapter 23 — The Millstone Gazette" },
  { src: "/illustrations/ch39.jpg", label: "Chapter 39 — The long game" },
];

export default function Press() {
  const pressKit = () => toast.info("The press kit is being assembled — write to us and we'll send it personally.");

  return (
    <div data-testid="press-page">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:pt-28">
        <p className="eyebrow" data-testid="press-kicker">Press &amp; Media</p>
        <h1 className="mt-6 font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-tight">
          <MaskedLines lines={[<>The press</>, <><em className="italic text-copper">room</em></>]} />
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-24 sm:px-8 lg:grid-cols-12" data-testid="press-release-section">
        <FadeUp className="lg:col-span-8">
          <div className="rounded-sm border border-clay bg-cream p-9 sm:p-12">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-copper" />
              <p className="eyebrow">Official Press Release</p>
            </div>
            <h2 className="mt-6 font-serif text-3xl leading-snug text-espresso sm:text-4xl">
              Debut illustrated novel "Believe Joanie Believe" announces upcoming release
            </h2>
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-umber/70">Millstone Press · For immediate release</p>
            <div className="mt-7 space-y-5 leading-relaxed text-umber">
              <p>
                <em className="font-serif italic">Believe, Joanie, Believe</em>, a debut illustrated novel
                by author-illustrator Jay. A Lions spanning thirty-nine hand-drawn chapters, will be
                available soon in hardcover,
                paperback, and eBook. Set in the fictional town of Millstone, the novel follows
                Joanie — the youngest of four and the best stickball hitter her street has ever
                seen — as grief tests her family and her town, and belief becomes the hardest
                game of all.
              </p>
              <p>
                Written and illustrated as a single work, the book blends literary fiction with
                the intimacy of a sketchbook. Early readers have called it "a story about grief
                that somehow leaves you lighter."
              </p>
              <p className="text-sm italic text-umber/70">
                (Sample release — final announcement copy, dates, and retailer details will be
                published here at launch.)
              </p>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.15} className="lg:col-span-4">
          <p className="eyebrow">Media Contact</p>
          <p className="mt-5 leading-relaxed text-umber">
            For interviews, review copies, podcast appearances, and speaking inquiries,
            write to us directly.
          </p>
          <Link to="/contact" className="btn-primary mt-7" data-testid="press-contact-button">
            Contact for media <ArrowRight className="h-4 w-4" />
          </Link>
          <button onClick={pressKit} className="btn-ghost mt-4" data-testid="press-kit-button">
            Request the press kit
          </button>
        </FadeUp>
      </section>

      <section className="bg-cream" data-testid="press-gallery-section">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <FadeUp className="flex items-center gap-3">
            <Image className="h-5 w-5 text-copper" />
            <p className="eyebrow">Artwork &amp; Photos</p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              Illustrations from the book
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-umber">
              Chapter artwork is available for editorial use with credit to
              "Believe Joanie Believe". Right-click to save, or write to us for print-resolution files.
            </p>
          </FadeUp>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((g, i) => (
              <FadeUp key={g.src} delay={i * 0.08}>
                <figure>
                  <div className="overflow-hidden rounded-sm border border-clay">
                    <img src={g.src} alt={g.label} className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                  </div>
                  <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-umber/70">{g.label}</figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8" data-testid="press-appearances-section">
        <FadeUp className="flex items-center gap-3">
          <Mic className="h-5 w-5 text-copper" />
          <p className="eyebrow">Interviews &amp; Appearances</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Coverage begins at launch
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-umber">
            Media interviews, articles, features, and podcast appearances will be collected
            here as they happen. Hosting a show or writing a piece? We'd love to hear from you.
          </p>
          <Link to="/contact" className="btn-ghost mt-8" data-testid="press-invite-button">
            Invite the author <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}
