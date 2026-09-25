# Group

An inline-flex row of related items with responsive direction, alignment, justification, optional grow, and wrap.

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
| `gap`     | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | — | Gap between items.                              |
| `grow`    | `boolean`                           | `false`   | `flex-grow: 1` — items expand to fill the row.  |
| `wrap`    | `boolean`                           | `false`   | `flex-wrap: wrap`.                              |
| `direction` | `Direction` or responsive object | `"row"` | `flex-direction`. |
| `align`   | `Align` or responsive object | `"center"` | `align-items`. |
| `justify` | `Justify` or responsive object | `"start"` | `justify-content`. |
| `not`     | `ScreenSize` or `ScreenSize[]`      | —         | Stack vertically at these breakpoints.          |
| `class`   | `string`                            | —         | Extra class names merged onto the element.      |

`ScreenSize = "sm" | "md" | "lg" | "xl"`.

## Responsive layout props

`direction`, `align`, and `justify` accept a plain value or a per-breakpoint object with `base`, `sm`, `md`, `lg`, and `xl` keys.

```astro
<Group
  direction={{ base: "row", sm: "column" }}
  align={{ base: "center", md: "start" }}
  justify={{ base: "start", md: "between" }}
>
  ...
</Group>
```

`not` remains supported as a legacy shorthand for responsive column stacking. If both `direction` and `not` are provided, `direction` takes precedence.

## Note

Canonical values match `Flex`: `row`/`column`, `start`/`center`/`end`/`between`/`around`/`evenly`, and `start`/`center`/`end`/`baseline`/`stretch`/`inherit`. The legacy `space-*` justification values remain supported.

## Accessibility

- It's a layout wrapper; semantics come from its children.
- Stacking changes visual direction only — keep children in the same logical order as their reading order.
