# Changelog

## Unreleased

### `@nautui/core` — Additions

**New spacing step `--naut-spacing-xxs`** (`clamp(0.125rem, 0.1rem + 0.15vw, 0.25rem)`, i.e. 2-4px) below `xs`, with matching `.p-xxs` / `.px-xxs` / `.py-xxs` / `.pt-xxs` / `.pb-xxs` / `.pl-xxs` / `.pr-xxs` padding utilities and `.gap-xxs`.

**Destructive fill darkened for contrast.** `--naut-color-destructive` was `#ef4444`, which against the white `--naut-color-destructive-content` foreground measured **3.76:1**. It is now `#dc2626` (4.83:1). This changes every destructive fill — `Button variant="destructive"`, `Badge variant="destructive"`.

**A custom-property cycle made dark mode render black-on-black. Fixed.** `colors.css` captured each brand colour into a `-input` token and redefined the colour itself in the dark block:

```css
:root            { --naut-color-primary-input: var(--naut-color-primary); }
[data-theme=dark]{ --naut-color-primary: color-mix(in oklch, var(--naut-color-primary-input), white 40%); }
```

The pair is a cycle, so it is invalid at computed-value time. Verified in Chromium against `colors.css` with `<html data-theme="dark">`: `--naut-color-primary`, `--naut-color-secondary`, `--naut-color-link`, `--naut-color-base`, `--naut-color-content` and everything derived from them all resolved to the empty string, rendering the page black-on-black. This already affected `--naut-color-link` on `main`; the brand-fill work extended it to the two most-referenced tokens, taking out the whole theme.

A themed token may not be the source of its own mix. The brand colours are now pure inputs that the dark block never redefines, and dark-mode adaptation lives in role tokens — one job each, identity in light, adapted in dark:

| Role | Tokens | Used by |
| --- | --- | --- |
| fill | `-primary-fill`, `-secondary-fill`, `-link-fill` | `background` / `border-color` of Button, Badge, Card, MenuItem, Avatar, IconBox, BackToTop, AccordionItem |
| text | `-primary-text`, `-secondary-text`, `-destructive-text`, `-link-text` | any brand colour that paints glyphs |
| content | `-primary-content`, `-secondary-content`, … | the foreground sitting on a `-fill` |

`Text`, `Mark`, and `getColorValue()` (the `color="…"` prop) all read the `-text` tokens, so `variant="x"` and `color="x"` cannot drift apart. Consumer overrides still work in both themes because the inputs they set are no longer redefined.

**Brand fills lifted in dark mode.** Left unadapted they nearly vanished as controls on a near-black surface — 2.77:1 and 1.12:1 against the dark base, against the 3:1 WCAG 1.4.11 expects of a control boundary. `primary-fill` and `secondary-fill` now mix 40% toward white. A lifted fill can no longer carry a white foreground (`primary` would fall to 3.26:1), so `--naut-color-primary-content` becomes `black` in dark; `secondary-content` stays white, which still measures 4.87:1 on the lifted fill.

**New `--naut-color-primary-hover` / `--naut-color-secondary-hover` replace hard-coded hover mixes.** They hold the entire `color-mix()` rather than a shared percentage, because each fill has its own ceiling — lightening `primary` past 20% drops its white foreground below 4.5:1 (the old 35% mix measured 3.65:1, a pre-existing failure). In dark mode both flip to *darkening* the fill, because the fill is already lifted and the old "lighten 35%" hover drove `secondary` text to 2.52:1.

Note: the utility files expose different subsets of the token scale — `padding.css` has `xxs`–`xl`, `margin.css` has `sm`–`xl`, no file has `xxl`, and the `Spacing` type is `Size` (`sm|md|lg|xl`), so the smaller steps are reachable through the CSS utilities and hardcoded class lists but not through a generic `padding`/`margin` prop.

**`Badge` splits fill and outline into independent axes, and `outlineColor` is now a border weight.** `variant` carries the fill/text treatment only (`text | surface | primary | secondary | destructive`); the new boolean `outline` adds the border, so a filled badge can now be outlined — impossible with the old variant list. `outlineColor` went from an arbitrary colour string to `"soft" | "normal" | "strong"`, mapping onto `--naut-color-border-soft` / `-border` / `-border-strong`; the outline **hue** comes from the shared `color` token. This fixes two latent bugs: `outlineColor` previously tinted the *text* while the border stayed grey, so `outlineColor="green"` produced a green-text/grey-border badge; and `--naut-color-border-soft` was defined only in the dark block, so it had no light-mode value (its light value is `base-200`, not `base-100`, so it stays visible on `base-100` surfaces like `Card`). An outlined badge also keeps its pill padding — `variant="border"`/`variant="outline"` no longer collapse to a bare `text` badge. When `color` is set it also tints the border, and an `outlineColor` outside `soft|normal|strong` throws rather than emitting a class that matches no rule. Deprecated aliases are kept: `variant="border"` → `outline`, `variant="outline"` → `outline outlineColor="strong"`.

