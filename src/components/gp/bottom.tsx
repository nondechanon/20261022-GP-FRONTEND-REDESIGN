import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hotelSchema } from "./request-schema";
import type { z } from "zod";
import { toast } from "sonner";
import { CtaButton, NeedFromGreenpeak, Section, SectionTitle, trackEvent, type Prefill, LINE_URL } from "./shared";

type HotelValues = z.infer<typeof hotelSchema>;

/** Submit handler. Later: POST to a backend or email service here. */
async function submitLead(payload: Record<string, unknown>) {
  console.log("[lead]", payload);
}

// Mobile-first: 16px text on phones stops iOS Safari from zooming on focus; 48px tall touch targets.
const inputCls = "w-full rounded-md border border-input bg-card px-3 py-3 text-base lg:py-2.5 lg:text-sm";
const checkCls = "h-5 w-5 shrink-0 accent-teak lg:h-4 lg:w-4";
const choiceLabelCls = "flex min-h-11 items-center gap-3 lg:min-h-0 lg:gap-2";

function Field({ label, error, children, optional }: { label: string; error?: string | undefined; children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
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
        <span>I consent to the collection and use of my personal data as described in the privacy notice (Thai PDPA).</span>
      </label>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </div>
  );
}

function HotelForm({ prefill, onDone }: { prefill: Prefill; onDone: () => void }) {
  const f = useForm<HotelValues>({
    resolver: zodResolver(hotelSchema),
    defaultValues: { products: [], need: "quotation" },
  });
  useEffect(() => {
    if (prefill.need) f.setValue("need", prefill.need);
    if (prefill.product) {
      const cur = f.getValues("products") ?? [];
      if (!cur.includes(prefill.product)) f.setValue("products", [...cur, prefill.product]);
    }
  }, [prefill, f]);
  const e = f.formState.errors;
  return (
    <form
      noValidate
      onSubmit={f.handleSubmit(async (v) => {
        trackEvent("form_submit_hotel");
        await submitLead({ route: "hotel", ...v });
        toast.success("Request received. Thank you.");
        onDone();
      })}
      className="grid gap-5 md:grid-cols-2"
    >
      <Field label="Full name" error={e.fullName?.message}><input className={inputCls} autoComplete="name" {...f.register("fullName")} /></Field>
      <Field label="Hotel" error={e.hotel?.message}><input className={inputCls} autoComplete="organization" {...f.register("hotel")} /></Field>
      <Field label="Email" error={e.email?.message}><input type="email" className={inputCls} autoComplete="email" {...f.register("email")} /></Field>
      <Field label="Phone" error={e.phone?.message}><input type="tel" className={inputCls} autoComplete="tel" {...f.register("phone")} /></Field>
      <Field label="Number of rooms" optional><input inputMode="numeric" className={inputCls} {...f.register("rooms")} /></Field>
      <fieldset className="md:col-span-2">
        <legend className="mb-2 text-sm font-medium">Products</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[["amenity", "Amenity kits"], ["slippers", "Slippers"], ["chaona", "CHAONA"]].map(([v, l]) => (
            <label key={v} className={choiceLabelCls}><input type="checkbox" value={v} className={checkCls} {...f.register("products")} />{l}</label>
          ))}
        </div>
      </fieldset>
      <fieldset className="md:col-span-2">
        <legend className="mb-2 text-sm font-medium">I need</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[["quotation", "Quotation"], ["callback", "Call back"]].map(([v, l]) => (
            <label key={v} className={choiceLabelCls}><input type="radio" value={v} className={checkCls} {...f.register("need")} />{l}</label>
          ))}
        </div>
        {e.need && <span className="mt-1 block text-xs text-destructive">{e.need.message}</span>}
      </fieldset>
      <div className="md:col-span-2"><Field label="Additional notes" optional><textarea rows={3} className={inputCls} {...f.register("notes")} /></Field></div>
      <div className="md:col-span-2"><ConsentBox reg={f.register("consent")} error={e.consent?.message} /></div>
      <div className="md:col-span-2"><CtaButton type="submit" track="form_submit_click_hotel" disabled={f.formState.isSubmitting}>Submit request</CtaButton></div>
    </form>
  );
}

export function RequestForm() {
  const [prefill, setPrefill] = useState<Prefill>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const h = (ev: Event) => {
      const d = (ev as CustomEvent<Prefill>).detail ?? {};
      setDone(false);
      setPrefill({ ...d });
    };
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
            <p className="mt-3 text-sm text-muted-foreground">We will be in touch: <NeedFromGreenpeak label="response time, e.g. within 1 business day" /></p>
            <CtaButton variant="quiet" track="send_another_request" onClick={() => setDone(false)} className="mt-6">Send another request</CtaButton>
          </div>
        ) : (
          <HotelForm prefill={prefill} onDone={() => setDone(true)} />
        )}
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal pb-24 pt-16 text-ivory lg:pb-12">
      <div className="container-gp grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">GreenPeak Transform</p>
          {/* Confirm brand-name spelling of the legal entity with the client. */}
          <p className="mt-4 text-sm">Greenpeak Transformation Co., Ltd.</p>
          <div className="mt-2"><NeedFromGreenpeak label="registration / VAT number" /></div>
        </div>
        <div className="space-y-2 text-sm">
          <p>Bangkok, Thailand</p>
          <NeedFromGreenpeak label="full address" />
          <p><a href="mailto:Pharunyu.l@gmail.com" className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline">Pharunyu.l@gmail.com</a></p>
        </div>
        <ul className="text-sm">
          <li><a href={LINE_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("footer_line")} className="inline-flex min-h-11 min-w-11 items-center hover:underline">LINE</a></li>
          <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 min-w-11 items-center hover:underline">LinkedIn</a></li>
          <li><a href="https://greenpeaktransform.com/partnership/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 min-w-11 items-center hover:underline">GeoAsia Initiative</a></li>
          <li><a href="#" className="inline-flex min-h-11 min-w-11 items-center hover:underline">Privacy notice (Thai PDPA)</a></li>
        </ul>
      </div>
      <div className="container-gp mt-12 border-t border-ivory/20 pt-6 text-xs text-ivory/70">
        &copy; {new Date().getFullYear()} Greenpeak Transformation Co., Ltd.
      </div>
    </footer>
  );
}
