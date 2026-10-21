import { useEffect, useRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Lightweight analytics hook. Replace console.log with a real tracker later. */
export function trackEvent(name: string) {
  console.log("[trackEvent]", name);
}

export type Prefill = {
  mode?: "hotel" | "importer";
  need?: "sample" | "quotation" | "callback";
  product?: "amenity" | "slippers" | "chaona" | "export";
};

/** Scroll to the request form (S11) and preselect fields. */
export function goToRequest(prefill: Prefill = {}) {
  window.dispatchEvent(new CustomEvent<Prefill>("gp:prefill", { detail: prefill }));
  document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
}

/** Placeholder chip for missing client content. Search "NeedFromGreenpeak" to find them all. */
export function NeedFromGreenpeak({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm bg-chip px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-charcoal",
        className,
      )}
    >
      NEED FROM GREENPEAK: {label}
    </span>
  );
}

/** Swappable image slot. Pass `src` to replace the gray placeholder with a real photo. */
export function ImageSlot({
  caption,
  alt,
  src,
  ratio = "aspect-[4/5]",
  className,
}: {
  caption: string;
  alt: string;
  src?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-slot", ratio, className)}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div role="img" aria-label={alt} className="flex h-full w-full items-center justify-center p-4 text-center">
          <span className="text-xs text-muted-foreground">{caption}</span>
        </div>
      )}
    </div>
  );
}

type CtaVariant = "primary" | "secondary" | "secondary-light" | "quiet" | "outline-dark";

const ctaStyles: Record<CtaVariant, string> = {
  primary: "bg-terracotta text-ivory hover:bg-terracotta-hover font-semibold",
  secondary: "border border-teak text-teak hover:bg-teak hover:text-ivory",
  "secondary-light": "border border-ivory text-ivory hover:bg-ivory hover:text-charcoal",
  "outline-dark": "border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory",
  quiet: "px-0! text-teak underline-offset-4 hover:underline",
};

export function CtaButton({
  variant = "primary",
  track,
  className,
  onClick,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: CtaVariant; track: string }) {
  return (
    <button
      type="button"
      {...rest}
      onClick={(e) => {
        trackEvent(track);
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        ctaStyles[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Section wrapper with slow fade-in on scroll. */
export function Section({
  id,
  className,
  innerClassName,
  children,
  label,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} aria-label={label} className={cn("py-16 md:py-24", className)}>
      <div ref={ref} className={cn("container-gp reveal", innerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, className }: { eyebrow?: string; title: string; className?: string }) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      {eyebrow && <p className="eyebrow mb-3 text-muted-foreground">{eyebrow}</p>}
      <h2 className="text-3xl md:text-5xl">{title}</h2>
    </div>
  );
}

export const LINE_URL = "https://line.me/R/ti/p/@greenpeak-placeholder";
export const WHATSAPP_URL = "https://wa.me/66000000000";
