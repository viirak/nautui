---
name: nautui
description: Build marketing-site UI with NautUI, an Astro component library. Use when building pages/components with @nautui/core or @nautui/blocks, wrapping a layout with Theme, overriding design tokens, or using components like SectionHero, NavBar, Background, Image, Button, or BackToTop.
---

# NautUI — Astro Component Library

NautUI is a clean, minimalist component library for marketing websites. Design tokens are derived at runtime via CSS `color-mix()` and OKLCH — no preprocessor, no build step, no JavaScript framework. All components are single-file `.astro` components.

**Packages:** `@nautui/core` (46 primitive components) and `@nautui/blocks` (6 composite components built from core).
## Install

```bash
pnpm add @nautui/core @nautui/blocks
```

**Requirements:** `astro: ^6.0.0` (will not work with Astro 5.x), and Baseline-2024 browsers (Chrome 119+, Safari 16.4+, Firefox 128+) because components use `color-mix()` and relative color syntax.

## Setup: Theme Provider

Wrap the layout with `<Theme>`. It injects the CSS reset, global CSS, and design tokens, and auto-enables dark mode:

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
  /* Navy — 13.15:1 against white */
  --naut-color-primary: #1c2f58;
  /* Teal — 5.47:1 against white. The library default #121217 is near-black
     and renders as an invisible secondary CTA fill. */
  --naut-color-secondary: #0f766e;
}

/* The library re-derives neutrals for dark mode but leaves the brand inputs
   untouched, so fills must be lifted by hand. Secondary is lifted because
   #0f766e sits at 3.55:1 on the dark surface; primary is deliberately NOT
   lifted, so avoid variant="primary" as a large fill on <Section dark>. */
:root[data-theme="dark"] {
  --naut-color-secondary: #14b8a6; /* 7.81:1 on the dark surface */
  --naut-color-secondary-content: #06231f;
}
```

Note the `:root[data-theme="dark"]` form: inside an Astro `<style>` block a bare `[data-theme="dark"]` selector gets scoped and matches nothing.

Nuppun's own brand rules (from `design.md` in the **Nuppun** repo, not this one) are: no purple, no startup cyan, no random blue CTAs. They are why Nuppun overrides the library's default purple `#5423e7` primary — they are not NautUI constraints.

Everything else derives from these via `color-mix()`:

| Token | Derivation |
| --- | --- |
| `--naut-color-base` … `--naut-color-base-400` | Neutral surface scale (tinted from primary, flipped in dark mode) |
| `--naut-color-content` / `--naut-color-content-soft` | Text on neutrals |
| `--naut-color-border` / `--naut-color-border-strong` | Border aliases |
| `--naut-tint-base` (3%), `--naut-tint-strong` (25%) | Tint strength constants |
| `--naut-color-primary-content`, `--naut-color-secondary-content` | Foreground on brand fills |
| `--naut-font-body` | Body font stack (defaults to system-ui) |
| `--naut-font-display` | Display/heading font stack (defaults to body) |
| `--naut-shadow-{sm\|md\|lg\|xl}`, `--naut-border-radius-*`, `--naut-border-width-*` | Effects |

CSS layer order: `@layer naut-base, naut-theme, naut-component;`.

## Component Conventions

