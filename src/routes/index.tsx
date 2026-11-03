import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header, Hero, ProofStrip, AmenityKits, Slippers, Customization } from "@/components/gp/top";
import { Chaona, Sustainability, WhyGreenpeak } from "@/components/gp/middle";
import { RequestForm, Footer } from "@/components/gp/bottom";

const TITLE = "GreenPeak Transform | Sustainable Guest Amenities for Thai Hotels";
const DESC =
  "Eco hotel amenities in Thailand: sustainable amenity kits, slippers and CHAONA rice straws, custom-branded with your logo and supplied from Bangkok.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <AmenityKits />
        <Slippers />
        <Customization />
        <Chaona />
        <Sustainability />
        <WhyGreenpeak />
        <RequestForm />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
