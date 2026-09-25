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
| `color`         | `Color`                                        | —           | Tokenized text/dot color; `variant` owns the fill. |
| `dark`          | `boolean`                                  | `false`     | Force dark-theme tokens for this badge subtree.   |
| `size`          | `"sm" \| "md" \| "lg"`                     | `"md"`      | Font size and padding.                            |
| `radius`        | `"sm" \| "md" \| "lg" \| "xl" \| "full"`   | `"sm"`      | Border radius. `"full"` makes a pill.             |
| `letterSpacing` | `"sm" \| "md" \| "lg"`                     | `"md"`      | Letter spacing.                                   |
| `outlineColor`  | `string`                                   | —           | Text/border color for the `outline` variant.      |
| `gradient`      | `{ colors: string[]; textColor: string; deg?: number }` | —    | Gradient background; `deg` defaults to `45`.      |
| `dotted`        | `boolean`                                  | `false`     | Shows a leading status dot.                       |
| `iconOnly`      | `boolean`                                  | `false`     | Square aspect for icon-only badges.               |
| `class`         | `string`                                   | —           | Extra class names merged onto the element.        |
| `uppercase`     | `boolean`                                  | `false`     | Forces all-caps text.                             |

## Variants

- **`default`** — bordered chip with content text.
- **`text`** — bare text, no border or background.
- **`surface`** — subtle `base-200` fill, no border.
- **`outline`** — transparent fill, strong border. Set the color with `outlineColor`.
- **`primary`** — filled with `--naut-color-primary`.
- **`secondary`** — filled with `--naut-color-secondary`.
- **`destructive`** — filled with `--naut-color-destructive`.

`color` always controls the badge's text and dotted marker. When combined with a filled `variant`, the explicit color takes precedence over the variant's default foreground.
## Examples
### Dark container

Use `dark` when the badge is placed on a custom dark surface that is not already a `Section dark` or `nav.dark`:

```astro
<Badge dark variant="outline">Available</Badge>
```

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