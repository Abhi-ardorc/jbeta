import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/Logo";

const LINKS = [
  { to: "/about", label: "The Book" },
  { to: "/author", label: "Author" },
  { to: "/purchase", label: "Purchase" },
  { to: "/blog", label: "Blog" },
  { to: "/reviews", label: "Reviews" },
  { to: "/press", label: "Press" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-clay/70 bg-linen/85 backdrop-blur-md" data-testid="navbar">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3" data-testid="nav-logo" onClick={() => setOpen(false)}>
          <LogoMark />
          <span className="hidden font-serif text-lg leading-none sm:block">
            Believe <em className="italic text-copper">Joanie</em> Believe
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" data-testid="nav-links">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors duration-300 hover:text-copper ${
                  isActive ? "text-copper" : "text-umber"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary !px-5 !py-2.5" data-testid="nav-cta-write">
            Write to the Author
          </Link>
        </nav>

        <button
          className="lg:hidden text-espresso"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          data-testid="nav-menu-toggle"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key={location.pathname}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-clay/70 lg:hidden"
            data-testid="nav-mobile-menu"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-2 font-serif text-2xl text-espresso"
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 w-fit"
                data-testid="nav-mobile-cta-write"
              >
                Write to the Author
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
