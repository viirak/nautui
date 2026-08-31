# Footer

A page footer with a brand column, link columns, and an optional bottom bar. Renders a semantic `<footer>`.

## Usage

Import from `@nautui/core`:

```astro
---
import { Footer, Link } from "@nautui/core";
---

<Footer columns={4}>
  <Fragment slot="brand">
    <a href="/">Logo</a>
    <p>Tagline text.</p>
  </Fragment>

  <div>
    <h3>Product</h3>
    <Link to="/features">Features</Link>
    <Link to="/pricing">Pricing</Link>
  </div>
  <div>
    <h3>Company</h3>
    <Link to="/about">About</Link>
    <Link to="/blog">Blog</Link>
  </div>
  <div>
    <h3>Resources</h3>
    <Link to="/docs">Docs</Link>
    <Link to="/guides">Guides</Link>
  </div>
  <div>
    <h3>Legal</h3>
    <Link to="/privacy">Privacy</Link>
    <Link to="/terms">Terms</Link>
  </div>

  <Fragment slot="bottom">
    <span>© 2026 Your Company</span>
    <span>Built with NautUI</span>
  </Fragment>
</Footer>
```

## Props

| Prop      | Type              | Default | Description                                           |
| --------- | ----------------- | ------- | ----------------------------------------------------- |
| `columns` | `number`          | `4`     | Number of link columns on tablet+ (brand column is separate). |
| `dark`    | `boolean`         | `false` | Force the dark neutral scale.                         |
| `fluid`   | `boolean`         | `false` | Full-width; skip the `Container` wrapper.             |
| `class`   | `string`          | —       | Extra class names merged onto the element.            |

Any other attributes (e.g. `id`, `aria-*`, `data-*`) pass through to the `<footer>`.

## Slots

| Slot     | Description                                        |
| -------- | -------------------------------------------------- |
| `brand`  | Brand block (logo, tagline). Rendered at the left of the link columns on desktop. |
| default  | Link columns. Drop one block per column.            |
| `bottom` | Bottom bar (copyright, legal links). Hidden if empty. |

## Layout

- On mobile, the brand block and all link columns stack vertically.
- On tablet+ (`818px`), the layout splits into a brand column (1fr) and a link-columns grid (2fr), with `columns` controlling how many link columns fit.
- The bottom bar sits below a top border and only renders when it has content.
- Pass `dark` to force the dark neutral scale on a light page, or rely on `Theme`'s auto dark mode.