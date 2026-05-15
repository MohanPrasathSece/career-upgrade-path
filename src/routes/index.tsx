import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award, Calendar, CreditCard, Landmark, ShieldCheck, Clock, Users, HeadphonesIcon,
  BriefcaseBusiness, Heart, GraduationCap, BookOpenCheck, Stethoscope, Sparkles,
  ArrowRight, CheckCircle2, Star, Quote, Wallet, ScrollText, Shirt, FileCheck,
} from "lucide-react";
import heroImg from "@/assets/hero-nurse.jpg";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Career Upgrade - Become a Qualified Dental Nurse in the UK" },
      { name: "description", content: "Flexible online dental nursing training with expert tutor support, payment plans and a GDC registration pathway. Apply today." },
      { property: "og:title", content: "Career Upgrade - Online Dental Nursing UK" },
      { property: "og:description", content: "100% pass rate. Start anytime. UK Recognised Qualification." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const trustHighlights = [
  { icon: Award, label: "100% Pass Rate" },
  { icon: Calendar, label: "Start Anytime" },
  { icon: CreditCard, label: "Flexible Payment Plans" },
  { icon: Landmark, label: "Government Funded Options" },
  { icon: ShieldCheck, label: "UK Recognised Qualification" },
];

const whyUs = [
  { icon: Clock, title: "1-Year Flexible Course", desc: "Complete your qualification at a pace that fits your life." },
  { icon: BookOpenCheck, title: "Learn Online Anytime", desc: "Modern e-learning platform available 24/7 on any device." },
  { icon: Users, title: "Tutor & Assessor Support", desc: "Dedicated experts guide you from enrolment to qualification." },
  { icon: BriefcaseBusiness, title: "Work While Studying", desc: "Train as a dental nurse and earn from day one." },
  { icon: HeadphonesIcon, title: "Friendly Customer Service", desc: "A real human is always one message away." },
  { icon: Wallet, title: "Funded & Fee Paying Options", desc: "Government funding or affordable instalment plans." },
];

const careerBenefits = [
  "Register with the UK General Dental Council (GDC)",
  "High-demand healthcare career across the UK",
  "Apprenticeship opportunities available",
  "Earn while you learn",
  "Clear progression to advanced dental roles",
];

const enrollment = [
  { icon: FileCheck, title: "DBS Check Included" },
  { icon: Shirt, title: "Uniform & Scrubs Included" },
  { icon: ScrollText, title: "Exam Fees Included" },
  { icon: ShieldCheck, title: "GDC Registration Support" },
];

const stats = [
  { to: 100, suffix: "%", label: "Pass Rate" },
  { to: 1000, suffix: "+", label: "Students Enrolled" },
  { to: 24, suffix: "/7", label: "Support Available" },
  { to: 365, suffix: "", label: "Days to Study" },
];

const testimonials = [
  { name: "Ayesha K.", role: "Trainee Dental Nurse, Manchester", quote: "The tutors were incredible. I worked at a practice while completing the course and qualified within a year." },
  { name: "James O.", role: "GDC Registered, London", quote: "Career Upgrade made everything simple - from DBS checks to GDC registration. I felt supported the whole way." },
  { name: "Priya S.", role: "Dental Nurse, Birmingham", quote: "Flexible study around my shifts was a game-changer. The platform is modern and easy to use." },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_85%_15%,oklch(0.88_0.19_128/0.45),transparent_60%),radial-gradient(40%_40%_at_5%_90%,oklch(0.62_0.13_235/0.18),transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.05fr_1fr] md:gap-10 md:px-8 md:py-24 lg:py-28">
          <div className="animate-[fade-up_0.7s_ease-out]">
            <SectionEyebrow>UK Dental Nursing Academy</SectionEyebrow>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-balance text-foreground md:text-5xl lg:text-[3.6rem]">
              Become a Fully Qualified <span className="text-primary">Dental Nurse</span> in the UK
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Flexible online learning with expert tutor support, flexible payment plans and a clear pathway to UK GDC registration.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                Book Free Consultation
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-background bg-gradient-to-br from-primary/70 to-lemon" />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-lemon-foreground">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-lemon text-lemon" />)}
                </div>
                <p className="text-muted-foreground">Trusted by 1,000+ UK students</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-primary opacity-25 blur-3xl" />
            <img
              src={heroImg}
              alt="Smiling dental nurse student in scrubs"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card md:aspect-[5/6]"
              width={1536}
              height={1280}
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card/95 p-4 shadow-card backdrop-blur-md md:block">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
                  <Award className="h-5 w-5" />
                </span>
                <div className="text-sm">
                  <p className="font-bold text-foreground">100% Pass Rate</p>
                  <p className="text-xs text-muted-foreground">UK Recognised Qualification</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 hidden rounded-2xl border border-border bg-card/95 p-4 shadow-card backdrop-blur-md md:block">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-lemon/40 text-lemon-foreground">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div className="text-sm">
                  <p className="font-bold text-foreground">Start Anytime</p>
                  <p className="text-xs text-muted-foreground">Enrol within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-y border-border bg-soft">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 py-6 sm:grid-cols-2 md:grid-cols-5 md:px-8">
          {trustHighlights.map((t) => (
            <div key={t.label} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary">
                <t.icon className="h-4 w-4" />
              </span>
              {t.label}
            </div>
          ))}
        </div>
      </div>

      {/* WHY US */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Why Choose Us</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">
            Everything you need to qualify - built around your life
          </h2>
          <p className="mt-4 text-muted-foreground">
            A modern academy with expert support, real flexibility and a track record of qualifying confident dental nurses.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card hover:border-primary/40"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gradient-primary opacity-0 blur-3xl transition group-hover:opacity-15" />
            </div>
          ))}
        </div>
      </Section>

      {/* CAREER BENEFITS */}
      <section className="bg-gradient-soft">
        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionEyebrow>Career Benefits</SectionEyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">
                A career with real demand, security & progression
              </h2>
              <p className="mt-4 text-muted-foreground">
                Dental nursing is one of the UK's most resilient healthcare careers. Once registered, your skills travel with you.
              </p>
              <ul className="mt-8 space-y-3.5">
                {careerBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="font-medium text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-trust/10 text-trust">
                    <Stethoscope className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold">UK GDC Registered Pathway</h3>
                    <p className="text-sm text-muted-foreground">Recognised by employers nationwide</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {enrollment.map((e) => (
                    <div key={e.title} className="rounded-2xl border border-border bg-soft p-4 text-center">
                      <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-lemon/40 text-lemon-foreground">
                        <e.icon className="h-5 w-5" />
                      </span>
                      <p className="mt-2 text-sm font-semibold">{e.title}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-gradient-primary p-5 text-primary-foreground">
                  <p className="text-sm font-semibold uppercase tracking-wider opacity-90">Included free</p>
                  <p className="mt-1 font-display text-xl font-bold">Everything to launch your career</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* STATS */}
      <Section>
        <div className="rounded-[2rem] border border-border bg-gradient-primary p-10 text-primary-foreground shadow-glow md:p-16">
          <div className="grid gap-10 text-center md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl font-bold md:text-6xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider opacity-90">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Student Stories</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">
            Real students. Real qualifications. Real careers.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="relative rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:shadow-card">
              <Quote className="h-7 w-7 text-primary/40" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </div>
                <div className="text-sm">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA BANNER */}
      <Section>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 shadow-card md:p-16">
          <div className="absolute inset-0 -z-10 [background:radial-gradient(60%_60%_at_80%_30%,oklch(0.88_0.19_128/0.5),transparent_60%),radial-gradient(50%_50%_at_10%_80%,oklch(0.62_0.16_152/0.18),transparent_60%)]" />
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <SectionEyebrow>Ready to begin?</SectionEyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">
                Start Your Dental Nursing Journey Today
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Speak with our admissions team and get a personalised plan - including funding options and start dates.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold hover:border-primary hover:text-primary transition">
                Explore Course
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
