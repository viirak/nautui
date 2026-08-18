# AGENTS.md — Naut UI

A clean, minimalist **Astro UI component library** for marketing websites. Design tokens are derived at runtime via CSS `color-mix()` and OKLCH — no preprocessor, no build step.

## Project Structure

```
nautui/
├── packages/
│   ├── core/          # @nautui/core — 38 primitive components
│   │   └── src/
│   │       ├── components/    # .astro single-file components
│   │       ├── lib/           # TS utilities (border.ts, spacing.ts, pattern.ts)
│   │       ├── styles/        # CSS files (global.css, colors.css, radius.css, shadow.css, spacing/*)
│   │       ├── index.ts       # barrel export
│   │       └── index.d.ts     # type declarations for consumers
│   └── blocks/        # @nautui/blocks — composite components built from core
│       └── src/
│           ├── components/    # (currently only SectionHero.astro)
│           └── index.ts
├── biome.json         # Biome config (extends ultracite)
├── turbo.json         # Turborepo task orchestration
├── pnpm-workspace.yaml
└── tsconfig.json      # composite project references
```

`apps/*` is declared in the workspace config but **doesn't exist yet** — there is no test app or docs site.

## Essential Commands

| Command | What it does |
|---|---|
| `pnpm build` | `turbo run build` — builds all packages |
| `pnpm dev` | `turbo run dev` — persistent dev servers |
| `pnpm lint` | `turbo run lint` — runs `biome check src` in each package |
| `pnpm check-types` | `turbo run check-types` — TypeScript type checking |
| `pnpm check` | `ultracite check` — full lint+format check across repo |
| `pnpm fix` | `ultracite fix` — auto-fix lint+format issues |

**There are no tests.** The `test` scripts in both packages simply `echo "Error: no test specified" && exit 1`.

## Architecture & Conventions

### Component Pattern

Every component is a single `.astro` file following this structure:

```astro
---
import type { Base } from "../types";

export interface MyCompProps extends Base {
  // component-specific props
}

const { class: className, ...rest } = Astro.props as MyCompProps;
---

<!-- template -->
<div class:list={["naut-mycomp", className]} {...rest}>
  <slot />
</div>

<style>
  .naut-mycomp { /* scoped styles */ }
</style>
```

- **Props interface** is exported from the component file itself, not from a separate types file.
- **`Base`** interface (from `src/types.ts`) provides `class` and `[key: string]: unknown` for rest props.
- **ClassName destructure:** Always `class: className` (not `class`), because `class` is reserved in JS.
- Every component uses a `naut-` prefix on its CSS class name.
- CSS is **scoped by Astro** automatically, except utility classes in shared CSS files.
- **CSS nesting is required inside `<style>` blocks.** Write selectors as nested children of the root component class rather than using flat selectors. See `Drawer.astro` for the canonical example:

```css
.naut-drawer {
  /* root — only ID-less class selectors; never bare elements or IDs */

  .naut-drawer-backdrop { ... }
  .naut-drawer-panel {
    &.position--center { ... }
    &.position--left { ... }
  }
  &.active {
    .naut-drawer-backdrop { ... }
    .naut-drawer-panel { ... }
  }
}
```

### BEM Naming Convention

All CSS class names follow BEM:

- `__` separates a **block** from its **element** (child): `naut-card__body`, `naut-toc__link`
- `--` separates a **block/element** from its **modifier** (variant/state): `naut-drawer-panel.position--center`, `naut-hide--sm`

| Pattern | Meaning | Example |
|---|---|---|
| `block` | The component itself | `naut-card` |
| `block__element` | A child part of the block | `naut-card__body` |
| `block--modifier` | A variation of the block | `naut-hide--sm` |
| `block__element--modifier` | A variation of the element | `naut-drawer-panel.position--center` |

**Rule of thumb:** If the dashed part is a *child* (left, right, header, body, link, list), use `__`. If it's a *variant* (sm, md, primary, outline, center), use `--`.

Previously 22 classes across 8 components used `--` for child elements (e.g., `naut-card--body`) — these were renamed to `__` (`naut-card__body`).

### Theme System

- **Theme.astro** is the provider — wraps layout, injects `global.css` and `colors.css`.
- Two brand inputs: `--naut-color-primary` and `--naut-color-secondary` (must be ≥4.5:1 contrast vs white).
- **Dark mode** is auto-enabled when `<Theme>` wraps the layout. Controlled via `data-theme` attribute on `<html>`.
- `ThemeToggle` component allows switching between light/dark, with smart system-preference detection.
- All tokens ship as CSS custom properties — they update at runtime, no rebuild needed.
- The `colors.css` file defines light and dark variants using `[data-theme="dark"]` selector, plus `.dark` class for sections/navs.

### Responsive Breakpoints

```
Mobile:          576px — 817px
Tablet:          818px — 1041px
Desktop:        1042px — 1249px
Large Desktop:  1250px — 1449px
Extra Large:    1450px+
```

