# Bento & BentoItem

`Bento` is a fixed-row/column grid with a locked aspect ratio; `BentoItem` is a cell that spans a number of rows/columns. Use it for feature-grid, pricing, and showcase layouts.

## Usage

Import from `@nautui/core`:

```astro
---
import { Bento, BentoItem } from "@nautui/core";
---

<Bento columns={3} rows={3} gap="0.5rem">
  <BentoItem row={2} col={1}>Feature A</BentoItem>
  <BentoItem col={1}>Feature B</BentoItem>
  <BentoItem row={2} col={1}>Feature C</BentoItem>
  <BentoItem col={2}>Feature D</BentoItem>
</Bento>
```

## Bento

| Prop      | Type     | Default | Description                                   |
| --------- | -------- | ------- | --------------------------------------------- |
| `columns` | `number` | `4`     | Grid columns.                                 |
| `rows`    | `number` | `4`     | Grid rows.                                    |
| `gap`     | `string` | `"1rem"` | Gap between cells (any CSS length).          |
| `class`   | `string` | —       | Extra class names merged onto the element.    |

The grid is a fixed `columns × rows` rectangle with `aspect-ratio: columns / rows`. In portrait orientation (`aspect-ratio < 1`) the grid flips columns and rows so cells keep their proportions.

## BentoItem

| Prop   | Type     | Default | Description                              |
| ------ | -------- | ------- | ---------------------------------------- |
| `row`  | `number` | `1`     | Number of grid rows this cell spans.     |
| `col`  | `number` | `1`     | Number of grid columns this cell spans.  |
| `class`| `string` | —       | Extra class names merged onto the element. |

`row`/`col` are **span counts**, not positions — cells are placed by the auto-placement algorithm in source order.

Each cell gets `position: relative; overflow: hidden` and a `base-100` fill, ready for a child `Background` or image.

## Accessibility

- It's a visual layout — markup inside cells should stay in a meaningful order for screen readers.
- Don't make `BentoItem` itself focusable; wrap interactive content in a real `<a>` or button.