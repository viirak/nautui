# Space

A spacer that adds vertical or horizontal whitespace using the spacing scale. Renders a `<div>` sized via CSS classes.

## Usage

Import from `@nautui/core`:

```astro
---
import { Space } from "@nautui/core";
---

<Space size="lg" />
<Space size="display-lg" />
<Space orientation="horizontal" size="md" />
```

## Props

| Prop          | Type                       | Default    | Description                                   |
| ------------- | -------------------------- | ---------- | --------------------------------------------- |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Which axis to size.                        |
| `size`        | `SpaceSize`                  | `"md"`    | Spacing amount.                            |
| `grow`        | `boolean`                  | `false`    | `flex-grow: 1` — fills remaining space in a flex container. |
| `class`       | `string`                   | —          | Extra class names merged onto the element.    |

### SpaceSize

```ts
type SpaceSize =
  | "auto"
  | "sm" | "md" | "lg" | "xl"          // --naut-spacing-{size}
  | "display" | "display-lg" | "display-xl" // large display tokens
  | "full";                              // horizontal only: width: 100%
```

Every step resolves to a fluid `clamp()` token (see `--naut-spacing-*` in `global.css`), so a single value already adapts across the viewport range — there is no per-breakpoint `size` override.

## Notes

- `vertical` sizes `height`; `horizontal` sizes `width`. `full` is only meaningful horizontally (`width: 100%`).
- `grow` is handy inside `Flex`/`Group` to push siblings apart without explicit `justify`.
- Prefer `Space` over manual margins for consistent vertical rhythm; the padding utilities (`p-*`) handle the inner-padding case.

## Accessibility

- Spacing is purely visual — the empty `<div>` is ignored by screen readers. Add `aria-hidden="true"` only if a linting tool complains; it's harmless to leave as-is.