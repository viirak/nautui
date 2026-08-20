# Theme & ThemeToggle

`Theme` is the provider every NautUI consumer needs. It loads the CSS reset, global styles, and color stylesheets, and initializes dark mode. `ThemeToggle` is a ready-made light/dark switcher.

## Usage

Import from `@nautui/core`:

```astro
---
import { Theme } from "@nautui/core";
---

<html>
  <head>
    <title>My site</title>
  </head>
  <body>
    <Theme>
      <slot />
    </Theme>
  </body>
</html>
```

`Theme` renders no DOM element of its own — it is an Astro `<Fragment>` that injects the stylesheets and a small inline script. Place it once, high in your layout tree.

## Props

| Prop   | Type      | Default | Description                                   |
| ------ | --------- | ------- | --------------------------------------------- |
| `dark` | `boolean` | `true`  | Enable automatic dark mode handling.          |
| `class` | `string`  | —       | Class names forwarded to the wrapping fragment. |

## Dark mode

With `dark` enabled (the default), `Theme` sets `data-theme` on `<html>` before the first paint:

1. If `naut-theme` is stored in `localStorage` (`"dark"` or `"light"`), use it.
2. Otherwise fall back to `window.matchMedia("(prefers-color-scheme: dark)")`.

`[data-theme="dark"]` and `.dark` selectors in `colors.css` swap the token values — no rebuild needed.

### Opt out

```astro
<Theme dark={false}>
  <!-- no dark-mode handling; always light -->
</Theme>
```

### Control manually

Set `data-theme="light"` or `data-theme="dark"` on `<html>` directly, or call the globals `window.setTheme("dark")` / `window.toggleTheme()` after `ThemeToggle` has loaded.

## Set brand colors

Define `--naut-color-primary` and `--naut-color-secondary` on `:root` before `Theme` renders:

```css
:root {
  --naut-color-primary: #3b82f6;
  --naut-color-secondary: #a855f7;
}
```

Each must meet a **4.5:1 contrast ratio against white**. Dark-mode variants are derived automatically from these inputs.

## ThemeToggle

A ghost, square `Button` that swaps a sun/moon icon and toggles the theme.

```astro
---
import { ThemeToggle } from "@nautui/core";
---

<header>
  <nav>...</nav>
  <ThemeToggle />
</header>
```

It accepts all `Button` props (minus `onclick`) plus `class`. System-preference tracking is smart:

- The user's explicit choice is remembered in `localStorage` and wins over the system.
- While the user hasn't overridden the system preference, the site follows `prefers-color-scheme` changes live.
- If the user's override later matches the system preference again, auto-following is re-enabled.

Place `ThemeToggle` inside or after `<Theme>` so the init script has already set the initial `data-theme`.

## Accessibility

- `ThemeToggle` carries `aria-label="Toggle theme"` and `title="Toggle theme"` by default; override `title` via props if needed.
- The sun/moon icons are decorative (the `<title>` inside is hidden from the accessible name), so the button relies on `aria-label` — don't remove it.
- Dark mode never changes meaning, only contrast; both modes maintain the brand contrast ratios.