# BackToTop

A floating button that appears after the page is scrolled past a threshold and smooth-scrolls back to the top. Fixed to the viewport, clickable with keyboard, respects `prefers-reduced-motion`.

## Usage

```astro
---
import { BackToTop } from "@nautui/core";
---

<BackToTop />
```

## Props

| Prop         | Type                                     | Default             | Description                                        |
| ------------ | ---------------------------------------- | ------------------- | -------------------------------------------------- |
| `threshold`  | `number`                                 | `400`               | Pixels scrolled before the button appears.          |
| `position`   | `"bottom-right" \| "bottom-left"`        | `"bottom-right"`    | Which viewport corner it anchors to.                |
| `offset`     | `string`                                 | `"1.5rem"`          | Gap from the corner edges.                          |
| `label`      | `string`                                 | `"Back to top"`     | Accessible name (`aria-label` + `title`).           |
| `showLabel`  | `boolean`                                | `false`             | Renders the label text next to the icon.            |
| `class`      | `string`                                 | —                   | Extra class names merged onto the element.          |

Any other attributes pass through to the `<button>`.

## Behavior

- Appears with a fade/slide transition once `scrollY > threshold`; hides again when scrolled back above it.
- Click smooth-scrolls to the top, falling back to instant jump when `prefers-reduced-motion: reduce` is active.
- Purely decorative icon is `aria-hidden`; the accessible name comes from `label`.
- One scroll listener serves all instances on the page.