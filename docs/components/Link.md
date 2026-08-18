# Link

A text link with hover states and an optional external-link icon. Accepts an icon alongside text.

## Usage

Import from `@nautui/core`:

```astro
---
import { Link } from "@nautui/core";
---

<Link to="/docs">Read the docs</Link>
<Link to="https://example.com" external>Example</Link>
<Link to="/docs" hover="surface">
  <svg>...</svg>
  Get started
</Link>
```

## Props

| Prop        | Type                                | Default     | Description                                       |
| ----------- | ----------------------------------- | ----------- | ------------------------------------------------- |
| `to`        | `string`                            | *(required)* | `href` value.                                    |
| `hover`     | `"underline" \| "dimmed" \| "surface"` | `"underline"` | Hover feedback.                               |
| `dimmed`    | `boolean`                           | `false`     | Always dimmed at 50% opacity (hover restores).    |
| `underline` | `boolean`                           | `false`     | Always underlined (not just on hover).            |
| `external`  | `boolean`                           | `false`     | Adds an external-link icon.                       |
| `wrap`      | `boolean`                           | `false`     | Allow text/icon wrapping (default is nowrap).     |
| `class`     | `string`                            | —           | Extra class names merged onto the element.        |

Any other attributes (e.g. `title`, `target`, `rel`, `id`, `aria-*`) pass through to the `<a>`.

## Notes

- Content is wrapped in an inner `.naut-link__wrapper` flex row — icons and text are aligned.
- Hover styles: `underline` shows an underline, `dimmed` drops opacity to 50%, `surface` adds a `base-100` background.
- `external` appends a 16px external-link icon (decorative, has a hidden `<title>`); add `target="_blank" rel="noopener"` yourself if you open new tabs.

## Accessibility

- Only link text is announced; the external icon is decorative.
- Use `dimmed` carefully — 50% opacity may drop contrast below 4.5:1; it's intended for secondary lists.