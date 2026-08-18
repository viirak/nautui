# Group

An inline-flex row of related items (buttons, links, chips) with optional grow, wrap, justify, and responsive stacking.

## Usage

Import from `@nautui/core`:

```astro
---
import { Group, Button } from "@nautui/core";
---

<Group gap="sm">
  <Button>Save</Button>
  <Button variant="ghost">Cancel</Button>
</Group>
```

## Props

| Prop      | Type                                | Default   | Description                                      |
| --------- | ----------------------------------- | --------- | ------------------------------------------------ |
| `gap`     | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"`  | Gap between items.                              |
| `grow`    | `boolean`                           | `false`   | `flex-grow: 1` — items expand to fill the row.  |
| `wrap`    | `boolean`                           | `false`   | `flex-wrap: wrap`.                              |
| `justify` | `"start" \| "center" \| "end" \| "space-between" \| "space-around" \| "space-evenly"` | `"start"` | `justify-content`. |
| `not`     | `ScreenSize` or `ScreenSize[]`      | —         | Stack vertically at these breakpoints.          |
| `class`   | `string`                            | —         | Extra class names merged onto the element.      |

`ScreenSize = "sm" | "md" | "lg" | "xl"`.

## Responsive stacking

`not` flips the group to a vertical column at the given breakpoint — e.g. `not="sm"` stacks on mobile, stays in a row on tablet+.

```astro
<Group not={["sm", "md"]}>...</Group>
```

Breakpoints: `sm` ≤817, `md` 818–1041, `lg` 1042–1249, `xl` ≥1250.

## Note

Unlike `Flex`, `Group`'s `justify` uses `space-between`/`space-around`/`space-evenly` naming (with the `space-` prefix).

## Accessibility

- It's a layout wrapper; semantics come from its children.
- Stacking changes visual direction only — keep children in the same logical order as their reading order.