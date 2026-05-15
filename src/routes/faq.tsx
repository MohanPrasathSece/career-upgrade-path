import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Quote, Star, ArrowRight, Sparkles } from "lucide-react";
import { Section, SectionEyebrow, PageHero } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ & Student Stories - Career Upgrade" },
      { name: "description", content: "Answers to common questions about our UK online dental nursing course, plus real stories from qualified students." },
      { property: "og:title", content: "FAQ & Student Stories - Career Upgrade" },
      { property: "og:description", content: "Everything you need to know before you apply." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQPage,
});

const faqs = [
  { q: "Who can apply?", a: "Anyone aged 16 or over living in the UK with a passion for healthcare and dental nursing. No prior experience is required." },
  { q: "Is the course fully online?", a: "Yes - the theory is delivered through our modern online platform. Practical competencies are completed in a UK dental practice setting with assessor support." },
  { q: "Can I work while studying?", a: "Absolutely. Most of our students train as dental nurses in a UK practice while they study. Many employers also contribute to course fees." },
  { q: "Are payment plans available?", a: "Yes. We offer flexible monthly instalment plans, government-funded routes for eligible learners and apprenticeship options." },
  { q: "Is the qualification recognised in the UK?", a: "Yes. Our course leads to a UK-recognised dental nursing qualification and a clear pathway to General Dental Council (GDC) registration." },
  { q: "How long is the course?", a: "The standard duration is 1 year, with flexible scheduling. Some students complete sooner; others take longer - we work to your pace." },
  { q: "What support will I receive?", a: "Dedicated tutors, qualified assessors, friendly customer service and one-to-one guidance from enrolment to qualification." },
  { q: "What age can I apply from?", a: "From age 16. We welcome school leavers, career changers and those returning to learning." },
];

const stories = [
  { name: "Ayesha K.", role: "Trainee → Qualified, Manchester", quote: "I worked at a practice while studying and qualified in 11 months. The tutors made everything click - I felt supported the whole way through.", rating: 5 },
  { name: "James O.", role: "GDC Registered, London", quote: "Career Upgrade handled DBS, scrubs, exam fees and even GDC paperwork. I just had to focus on learning. Best decision I made.", rating: 5 },
  { name: "Priya S.", role: "Dental Nurse, Birmingham", quote: "The flexibility was a lifesaver as a parent. The platform is modern, the support is real and I now have a career I love.", rating: 5 },
  { name: "Daniel R.", role: "Apprentice Dental Nurse, Leeds", quote: "Funded through an apprenticeship, I earned while training. Career Upgrade made the funding admin simple and stress-free.", rating: 5 },
];

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`overflow-hidden rounded-2xl border bg-card transition ${open ? "border-primary/40 shadow-card" : "border-border shadow-soft"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-bold md:text-lg">{q}</span>
        <span className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full transition ${open ? "bg-gradient-primary text-primary-foreground rotate-180" : "bg-secondary text-primary"}`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
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
      />

      <Section>
        <div className="mx-auto grid max-w-5xl gap-3">
          {faqs.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <section className="bg-gradient-soft">
        <Section>
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Student Stories</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">
              Real students. Real careers.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {stories.map((s) => (
              <div key={s.name} className="rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                <div className="flex items-center gap-1">
                  {[...Array(s.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-lemon text-lemon" />)}
                </div>
                <Quote className="mt-4 h-7 w-7 text-primary/40" />
                <p className="mt-3 leading-relaxed text-foreground/90">"{s.quote}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* Success banner */}
      <Section>
        <div className="rounded-[2rem] border border-border bg-card p-10 text-center shadow-card md:p-16">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-balance md:text-4xl">
            Many students successfully become qualified dental nurses through Career Upgrade.
          </h2>
          <p className="mt-4 text-muted-foreground">Join the next intake and start a career you'll love.</p>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 text-primary-foreground shadow-glow md:p-16">
          <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-lemon/40 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-bold text-balance md:text-4xl">Ready to Start Your Future?</h2>
              <p className="mt-3 max-w-xl opacity-90">Speak with admissions today - free, no obligation and we'll answer every remaining question.</p>
            </div>
            <div className="md:text-right">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-semibold text-primary shadow-soft hover:-translate-y-0.5 transition">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
