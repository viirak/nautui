# TextField and Textarea

Native form controls for focused marketing-site flows such as newsletters, lead capture, and contact forms. Both controls provide labels, descriptions, errors, sizing, and theme-aware styling without client-side validation or state management.

## Usage

Import from `@nautui/core`:

```astro
---
import { TextField, Textarea } from "@nautui/core";
---

<TextField
  id="email"
  name="email"
  type="email"
  label="Work email"
  description="We only use this to reply to your request."
  required
  fullWidth
/>

<Textarea
  id="message"
  name="message"
  label="Message"
  description="Tell us how we can help."
  rows={6}
  resize="vertical"
  required
  fullWidth
/>
```

## TextField props

| Prop           | Type                                                                                         | Default | Description                                      |
| -------------- | -------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------ |
| `id`           | `string`                                                                                     | —       | Input ID; use it to link descriptions and errors. |
| `label`        | `string`                                                                                     | —       | Visible label.                                   |
| `description`  | `string`                                                                                     | —       | Help text linked through `aria-describedby`.    |
| `error`        | `string`                                                                                     | —       | Error text and invalid styling.                 |
| `type`         | `"text" \| "email" \| "password" \| "search" \| "tel" \| "url"`                              | `"text"` | Native input type.                               |
| `size`         | `"sm" \| "md" \| "lg" \| "xl"`                                                              | `"md"`  | Control height and padding.                     |
| `radius`       | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"`                                         | `"md"`  | Border radius.                                   |
| `fullWidth`    | `boolean`                                                                                    | `false` | Fill the available inline width.                 |
| `required`     | `boolean`                                                                                    | `false` | Native required state and visible marker.       |
| `class`        | `string`                                                                                     | —       | Extra class names merged onto the field wrapper.  |

Native attributes such as `name`, `placeholder`, `autocomplete`, `inputmode`, `disabled`, `readonly`, `value`, `maxlength`, and `pattern` pass through to the `<input>`.

## Textarea props

`Textarea` accepts the same `id`, `label`, `description`, `error`, `size`, `radius`, `fullWidth`, `required`, and `class` props, plus:

| Prop      | Type                                          | Default     | Description                                      |
| --------- | --------------------------------------------- | ----------- | ------------------------------------------------ |
| `rows`    | `number`                                      | `4`         | Native visible rows.                             |
| `resize`  | `"none" \| "vertical" \| "horizontal" \| "both"` | `"vertical"` | Resize behavior.                               |

Native attributes such as `name`, `placeholder`, `disabled`, `readonly`, `value`, `maxlength`, and `wrap` pass through to the `<textarea>`.

## Accessibility

- Provide a visible `label` or an `aria-label` for every control.
- Provide an `id` when using `description` or `error` so the component can connect the helper text with `aria-describedby`.
- `error` sets `aria-invalid="true"` and should contain a concise, actionable message.
- These components render native controls and do not validate or submit values; use form semantics and server validation for behavior.
