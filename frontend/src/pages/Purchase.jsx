import { toast } from "sonner";
import { Book, Tablet, Headphones } from "lucide-react";
import { MaskedLines, FadeUp } from "@/components/Reveal";
import { BookCover } from "@/components/BookCover";
import { NewsletterForm } from "@/components/NewsletterForm";

const FORMATS = [
  { icon: Book, name: "Hardcover", note: "Illustrated throughout, jacketed edition" },
  { icon: Book, name: "Paperback", note: "The take-it-everywhere edition" },
  { icon: Tablet, name: "eBook", note: "Full-color illustrations on any device" },
  { icon: Headphones, name: "Audiobook", note: "Narrated edition, details to come" },
];

const RETAILERS = ["Amazon", "Barnes & Noble", "Bookshop.org", "Your local bookstore"];

export default function Purchase() {
  const comingSoon = (name) =>
    toast(`${name} link goes live at launch — join the list below and we'll tell you first.`);

  return (
    <div data-testid="purchase-page">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:pt-28">
        <p className="eyebrow" data-testid="purchase-kicker">Purchase the Book</p>
        <h1 className="mt-6 font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-tight">
          <MaskedLines lines={[<>Bring</>, <><em className="italic text-copper">Joanie</em> home</>]} />
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-16 px-5 pb-28 sm:px-8 lg:grid-cols-12">
        <FadeUp className="lg:col-span-5">
          <div className="mx-auto max-w-sm lg:sticky lg:top-28">
            <BookCover />
          </div>
        </FadeUp>
        <div className="lg:col-span-7">
          <FadeUp>
            <p className="eyebrow">Formats</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              Every way to read her
            </h2>
          </FadeUp>
          <div className="mt-10 divide-y divide-clay border-y border-clay" data-testid="formats-list">
            {FORMATS.map((f, i) => (
              <FadeUp key={f.name} delay={i * 0.08}>
                <div className="flex items-center gap-5 py-5">
                  <f.icon className="h-6 w-6 shrink-0 text-copper" />
                  <div>
                    <p className="font-serif text-2xl text-espresso">{f.name}</p>
                    <p className="text-sm text-umber">{f.note}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-copper-light px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-copper-dark">
                    At launch
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-14">
            <p className="eyebrow">Where to Buy</p>
            <div className="mt-6 flex flex-wrap gap-4" data-testid="retailers-list">
              {RETAILERS.map((r) => (
                <button
                  key={r}
                  onClick={() => comingSoon(r)}
                  className="btn-ghost"
                  data-testid={`retailer-${r.toLowerCase().replace(/[^a-z]/g, "-")}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-umber">
              Retailer links are placeholders and will go live when the book launches.
              Pricing will be announced with pre-orders.
            </p>
          </FadeUp>

          <FadeUp delay={0.25} className="mt-14 rounded-sm border border-clay bg-cream p-9" data-testid="preorder-card">
            <p className="eyebrow">Pre-order Updates</p>
            <h3 className="mt-4 font-serif text-3xl text-espresso">Be first in line.</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-umber">
              Leave your email and we'll write the moment pre-orders open — with any
              launch promotions and signed-edition news included.
            </p>
            <div className="mt-6">
              <NewsletterForm testId="purchase-newsletter" />
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
