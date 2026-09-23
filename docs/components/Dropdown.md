# Dropdown

A dropdown menu built on a `<details>`/`<summary>` pattern. Supports positioning (side/align), offset, hover mode, and optional button trigger. Renders a `<details>` element.

## Usage

Import from `@nautui/core`:

```astro
---
import { Dropdown, Button } from "@nautui/core";
---

<Dropdown side="right" align="end">
  <button>Open</button>
  <Dropdown.Slot name="trigger">
    <a href="#">Link</a>
  </Dropdown.Slot>
  <ul>
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
  </ul>
</Dropdown>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `align` | `"start"` \| `"center"` \| `"end"` | `"start"` | Horizontal alignment of the content |
| `button` | `ButtonProps` | — | Button prop to use as trigger (spreads to `<button>`) |
| `hover` | `boolean` | `false` | Enable hover-reveal (keeps dropdown open on pointer leave) |
| `offset` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` | — | Spacing offset from the trigger |
| `side` | `"top"` \| `"bottom"` \| `"left"` \| `"right"` | `"bottom"` | Direction the dropdown opens |
| `zi` | `number` | `100` | Z-index of the dropdown |

Any other attributes (e.g. `id`, `aria-*`, `data-*`) pass through to the `<details>` element.

## Slots

| Slot | Description |
| ---- | ----------- |
| `default` | Dropdown content. Drop one block per item (e.g. `<li>`, `<a>`, `<button>`). |
| `trigger` | Trigger content. Defaults to a `<button>` when `button` prop is not provided. |

## Layout & Positions

- The dropdown opens relative to the trigger based on `side` and `align` values.
- `side` controls the vertical/horizontal direction (`"top"`, `"bottom"`, `"left"`, `"right"`).
- `align` controls horizontal alignment within the available space (`"start"`, `"center"`, `"end"`).
- `offset` adds spacing (var `--naut-spacing-{offset}`) between trigger and content.
- On `hover` mode, the dropdown remains open while the pointer is over the dropdown or trigger.
- Pass `dark` (via theme) to force the dark neutral scale.

## Accessibility

- Uses native `<details>`/`<summary>` for keyboard support (ArrowDown/ArrowUp/Escape navigation).
- `hoverable` mode is available — ensure alternative keyboard access is provided.
- The component automatically closes when clicking outside.