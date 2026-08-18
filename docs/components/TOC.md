# TOC

A sticky table of contents with a scroll-spy indicator, built from Astro `MarkdownHeading[]`.

## Usage

Import from `@nautui/blocks`:

```astro
---
import { TOC } from "@nautui/blocks";
import type { MarkdownHeading } from "astro";
const headings: MarkdownHeading[] = await getHeadings();
---

<TOC headings={headings} />
```

## Props

`TOCProps extends Base`.

| Prop      | Type                            | Default         | Description                                    |
| --------- | ------------------------------- | --------------- | ---------------------------------------------- |
| `headings`| `MarkdownHeading[]`             | `[]`            | Headings to render.                            |
| `title`   | `string`                        | `"On this page"` | List title (`h2`).                           |
| `sticky`  | `boolean`                       | `true`          | `position: sticky` the widget.                 |
| `top`     | `{ offset?: number; slug: string; label: string }` | — | Prepends a "back to top" entry (e.g. the page `h1`). |
| `class`   | `string`                        | —               | Extra class names merged onto the element.     |

## Behavior

- Each heading renders a link `#slug` with `depth-{n}` indentation; `depth-3` links get a `— ` prefix marker.
- **Scroll-spy**: an `IntersectionObserver` watches heading elements (root margin `-offset 0 -50% 0`), marks the in-view link `.current`, and slides the left indicator bar to the active link.
- Headings get `scrollMarginTop = offset` so anchor jumps land below a sticky nav. Default offset `90px` (or `top.offset`).
- Smooth-scrolls on link click via `scrollIntoView({ behavior: "smooth" })`.
- Re-initializes on `astro:after-swap` for view transitions.
- Respects `prefers-reduced-motion`? Not currently — smooth scrolling is applied unconditionally.

## Notes

- Requires the target headings to have matching `id`s in the DOM (Astro MDX does this automatically).
- `top` prepends an entry at `depth 2` pointing at `#slug` — use it to link the page's `h1` (as `DocLayout` does with `id="intro"`).
- Links with non-`#` hrefs are ignored by the click handler.

## Accessibility

- The list is a set of same-page anchor links — keyboard reachable, and `scrollMarginTop` keeps targets below sticky bars.
- The indicator bar is `aria-hidden` decorative; the link's `.current` state is the visual cue.
- Screen readers navigate by headings directly (browser landmarks), so the TOC is supplementary, not required.