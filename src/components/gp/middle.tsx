import straws from "@/assets/gp/sustainabletableware.jpg";
import leaves from "@/assets/gp/sustainability.jpg";
import { MapPin, Leaf, MessageCircle } from "lucide-react";
import { ImageSlot, Section, SectionTitle, trackEvent, LINE_URL } from "./shared";

export function Chaona() {
  return (
    <Section id="chaona" className="bg-teak text-ivory" label="CHAONA">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <ImageSlot src={straws} caption="IMAGE: CHAONA rice straw in a cocktail glass" alt="CHAONA rice straw in a cocktail glass" />
        <div>
          <p className="eyebrow mb-4 text-celadon">A GreenPeak Original</p>
          <h2 className="text-5xl md:text-7xl">CHAONA</h2>
          <p className="mt-4 font-display text-xl italic md:text-2xl">From nature, for nature.</p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/90 md:text-lg">
            Crafted from natural rice and plant-based ingredients, CHAONA offers a fully biodegradable, edible alternative to single-use plastics. Designed specifically for the hospitality industry, these straws provide a seamless guest experience while eliminating environmental waste. By turning renewable agricultural resources into eco-friendly dining solutions, CHAONA helps businesses make a tangible shift toward a cleaner, plastic-free future.
          </p>
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
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle title="Sustainability" />
          <p className="max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
            At GreenPeak, sustainability is the foundation of everything we create. We bridge the gap between luxury guest experiences and environmental responsibility by engineering amenities crafted entirely from rapidly renewable, plant-based materials. From non-toxic soy inks to zero-plastic packaging, every product in our portfolio is designed to reduce landfill reliance, conserve natural resources, and empower hotel partners to lead the transition toward conscious hospitality.
          </p>
          {/* Certificate logos go here (row of badges under the paragraph). */}
        </div>
        <ImageSlot
          src={leaves}
          ratio="aspect-[4/5]"
          caption="IMAGE: eucalyptus branch"
          alt="Eucalyptus branch against a white background"
          className="[&_img]:object-[50%_85%]"
        />
      </div>
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
