# PearlPerfect V34 — Teeth Whitening Strips

_Comprehensive landing-page spec focused on speed, conversion, and a clean, gooey aesthetic. Built for Cursor + Next.js/React with Tailwind, Framer Motion, and GSAP._

---

## 0) TL;DR
- **Goal:** Drive purchases of PearlPerfect V34 whitening strips; collect emails/SMS as secondary.
- **Vibe:** Premium dental-care meets playful **gooey** purple. Crisp typography, soft blobs, dotted halftones echoing packaging.
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind + **Framer Motion** (micro) + **GSAP ScrollTrigger** (section choreo) + SVGO-optimized SVG.
- **Speed Targets:** LCP < **1.8s**, CLS < **0.02**, TBT < **150ms**, Lighthouse Perf **95+** on 4G/low-end mobile.
- **Key Conversions:** Sticky **Add to Cart**, social proof above fold, risk reversal (money-back, enamel-safe), UGC + Before/After slider, shade picker.

---

## 1) Brand System

### 1.1 Color Tokens
Use WCAG AA on text over backgrounds. Keep purple dominant; offsets with clean white and soft neutrals.

```css
:root {
  /* Brand */
  --pp-purple-600: #5B2EEA;  /* Primary (buttons, links, accents) */
  --pp-purple-700: #4622C9;  /* Hover/darker */
  --pp-purple-400: #8A66FF;  /* Secondary accents */
  --pp-ink: #0E0E12;         /* Headings/body on light */
  --pp-ink-soft: #3B3B43;    /* Secondary text */
  --pp-bg: #FFFFFF;          /* Page background */
  --pp-bg-alt: #F7F7FC;      /* Section alt / cards */
  --pp-success: #2CB67D;
  --pp-warning: #F59F00;
}
```

_Optional gradient_: `linear-gradient(120deg, var(--pp-purple-700), var(--pp-purple-400))`.

### 1.2 Type System
- **Headings:** `Space Grotesk` or `Satoshi` (600/700). Geometric, modern.
- **Body/UI:** `Inter` (400/500/600) for clarity and great rendering.
- **Numerals:** Tabular for pricing.

### 1.3 Iconography & Patterns
- Simple outline icons (Lucide).
- Use **halftone dot circles** (from pack art) as subtle background stickers.
- **Gooey blobs**: soft purple translucent shapes with SVG filter.

```html
<svg width="0" height="0" style="position:absolute">
  <filter id="goo">
    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
    <feColorMatrix in="blur" mode="matrix"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
    <feBlend in="SourceGraphic" in2="goo"/>
  </filter>
</svg>
```
_Apply with_ `filter:url(#goo)` to blob groups.

---

## 2) Layout & Grid
- **Container:** max-w `1280px`, gutters `24px` mobile, `40px` desktop.
- **Section spacing:** `96px` desktop / `56px` mobile.
- **Sticky ATC bar** on mobile (product title + price + primary CTA).
- **Lenis** (optional) for smooth scroll; disable for `prefers-reduced-motion`.

---

## 3) Navigation & Header (Conversion-First)

### 3.1 Top Utility Bar
- Height `36px`, background `--pp-purple-700`.
- Content (carousel on mobile): _“Free shipping over $35” · “Enamel-safe & sensitivity free”_.
- Small, not clickable. Fades out on scroll.

### 3.2 Main Navbar
- Height `72px` desktop, `64px` mobile; **sticky** with translucent blur (backdrop-filter `12px`).
- Left: **PearlPerfect** logotype (monochrome white/ink depending on bg).
- Center (desktop): anchor links — **Shop**, **How it works**, **Results**, **Ingredients**, **Reviews**, **FAQ**.
- Right: **Search** (modal), **Account**, **Cart** (badge), and **CTA** `Shop Now` (filled purple, 44px h).
- **Scroll behavior:** shrink to `56px`, logo scales to 90%, link underline bar animates; CTA turns gradient.
- **Mobile menu:** full-screen sheet with gooey blob backdrop; sections grouped; primary CTA persistent at bottom.

**Motion (Framer Motion):**
- Nav initial `y:-20, opacity:0` → `y:0, opacity:1` on load (spring 0.6).
- Highlight active section with ScrollSpy (IntersectionObserver) + subtle underline `layoutId` shared across links.

**A11y:**
- Proper `nav` landmarks, focus rings (`focus-visible:`), escape to close mobile sheet.

---

## 4) Hero Section

