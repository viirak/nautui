# Section

A page section with a three-zone layout (left / center / right), a centered content column, optional border, and dark-mode forcing. This is the primary building block of marketing pages.

## Usage

Import from `@nautui/core`:

```astro
---
import { Section } from "@nautui/core";
---

<Section>
  <h1>Page title</h1>
  <p>Section content.</p>
</Section>
```

## Props

`SectionProps extends Base, PaddingProps` (spacing props `p-*`/`m-*` supported).

| Prop     | Type                                            | Default | Description                                   |
| -------- | ----------------------------------------------- | ------- | --------------------------------------------- |
| `as`     | `"div" \| "section" \| "article" \| "main" \| "header" \| "footer"` | `"section"` | Rendered element. |
| `border` | `Border \| string`                              | —       | Border (string = width).                      |
| `dark`   | `boolean`                                       | `false` | Force dark-mode rendering (`.dark` class).    |
| `class`  | `string`                                        | —       | Extra class names merged onto the element.    |

Default content padding is `md` when no padding props are passed.

## Layout

```
┌──────────────────────────────────────────┐
│ <slot name="background">  (z-index 0)     │
│ ┌────────┬──────────────┬──────────────┐ │
│ │ left   │   center      │  right      │ │
│ │ slot   │  content      │  slot       │ │
│ └────────┴──────────────┴──────────────┘ │
└──────────────────────────────────────────┘
```

- The `center` column clamps to the content max-width (576px mobile → 1200px large desktop) and centers horizontally.
- `left`/`right` zones appear on screens ≥576px; below that they collapse (full-width mobile content).
- `background` sits behind everything; `before`/`after` render outside the three-zone row.

## Slots

| Slot        | Renders                       |
| ----------- | ----------------------------- |
| `background` | Behind all content.           |
| `before`    | Above the three-zone row.     |
| `left` / `right` | Flanking zones (≥576px). |
| *(default)* | The centered content column.  |
| `after`     | Below the three-zone row.     |

## Dark mode

`dark` adds the `.dark` class, which triggers dark-token overrides via `colors.css`. Sections with `dark` are also detected by `NavBar`'s IntersectionObserver, which darkens the nav while a dark section is on screen. Nested `Button`s/NavBars accept a `dark` prop to match.

## Accessibility

- Default `<section>` needs an accessible name if it's a landmark — give it `aria-labelledby` or `aria-label` when used as a region.
- `as="main"` renders a single `<main>`; only one `<main>` per page.