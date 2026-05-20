import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import logoImg from "@/assets/icon.png";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5"
              onClick={() => {
                if (window.location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <img
                src={logoImg}
                alt="Career Upgrade Logo"
                className="h-11 w-11 object-contain rounded-xl shadow-soft"
              />
              <span className="leading-tight">
                <span className="block font-display text-lg font-bold">Career Upgrade</span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                  Online Dental School
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Upgrade Your Future in Dental Nursing. Flexible, expert-led online training with a UK
              GDC pathway.
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
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About & Support" },
                { to: "/courses", label: "Courses & Funding" },
                { to: "/faq", label: "FAQ & Support" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="hover:text-primary"
                    onClick={() => {
                      if (window.location.pathname === l.to) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:+447944624039"
                  className="flex items-start gap-2.5 hover:text-primary transition"
                >
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <span>07944 624 039</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@careerupgradedentalschool.co.uk"
                  className="flex items-start gap-2.5 hover:text-primary transition"
                >
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <span>info@careerupgradedentalschool.co.uk</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>Capital Office, 124 City Road, London, EC1V 2NX</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Partnership
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Career Upgrade is proud to work in partnership with{" "}
              <a
                href="https://impactmeglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Impactmeglobal
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Career Upgrade. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a
              href="https://zyradigitals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Zyra Digitals
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
