# Visibility

Shows or hides content at specific breakpoints. Use it to tailor layouts for mobile vs. desktop.

## Usage

Import from `@nautui/core`:

```astro
---
import { Visibility } from "@nautui/core";
---

<Visibility on="sm" mode="hide">Shown everywhere except mobile</Visibility>
<Visibility on="lg" mode="show">Shown only at large desktop</Visibility>
```

## Props

| Prop     | Type                    | Default  | Description                                       |
| -------- | ----------------------- | -------- | ------------------------------------------------- |
| `on`     | `"sm" \| "md" \| "lg" \| "xl"` | — (required) | Which breakpoint to apply the visibility rule to. |
| `mode`   | `"show" \| "hide"`      | `"hide"` | `hide`: children are hidden inside the `on` range. `show`: children are shown ONLY inside the `on` range. |
| `hidden` | `boolean`               | —        | @deprecated Legacy toggle; `hidden={false}` ≙ `mode="show"`. Conflicts with `mode` throw at build time. |
| `class`  | `string`                | —        | Extra class names merged onto the element.        |

## Behavior

Two complementary modes via `mode`:

- **Hide at a breakpoint** (`mode="hide"`, default): `<Visibility on="md">` hides children in the `md` range (818–1041px), visible everywhere else.
- **Show only at a breakpoint** (`mode="show"`): `<Visibility on="lg" mode="show">` shows children only in the `lg` range (1042–1249px), hidden everywhere else.

Breakpoint ranges (same for hide and show-only): `sm` ≤576px, `md` 818–1041px, `lg` 1042–1249px, `xl` ≥1250px. Show-only hides everywhere outside that range.

> The legacy `hidden={false}` spelling still works (≙ `mode="show"`) but is deprecated; mixing both props throws at build time.

## Accessibility

- Use this for **visual-only** present/absent content (e.g. a nav collapse trigger). Content that carries meaning must exist for assistive tech too — `display: none` removes it from the accessibility tree.
- If the same content appears at different breakpoints, only render the visible copy (don't duplicate both in the DOM).