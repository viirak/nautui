# AGENTS.md — Naut UI

A clean, minimalist **Astro UI component library** for marketing websites. Design tokens are derived at runtime via CSS `color-mix()` and OKLCH — no preprocessor, no build step.

## Tooling (mandatory)

Read `~/.config/AGENTS.md` first — follow its MCP-first tool priority strictly.

## Architecture & Conventions

### Component Pattern

Every component is a single `.astro` file:

```astro
---
import type { Base } from "../types";

export interface MyCompProps extends Base {
  // component-specific props
}

const { class: className, ...rest } = Astro.props as MyCompProps;
---

<div class:list={["naut-mycomp", className]} {...rest}>
  <slot />
</div>

<style>
  .naut-mycomp { /* scoped styles */ }
</style>
```

- Props interface exported from the component file itself; `Base` (from `src/types.ts`) provides `class` plus arbitrary passthrough props.
- Always destructure `class: className` (`class` is reserved in JS).
- Every class uses the `naut-` prefix; CSS is scoped by Astro except shared utility classes.
- **CSS nesting required:** selectors nest as children of the root component class — see `Drawer.astro`.
- **BEM naming:** `__` separates block from child element (`naut-card__body`); `--` marks variants/states (`naut-drawer-panel.position--center`). Child part → `__`; variant → `--`.

### Theme System

- **Theme.astro** is the provider — injects `reset.css`, `global.css`, and `colors.css`.
- Two brand inputs: `--naut-color-primary` and `--naut-color-secondary` (≥4.5:1 contrast vs white); every other token derives at runtime.
- Dark mode auto-enables via `data-theme` on `<html>`; `colors.css` defines dark variants plus a `.dark` class for sections/navs. `ThemeToggle` switches with system-preference detection.
- Fonts: `--naut-font-body` (system-ui stack) and `--naut-font-display` (defaults to body) — override for brand typefaces.

### Responsive Breakpoints

```
Mobile:          576px — 817px
Tablet:          818px — 1041px
Desktop:        1042px — 1249px
Large Desktop:  1250px — 1449px
Extra Large:    1450px+
```

### Shared CSS Utilities

In `packages/core/src/styles/`:
- `spacing/padding.css`, `spacing/margin.css` — `.p-*`/`.m-*` with axis variants (`px`, `py`, `pt`, …); sizes: 0, xs, sm, md, lg, xl, xxl
- `spacing/gap.css` — `.gap-{size}` (xs–xl)
- `border.css` — border width/style classes with side-specific variants
- `radius.css` — `.radius-{sm|md|lg|xl}` (+ `--naut-border-radius-full`)
- `shadow.css` — `--naut-shadow-{sm|md|lg|xl}` derived from `--naut-shadow-scale`

### Type System (`src/types.ts`)

```typescript
export type Size = "sm" | "md" | "lg" | "xl";
export type Gap = Size;
export type Shadow = Size;
export type Radius = Size;
export type Responsive = "base" | Size;
export interface Base { class?: string; [key: string]: unknown; }
```

### Lib Utilities

- `lib/border.ts` — `createBorder(props)` → `{ borderClasses, borderColors }`
- `lib/spacing.ts` — `extractSpacingProps(props)` / `getSpacingClasses(props)`
- `lib/pattern.ts` — `getGradientPattern(props)` → dots/dots-x/grid/stripes backgrounds

### Biome

Config extends `ultracite/biome/core` + `ultracite/biome/astro`. Spaces for indentation, double quotes, auto-organized imports; `.astro` files have relaxed rules (see `overrides` in `biome.json`).

### Package Layout

| | `@nautui/core` | `@nautui/blocks` |
|---|---|---|
| Entry | `./src/index.ts` | `./src/index.ts` |
| Types | `./index.d.ts` (manual) | `./index.d.ts` |
| Peer dep | `astro: ^6.0.0` | `astro: ^6.0.0` |
| Deps | — | `@nautui/core` |
| Published files | `src/` | `src/` |

### Gotchas

1. **`index.d.ts` is manually maintained** — adding a component means updating both `index.ts` and `index.d.ts`.
2. Keep the `// biome-ignore-all lint/style/noExportedImports: DX` comments in barrel exports.
3. Spacing/border CSS is imported per-component in frontmatter (`import "../styles/spacing/padding.css"`), never centrally.
4. `define:vars={{ ... }}` passes runtime values into `<style>` (e.g. NavBar `zindex`, `barHeight`).
5. `<script is:inline>` runs before hydration (Theme init, NavBar scroll listener); plain `<script>` gets TypeScript compilation (ThemeToggle).
6. Container breakpoints add a 1450px+ tier beyond the general breakpoints above.
7. Layer order matters: `@layer naut-base, naut-theme, naut-component;`.
8. Use `pnpm fix` before commits — not `biome check --write` directly.
9. `class:list` filters falsy values automatically.
10. Requires `astro: ^6.0.0` (no Astro 5.x) and Baseline 2024 browsers (Chrome 119+, Safari 16.4+, Firefox 128+) — CSS uses `rgb(from ...)`, `color-mix()`, and nesting.
11. `@nautui/blocks` depends on `@nautui/core` as a runtime dependency; both publish to npm separately.

## Impeccable

[impeccable](https://github.com/pbakaus/impeccable) (design-language skill + detector rules for AI frontend work) is installed globally at `~/.agents/skills/impeccable`.
