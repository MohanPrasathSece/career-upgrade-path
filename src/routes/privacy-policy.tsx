import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Career Upgrade Online Dental Nursing School" },
      { name: "description", content: "Privacy Policy for Career Upgrade Online Dental Nursing School." },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <SiteLayout>
      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2025</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/80">

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">1. Who We Are</h2>
              <p className="mt-3">
                Career Upgrade Online Dental Nursing School ("we", "us", "our") is operated from
                Capital Office, 124 City Road, London, EC1V 2NX. We are committed to protecting
                your personal data and handling it responsibly in accordance with the UK General
                Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
              <p className="mt-2">
                For any privacy-related queries, contact us at:{" "}
                <a href="mailto:info@careerupgradedentalschool.co.uk" className="text-primary underline">
                  info@careerupgradedentalschool.co.uk
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">2. What Data We Collect</h2>
              <p className="mt-3">We may collect the following personal information:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Full name and contact details (email address, phone number)</li>
                <li>Enquiry and message content submitted via our contact form</li>
                <li>Course interest and study preferences</li>
                <li>Technical data such as IP address, browser type, and pages visited</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">3. How We Use Your Data</h2>
              <p className="mt-3">We use your personal data to:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Respond to your enquiries and provide admissions support</li>
                <li>Send you information about our courses and funding options (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">4. Legal Basis for Processing</h2>
              <p className="mt-3">
                We process your data on the basis of your consent (when you submit an enquiry),
                our legitimate interests (to respond to your request and improve our services),
                and legal compliance where required.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">5. Data Sharing</h2>
              <p className="mt-3">
                We do not sell or rent your personal data to third parties. We may share data with
                trusted service providers (such as email delivery services) solely to operate our
                business, under strict confidentiality agreements.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">6. Data Retention</h2>
              <p className="mt-3">
                We retain your personal data only for as long as necessary to fulfil the purposes
                for which it was collected, or as required by law. Enquiry data is typically held
                for up to 2 years.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">7. Your Rights</h2>
              <p className="mt-3">Under UK GDPR, you have the right to:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data ("right to be forgotten")</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with the ICO (ico.org.uk)</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, email us at{" "}
                <a href="mailto:info@careerupgradedentalschool.co.uk" className="text-primary underline">
                  info@careerupgradedentalschool.co.uk
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">8. Cookies</h2>
              <p className="mt-3">
                Our website uses essential cookies to function correctly. We may also use
                analytics cookies to understand how visitors use our site. You can control cookie
                settings through your browser at any time.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground">9. Changes to This Policy</h2>
              <p className="mt-3">
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with an updated date. We encourage you to review this page periodically.
              </p>
            </div>

          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
