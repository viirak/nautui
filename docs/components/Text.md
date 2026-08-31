# Text

A paragraph (or inline span) with size, weight, variant color, decoration, transform, letter-spacing, and margin utilities.

## Usage

Import from `@nautui/core`:

```astro
---
import { Text } from "@nautui/core";
---

<Text size="lg">Lead paragraph</Text>
<Text weight="semi-bold">Semibold</Text>
<Text variant="primary">Brand-colored</Text>
<Text inline><em>inline</em> text</Text>
```

## Props

`TextProps extends Base, MarginProps` (margin utilities supported).

| Prop         | Type                                     | Default | Description                                       |
| ------------ | ---------------------------------------- | ------- | ------------------------------------------------- |
| `size`       | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "xxl"` | `"md"` | Font size + line height.                    |
| `weight`     | `"light" \| "normal" \| "medium" \| "bold" \| "semi-bold" \| "extra-bold"` | — | Font weight. |
| `variant`    | `"primary" \| "secondary" \| "tertiary" \| "destructive" \| "link" \| "highlight"` | — | Text color. |
| `align`      | `"left" \| "center" \| "right" \| "justify"` | — | Text alignment.                          |
| `decoration` | `"underline" \| "strikethrough"`         | —         | Text decoration. (Alias: `td`.)                |
| `transform`  | `"capitalize" \| "uppercase" \| "lowercase"` | —     | Text transform. (Alias: `tt`.)                 |
| `color`      | `"soft" \| "muted"`                       | —         | Softens the text color (`soft` = content-soft, `muted` = content-soft at 65% opacity). |
| `ls`         | `Size`                                    | —         | Letter-spacing shorthand (`ls-{size}`).         |
| `dimmed`     | `boolean`                                 | `false`   | `--naut-color-content-soft` color.             || `dimmed`     | `boolean`                                 | `false`   | `--naut-color-content-soft` color.             |
| `italic`     | `boolean`                                 | `false`   | `font-style: italic`.                          |
| `inline`     | `boolean`                                 | `false`   | Render `<span>` instead of `<p>`.              |
| `nowrap`     | `boolean`                                 | `false`   | `white-space: nowrap`.                         |
| `class`      | `string`                                  | —         | Extra class names merged onto the element.     |

## Notes

- `p.text` removes top/bottom margin on `:first-child`/`:last-child` inside a parent, so stacked paragraphs don't double-space.
- `span.text` renders `inline-block` so `margin`/`size` apply correctly in inline contexts.
- Inline `<code>` inside `p.text` gets a subtle `base-200` chip style automatically.
- The `decoration`/`transform` aliases (`td`, `tt`) are convenience shorthands; the long forms win if both are set.

## Accessibility

- Default `<p>` is correct for body copy; use `inline` only for spans within a sentence.
- `variant` colors must keep 4.5:1 contrast against the surrounding background.
- `dimmed` (soft content color) is for secondary text; avoid it for essential information.