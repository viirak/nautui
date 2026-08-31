# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Astro developers building marketing sites and documentation pages with @nautui/core. They reach for blocks to assemble complete page sections without composing many primitives by hand.

## Product Purpose

Composable page sections and scaffolds built on top of @nautui/core. @nautui/blocks ships 4 composite components — Breadcrumb, DocLayout, SectionHero, TOC — that cover the common structural needs of a marketing site plus a docs page shell.

## Positioning

Three claims a neighboring product could not truthfully copy:

1. **Composition over primitives** — each block is a single drop-in component composed from @nautui/core primitives, inheriting its theming and token discipline automatically.
2. **Docs + marketing in one** — the only Astro block set that ships both marketing sections (hero, breadcrumb) and a full documentation page shell (DocLayout + TOC) in one package.
3. **Zero-config theming** — blocks render through core's runtime tokens; no extra build step or config to adopt.

## Operating Context

- Consumed as `@nautui/blocks` (published to npm) with `astro: ^6.0.0` peer dependency and `@nautui/core: ^0.1.1` runtime dependency.
- Built on core: SectionHero wraps `Section`/`Space`; DocLayout wraps `Article`/`Box`/`Container`/`Title`; Breadcrumb and TOC are standalone.
- The website app at `apps/website` is the primary consumer (docs pages use DocLayout + TOC).
- Same BEM/naming/token conventions as core; CSS scoped by Astro.

## Capabilities and Constraints

- **SectionHero** — full-width hero section with optional `figure` slot (clip: slash/backslash, position: right/bottom), `dark` force-dark prop, and a `background` slot.
- **Breadcrumb** — ordered `items` (label + optional href) with `/` separators; last item non-link.
- **DocLayout** — 3-column docs shell (nav / content / TOC) with responsive collapse; `headings` prop drives the TOC; slots: `nav`, default content.
- **TOC** — renders `MarkdownHeading[]` with depth-based indentation and an optional top link; sticky.
- Blocks must stay thin — logic lives in core; blocks are composition + layout.
- Dark-mode forcing via `dark` props must resolve through core's token system.

## Brand Commitments

- Name: NautUI.
- Blocks look native to core's minimalist aesthetic — no new visual language.
- DocLayout and SectionHero ship with the same clean, content-forward styling as core.

## Evidence on Hand

- `packages/blocks/src/components/` — 4 component implementations.
- `packages/core/` — the primitives they compose.
- `apps/website/src/pages/docs/[...id].astro` — DocLayout + TOC consumed in the docs site.

## Product Principles

1. A block earns its place by removing real composition friction, not by existing.
2. Blocks add layout and composition only — styling authority stays with core's tokens.
3. Every block must render correctly at all responsive breakpoints (mobile → XL).
4. Blocks work with zero config: sensible defaults, typed props, dark mode via tokens.

## Accessibility & Inclusion

- Breadcrumb uses a semantic `<nav>`; TOC links are keyboard-reachable and match heading levels.
- DocLayout keeps readable line lengths in content; responsive collapse never hides navigation without a fallback.
- SectionHero `figure` content must not be the only carrier of meaning.