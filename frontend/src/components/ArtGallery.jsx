import { FadeUp } from "@/components/Reveal";

const ART = [
  { src: "/illustrations/ch01.jpg", label: "Chapter 1 — Where it begins", span: "md:col-span-3" },
  { src: "/illustrations/ch07.jpg", label: "Chapter 7 — The family portrait", span: "md:col-span-3" },
  { src: "/illustrations/ch21.jpg", label: "Chapter 21 — The brothers", span: "md:col-span-2" },
  { src: "/illustrations/ch23.jpg", label: "Chapter 23 — The Gazette", span: "md:col-span-2" },
  { src: "/illustrations/ch37.jpg", label: "Chapter 37 — The night road", span: "md:col-span-2" },
  { src: "/illustrations/ch06.jpg", label: "Chapter 6 — The dark inning", span: "md:col-span-3" },
  { src: "/illustrations/ch39.jpg", label: "Chapter 39 — The long game", span: "md:col-span-3" },
];

export const ArtGallery = () => (
  <section className="bg-[#131827] text-linen" data-testid="art-gallery-section">
    <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <FadeUp>
        <p className="eyebrow !text-copper-light">Artwork &amp; Photos</p>
        <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          Illustrations from the book
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-linen/70">
          Thirty-nine chapters, each one drawn by hand. A first look at the art of Millstone —
          hover any piece to see where it lives in the story.
        </p>
      </FadeUp>
      <div className="mt-14 grid gap-5 md:grid-cols-6" data-testid="art-gallery-grid">
        {ART.map((a, i) => (
          <FadeUp key={a.src} delay={(i % 3) * 0.1} className={`group relative overflow-hidden rounded-sm ${a.span}`}>
            <img
              src={a.src}
              alt={a.label}
              className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131827]/95 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="absolute bottom-0 translate-y-2 p-4 text-xs uppercase tracking-[0.2em] text-linen/90 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {a.label}
            </p>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);
