import { createFileRoute } from "@tanstack/react-router";
import "./contact.css";
import { useState } from "react";
import {
  Phone, MessageCircle, Send, CheckCircle2, Loader2, X,
} from "lucide-react";
import { Section, SectionEyebrow, PageHero } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";
import applyImg from "@/assets/images/courses_hero_dental.png";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply Now - Career Upgrade Online Dental Nursing School" },
      {
        name: "description",
        content: "Apply for the UK Dental Nursing course. Fill in your details and our admissions team will be in touch within 1 working hour.",
      },
      { property: "og:title", content: "Apply Now - Career Upgrade Online Dental Nursing School" },
      { property: "og:description", content: "Start your dental nursing journey today." },
      { property: "og:url", content: "/apply" },
    ],
    links: [{ rel: "canonical", href: "/apply" }],
  }),
  component: ApplyPage,
});

const COURSES = [
  "Dental Nursing - 1 Year",
  "Government Funded Route",
  "Other / Not sure",
];

const START_OPTIONS = [
  "As soon as possible",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
  "Just exploring",
];

function ApplyPage() {
  const [sent, setSent] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    course: "" as string,
    funding_type: "" as "Government Funded" | "Fee Paying" | "",
    when_to_start: "",
    additional_info: "",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill out all required fields.");
      return;
    }
    if (!form.funding_type) {
      setError("Please select a funding type.");
      return;
    }
    setIsSending(true);
    setError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmittedName(form.full_name);
      setSent(true);
      setForm({
        full_name: "", email: "", phone: "", address: "",
        date_of_birth: "", course: "", funding_type: "", when_to_start: "", additional_info: "",
      });
    } catch {
      setError("Failed to submit your application. Please try WhatsApp or email us directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SiteLayout>
      {/* Success Modal */}
      {sent && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={() => setSent(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSent(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground hover:bg-secondary transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-gradient-primary shadow-glow">
              <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Application Received!</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Thank you, <span className="font-semibold text-foreground">{submittedName}</span>. Our admissions team will review your application and contact you within{" "}
              <span className="font-semibold text-primary">1 working hour</span>.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 w-full rounded-full bg-gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <PageHero
        eyebrow="Start Your Journey"
        title="Apply for the UK Dental Nursing Course"
        subtitle="Complete the form below and our admissions team will be in touch within 1 working hour to guide you through the next steps."
        image={applyImg}
      />

      {/* Form + sidebar */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Form card */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-10">
            <SectionEyebrow>Course Application</SectionEyebrow>
            <h2 className="mt-4 font-display text-[22px] font-bold md:text-3xl">
              We typically reply within 1 working hour
            </h2>

            <form onSubmit={onSubmit} className="mt-7 grid gap-4">

              {/* Personal */}
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name" required>
                  <input type="text" required maxLength={100} value={form.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                    className="input" placeholder="Jane Smith" />
                </Field>
                <Field label="Date of Birth">
                  <input type="date" value={form.date_of_birth}
                    onChange={(e) => set("date_of_birth", e.target.value)}
                    className="input" />
                </Field>
              </div>

              {/* Contact */}
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Email Address" required>
                  <input type="email" required maxLength={150} value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="input" placeholder="you@email.com" />
                </Field>
                <Field label="Phone Number" required>
                  <input type="tel" required maxLength={20} value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="input" placeholder="07XXX XXXXXX" />
                </Field>
              </div>

              <Field label="Home Address">
                <input type="text" maxLength={250} value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  className="input" placeholder="123 Example Street, London, EC1V 2NX" />
              </Field>

              {/* Course */}
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Course" required>
                  <select value={form.course} onChange={(e) => set("course", e.target.value)} className="input" required>
                    <option value="">Select a course...</option>
                    {COURSES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="When do you want to start?">
                  <select value={form.when_to_start} onChange={(e) => set("when_to_start", e.target.value)} className="input">
                    <option value="">Select...</option>
                    {START_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
              </div>

              {/* Funding type */}
              <Field label="Funding Type" required>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {(["Government Funded", "Fee Paying"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => set("funding_type", type)}
                      className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                        form.funding_type === type
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <div className={`h-4 w-4 rounded-full border-2 mb-2 transition-colors ${
                        form.funding_type === type ? "border-primary bg-primary" : "border-border"
                      }`} />
                      <p className="font-semibold text-sm text-foreground">{type}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {type === "Government Funded"
                          ? "AEB / Skills Bootcamp funded"
                          : "Self-funded or employer-funded"}
                      </p>
                    </button>
                  ))}
                </div>
              </Field>

              {/* Additional Info */}
              <Field label="Additional Information">
                <textarea maxLength={1000} rows={4} value={form.additional_info}
                  onChange={(e) => set("additional_info", e.target.value)}
                  className="input resize-none"
                  placeholder="Tell us about your background, experience, and goals…" />
              </Field>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  disabled={isSending}
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:shadow-glow hover:-translate-y-1 hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-soft disabled:hover:brightness-100"
                >
                  {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {isSending ? "Submitting..." : "Submit Application"}
                </button>
                <a
                  href="https://wa.me/447944624039?text=Hi%20Career%20Upgrade%2C%20I%27d%20like%20to%20apply%20for%20the%20Dental%20Nursing%20course."
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

              <p className="text-xs text-muted-foreground">
                By submitting this form you agree to our{" "}
                <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a>.
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl border border-border bg-gradient-soft p-7 shadow-soft">
              <h3 className="font-display text-xl font-bold">What happens next?</h3>
              <ul className="mt-5 space-y-4 text-sm">
                {[
                  { step: "1", text: "We review your application within 1 working hour" },
                  { step: "2", text: "Our admissions team calls you to discuss your options" },
                  { step: "3", text: "We confirm your funding route and start date" },
                  { step: "4", text: "You enrol and begin your dental nursing journey" },
                ].map((s) => (
                  <li key={s.step} className="flex items-start gap-3">
                    <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-gradient-primary text-[11px] font-bold text-primary-foreground">
                      {s.step}
                    </span>
                    <span className="text-foreground/80 leading-relaxed">{s.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-gradient-soft p-7 shadow-soft">
              <h3 className="font-display text-xl font-bold">Need help applying?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our admissions team is happy to walk you through the application over the phone or WhatsApp.
              </p>
              <div className="mt-5 space-y-3">
                <a href="tel:+447944624039" className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 text-sm font-semibold hover:border-primary hover:text-primary transition">
                  <Phone className="h-4 w-4 text-primary" /> 07944 624 039
                </a>
                <a
                  href="https://wa.me/447944624039?text=Hi%20Career%20Upgrade%2C%20I%27d%20like%20to%20apply%20for%20the%20Dental%20Nursing%20course."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 text-sm font-semibold hover:border-primary hover:text-primary transition"
                >
                  <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp Us
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-gradient-soft p-7 shadow-soft">
              <h3 className="font-display text-xl font-bold">Requirements</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "Living in the UK",
                  "Aged 16 or over",
                  "Passion for dental nursing",
                  "No prior experience required",
                ].map((r) => (
                  <li key={r} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground/80">{r}</span>
                  </li>
                ))}
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
              Ready to Start Your Dental Nursing Career?
            </h2>
            <p className="mt-4 opacity-90">
              Apply above, call us, or message us on WhatsApp — we're ready to help you start.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="tel:+447944624039" className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-semibold text-primary shadow-soft hover:-translate-y-0.5 transition">
                <Phone className="h-4 w-4" /> Call Admissions
              </a>
              <a
                href="https://wa.me/447944624039?text=Hi%20Career%20Upgrade%2C%20I%27d%20like%20to%20apply%20for%20the%20Dental%20Nursing%20course."
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
    </SiteLayout>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground/85">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}
