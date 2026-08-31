# Breadcrumb

A semantic navigation trail with `/` separators, showing where the current page sits in the site hierarchy.

## Usage

Import from `@nautui/blocks`:

```astro
---
import { Breadcrumb } from "@nautui/blocks";
---

<Breadcrumb
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Button" },
  ]}
/>
```

## Props

| Prop   | Type             | Default | Description                                   |
| ------ | ---------------- | ------- | --------------------------------------------- |
| `items`| `BreadcrumbItem[]` | *(required)* | The trail, in order.                     |
| `class`| `string`         | —       | Extra class names merged onto the `<nav>`.   |

### BreadcrumbItem

```ts
interface BreadcrumbItem {
  label: string;
  href?: string;
}
```

- Items **without** `href` render as plain `<span>` (the current page, typically the last item).
- Items **with** `href` render as links, styled with the soft content color, darkening on hover.

## Behavior

- Separators are `li + li::before` with `/` — inserted automatically, no manual separator markup.
- The list wraps (`flex-wrap: wrap`) on narrow screens; long trails stack cleanly.
- Link `title` is set to the item label (matches the visible text — harmless duplication; remove via a custom render if you prefer).

## Accessibility

- Renders a semantic `<nav aria-label="Breadcrumb">` — screen readers announce it as a navigation landmark.
- The current page item (last, no `href`) has no link, so it isn't announced as a link — correct ARIA behavior for the "current location".
- `title` on links is redundant with visible text; it's only a fallback for links that don't show text.