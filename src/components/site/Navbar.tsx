import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/icon.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About & Support" },
  { to: "/courses", label: "Courses & Funding" },
  { to: "/faq", label: "FAQ & Support" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl shadow-soft border-b border-border/60"
          : "bg-background/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logoImg}
            alt="Career Upgrade Logo"
            className="h-10 w-10 object-contain rounded-xl shadow-soft transition-transform group-hover:scale-105"
          />
          <span className="leading-tight">
            <span className="block font-display text-base font-bold text-foreground md:text-lg">
              Career Upgrade
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-primary md:text-[11px]">
              Online Dental Nursing
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary bg-secondary" }}
              inactiveProps={{ className: "text-foreground/75 hover:text-primary hover:bg-secondary/60" }}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow hover:-translate-y-0.5"
          >
            Apply Now
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background lg:hidden transition-transform active:scale-95"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5 animate-in fade-in spin-in duration-200" /> : <Menu className="h-5 w-5 animate-in fade-in duration-200" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-2xl lg:hidden animate-fade-in animate-duration-300">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 group">
              <img
                src={logoImg}
                alt="Career Upgrade Logo"
                className="h-10 w-10 object-contain rounded-xl shadow-soft"
              />
              <span className="leading-tight">
                <span className="block font-display text-base font-bold text-foreground">
                  Career Upgrade
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
                  Online Dental Nursing
                </span>
              </span>
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-secondary/85 text-foreground hover:bg-secondary transition active:scale-95"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-10">
            {links.map((l, index) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary scale-110 font-bold" }}
                inactiveProps={{ className: "text-foreground/85 hover:text-primary" }}
                className="text-2xl font-display font-medium transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 w-full max-w-[280px] inline-flex items-center justify-center rounded-full bg-gradient-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-glow hover:-translate-y-0.5 transition duration-300"
            >
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
