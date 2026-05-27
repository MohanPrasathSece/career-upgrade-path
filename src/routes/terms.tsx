import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions - Career Upgrade Online Dental Nursing School" },
      { name: "description", content: "Terms and Conditions for Career Upgrade Online Dental Nursing School." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <SiteLayout>
      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Terms &amp; Conditions</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2025</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/80">

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">1. Introduction</h2>
              <p className="mt-3">
                These Terms and Conditions govern your use of the Career Upgrade Online Dental
                Nursing School website and services. By accessing our website or enrolling on a
                course, you agree to be bound by these terms. Please read them carefully.
              </p>
              <p className="mt-2">
                Career Upgrade Online Dental Nursing School is operated from Capital Office,
                124 City Road, London, EC1V 2NX.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">2. Eligibility</h2>
              <p className="mt-3">
                To enrol on our courses, you must:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Be aged 16 or over</li>
                <li>Be living and eligible to work in the United Kingdom</li>
                <li>Have a sufficient level of English to complete the course</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">3. Enrolment and Payment</h2>
              <p className="mt-3">
                Enrolment is confirmed upon receipt of a completed application and agreed payment
                arrangement. We offer flexible monthly instalment plans and government-funded
                routes for eligible learners. Full details of fees and payment plans will be
                provided during the admissions process.
              </p>
              <p className="mt-2">
                All fees are stated in GBP (£). We reserve the right to update our fees with
                reasonable notice.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">4. Cancellation and Refunds</h2>
              <p className="mt-3">
                You have the right to cancel your enrolment within 14 days of signing your
                enrolment agreement (cooling-off period) without penalty. After this period,
                refunds are considered on a case-by-case basis. Please contact us at{" "}
                <a href="mailto:info@careerupgradedentalschool.co.uk" className="text-primary underline">
                  info@careerupgradedentalschool.co.uk
                </a>{" "}
                to discuss your circumstances.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">5. Course Delivery</h2>
              <p className="mt-3">
                Our courses are delivered primarily online through our e-learning platform.
                Practical competencies must be completed in an approved UK dental practice setting.
                We reserve the right to update course content to reflect current GDC standards and
                best practice.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">6. Student Responsibilities</h2>
              <p className="mt-3">As a student, you agree to:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Engage with course materials honestly and diligently</li>
                <li>Not share login credentials or course materials with third parties</li>
                <li>Treat tutors, assessors, and fellow students with respect</li>
                <li>Notify us promptly of any changes to your circumstances</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">7. Intellectual Property</h2>
              <p className="mt-3">
                All course materials, content, and resources provided by Career Upgrade are our
                intellectual property and are protected by copyright. You may not reproduce,
                distribute, or share any materials without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">8. Limitation of Liability</h2>
              <p className="mt-3">
                We take all reasonable steps to ensure the accuracy of information on our website
                and in our courses. However, we cannot guarantee employment outcomes or GDC
                registration, as these depend on individual performance and external requirements.
                Our liability is limited to the fees paid for the course.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">9. Governing Law</h2>
              <p className="mt-3">
                These Terms and Conditions are governed by the laws of England and Wales. Any
                disputes shall be subject to the exclusive jurisdiction of the courts of England
                and Wales.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">10. Contact</h2>
              <p className="mt-3">
                For any questions about these terms, please contact us at:{" "}
                <a href="mailto:info@careerupgradedentalschool.co.uk" className="text-primary underline">
                  info@careerupgradedentalschool.co.uk
                </a>
              </p>
            </div>

          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
