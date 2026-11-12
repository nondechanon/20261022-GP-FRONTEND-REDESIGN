# GreenPeak Transformation — Project Handover

Landing page for **GreenPeak Transformation Co., Ltd.**, a Bangkok-based supplier of
sustainable guest amenities (amenity kits, slippers, CHAONA rice straws) for Thai hotels.
Single-page marketing site with a quotation request form. **No backend exists yet** — form
submissions and analytics are console.log stubs waiting for a real destination.

- Live reference (old site, scraped for content): https://greenpeaktransform.com/
- Client contact: Mr. Pharunyu L., +66 99 424 6141, Pharunyu.l@gmail.com

---

## 1. Tech stack

- **TanStack Start v1** (React 19, SSR) on **Vite 7/8**, TypeScript, target: edge runtime
  (Cloudflare Workers-style). Entry points: `src/router.tsx`, `src/start.ts`, `src/server.ts`.
- **TanStack Router** (file-based): routes in `src/routes/`, `src/routeTree.gen.ts` is
  auto-generated — never edit it.
- **Tailwind CSS v4** via `@theme` in `src/styles.css` (no `tailwind.config.js`).
- **zod + react-hook-form** for the request form.
- **shadcn-style UI kit** in `src/components/ui/` (mostly unused by the page; the page uses
  its own components in `src/components/gp/`).
- **vitest + Testing Library** for tests (`src/test/`).
- Package manager: **bun** (`bun.lock`). npm/pnpm also work for install.

### Run it

```bash
bun install        # or: npm install
bun dev            # dev server (vite dev)
bun run build      # production build
bun test           # vitest
```

## 2. File map

| Path | What it is |
|---|---|
| `src/routes/__root.tsx` | Root shell: HTML skeleton, Google Fonts (Cormorant Garamond + Montserrat + Inter), favicon, site-wide title/meta, error + 404 components. |
| `src/routes/index.tsx` | The only page (`/`). Assembles all sections; page-level SEO title/description live here. |
| `src/styles.css` | **Design system "Rice & Teak"**: all colors, fonts, utilities. See §4. |
| `src/components/gp/shared.tsx` | Shared building blocks: `CtaButton`, `Section`, `SectionTitle`, `ImageSlot`, `trackEvent`, `goToRequest`, `LINE_URL`, `WHATSAPP_URL`, `Prefill` type. |
| `src/components/gp/top.tsx` | UtilityBar, Header (sticky nav + mobile bottom LINE/WhatsApp bar), Hero, AmenityKits, Slippers, Customization. |
| `src/components/gp/middle.tsx` | Chaona (teak band), Sustainability, WhyGreenpeak (About + contact card). |
| `src/components/gp/bottom.tsx` | RequestForm (quotation form + thank-you state), Footer. |
| `src/components/gp/request-schema.ts` | zod schema for the form. **Keep validation here** (browser-safe, independently testable) — project rule in `AGENTS.md`. |
| `src/assets/gp/*.jpg` | Photos scraped from the old site (compressed ≤1800px): hero, ecoamenities, sustainabletableware (CHAONA), authenticthaifood (currently unused). |
| `public/favicon.png` | GreenPeak logo (from old site). |
| `src/test/request-schema.test.ts` | Tests the form schema (allowed products, need values, consent). |
| `src/test/app-routing.test.tsx` | Smoke test that the route tree renders. |
| `AGENTS.md` | Project conventions (see §7). |

## 3. Page structure (top to bottom)

1. **UtilityBar** — dark strip: "Now quoting 2027 amenity programs" + LINE / WhatsApp links.
2. **Header** — sticky; nav anchors: Amenity (`#amenities`), CHAONA (`#chaona`),
   Sustainability (`#sustainability`), About (`#about`). Mobile gets a hamburger menu and a
   fixed bottom bar with LINE + WhatsApp buttons.
3. **Hero** — full-bleed photo, headline "Sustainable guest amenities for Thailand's finest
   hotels.", single CTA "Get a Quotation" → scrolls to form.
4. **ProofStrip (Hotel clients)** — looping marquee of 6 client logos (`CLIENTS` in `top.tsx`, files in
   `src/assets/gp/clients/`), between Hero and Amenity Kits.
   The loop is `.marquee` / `.marquee-track` in `src/styles.css` (38s linear infinite, pauses on
   hover, off under `prefers-reduced-motion`); the track holds two identical 6-slot sets so the
   -50% shift is seamless. Swap the slots for real logos once Greenpeak supplies them.
5. **Amenity Kits** — 4 cards (Bath & Hair, Vanity, Dental, Shaving) with Contents/Materials +
   Packaging copy, each with "Get a Quotation"; 2×2 grid on phones, 4-up on desktop. Below the
   grid: custom-branding note, then **View Amenities Catalog** (Google Drive PDF, opens in new tab).
6. **Slippers** — 3 style cards (materials still placeholders), then **View Slipper Catalog**
   (separate Google Drive PDF).
7. **Customization** — "Product Customization" paragraph, "Start a Branded Kit" CTA, and the
   co-branded amenity sachet mock-up photo (CDN asset `src/assets/gp/customization-logo.png.asset.json`).
