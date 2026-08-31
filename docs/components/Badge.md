# Badge

A small label chip for statuses, categories, and counts. Badges are non-interactive; pair with `Link` or a button for actions.

## Usage

Import from `@nautui/core`:

```astro
---
import { Badge } from "@nautui/core";
---

<Badge>New</Badge>
<Badge variant="outline">Beta</Badge>
<Badge variant="primary">Pro</Badge>
<Badge variant="surface" dotted>Shipped</Badge>
```

## Props

| Prop            | Type                                       | Default     | Description                                       |
| --------------- | ------------------------------------------ | ----------- | ------------------------------------------------- |
| `variant`       | `"default" \| "text" \| "surface" \| "outline" \| "primary" \| "secondary" \| "destructive"` | `"default"` | Visual style. See [variants](#variants).          |
| `color`         | `"primary" \| "secondary" \| "destructive"` | —           | Tints text/dot color. Only applies to unfilled variants; with filled variants it tints the dot. |
| `size`          | `"sm" \| "md" \| "lg"`                     | `"md"`      | Font size and padding.                            |
| `radius`        | `"sm" \| "md" \| "lg" \| "xl" \| "full"`   | `"sm"`      | Border radius. `"full"` makes a pill.             |
| `letterSpacing` | `"sm" \| "md" \| "lg"`                     | `"md"`      | Text letter spacing.                              |
| `outlineColor`  | `string`                                   | —           | Text/border color for the `outline` variant.      |
| `gradient`      | `{ colors: string[]; textColor: string; deg?: number }` | —    | Gradient background; `deg` defaults to `45`.      |
| `dotted`        | `boolean`                                  | `false`     | Shows a leading status dot.                       |
| `iconOnly`      | `boolean`                                  | `false`     | Square aspect for icon-only badges.               |
| `class`         | `string`                                   | —           | Extra class names merged onto the element.        |

Any other attributes (e.g. `id`, `aria-*`, `data-*`) pass through to the element.

## Variants

- **`default`** — bordered chip with content text.
- **`text`** — bare text, no border or background.
- **`surface`** — subtle `base-200` fill, no border.
- **`outline`** — transparent fill, strong border. Set the color with `outlineColor`.
- **`primary`** — filled with `--naut-color-primary`.
- **`secondary`** — filled with `--naut-color-secondary`.
- **`destructive`** — filled with `--naut-color-destructive`.

## Examples

### Status dot

```astro
<Badge variant="surface" dotted>In review</Badge>
```

### Outline with custom color

```astro
<Badge variant="outline" outlineColor="green">Passing</Badge>
```

### Tinted text (unfilled)

```astro
<Badge variant="text" color="secondary">Optional</Badge>
```

### Gradient fill

```astro
<Badge
  gradient={{ colors: ["#f59e0b", "#ef4444"], textColor: "#fff", deg: 120 }}
>
  Pro
</Badge>
```

### Icon + label

```astro
<Badge variant="surface" iconOnly>
  <svg>...</svg>
</Badge>
```

## Accessibility

- Badges are informational; they don't need `role="status"` unless the content is dynamic and should be announced on change.
- `color` only tints text/dot — don't rely on it alone to convey meaning; keep contrast at 4.5:1 against the background.
- When a badge links somewhere, wrap it in a `Link` or `Button href="..."`; a badge itself is not focusable.