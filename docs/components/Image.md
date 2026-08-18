# Image

A responsive image wrapper with aspect-ratio, cover, fluid, and shadow options. Wraps a native `<img>`.

## Usage

Import from `@nautui/core`:

```astro
---
import { Image } from "@nautui/core";
---

<Image src="/img/hero.webp" alt="Product screenshot" ratio="16:9" radius="lg" />
```

## Props

| Prop         | Type                                     | Default  | Description                                      |
| ------------ | ---------------------------------------- | -------- | ------------------------------------------------ |
| `src`        | `string`                                 | *(required)* | Image source URL.                             |
| `alt`        | `string`                                 | *(required)* | Accessible description.                       |
| `ratio`      | `"1:1" \| "16:9" \| "4:3" \| "3:2" \| "2:1" \| "9:16" \| "3:4" \| "2:3" \| "1:2"` | — | Aspect ratio; images `object-fit: cover` within it. |
| `radius`     | `"sm" \| "md" \| "lg" \| "xl"`           | —        | Border radius (scaled ×1.575 for `Image`).      |
| `shadow`     | `"sm" \| "md" \| "lg" \| "xl"`           | —        | Box shadow (not applied in `cover` mode).       |
| `cover`      | `boolean`                                | `false`  | Fill parent; `object-fit: cover`.               |
| `fluid`      | `boolean`                                | `false`  | Width `100%`, height auto.                      |
| `responsive` | `boolean`                                | `false`  | `fluid` behavior below `1041px` (tablet/mobile), natural size above. |
| `maxWidth`   | `string`                                 | —        | Max width (ignored with `cover`).               |
| `maxHeight`  | `string`                                 | —        | Max height (ignored with `cover`).              |
| `class`      | `string`                                 | —        | Extra class names merged onto the wrapper.      |

Any other attributes (e.g. `loading`, `width`, `height`, `srcset`) pass through to the `<img>`.

## Modes

- **`ratio`** — locks the wrapper's aspect ratio; the `<img>` covers it. Use for consistent grids.
- **`cover`** — fills the parent entirely (`object-fit: cover`); combine with a sized parent.
- **`fluid`** — full-width, height auto (the `<img>` is `width: 100%`).
- **`responsive`** — natural size on desktop, full-width below `1041px`.
- **`maxWidth` / `maxHeight`** — constrain the box (dropped in `cover` mode).

## Accessibility

- `alt` is required. Use empty string for decorative images (alt text like `"logo"` is discouraged — screen readers announce it).
- For images that are charts/meaningful, describe the data in `alt` or provide a visible caption nearby.