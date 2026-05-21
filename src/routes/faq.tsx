import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Quote, Star, ArrowRight, Sparkles } from "lucide-react";
import { Section, SectionEyebrow, PageHero } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";
import faqImg from "@/assets/images/courses_hero_dental.png";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ & Information - Career Upgrade Online Dental Nursing School" },
      {
        name: "description",
        content:
          "Answers to common questions about our UK online dental nursing course, payment plans and study requirements.",
      },
      { property: "og:title", content: "FAQ & Information - Career Upgrade Online Dental Nursing School" },
      { property: "og:description", content: "Everything you need to know before you apply." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  {
    q: "Who can apply?",
    a: "Living in the UK with a passion for healthcare and dental nursing. No prior experience is required.",
  },
  {
    q: "Is the course fully online?",
    a: "Yes - the theory is delivered through our modern online platform. Practical competencies are completed in a UK dental practice setting with assessor support.",
  },
  {
    q: "Can I work while studying?",
    a: "Absolutely. Most of our students train as dental nurses in a UK practice while they study. Many employers also contribute to course fees.",
  },
  {
    q: "Are payment plans available?",
    a: "Yes. We offer flexible monthly instalment plans and government-funded routes for eligible learners.",
  },
  {
    q: "Is the qualification recognised?",
    a: "Yes. Our course leads to a dental nursing qualification and a clear pathway to GDC registration.",
  },
  {
    q: "How long is the course?",
    a: "The standard duration is 1 year, with flexible scheduling. Some students complete sooner; others take longer - we work to your pace.",
  },
  {
    q: "What support will I receive?",
    a: "Dedicated tutors, qualified assessors, friendly customer service and one‑to‑one guidance from enrolment to qualification.",
  },
  {
    q: "What age can I apply from?",
    a: "We welcome applicants of any age who are passionate about dental nursing.",
  },
];

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-card transition ${open ? "border-primary/40 shadow-card" : "border-border shadow-soft"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-bold md:text-lg">{q}</span>
        <span
          className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full transition ${open ? "bg-gradient-primary text-primary-foreground rotate-180" : "bg-secondary text-primary"}`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before you apply - funding, format, age, support and what makes our UK dental nursing course different."
        image={faqImg}
      />

      <Section>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-3 md:grid-cols-2 md:items-start">
            <div className="flex flex-col gap-3">
              {faqs
                .filter((_, i) => i % 2 === 0)
                .map((f, i) => (
                  <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
                ))}
            </div>
            <div className="flex flex-col gap-3">
              {faqs
                .filter((_, i) => i % 2 === 1)
                .map((f) => (
                  <FAQItem key={f.q} q={f.q} a={f.a} />
                ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Career Pathways */}
      <section className="bg-gradient-soft">
        <Section>
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Career Progression</SectionEyebrow>
            <h2 className="mt-4 font-display text-[22px] font-bold sm:text-3xl md:text-4xl">
              Where can dental nursing take you?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Qualifying as a dental nurse is just the beginning. Once registered with the GDC, a
              wide range of professional development opportunities become available.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                role: "Dental Hygienist & Therapist",
                pathway: "Further clinical study",
                desc: "Perform clinical treatments, hygiene therapies, and diagnostic work under prescription.",
              },
              {
                role: "Practice Manager",
                pathway: "Management & Leadership",
                desc: "Oversee clinic operations, staff scheduling, regulatory compliance, and business growth.",
              },
              {
                role: "Treatment Coordinator",
                pathway: "Clinical Consultation",
                desc: "Act as the primary bridge between patients and clinicians for complex cosmetic or implant therapies.",
              },
              {
                role: "Dental Radiography",
                pathway: "POST-REGISTRATION COURSE",
                desc: "Learn to safely take and process dental X-rays within clinical practice.",
              },
              {
                role: "Oral Health Education",
                pathway: "PREVENTIVE CARE",
                desc: "Support patients with oral hygiene education and preventive dental care advice.",
              },
              {
                role: "Orthodontic Nursing",
                pathway: "SPECIALIST DENTAL CARE",
                desc: "Assist with orthodontic procedures and patient care within specialist practices.",
              },
              {
                role: "Sedation Nursing",
                pathway: "ADVANCED PATIENT SUPPORT",
                desc: "Develop skills in supporting patients receiving conscious sedation treatment.",
              },
              {
                role: "Implant Nursing",
                pathway: "IMPLANT DENTISTRY",
                desc: "Assist clinicians during implant procedures and restorative treatments.",
              },
              {
                role: "Fluoride Varnish Application",
                pathway: "PREVENTIVE TREATMENT",
                desc: "Gain additional skills in preventive fluoride application for patient care.",
              },
              {
                role: "Special Care / Hospital Dentistry",
                pathway: "CLINICAL SUPPORT ROLE",
                desc: "Work alongside multidisciplinary teams within hospital and specialist environments.",
              },
              {
                role: "Endodontic Nursing",
                pathway: "SPECIALIST ENDODONTIC CARE",
                desc: "Assist with root canal treatments and advanced endodontic procedures within specialist dental settings.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground font-bold shadow-soft">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{p.role}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {p.pathway}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* Standard of training banner */}
      <Section>
        <div className="rounded-[2rem] border border-border bg-card p-10 text-center shadow-card md:p-16">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary shadow-soft">
            <Sparkles className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-display text-[22px] font-bold sm:text-3xl md:text-4xl">
            A state-of-the-art curriculum compliant with GDC standards.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Designed to prepare confident, highly skilled, and fully competent professionals for
            modern dental clinics.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 text-primary-foreground shadow-glow md:p-16">
          <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-lemon/40 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-[26px] font-bold text-balance md:text-4xl">
                Ready to Start Your Future?
              </h2>
              <p className="mt-3 max-w-xl opacity-90">
                Speak with admissions today - free, no obligation and we'll answer every remaining
                question.
              </p>
            </div>
            <div className="md:text-right">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-semibold text-primary shadow-soft hover:-translate-y-0.5 transition"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
