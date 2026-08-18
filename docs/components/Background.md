# Background

An absolutely-positioned background layer for pattern or gradient fills. Place it as the first child inside a positioned container (`Section`, `Card`, etc.) — it fills the parent.

## Usage

Import from `@nautui/core`:

```astro
---
import { Background, Section } from "@nautui/core";
---

<Section>
  <Background pattern={{ type: "dots", color: "#3b82f6" }} />
  <h1>Patterned section</h1>
</Section>
```

## Props

| Prop       | Type                                | Default | Description                                          |
| ---------- | ----------------------------------- | ------- | ---------------------------------------------------- |
| `variant`  | `"gradient" \| "pattern"`           | `"gradient"` | Background kind.                                  |
| `gradient` | `GradientProps`                     | —       | Gradient spec. See below.                             |
| `pattern`  | `PatternProps`                      | —       | Pattern spec. See below.                              |
| `class`    | `string`                            | —       | Extra class names merged onto the element.             |

Only `variant`'s matching spec is used — providing both with `variant="gradient"` ignores `pattern`.

Any other attributes pass through to the `<div>`.

## GradientProps

| Prop   | Type              | Default | Description                                   |
| ------ | ----------------- | ------- | --------------------------------------------- |
| `colors` | `string[]`      | *(required)* | Gradient color stops.                       |
| `type` | `"linear" \| "radial"` | `"linear"` | Direction. Radial is centered (circle).      |
| `deg`  | `number`          | `45`    | Angle for `"linear"` gradients (degrees).     |
| `opacity` | `number`       | `1`     | Layer opacity (0–1).                          |

## PatternProps

| Prop   | Type                       | Default | Description                                   |
| ------ | -------------------------- | ------- | --------------------------------------------- |
| `type` | `"dots" \| "dots-x" \| "grid" \| "stripes"` | *(required)* | Pattern kind.          |
| `color` | `string`                 | `var(--naut-color-base-300)` | Pattern stroke color. |
| `size` | `number`                   | `1`     | Dot/line thickness (px).                      |
| `gap`  | `number`                   | per-type | Spacing between repeats (px).                  |
| `deg`  | `number`                   | per-type | Angle for `grid`/`stripes` (degrees).          |

## Examples

### Radial gradient

```astro
<Background
  gradient={{ colors: ["#3b82f6", "transparent"], type: "radial", opacity: 0.4 }}
/>
```

### Stripes

```astro
<Background
  variant="pattern"
  pattern={{ type: "stripes", color: "#a855f7", deg: 130, gap: 10 }}
/>
```

## Accessibility

- `Background` is purely decorative — it never conveys information alone.
- It is not focusable and is positioned behind content; ensure anything meaningful on top stays readable (contrast ≥ 4.5:1).