### 4.1 Composition
- **Left (copy):**
  - Eyebrow: “Dentist‑grade. At‑home.”
  - H1: **“Whiter teeth in 14 minutes.”**
  - Sub: “PearlPerfect V34 strips lift stains fast—**enamel‑safe** with zero sensitivity.”
  - Trust row: ★★★★★ `4.9/5` from `12,842`+ smiles.
  - Primary CTA: `Get My Strips` (filled, gradient); Secondary: `See Results` (ghost).
  - Payment icons + “30‑day money‑back”.
- **Right (visual):** Lifestyle photo (**prompt at end**) showing hand holding the purple pack; a peeled strip floating; soft gooey purple blobs + halftone dots echoing packaging.
- **Quick-Buy capsule** beneath CTAs: qty stepper + One‑time / Subscribe toggle (10% off).

### 4.2 Performance
- Use responsive `next/image` with AVIF/WebP, priority for hero, explicit width/height to avoid CLS.
- Lazy-load any decorative blobs.

### 4.3 Motion
- Pack slides in with **GSAP Flip** from a small card to full hero position.
- Floating “strip” gently oscillates (`y: ±6px`, `duration: 3`, yoyo).
- Mouse parallax (reduced when `prefers-reduced-motion`).

---

## 5) Social Proof Strip (Above the Fold)
- Row of press logos (grayscale) + “12k+ verified reviews”.
- Marquee (pause on hover) of short UGC quotes.

---

## 6) Product Benefits (“Why V34?”)
- **3–4 cards** with icon + short copy:
  1. **Fast results** — visible after first application.
  2. **Zero sensitivity** — enamel‑safe formula.
  3. **Mess‑free** — no trays, no goo.
  4. **Clinically backed** — peroxide concentration within dentist‑recommended range.
- Subtle gooey hover: cards merge using SVG `#goo` filter when adjacent hovers.

_Motion_: staggered reveal with Framer `whileInView`.

---

## 7) How It Works (3 Steps)
1. **Peel** — open the sachet.
2. **Stick** — apply upper & lower strips (14 min).
3. **Shine** — remove & smile; avoid food/drink for 30 min.

Add small looping **14:00 timer** UI; CTA `See full guide` opens modal with the included user manual visuals.

---

## 8) Before / After & Shade Finder
- **Interactive slider** (accessible range input) to compare.
- **Shade scale** component: choose current shade → see projected results after 7 days.
- Legal caption: individual results vary.

---

## 9) Ingredients & Safety
- Accordion with simple language and INCI names.
- “What we avoid” chips (SLS, parabens, etc.).
- Link to sensitivity & enamel safety explainer.

---

## 10) Comparison Table
Columns: **PearlPerfect Strips**, Whitening pens, LED kits, Pro in‑office.
Rows: **Time per use**, **Cost**, **Sensitivity risk**, **Mess factor**, **Clinically backed**, **Travel‑friendly**.

Use sticky first column on mobile (horizontal scroll shadows).

---

## 11) UGC + Reviews
- **UGC grid** (4–6 videos/photos) with lazy‑loaded posters; play on click.
- Reviews module with summary histogram + filters (scent, sensitivity, effectiveness).
- Badge: “Verified buyer”.

CTA: `Add to Cart` repeats after 6 reviews.

---

## 12) FAQ
Top questions: “Will it cause sensitivity?”, “How many uses per box?”, “Safe for caps/veneers?”, “Pregnancy safe?”, “How long do results last?”.

---

## 13) Final CTA + Risk Reversal
- Big friendly headline: **“Ready for your PearlPerfect smile?”**
- Money‑back banner, shipping reminder, trust badges (Vegan, Cruelty‑Free, Enamel‑Safe).

---

## 14) Footer
- Columns: Shop, Learn, Support, Legal.
- Email capture with **one‑line value**: “Get 10% off your first order + stain‑removal tips.”
- Social + UGC hashtag.
- Country/locale switcher.

---

## 15) Product Quick-Buy (Sticky)
- Visible after 35% scroll or when section ID `#shop` enters.
- Shows pack thumbnail, price, qty, **Add to Cart**. Dismissible.

---

## 16) Motion System — Rules & Choreography
- **Keep it light.** Framer for micro (entrances, hovers). GSAP **only** for ScrollTrigger + Flip orchestrations.
- All animations respect `prefers-reduced-motion`.

**Examples**
```tsx
// Framer Motion card
<motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, ease:"easeOut"}} />

// GSAP ScrollTrigger section
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".benefit-card", { y: 40, opacity: 0, stagger: 0.12,
      scrollTrigger: { trigger: "#benefits", start: "top 80%" }
    });
  });
  return () => ctx.revert();
}, []);
```

---

