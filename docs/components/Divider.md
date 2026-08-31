# Divider

A horizontal (or vertical) rule for separating content.

## Usage

Import from `@nautui/core`:

```astro
---
import { Divider } from "@nautui/core";
---

<p>Above</p>
<Divider />
<p>Below</p>

<Divider orientation="vertical" height="100%" />
```

## Props

| Prop          | Type                              | Default    | Description                                   |
| ------------- | --------------------------------- | ---------- | --------------------------------------------- |
| `orientation` | `"horizontal" \| "vertical"`      | `"horizontal"` | Line direction.                            |
| `size`        | `"sm" \| "md" \| "lg" \| "xl"`    | `"md"`     | Line thickness (`--naut-border-width-*`).     |
| `variant`     | `"solid" \| "dashed" \| "dotted"` | `"solid"`  | Line style.                                   |
| `borderVar`   | `string`                          | —          | Raw CSS border value override (e.g. `"1px solid red"`). |
| `height`      | `string`                          | —          | Height for `orientation="vertical"` (any CSS length). |
| `class`       | `string`                          | —          | Extra class names merged onto the element.    |

## Examples

### Dashed

```astro
<Divider size="sm" variant="dashed" />
```

### Vertical in a flex row

```astro
<div style="display:flex; align-items:stretch; gap:1rem">
  <span>One</span>
  <Divider orientation="vertical" height="100%" />
  <span>Two</span>
</div>
```

## Accessibility

- Use `Divider` for visual separation only. Real semantic separation (between distinct sections) belongs in markup structure, not a decorative line.