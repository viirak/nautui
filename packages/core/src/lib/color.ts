import type { Color } from "../types";

const colorValues: Record<Color, string> = {
  primary: "var(--naut-color-primary-text)",
  secondary: "var(--naut-color-secondary-text)",
  destructive: "var(--naut-color-destructive-text)",
  success: "var(--naut-color-success-text)",
  warning: "var(--naut-color-warning-text)",
  info: "var(--naut-color-info-text)",
  content: "var(--naut-color-content)",
  muted:
    "color-mix(in oklch, var(--naut-color-content) 85%, var(--naut-color-base-0))",
  link: "color-mix(in oklch, var(--naut-color-link-text) 60%, var(--naut-color-content))",
};

export function getColorValue(color: Color | undefined): string | undefined {
  return color ? colorValues[color] : undefined;
}
