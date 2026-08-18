# Title

A heading (`h1`–`h6`) with fluid `clamp()`-based type sizes, alignment, optional gradient text, and margin utilities.

## Usage

Import from `@nautui/core`:

```astro
---
import { Title } from "@nautui/core";
---

<Title level={1}>Page heading</Title>
<Title size="display-xl">Big display title</Title>
<Title align="center">Centered</Title>
<Title gradient={{ colors: ["#3b82f6", "#a855f7"] }}>Gradient title</Title>
```

## Props

`TitleProps extends Base, MarginProps` (margin utilities `m-*`/`mt-*`/`mx-*` supported).

| Prop       | Type                                          | Default     | Description                                     |
| ---------- | --------------------------------------------- | ----------- | ----------------------------------------------- |
| `level`    | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                  | `2`         | Heading element.                                |
| `size`     | `"default" \| "display" \| "display-lg" \| "display-xl" \| "display-xxl"` | `"default"` | Type scale override. |
| `align`    | `"left" \| "center" \| "right" \| "justify"`  | —           | Text alignment.                                 |
| `gradient` | `{ colors: string[]; deg?: number }`          | —           | Gradient text via `background-clip: text`.      |
| `class`    | `string`                                      | —           | Extra class names merged onto the heading.      |

## Type scale

Headings use fluid `clamp()` sizes tied to viewport width:

- `level` picks a heading on the document scale (`l-1` biggest → `l-6`).
- `size` overrides with the display scale (`display` → `display-xxl`, growing).
- Default (no `size`) matches the heading level's own size.

## Gradient text

```astro
<Title gradient={{ colors: ["#f59e0b", "#ef4444"], deg: 90 }}>
  Sale
</Title>
```

The text is transparent with a `background-clip: text` gradient. `::selection` restores solid content color so selected text stays readable.

## Accessibility

- Renders the real heading element for its `level` — don't skip levels (jump `h2`→`h4`) and use exactly one `h1` per page.
- `gradient` is decorative; the text content itself is always in the DOM and announced normally.