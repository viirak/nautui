# Menu, MenuGroup & MenuItem

A nested navigation menu system. `Menu` is the root list; `MenuGroup` is a labeled, optionally collapsible group; `MenuItem` is a link item.

## Usage

Import from `@nautui/core`:

```astro
---
import { Menu, MenuGroup, MenuItem } from "@nautui/core";
---

<Menu>
  <MenuGroup label="Overview">
    <MenuItem href="/docs">Getting started</MenuItem>
    <MenuItem href="/docs/install" active activeVariant="link">Installation</MenuItem>
  </MenuGroup>
  <MenuGroup label="Components" collapsible open>
    <MenuItem href="/docs/button">Button</MenuItem>
  </MenuGroup>
</Menu>
```

## Menu

| Prop         | Type                   | Default  | Description                                   |
| ------------ | ---------------------- | -------- | --------------------------------------------- |
| `horizontal` | `boolean`              | `false`  | Render items in a row instead of a column.    |
| `divided`    | `boolean`              | `false`  | Add a divider line between groups.            |
| `gap`        | `"sm" \| "md" \| "lg" \| "xl"` | —  | Gap between items.                            |
| `class`      | `string`               | —        | Extra class names merged onto the element.    |

Renders a semantic `<ul class="naut-menu">`. Children should be `MenuGroup` or `MenuItem` (both render `<li>`).

## MenuGroup

| Prop         | Type      | Default  | Description                                   |
| ------------ | --------- | -------- | --------------------------------------------- |
| `label`      | `string`  | *(required)* | Group heading text.                         |
| `collapsible`| `boolean` | `false`  | Group collapses behind a toggle button.       |
| `open`       | `boolean` | `true`   | Initial open state (only when collapsible).   |
| `line`       | `boolean` | `true`   | Leading vertical guide line.                  |
| `class`      | `string`  | —        | Extra class names merged onto the `<li>`.     |

Slots: `icon` (before the label) and the default slot (the group's items).

### Collapsible behavior

When `collapsible`, the label becomes a `<button aria-expanded>` with a chevron that rotates when open. The script wire-up runs against all `.naut-menu-group.collapsible` on the page; open groups toggle via class and keep `aria-expanded` in sync.

## MenuItem

| Prop           | Type                          | Default | Description                                   |
| -------------- | ----------------------------- | ------- | --------------------------------------------- |
| `href`         | `string`                      | *(required)* | Destination URL.                          |
| `active`       | `boolean`                     | `false` | Marks the current page.                       |
| `activeVariant`| `"link" \| "primary" \| "surface"` | — | Active style: link-colored bar, filled primary, or subtle fill. |
| `dimmed`       | `boolean`                     | `false` | Soft color (restores on hover when inactive). |
| `radius`       | `"sm" \| "md" \| "lg" \| "xl"` | `"sm"` | Border radius.                               |
| `class`        | `string`                      | —        | Extra class names merged onto the `<a>`.      |

Renders `<li><a href>…</a></li>` with three slots: `before` (left), default (main), `after` (right, e.g. a chevron/badge).

## Accessibility

- Semantic `<ul>/<li>` structure is preserved, so menus announce correctly.
- `MenuGroup` collapsible toggles are real `<button>`s with `aria-expanded`; keyboard activation works (Space/Enter).
- Mark the current location with `active` + `activeVariant="link"` — don't rely on color alone (`::before` bar helps).
- `MenuGroup` labels are `<span>`s (or toggle buttons); if a group is a section landmark, consider `aria-label` on the wrapping `<li>`.