import { useState } from "react";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import {
  CtaButton,
  ImageSlot,
  NeedFromGreenpeak,
  Section,
  SectionTitle,
  goToRequest,
  trackEvent,
  LINE_URL,
  WHATSAPP_URL,
} from "./shared";

const NAV = [
  { label: "Amenities", href: "#amenities" },
  { label: "CHAONA", href: "#chaona" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "About", href: "#about" },
  { label: "Export", href: "#export" },
];

export function UtilityBar() {
  return (
    <div className="bg-charcoal text-ivory">
      <div className="container-gp flex items-center justify-between gap-4 py-2 text-xs">
        <p className="hidden md:block">Now quoting 2027 amenity programs for Thai hotels</p>
        <div className="flex gap-4">
          <a href={LINE_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("utility_line")} className="hover:underline">LINE</a>
          <span aria-hidden>/</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("utility_whatsapp")} className="hover:underline">WhatsApp</a>
        </div>
        <a href="#export" onClick={() => trackEvent("utility_export")} className="hover:underline">
          Thai Food Export &gt;
        </a>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-ivory">
        <div className="container-gp flex h-16 items-center justify-between gap-4 md:h-20">
          <a href="#top" className="font-display text-xl tracking-tight text-teak md:text-2xl">GreenPeak Transform</a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-8 text-sm">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-teak hover:underline underline-offset-4">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <CtaButton track="header_sample_kit" onClick={() => goToRequest({ mode: "hotel", need: "sample" })} className="hidden sm:inline-flex">
              Request Sample Kit
            </CtaButton>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="rounded-md p-2 lg:hidden"
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
        {open && (
          <nav aria-label="Mobile" className="border-t border-border lg:hidden">
            <ul className="container-gp flex flex-col py-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={() => setOpen(false)} className="block border-b border-border py-3 last:border-0">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      {/* Mobile-only sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-ivory p-2 md:hidden">
        <CtaButton track="mobilebar_sample_kit" onClick={() => goToRequest({ mode: "hotel", need: "sample" })} className="flex-1 py-3">
          Request Sample Kit
        </CtaButton>
        <a href={LINE_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("mobilebar_line")} aria-label="Chat on LINE" className="inline-flex items-center gap-1 rounded-md border border-teak px-3 text-sm text-teak">
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> LINE
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("mobilebar_whatsapp")} aria-label="Chat on WhatsApp" className="inline-flex items-center gap-1 rounded-md border border-teak px-3 text-sm text-teak">
          <Phone className="h-4 w-4" strokeWidth={1.5} /> WhatsApp
        </a>
      </div>
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-[88vh] w-full overflow-hidden" aria-label="Introduction">
      <ImageSlot
        caption="IMAGE: GreenPeak kit + slippers in a Thai hotel bathroom (full-bleed)"
        alt="GreenPeak Transform amenity kit and slippers in a Thai hotel bathroom"
        ratio=""
        className="absolute inset-0 h-full rounded-none"
      />
      <div className="hero-scrim absolute inset-0" />
      <div className="container-gp relative flex min-h-[88vh] flex-col justify-end pb-16 pt-24 md:pb-24">
        <div className="max-w-3xl text-ivory">
          <h1 className="text-4xl leading-[1.08] md:text-7xl">Sustainable guest amenities for Thailand's finest hotels.</h1>
          <p className="mt-6 max-w-xl text-base md:text-lg">
            Eco amenity kits, slippers and our own CHAONA rice straws, custom-branded with your logo and supplied from Bangkok.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaButton track="hero_sample_kit" onClick={() => goToRequest({ mode: "hotel", need: "sample" })}>Request a Sample Kit</CtaButton>
            <CtaButton variant="secondary-light" track="hero_quotation" onClick={() => goToRequest({ mode: "hotel", need: "quotation" })}>Get a Quotation</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

const SHOW_LOGOS = false;

export function ProofStrip() {
  return (
    <Section className="border-b border-border py-12 md:py-16" label="Proof">
      {/* Show logos if available (set SHOW_LOGOS = true), otherwise show the fact tiles. */}
      <div className={SHOW_LOGOS ? "" : "mb-10"}>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="flex aspect-[3/2] items-center justify-center rounded-md bg-slot p-2 text-center">
              <NeedFromGreenpeak label="hotel client logo (with permission)" />
            </li>
          ))}
        </ul>
      </div>
      {!SHOW_LOGOS && (
        <dl className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
          {([
            ["Kit SKUs available", "number of kit SKUs"],
            ["Delivery area", "delivery area"],
            ["Typical lead time", "typical lead time"],
            ["Minimum order for custom branding", "custom branding MOQ"],
          ] as const).map(([t, l]) => (
            <div key={t} className="border-b border-border p-5 lg:border-b-0 lg:border-r last:border-r-0">
              <dt className="eyebrow mb-3 text-muted-foreground">{t}</dt>
              <dd><NeedFromGreenpeak label={l} /></dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  );
}

export function AmenityKits() {
  const kits = ["Bathroom", "Vanity", "Dental", "Shaving"];
  return (
    <Section id="amenities" label="Amenity Kits">
      <SectionTitle eyebrow="For guest rooms" title="Amenity Kits" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kits.map((k) => (
          <article key={k} className="flex flex-col rounded-md border border-border bg-card p-3 transition-colors duration-300 hover:border-charcoal">
            <ImageSlot caption={`IMAGE: ${k} kit`} alt={`GreenPeak Transform ${k.toLowerCase()} kit`} />
            <div className="flex flex-1 flex-col gap-3 p-2 pt-5">
              <h3 className="text-2xl">{k} Kit</h3>
              <p className="text-sm"><span className="text-muted-foreground">Materials: </span><NeedFromGreenpeak label={`${k.toLowerCase()} kit materials`} /></p>
              <p className="text-sm"><span className="text-muted-foreground">Pack format: </span><NeedFromGreenpeak label={`${k.toLowerCase()} kit pack format`} /></p>
              <div className="mt-auto pt-2">
                <CtaButton variant="quiet" track={`kit_quotation_${k.toLowerCase()}`} onClick={() => goToRequest({ mode: "hotel", need: "quotation", product: "amenity" })}>
                  Get a Quotation
                </CtaButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Slippers() {
  return (
    <Section className="border-t border-border" label="Slippers">
      <SectionTitle eyebrow="For guest rooms" title="Slippers" />
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <article key={n} className="rounded-md border border-border bg-card p-3 transition-colors duration-300 hover:border-charcoal">
            <ImageSlot caption={`IMAGE: Slipper style ${n}`} alt={`GreenPeak Transform slipper style ${n}`} />
            <div className="space-y-3 p-2 pt-5">
              <h3 className="text-2xl">Slipper style {n}</h3>
              <NeedFromGreenpeak label="sole / upper material" />
              <p className="text-sm text-muted-foreground">Logo: embroidery or printing</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10">
        <CtaButton variant="secondary" track="slippers_add_to_kit" onClick={() => goToRequest({ mode: "hotel", need: "sample", product: "slippers" })}>
          Add slippers to my sample kit
        </CtaButton>
      </div>
    </Section>
  );
}

export function Customization() {
  const steps = ["Brief", "Material & design mock-up", "Sample approval", "Delivery"];
  return (
    <Section className="bg-card" label="Customization">
      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionTitle eyebrow="Customization" title="Your logo, your story" />
          <ol className="grid gap-0 border-t border-border md:grid-cols-4 md:border-t-0">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4 border-b border-border py-5 md:flex-col md:gap-3 md:border-b-0 md:border-t md:pr-4">
                <span className="font-display text-3xl text-teak">{i + 1}</span>
                <span className="text-sm font-medium">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <CtaButton variant="secondary" track="custom_start_branded_kit" onClick={() => goToRequest({ mode: "hotel", need: "quotation", product: "amenity" })}>
              Start a Branded Kit
            </CtaButton>
          </div>
        </div>
        <ImageSlot caption="IMAGE: mock-up of a co-branded kit" alt="Mock-up of a co-branded GreenPeak Transform amenity kit" />
      </div>
    </Section>
  );
}
