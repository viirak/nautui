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
| `island`   | `boolean`                               | `false`     | Floating centered bar; wraps content in `Container`. |
| `sticky`   | `boolean`                               | `false`     | Fix the bar to the top of the viewport.            |
| `autohide` | `boolean`                               | `false`     | Hide the bar when scrolling down past the bar.     |
| `bordered` | `boolean`                               | `false`     | 1px border around the content row.                 |
| `dark`     | `boolean`                               | `false`     | Force dark styling. Also toggled automatically (see below). |
| `offset`   | `number`                                | `0`         | Gap above a sticky bar (px).                       |
| `radius`   | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `0`        | Border radius on the content row.                  |
| `shadow`   | `"sm" \| "md" \| "lg" \| "xl"`          | —           | Box shadow on the content row.                     |
| `zindex`   | `number`                                | `99`        | `z-index` for sticky bars.                         |
| `class`    | `string`                                | —           | Extra class names merged onto the element.         |

Any other attributes (e.g. `id`, `aria-*`, `data-*`) pass through to the `<nav>`.

## Layout

By default the bar spans the full viewport width with a padding-centered content row. Set `island` to wrap the content in a `Container` so the bar centers at the container width.

`bordered`, `shadow`, and `radius` style the content row itself — useful for an island/pill look.

## Dark mode

NavBar follows dark sections automatically. It ships an `IntersectionObserver` that watches the first `.naut-section.dark` on the page and adds the `dark` class to the bar while that section is on screen. This keeps the nav legible over dark hero/section backgrounds.

To force dark regardless, pass `dark`. To opt out of the automatic behavior, don't render a `dark` Section, or scope your sections.

## Sticky & autohide

With `sticky`, the bar gets a blur backdrop and a translucent background once you scroll (`scrolled` class). `autohide` additionally hides the bar by sliding it up when scrolling down past `height + offset`; it reappears when scrolling up.

## Accessibility

- Renders as `<nav>` — give it a label (`aria-label` or an `aria-labelledby` pointing at the logo) if the page has more than one nav landmark.
- Autohide removes the bar from view on scroll-down but it stays in the document and keyboard focusable; content underneath isn't hidden behind it at rest.
- Keep the default `zindex` below modals/drawers (those use higher values).