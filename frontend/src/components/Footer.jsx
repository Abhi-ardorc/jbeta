import { Link } from "react-router-dom";
import { LogoMark } from "@/components/Logo";

export const Footer = () => (
  <footer className="relative overflow-hidden bg-espresso text-linen" data-testid="footer">
    <img
      src="/illustrations/skyline.png"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 w-full opacity-[0.14] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]"
    />
    <div className="relative mx-auto max-w-7xl px-5 pt-24 sm:px-8">
      <p className="eyebrow !text-copper-light">Believe, Joanie, Believe</p>
      <p className="mt-6 max-w-4xl font-serif text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-tight">
        A girl. A game.<br />
        <em className="italic text-copper-light">A town that learns to believe.</em>
      </p>

      <div className="mt-16 grid gap-12 border-t border-linen/10 pt-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-serif text-xl leading-none">
              Believe, <em className="italic text-copper-light">Joanie</em>, Believe
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-linen/60">
            An illustrated novel by Jay. A Lions — thirty-nine hand-drawn chapters set in
            the small town of Millstone, where a girl with a bat teaches everyone the long game.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-copper-light">Explore</p>
          <ul className="space-y-3 text-sm text-linen/70">
            <li><Link className="transition-colors hover:text-copper-light" to="/about" data-testid="footer-link-book">About the Book</Link></li>
            <li><Link className="transition-colors hover:text-copper-light" to="/author" data-testid="footer-link-author">Meet the Author</Link></li>
            <li><Link className="transition-colors hover:text-copper-light" to="/purchase" data-testid="footer-link-purchase">Purchase</Link></li>
            <li><Link className="transition-colors hover:text-copper-light" to="/blog" data-testid="footer-link-blog">Blog</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-copper-light">Connect</p>
          <ul className="space-y-3 text-sm text-linen/70">
            <li><Link className="transition-colors hover:text-copper-light" to="/contact" data-testid="footer-link-contact">Write to the Author</Link></li>
            <li><Link className="transition-colors hover:text-copper-light" to="/reviews" data-testid="footer-link-reviews">Reader Reviews</Link></li>
            <li><Link className="transition-colors hover:text-copper-light" to="/press" data-testid="footer-link-press">Press &amp; Media</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-2 border-t border-linen/10 py-7 text-xs text-linen/45 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Believe, Joanie, Believe · Jay. A Lions. All rights reserved.</span>
        <span>Illustrations from the book · Millstone, wherever home is</span>
      </div>
    </div>
  </footer>
);
