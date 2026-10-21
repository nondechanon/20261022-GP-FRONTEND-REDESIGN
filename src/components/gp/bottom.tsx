import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CtaButton, NeedFromGreenpeak, Section, SectionTitle, trackEvent, type Prefill, LINE_URL } from "./shared";

const consent = z.literal(true, { errorMap: () => ({ message: "Consent is required" }) });

const hotelSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  hotel: z.string().trim().min(2, "Please enter your hotel").max(150),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter a phone number").max(30),
  rooms: z.string().trim().max(10).optional(),
  products: z.array(z.string()),
  need: z.enum(["sample", "quotation", "callback"], { errorMap: () => ({ message: "Please choose one" }) }),
  notes: z.string().trim().max(1000).optional(),
  consent,
});

const importerSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  company: z.string().trim().min(2, "Please enter your company").max(150),
  country: z.string().trim().min(2, "Please enter your country").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional(),
  categories: z.array(z.string()),
  volume: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(1000).optional(),
  consent,
});

type HotelValues = z.infer<typeof hotelSchema>;
type ImporterValues = z.infer<typeof importerSchema>;

/** Submit handler. Later: POST to a backend or email service here. */
async function submitLead(payload: Record<string, unknown>) {
  console.log("[lead]", payload);
}

const inputCls = "w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm";

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

function ConsentBox({ reg, error }: { reg: object; error?: string }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" {...reg} className="mt-1 h-4 w-4 accent-teak" />
        <span>I consent to the collection and use of my personal data as described in the privacy notice (Thai PDPA).</span>
      </label>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </div>
  );
}

