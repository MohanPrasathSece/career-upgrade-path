import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Globe, Calendar, UserCheck, Award, Stethoscope, Heart, ShieldCheck, Smile, BriefcaseBusiness, ArrowRight, CheckCircle2, Wallet, Landmark, CreditCard, GraduationCap, FileCheck, Shirt, ScrollText } from "lucide-react";
import coursesImg from "@/assets/images/team_of_nurses.png";
import { Section, SectionEyebrow, PageHero } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Dental Nursing Course & Funding - Career Upgrade" },
      { name: "description", content: "Our 1-year flexible online UK dental nursing course. Government funding, payment plans and everything included." },
      { property: "og:title", content: "Dental Nursing Course & Funding - Career Upgrade" },
      { property: "og:description", content: "Flexible course, transparent funding options, GDC pathway." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: Courses,
});

const overview = [
  { icon: Clock, label: "Duration", value: "1-Year Flexible" },
  { icon: Globe, label: "Format", value: "100% Online" },
  { icon: Calendar, label: "Start Dates", value: "Anytime" },
  { icon: UserCheck, label: "Age", value: "16+" },
  { icon: Award, label: "Outcome", value: "UK Qualification" },
];

const learn = [
  { icon: Stethoscope, title: "Dental Procedures", desc: "Chairside support, instruments and clinical workflows." },
  { icon: Heart, title: "Patient Care", desc: "Compassionate communication and patient experience." },
  { icon: ShieldCheck, title: "Infection Control", desc: "Decontamination, sterilisation and clinical safety." },
  { icon: Smile, title: "Oral Health Education", desc: "Educate patients on prevention and oral wellbeing." },
  { icon: BriefcaseBusiness, title: "Dental Practice Support", desc: "Practice admin, records and team workflows." },
  { icon: GraduationCap, title: "Clinical Skills", desc: "Hands-on competencies built through real placements." },
];

const funding = [
  { icon: Landmark, title: "Government Funded Learners", desc: "Eligible UK students may qualify for full funding.", tag: "Most popular", gradient: true },
  { icon: CreditCard, title: "Flexible Payment Plans", desc: "Spread the cost with affordable monthly instalments." },
  { icon: Wallet, title: "Fee Paying Options", desc: "Pay upfront or via your employer with a discount." },
];

const benefits = [
  { icon: FileCheck, title: "DBS Check" },
  { icon: ScrollText, title: "Exam Fees" },
  { icon: ShieldCheck, title: "GDC Registration Support" },
];

function Courses() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Courses & Funding"
        title="Dental Nursing Course & Funding Options"
        subtitle="A 1-year flexible UK dental nursing qualification, online, with funding options designed to remove barriers - so you can focus on your future."
        image={coursesImg}
      />

      {/* Overview */}
      <Section>
        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-card md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionEyebrow>Course Overview</SectionEyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
                One year. Online. Built around you.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our flagship course leads to a dental nursing qualification and a clear path to General Dental Council registration. Designed for ages 16+, with rolling start dates, expert support and everything included.
              </p>
              <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition">
                Apply Today <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {overview.map((o) => (
                <div key={o.label} className="rounded-2xl border border-border bg-soft p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-primary">
                    <o.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{o.label}</p>
                  <p className="mt-0.5 font-display text-lg font-bold">{o.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* What students learn */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>What You'll Learn</SectionEyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            A complete, modern dental nursing curriculum
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {learn.map((l) => (
            <div key={l.title} className="group rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card hover:border-primary/40">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <l.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{l.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Funding */}
      <section className="bg-gradient-soft">
        <Section>
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Funding Options</SectionEyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
              Pay your way - funding for every situation
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our admissions team will help you find the right route, including government funding for eligible UK learners.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {funding.map((f) => (
              <div
                key={f.title}
                className={`relative overflow-hidden rounded-2xl border p-7 shadow-soft transition hover:-translate-y-1 ${
                  f.gradient
                    ? "border-primary/30 bg-gradient-primary text-primary-foreground shadow-glow"
                    : "border-border bg-card hover:shadow-card hover:border-primary/40"
                }`}
              >
                {f.tag && (
                  <span className="absolute right-5 top-5 rounded-full bg-lemon px-3 py-1 text-xs font-bold uppercase tracking-wider text-lemon-foreground">
                    {f.tag}
                  </span>
                )}
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${f.gradient ? "bg-white/15 text-primary-foreground" : "bg-secondary text-primary"}`}>
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${f.gradient ? "opacity-90" : "text-muted-foreground"}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* Work while studying */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Work While You Study</SectionEyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
              Earn from day one as a trainee dental nurse
            </h2>
            <p className="mt-4 text-muted-foreground">
              Many of our students train in real UK dental practices while studying. You build experience, contacts and income - and many employers contribute towards course fees.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Work as a trainee dental nurse from the start",
                "Employers may support or cover course fees",
                "Earn while you train - no pause on income",
                "Real placements that build a strong CV",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" /><span className="font-medium">{b}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-trust/10 text-trust">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-bold">Everything Included</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Your enrolment includes all the essentials so you can focus on learning, not logistics.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-2xl border border-border bg-soft p-4 text-center">
                  <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-lemon/40 text-lemon-foreground">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-2 text-sm font-semibold">{b.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 text-primary-foreground shadow-glow md:p-16">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-lemon/40 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">Apply Today & Upgrade Your Career</h2>
              <p className="mt-3 max-w-xl opacity-90">Free consultation, transparent pricing and a personal funding plan in one call.</p>
            </div>
            <div className="md:text-right">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-semibold text-primary shadow-soft hover:-translate-y-0.5 transition">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
