# Visibility

Shows or hides content at specific breakpoints. Use it to tailor layouts for mobile vs. desktop.

## Usage

Import from `@nautui/core`:

```astro
---
import { Visibility } from "@nautui/core";
---

<Visibility on="sm">Shown everywhere except mobile</Visibility>
<Visibility on="lg" hidden={false}>Shown only at large desktop</Visibility>
```

## Props

| Prop     | Type                    | Default  | Description                                       |
| -------- | ----------------------- | -------- | ------------------------------------------------- |
| `hidden` | `boolean`               | `true`   | Controls the direction of `on` (see below).       |
| `on`     | `"sm" \| "md" \| "lg" \| "xl"` | — | Which breakpoint to apply the visibility rule to. |
| `class`  | `string`                | —        | Extra class names merged onto the element.        |

## Behavior

Two complementary modes — pick whichever is terser for your case:

- **Hide at a breakpoint** (`hidden` default): `<Visibility on="md">` hides children in the `md` range (818–1041px), visible everywhere else.
- **Show only at a breakpoint** (`hidden={false}`): `<Visibility on="lg" hidden={false}>` shows children only in the `lg` range (1042–1249px), hidden everywhere else.

Breakpoint ranges: `sm` ≤576px (hide) / ≤817px (show-only), `md` 818–1041px, `lg` 1042–1249px, `xl` ≥1250px.

## Accessibility

- Use this for **visual-only** present/absent content (e.g. a nav collapse trigger). Content that carries meaning must exist for assistive tech too — `display: none` removes it from the accessibility tree.
- If the same content appears at different breakpoints, only render the visible copy (don't duplicate both in the DOM).