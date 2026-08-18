---
name: nautui
description: Build marketing-site UI with NautUI, an Astro component library. Use when building pages/components with @nautui/core or @nautui/blocks, wrapping a layout with Theme, overriding design tokens, or using components like SectionHero, NavBar, Background, Image, Button, or BackToTop.
---

# NautUI — Astro Component Library

NautUI is a clean, minimalist component library for marketing websites. Design tokens are derived at runtime via CSS `color-mix()` and OKLCH — no preprocessor, no build step, no JavaScript framework. All components are single-file `.astro` components.

**Packages:** `@nautui/core` (38 primitive components) and `@nautui/blocks` (4 composite components built from core).

## Install

```bash
pnpm add @nautui/core @nautui/blocks
```

**Requirements:** `astro: ^6.0.0` (will not work with Astro 5.x), and Baseline-2024 browsers (Chrome 119+, Safari 16.4+, Firefox 128+) because components use `color-mix()` and relative color syntax.

## Setup: Theme Provider

Wrap the layout with `<Theme>`. It injects all global CSS and design tokens, and auto-enables dark mode:

```astro
---
import { Theme } from "@nautui/core";
---

<Theme>
  <slot />
</Theme>
```

Dark mode is controlled by the `data-theme` attribute on `<html>`. `<Theme dark>` (default `true`) applies it automatically from `localStorage` or system preference. Use `<Theme dark={false}>` to force light mode. Sections and navs can be forced dark independently with a `dark` class or `dark` prop.

`ThemeToggle` switches light/dark with smart system-preference detection.

## Design Tokens

Override tokens on `:root` (or anywhere) — they update at runtime, no rebuild:

```css
:root {
  --naut-color-primary: #5423e7;
  --naut-color-secondary: #121217;
  --naut-color-destructive: #ef4444;
  --naut-color-link: blue;
  --naut-color-highlight: #ddd522;
}
```

**Brand inputs:** `--naut-color-primary` and `--naut-color-secondary` must be ≥4.5:1 contrast vs white.

**Real-world mapping (Nuppun, `nuppun-website/src/layouts/Layout.astro`):**

```css
:root {
  --naut-color-primary: #1c2f58; /* Navy */
  --naut-color-secondary: #00f2fe; /* Digital Cyan */
}
[data-theme="dark"] {
  --naut-color-primary: #009ead; /* Light Teal as dark-primary when needed */
}
```

Everything else derives from these via `color-mix()`:

| Token | Derivation |
| --- | --- |
| `--naut-color-base` … `--naut-color-base-400` | Neutral surface scale (tinted from primary, flipped in dark mode) |
| `--naut-color-content` / `--naut-color-content-soft` | Text on neutrals |
| `--naut-color-border` / `--naut-color-border-strong` | Border aliases |
| `--naut-tint-base` (3%), `--naut-tint-strong` (25%) | Tint strength constants |
| `--naut-color-primary-content`, `--naut-color-secondary-content` | Foreground on brand fills |
| `--naut-shadow-{sm\|md\|lg\|xl}`, `--naut-border-radius-*`, `--naut-border-width-*` | Effects |

CSS layer order: `@layer naut-base, naut-theme, naut-component;`.

## Component Conventions

- **Every class** is prefixed `naut-` (e.g. `naut-button`, `naut-card`).
- **BEM naming:** `__` separates block from child element (`naut-card__body`), `--` marks variants (`naut-button.variant-primary`). Passed-in `class` merges onto the root.
- **Props interfaces** are exported from each component file and follow `Base` (`class?` + arbitrary passthrough attributes).
- **All components** accept arbitrary extra attributes that pass through to the underlying element.

## Example Component File

Every component is a single `.astro` file. Structure to follow when contributing or debugging:

```astro
---
import type { Base, Size } from "../types";

type MyCompVariant = "default" | "primary";

export interface MyCompProps extends Base {
  variant?: MyCompVariant;
  size?: Size;
}

const { class: className, variant = "default", size = "md", ...rest } =
  Astro.props as MyCompProps;
---

<div class:list={["naut-mycomp", `variant-${variant}`, className]} {...rest}>
  <slot />
</div>

<style>
  .naut-mycomp {
    &.variant-primary {
      /* nested selectors only — never bare elements */
    }
  }
</style>
```

Rules: `class` is destructured as `class: className` (reserved word), CSS is scoped with nesting inside the root class, variants use `--` modifiers, and `Base` (from `src/types.ts`) provides `class?` plus arbitrary passthrough.

## Core Components — Quick API

### Layout

| Component | Key props | Notes |
| --- | --- | --- |
| `Container` | `fluid`, `maxWidth`, `padding` | Centered max-width wrapper |
| `Section` | `dark`, `id` | Page section; `.dark` forces dark neutral scale |
| `Box` | — | Generic padding/sizing box |
| `Flex` | `align`, `justify`, `direction`, `wrap`, `gap` | Flexbox layout |
| `Grid` / `GridItem` | `columns`, `rows`, `gap`, spans | CSS grid |
| `Stack` | `gap`, `direction` | Vertical (default) or horizontal stack |
| `Group` | `gap` | Inline item group |
| `Space` | `size` (`sm`–`display-xxl`) | Spacer |
| `Divider` | `orientation`, `label` | Horizontal/vertical rule |
| `Visibility` | `show`, `hide` (`sm`/`md`/`lg`/`xl`) | Responsive show/hide |

### Content

