import straws from "@/assets/gp/sustainabletableware.jpg";
import leaves from "@/assets/gp/sustainability.jpg";
import { ImageSlot, Section, SectionTitle } from "./shared";

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
  return (
    <Section id="about" className="border-t border-border bg-card" label="About Us">
      <div className="max-w-3xl">
        <SectionTitle title="About Us" subline="Your Partner in Hotel Amenities Supply" />
        <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
          GreenPeak Transformation supplies hotel amenities and guest essentials to hotels, resorts, and hospitality businesses. Our portfolio includes hotel slippers, personal-care amenities, and CHAONA rice straws — our own Thai brand offering an alternative to conventional plastic drinking straws. By combining carefully selected products with responsive communication, clear quotations, and personalized service, we help hospitality partners find practical sourcing solutions tailored to their needs.
        </p>
        <hr className="my-12 border-border md:my-16" />
        <div className="mb-10 md:mb-14">
          <h3 className="text-3xl md:text-4xl">Our Foundation</h3>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">Built on more than 20 Years of Experience</p>
        </div>
        <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
          With a business heritage dating back to 2001, our foundation is in Business-to-Government (B2G) operations, specializing in IT hardware supply and installation for government and institutional customers. This experience has shaped our understanding of business supply, project coordination, and customer requirements. Today, GreenPeak Transformation builds on this foundation to serve the hospitality industry with practical product solutions and personalized service.
        </p>
      </div>
    </Section>
  );
}
