import type { Color } from "../types";

const colorValues: Record<Color, string> = {
  content: "var(--naut-color-content)",
  destructive: "var(--naut-color-destructive-text)",
  info: "var(--naut-color-info-text)",
  link: "color-mix(in oklch, var(--naut-color-link-text) 60%, var(--naut-color-content))",
  muted:
    "color-mix(in oklch, var(--naut-color-content) 85%, var(--naut-color-base-0))",
  primary: "var(--naut-color-primary-text)",
  secondary: "var(--naut-color-secondary-text)",
  success: "var(--naut-color-success-text)",
  warning: "var(--naut-color-warning-text)",
};

export function getColorValue(color: Color | undefined): string | undefined {
  return color ? colorValues[color] : undefined;
}
