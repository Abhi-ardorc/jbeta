import Marquee from "react-fast-marquee";

const ITEMS = ["Believe", "Grit", "Family", "Millstone", "Second Chances", "Hope", "The Long Game"];

export const MarqueeStrip = ({ dark = false }) => (
  <div
    className={`overflow-hidden border-y py-6 ${dark ? "border-linen/10 bg-espresso" : "border-clay bg-cream"}`}
    data-testid="marquee-strip"
  >
    <Marquee speed={28} gradient={false} pauseOnHover>
      {ITEMS.map((item, i) => (
        <span key={i} className="mx-8 flex items-center gap-16">
          <span className={`font-serif text-2xl italic sm:text-3xl ${dark ? "text-linen/85" : "text-espresso/80"}`}>
            {item}
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-copper" aria-hidden="true">
            <path d="M12 2l2.2 6.4L21 10l-6.8 1.6L12 18l-2.2-6.4L3 10l6.8-1.6L12 2z" />
          </svg>
        </span>
      ))}
    </Marquee>
  </div>
);
