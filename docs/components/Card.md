# Card

An elevated, bordered content container with slots for common card anatomy (badge, header, body, footer) and hover states.

## Usage

Import from `@nautui/core`:

```astro
---
import { Card } from "@nautui/core";
---

<Card>
  <Card slot="badge"><Badge variant="outline">New</Badge></Card>
  <h3>Card title</h3>
  <p>Card body text.</p>
  <Card slot="footer"><Button>Learn more</Button></Card>
</Card>
```

## Props

`CardProps extends Base, PaddingProps` (spacing props `p-*`/`m-*`/`gap-*` are supported).

| Prop       | Type                                     | Default   | Description                                       |
| ---------- | ---------------------------------------- | --------- | ------------------------------------------------- |
| `variant`  | `"ghost" \| "surface" \| "light" \| "dark" \| "primary" \| "outline-primary" \| "outline-dark" \| "rainbow"` | `"surface"` | Visual style.                                    |
| `hover`    | `"outline" \| "elevate" \| "elevate-lg" \| "elevate-xl" \| "light" \| "dark" \| "primary" \| "outline-primary" \| "outline-dark" \| "rainbow"` | — | Hover interaction (border/`shadow`/color shift). |
| `badged`   | `boolean`                                | `false`   | Reserves space for a `slot="badge"` in the corner. |
| `border`   | `Border \| string`                       | —        | Custom border (width/style/color per side).      |
| `radius`   | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"lg"`    | Border radius.                                   |
| `shadow`   | `"sm" \| "md" \| "lg" \| "xl"`           | —        | Base box shadow.                                 |
| `size`     | `"sm" \| "md" \| "lg"`                   | `"md"`    | Padding scale.                                   |
| `fluid`    | `boolean`                                | `false`   | Full-width (no max-width centering).             |
| `class`    | `string`                                 | —        | Extra class names merged onto the element.       |

Any other attributes pass through to the `<div>`.

## Slots

| Slot         | Renders                                    |
| ------------ | ------------------------------------------ |
| `badge`      | Corner chip; needs `badged` to reserve space. |
| `header`     | Top section with a subtle divider.         |
| *(default)*  | Main content (padded wrapper).              |
| `footer`     | Bottom section with a subtle divider.      |
| `background` | Layer behind everything (e.g. a `Background`). |

## Variants

- **`ghost`** — transparent, no border.
- **`surface`** — subtle `base-200` fill.
- **`light` / `dark`** — solid light/dark fill (dark forces dark-mode rendering).
- **`primary`** — filled with `--naut-color-primary`.
- **`outline-primary` / `outline-dark`** — 2px border in the matching color.
- **`rainbow`** — conic gradient border.

## Hover

`hover` adds a transition and switches the card on hover to the given style (`outline`/`elevate`/color variants). Combined with `transition` on a child link/image, it gives an interactive card feel.

## Accessibility

- Cards are containers, not controls — if the whole card should be clickable, put an `aria-label`led link or stretched link (`.stretched-link` style) inside, not `onclick` on the card.
- `hover` is decorative; all interactive affordances must be visible without hover (focus states included).