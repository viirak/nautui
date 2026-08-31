# Masonry & MasonryItem

`Masonry` is a CSS multi-column (Pinterest-style) layout; `MasonryItem` is a cell that avoids breaking across columns.

## Usage

Import from `@nautui/core`:

```astro
---
import { Masonry, MasonryItem } from "@nautui/core";
---

<Masonry columns={3} gap="md">
  <MasonryItem>Tall content</MasonryItem>
  <MasonryItem>Short content</MasonryItem>
</Masonry>
```

## Masonry

| Prop      | Type                        | Default | Description                                   |
| --------- | --------------------------- | ------- | --------------------------------------------- |
| `columns` | `number`                    | `4`     | Column count on desktop (≥1042px).            |
| `gap`     | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Column + row gap.                  |
| `class`   | `string`                    | —       | Extra class names merged onto the element.    |

Plus all spacing props (`m-*`, `p-*`).

Responsive column counts are **fixed**: 1 column < 576px, 2 columns 576–1041px, `columns` from 1042px up.

## MasonryItem

| Prop   | Type     | Default | Description                                   |
| ------ | -------- | ------- | --------------------------------------------- |
| `class` | `string` | —       | Extra class names merged onto the element.    |

Sets `break-inside: avoid` so a cell never splits across columns.

## Notes

- Column order is top-to-bottom (CSS columns), not row-by-row. If you need row-major order, use `Grid`/`Bento` instead.
- Mixed `MasonryItem`s and bare `div`s both work; items only need the class if they must not break.

## Accessibility

- Multi-column ordering can scramble reading order for screen readers. If cell content has an inherent sequence (e.g. a numbered list), use `Grid` instead.