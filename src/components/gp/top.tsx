import hero from "@/assets/gp/hero.jpg";
import amenities from "@/assets/gp/ecoamenities.jpg";
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
  { label: "Amenity", href: "#amenities" },
  { label: "CHAONA", href: "#chaona" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "About\n", href: "#about" },
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
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center gap-2 border-t border-border bg-ivory p-2 md:hidden">
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
        src={hero}
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
            <CtaButton variant="secondary-light" track="hero_quotation" onClick={() => goToRequest({ mode: "hotel", need: "quotation" })}>Get a Quotation</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AmenityKits() {
  const packaging = "Kraft, sugarcane, stone-paper or paper sachet, or paper / kraft box.";
  const kits = [
    {
      name: "Bath & Hair",
      slug: "bath-hair",
      specLabel: "Contents",
      spec: "Cornstarch-based shower cap, natural fiber or cotton loofah, bamboo / wood or cornstarch-based comb.",
    },
    {
      name: "Vanity",
      slug: "vanity",
      specLabel: "Contents",
      spec: "Wood cotton buds (4 pcs), cotton pads (3 pcs), nail file, sewing kit (6 threads, 2 buttons, needle, pin).",
    },
    {
      name: "Dental",
      slug: "dental",
      specLabel: "Materials",
      spec: "Bamboo or cornstarch-based handle, soft bristles. Approx. 17.5–18 cm. Custom handle and bristle colors.",
    },
    {
      name: "Shaving",
      slug: "shaving",
      specLabel: "Materials",
      spec: "Wood handle or cornstarch-based handle. Choice of 3 cover styles; custom colors.",
    },
  ];
  return (
    <Section id="amenities" label="Amenity Kits">
      <SectionTitle eyebrow="For guest rooms" title="Amenity Kits" />
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {kits.map((k) => (
          <article key={k.slug} className="flex flex-col rounded-md border border-border bg-card p-2 sm:p-3 transition-colors duration-300 hover:border-charcoal">
            <ImageSlot caption={`IMAGE: ${k.name} kit`} alt={`GreenPeak Transform ${k.name.toLowerCase()} kit`} />
            <div className="flex flex-1 flex-col gap-2 p-1 pt-3 sm:p-2 sm:pt-5">
              <h3 className="text-lg sm:text-2xl">{k.name} Kit</h3>
              <p className="text-xs sm:text-sm"><span className="text-muted-foreground">{k.specLabel}: </span>{k.spec}</p>
              <p className="text-xs sm:text-sm"><span className="text-muted-foreground">Packaging: </span>{packaging}</p>
              <div className="mt-auto pt-2">
                <CtaButton variant="quiet" track={`kit_quotation_${k.slug}`} onClick={() => goToRequest({ mode: "hotel", need: "quotation", product: "amenity" })}>
                  Get a Quotation
                </CtaButton>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-xs text-muted-foreground sm:text-sm">
        All items can be custom-branded with your logo: full-color printing, foil stamping, spot UV, gloss or matt finish. Standard plastic options also available.
      </p>
      <div className="mt-10">
        <CtaButton variant="secondary" track="view_amenities_catalog" onClick={() => window.open("https://drive.google.com/file/d/1z3HqGJmn3R5_JX8LVh-FIPOw_mrSdHRU/view?usp=sharing", "_blank", "noopener,noreferrer")}>
          View Amenities Catalog
        </CtaButton>
      </div>
    </Section>
  );
}

export function Slippers() {
  return (
    <Section className="border-t border-border" label="Slippers">
      <SectionTitle eyebrow="For guest rooms" title="Slippers" />
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <article key={n} className="rounded-md border border-border bg-card p-2 sm:p-3 transition-colors duration-300 hover:border-charcoal">
            <ImageSlot caption={`IMAGE: Slipper style ${n}`} alt={`GreenPeak Transform slipper style ${n}`} />
            <div className="space-y-2 p-1 pt-3 sm:p-2 sm:pt-5">
              <h3 className="text-lg sm:text-2xl">Slipper style {n}</h3>
              <NeedFromGreenpeak label="sole / upper material" />
              <p className="text-xs sm:text-sm text-muted-foreground">Logo: embroidery or printing</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10">
        <CtaButton variant="secondary" track="view_slipper_catalog" onClick={() => window.open("https://drive.google.com/file/d/1-cNsGqdac7Sq9TT7dLEA_cG43ZcdMwjV/view?usp=sharing", "_blank", "noopener,noreferrer")}>
          View Slipper Catalog
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
        <ImageSlot src={amenities} caption="IMAGE: mock-up of a co-branded kit" alt="Mock-up of a co-branded GreenPeak Transform amenity kit" />
      </div>
    </Section>
  );
}
