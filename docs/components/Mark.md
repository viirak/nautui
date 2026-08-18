# Mark

A highlighted text span (`<mark>`) with decorative variants — underline, highlight, parallelogram, and sketch-circle.

## Usage

Import from `@nautui/core`:

```astro
---
import { Mark } from "@nautui/core";
---

<p>This is <Mark>important</Mark> text.</p>
<Mark variant="underline">Underlined</Mark>
<Mark variant="sketch-circle">Circled</Mark>
```

## Props

| Prop       | Type                                      | Default    | Description                                     |
| ---------- | ----------------------------------------- | ---------- | ----------------------------------------------- |
| `variant`  | `"default" \| "primary" \| "secondary" \| "destructive" \| "underline" \| "halflight" \| "parallelogram" \| "sketch-circle"` | `"default"` | Style. |
| `gradient` | `{ colors: string[]; deg?: number }`      | —          | Gradient text (background-clip: text).          |
| `ff`       | `string`                                  | —          | Custom font family.                             |
| `rotate`   | `"sm" \| "md" \| "lg"`                    | —          | Counter-clockwise tilt (−1.25/−1.5/−1.95deg).   |
| `class`    | `string`                                  | —          | Extra class names merged onto the element.      |

## Variants

- **`default`** — solid `--naut-color-highlight` background.
- **`primary` / `secondary` / `destructive`** — colored text, no background.
- **`underline`** — text stays `inherit` color; a `120deg` highlight band sits under it.
- **`halflight`** — a wide, low highlight band across the middle (`.4em` at `88%`).
- **`parallelogram`** — angled (slanted) highlight shape.
- **`sketch-circle`** — a hand-drawn circle outline around the text.

Add `gradient` on top of any variant to render gradient text via `background-clip: text`.

## Accessibility

- Renders semantic `<mark>` — screen readers announce it as highlighted/relevant.
- `gradient` text keeps `--naut-color-content` on `::selection` so copied/selected text stays readable.
- `rotate` is decorative; it must not break the reading flow.