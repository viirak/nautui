# Block Components for Naut UI

Composite, pre-built sections for marketing websites — powered by `@nautui/core`.

## Installation

```bash
npm install @nautui/blocks
# or
pnpm add @nautui/blocks
# or
bun add @nautui/blocks
```

Requires `@nautui/core` as a peer dependency. See [Naut UI installation guide](../README.md#installation).

## Usage

```astro
---
import { Hero } from "@nautui/blocks";
---

<Hero
  headline="Build landing pages faster"
  subtext="A minimalist component library for Astro, focused on marketing websites."
/>
```

## Components

### Marketing
- [x] `Hero` — marketing hero section with headline, subtext, and CTA slots
- [x] `Paper` — renders white or dark background depending on color scheme
- [ ] `Features` — feature grid with icon, title, description cells
- [ ] `CTA` — call-to-action band
- [ ] `Testimonials` — customer quotes layout
- [ ] `Pricing` — pricing plan comparison
- [ ] `LogoCloud` — grid of partner or customer logos

### Content
- [ ] `ToC` — table of contents generated from headings
- [ ] `FAQ` — question / answer accordion
- [ ] `Accordion` — collapsible content panels
- [ ] `Blog` — blog index and post layout

### Lead Generation
- [ ] `Newsletter` — email signup block
- [ ] `Contact` — contact form and info block

### Layout
- [ ] `Footer` — site footer with columns and legal row
- [ ] `Carousel` — horizontal slide carousel
- [ ] `Marquee` — horizontally scrolling content strip
- [ ] `Timeline` — vertical chronological list

### Utilities
- [ ] `Logo` — brand wordmark / symbol component
- [ ] Error pages — 404 and 500 templates

## License

MIT