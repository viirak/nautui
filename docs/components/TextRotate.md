# TextRotate

Cycles through slotted text items with a CSS-only, infinite vertical rotation. Useful for hero headlines, taglines, and other marketing copy where one phrase should change over time.

## Basic usage

Pass each rotating item as a direct child element:

```astro
---
import { TextRotate } from "@nautui/core";
---

<TextRotate label="Available now">
  <span>Fast</span>
  <span>Accessible</span>
  <span>Beautiful</span>
</TextRotate>
```

The component supports two to six items. Keep every item short so the rotation does not cause layout shift.

Each item must be a **direct child element** — bare text runs are not rotated. Items may set their own `font-size` and `line-height`; the component sizes itself to the tallest item instead of a fixed line box.

## Sizing

```astro
<TextRotate label="Available now">
  <Text inline size="lg">Fast</Text>
  <Text inline size="lg">Accessible</Text>
  <Text inline size="lg">Beautiful</Text>
</TextRotate>
```

## API

| Prop           | Type                                | Default     | Description                                      |
| -------------- | ----------------------------------- | ----------- | ------------------------------------------------ |
| `align`        | `"start" \| "center" \| "end"`      | `"start"`   | Horizontal alignment of each item.                |
| `duration`     | `number`                            | `10_000`    | Duration of one full rotation in milliseconds.     |
| `label`        | `string`                            | —           | Accessible label; marks the rotating copy decorative. |
| `pauseOnHover` | `boolean`                           | `true`      | Pause the animation while hovered.                 |
| `reverse`      | `boolean`                           | `false`     | Rotate in the opposite direction.                  |
| `static`       | `boolean`                           | `false`     | Show only the first item with no animation.        |

## Accessibility

- Provide `label` (or `aria-label`) when the rotation is decorative so assistive technology receives a stable label instead of every item.
- `aria-live="off"` is set by default so the rotation is never announced as a live update; pass your own `aria-live` to override it.
- `role="img"` is set only in the labeled branch; pass your own `role` to override it.
- `prefers-reduced-motion: reduce` disables the animation and shows the first item.
- Use `static` when the rotation is not essential to the meaning of the sentence.

## Notes

- Rendering is CSS-only; no client JavaScript is required.
- Items are stacked in a single grid cell and cross-fade with a slight vertical rise; the box grows to the tallest item, so it works inline with a heading or paragraph.
