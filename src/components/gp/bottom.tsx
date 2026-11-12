import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema } from "./request-schema";
import type { z } from "zod";
import { toast } from "sonner";
import { CtaButton, Section, SectionTitle, trackEvent, LINE_URL } from "./shared";
import { cn } from "@/lib/utils";

type QuoteValues = z.infer<typeof quoteSchema>;

const FORMSPREE_URL = "https://formspree.io/f/mpqkyqoo";

/** Sends the quotation request to Formspree. Throws if it could not be delivered. */
async function submitLead(values: QuoteValues) {
  const res = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Quotation request from ${values.company}`,
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      notes: values.notes ?? "",
      consent: "Agreed to the Privacy Notice",
      consent_at: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
}

// Mobile-first: 16px text on phones stops iOS Safari from zooming on focus; 48px tall touch targets.
const inputCls = "w-full rounded-md border border-input bg-card px-3 py-3 text-base lg:py-2.5 lg:text-sm";
const checkCls = "h-5 w-5 shrink-0 accent-teak lg:h-4 lg:w-4";

function Field({ label, error, children, optional }: { label: string; error?: string | undefined; children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-heading text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function ConsentBox({ reg, error }: { reg: object; error?: string | undefined }) {
  return (
    <div>
      <label className="flex min-h-11 items-start gap-3 py-2 text-sm lg:min-h-0 lg:py-0">
        <input type="checkbox" {...reg} className={`${checkCls} mt-0.5 lg:mt-1`} />
        <span>I consent to the collection and use of my personal data as described in the <Link to="/privacy" target="_blank" className="underline underline-offset-4">Privacy Notice</Link>.</span>
      </label>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </div>
  );
}

function QuoteForm({ onDone }: { onDone: () => void }) {
  const f = useForm<QuoteValues>({ resolver: zodResolver(quoteSchema) });
  const honeypot = useRef<HTMLInputElement>(null);
  const e = f.formState.errors;
  return (
    <form
      noValidate
      onSubmit={f.handleSubmit(async (v) => {
        trackEvent("form_submit_quote");
        // Honeypot: real visitors never see or fill this field; bots do. Pretend success.
        if (honeypot.current?.value) return onDone();
        try {
          await submitLead(v);
        } catch (err) {
          console.error(err);
          toast.error("Sorry, we could not send your request. Please try again or email hello@greenpeaktransform.com.");
          return;
        }
        toast.success("Request received. Thank you.");
        f.reset();
        onDone();
      })}
      className="grid gap-5 md:grid-cols-2"
    >
      <Field label="Name" error={e.name?.message}><input className={inputCls} autoComplete="name" {...f.register("name")} /></Field>
      <Field label="Company name" error={e.company?.message}><input className={inputCls} autoComplete="organization" {...f.register("company")} /></Field>
      <Field label="Email" error={e.email?.message}><input type="email" className={inputCls} autoComplete="email" {...f.register("email")} /></Field>
      <Field label="Phone" error={e.phone?.message}><input type="tel" className={inputCls} autoComplete="tel" {...f.register("phone")} /></Field>
      <div className="md:col-span-2"><Field label="Additional notes" optional><textarea rows={4} className={inputCls} {...f.register("notes")} /></Field></div>
      <input ref={honeypot} type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <div className="md:col-span-2"><ConsentBox reg={f.register("consent")} error={e.consent?.message} /></div>
      <div className="md:col-span-2"><CtaButton type="submit" track="form_submit_click_quote" disabled={f.formState.isSubmitting}>Submit request</CtaButton></div>
    </form>
  );
}

export function RequestForm() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // "Get a Quotation" buttons fire gp:prefill; show a fresh form if the thank-you card was open.
    const h = () => setDone(false);
    window.addEventListener("gp:prefill", h);
    return () => window.removeEventListener("gp:prefill", h);
  }, []);

  return (
    <Section id="request" className="border-t border-border" label="Request form">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Get started" title="Request a quotation" />
        {done ? (
          <div className="rounded-md border border-border bg-card p-8" role="status">
            <h3 className="text-3xl">Thank you. We have your request.</h3>
            <p className="mt-3 text-sm text-muted-foreground">We will be in touch soon.</p>
            <CtaButton variant="quiet" track="send_another_request" onClick={() => setDone(false)} className="mt-6">Send another request</CtaButton>
          </div>
        ) : (
          <QuoteForm onDone={() => setDone(true)} />
        )}
      </div>
    </Section>
  );
}

const footerLink = "inline-flex min-h-11 items-center underline-offset-4 hover:underline";
const footerLabel = "eyebrow mb-3 text-ivory/60";

export function Footer() {
  return (
    <footer className="bg-charcoal py-16 text-ivory lg:pb-12">
      <div className="container-gp grid items-start gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="md:col-span-2 lg:col-span-1">
          <p className="font-display text-3xl font-semibold leading-tight">GreenPeak Transformation <span className="whitespace-nowrap">Co., Ltd.</span></p>
        </div>
        <div>
          <p className={footerLabel}>Contact</p>
          <ul className="text-sm">
            <li className="flex min-h-11 items-center">Bangkok, Thailand</li>
            <li><a href="mailto:hello@greenpeaktransform.com" className={cn(footerLink, "break-words")}>hello@greenpeaktransform.com</a></li>
          </ul>
        </div>
        <div>
          <p className={footerLabel}>Links</p>
          <ul className="text-sm">
            <li><a href={LINE_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("footer_line")} className={footerLink}>LINE</a></li>
            <li><Link to="/privacy" className={footerLink}>Privacy Notice</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-gp mt-12">
        <div className="border-t border-ivory/20 pt-6 text-xs text-ivory/70">
          &copy; {new Date().getFullYear()} GreenPeak Transformation Co., Ltd.
        </div>
      </div>
    </footer>
  );
}
