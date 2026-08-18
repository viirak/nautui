# NautUI

A clean, minimalist Astro UI component library for marketing websites. Design tokens are derived at runtime via CSS `color-mix()` and OKLCH — no preprocessor, no build step.

## Packages

- **[@nautui/core](/packages/core)** — 39 primitive components (buttons, cards, layout, navigation, theming).
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

| Component | Description | Docs |
| --- | --- | --- |
| `Accordion` | Expandable content sections | [→](components/Accordion.md) |
| `AccordionItem` | A single accordion section | [→](components/Accordion.md) |
| `Article` | Long-form content container with typographic defaults | [→](components/Article.md) |
| `Background` | Pattern/color background layer | [→](components/Background.md) |
| `BackToTop` | Floating scroll-to-top button | [→](components/BackToTop.md) |
| `Badge` | Small status/label chip | [→](components/Badge.md) |
| `Bento` | Bento-style grid layout | [→](components/Bento.md) |
| `BentoItem` | A single bento cell | [→](components/Bento.md) |
| `Box` | Generic bordered container | [→](components/Box.md) |
| `Button` | Button / link-button | [→](components/Button.md) |
| `Card` | Elevated content container | [→](components/Card.md) |
| `Container` | Max-width content wrapper | [→](components/Container.md) |
| `Divider` | Horizontal rule | [→](components/Divider.md) |
| `Drawer` | Slide-in overlay panel | [→](components/Drawer.md) |
| `Flex` | Flexbox layout helper | [→](components/Flex.md) |
| `Footer` | Page footer with brand, link columns, and bottom bar | [→](components/Footer.md) || `Grid` | CSS Grid layout helper | [→](components/Grid.md) |
| `GridItem` | A grid cell | [→](components/Grid.md) |
| `Group` | Inline row of related elements | [→](components/Group.md) |
| `Image` | Optimized responsive image | [→](components/Image.md) |
| `Link` | Text link | [→](components/Link.md) |
| `List` | List container | [→](components/List.md) |
| `ListItem` | List item | [→](components/List.md) |
| `Mark` | Highlighted text | [→](components/Mark.md) |
| `Marquee` | Scrolling ticker | [→](components/Marquee.md) |
| `Masonry` | Masonry layout | [→](components/Masonry.md) |
| `MasonryItem` | A masonry cell | [→](components/Masonry.md) |
| `Menu` | Dropdown menu | [→](components/Menu.md) |
| `MenuGroup` | Grouped menu items | [→](components/Menu.md) |
| `MenuItem` | A single menu item | [→](components/Menu.md) |
| `NavBar` | Top navigation bar | [→](components/NavBar.md) |
| `Section` | Vertical section with spacing | [→](components/Section.md) |
| `Space` | Spacer element | [→](components/Space.md) |
| `Stack` | Vertical stack layout | [→](components/Stack.md) |
| `Text` | Paragraph text | [→](components/Text.md) |
| `Theme` | Theme provider — loads styles + dark mode | [→](components/Theme.md) |
| `ThemeToggle` | Light/dark switcher | [→](components/Theme.md) |
| `Title` | Heading | [→](components/Title.md) |
| `Visibility` | Show/hide content at breakpoints | [→](components/Visibility.md) |

### @nautui/blocks

| Component | Description | Docs |
| --- | --- | --- |
| `Breadcrumb` | Navigation trail with separators | [→](components/Breadcrumb.md) |
| `DocLayout` | Three-column docs page shell (nav / content / TOC) | [→](components/DocLayout.md) |
| `SectionHero` | Full-width marketing hero section | [→](components/SectionHero.md) |
| `TOC` | Table of contents from `MarkdownHeading[]` | [→](components/TOC.md) |

## Theming

- Tokens ship as CSS custom properties (`--naut-*`) and update at runtime — no rebuild needed.
- `color-mix()` and OKLCH derive shades, borders, and shadows from the two brand inputs.
- Shared utilities: spacing (`p-*`, `m-*`, `gap-*`), borders, radius, and shadow classes are imported per component.

## Contributing

See the package directories and `AGENTS.md` at the repo root for conventions.