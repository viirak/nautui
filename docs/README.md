# NautUI

A clean, minimalist Astro UI component library for marketing websites. Design tokens are derived at runtime via CSS `color-mix()` and OKLCH — no preprocessor, no build step.

## Packages

- **[@nautui/core](/packages/core)** — 37 primitive components (buttons, cards, layout, navigation, theming).
- **[@nautui/blocks](/packages/blocks)** — composable page sections built on core (Breadcrumb, DocLayout, SectionHero, TOC).

## Requirements

- **Astro 6.0+** (peer dependency)
- A browser supporting Baseline 2024 features — `color-mix()`, relative color syntax (Chrome 119+, Safari 16.4+, Firefox 128+)

## Installation

```bash
npm install @nautui/core
```

For page sections:

```bash
npm install @nautui/blocks
```

## Quick start

Wrap your layout in `<Theme>` to load the global styles and enable dark mode:

```astro
---
import { Theme } from "@nautui/core";
---

<html>
  <head>
    <title>My site</title>
  </head>
  <body>
    <Theme>
      <slot />
    </Theme>
  </body>
</html>
```

`<Theme>` injects the global and color stylesheets, then sets `data-theme` on `<html>` based on the user's stored preference or system setting.

### Set brand colors

Define your brand colors on `:root` before `<Theme>` renders:

```css
:root {
  --naut-color-primary: #3b82f6;
  --naut-color-secondary: #a855f7;
}
```

Each color must meet a 4.5:1 contrast ratio against white. Dark-mode variants are derived automatically.

### Dark mode

Dark mode is enabled by default when `<Theme>` wraps your layout. Switch it with `<ThemeToggle>`, or set the `data-theme="light"` / `data-theme="dark"` attribute on `<html>` manually.

## Components

### @nautui/core

| Component | Description |
| --- | --- |
| `Accordion` | Expandable content sections |
| `AccordionItem` | A single accordion section |
| `Article` | Long-form content container with typographic defaults |
| `Background` | Pattern/color background layer |
| `Badge` | Small status/label chip |
| `Bento` | Bento-style grid layout |
| `BentoItem` | A single bento cell |
| `Box` | Generic bordered container |
| `Button` | Button / link-button. [Docs →](components/Button.md) |
| `Card` | Elevated content container |
| `Container` | Max-width content wrapper |
| `Divider` | Horizontal rule |
| `Drawer` | Slide-in overlay panel |
| `Flex` | Flexbox layout helper |
| `Grid` | CSS Grid layout helper |
| `GridItem` | A grid cell |
| `Group` | Inline row of related elements |
| `Image` | Optimized responsive image |
| `Link` | Text link |
| `List` | List container |
| `ListItem` | List item |
| `Mark` | Highlighted text |
| `Marquee` | Scrolling ticker |
| `Masonry` | Masonry layout |
| `MasonryItem` | A masonry cell |
| `Menu` | Dropdown menu |
| `MenuGroup` | Grouped menu items |
| `MenuItem` | A single menu item |
| `NavBar` | Top navigation bar |
| `Section` | Vertical section with spacing |
| `Space` | Spacer element |
| `Stack` | Vertical stack layout |
| `Text` | Paragraph text |
| `Theme` | Theme provider — loads styles + dark mode |
| `ThemeToggle` | Light/dark switcher |
| `Title` | Heading |
| `Visibility` | Reveal-on-scroll wrapper |

### @nautui/blocks

| Component | Description |
| --- | --- |
| `Breadcrumb` | Navigation trail with separators |
| `DocLayout` | Three-column docs page shell (nav / content / TOC) |
| `SectionHero` | Full-width marketing hero section |
| `TOC` | Table of contents from `MarkdownHeading[]` |

## Theming

- Tokens ship as CSS custom properties (`--naut-*`) and update at runtime — no rebuild needed.
- `color-mix()` and OKLCH derive shades, borders, and shadows from the two brand inputs.
- Shared utilities: spacing (`p-*`, `m-*`, `gap-*`), borders, radius, and shadow classes are imported per component.

## Contributing

See the package directories and `AGENTS.md` at the repo root for conventions.