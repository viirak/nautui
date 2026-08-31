# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Astro developers building marketing websites — landing pages, docs, and marketing sites — who want production-ready, accessible UI primitives they can compose and extend without fighting a framework.

## Product Purpose

A clean, minimalist UI component library for Astro marketing sites. @nautui/core ships 37 primitive components that cover layout, content, navigation, and feedback, so developers can assemble complete pages without writing CSS from scratch.

## Positioning

Three claims a neighboring product could not truthfully copy:

1. **Zero-build runtime tokens** — design tokens are derived at runtime via CSS `color-mix()` and OKLCH custom properties. No preprocessor, no build step, live theming from two brand inputs.
2. **Marketing-site focus** — components purpose-built for marketing sites (heroes, sections, cards, nav, docs), not app UIs.
3. **Minimalist aesthetic** — a clean, understated visual language that reads as intentional and lets content lead.

## Operating Context

- Consumed as `@nautui/core` (published to npm) with `astro: ^6.0.0` as a peer dependency.
- Each component is a single `.astro` file exporting a `*Props` interface extending `Base` (`class` + rest props).
- BEM class naming with `naut-` prefix; CSS scoped by Astro, nested under the root component class.
- `@nautui/blocks` builds composite components on top of core.
- The website app at `apps/website` is the docs/showcase consuming core.

## Capabilities and Constraints

- 37 primitive components in `packages/core/src/components/`.
- Theme system: `<Theme>` provider injects `global.css` + `colors.css`; two brand inputs (`--naut-color-primary`, `--naut-color-secondary`) must hold ≥4.5:1 contrast vs white.
- Dark mode auto-enabled when `<Theme>` wraps the layout, controlled via `data-theme` on `<html>`; `ThemeToggle` switches light/dark with system-preference detection.
- Responsive breakpoints: Mobile 576-817px, Tablet 818-1041px, Desktop 1042-1249px, Large Desktop 1250-1449px, XL 1450px+.
- CSS uses relative color syntax and `color-mix()`, requiring Baseline 2024 browsers (Chrome 119+, Safari 16.4+, Firefox 128+).
- Shared utilities: spacing (padding/margin/gap), border, radius, shadow CSS files.
- `index.d.ts` is manually maintained alongside the `index.ts` barrel.
- No automated tests exist; `pnpm test` in each package is a stub.

## Brand Commitments

- Name: NautUI.
- Clean, minimalist aesthetic is binding; components should not drift toward decorative or loud styling.
- Two-brand-input theming model (primary/secondary colors, ≥4.5:1 contrast vs white) is a confirmed product decision.

## Evidence on Hand

- `packages/core/src/components/` — 37 component implementations.
- `packages/core/src/styles/` — global.css, colors.css, radius.css, shadow.css, spacing/.
- `packages/core/src/lib/` — border.ts, spacing.ts, pattern.ts utilities.
- `apps/website/` — consuming docs/showcase app.
- `AGENTS.md` — repo architecture and conventions (some entries stale; see 2026-08-18 audit).

## Product Principles

1. Components are production primitives: accessible, typed, and documented before they ship.
2. Zero-build runtime theming stays a core promise — no preprocessor or build step ever introduced.
3. One source of truth per component: props interface, template, and scoped styles colocated in a single file.
4. Marketing-site reality wins: optimize for landing pages, docs, and content-forward layouts, not app dashboards.
5. Token discipline: colors, radii, shadows, and spacing flow from the token system, never hard-coded.

## Accessibility & Inclusion

- Components must meet WCAG AA (components are marketed as production-ready).
- `prefers-reduced-motion` is honored where motion is introduced (e.g. Marquee).
- Components supporting dark-mode forcing via a `dark` prop must resolve through the token system.
