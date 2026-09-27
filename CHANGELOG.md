# Changelog

## Unreleased

### `@nautui/core` — Breaking Changes

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
