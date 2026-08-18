# Flex

A flexbox layout helper with align, justify, direction (including responsive), wrap, and gap controls.

## Usage

Import from `@nautui/core`:

```astro
---
import { Flex } from "@nautui/core";
---

<Flex justify="between" align="center" gap="md">
  <span>Left</span>
  <span>Right</span>
</Flex>
```

## Props

| Prop        | Type                                                          | Default   | Description                                       |
| ----------- | ------------------------------------------------------------- | --------- | ------------------------------------------------- |
| `align`     | `"start" \| "center" \| "end" \| "baseline" \| "stretch"`    | `"start"` | `align-items`.                                    |
| `justify`   | `"start" \| "center" \| "end" \| "between" \| "around" \| "evenly"` | `"start"` | `justify-content`.                           |
| `direction` | `"row" \| "column"` or responsive object (below)              | `"row"`   | `flex-direction`.                                |
| `wrap`      | `"nowrap" \| "wrap" \| "wrap-reverse"`                        | —         | `flex-wrap`.                                      |
| `gap`       | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                        | —         | Gap between children (`gap-*` utility).          |
| `class`     | `string`                                                      | —         | Extra class names merged onto the element.       |

Any other attributes pass through to the `<div>`.

## Responsive direction

`direction` accepts either a plain string or a per-breakpoint object:

```astro
<Flex direction={{ base: "column", md: "row" }}>
  <span>Stacked on mobile, side-by-side on tablet+</span>
</Flex>
```

Keys: `base`, `sm`, `md`, `lg`, `xl`. Breakpoints match the standard scale (sm ≤817, md ≤1041, lg ≥1042, xl ≥1250).

## Accessibility

- It's a neutral layout wrapper; no ARIA needed.
- DOM order = reading order; visual position (row vs column, justify) must not reorder meaning.