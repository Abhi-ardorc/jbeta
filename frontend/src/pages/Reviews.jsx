import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MaskedLines, FadeUp } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", quote: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API}/reviews`).then((r) => setReviews(r.data)).catch(() => {});
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const featured = reviews.filter((r) => r.featured);
  const rest = reviews.filter((r) => !r.featured);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/reviews`, form);
      toast.success("Thank you — your words will appear here once reviewed.");
      setForm({ name: "", location: "", quote: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="reviews-page">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:pt-28">
        <p className="eyebrow" data-testid="reviews-kicker">Reader Reviews &amp; Commentary</p>
        <h1 className="mt-6 font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-tight">
          <MaskedLines lines={[<>Words from</>, <><em className="italic text-copper">the readers</em></>]} />
        </h1>
      </section>

      {featured.length > 0 && (
        <section className="bg-espresso text-linen" data-testid="featured-review-section">
          <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
            <FadeUp>
              <p className="eyebrow">Featured Review</p>
              <blockquote className="mt-8 font-serif text-3xl leading-snug tracking-tight sm:text-4xl sm:leading-[1.2]">
                "{featured[0].quote}"
              </blockquote>
              <p className="mt-8 text-sm uppercase tracking-[0.3em] text-linen/60">
                {featured[0].name}{featured[0].location ? ` · ${featured[0].location}` : ""}
              </p>
            </FadeUp>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-px overflow-hidden rounded-sm border border-clay bg-clay md:grid-cols-2 lg:grid-cols-3" data-testid="reviews-grid">
          {[...featured.slice(1), ...rest].map((r, i) => (
            <FadeUp key={r.id || i} delay={i * 0.08} className="bg-linen p-9">
              <span className="font-serif text-5xl leading-none text-copper">"</span>
              <p className="mt-2 font-serif text-xl leading-relaxed text-espresso">{r.quote}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-umber">
                {r.name}{r.location ? ` · ${r.location}` : ""}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-cream" data-testid="review-form-section">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <p className="eyebrow">Add Your Voice</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              What did Joanie stir in you?
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-umber">
              Share your thoughts or a personal story the book inspired. Submissions are
              reviewed before they appear. You can also leave a public review on Amazon or
              Barnes &amp; Noble once the book is live.
            </p>
          </FadeUp>
          <FadeUp delay={0.15} className="lg:col-span-7">
            <form onSubmit={submit} className="space-y-9" data-testid="review-form">
              <div className="grid gap-9 sm:grid-cols-2">
                <div>
                  <label htmlFor="review-name" className="eyebrow !tracking-[0.2em]">Name</label>
                  <input id="review-name" required value={form.name} onChange={set("name")} className="field mt-2" placeholder="First name is fine" data-testid="review-name-input" />
                </div>
                <div>
                  <label htmlFor="review-location" className="eyebrow !tracking-[0.2em]">Where you read</label>
                  <input id="review-location" value={form.location} onChange={set("location")} className="field mt-2" placeholder="City, State (optional)" data-testid="review-location-input" />
                </div>
              </div>
              <div>
                <label htmlFor="review-quote" className="eyebrow !tracking-[0.2em]">Your words</label>
                <textarea id="review-quote" required rows={5} value={form.quote} onChange={set("quote")} className="field mt-2 resize-none" placeholder="What the book meant to you…" data-testid="review-quote-input" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary" data-testid="review-submit-button">
                {loading ? "Sending…" : "Submit your review"}
              </button>
            </form>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