| Old | New |
|-----|-----|
| `<Badge variant="outline">` | `<Badge outline>` |
| `<Badge variant="border">` | `<Badge outline>` |
| `<Badge variant="outline" outlineColor="green">` | `<Badge outline outlineColor="strong" color="success">` |
| `<Badge variant="primary">` | unchanged |

### `@nautui/core` — Breaking Changes

**`Button` and `Badge` `padding` no longer accepts an axis object.** A pill's silhouette depends on inline padding exceeding block padding, so letting the axes be set independently is how they stop reading as pills. Both now take a single `SpacingStep` (`0|xxs|xs|sm|md|lg|xl|xxl`) and derive both axes via `getPillPadding()` in `lib/spacing.ts`: block is `calc(inline * ratio)` with the ratio easing toward 1 as the step grows (`xxs`/`xs` 0.5, `sm` 0.75, `md` 0.85, `lg`+ 0.9), so block is always smaller and the ratio holds exactly at every viewport width.

| Old | New |
|-----|-----|
| `<Button padding="lg">` | unchanged — a scalar step still works |
| `<Button padding={{ x: "lg", y: "sm" }}>` | `<Button padding="lg">` (block is derived) |
| `<Button margin="lg">` | throws — wrap in a `Box` |

Other behaviour changes: padding is rendered through `define:vars` instead of `p-*`/`py-*` utility classes, which removes the utility/specificity collision. `md`/`lg` are now slightly tighter than the old 1:1 (`0.85` instead of `1`), since block must stay below inline. `square` on `Button` opts out of the ratio entirely and keeps receiving **no** padding, unchanged from before. `margin` is declared `never` and also throws at render time. No call site in this repo, the docs, or nuppun used `padding` or `margin` on these two components.

**`Button.rounded` renamed to `Button.radius`** — `radius` is now the single prop name for border radius across every component (`Avatar`, `Badge`, `Box`, `Card`, `Grid`, `IconBox`, `Image`, `MenuItem`, `NavBar`, `TextField`, `Textarea` already used it).

| Old | New |
|-----|-----|
| `<Button rounded="full">` | `<Button radius="full">` |
| `<Button rounded="none">` | `<Button radius="none">` |
| `<Button rounded="sm" \| "md" \| "lg">` | `<Button radius="sm" \| "md" \| "lg">` |

`rounded` is kept as a **deprecated alias** and resolved as `radius ?? rounded`, matching the `Mark.fontFamily` / `ff` pattern. It still works, so existing call sites keep rendering correctly instead of silently reverting to `radius="md"` — but `astro check` cannot flag a stale `rounded` (the `Base` index signature suppresses excess-property checks), so migrate deliberately.

Also fixed: `ButtonRadius` used `Omit<Radius, "xl">`, which resolves to `{}` and therefore accepted *any* value. It now uses `Exclude<Radius, "xl">`, so `radius="xl"` is a type error rather than a silently square button.

**`Mark.variant="halflight"` renamed to `"highlight"`** — the value was a misspelling. `halflight` is kept as a deprecated alias and normalized in the component, so existing call sites keep rendering the same style.

| Old | New |
|-----|-----|
| `<Mark variant="halflight">` | `<Mark variant="highlight">` |

**Dark mode now honours a custom `--naut-color-link`.** The dark block hardcoded `color-mix(in oklch, blue, white 80%)`, so a consumer's link token applied in light mode and was silently discarded in dark mode. It now mixes from a captured copy of the input (`--naut-color-link-input`), which is required because a custom property cannot reference itself — that would be invalid at computed-value time. The `var()` is substituted after the cascade, so the capture picks up a consumer override regardless of stylesheet order.

**`Link` now rejects `size` and unknown `variant` values at render time.** `Base` declares `[key: string]: unknown`, so `size="lg"` or `variant="link"` were accepted by the type, spread onto the `<a>` as invalid attributes, and rendered as silent no-ops. Both now throw a `TypeError` naming the accepted values. `Link` has no size scale by design — a link inherits the size of its surrounding text; use `<Text inline size="lg">` around it or a `class`. `variant="link"` is not needed: the link-coloured look is `Link`'s default (`MenuItem`'s `activeVariant="link"` is a state style, not a `Link` variant).

## v0.1.0 — 2026-05-25
## v0.2.0 — 2026-09-04

### `@nautui/core` — Breaking Changes

**Spacing API refactored** — flat Tailwind-style spacing props replaced with object-based API.

