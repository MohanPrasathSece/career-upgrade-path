import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShoppingBag,
  Utensils,
  Package,
  Shield,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Calendar,
  Users,
  Award,
} from "lucide-react";
import otherCoursesImg from "@/assets/images/adult_group_learning.png";
import { Section, SectionEyebrow, PageHero } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/othercourses")({
  head: () => ({
    meta: [
      { title: "Bespoke On-Demand Training Courses | Career Upgrade Ltd" },
      { name: "description", content: "Career Upgrade Ltd offers accredited, bespoke on-demand training in Retail Customer Service, Hospitality Customer Service, Warehouse Operative, and Security Officer Customer Service." },
      { name: "keywords", content: "bespoke training, customer service training, retail customer service, hospitality customer service, warehouse operative training, security officer customer service, career upgrade" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Bespoke On-Demand Training Courses | Career Upgrade Ltd" },
      { property: "og:description", content: "Tailored professional training programs including Customer Service, Retail, Hospitality, Warehouse operations, and Security." },
      { property: "og:url", content: "https://careerupgradedentalnursingschool.co.uk/othercourses" },
      { property: "og:image", content: "https://careerupgradedentalnursingschool.co.uk/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://careerupgradedentalnursingschool.co.uk/othercourses" }],
  }),
  component: OtherCourses,
});

const featuredCourses = [
  {
    icon: ShoppingBag,
    title: "Retail Customer Service",
    desc: "Develop advanced skills in retail operations, client interaction, point-of-sale courtesy, complaint resolution, and product presentation tailored to high-performing retail settings.",
  },
  {
    icon: Utensils,
    title: "Hospitality Customer Service",
    desc: "Build front-of-house excellence, guest relations, dynamic service communication, table service etiquette, and professional team workflows for hotels and restaurants.",
  },
  {
    icon: Package,
    title: "Warehouse Operative",
    desc: "Essential training in logistics operations, health & safety, manual handling, stock management, supply chain flow, and warehouse health & safety protocols.",
  },
  {
    icon: Shield,
    title: "Security Officer Customer Service",
    desc: "A specialized blend of security awareness, conflict management, proactive communication, front-of-desk relations, and crisis coordination soft skills.",
  },
];

const highlights = [
  { icon: Calendar, label: "Availability", value: "Bespoke / On-Demand" },
  { icon: Users, label: "Delivery", value: "Group or 1-on-1 Sessions" },
  { icon: BookOpen, label: "Format", value: "Hybrid / Blended Learning" },
];

function OtherCourses() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Career Upgrade Ltd — Bespoke Training"
        title="Bespoke Professional & Customer Service Courses"
        subtitle="On-demand corporate and individual training programs tailored to align with active UK employment, recruitment, and industry performance standards."
        image={otherCoursesImg}
      />

      {/* Intro Overview */}
      <Section>
        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-card md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionEyebrow>Training Solutions</SectionEyebrow>
              <h2 className="mt-4 font-display text-[22px] font-bold sm:text-3xl md:text-4xl">
                Bespoke Training, Tailored For Your Success.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                At <strong>Career Upgrade Ltd</strong>, we deliver high-quality, practical training programs designed to prepare candidates for active roles in high-demand UK sectors. 
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We work directly with employers, recruiters, and candidates to build training solutions that resolve real skill gaps. Our customer service and operations programs are delivered on-demand and can be customized to match your organisation's exact compliance requirements.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition"
                >
                  Request Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition"
                >
                  Apply Online
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="rounded-2xl border border-border bg-soft p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-primary">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {h.label}
                  </p>
                  <p className="mt-0.5 font-display text-base font-bold leading-tight">{h.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Courses Catalog */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Our Programs</SectionEyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            Available Bespoke Training Pathways
          </h2>
          <p className="mt-4 text-muted-foreground">
            We deliver the following structured training pathways on-demand for corporate cohorts and individual placements:
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredCourses.map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-card hover:border-primary/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Corporate Benefits */}
      <Section className="bg-gradient-soft">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Why Partner With Us</SectionEyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
            Delivery & Industry Excellence
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our training is optimized to create job-ready candidates with practical skills. The staff that provide the training are highly qualified and have the necessary qualifications and skills to teach.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-4xl grid gap-4 sm:grid-cols-2">
          {[
            "Custom curriculums designed around employer workflows",
            "Highly experienced tutors and sector assessors",
            "Flexible delivery scheduling (online, blended, or on-site)",
            "Comprehensive training compliance and safety audits",
            "Interactive practical scenarios and competency testing",
            "Post-training transition and onboarding support",
          ].map((point, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-10 text-primary-foreground shadow-glow md:p-16">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-lemon/40 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">
                Ready to Setup a Bespoke Program?
              </h2>
              <p className="mt-3 max-w-xl opacity-90">
                Contact our corporate training team today to discuss course customisations, delivery options, and scheduling.
              </p>
            </div>
            <div className="md:text-right">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-glow transition"
              >
                Inquire Today <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