- **Every class** is prefixed `naut-` (e.g. `naut-button`, `naut-card`).
- **BEM naming:** `__` separates block from child element (`naut-card__body`), `--` marks variants (`naut-button.variant-primary`). Passed-in `class` merges onto the root.
- **Props interfaces** are exported from each component file and follow `Base` (`class?` + arbitrary passthrough attributes).
- **All components** accept arbitrary extra attributes that pass through to the underlying element.
- **`size` is component-relative, not a global scale.** The `Size` union (`sm|md|lg|xl`) is the baseline, not a guarantee — check the component's own props table. `AccordionItem` starts at `md`, `Badge`/`Card` stop at `lg`, `Space` adds `auto`/`display*`/`full` and accepts a responsive object, `Avatar` adds `xs`/`2xl` and treats a non-standard string as a custom length. `Badge size="sm"` and `Divider size="sm"` are different sizes by design; a Divider and a Badge cannot share a scale.
- **Not every `size` is a scale step.** `Background`'s `mask.size` is a `{ x, y }` percentage vector (enforced to be an object — a non-object throws), and `Drawer's size` is a raw CSS length (`"350px"`). Enums are for modes and named token steps; raw numbers/strings are for free-form values.
- **Unimplemented props are rejected at render time, not silently ignored.** `Base` declares `[key: string]: unknown`, so a prop a component never implemented is not an excess-property error — it is spread onto the root element as an invalid attribute and renders as a no-op with no diagnostic anywhere. Where a prop is plausible but missing, or a value falls outside a union, the component throws a `TypeError` naming what it accepts: `Background`'s `mask.position`/`mask.size` must be objects (percentages 0-100, no keyword strings), and `Link` rejects `size` and any `variant` outside `default|ghost`. Follow this when adding props rather than widening the API to accept a guess.
- **Legacy aliases are intentional — do not "clean them up".** Each is a canonical name plus a still-supported old spelling, normalized inside the component so both render identically: `Mark.fontFamily`/`ff`, `Mark.variant` `highlight`/`halflight` (a former misspelling), `Button.radius`/`rounded`, `Flex|Stack|Group|Grid` `direction` `row|column`/`horizontal|vertical`, `justify` `between`/`space-between`, and `Group.not`. `Base` declares `[key: string]: unknown`, so a stale prop is *not* an excess-property error — `astro check` will not catch a leftover alias, which is exactly why they are kept.

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
| `Container` | `fluid` | Centered max-width wrapper |
| `Section` | `as` (`div\|section\|article\|main\|header\|footer`), `border`, `dark` | Page section; `dark` forces the dark neutral scale |
| `Box` | `border`, `centered`, `corner`, `maxWidth`, `radius`, `ta` | Generic box with spacing props |
| `Flex` | `align`, `direction`, `gap`, `justify`, `wrap` | Flexbox layout (use for horizontal stacks) |
| `Grid` / `GridItem` | `columns` (1–12), `gap`, `border`, `radius` / `span` | CSS grid |
| `Stack` | `align`, `direction` (`vertical\|horizontal`), `gap`, `justify` | Vertical stack by default; `direction="horizontal"` lays children in a row |
| `Group` | `gap`, `grow`, `justify`, `not`, `wrap` | Inline item group |
| `Footer` | `columns`, `dark`, `fluid` | Page footer — `brand` slot, link-column default slot, `bottom` bar slot |
| `Space` | `size`, `grow`, `orientation` | Spacer |
| `Divider` | `orientation`, `label`, `size`, `variant` (`solid\|dotted\|dashed`) | Horizontal/vertical rule |
| `Visibility` | `hidden`, `on` (`sm\|md\|lg\|xl`) | Responsive show/hide |
### Content

| Component | Key props | Notes |
| --- | --- | --- |
| `Button` | `variant` (14: `default`, `primary`, `secondary`, `destructive`, `success`, `warning`, `info`, `outline`, `outline-primary`, `outline-secondary`, `flat`, `ghost`, `link`, `rainbow`), `color` (token), `size` (`sm\/md\/lg`), `href`, `radius`, `border`, `square`, `dark`, `type` | Renders `<a>` when `href` given, else `<button>`; `variant` owns fill. `radius` is the shared name across components, but Button's domain omits `xl` and adds `none`/`full` |
| `Link` | `to` (required), `color` (token), `dimmed`, `external`, `hover` (`underline\|dimmed\|surface`), `underline`, `variant` (`default\|ghost`), `wrap` | Anchor; `variant="ghost"` = content-colored links for nav/footer lists. **Enforced:** `size` and any `variant` outside `default\|ghost` throw — `Link` has no size scale (it inherits from surrounding text), and the link-colored look is already the default, so `MenuItem`'s `activeVariant="link"` has no `Link` counterpart |
| `Title` | `size` (`default\|display\|display-sm…display-xxl`, or `h1`–`h6` as aliases for the level scale), `color` (token), `level` (1–6), `align`, `gradient` | Heading; `level` sets the h1–h6 tag and its size, `size="hN"` overrides the size only, `size="display*"` uses the bigger display scale |
| `Text` | `size`, `variant` (`primary\|secondary\|tertiary\|destructive\|link\|highlight`), `color` (token), `weight`, `align`, `dimmed`, `inline`, `italic`, `nowrap`, `transform` | Paragraph; `color` is a shared tokenized text color |
| `Mark` | `variant` (8 incl `highlight\|primary\|underline\|sketch-circle`; `halflight` is a deprecated alias for `highlight`), `gradient`, `rotate`, `fontFamily` (legacy alias `ff`) | Inline highlight |
| `Image` | `src`, `alt` (required), `ratio`, `radius`, `shadow`, `cover`, `fluid`, `responsive`, `hover` (`zoom\|zoom-out\|brighten\|grayscale\|fade`), `maxWidth`, `maxHeight` | Clipped frame; `hover="zoom"` scales on hover |
| `List` / `ListItem` | `ordered`, `horizontal`, `marker`, `gap` / `marker` | Lists |
| `Article` | `anchorLinks` | Article typography wrapper |
| `Masonry` / `MasonryItem` | `columns`, `gap` | CSS-columns masonry |
| `Marquee` | `duration` (ms), `speed` (`slow\|normal\|fast`), `static`, `orientation`, `pauseOnHover`, `reverse`, `repeat`, `fadeEdges`, `gap` | Infinite scroll strip; `speed` presets override `duration`, `static` disables animation (single group) |
| `TextRotate` | `duration` (ms), `align` (`start\|center\|end`), `label`, `pauseOnHover`, `reverse`, `static` | CSS-only cross-fade of 2–6 slotted child elements; `static` and `prefers-reduced-motion` show the first item |
### Navigation & Overlay

| Component | Key props | Notes |
| --- | --- | --- |
| `NavBar` | `island`, `sticky`, `autohide`, `bordered`, `dark`, `height`, `offset`, `radius`, `shadow`, `zindex` | Sticky/fixed nav; default slot for wordmark + links |
| `Menu` / `MenuGroup` / `MenuItem` | `divided`, `gap`, `horizontal` / `label` (req), `collapsible`, `open`, `line` / `href` (req), `active`, `activeVariant`, `dimmed`, `radius` | Dropdown menu |
| `Dropdown` | `button` (`Button` props), `align` (`start\|center\|end`), `side` (`top\|bottom\|left\|right`), `offset` (`xs\|sm\|md\|lg`), `hover`, `zi` | Generic popover on `<details>`/`<summary>` with a `Button` trigger; default slot is the panel, `zi` defaults to `100`. Use `Menu` for nav link lists |
| `Drawer` | `position` (`center\|top\|right\|bottom\|left`), `button`, `size`, `zi` | Overlay panel |
| `BackToTop` | `threshold`, `position`, `offset`, `label`, `showLabel` | Floating button; smooth-scrolls to top, respects `prefers-reduced-motion` |
| `TOC` | `headings` (required), `sticky`, `title`, `top` | Table of contents from headings |
### Accents

| Component | Key props | Notes |
| --- | --- | --- |
| `Badge` | `variant` (7: `text`, `border`, `surface`, `outline`, `primary`, `secondary`, `destructive` — there is no `default`), `color` (token), `size` (`sm\|md\|lg`), `dotted`, `iconOnly`, `gradient`, `radius`, `outlineColor`, `letterSpacing`, `uppercase`, `padding`, `dark` | Pill label; `variant` owns fill |
| `IconBox` | `variant` (`default\|surface\|outline\|solid\|primary\|secondary\|destructive\|success\|warning\|info`), `color` (token), `size`, `radius` (adds `none\|full`), `label` | Square (`1 / 1`) themed frame for an SVG slot; `label` sets `aria-label` for icon-only use, or pass `aria-labelledby` |
| `Avatar` | `src`, `alt`, `initials`, `placeholder`, `size` (adds `xs\|2xl`), `radius` (adds `full\|none`), `mask` (`heart\|squircle\|hexagon`), `ring` (boolean or token), `status` (`online\|offline`), `statusLabel` | Profile image or initials; `initials` + `placeholder` cover broken/missing images |
| `AvatarGroup` | `size`, `border` (`none\|sm\|md\|lg`), `overlap` (`none\|sm\|md\|lg`), `more` | Overlapping row of `Avatar`s in a `role="group"`; `more` appends a `+N` counter |
| `Accordion` / `AccordionItem` | `title` (required), `icon` (`chevron\|plus`), `size` | Collapsible sections |
| `Background` | `color`, `gradient`, `image`, `pattern`, `opacity`, `mask` | Absolute-positioned layer for hero sections |
| `Bento` / `BentoItem` | `rows`, `columns`, `gap` / `col`, `row` | Bento grid |
| `Card` | `padding`, `radius`, `shadow`, `border`, `hover` (`light\|surface\|primary\|outline\|elevate\|...`), `variant` (`ghost\|surface\|light\|dark\|primary\|...`), `size`, `fluid`, `badged` | Card container |

### Providers & Controls

| Component | Key props | Notes |
| --- | --- | --- |
| `Theme` | `dark` | Root provider — always wrap layouts |
| `ThemeToggle` | — | Light/dark switch |

### Forms

| Component | Key props | Notes |
| --- | --- | --- |
| `TextField` | `label`, `description`, `error`, `required`, `size`, `radius` (adds `none\|full`), `fullWidth`, `id`, `name`, `type` (`text\|email\|password\|search\|tel\|url`) | Native `<input>`; set `id` to auto-wire `aria-describedby` to the description/error nodes |
| `Textarea` | same as `TextField` (no `type`) plus `resize` (`none\|vertical\|horizontal\|both`), `rows` | Native `<textarea>`; `rows` defaults to 4 |

Both render through an internal `Field` wrapper (not exported from the barrel) that owns the label/description/error layout and the focus styles.

### Background patterns & masks

```astro
<Background
  gradient={{ colors: ["#3b82f6", "transparent"], type: "radial" }}
  opacity={0.4}
