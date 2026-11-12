import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header } from "@/components/gp/top";
import { Footer } from "@/components/gp/bottom";

// Privacy notice under the Thai Personal Data Protection Act (PDPA).
// NOTE: written from the company's own answers; have a Thai lawyer approve the wording before relying on it.
// If the form provider, retention period or contact details change, update this page.
const TITLE = "Privacy Notice | GreenPeak Transformation";
const DESC = "How GreenPeak Transformation Co., Ltd. collects, uses and protects personal data submitted through this website.";
const EFFECTIVE = "12 November 2026";
const EMAIL = "hello@greenpeaktransform.com";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Privacy,
});

function Block({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="mt-10 md:mt-12">
      <h2 className="text-2xl md:text-3xl">
        {n}. {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80 md:text-lg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <>
      <Header />
      <main id="top" className="py-16 md:py-24">
        <div className="container-gp max-w-3xl">
          <p className="eyebrow mb-3 text-muted-foreground">Thai PDPA</p>
          <h1 className="text-4xl md:text-6xl">Privacy Notice</h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">Effective {EFFECTIVE}</p>

          <Block n={1} title="Who we are">
            <p>
              GreenPeak Transformation Co., Ltd. (&ldquo;GreenPeak&rdquo;, &ldquo;we&rdquo;), Bangkok, Thailand, is the data controller for the
              personal data collected through this website. Contact:{" "}
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a>.
            </p>
          </Block>

          <Block n={2} title="What we collect">
            <p>When you submit a quotation request, we collect:</p>
            <ul>
              <li>Full name</li>
              <li>Hotel or company name</li>
              <li>Email address and phone number</li>
              <li>Number of rooms (optional)</li>
              <li>The products and request type you select</li>
              <li>Any additional notes you write</li>
            </ul>
          </Block>

          <Block n={3} title="Why we use it, and our legal basis">
            <ul>
              <li>To answer your quotation request, prepare quotes and follow up with you. Basis: your consent, and steps taken at your request before a contract.</li>
              <li>To manage our business relationship with you after a quote or order. Basis: contract and our legitimate business interest.</li>
              <li>We do not use your data for marketing newsletters unless you separately agree.</li>
            </ul>
          </Block>

          <Block n={4} title="Who receives your data">
            <ul>
              <li>Our staff who handle quotations.</li>
              <li>
                Formspree, Inc. (formspree.io), the form service that receives and stores your submission. It acts on our instructions as a
                service provider.
              </li>
              <li>Email and other tools we use to receive and answer your request.</li>
              <li>Authorities, only where the law requires.</li>
            </ul>
            <p>We do not sell your personal data.</p>
          </Block>

          <Block n={5} title="Transfers outside Thailand">
            <p>
              Your submission is stored on Formspree&rsquo;s servers in the United States (hosted on Amazon Web Services). We transfer your
              data there on the basis of your consent and Formspree&rsquo;s contractual safeguards (Standard Contractual Clauses). You can
              withdraw your consent at any time by contacting us.
            </p>
          </Block>

          <Block n={6} title="How long we keep it">
            <p>
              We keep your enquiry data for as long as needed to respond to your request and manage our relationship with you. We review stored
              enquiries every 24 months and delete or anonymise data that is no longer needed. You can ask us to delete it sooner.
            </p>
          </Block>

          <Block n={7} title="Your rights">
            <p>Under the Thai Personal Data Protection Act you may:</p>
            <ul>
              <li>Access your data and request a copy</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion or restriction of use</li>
              <li>Object to our use of your data</li>
              <li>Request your data in a portable format</li>
              <li>Withdraw your consent at any time (this does not affect past use)</li>
            </ul>
            <p>
              To use these rights, email <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a>. You also have the
              right to complain to the Personal Data Protection Committee of Thailand.
            </p>
          </Block>

          <Block n={8} title="If you don't give us your data">
            <p>We need your name, contact details and hotel to answer a quotation request. Without them, we cannot prepare a quote.</p>
          </Block>

          <Block n={9} title="Security">
            <p>We use reasonable technical and organisational measures to protect your data against loss, misuse and unauthorised access.</p>
          </Block>

          <Block n={10} title="Changes">
            <p>We may update this notice. The current version is always on this page.</p>
          </Block>
        </div>
      </main>
      <Footer />
    </>
  );
}
