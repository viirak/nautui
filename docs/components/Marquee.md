# Marquee

An infinitely scrolling ticker for logos, testimonials, or promo text. The children are repeated to fill the track.

## Usage

Import from `@nautui/core`:

```astro
---
import { Marquee } from "@nautui/core";
---

<Marquee duration={30_000}>
  <span>Item 1</span>
  <span>Item 2</span>
</Marquee>
```

## Props

| Prop            | Type                          | Default            | Description                                    |
| --------------- | ----------------------------- | ------------------ | ---------------------------------------------- |
| `duration`      | `number`                      | `40_000`           | Full track animation time (ms).                |
| `repeat`        | `number`                      | `4`                | How many times children are duplicated.        |
| `reverse`       | `boolean`                     | `false`            | Reverse scroll direction.                      |
| `orientation`   | `"horizontal" \| "vertical"`  | `"horizontal"`     | Scroll axis.                                   |
| `pauseOnHover`  | `boolean`                     | `false`            | Pause animation on hover.                      |
| `gap`           | `"sm" \| "md" \| "lg" \| "xl"` | `"md"`             | Space between repeated groups.                 |
| `fadeEdges`     | `boolean`                     | `true`             | Soft gradient fade at both ends.               |
| `fadeEdgeColor` | `string`                      | `var(--naut-color-base)` | Fade color (match the section background). |
| `fadeEdgeSize`  | `string`                      | `"5%"`             | Fade width/height.                             |
| `class`         | `string`                      | —                  | Extra class names merged onto the element.     |

Plus all spacing props (`m-*`, `p-*`). Values are clamped: `duration` ≥ 1ms, `repeat` ≥ 2.

## Behavior

- Children are duplicated `repeat` times inside a flex track; the track translates `calc(-100% / repeat)` for a seamless loop.
- **Vertical** mode stacks groups in a column and scrolls vertically.
- `prefers-reduced-motion` drops the animation to a single frame — no motion, content fully visible.

## Accessibility

- The content is real, non-animated in the DOM — every item is readable by assistive tech and stays reachable when motion is reduced.
- Keep items short and self-contained; a marquee shouldn't be the only place critical text lives.