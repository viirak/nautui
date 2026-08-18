# Article

A long-form content container with typographic defaults. Designed for docs, blog posts, and markdown-rendered content.

## Usage

Import from `@nautui/core`:

```astro
---
import { Article } from "@nautui/core";
---

<Article>
  <h1>Getting started</h1>
  <p>Body text inherits the article typographic scale.</p>
</Article>
```

## Props

| Prop   | Type     | Default | Description                              |
| ------ | -------- | ------- | ---------------------------------------- |
| `class` | `string` | —       | Extra class names merged onto the element. |

Any other attributes (e.g. `id`, `aria-*`, `data-*`) pass through to the `<article>`.

## Typography

Article applies comfortable reading defaults:

- Flow spacing between headings, paragraphs, lists, and blockquotes.
- Headings sized on the article scale (`h1`–`h6`).
- Readable line height and a constrained line length.
- Blockquotes get a left accent border; inline code gets subtle emphasis.

## Clipboard copy

Article ships an optional copy button on `pre > code` blocks (disabled on touch devices). Clicking copies the code to the clipboard using the async Clipboard API, falling back to a temporary `<textarea>` + `execCommand` when unavailable.

## Accessibility

- Renders as `<article>` — meaningful when it's a self-contained composition (e.g. inside a list of posts, where each entry is its own article).
- Markdown content should use real heading levels; Article doesn't rewrite them.