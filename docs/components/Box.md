# Box

A generic, highly-configurable container with border, corner decorations, spacing, text-align, and max-width options. The workhorse wrapper for custom layouts.

## Usage

Import from `@nautui/core`:

```astro
---
import { Box } from "@nautui/core";
---

<Box border="sm" radius="lg" p="lg" width={{ max: "sm" }} align={{ text: "center" }}>
  Content
</Box>
```

## Props

`BoxProps extends Base` plus the spacing props (`p-*`, `m-*`, `gap-*` — see [spacing](/docs/README.md)).

| Prop       | Type                                     | Default  | Description                                      |
| ---------- | ---------------------------------------- | -------- | ------------------------------------------------ |
| `border`   | `Border \| string`                       | —        | Border spec (see [createBorder](/docs/README.md)). A string sets `width`. |
| `radius`   | `"sm" \| "md" \| "lg" \| "xl"`           | —        | Border radius (uses `radius-*` utility class).  |
| `centered` | `boolean`                                | `false`  | Flex-center content; fills parent height.       |
| `align`     | `IAlign`                                     | —        | Text alignment, optionally per breakpoint.       |
| `width`    | `IWidth`                                    | —        | Min/max width constraint (`min-w-*` / `max-w-*`). |
| `corner`   | `Corner`                                 | —        | Decorative corner marks.                         |
| `class`    | `string`                                 | —        | Extra class names merged onto the element.       |

### Border

Accepts a full spec: `{ width, style, color, top, right, bottom, left, borderStyle, borderRadius }`. A plain string like `border="sm"` sets width only.

### IAlign

```ts
type Direction = "left" | "center" | "right";
interface IAlign {
  text?: Direction | { [key in Responsive]?: Direction };
}
```

Accepts a flat `Direction` or a responsive object. Breakpoint keys map to the standard breakpoints (sm ≤817, md ≤1041, lg ≤1249, xl ≥1250).

### IWidth

```ts
interface IWidth {
  min?: Size;
  max?: Size;
}
```

Constrains the box width. `max` also centers the box via `margin-inline: auto`.

### Corner

```ts
type CornerStyle = "diamond" | "square" | "circle" | "plus" | "x";
interface Corner {
  topLeft?: CornerStyle;
  topRight?: CornerStyle;
  bottomLeft?: CornerStyle;
  bottomRight?: CornerStyle;
}
```

Draws a small decorative mark hanging off a corner of the box (used for creative/card flair).

## Slots

| Slot         | Renders                       |
| ------------ | ----------------------------- |
| *(default)*  | Main content (padded wrapper). |
| `before`     | Before the content wrapper.    |
| `after`      | After the content wrapper.     |
| `background` | A layer behind everything (e.g. a `Background`). |

## Spacing defaults

If no padding props are given, the default content padding is `md`. Margins and `gap` follow the shared spacing scale (`0, xs, sm, md, lg, xl, xxl`).

## Accessibility

- Decorative `corner` marks are non-interactive `span`s — ignored by screen readers by design.
- Content in a `centered` box is still read in DOM order; don't rely on centering for meaning.