| Component | Key props | Notes |
| --- | --- | --- |
| `Button` | `variant` (`default`, `primary`, `secondary`, `destructive`, `outline`, `outline-primary`, `outline-secondary`, `flat`, `ghost`, `link`, `rainbow`), `size` (`sm`/`md`/`lg`), `href`, `rounded`, `border`, `square`, `dark`, `type` | Renders `<a>` when `href` given, else `<button>` |
| `Link` | `href`, `variant` | Anchor with styles |
| `Title` | `size` (`sm`–`display-xxl`), `as` | Heading with responsive scale |
| `Text` | `size`, `color`, `weight`, `align`, `variant` (`link`, `highlight`) | Paragraph |
| `Mark` | `color` | Inline highlight |
| `Image` | `src`, `alt` (required), `ratio`, `radius`, `shadow`, `cover`, `fluid`, `responsive`, `hover` (`zoom`, `zoom-out`, `brighten`, `grayscale`, `fade`), `maxWidth`, `maxHeight` | Clipped frame; `hover="zoom"` scales on hover |
| `List` / `ListItem` | `ordered`, `marker`, `style` | Lists |
| `Article` | — | Article typography wrapper |
| `Masonry` / `MasonryItem` | `columns`, `gap` | CSS-columns masonry |
| `Marquee` | `speed`, `direction`, `pauseOnHover` | Infinite scroll strip |

### Navigation & Overlay

| Component | Key props | Notes |
| --- | --- | --- |
| `NavBar` | `position`, `fixed`, `transparent` | Sticky/fixed nav with scroll listener |
| `Menu` / `MenuGroup` / `MenuItem` | `trigger`, `open` | Dropdown menu |
| `Drawer` | `open`, `position` (`left`/`right`/`top`/`bottom`/`center`), `title`, `onClose` | Overlay panel |
| `BackToTop` | `threshold`, `position`, `offset`, `label`, `showLabel` | Floating button; smooth-scrolls to top, respects `prefers-reduced-motion` |
| `TOC` | `headingSelector`, `activeClass` | Table of contents from headings |

### Accents

| Component | Key props | Notes |
| --- | --- | --- |
| `Badge` | `variant`, `color`, `size` | Pill label |
| `Accordion` / `AccordionItem` | `open`, `title`, `icon` | Collapsible sections |
| `Background` | `color`, `gradient`, `image`, `pattern`, `opacity`, `mask` | Absolute-positioned layer for hero sections |
| `Bento` / `BentoItem` | `rows`, `columns`, spans | Bento grid |
| `Mark`, `Space`, `Card` | — | Card: `padding`, `radius`, `shadow`, `border`, `hover` |

### Providers & Controls

| Component | Key props | Notes |
| --- | --- | --- |
| `Theme` | `dark` | Root provider — always wrap layouts |
| `ThemeToggle` | — | Light/dark switch |

### Background patterns & masks

```astro
<Background
  gradient={{ colors: ["#3b82f6", "transparent"], type: "radial" }}
  opacity={0.4}
/>

<Background
  color="#3b82f6"
  mask={{ shape: "radial", position: "top", visibility: 0.6 }}
/>
```

`pattern` accepts `{ type: "dots" | "dots-x" | "grid" | "stripes", color, size, gap, deg }`. The `mask` prop renders a `radial-gradient` mask that fades the layer to transparent at the edges — ideal for hero "fade into the page" backgrounds.

## Blocks Components

Blocks are composite sections built from core components.

### SectionHero

```astro
<SectionHero figure={{ clip: "slash", position: "right" }} dark>
  <Fragment slot="background"><Background mask={{ shape: "radial" }} /></Fragment>
  <Fragment slot="figure"><Image src="/hero.webp" alt="" /></Fragment>
  <Title size="display-xl">Headline</Title>
  <Text>Subtext</Text>
  <Button href="#" variant="primary">Call to action</Button>
</SectionHero>
```

Props: `dark` (force dark), `figure: boolean | { clip: "slash" | "backslash", position: "right" | "bottom" }`. Slots: default (content), `background`, `figure`. With a right figure, content splits into two columns on desktop.

### Breadcrumb

```astro
<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
```

### DocLayout & TOC

`DocLayout` is a docs-page shell with a sidebar for `TOC` and content slot. `TOC` builds its list from page headings.

## Starter Pattern — Marketing Hero

```astro
---
import { Background, BackToTop, Button, Container, Image, NavBar, Text, Title, Theme, ThemeToggle } from "@nautui/core";
import { SectionHero } from "@nautui/blocks";
---

<Theme>
  <NavBar>
    <a href="/">Logo</a>
    <ThemeToggle />
  </NavBar>
  <SectionHero figure dark>
    <Fragment slot="background"><Background mask={{ shape: "radial", position: "top" }} /></Fragment>
    <Title size="display-xxl">Headline goes here</Title>
    <Text size="lg">Supporting copy.</Text>
    <Button href="#cta" variant="primary">Get started</Button>
  </SectionHero>
  <Container>…</Container>
  <BackToTop />
</Theme>
```

## Gotchas

1. **Astro 6 required.** `astro: ^6.0.0` is a peer dependency of both packages.
2. **No tests exist** in the library. Don't look for them.
3. **Dark mode** is opt-out — `<Theme>` defaults to auto dark. Pass `dark={false}` to disable.
4. **`class` prop:** pass `class` (not `className`) from Astro templates; it merges onto the component root.
5. **Components with client JS:** `NavBar` (scroll listener), `ThemeToggle` (theme switch), `Drawer`, `Menu`, `Marquee`, `Accordion`, `BackToTop`, `TOC` (scrollspy). The rest are render-only.
6. **Contrast:** brand colors are checked against white — keep them dark enough.
7. **Docs:** per-component reference lives at `docs/components/*.md` in the [GitHub repo](https://github.com/viirak/nautui).
