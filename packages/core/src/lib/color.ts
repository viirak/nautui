import type { Color } from "../types";

const colorValues: Record<Color, string> = {
  primary:
    "color-mix(in oklch, var(--naut-color-primary) 60%, var(--naut-color-content))",
  secondary:
    "color-mix(in oklch, var(--naut-color-secondary) 60%, var(--naut-color-content))",
  destructive:
    "color-mix(in oklch, var(--naut-color-destructive) 60%, var(--naut-color-content))",
  success:
    "color-mix(in oklch, var(--naut-color-success) 60%, var(--naut-color-content))",
  warning:
    "color-mix(in oklch, var(--naut-color-warning) 60%, var(--naut-color-content))",
  info: "color-mix(in oklch, var(--naut-color-info) 60%, var(--naut-color-content))",
  content: "var(--naut-color-content)",
  muted:
    "color-mix(in oklch, var(--naut-color-content) 85%, var(--naut-color-base-0))",
  link: "color-mix(in oklch, var(--naut-color-link) 60%, var(--naut-color-content))",
};

export function getColorValue(color: Color | undefined): string | undefined {
  return color ? colorValues[color] : undefined;
}
