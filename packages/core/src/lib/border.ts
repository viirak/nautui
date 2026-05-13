type BorderStyle = "solid" | "dashed" | "dotted";
type BorderWidth = "sm" | "md" | "lg" | "xl";
type BorderRadius = "sm" | "md" | "lg";

export interface Border {
  bottom?: BorderWidth;
  left?: BorderWidth;
  radius?: BorderRadius;
  right?: BorderWidth;
  style?: BorderStyle;
  top?: BorderWidth;
  x?: BorderWidth;
  y?: BorderWidth;
}

export function createBorder(prefix: string, border?: Border) {
  if (!border) {
    return null;
  }
  const style = border?.style || "solid";
  const color = "var(--naut-color-border)";
  const borderTop =
    border?.top || border?.y
      ? `var(--naut-border-width-${border.top ? border.top : border.y}) ${style} ${color}`
      : "none";
  const borderRight =
    border?.right || border?.x
      ? `var(--naut-border-width-${border.right ? border.right : border.x}) ${style} ${color}`
      : "none";
  const borderBottom =
    border?.bottom || border?.y
      ? `var(--naut-border-width-${border.bottom ? border.bottom : border.y}) ${style} ${color}`
      : "none";
  const borderLeft =
    border?.left || border?.x
      ? `var(--naut-border-width-${border.left ? border.left : border.x}) ${style} ${color}`
      : "none";
  const borderRadius = border?.radius
    ? `var(--naut-border-radius-${border.radius})`
    : "none";
  return {
    [`${prefix}BorderTop`]: borderTop,
    [`${prefix}BorderRight`]: borderRight,
    [`${prefix}BorderBottom`]: borderBottom,
    [`${prefix}BorderLeft`]: borderLeft,
    [`${prefix}BorderRadius`]: borderRadius,
  };
}
