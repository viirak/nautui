# Stack

A vertical flex container with responsive `align-items` and `justify-content` and a shared gap.

## Usage

Import from `@nautui/core`:

```astro
---
import { Stack } from "@nautui/core";
---

<Stack gap="lg" align="center">
  <h2>Stacked content</h2>
  <p>Centered and evenly spaced.</p>
</Stack>
```

## Props

| Prop      | Type                                      | Default   | Description                                       |
| --------- | ----------------------------------------- | --------- | ------------------------------------------------- |
| `gap`     | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`    | `"md"`    | Gap between children.                            |
| `align`   | `Align` or responsive object              | —         | `align-items` (cross axis).                      |
| `justify` | `Justify` or responsive object            | `"start"` | `justify-content` (main axis).                   |
| `class`   | `string`                                  | —         | Extra class names merged onto the element.       |

### Align / Justify

```ts
type Align = "inherit" | "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end"
  | "space-between" | "space-around" | "space-evenly";
```

Both accept a plain string **or** a per-breakpoint object `{ base, sm, md, lg, xl }` (breakpoints: sm ≤817, md 818–1041, lg ≥1042, xl ≥1250).

## Responsive alignment

```astro
<Stack align={{ base: "start", md: "center" }} justify={{ base: "start", md: "space-between" }}>
  ...
</Stack>
```

## Notes

- Use `Stack` when content is a vertical column and you need alignment/gap control. For an in-line row, prefer `Flex` (horizontal) or `Group`.
- `align="stretch"` makes children fill the cross axis (their default anyway in flex column).

## Accessibility

- Layout-only wrapper; no ARIA needed. Children keep their natural document order regardless of alignment.