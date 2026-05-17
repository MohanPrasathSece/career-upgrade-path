import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Target, Users, MessageSquare, CalendarRange, HandHeart, ClipboardCheck, GraduationCap, ArrowRight, CheckCircle2, Sparkles, ShieldCheck, BookOpen } from "lucide-react";
import aboutImg from "@/assets/images/teamnew.jpeg";
import { Section, SectionEyebrow, PageHero } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Student Support - Career Upgrade" },
      { name: "description", content: "Discover Career Upgrade - a UK online dental nursing training. Learn how our tutors, assessors and customer service team support every student." },
      { property: "og:title", content: "About & Student Support - Career Upgrade" },
      { property: "og:description", content: "Supporting you every step of the way to becoming a qualified UK dental nurse." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const support = [
  { icon: Users, title: "Dedicated Tutor Support", desc: "Subject experts available throughout your training." },
  { icon: ClipboardCheck, title: "Assessor Guidance", desc: "Workplace assessors guide your portfolio and observations." },
  { icon: MessageSquare, title: "Friendly Customer Service", desc: "Real humans, fast replies - by phone, email or WhatsApp." },
  { icon: CalendarRange, title: "Flexible Learning Schedule", desc: "Study around shifts, family or other commitments." },
  { icon: HandHeart, title: "One-to-One Assistance", desc: "Personalised coaching whenever you need it." },
  { icon: ShieldCheck, title: "Wellbeing First", desc: "Mental health and study-life balance built into our approach." },
];

const steps = [
  { title: "Apply Online", desc: "A simple 5-minute application - no upfront commitment." },
  { title: "Speak with Admissions", desc: "Free consultation about funding, start dates and goals." },
  { title: "Start Course Anytime", desc: "Begin within days on our modern e-learning platform." },
  { title: "Complete Assessments", desc: "Build your portfolio with assessor guidance." },
  { title: "Become Qualified", desc: "Receive your UK qualification and register with the GDC." },
];

const trustReasons = [
  "Flexible study options that fit your real life",
  "Professional support team with healthcare backgrounds",
  "Career-focused training, not generic content",
  "Modern online platform on any device",
];

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Career Upgrade"
        title="Supporting You Every Step of the Way"
        subtitle="We're a dedicated UK online dental nursing training on a mission to make qualifying as a dental nurse simple, supported and accessible to everyone."
        image={aboutImg}
      />

      {/* About text */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Who we are</SectionEyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            A modern training built around you
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Career Upgrade is an online dental nursing training for UK students aged 16+. We combine flexible online learning with real tutor and assessor support, leading to a qualification and a clear pathway to General Dental Council registration. Whether you're starting out, switching careers, or already working in a practice - we'll meet you where you are.
          </p>
        </div>
      </Section>

      {/* Mission / Vision */}
      <Section className="!py-0">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, label: "Our Mission", title: "Open dental nursing to everyone in the UK", desc: "Remove barriers to qualifying - through flexible delivery, transparent costs and human support that doesn't disappear after enrolment." },
            { icon: Compass, label: "Our Vision", title: "The most trusted online dental training in the UK", desc: "A future where qualified dental nurses come from every background and every postcode - equipped with confidence and modern skills." },
          ].map((c) => (
            <div key={c.label} className="rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:shadow-card hover:-translate-y-1 md:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <c.icon className="h-5 w-5" />
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-primary">{c.label}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Support */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Student Support</SectionEyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            Real people. Real support. Whenever you need it.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {support.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card hover:border-primary/40">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How learning works */}
      <section className="bg-gradient-soft">
        <Section>
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>How Learning Works</SectionEyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
              From application to qualified - in 5 clear steps
            </h2>
          </div>
          <div className="relative mt-14">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-lemon to-primary md:left-1/2 md:block" />
            <ol className="space-y-6">
              {steps.map((step, i) => (
                <li key={step.title} className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`md:${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                      <div className="flex items-center gap-3 md:justify-end">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground shadow-soft">
                          {i + 1}
                        </span>
                        <h3 className="font-display text-lg font-bold">{step.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </li>
              ))}
            </ol>
          </div>
        </Section>
      </section>

      {/* Trust */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Why students trust us</SectionEyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
              Trusted by students across the UK
            </h2>
            <ul className="mt-8 space-y-3">
              {trustReasons.map((r) => (
                <li key={r} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <span className="font-medium">{r}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition">
              Speak with admissions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: GraduationCap, n: "1000+", l: "Students qualified" },
              { icon: Sparkles, n: "100%", l: "Pass rate" },
              { icon: BookOpen, n: "24/7", l: "Online platform" },
              { icon: HandHeart, n: "1:1", l: "Personal support" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card p-6 shadow-soft text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-lemon/40 text-lemon-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-3xl font-bold">{s.n}</p>
                <p className="text-sm text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
