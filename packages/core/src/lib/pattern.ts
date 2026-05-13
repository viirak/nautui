import type { Pattern } from "../types";

export function getPatternStyle(pattern: Pattern): string | null {
  const size = "24px";
  switch (pattern) {
    case "dots":
      return "radial-gradient(circle, var(--naut-color-pattern) 1px, transparent 1px) 0 0 / 15px 15px";
    case "dots-x":
      return "radial-gradient(var(--naut-color-pattern) 1px, transparent 1px) 0 0 / 20px 20px, radial-gradient(var(--naut-color-pattern) 1px, transparent 1px) 10px 10px / 20px 20px";
    case "paper-grid":
      return `linear-gradient(90deg, var(--naut-color-pattern) 1px, transparent 1px) 0 0 / ${size} ${size} repeat, linear-gradient(var(--naut-color-pattern) 1px, transparent 1px) 0 0 / ${size} ${size} repeat`;
    case "stripes": {
      return "repeating-linear-gradient(-45deg, transparent, transparent 32px, var(--naut-color-pattern-stripe) 32px, var(--naut-color-pattern-stripe) 64px)";
    }
    case "mini-stripes": {
      return "repeating-linear-gradient(130deg,var(--naut-color-pattern-stripe) 0, var(--naut-color-pattern-stripe) 1px,transparent 1px,transparent 8px)";
    }
    default:
      return "transparent";
  }
}