function HotelForm({ prefill, onDone }: { prefill: Prefill; onDone: () => void }) {
  const f = useForm<HotelValues>({
    resolver: zodResolver(hotelSchema),
    defaultValues: { products: [], need: "sample" },
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
          {[["amenity", "Amenity kits"], ["slippers", "Slippers"], ["chaona", "CHAONA"], ["export", "Export"]].map(([v, l]) => (
            <label key={v} className="flex items-center gap-2"><input type="checkbox" value={v} className="h-4 w-4 accent-teak" {...f.register("products")} />{l}</label>
          ))}
        </div>
      </fieldset>
      <fieldset className="md:col-span-2">
        <legend className="mb-2 text-sm font-medium">I need</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[["sample", "Sample kit"], ["quotation", "Quotation"], ["callback", "Call back"]].map(([v, l]) => (
            <label key={v} className="flex items-center gap-2"><input type="radio" value={v} className="h-4 w-4 accent-teak" {...f.register("need")} />{l}</label>
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

function ImporterForm({ onDone }: { onDone: () => void }) {
  const f = useForm<ImporterValues>({ resolver: zodResolver(importerSchema), defaultValues: { categories: [] } });
  const e = f.formState.errors;
  return (
    <form
      noValidate
      onSubmit={f.handleSubmit(async (v) => {
        trackEvent("form_submit_importer");
        await submitLead({ route: "export", ...v });
        toast.success("Request received. Thank you.");
        onDone();
      })}
      className="grid gap-5 md:grid-cols-2"
    >
      <Field label="Full name" error={e.fullName?.message}><input className={inputCls} autoComplete="name" {...f.register("fullName")} /></Field>
      <Field label="Company" error={e.company?.message}><input className={inputCls} autoComplete="organization" {...f.register("company")} /></Field>
      <Field label="Country" error={e.country?.message}><input className={inputCls} autoComplete="country-name" {...f.register("country")} /></Field>
      <Field label="Email" error={e.email?.message}><input type="email" className={inputCls} autoComplete="email" {...f.register("email")} /></Field>
      <Field label="Phone" optional><input type="tel" className={inputCls} autoComplete="tel" {...f.register("phone")} /></Field>
      <Field label="Volume" optional><input className={inputCls} placeholder="e.g. containers per month" {...f.register("volume")} /></Field>
      <fieldset className="md:col-span-2">
        <legend className="mb-2 text-sm font-medium">Categories</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {["Frozen Thai food", "Curry pastes and ingredients", "Dehydrated fruit and noodles"].map((l) => (
            <label key={l} className="flex items-center gap-2"><input type="checkbox" value={l} className="h-4 w-4 accent-charcoal" {...f.register("categories")} />{l}</label>
          ))}
        </div>
      </fieldset>
      <div className="md:col-span-2"><Field label="Additional notes" optional><textarea rows={3} className={inputCls} {...f.register("notes")} /></Field></div>
      <div className="md:col-span-2"><ConsentBox reg={f.register("consent")} error={e.consent?.message} /></div>
      <div className="md:col-span-2"><CtaButton type="submit" variant="outline-dark" track="form_submit_click_importer" disabled={f.formState.isSubmitting}>Submit request</CtaButton></div>
    </form>
  );
}

export function RequestForm() {
  const [mode, setMode] = useState<"hotel" | "importer">("hotel");
  const [prefill, setPrefill] = useState<Prefill>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const h = (ev: Event) => {
      const d = (ev as CustomEvent<Prefill>).detail ?? {};
      setDone(false);
      if (d.mode) setMode(d.mode);
      setPrefill({ ...d });
    };
    window.addEventListener("gp:prefill", h);
    return () => window.removeEventListener("gp:prefill", h);
  }, []);

  return (
    <Section id="request" className="border-t border-border" label="Request form">
      <div className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Get started" title="Request a sample kit or quotation" />
        {done ? (
          <div className="rounded-md border border-border bg-card p-8" role="status">
            <h3 className="text-3xl">Thank you. We have your request.</h3>
            <p className="mt-3 text-sm text-muted-foreground">We will be in touch: <NeedFromGreenpeak label="response time, e.g. within 1 business day" /></p>
            <button type="button" onClick={() => setDone(false)} className="mt-6 text-sm text-teak underline underline-offset-4">Send another request</button>
          </div>
        ) : (
          <>
            <div role="tablist" aria-label="Who are you" className="mb-8 inline-flex rounded-md border border-border p-1">
              {([["hotel", "I'm a hotel"], ["importer", "I'm an importer / distributor"]] as const).map(([v, l]) => (
                <button
                  key={v}
                  role="tab"
                  type="button"
                  aria-selected={mode === v}
                  onClick={() => { trackEvent(`form_toggle_${v}`); setMode(v); }}
                  className={cn("rounded-sm px-4 py-2 text-sm transition-colors", mode === v ? "bg-teak text-ivory" : "text-charcoal hover:bg-mist")}
                >
                  {l}
                </button>
              ))}
            </div>
            {mode === "hotel" ? <HotelForm prefill={prefill} onDone={() => setDone(true)} /> : <ImporterForm onDone={() => setDone(true)} />}
          </>
        )}
      </div>
    </Section>
  );
}

export function Faq() {
  const items = [
    ["What is the minimum order quantity (MOQ)?", "MOQ"],
    ["How much does a sample kit cost, and how is it shipped?", "sample cost and shipping"],
    ["What is the typical lead time?", "lead time"],
    ["Which areas do you deliver to?", "delivery area"],
    ["How does custom branding work?", "custom branding details"],
    ["What are your payment terms?", "payment terms"],
  ];
  return (
    <Section className="border-t border-border bg-card" label="FAQ">
      <div className="mx-auto max-w-3xl">
        <SectionTitle title="Frequently asked questions" />
        <Accordion type="single" collapsible className="border-t border-border">
          {items.map(([q, l]) => (
            <AccordionItem key={q} value={q} className="border-border">
              <AccordionTrigger className="py-5 text-left font-display text-lg font-normal hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent><NeedFromGreenpeak label={l} /></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal pb-24 pt-16 text-ivory md:pb-12">
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
          <p className="pt-2"><a href="mailto:sales@greenpeaktransform.com" className="underline-offset-4 hover:underline">sales@greenpeaktransform.com</a></p>
        </div>
        <ul className="space-y-2 text-sm">
          <li><a href={LINE_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("footer_line")} className="hover:underline">LINE</a></li>
          <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a></li>
          <li><a href="#" className="hover:underline">GeoAsia</a></li>
          <li><a href="#" className="hover:underline">Privacy notice (Thai PDPA)</a></li>
        </ul>
      </div>
      <div className="container-gp mt-12 border-t border-ivory/20 pt-6 text-xs text-ivory/70">
        &copy; {new Date().getFullYear()} Greenpeak Transformation Co., Ltd.
      </div>
    </footer>
  );
}
