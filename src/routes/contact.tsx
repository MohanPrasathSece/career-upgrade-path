import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Section, SectionEyebrow, PageHero } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";
import contactImg from "@/assets/images/team_of_nurses.png";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Career Upgrade Online Dental School - Speak With Admissions" },
      {
        name: "description",
        content:
          "Get in touch with our friendly UK admissions team. Phone, WhatsApp, email and a quick contact form to start your dental nursing journey.",
      },
      { property: "og:title", content: "Contact Career Upgrade Online Dental School" },
      { property: "og:description", content: "Speak with our admissions team today." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const info = [
  { icon: Phone, label: "Phone", value: "07944 624 039", href: "tel:+447944624039" },
  {
    icon: Mail,
    label: "Email",
    value: "admissions@careerupgrade.uk",
    href: "mailto:admissions@careerupgrade.uk",
  },
  { icon: MapPin, label: "Address", value: "Capital Office, 124 City Road, London, EC1V 2NX" },
  { icon: Clock, label: "Working Hours", value: "Mon–Fri · 9:00 – 18:00" },
];

function Contact() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "Dental Nursing - 1 Year",
    message: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || form.message.trim().length < 5) return;

    setIsSending(true);
    setError(null);
    try {
      const subject = `New Enquiry from ${form.name}`;
      const body = `Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Course Interest: ${form.course}

Message:
${form.message}`;

      const mailtoUrl = `mailto:admissions@careerupgrade.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      setSent(true);
      setTimeout(() => setSent(false), 6000);
      setForm({ name: "", email: "", phone: "", course: "Dental Nursing - 1 Year", message: "" });
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="We're here to help"
        title="Contact Career Upgrade Online Dental School"
        subtitle="Speak with our friendly admissions team about funding, start dates and everything you need to know about becoming a UK dental nurse."
        image={contactImg}
      />

      {/* Info cards */}
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {info.map((c) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <c.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-primary">
                  {c.label}
                </p>
                <p className="mt-1 font-display font-bold text-foreground">{c.value}</p>
              </>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card hover:border-primary/40"
              >
                {inner}
              </a>
            ) : (
              <div
                key={c.label}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Form + map */}
      <Section className="!pt-0">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-10">
            <SectionEyebrow>Send us a message</SectionEyebrow>
            <h2 className="mt-4 font-display text-[22px] font-bold md:text-3xl">
              We typically reply within 1 working hour
            </h2>

            <form onSubmit={onSubmit} className="mt-7 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name" required>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    placeholder="Jane Smith"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    required
                    maxLength={150}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input"
                    placeholder="you@email.com"
                  />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Phone Number">
                  <input
                    type="tel"
                    maxLength={20}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input"
                    placeholder="07XXX XXXXXX"
                  />
                </Field>
                <Field label="Course Interest">
                  <select
                    value={form.course}
                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                    className="input"
                  >
                    <option>Dental Nursing - 1 Year</option>

                    <option>Government Funded Route</option>
                    <option>Just exploring</option>
                  </select>
                </Field>
              </div>
              <Field label="Message" required>
                <textarea
                  required
                  maxLength={1000}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input resize-none"
                  placeholder="Tell us a little about yourself and your goals…"
                />
              </Field>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  disabled={isSending}
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition disabled:opacity-70 disabled:hover:-translate-y-0 disabled:hover:shadow-soft"
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {isSending ? "Sending..." : "Send Enquiry"}
                </button>
                <a
                  href="https://wa.me/447944624039?text=Hi%20Career%20Upgrade%2C%20I%27m%20interested%20in%20your%20Dental%20Nursing%20course."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold hover:border-primary hover:text-primary transition"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>

              {error && (
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm font-medium text-destructive">
                  {error}
                </div>
              )}

              {sent && (
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-primary/30 bg-secondary p-4 text-sm font-medium text-primary">
                  <CheckCircle2 className="h-5 w-5" /> Thanks - we've received your enquiry and will
                  reply shortly.
                </div>
              )}
            </form>
          </div>

          <div className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <iframe
                title="Career Upgrade office location"
                src="https://www.google.com/maps?q=124+City+Road%2C+London%2C+EC1V+2NX&output=embed"
                className="h-[340px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-3xl border border-border bg-gradient-soft p-7 shadow-soft">
              <h3 className="font-display text-xl font-bold">Quick response, real humans</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our admissions team replies within 1 working hour during opening times. For urgent
                enquiries, message us on WhatsApp.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Free 1:1 consultation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Personalised funding plan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> No obligation, ever
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 text-primary-foreground shadow-glow md:p-16">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-lemon/40 blur-3xl" />
          <div className="relative text-center">
            <h2 className="font-display text-3xl font-bold text-balance md:text-4xl">
              Speak With Our Admissions Team Today
            </h2>
            <p className="mt-4 opacity-90">
              Call us, message us, or send the form - we're ready to help you start.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="tel:+447944624039"
                className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-semibold text-primary shadow-soft hover:-translate-y-0.5 transition"
              >
                <Phone className="h-4 w-4" /> Call Admissions
              </a>
              <a
                href="https://wa.me/447944624039?text=Hi%20Career%20Upgrade%2C%20I%27m%20interested%20in%20your%20Dental%20Nursing%20course."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-white/20 transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.85rem;
          border: 1px solid var(--border);
          background: var(--soft);
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input:focus {
          border-color: var(--primary);
          background: var(--card);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--primary) 14%, transparent);
        }
      `}</style>
    </SiteLayout>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground/85">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}
