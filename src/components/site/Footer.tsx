import { Link } from "@tanstack/react-router";
import { GraduationCap, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-soft">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-bold">Career Upgrade</span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                  Online Dental Nursing
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Upgrade Your Future in Dental Nursing. Flexible, expert-led online training with a UK GDC pathway.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/70 transition hover:border-primary hover:text-primary hover:-translate-y-0.5"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary">About & Support</Link></li>
              <li><Link to="/courses" className="hover:text-primary">Courses & Funding</Link></li>
              <li><Link to="/faq" className="hover:text-primary">FAQ & Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="tel:+442045381200" className="flex items-start gap-2.5 hover:text-primary transition">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <span>+44 20 4538 1200</span>
                </a>
              </li>
              <li>
                <a href="mailto:admissions@careerupgrade.uk" className="flex items-start gap-2.5 hover:text-primary transition">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <span>admissions@careerupgrade.uk</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>71-75 Shelton Street, London, WC2H 9JQ</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Stay informed</h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Get course updates and funding deadlines in your inbox.
            </p>
            <form className="mt-4 flex overflow-hidden rounded-full border border-border bg-card focus-within:border-primary">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none"
              />
              <button
                type="button"
                className="bg-gradient-primary px-4 text-sm font-semibold text-primary-foreground"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Career Upgrade. All rights reserved.</p>
          <div className="flex flex-col items-center gap-1 md:items-end">
            <p>UK Recognised Qualification · GDC Registration Pathway</p>
            <p>
              Developed by{" "}
              <a href="https://zyradigitals.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                Zyra Digitals
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
