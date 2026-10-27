import { Link } from "react-router-dom";
import { LogoMark } from "@/components/Logo";

export const Footer = () => (
  <footer className="border-t border-clay bg-cream" data-testid="footer">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
      <div className="md:col-span-5">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="font-serif text-xl leading-none">
            Believe <em className="italic text-copper">Joanie</em> Believe
          </span>
        </div>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-umber">
          An illustrated novel of grit, grief, and the unshakable power of believing —
          set in the small town of Millstone, where a girl with a bat teaches everyone
          the long game.
        </p>
      </div>
      <div className="md:col-span-3">
        <p className="eyebrow mb-5">Explore</p>
        <ul className="space-y-3 text-sm text-umber">
          <li><Link className="transition-colors hover:text-copper" to="/about" data-testid="footer-link-book">About the Book</Link></li>
          <li><Link className="transition-colors hover:text-copper" to="/author" data-testid="footer-link-author">Meet the Author</Link></li>
          <li><Link className="transition-colors hover:text-copper" to="/purchase" data-testid="footer-link-purchase">Purchase</Link></li>
          <li><Link className="transition-colors hover:text-copper" to="/blog" data-testid="footer-link-blog">Blog</Link></li>
        </ul>
      </div>
      <div className="md:col-span-4">
        <p className="eyebrow mb-5">Connect</p>
        <ul className="space-y-3 text-sm text-umber">
          <li><Link className="transition-colors hover:text-copper" to="/contact" data-testid="footer-link-contact">Write to the Author</Link></li>
          <li><Link className="transition-colors hover:text-copper" to="/reviews" data-testid="footer-link-reviews">Reader Reviews</Link></li>
          <li><Link className="transition-colors hover:text-copper" to="/press" data-testid="footer-link-press">Press &amp; Media</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-clay">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-umber/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>© 2026 Believe Joanie Believe. All rights reserved.</span>
        <span>Illustrations from the book · Millstone, wherever home is</span>
      </div>
    </div>
  </footer>
);
