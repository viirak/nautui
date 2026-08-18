# List & ListItem

`List` renders an ordered/unordered list with marker and gap options; `ListItem` is a list item. Use them together or mix with bare `<li>` children.

## Usage

Import from `@nautui/core`:

```astro
---
import { List, ListItem } from "@nautui/core";
---

<List>
  <ListItem>First</ListItem>
  <ListItem>Second</ListItem>
</List>

<List ordered gap="sm" marker="none">
  <li>Plain child works too</li>
</List>
```

## List

| Prop      | Type                    | Default  | Description                                   |
| --------- | ----------------------- | -------- | --------------------------------------------- |
| `ordered` | `boolean`               | `false`  | Render `<ol>` instead of `<ul>`.              |
| `horizontal` | `boolean`            | `false`  | Items laid out in a row (flex).               |
| `marker`  | `"none"` (or pass a color string) | — | `"none"` removes list markers; any other string sets the marker color. |
| `gap`     | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"` | Gap between items. |
| `class`   | `string`                 | —        | Extra class names merged onto the element.    |

Marker color: pass a color, e.g. `marker="primary"` or any CSS color string — applied to the `::marker`.

## ListItem

| Prop   | Type     | Default | Description                              |
| ------ | -------- | ------- | ---------------------------------------- |
| `class` | `string` | —       | Extra class names merged onto the `<li>`. |

Accepts raw children (text or nested elements); a bare `<li>` also works inside a `List`.

## Accessibility

- `ordered`/default map to semantic `<ol>`/`<ul>` — screen readers announce count and position correctly.
- Use `marker="none"` only when items are self-explanatory (e.g. a tag cloud); otherwise markers help enumerate content.