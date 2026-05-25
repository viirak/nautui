# Naut UI

A clean, minimalist UI component library for Astro — built for marketing websites, not apps.

**The missing UI library for Astro.** 

Astro provides the rocket; **nautui** provides the gear. Built for speed and designed for the modern web, nautui gives you the core elements and marketing blocks you need to stop building setups and start being the astronaut.

**Status:** In development.

![Naut UI](./assets/naut-ui-screenshot-1.jpg)

## Installation

```bash
npm install @nautui/core @nautui/blocks
# or
pnpm add @nautui/core @nautui/blocks
# or
bun add @nautui/core @nautui/blocks
```

### Local Development

1. Clone the repo:
   ```bash
   git clone https://github.com/viirak/nautui.git
   cd nautui
   ```
2. Create a new Astro project (or use an existing one), then link the local @nautui packages:
   ```bash
   pnpm link <path-to-local-nautui>/packages/core
   pnpm link <path-to-local-nautui>/packages/blocks
   ```

## Usage

### 1. Theme

Add the Theme (provider) to your layout:

```astro
---
import { Theme } from "@nautui/core";
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My Site</title>
  </head>
  <body>
    <Theme>
      <slot />
    </Theme>
  </body>
</html>
```

### 2. Dark mode

Dark mode is enabled by default when you wrap your layout with `<Theme>`. Disable it with `dark={false}`:

```astro
<Theme dark={false}><slot /></Theme>
```

There's also a theme toggle component for switching between light and dark mode. To use it, you can import and place it into your page.

```astro
---
import { ThemeToggle } from "@nautui/core";
---
<header>
  <ThemeToggle />
</header>
```

### 3. Use Components

```astro
---
import { Button, Container, Section, Title, Text } from "@nautui/core";
---

<Section variant="dimmed">
  <Container>
    <Title level={1}>Welcome</Title>
    <Text>Get started with Astro NautUI</Text>
    <Button variant="primary">Get Started</Button>
  </Container>
</Section>
```

## Theming

Naut UI is opinionated: you provide two brand colors, and the rest of the palette is derived from them at runtime using CSS `color-mix()` and OKLCH. No build step, no preprocessor.

### Constraint

`--naut-color-primary` and `--naut-color-secondary` **must meet a contrast ratio of ≥ 4.5:1 against white** (WCAG AA for normal text). The library assumes white text is readable on both, and renders primary / secondary / destructive surfaces with white text accordingly. You can verify a color with any WCAG contrast checker.

### Overriding tokens

After wrapping your layout with `<NautTheme>`, override any of the exposed tokens in a global `<style>` block or a CSS file loaded on the page:

```astro
<style>
  :root {
    /* Brand — required to meet ≥ 4.5:1 vs white */
    --naut-color-primary: #ffb000;
    --naut-color-secondary: #555522;

    /* Opinionated defaults — override only if you must */
    --naut-color-destructive: #ff2222;

    /* Tint strengths (percentages) */
    --naut-tint: 3%;              /* default tint amount */
    --naut-tint-base: 3%;         /* primary bleed into the page background */
    --naut-tint-primary: 25%;     /* primary hover darken */
    --naut-tint-secondary: 35%;   /* secondary hover lighten */
    --naut-tint-destructive: 10%; /* destructive hover darken */

    /* Typography */
    --naut-font-family: "Inter", sans-serif;
  }
</style>
```

Only the tokens above are intended for override. Everything else (`--naut-color-base`, `--naut-color-text`, `--naut-color-surface`, `--naut-color-border`, `--naut-color-muted`, ...) is derived and updates automatically when the inputs change — including at runtime, so a brand-color picker Just Works.

### Browser support

Theming relies on `color-mix()`, `oklch()`, and relative color syntax (`rgb(from ...)`), all of which are Baseline 2024 (Chrome 119+, Safari 16.4+, Firefox 128+).

## Core Components

### Theme
- [x] Theme — provider that injects tokens and wires up auto dark mode
- [x] ThemeToggle — button that switches between light and dark and persists the choice

### Layouts
- [x] Container — center content with padding and a max-width
- [x] Section — full-width page section with variants
- [x] Box — low-level layout component for spacing, borders, and background
- [x] Group — flex container helper with gap and alignment shortcuts
- [x] Stack - row container helper with configurable gap
- [x] Flow - container helper with configurable text alignment
- [x] Grid — responsive 12 columns grid with configurable gap
- [x] GridItem — grid item with column and offset props
- [x] Bento - Bento grid layout with configurable rows and columns
- [x] BentoItem - Bento grid item with configurable row and column spans
- [x] Masonry — responsive masonry grid with configurable gap
- [x] MasonryItem — masonry grid item with column span prop
- [x] Marquee — horizontal scroll container with pause on hover

### Elements
- [x] Button — link or button with 11 variants
- [x] Badge — small pill label for status, counts, or tags
- [x] Card — surface container with default, bordered, and flat variants;
- [x] Divider — horizontal rule styled with theme tokens
- [x] Image — responsive image with optional caption and themed border

### Typography
- [x] Title — semantic h1–h6 with consistent sizing and a muted variant
- [x] Text — body text with size variants and a muted variant
- [x] Mark — `<mark>` styled with the highlight color token
- [x] Link — themed anchor with hover and focus states
- [x] List — styled ordered and unordered lists
- [x] ListItem — list item with optional leading icon and themed marker

## Navigation
- [x] Navbar — horizontal site navigation with dropdown support
- [x] Drawer — off-canvas sidebar for mobile navigation
- [x] Breadcrumbs — hierarchical page links
- [x] Accordion — collapsible content panels
- [x] Menu — List of links with hover and focus states
- [x] MenuItem — Link with optional leading icon

## Block Components
- [x] Hero — marketing hero section with headline, subtext, and CTA slots
- [ ] ToC — table of contents generated from headings
- [ ] Contact — contact form and info block
- [ ] Error pages — 404 and 500 templates
- [ ] Pricing — pricing plan comparison
- [ ] Carousel — horizontal slide carousel
- [ ] Blog — blog post list with pagination
- [ ] Post — blog post with metadata and author info
- [ ] Pagination — numbered or arrow pagination

## Icons

Recommended: [Lucide Icons](https://lucide.dev/guide/astro/).

## ⚓ Principles

Nautui is built on the spirit of Aśu (Sanskrit for immediate/fast) and the Naut (the sailor navigating the Astro ecosystem). We follow these core pillars:

### 1. Speed First

Performance isn't an afterthought. By using Native CSS (Nesting & Layers) and Vanilla JS, we eliminate the bloat of heavy runtimes and utility frameworks. A lean ship is a fast ship.

### 2. Import and Forget

Your .astro files should stay clean. We encapsulate styles and scripts within our components so you can focus on content. Provide the props, and we’ll handle the rigging.

### 3. Polite Theming

Customization without conflict. Using CSS Cascade Layers (@layer) and CSS Variables, we ensure that branding is as simple as redefining a token. No specificity wars, no !important.

## License

MIT
