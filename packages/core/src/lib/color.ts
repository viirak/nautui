import type { Color } from "../types";

const colorValues: Record<Color, string> = {
  primary: "var(--naut-color-primary-text)",
  secondary: "var(--naut-color-secondary-text)",
  destructive: "var(--naut-color-destructive-text)",
  success:
    "color-mix(in oklch, var(--naut-color-success) 60%, var(--naut-color-content))",
  warning:
    "color-mix(in oklch, var(--naut-color-warning) 60%, var(--naut-color-content))",
  info: "color-mix(in oklch, var(--naut-color-info) 60%, var(--naut-color-content))",
  content: "var(--naut-color-content)",
  muted:
    "color-mix(in oklch, var(--naut-color-content) 85%, var(--naut-color-base-0))",
  link: "color-mix(in oklch, var(--naut-color-link-text) 60%, var(--naut-color-content))",
};

export function getColorValue(color: Color | undefined): string | undefined {
  return color ? colorValues[color] : undefined;
}
