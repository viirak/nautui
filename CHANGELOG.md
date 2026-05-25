# Changelog

## v0.1.0 — 2026-05-25

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
