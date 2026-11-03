import hero from "@/assets/gp/hero.jpg";
import customizationAsset from "@/assets/gp/customization-logo.png.asset.json";
import logo from "@/assets/gp/logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  CtaButton,
  ImageSlot,
  Section,
  SectionTitle,
  goToRequest,
} from "./shared";

const NAV = [
  { label: "Amenity", href: "#amenities" },
  { label: "CHAONA", href: "#chaona" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "About\n", href: "#about" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-ivory">
        <div className="flex h-16 w-full items-center justify-between gap-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] md:h-20 md:pl-[max(2rem,env(safe-area-inset-left,0px))] md:pr-[max(2rem,env(safe-area-inset-right,0px))] lg:pl-[max(3rem,env(safe-area-inset-left,0px))] lg:pr-[max(3rem,env(safe-area-inset-right,0px))]">
          <a href="#top" aria-label="GreenPeak Transformation, back to top" className="inline-flex min-h-11 items-center">
            <img src={logo} alt="GreenPeak Transformation" width={1000} height={162} className="h-9 w-auto md:h-12" />
          </a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-8 text-sm">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-teak hover:underline underline-offset-4">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden"
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
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-[88svh] w-full overflow-hidden" aria-label="Introduction">
      <ImageSlot
        priority
        src={hero}
        caption="IMAGE: hotel pool terrace (full-bleed)"
        alt="Hotel pool terrace with green and white scalloped umbrellas and loungers"
        ratio=""
        className="absolute inset-0 h-full rounded-none"
      />
      <div className="hero-scrim absolute inset-0" />
      <div className="container-gp relative flex min-h-[88svh] flex-col justify-end pb-16 pt-24 md:pb-24">
        <div className="max-w-3xl text-ivory [text-shadow:0_1px_14px_oklch(0.15_0.02_160/0.45)]">
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
    // Display order, left to right: Dental, Shaving, Vanity, Bath & Hair.
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
    {
      name: "Vanity",
      slug: "vanity",
      specLabel: "Contents",
      spec: "Wood cotton buds (4 pcs), cotton pads (3 pcs), nail file, sewing kit (6 threads, 2 buttons, needle, pin).",
    },
    {
      name: "Bath & Hair",
      slug: "bath-hair",
      specLabel: "Contents",
      spec: "Cornstarch-based shower cap, natural fiber or cotton loofah, bamboo / wood or cornstarch-based comb.",
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
  // Spec data source: Greenpeak_Slipper_Catalog.pdf (model codes in parentheses).
  const packaging = "Kraft paper band or clear plastic bag.";
  const slippers = [
    {
      name: "Ultrasonic Non-woven",
      slug: "ultrasonic-non-woven",
      models: "SU01, SU02",
      upper: "Lightweight non-woven with durable ultrasonic seams.",
      sole: "Wave pattern sole (white, SU01) or anti-slip dot sole (black, SU02).",
    },
    {
      name: "Non-woven",
      slug: "non-woven",
      models: "S01",
      upper: "Lightweight, hygienic and disposable non-woven.",
      sole: "4 mm non-skid EVA sole.",
    },
    {
      name: "Nap Cloth",
      slug: "nap-cloth",
      models: "SN01",
      upper: "Comfortable nap cloth with a 3 mm soft sponge heel.",
      sole: "4 mm non-skid EVA sole.",
    },
    {
      name: "Terry",
      slug: "terry",
      models: "ST01, ST02",
      upper: "Plush terry cloth, classic spa feel.",
      sole: "Single sole with 3 mm EVA (ST01) or double sole with 3 mm EVA and 4 mm padded footbed (ST02).",
    },
  ];
  return (
    <Section id="slippers" className="border-t border-border" label="Slippers">
      <SectionTitle eyebrow="For guest rooms" title="Slippers" />
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {slippers.map((s) => (
          <article key={s.slug} className="flex flex-col rounded-md border border-border bg-card p-2 sm:p-3 transition-colors duration-300 hover:border-charcoal">
            <ImageSlot caption={`IMAGE: ${s.name} slipper`} alt={`GreenPeak Transform ${s.name.toLowerCase()} slipper`} />
            <div className="flex flex-1 flex-col gap-2 p-1 pt-3 sm:p-2 sm:pt-5">
              <h3 className="text-lg sm:text-2xl">{s.name} Slipper</h3>
              <p className="text-xs sm:text-sm"><span className="text-muted-foreground">Upper: </span>{s.upper}</p>
              <p className="text-xs sm:text-sm"><span className="text-muted-foreground">Sole: </span>{s.sole}</p>
              <p className="text-xs sm:text-sm"><span className="text-muted-foreground">Packaging: </span>{packaging}</p>
              <div className="mt-auto pt-2">
                <CtaButton variant="quiet" track={`slipper_quotation_${s.slug}`} onClick={() => goToRequest({ mode: "hotel", need: "quotation", product: "slippers" })}>
                  Get a Quotation
                </CtaButton>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-xs text-muted-foreground sm:text-sm">
        All slippers are made to order: black, white or custom colors, with your logo by screen print or embroidery. Open-toe style available.
      </p>
      <div className="mt-10">
        <CtaButton variant="secondary" track="view_slipper_catalog" onClick={() => window.open("https://drive.google.com/file/d/1-cNsGqdac7Sq9TT7dLEA_cG43ZcdMwjV/view?usp=sharing", "_blank", "noopener,noreferrer")}>
          View Slipper Catalog
        </CtaButton>
      </div>
    </Section>
  );
}

export function Customization() {
  return (
    <Section className="bg-card" label="Customization">
      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionTitle eyebrow="Customization" title="Product Customization" />
          <p className="max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
            Elevate your guest experience with complete product and packaging customization. Select your preferred eco-friendly amenities, provide your logo, and choose from premium print finishes and tailored box or sachet designs. Once your custom design mock-up and sample are approved, we manage full production and delivery so your brand is effortlessly showcased in every guest room.
          </p>
          <div className="mt-10">
            <CtaButton variant="secondary" track="custom_start_branded_kit" onClick={() => goToRequest({ mode: "hotel", need: "quotation", product: "amenity" })}>
              Start a Branded Kit
            </CtaButton>
          </div>
        </div>
        <ImageSlot
          src={customizationAsset.url}
          caption="IMAGE: mock-up of a co-branded kit"
          alt="Mock-up of co-branded amenity sachets for shampoo, conditioner, body wash, body lotion and dental kit, each marked Your Logo Here"
        />
      </div>
    </Section>
  );
}
