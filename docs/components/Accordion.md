# Accordion & AccordionItem

`Accordion` is a simple vertical flex container; `AccordionItem` is a single expandable section. Compose them together.

## Usage

Import from `@nautui/core`:

```astro
---
import { Accordion, AccordionItem } from "@nautui/core";
---

<Accordion>
  <AccordionItem title="What is NautUI?" icon="chevron">
    <p>NautUI is a minimalist Astro component library.</p>
  </AccordionItem>
  <AccordionItem title="Is it free?">
    <p>Yes.</p>
  </AccordionItem>
</Accordion>
```

## Accordion

Renders a `<div class="naut-accordion">` flex column. Any attributes pass through.

| Prop   | Type     | Default | Description                              |
| ------ | -------- | ------- | ---------------------------------------- |
| `class` | `string` | —       | Extra class names merged onto the element. |

## AccordionItem

| Prop   | Type                | Default   | Description                                          |
| ------ | ------------------- | --------- | ---------------------------------------------------- |
| `title` | `string`            | *(required)* | Header text.                                        |
| `icon` | `"chevron" \| "plus"` | `"plus"` | Expand indicator style.                              |
| `size` | `"md" \| "lg" \| "xl"` | `"md"`  | Title and padding scale.                             |
| `class` | `string`            | —         | Extra class names merged onto the element.            |

## Behavior

- Each item is a radio-backed disclosure — **only one item is open at a time**, and clicking an open item collapses it.
- The expand icon rotates (chevron) or animates to a minus (plus) on open.
- Content is revealed with a `max-height` transition (caps at `400px`).
- Items are separated by a divider line; the last item has none.

## Accessibility

- The header is a `<label for>` a hidden radio input — keyboard toggling works via Tab + Space/Enter.
- No `aria-expanded` is set; if you need screen-reader state announcements, add `role="button"` + `aria-expanded` via the `class`/rest props and manage it externally.