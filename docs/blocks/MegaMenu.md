# MegaMenu

A Stripe-style single-panel dropdown menu for desktop navigation. One shared floating panel crossfades between dropdown items on hover.

## Usage

```astro
---
import { MegaMenu, MegaMenuItem } from "@nautui/blocks";
---

<MegaMenu>
  <MegaMenuItem label="Products" drop>
    <div class="grid">
      <a href="/product-a">Product A</a>
      <a href="/product-b">Product B</a>
    </div>
  </MegaMenuItem>
  <MegaMenuItem label="Pricing" href="/pricing" />
  <MegaMenuItem label="About" href="/about" />
</MegaMenu>
```

## API

### `<MegaMenu>`

The container component. Renders a `<ul>` and injects the shared dropdown panel.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | — | Additional CSS classes |
| `...rest` | `Base` | — | Arbitrary passthrough attributes |

### `<MegaMenu.Item>`

A menu item. Use `drop` to create a dropdown trigger; omit it for a regular link.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Accessible label for the item |
| `href` | `string` | — | Link URL (omit for dropdown items) |
| `drop` | `boolean \| { position?: \"start\" \| \"center\" \| \"end\"; offset?: number }` | `false` | Enable dropdown behavior, with optional panel alignment and spacing |
| `class` | `string` | — | Additional CSS classes |
| `...rest` | `Base` | — | Arbitrary passthrough attributes |

#### `drop` object

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `position` | `"start" \| "center" \| "end"` | `"center"` | Horizontal alignment of the panel relative to the item |
| `offset` | `number` | `20` | Vertical offset in pixels from the item's bottom edge |

```astro
<MegaMenuItem label="Products" drop={{ position: "center", offset: 20 }}>
  <div class="grid">
    <a href="/product-a">Product A</a>
    <a href="/product-b">Product B</a>
  </div>
</MegaMenuItem>
```

## Behavior

- Hovering a `drop` item opens the shared panel positioned below the trigger.
- Moving the pointer to another `drop` item crossfades the panel content.
- Leaving both the item and the panel closes the panel after a short delay.
- `prefers-reduced-motion` disables animations.
