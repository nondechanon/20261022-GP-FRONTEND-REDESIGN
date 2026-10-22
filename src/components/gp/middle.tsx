import straws from "@/assets/gp/sustainabletableware.jpg";
import { FileText, ShieldCheck, Recycle, MapPin, Leaf, MessageCircle } from "lucide-react";
import { ImageSlot, NeedFromGreenpeak, Section, SectionTitle, trackEvent, LINE_URL } from "./shared";

export function Chaona() {
  const specs = ["Made from Thai rice", "Biodegradable (claim needs test report)", "Edible", "Supports Thai farmers"];
  return (
    <Section id="chaona" className="bg-teak text-ivory" label="CHAONA">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <ImageSlot src={straws} caption="IMAGE: CHAONA rice straw in a cocktail glass" alt="CHAONA rice straw in a cocktail glass" />
        <div>
          <p className="eyebrow mb-4 text-celadon">Our own brand</p>
          <h2 className="text-5xl md:text-7xl">CHAONA</h2>
          <p className="mt-4 font-display text-xl italic md:text-2xl">From guest room to rooftop bar.</p>
          <ul className="mt-10 grid grid-cols-2 border-l border-t border-ivory/25">
            {specs.map((s) => (
              <li key={s} className="border-b border-r border-ivory/25 p-4 text-sm">{s}</li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col items-start gap-2">
            <NeedFromGreenpeak label="biodegradable, edible and food-contact test reports" />
            <NeedFromGreenpeak label="rice / farmer impact figure" />
          </div>
          <div className="mt-10 flex flex-col items-start gap-4">
            {/* Enable only after chaonaricestraw.com is upgraded. */}
            <span aria-disabled="true" className="cursor-not-allowed text-sm text-ivory/60 underline underline-offset-4">Visit CHAONA</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Sustainability() {
  return (
    <Section id="sustainability" label="Sustainability">
      <SectionTitle eyebrow="Sustainability you can verify" title="Every claim backed by a document." />
      <div className="grid border-t border-border md:grid-cols-3">
        <div className="border-b border-border py-8 md:border-b-0 md:border-r md:pr-8">
          <FileText className="mb-5 h-6 w-6 text-teak" strokeWidth={1.25} />
          <h3 className="mb-3 text-2xl">Materials</h3>
          <p className="text-sm text-muted-foreground">Downloadable spec sheets per SKU.</p>
        </div>
        <div className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8">
          <ShieldCheck className="mb-5 h-6 w-6 text-teak" strokeWidth={1.25} />
          <h3 className="mb-3 text-2xl">Certifications</h3>
          <NeedFromGreenpeak label="supplier or factory certificates" />
        </div>
        <div className="py-8 md:pl-8">
          <Recycle className="mb-5 h-6 w-6 text-teak" strokeWidth={1.25} />
          <h3 className="mb-3 text-2xl">Impact</h3>
          <p className="mb-3 text-sm text-muted-foreground">Plastic items replaced, from real SKUs.</p>
          <NeedFromGreenpeak label="plastic items replaced per 100 rooms/month" />
        </div>
      </div>
      <p className="mt-10 max-w-2xl border-t border-border pt-6 text-sm">
        Aligned with Thailand's Roadmap on Plastic Waste Management 2018-2030 and Green Hotel procurement criteria.
      </p>

    </Section>
  );
}

export function WhyGreenpeak() {
  const diffs = [
    { icon: MapPin, title: "Thai-made" },
    { icon: Leaf, title: "Own brand, CHAONA" },
    { icon: MessageCircle, title: "Local responsiveness: a named contact who answers on LINE" },
  ];
  return (
    <Section id="about" className="border-t border-border bg-card" label="Why GreenPeak">
      <SectionTitle eyebrow="About" title="Why GreenPeak Transform" />
      <div className="grid gap-12">
        <ul className="grid gap-4 lg:grid-cols-3">
          {diffs.map(({ icon: Icon, title }) => (
            <li key={title} className="flex items-start gap-4 rounded-md border border-border bg-background p-5">
              <Icon className="mt-1 h-5 w-5 shrink-0 text-teak" strokeWidth={1.25} />
              <h3 className="text-xl">{title}</h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12 flex flex-col gap-6 rounded-md border border-border bg-background p-5 sm:flex-row sm:items-center">
        <ImageSlot caption="IMAGE: contact photo" alt="Photo of your GreenPeak Transform contact" ratio="aspect-square" className="w-24 shrink-0" />
        <div className="flex-1">
          <p className="eyebrow mb-2 text-muted-foreground">Your contact</p>
          <p className="font-display text-2xl">Mr. Pharunyu L.</p><p className="text-sm text-muted-foreground"><a href="tel:+66994246141" className="hover:underline">+66 99 424 6141</a> · <a href="mailto:Pharunyu.l@gmail.com" className="hover:underline">Pharunyu.l@gmail.com</a></p>
        </div>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("contact_talk_on_line")}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-teak px-5 py-3 text-sm text-teak transition-colors duration-300 hover:bg-teak hover:text-ivory"
        >
          Talk to Pharunyu on LINE
        </a>
      </div>
    </Section>
  );
}
