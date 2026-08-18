# Button

A versatile button and link-button built on Naut UI's design tokens.

## Usage

Import from `@nautui/core`:

```astro
---
import { Button } from "@nautui/core";
---

<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="outline" href="/signup">Sign up</Button>
```

### Render as a link

Pass `href` to render an `<a>` instead of a `<button>`:

```astro
<Button href="/docs">Read the docs</Button>
```

## Props

| Prop       | Type                                                                  | Default     | Description                                    |
| ---------- | --------------------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `variant`  | `"default" \| "primary" \| "secondary" \| "destructive" \| "outline" \| "outline-primary" \| "outline-secondary" \| "flat" \| "ghost" \| "link" \| "rainbow"` | `"default"` | Visual style. See [variants](#variants).        |
| `size`     | `"sm" \| "md" \| "lg"`                                                | `"md"`      | Button height, padding, and font size.         |
| `rounded`  | `"none" \| "sm" \| "md" \| "lg" \| "full"`                            | `"md"`      | Border radius. `"full"` makes a pill.          |
| `border`   | `"none" \| "sm" \| "md" \| "lg" \| "xl"`                              | `"md"`      | Border thickness.                              |
| `type`     | `"button" \| "submit" \| "reset"`                                     | `"button"`  | Native `type` attribute (buttons only).        |
| `dark`     | `boolean`                                                             | `false`     | Force dark-mode styling (dark sections/navs).  |
| `square`   | `boolean`                                                             | `false`     | Equal width/height aspect for icon-only use.   |
| `href`     | `string`                                                              | —           | When set, renders an `<a>` with this `href`.   |
| `class`    | `string`                                                              | —           | Extra class names merged onto the element.     |

Any other attributes (e.g. `id`, `data-*`, `aria-*`, `disabled`) pass through to the underlying element.

## Variants

- **`default`** — base surface with a subtle border and shadow.
- **`primary`** — filled with `--naut-color-primary`.
- **`secondary`** — filled with `--naut-color-secondary`.
- **`destructive`** — filled with `--naut-color-destructive`.
- **`outline`** — transparent fill, strong border.
- **`outline-primary`** — transparent fill, primary-colored border.
- **`outline-secondary`** — transparent fill, secondary-colored border.
- **`flat`** — base surface, no border or shadow.
- **`ghost`** — fully transparent.
- **`link`** — primary text color, underline on hover.
- **`rainbow`** — conic-gradient border in brand hues.

## Examples

### Icon + label

```astro
<Button variant="outline">
  <svg>...</svg>
  <span>Arrow Right</span>
</Button>
```

Icons inside a button are sized automatically from the current `size`.

### Icon-only

```astro
<Button variant="flat" square>
  <svg>...</svg>
</Button>
```

### Pill

```astro
<Button rounded="full">Subscribe</Button>
```

### Form submit

```astro
<Button type="submit" variant="primary">Save</Button>
```

## Accessibility

- Buttons render as native `<button>` (or `<a>` when `href` is set) and are keyboard-focusable by default.
- `disabled` buttons are styled dimmed and skip pointer events.
- When used in a dark section (e.g. inside a dark `NavBar`), pass `dark` to keep text/content contrast.