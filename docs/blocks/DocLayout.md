# DocLayout

A three-zone documentation page shell: nav sidebar, article content, and an auto-generated table of contents. Built on `Article`, `Box`, `Container`, `Title`, and `TOC`.

## Usage

Import from `@nautui/blocks`:

```astro
---
import { DocLayout } from "@nautui/blocks";
import { getHeadings } from "./docs-utils"; // provides MarkdownHeading[]
const headings = await getHeadings();
---

<DocLayout title="Getting started" headings={headings}>
  <ul slot="nav">
    <li><a href="/docs">Overview</a></li>
  </ul>
  <p>Page content goes here.</p>
</DocLayout>
```

## Props

`DocLayoutProps` (does **not** extend `Base`).

| Prop       | Type                 | Default | Description                                    |
| ---------- | -------------------- | ------- | ---------------------------------------------- |
| `title`    | `string`             | *(required)* | Page title, rendered as an `h1`.         |
| `headings` | `MarkdownHeading[]`  | —       | When set, a right-hand TOC is rendered.        |
| `class`    | `string`             | —       | Extra class names merged onto the layout.      |

`MarkdownHeading` is Astro's `{ depth, slug, text }`.

## Layout & breakpoints

| Viewport            | Layout                                   |
| ------------------- | ---------------------------------------- |
| < 1049px            | Single column; nav + TOC hidden.         |
| ≥ 1049px            | Nav (15rem) + content. TOC still hidden. |
| ≥ 1450px            | Nav (15rem) + content + TOC (20rem).     |

- The nav sidebar is `position: sticky; top: 70px` with its own scroll (`height: calc(100dvh - 70px)`).
- The content column is a padded `Box` wrapping an `Article`; `anchorLinks` is enabled for `Article` (copy-link buttons on headings).
- When `headings` are present, the article gets `.with-toc` and the `h1` is given `id="intro"` so the TOC can point back to the top.

## Slots

| Slot       | Renders                            |
| ---------- | ---------------------------------- |
| `nav`      | Left sidebar content (desktop only). |
| *(default)*| Article body.                       |

## Accessibility

- Content renders inside a real `<main>` — one per page.
- The TOC and nav are `<aside>`s with landmark roles; give the TOC a heading (its default "On this page" is an `h2`).
- Nav/TOC are `display: none` below their breakpoints — mobile users lose them with no fallback trigger, so ensure alternate navigation (e.g. a `Drawer` or mobile menu) exists on small screens.