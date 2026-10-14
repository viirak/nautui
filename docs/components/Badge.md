# Badge

A small label chip for statuses, categories, and counts. Badges are non-interactive; pair with `Link` or a button for actions.

## Usage

Import from `@nautui/core`:

```astro
---
import { Badge } from "@nautui/core";
---

<Badge>New</Badge>
<Badge outline>Beta</Badge>
<Badge variant="primary">Pro</Badge>
<Badge variant="surface" dotted>Shipped</Badge>
```

## Props

| Prop            | Type                                       | Default     | Description                                       |
| --------------- | ------------------------------------------ | ----------- | ------------------------------------------------- |
| `variant`       | `"text" \| "surface" \| "primary" \| "secondary" \| "destructive"` | `"text"` | Fill/text treatment. See [variants](#variants). `border` and `outline` are deprecated aliases for `outline`. |
| `color`         | `Color`                                        | —           | Tokenized text/dot color; `variant` owns the fill. |
| `dark`          | `boolean`                                  | `false`     | Force dark-theme tokens for this badge subtree.   |
| `size`          | `"sm" \| "md" \| "lg"`                     | `"md"`      | Font size and padding.                            |
| `radius`        | `"sm" \| "md" \| "lg" \| "xl" \| "full"`   | `"sm"`      | Border radius. `"full"` makes a pill.             |
| `letterSpacing` | `"sm" \| "md" \| "lg"`                     | `"md"`      | Letter spacing.                                   |
| `outlineColor`  | `"soft" \| "normal" \| "strong"`            | `"normal"`  | Border weight for `outline`. The **hue** comes from `color`, not from here. |
| `outline`       | `boolean`                                  | `false`     | Adds a border, independent of the fill `variant`.  |
| `gradient`      | `{ colors: string[]; textColor: string; deg?: number }` | —    | Gradient background; `deg` defaults to `45`.      |
| `dotted`        | `boolean`                                  | `false`     | Shows a leading status dot.                       |
| `iconOnly`      | `boolean`                                  | `false`     | Square aspect for icon-only badges.               |
| `padding`       | `"0" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "xxl"` | from `size` | One spacing step, resolved against the **fluid spacing scale** — not the `size` scale, so `padding="lg"` is far more than `size="lg"`. Block padding is derived from it (always smaller than inline). Not an axis object. Ignored for a bare `text` badge (no `outline`) and for `iconOnly`, which takes symmetric padding from its own `size`. |
| `margin`        | —                                          | —           | Not supported; throws. Wrap in a `Box`.           |
| `class`         | `string`                                   | —           | Extra class names merged onto the element.        |
| `uppercase`     | `boolean`                                  | `false`     | Forces all-caps text.                             |

## Variants

`variant` owns the **fill/text** treatment; `outline` is a separate boolean that adds a border. The two compose, so a filled badge can be outlined too.

- **`text`** (default) — bare text, no border or background. No padding.
- **`surface`** — subtle `base-200` fill, no border.
- **`primary`** — filled with `--naut-color-primary`.
- **`secondary`** — filled with `--naut-color-secondary`.
- **`destructive`** — filled with `--naut-color-destructive`.

`outline` adds a 1px border whose weight comes from `outlineColor`:

| Weight | Token |
| --- | --- |
| `soft` | `--naut-color-border-soft` |
| `normal` (default) | `--naut-color-border` |
| `strong` | `--naut-color-border-strong` |

The border **hue** comes from `color`, not from `outlineColor` — use `color="success"` for a green outline. When `color` is set it wins for the border and `outlineColor` no longer applies; `outlineColor` chooses the neutral weight only when `color` is absent. (Earlier versions took a raw colour string in `outlineColor` and applied it to the *text* while leaving the border grey; both are fixed.)

**Deprecated:** `variant="border"` → `outline` (normal weight), `variant="outline"` → `outline outlineColor="strong"`. Both still work.

`color` always controls the badge's text and dotted marker. When combined with a filled `variant`, the explicit color takes precedence over the variant's default foreground.
## Examples
### Dark container

Use `dark` when the badge is placed on a custom dark surface that is not already a `Section dark` or `nav.dark`:

```astro
<Badge dark outline>Available</Badge>
```

### Status dot

```astro
<Badge variant="surface" dotted>In review</Badge>
```

### Outline with custom color

```astro
<Badge outline outlineColor="strong" color="success">Passing</Badge>
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