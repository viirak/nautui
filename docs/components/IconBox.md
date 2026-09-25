# IconBox

A compact, non-interactive surface for framing SVG icons with consistent size, color, shape, and visual treatment.

## Usage

Import from `@nautui/core`:

```astro
---
import { IconBox } from "@nautui/core";
import { Settings } from "@lucide/astro";
---

<IconBox variant="primary" size="lg" label="Settings">
  <Settings />
</IconBox>

<IconBox variant="outline" color="muted" size="sm">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3v18M3 12h18" />
  </svg>
</IconBox>
```

`IconBox` accepts any SVG through its default slot; it does not depend on an icon package.

## Props

| Prop      | Type                                                                                                  | Default    | Description                                      |
| --------- | ----------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------ |
| `size`    | `"sm" \| "md" \| "lg" \| "xl"`                                                                        | `"md"`     | Square icon-box size.                            |
| `radius`  | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"`                                                   | `"md"`     | Border radius.                                   |
| `variant` | `"default" \| "surface" \| "outline" \| "solid" \| "primary" \| "secondary" \| "destructive" \| "success" \| "warning" \| "info"` | `"default"` | Surface treatment. |
| `color`   | `"primary" \| "secondary" \| "destructive" \| "success" \| "warning" \| "info" \| "content" \| "muted"` | `"content"` | Icon color for non-semantic variants.           |
| `label`   | `string`                                                                                               | —          | Accessible name for a meaningful icon.           |
| `class`   | `string`                                                                                               | —          | Extra class names merged onto the wrapper.       |

Any other attributes, including `id`, `aria-*`, and `data-*`, pass through to the wrapper.

## Variants

- **`default`** — transparent background with no border.
- **`surface`** — subtle neutral background.
- **`outline`** — transparent background with a border.
- **`solid`** — uses `color` as the background and its matching content color for the icon.
- **Semantic variants** — `primary`, `secondary`, `destructive`, `success`, `warning`, and `info` provide filled semantic treatments.

## Accessibility

- `IconBox` is decorative by default and is hidden from assistive technology.
- Provide `label` when the icon conveys information; it becomes the wrapper's accessible name.
- `IconBox` is not interactive. Wrap it in `Button` or `Link` when it represents an action or navigation.