/>

<Background
  color="#3b82f6"
  mask={{ shape: "radial", position: { x: 50, y: 0 }, size: { x: 70, y: 60 } }}
/>
```

`pattern` takes a **required** `style` — `"dots" | "dots-x" | "grid" | "stripes" | "diamond-grid"` — plus optional `color`, `size`, `gap`, `deg`. There is no `type` key; that name belongs to `gradient`.

`mask` takes `{ shape?: "radial", position?: { x?, y? }, size?: { x?, y? }, visibility? }` and renders a `radial-gradient` mask that fades the layer to transparent at the edges — ideal for hero "fade into the page" backgrounds. `position` and `size` are `{x, y}` objects in **percentages 0–100** — no keyword strings, no 0–1 fractions. This is enforced: a non-object throws at render time instead of silently falling back to the default anchor. Defaults: `position` `{x: 50, y: 0}`, `size` `{x: 70, y: 60}`, `visibility` `1`.

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

### MegaMenu

```astro
<MegaMenu>
  <MegaMenuItem label="Products" drop={{ position: "start", offset: 20 }}>
    <MegaMenuItem label="Grid" href="/grid" />
    <MegaMenuItem label="Masonry" href="/masonry" />
  </MegaMenuItem>
  <MegaMenuItem label="Pricing" href="/pricing" />
