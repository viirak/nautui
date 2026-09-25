# Avatar

Represents a person or profile with an image, initials, status, shape, and optional group counter.

## Usage

Import from `@nautui/core`:

```astro
---
import { Avatar, AvatarGroup } from "@nautui/core";
---

<Avatar src="/img/profile.webp" alt="Maya Chen" size="lg" status="online" />
<Avatar initials="MC" alt="Maya Chen" size="lg" placeholder />

<AvatarGroup more={8} size="sm" aria-label="Project members">
  <Avatar src="/img/one.webp" alt="Alex" />
  <Avatar src="/img/two.webp" alt="Sam" />
  <Avatar src="/img/three.webp" alt="Jordan" />
</AvatarGroup>
```

## Avatar props

| Prop           | Type                                                                       | Default     | Description                                      |
| -------------- | -------------------------------------------------------------------------- | ----------- | ------------------------------------------------ |
| `src`          | `string`                                                                   | —           | Image URL. Omit it to render initials.           |
| `alt`          | `string`                                                                   | —           | Accessible image or placeholder label.            |
| `initials`     | `string`                                                                   | derived     | Placeholder text. Defaults to the first two alt characters or `?`. |
| `placeholder`  | `boolean`                                                                  | `false`     | Force initials even when `src` is provided.       |
| `size`         | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| string`                 | `"md"`      | Preset size or a custom CSS length such as `4rem`. |
| `radius`       | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"`                        | `"full"`    | Border radius.                                   |
| `mask`         | `"heart" \| "squircle" \| "hexagon"`                                      | —           | Decorative shape for the image or placeholder.    |
| `status`       | `"online" \| "offline"`                                                   | —           | Adds a status indicator.                         |
| `statusLabel`  | `string`                                                                   | status name | Accessible status text.                          |
| `ring`         | `boolean \| "primary" \| "secondary" \| "success" \| "warning" \| "info"`   | `false`     | Adds a semantic ring; `true` uses the primary color. |
| `loading`      | `"eager" \| "lazy"`                                                        | —           | Native image loading strategy.                   |
| `decoding`     | `"async" \| "auto" \| "sync"`                                              | —           | Native image decoding hint.                      |
| `class`        | `string`                                                                   | —           | Extra class names merged onto the root.           |

Any other attributes, including `id`, `aria-*`, and `data-*`, pass through to the root element.

## AvatarGroup props

| Prop      | Type                              | Default | Description                                      |
| --------- | --------------------------------- | ------- | ------------------------------------------------ |
| `more`    | `number`                          | —       | Appends a `+N` counter avatar.                    |
| `size`    | Avatar size or custom CSS length  | `"md"`  | Size of the `+N` counter avatar.                  |
| `overlap` | `"none" \| "sm" \| "md" \| "lg"`  | `"md"`  | Horizontal overlap between avatars.                |
| `border`  | `"none" \| "sm" \| "md" \| "lg"`  | `"md"`  | Border around each grouped avatar.                |
| `class`   | `string`                          | —       | Extra class names merged onto the group.          |

## Accessibility

- Provide `alt` for meaningful avatars; use an empty string for decorative images.
- Placeholder avatars receive an accessible label from `alt` or `initials`.
- Status indicators are visual; the default or custom `statusLabel` is exposed to assistive technology.
- `Avatar` is not interactive. Wrap it in a `Link` or button when it represents an action.
