import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MaskedLines, FadeUp } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TOPICS = ["A message for the author", "My story", "A question", "Media & speaking"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "", allow_publish: false });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Your words are on their way. Thank you for writing.");
      setForm({ name: "", email: "", topic: TOPICS[0], message: "", allow_publish: false });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 pt-20 sm:px-8 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-5">
          <p className="eyebrow" data-testid="contact-kicker">Write to the Author</p>
          <h1 className="mt-6 font-serif text-[clamp(2.6rem,5.5vw,4.5rem)] font-medium leading-[0.98] tracking-tight">
            <MaskedLines lines={[<>Your story matters.</>, <><em className="italic text-copper">Share it with us.</em></>]} />
          </h1>
          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-umber">
              Send a message, share what the book stirred in you, tell your own story, or
              ask anything at all. Every note is read — truly.
            </p>
            <div className="mt-12 overflow-hidden rounded-sm border border-clay">
              <img src="/illustrations/ch39.jpg" alt="Joanie at the ballfield, Chapter 39 illustration" className="h-full w-full object-cover" />
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="lg:col-span-7 lg:pt-10">
          <form onSubmit={submit} className="space-y-9" data-testid="contact-form">
            <div className="grid gap-9 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="eyebrow !tracking-[0.2em]">Name</label>
                <input id="contact-name" required value={form.name} onChange={set("name")} className="field mt-2" placeholder="Your name" data-testid="contact-name-input" />
              </div>
              <div>
                <label htmlFor="contact-email" className="eyebrow !tracking-[0.2em]">Email</label>
                <input id="contact-email" type="email" required value={form.email} onChange={set("email")} className="field mt-2" placeholder="you@example.com" data-testid="contact-email-input" />
              </div>
            </div>
            <div>
              <label htmlFor="contact-topic" className="eyebrow !tracking-[0.2em]">This is…</label>
              <select id="contact-topic" value={form.topic} onChange={set("topic")} className="field mt-2 cursor-pointer" data-testid="contact-topic-select">
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="eyebrow !tracking-[0.2em]">Your words</label>
              <textarea id="contact-message" required rows={6} value={form.message} onChange={set("message")} className="field mt-2 resize-none" placeholder="Dear author…" data-testid="contact-message-input" />
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-umber" data-testid="contact-publish-label">
              <input type="checkbox" checked={form.allow_publish} onChange={set("allow_publish")} className="mt-0.5 h-4 w-4 accent-copper" data-testid="contact-publish-checkbox" />
              You may share my words (first name only) in the reader reviews section.
            </label>
            <button type="submit" disabled={loading} className="btn-primary" data-testid="contact-submit-button">
              {loading ? "Sending…" : "Send your words"}
            </button>
          </form>
        </FadeUp>
      </section>
    </div>
  );
}