8. **CHAONA** — dark teak band, rice-straw brand, spec tiles, disabled "Visit CHAONA" link.
9. **Sustainability** — Materials / Certifications / Impact columns.
10. **Why GreenPeak (About)** — 3 differentiators + contact card (Pharunyu, phone, email, LINE).
11. **Request a quotation** — form: name, company name, email, phone (all required), additional notes (optional), PDPA consent
    checkboxes (Amenity kits / Slippers / CHAONA), "I need" radio (Quotation / Call back),
    notes, PDPA consent (required). Submits → thank-you state with "Send another request".
12. **Footer** — company name, Bangkok, email, LINE and Privacy links.

### Removed by client request (do NOT re-add)

- All **sample requests** (including CHAONA samples) — only **quotation** requests exist (the "Call back" option was removed too).
- The **Export** section and any importer/export content.
- The **founder** quote/photo section, the **FAQ** section, and the proof-fact tiles
  (SKU counts, delivery area, lead time, MOQ). The looping client-logo strip itself was brought
  back by client request (item 4 above) — only the fact tiles stay out.
- The Sustainability "View Catalog 2026" button. Catalog buttons live **only** in Amenities and Slippers.

## 4. Design system ("Rice & Teak")

All colors/fonts/shadows are CSS custom properties in `src/styles.css` — **never hardcode
hex colors or `text-white`/`bg-black` in components**; use the tokens.

- Fonts (from the logo): **Cormorant Garamond** (main titles, h1/h2, `font-display`), **Montserrat** (2nd titles h3/h4, eyebrows, nav, buttons, form labels, `font-heading`), **Inter** (body copy). Loaded via `<link>` in `__root.tsx`.
- Tokens: `--ivory` (page bg), `--teak` (primary/headings/footer-dark), `--terracotta`
  (primary CTA buttons), `--charcoal` (text), `--celadon`, `--straw`, `--mist`,
  `--slot` (gray image placeholder).
- Utilities: `.eyebrow`, `.container-gp`, `.hero-scrim`, `.reveal` (IntersectionObserver
  fade-in, respects `prefers-reduced-motion`).
- Buttons: use `CtaButton` with a `variant` (`primary` = terracotta, `secondary`,
  `secondary-light`, `quiet`, `outline-dark`) and a `track` name.

## 5. Key mechanisms

- **`goToRequest(prefill)`** (shared.tsx): dispatches a `gp:prefill` CustomEvent and
  smooth-scrolls to `#request`. The form listens and resets the thank-you state. The form no
  longer has product / request-type fields, so the `Prefill` values (`need`, `product`) are
  accepted but not used.
- **`trackEvent(name)`**: console.log stub — swap in a real analytics call here.
- **`submitLead(payload)`** (bottom.tsx): console.log stub — **the form goes nowhere.**
  This is the main unfinished piece; wire it to email/CRM/backend.
- The yellow `NeedFromGreenpeak` placeholder chips have been removed from the site.
- **`ImageSlot`**: renders a gray placeholder until given a `src`. Kit and slipper photos
  are still placeholders.

## 6. External links (real, in use)

- Amenities catalog: https://drive.google.com/file/d/1z3HqGJmn3R5_JX8LVh-FIPOw_mrSdHRU/view?usp=sharing
- Slipper catalog: https://drive.google.com/file/d/1-cNsGqdac7Sq9TT7dLEA_cG43ZcdMwjV/view?usp=sharing
- WhatsApp: https://wa.me/66994246141

## 7. Conventions (from AGENTS.md + project rules)

- Keep hotel request validation in `src/components/gp/request-schema.ts` (browser-safe, no
  presentation imports) so allowed products/request types stay independently testable.
- Ask the client before assuming — they explicitly asked for questions over assumptions.
- When changing a rule the client cares about (allowed products, consent, removed sections),
  add/update a small vitest test and run `bun test`.

## 8. Open items / content still needed from the client

1. **Form delivery** — submissions are only logged; needs an email service or backend endpoint.
2. **LINE official account URL** — `LINE_URL` in `shared.tsx` is a placeholder.
3. **LinkedIn page URL** — footer currently links to linkedin.com homepage.
4. **Privacy notice (Thai PDPA)** — footer link is `#`; consent text references it.
5. **Slipper materials** (sole/upper) for the 3 styles + real slipper and kit photos.
6. **CHAONA claims** — biodegradable/edible/food-contact test reports; rice/farmer impact figure.
7. **Sustainability** — supplier/factory certificates; plastic-items-replaced impact figure.
8. **Footer** — company registration/VAT number, full address, confirmed legal-entity spelling.
9. **Response-time promise** for the thank-you screen (e.g. "within 1 business day").
10. **CHAONA microsite link** — "Visit CHAONA" is deliberately disabled until chaonaricestraw.com is upgraded.
11. **Contact photo** of Pharunyu (About section).

## 9. Suggested next steps for the new owner

1. Wire `submitLead` to an email service or backend, then remove the console stub.
2. Replace `trackEvent` with real analytics.
3. Collect the §8 content (company address, registration / VAT number, etc.) and add it where needed.
4. Add real kit/slipper photos to `src/assets/gp/` and pass them to the `ImageSlot`s.
5. Run `bun test` before shipping changes.
