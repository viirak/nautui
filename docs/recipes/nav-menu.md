# Recipe: Desktop Nav Menu

A desktop-only horizontal navigation menu with hover dropdowns and an overflow "More" menu, composed entirely from `@nautui/core` primitives.

> **Why is this a recipe and not a package export?** It is pure composition — no additional styles or script beyond trivial item shaping. Per the [blocks admission rule](../../AGENTS.md), pure compositions ship as copy-paste recipes so consumers keep full control of markup.

## Usage notes

- Desktop-only: wrap with `<Visibility on="sm" mode="hide">` (already included below). Pair with a Drawer-based mobile menu for small screens.
- `activePath` matching covers top-level hrefs **and** dropdown children.
- `limit` slices visible items; excess items collapse into the right-aligned "More" dropdown (nested children become an indented submenu).
- Dropdowns run in hover mode (`hover`) — fine for pointer devices; touch users need the mobile menu path.

## Source

```astro
---
import {
  Button,
  Dropdown,
  Group,
  Menu,
  MenuItem,
  Visibility,
} from "@nautui/core";

interface NavMenuItem {
  children?: Array<{ label: string; href: string }>;
  href: string;
  label: string;
}

export interface NavMenuProps {
  activePath?: string;
  items: NavMenuItem[];
  limit?: number;
}

const { items = [], activePath = "", limit } = Astro.props as NavMenuProps;

const visibleItems = limit ? items.slice(0, limit) : items;
const overflowItems = limit && items.length > limit ? items.slice(limit) : [];

function isActive(item: NavMenuItem): boolean {
  if (!activePath) return false;
  if (item.href === activePath) return true;
  return item.children?.some((child) => child.href === activePath) ?? false;
}

function hasChildren(item: NavMenuItem): boolean {
  return !!(item.children && item.children.length > 0);
}
---

<Visibility on="sm" mode="hide">
  <Menu horizontal gap="sm">
    {visibleItems.map((item) =>
      hasChildren(item) ? (
        <MenuItem>
          <Dropdown align="start" hover side="bottom" zi={50}>
            <Button slot="trigger">
              <span>{item.label}</span>
              <span aria-hidden="true" slot="after">▼</span>
            </Button>
            <ul>
              {item.children?.map((child) => (
                <MenuItem
                  active={Boolean(activePath && child.href === activePath)}
                  href={child.href}
                >
                  {child.label}
                </MenuItem>
              ))}
            </ul>
          </Dropdown>
        </MenuItem>
      ) : (
        <MenuItem active={isActive(item)} href={item.href}>
          {item.label}
        </MenuItem>
      )
    )}
    {overflowItems.length > 0 && (
      <MenuItem>
        <Dropdown align="end" hover offset="xs" side="bottom" zi={50}>
          <Group gap="xs" slot="trigger">
            <span>More</span>
            <svg
              fill="none"
              height="20"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="20"
            >
              <title>Chevron Down</title>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Group>
          <Menu>
            {overflowItems.map((item) => (
              <MenuItem active={isActive(item)} href={item.href}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
      </MenuItem>
    )}
  </Menu>
</Visibility>
```