Before (removed):
```astro
<Card p="lg" mt="md">
<Text mx="sm" my="lg">
```

After:
```astro
<Card padding={{ x: "lg", y: "lg" }}>
<Text margin={{ x: "sm", y: "lg" }}>
```

Or shorthand (uniform):
```astro
<Card padding="lg">
<Text margin="lg">
```

**Simplified types** — removed `ResponsiveObject`, `SpacingValue`, `PaddingProps`, `MarginProps`. Now uses `Spacing` (`"sm" | "md" | "lg" | "xl"`) and `SpacingProps` with `margin`/`padding` accepting `Spacing | Margin` or `Spacing | Padding`.

**Fluid spacing** — CSS `clamp()` replaces fixed `rem` values. Spacing now scales fluidly across viewport widths without breakpoint classes.

**Direction API unified** — `Flex`, `Stack`, `Group`, and `Grid` now use the canonical `row`/`column` vocabulary for `direction` (and the canonical `start`/`center`/`end`/`between`/`around`/`evenly` for `justify`). The legacy `horizontal`/`vertical` values are still accepted and are normalized to `row`/`column` by `normalizeDirection()` in `lib/layout.ts` before any class is emitted, so both spellings render identically and no `direction-horizontal` class can reach the DOM:

| Old | New |
|-----|-----|
| `direction="horizontal"` | `direction="row"` |
| `direction="vertical"` | `direction="column"` |

`space-*` justification values (e.g. `justify="space-between"`) and `Group`'s `not` prop are likewise still supported.

### Migration

| Old | New |
|-----|-----|
| `p="md"` | `padding="md"` |
| `pt="lg"` | `padding={{ top: "lg" }}` |
| `px="sm" py="md"` | `padding={{ x: "sm", y: "md" }}` |
| `mx="lg"` | `margin="lg"` |
| `mt="md" mb="lg"` | `margin={{ top: "md", bottom: "lg" }}` |


Initial release of Naut UI — a clean, minimalist UI component library for Astro, built for marketing websites.

### `@nautui/core` — 36 components

**Theme**
- `Theme` — provider that injects CSS custom properties and wires up auto dark mode
- `ThemeToggle` — button that switches between light/dark and persists the choice

**Layout**
- `Container` — center content with padding and max-width
- `Section` — full-width page section with background, border, and slot-based layout
- `Box` — low-level layout component for spacing, borders, and background
- `Group` — flex container helper with gap and alignment shortcuts
- `Stack` — row container helper with configurable gap
- `Flow` — container helper with configurable text alignment
- `Grid` — responsive 12-column grid with configurable gap
- `GridItem` — grid item with column and offset props
- `Bento` — bento grid layout with configurable rows and columns
- `BentoItem` — bento grid item with row/column span props
- `Masonry` — responsive masonry grid with configurable gap
- `MasonryItem` — masonry grid item with column span prop
- `Marquee` — horizontal/vertical scroll container with pause on hover and fade edges
- `Space` — flexible spacer with configurable direction and size
- `Flex` — flex layout component with alignment and gap props

**Typography**
- `Title` — semantic h1–h6 with consistent sizing and muted variant
- `Text` — body text with size variants and muted variant
- `Link` — themed anchor with hover and focus states
- `Mark` — `<mark>` styled with highlight color token
- `List` — styled ordered and unordered lists
- `ListItem` — list item with optional leading icon and themed marker

**UI Elements**
- `Button` — link or button with 11 variants (default, primary, secondary, destructive, outline, outline-primary, outline-secondary, flat, ghost, link, rainbow)
- `Badge` — small pill label for status, counts, or tags
- `Card` — surface container with default, bordered, and flat variants
- `Divider` — horizontal rule styled with theme tokens
- `Image` — responsive image with optional caption and themed border
- `Background` — section background with pattern support

**Navigation**
- `NavBar` — horizontal site navigation with dropdown support
- `Drawer` — off-canvas sidebar for mobile navigation
- `Breadcrumb` — hierarchical page links
- `Accordion` — collapsible content panels
- `AccordionItem` — individual accordion panel
- `Menu` — list of links with hover and focus states
- `MenuItem` — link with optional leading icon

### `@nautui/blocks` — 1 composite block

- `SectionHero` — marketing hero section with headline, subtext, and CTA slots

### Theming

- Two-brand-color system: provide `--naut-color-primary` and `--naut-color-secondary`, everything else derived via OKLCH and `color-mix()` at runtime
- Auto dark mode with `prefers-color-scheme` detection and manual toggle
- Runtime theme switching — no build step or preprocessor required
- WCAG AA contrast ratio (≥ 4.5:1) expected on brand colors

### Browser support

Baseline 2024: Chrome 119+, Safari 16.4+, Firefox 128+
