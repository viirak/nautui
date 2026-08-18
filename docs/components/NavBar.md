# NavBar

A top navigation bar with sticky, autohide, and dark-mode-aware behaviors. Renders a semantic `<nav>` and keeps the bar height consistent with the `height` prop.

## Usage

Import from `@nautui/core`:

```astro
---
import { NavBar } from "@nautui/core";
---

<NavBar height={70} sticky>
  <a href="/">Logo</a>
  <nav>...</nav>
  <ThemeToggle />
</NavBar>
```

## Props

| Prop       | Type                                    | Default     | Description                                        |
| ---------- | --------------------------------------- | ----------- | -------------------------------------------------- |
| `height`   | `number`                                | `70`        | Bar height in pixels.                              |
| `variant`  | `"default" \| "outline" \| "island"`    | `"default"` | Layout style. See [variants](#variants).           |
| `sticky`   | `boolean`                               | `false`     | Pin the bar to the top of the viewport.            |
| `autohide` | `boolean`                               | `false`     | Hide the bar when scrolling down past the bar.     |
| `bordered` | `boolean`                               | `false`     | Bottom border (default/outline) or 1px border (island). |
| `dark`     | `boolean`                               | `false`     | Force dark styling. Also toggled automatically (see below). |
| `fluid`    | `boolean`                               | `false`     | Full-width; skip the `Container` wrapper.          |
| `offset`   | `number`                                | `0`         | Gap above a sticky bar (px).                       |
| `radius`   | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `0`        | Border radius. Only meaningful for `island`.       |
| `shadow`   | `"sm" \| "md" \| "lg" \| "xl"`          | —           | Box shadow.                                        |
| `zindex`   | `number`                                | `99`        | `z-index` for sticky bars.                         |
| `class`    | `string`                                | —           | Extra class names merged onto the element.         |

Any other attributes (e.g. `id`, `aria-*`, `data-*`) pass through to the `<nav>`.

## Variants

- **`default`** — full-width bar with a `Container`-centered content row.
- **`outline`** — adds left/right spacer columns with vertical dividers, for a flanked logo/content layout.
- **`island`** — a floating rounded bar inset from the viewport edges; width adapts to breakpoints and centers horizontally.

## Dark mode

NavBar follows dark sections automatically. It ships an `IntersectionObserver` that watches the first `.naut-section.dark` on the page and adds the `dark` class to the bar while that section is on screen. This keeps the nav legible over dark hero/section backgrounds.

To force dark regardless, pass `dark`. To opt out of the automatic behavior, don't render a `dark` Section, or scope your sections.

## Sticky & autohide

With `sticky`, the bar gets a blur backdrop and a translucent background once you scroll (`scrolled` class). `autohide` additionally hides the bar by sliding it up when scrolling down past `height + offset`; it reappears when scrolling up.

## Accessibility

- Renders as `<nav>` — give it a label (`aria-label` or an `aria-labelledby` pointing at the logo) if the page has more than one nav landmark.
- Autohide removes the bar from view on scroll-down but it stays in the document and keyboard focusable; content underneath isn't hidden behind it at rest.
- Keep the default `zindex` below modals/drawers (those use higher values).