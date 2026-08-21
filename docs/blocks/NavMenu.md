# NavMenu

A desktop-only horizontal navigation menu with submenu dropdowns, active-path styling, and an overflow "More" menu. Built from `Menu` + `Visibility`; drop it inside `<NavBar>`.

## Usage

Import from `@nautui/blocks`:

```astro
---
import { NavMenu } from "@nautui/blocks";
---

<NavBar sticky bordered>
  <a href="/">Logo</a>

  <NavMenu
    items={[
      { label: "Home", href: "/" },
      {
        label: "Products",
        href: "/products",
        children: [
          { label: "SaaS", href: "/products/saas" },
          { label: "Open Source", href: "/products/oss" },
        ],
      },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ]}
    activePath={Astro.url.pathname}
    limit={3}
  />

  <Button href="/get">CTA</Button>
</NavBar>
```

## Props

`NavMenuProps extends Base`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<{ label: string; href: string; children?: Array<{ label: string; href: string }> }>` | `[]` | Menu items. Items with `children` render a dropdown. |
| `activePath` | `string` | `""` | Current pathname; matching items get `.active` styling. |
| `limit` | `number` | — | Max visible items before overflow. Excess items collapse under a "More" dropdown. |
| `class` | `string` | — | Extra class names merged onto the root `.naut-navmenu`. |

Any other attributes (`id`, `aria-*`, `data-*`) pass through to the root element.

## Behavior

- **Desktop-only**: wrapped in `<Visibility on="sm" hidden={true}>`, so it hides on mobile (≤576px). Pair with a `Drawer`-based mobile menu for the small-screen experience.
- **Submenus**: items with `children` render a hover-triggered dropdown. Nested children inside the "More" overflow menu are rendered as an indented submenu list.
- **Overflow**: when `limit` is set and `items.length > limit`, the extra items go into a right-aligned "More" dropdown.
- **Active state**: `href === activePath` adds `.active` to the link (bold + brand color).

## Accessibility

- Submenu toggles are `<button type="button">` with `aria-hidden` chevrons; they don’t navigate on their own.
- Dropdowns are hover-only (no keyboard trap); the underlying links are keyboard-focusable.
- The component renders as a `<ul>` inside `<Menu horizontal>` — screen readers see a flat list of links.

## Notes

- `Visibility` hides the entire menu on mobile — there is no built-in mobile replacement. Use a `Drawer` or separate mobile nav on small screens.
- Dropdown open/close is CSS-only (`:hover`), so it doesn’t work on touch devices without a tap. Consider adding a click toggle if touch support is required.
