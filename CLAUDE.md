# Claude Code instructions for Naut UI

A clean, minimalist **Astro UI component library** for marketing websites.

## CSS convention — nested selectors only

All `<style>` blocks inside `.astro` components **must** use **CSS nesting** rooted under the component's class name. Never use flat/global selectors, bare element selectors, or ID selectors inside component styles.

✅ Good — Drawer.astro:
```css
.naut-drawer {
  .naut-drawer-backdrop { ... }
  .naut-drawer-panel {
    &.position--center { ... }
    &.position--left { ... }
  }
  &.active {
    .naut-drawer-backdrop { ... }
  }
}
```

❌ Avoid — flat selectors:
```css
#naut-drawer { ... }
.naut-drawer-backdrop { ... }
#naut-drawer.active .naut-drawer-panel { ... }
```

## BEM naming convention

Use `__` for child elements (`naut-card__body`), `--` for modifiers (`naut-hide--sm`, `variant--primary`).

## Key facts

- **Monorepo** — `pnpm` workspaces + Turborepo, two packages: `@nautui/core` (primitive components), `@nautui/blocks` (composite blocks)
- **Blocks package** uses `workspace:^0.1.1` protocol for `@nautui/core` dependency — installed as symlink to workspace package
- **No tests exist** — `pnpm test` in each package just errors
- **TypeScript**: run `pnpm check-types` (`turbo run check-types`)
- **Lint/format**: `pnpm fix` (`ultracite fix`) — uses Biome with double quotes, space indent
- **Theme**: CSS custom properties + `color-mix()` in OKLCH at runtime, no build step
- **Dark mode**: `data-theme` attribute on `<html>`, auto-enabled by `<Theme>` provider
- **`index.d.ts` is manually maintained** alongside `index.ts` when adding components
- **Biome-ignore comments** on barrel exports: `// biome-ignore-all lint/style/noExportedImports: DX`
- **Peer dep**: `astro: ^6.0.0`
- **Block components**: `SectionHero`, `DocLayout` (responsive docs grid with nav sidebar + TOC)

<!-- context-firewall:start -->
@AGENTS.md
<!-- context-firewall:end -->