</MegaMenu>
```

`MegaMenu` takes no props beyond `class`. `MegaMenuItem` takes `label` (required), `href`, and `drop` (`boolean` or `{ position: "start"|"center"|"end", offset }`); a `drop` item opens one shared panel whose content is that item's default slot. Hover intent and `prefers-reduced-motion` are handled in its script.

Two constraints worth knowing: it is **single-instance per page** (the panel uses a hardcoded `id="mega-panel"` and the script queries `[data-mega-drop]` page-wide, so a second instance collides with the first), and the panel is **hover-only** — the trigger is a `<button>` with no click or keydown handler, so it is not keyboard reachable.

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
    <Fragment slot="background"><Background mask={{ shape: "radial" }} /></Fragment>
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
5. **Components with client JS:** `Theme` (init), `ThemeToggle` (theme switch), `NavBar` (scroll listener), `Drawer`, `Dropdown`, `MenuGroup`, `AccordionItem`, `Article` (anchor links + copy), `BackToTop`; blocks add `MegaMenu` and `TOC` (scrollspy). The rest are render-only — `Marquee` and `TextRotate` are CSS-only, with no script.
6. **Contrast:** brand colors are checked against white — keep them dark enough.
7. **Docs:** per-component reference lives at `docs/components/*.md` for core and `docs/blocks/*.md` for blocks, in the [GitHub repo](https://github.com/viirak/nautui). Some components share a page — `AvatarGroup` is a section of `Avatar.md`, `Textarea` of `TextField.md`.
8. **Dark-mode tokens in `<style>`:** write `:root[data-theme="dark"]`, never a bare `[data-theme="dark"]` — Astro scopes the latter, so it matches nothing.
