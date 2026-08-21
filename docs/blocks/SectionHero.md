# SectionHero

A full-width marketing hero with a centered content column, an optional figure area (clipped or positioned), and dark-mode support.

## Usage

Import from `@nautui/blocks`:

```astro
---
import { SectionHero } from "@nautui/blocks";
---

<SectionHero dark figure={{ clip: "slash", position: "right" }}>
  <h1>Build better websites</h1>
  <p>NautUI is a minimalist Astro component library.</p>
  <div slot="figure">
    <img src="/img/hero.webp" alt="Product screenshot" />
  </div>
</SectionHero>
```

## Props

`SectionHeroProps` (does **not** extend `Base`).

| Prop     | Type                      | Default  | Description                                   |
| -------- | ------------------------- | -------- | --------------------------------------------- |
| `figure` | `boolean \| FigureProps`  | `false`  | Enable the figure area and its layout options. |
| `dark`   | `boolean`                 | `false`  | Force dark-mode rendering.                    |

### FigureProps

```ts
interface FigureProps {
  clip?: "slash" | "backslash";   // clip-path shape
  position?: "right" | "bottom";  // figure placement
}
```

- `figure` truthy (or an object) enables the `figure` slot.
- `position="right"` (default) splits the hero on desktop: text left, figure absolute on the right (≥1042px). `position="bottom"` centers the figure under the text.
- `clip="slash"` / `clip="backslash"` applies a diagonal `clip-path` on the right-positioned figure (desktop only).

## Slots

| Slot      | Renders                         |
| --------- | ------------------------------- |
| *(default)* | Hero heading/copy/actions (`.hero-content`). |
| `figure`  | The hero visual (only when `figure` is set). |
| `background` | Background layer behind everything (e.g. a `Background`). |

## Layout & breakpoints

- Content column is `Space display-lg` above and `display` below — generous hero padding.
- On desktop (≥1042px) content uses a `1fr 1fr` grid when split; otherwise it's centered.
- The figure max-widths follow the standard breakpoints (576px mobile, 768px tablet, 992px desktop, 1200px large desktop).
- Mobile: the figure stacks below the content; `position-bottom` is the default vertical flow.

## Accessibility

- Renders inside a `<Section>` (default `<section>` element) — give it an accessible name via `aria-labelledby` when it's a page landmark.
- The `figure` content must not be the only carrier of meaning — the default slot should state the headline value.
- `clip` is purely decorative; ensure figure content remains understandable in its clipped state or pair it with text.