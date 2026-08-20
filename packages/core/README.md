# Core Components for Naut UI

Low-level, reusable building blocks for marketing websites built with Astro.

## Installation

```bash
npm install @nautui/core
# or
pnpm add @nautui/core
# or
bun add @nautui/core
```

## Quick Start

### 1. Add Theme Provider

Wrap your layout with the theme provider to enable theming:

```astro
---
import { Theme } from "@nautui/core";
---

<html lang="en">
  <body>
    <Theme>
      <slot />
    </Theme>
  </body>
</html>
```

### 2. Use Components

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

## Components

### Theme
- [x] `Theme` — provider that injects tokens and wires up auto dark mode
- [x] `ThemeToggle` — button that switches between light and dark, persists choice

### Layouts
- [x] `Container` — center content with padding and max-width
- [x] `Box` — low-level layout component for spacing, borders, backgrounds
- [x] `Section` — full-width page section with variants (dimmed, highlight, inverted)
- [x] `Group` — flex container helper with gap and alignment shortcuts
- [x] `Grid` — responsive 1–6 column grid with configurable gap

### Elements
- [x] `Button` — link or button with 11 variants (primary, secondary, outline, ghost, destructive, rainbow, …)
- [x] `Card` — surface container with default, bordered, and flat variants
- [x] `Divider` — horizontal rule styled with theme tokens
- [x] `Badge` — small pill label for status, counts, or tags
- [x] `Image` — responsive image with optional caption

### Typography
- [x] `Title` — semantic h1–h6 with consistent sizing
- [x] `Text` — body text with size variants
- [x] `Mark` — `<mark>` styled with highlight color
- [x] `Link` — themed anchor with hover and focus states
- [x] `List` — styled ordered and unordered lists
- [ ] `Quote` — blockquote with themed border

### Navigation
- [x] `Navbar` — horizontal site navigation
- [x] `Drawer` — off-canvas sidebar for mobile
- [x] `Breadcrumbs` — hierarchical page links

## Dark Mode

Dark mode is enabled by default. Disable it with `dark={false}`:

```astro
<Theme dark={false}><slot /></Theme>
```

Use the toggle for manual switching:

```astro
<ThemeToggle />
```

## Theming

Provide two brand colors, and the palette is derived at runtime using CSS `color-mix()` and OKLCH.

### Required Tokens

```astro
<style>
  :root {
    --naut-color-primary: #ffb000;     /* must meet ≥ 4.5:1 vs white */
    --naut-color-secondary: #555522;   /* must meet ≥ 4.5:1 vs white */
  }
</style>
```

### Optional Overrides

```astro
<style>
  :root {
    /* Brand colors */
    --naut-color-primary: #ffb000;
    --naut-color-secondary: #555522;
    --naut-color-destructive: #ff2222;

    /* Tint strengths */
    --naut-tint: 3%;
    --naut-tint-base: 3%;
    --naut-tint-primary: 25%;
    --naut-tint-secondary: 35%;
    --naut-tint-destructive: 10%;

    /* Typography */
    --naut-font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --naut-font-display: var(--naut-font-body);
  }
</style>
```

All other tokens (`--naut-color-base`, `--naut-color-text`, `--naut-color-surface`, etc.) are derived automatically.

### Browser Support

Baseline 2024: Chrome 119+, Safari 16.4+, Firefox 128+.

## Icons

Recommended: [Lucide Icons](https://lucide.dev/guide/astro/).

## License

MIT