## 17) Performance Playbook
- **Images:** AVIF/WebP, `srcset`, width/height set. Use squoosh or imagemin; hero ≤ 220KB.
- **Fonts:** self‑hosted variable fonts; `display:optional`; preload only headings; fallbacks defined.
- **JS:** route‑level code‑splitting, tree‑shake GSAP (import only used plugins), dynamic import reviews/UGC.
- **CSS:** Tailwind + minimal custom; purge enabled. Avoid massive blur filters; use GPU‑accelerated transforms.
- **Caching:** static generation, long‑cache immutable for assets, ISR for reviews if needed.
- **Analytics loading:** defer. No blocking scripts.

---

## 18) Copy Deck (starter)
**Hero H1 options**
- Whiter teeth in 14 minutes.
- Your easiest yes to a brighter smile.

**Sub**
- Enamel‑safe, dentist‑approved formula with zero sensitivity.

**CTAs**
- Get My Strips → `/checkout?sku=v34`
- See Results

**Benefits (short)**
- Fast results
- Zero sensitivity
- Mess‑free
- Clinically backed

**Risk reversal**
- 30‑day money‑back, no questions asked.

---

## 19) SEO & Sharing
- Title: `PearlPerfect V34 Whitening Strips – Whiter teeth in 14 minutes`
- Meta description: `Enamel‑safe whitening strips with zero sensitivity. Clinically backed results you can see from the first use.`
- OG image: hero composition with product in hand on textured light background, purple accents.
- JSON‑LD Product schema with offers, aggregateRating.

---

## 20) Analytics & CRO
Track with first‑party events:
- `view_item`, `add_to_cart`, `begin_checkout`, `purchase`.
- Scroll depth, sticky ATC impressions, FAQ open, shade‑picker use.
A/B ideas: gradient vs solid CTA, hero copy variants, order of benefits, presence of quick‑buy capsule.

---

## 21) Tailwind Theme Snippet
```ts
// tailwind.config.ts (excerpt)
export default {
  theme: {
    extend: {
      colors: {
        pp: {
          purple: {
            400: '#8A66FF',
            600: '#5B2EEA',
            700: '#4622C9',
          },
          ink: '#0E0E12',
          'ink-soft': '#3B3B43',
          bg: '#FFFFFF',
          'bg-alt': '#F7F7FC',
        },
      },
      boxShadow: {
        blob: '0 20px 60px rgba(91,46,234,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
}
```

---

## 22) Components Inventory
- `Navbar` (sticky, scroll spy)
- `Hero` (quick-buy capsule)
- `SocialProofBar`
- `Benefits` (gooey cards)
- `HowItWorks`
- `BeforeAfterSlider`
- `ShadeFinder`
- `IngredientsAccordion`
- `ComparisonTable`
- `UGCGrid`
- `Reviews`
- `FAQ`
- `FinalCTA`
- `Footer`
- `StickyATC`

---

## 23) Asset Direction
Use the provided purple-pack shots across the site as secondary images (sachets, open box, strips). Keep backgrounds light, textured (bathroom tile or stone) with soft plant shadows.

---

## 24) Implementation Checklist (Cursor)
1. Scaffold Next.js app with Tailwind + Framer Motion.
2. Add GSAP + ScrollTrigger (treeshake imports).
3. Build components above with Storybook (optional) for speed.
4. Add `#goo` SVG filter and blob components.
5. Wire Sticky ATC and quick‑buy.
6. Hook analytics events.
7. Optimize images (AVIF/WebP) and fonts.
8. Run Lighthouse; iterate until targets met.

---

## 25) Hero Image — Generation Prompt (for Midjourney/SDXL/Firefly)
_Use this as a base; swap camera/lighting to taste._

**Primary Prompt**
> Ultra‑clean lifestyle product photo of a **hand holding the PearlPerfect V34 purple Teeth Whitening Strips box**, partially open with one strip halfway peeled from a clear liner. Composition on a light textured bathroom surface (white stone/tile) with soft plant leaf shadows. Minimal props: a ceramic toothbrush holder and a subtle smile model’s lower face out of focus in background. Modern, premium, clinical‑fresh mood. **Color palette dominated by rich purple (#5B2EEA)** with white and soft gray neutrals. High key lighting, soft shadows, slight top‑down angle (35–45°). Depth of field shallow on product, crisp logo readable. Add gentle **gooey translucent purple blobs** in background bokeh. Photographic realism, 8k, studio quality.

**Negative Prompt**
> No clutter, no reflections on text, no harsh specular highlights, no distracting logos, no toothpaste splatter, no yellow tint, no heavy vignettes.

**Alt Variations**
- Hand applying strip to upper teeth in mirror, pack visible in the other hand; still high key.
- Pack lying on tile with sachets cascading; top‑down flat‑lay; shadows from palm leaves.

---

**End of spec.**

