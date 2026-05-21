import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Mail, Phone } from "lucide-react";
import GoogleTranslate from "@/components/site/GoogleTranslate";
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

  // Scroll listener to add background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);




  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl shadow-soft border-b border-border/60"
            : "bg-background/40 backdrop-blur-md"
        }`}
      >
        {/* Top Contact Bar */}
        <div className="w-full bg-primary text-primary-foreground text-xs py-1">
          <div className="mx-auto relative flex max-w-7xl items-center justify-center px-5 md:px-8 min-h-[28px]">
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <a href="mailto:info@careerupgrade.com" className="flex items-center gap-1.5 hover:opacity-80 transition">
                <Mail className="h-3.5 w-3.5" />
                <span>info@careerupgrade.com</span>
              </a>
              <a href="tel:+447944624039" className="flex items-center gap-1.5 hover:opacity-80 transition">
                <Phone className="h-3.5 w-3.5" />
                <span>+44 7944 624039</span>
              </a>
            </div>
            {/* Language Switcher */}

          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => {
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
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
                Online Dental Nursing School
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
                inactiveProps={{
                  className: "text-foreground/75 hover:text-primary hover:bg-secondary/60",
                }}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                onClick={() => {
                  if (window.location.pathname === l.to) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
            {/* Language Switcher (single instance) */}
            <GoogleTranslate />
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow hover:-translate-y-0.5"
              onClick={() => {
                if (window.location.pathname === "/contact") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Apply Now
            </Link>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background lg:hidden transition-transform active:scale-95"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-5 w-5 animate-in fade-in spin-in duration-200" />
            ) : (
              <Menu className="h-5 w-5 animate-in fade-in duration-200" />
            )}
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-50 flex h-screen w-screen flex-col bg-white backdrop-blur-2xl lg:hidden animate-[fade-in_0.15s_ease-out]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.98)" }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
            <Link
              to="/"
              onClick={() => {
                setOpen(false);
                if (window.location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2.5 group"
            >
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
                  Online Dental Nursing School
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
                onClick={() => {
                  setOpen(false);
                  if (window.location.pathname === l.to) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary scale-110 font-bold" }}
                inactiveProps={{ className: "text-foreground/85 hover:text-primary" }}
                className="text-lg font-display font-medium transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => {
                setOpen(false);
                if (window.location.pathname === "/contact") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="mt-6 w-full max-w-[280px] inline-flex items-center justify-center rounded-full bg-gradient-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-glow hover:-translate-y-0.5 transition duration-300"
            >
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
