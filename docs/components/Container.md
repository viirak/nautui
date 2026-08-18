# Container

A max-width, centered content wrapper that sets breakpoint-based widths. Optional `fluid` mode spans full width.

## Usage

Import from `@nautui/core`:

```astro
---
import { Container } from "@nautui/core";
---

<Container>
  <h1>Centered content</h1>
</Container>

<Container fluid>
  <h1>Full width</h1>
</Container>
```

## Props

| Prop   | Type      | Default | Description                                         |
| ------ | --------- | ------- | --------------------------------------------------- |
| `fluid` | `boolean` | `false` | Skip the centered max-width behavior; span full width. |
| `class` | `string`  | —       | Extra class names merged onto the element.           |

Any other attributes pass through to the `<div>`.

## Max widths

By default the container centers content and clamps width per breakpoint:

| Viewport        | Max width |
| --------------- | --------- |
| Mobile (≤817px) | 576px     |
| Tablet (≤1041px) | 768px    |
| Desktop (≤1249px) | 992px   |
| Large Desktop (≥1250px) | 1200px |
| Extra Large (≥1450px) | 1440px |

Horizontal padding is always `--naut-spacing-md`.

## Accessibility

- It's a neutral wrapper; no ARIA needed.
- Prefer one `Container` per section at a consistent nesting depth so content columns align across the page.