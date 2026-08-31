# Drawer

A slide-in overlay panel with a built-in toggle button. Use it for mobile navigation, filters, or detail views.

## Usage

Import from `@nautui/core`:

```astro
---
import { Drawer } from "@nautui/core";
---

<Drawer position="right" size="320px">
  <h3>Filters</h3>
  <p>Drawer content.</p>
</Drawer>
```

The component renders a hamburger toggle button plus the drawer panel. Clicking the toggle or the close button opens/closes it.

## Props

| Prop       | Type                                | Default     | Description                                   |
| ---------- | ----------------------------------- | ----------- | --------------------------------------------- |
| `position` | `"center" \| "top" \| "right" \| "bottom" \| "left"` | `"center"` | Panel slide direction. |
| `size`     | `string`                            | `"350px"`   | Panel width (left/right) or height (top/bottom), any CSS length. |
| `zi`       | `number`                            | `999`       | `z-index` of the drawer overlay.             |
| `button`   | `ToggleButtonProps`                 | —           | Props forwarded to the built-in toggle button (ButtonProps minus `onclick`). |
| `class`    | `string`                            | —           | Extra class names merged onto the wrapper.   |

## Behavior

- Toggle and close buttons are ghost `Button`s with menu/× icons.
- Opening the drawer appends it to `<body>` and locks page scroll; closing restores it.
- `center` positions the panel as a centered modal with a `md` margin and `lg` radius.
- The panel is `overflow-y: auto`; long content scrolls inside the drawer.

## Notes & limits

- The toggle button always renders — there's no headless mode for custom triggers. To use a custom trigger, place the `Drawer` next to your own button and drive it with a matching id pattern, or trigger the drawer's `id` element directly.
- Consumer `button` props override the defaults, but `onclick` is excluded by the type (the toggle handler is not replaceable), and `square` is always applied.

## Accessibility

- The toggle button carries a `<title>Menu</title>` icon title — add `aria-label` via `button={{ "aria-label": "Open menu" }}` for a proper accessible name.
- Backdrop click doesn't close the drawer (no outside-dismiss). Users can close via the × button; keep it reachable by keyboard (it is — it's a native `<button>`).
- Opening locks body scroll; this improves focusability of the drawer but focus isn't trapped. For a modal drawer, move focus into the panel after opening.