### Shared CSS Utilities

Located in `packages/core/src/styles/`:
- `spacing/padding.css` — `.p-{size}`, `.px-{size}`, `.py-{size}`, `.pt-{size}`, `.pr-{size}`, `.pb-{size}`, `.pl-{size}` (sizes: 0, xs, sm, md, lg, xl, xxl)
- `spacing/margin.css` — same pattern for `.m-*`, `.mx-*`, `.my-*`, `.mt-*`, `.mr-*`, `.mb-*`, `.ml-*`
- `spacing/gap.css` — `.gap-{size}` (sizes: xs, sm, md, lg, xl)
- `border.css` — border width/style classes with side-specific variants (`border-top-*`, `border-right-*`, etc.)
- `radius.css` — `.radius-{sm|md|lg|xl}` (plus `--naut-border-radius-full`)
- `shadow.css` — `--naut-shadow-{sm|md|lg|xl}` computed from `--naut-shadow-scale`

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

- **`lib/border.ts`** — `createBorder(props)` returns `{ borderClasses, borderColors }` for components that accept complex border props (width, style, color per side).
- **`lib/spacing.ts`** — `extractSpacingProps(props)` splits spacing props from non-spacing ones; `getSpacingClasses(props)` generates CSS class names.
- **`lib/pattern.ts`** — `getGradientPattern(props)` returns CSS `background` values for dots, dots-x, grid, or stripes patterns.

### Biome + Linting

- Config extends `ultracite/biome/core` + `ultracite/biome/astro`.
- `.astro` files have relaxed rules (`useConst` off, `useImportType` off, `useSelfClosingElements` off, a11y `useAnchorContent` off).
- Indent style: **spaces** (not tabs).
- Quote style: **double quotes** for JS/TS.
- Imports are auto-organized on save (Biome assist).
- VCS integration enabled (ignores gitignored files).

### Package Layout

| | `@nautui/core` | `@nautui/blocks` |
|---|---|---|
| Entry | `./src/index.ts` | `./src/index.ts` |
| Types | `./index.d.ts` (manual declarations) | `./index.d.ts` |
| Peer dep | `astro: ^6.0.0` | `astro: ^6.0.0` |
| Deps | — | `@nautui/core: ^0.1.1` |
| Published files | `src/` | `src/` |

### Key Gotchas & Non-Obvious Details

1. **No tests exist.** `pnpm test` in each package just echoes an error. Don't look for test files — there are none.
2. **`index.d.ts` is manually maintained.** Adding a new component requires updating both `index.ts` (barrel export) AND `index.d.ts` (type declarations). The `index.d.ts` re-declares all component props types and export signatures.
3. **Biome-ignore comments** are used in barrel exports (`// biome-ignore-all lint/style/noExportedImports: DX`). Keep these when modifying `index.ts`.
4. **Spacing/margin/padding CSS** are loaded via Astro imports in the component's frontmatter (e.g. `import "../styles/spacing/padding.css"`). This ensures Astro bundles them. Don't add them in a central import — each component imports what it needs.
5. **`define:vars`** is used in `<style>` to pass runtime JS values into CSS (e.g., `define:vars={{ zindex, barHeight }}`). This is an Astro-specific feature.
6. **`<script is:inline>`** vs `<script>`: Inline scripts are used for operations that must run before hydration (Theme initialization, NavBar scroll listener). Regular `<script>` is used where TypeScript compilation is needed (ThemeToggle).
7. **Container breakpoints** differ slightly from the general breakpoints — there's a 1450px+ breakpoint for 1440px max-width containers.
8. **Layer order** is important: `@layer naut-base, naut-theme, naut-component;` — base first, theme overrides, components last for specificity.
9. **No `apps/` directory exists** despite `pnpm-workspace.yaml` referencing `apps/*`. The workspace doesn't fail; it just matches nothing.
10. **The `fix` command** (`ultracite fix`) runs Biome formatting + linting across the entire repo. Use this before commits, not `biome check --write` directly.
11. **Astro `class:list`** is used for conditional class composition — falsy values are filtered out automatically.
12. **Peerdep requirement:** All components require `astro: ^6.0.0`. The library won't work with Astro 5.x or earlier.
13. **CSS uses relative color syntax** (`rgb(from ...)`) and `color-mix()`, requiring Baseline 2024 browsers (Chrome 119+, Safari 16.4+, Firefox 128+).
14. **`packages/blocks`** depends on `@nautui/core` as a runtime dependency (not peer), but both are published to npm as separate packages.

## Impeccable (design guidance + detector)

**What:** [impeccable](https://github.com/pbakaus/impeccable) is a design-language skill for AI coding agents: **1 skill, 23 commands, live browser iteration, and 59 deterministic detector rules** for AI-generated frontend design. It's installed globally (`~/.agents/skills/impeccable`, `~/.cursor/agents/`).
