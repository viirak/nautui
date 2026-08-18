# Grid & GridItem

`Grid` is a responsive CSS Grid with 1–12 columns; `GridItem` spans a number of those columns. Use them together for page and card layouts.

## Usage

Import from `@nautui/core`:

```astro
---
import { Grid, GridItem } from "@nautui/core";
---

<Grid columns={{ base: 1, md: 3 }} gap="lg">
  <GridItem span={2}>Wide cell</GridItem>
  <GridItem>Narrow cell</GridItem>
</Grid>
```

## Grid

| Prop      | Type                          | Default | Description                                |
| --------- | ----------------------------- | ------- | ------------------------------------------ |
| `columns` | `Columns` or per-breakpoint object | `12` | Column count.                            |
| `gap`     | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Gap between cells.               |
| `border`  | `Border` or string            | —       | 1px cell divider grid (see below).          |
| `radius`  | `"sm" \| "md" \| "lg" \| "xl"` | —       | Border radius (clips the border grid).     |
| `class`   | `string`                      | —       | Extra class names merged onto the element. |

`Columns = 1 | 2 | ... | 12`. Responsive object keys: `base`, `sm`, `md`, `lg`, `xl` (breakpoints: sm ≤817, md ≤1041, lg ≥1042, xl ≥1250).

### Border grid

Passing `border` turns the grid into a hairline-divider grid: cells get a 1px `--naut-color-border` gap and the grid draws the lines. Child `GridItem`s get a `base` background so dividers show through. Combined with `radius` it becomes a tidy card grid.

## GridItem

| Prop   | Type                          | Default | Description                              |
| ------ | ----------------------------- | ------- | ---------------------------------------- |
| `span` | `Columns` or per-breakpoint object | —   | Number of grid columns this cell spans. |
| `class` | `string`                      | —       | Extra class names merged onto the element. |

`span` uses the same per-breakpoint object shape as `columns` — you can widen a cell at a breakpoint without leaving the grid.

## Accessibility

- Both are layout wrappers; no ARIA needed.
- Keep cells in reading order — spans change size, never order.