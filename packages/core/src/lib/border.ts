export type BorderStyle = "solid" | "dashed" | "dotted";
export type BorderWidth = "sm" | "md" | "lg" | "xl";

export interface BorderObject {
  color?: string;
  style?: BorderStyle;
  width?: BorderWidth;
}

export interface BorderProps {
  bottom?: BorderWidth | BorderObject;
  color?: string;
  left?: BorderWidth | BorderObject;
  right?: BorderWidth | BorderObject;
  style?: BorderStyle;
  top?: BorderWidth | BorderObject;
  width?: BorderWidth;
  x?: BorderWidth | BorderObject;
  y?: BorderWidth | BorderObject;
}

export type Border = BorderWidth | BorderProps;

/**
 * Helper to add border classes and color variables for a given prefix.
 */
function applyBorderConfig(
  prefix: string,
  config: BorderObject,
  classes: string[],
  colorVar: Record<string, string>
) {
  const { width, style, color } = config;
  if (width) {
    classes.push(`${prefix}-${width}`);
  }
  if (style) {
    classes.push(`${prefix}-${style}`);
  }
  if (color) {
    // colorVars.push(`--naut-color-${prefix}: ${color}`);
    colorVar[`naut-color-${prefix}`] = color;
  }
}

/**
 * Creates border classes and CSS variables from border props.
 * Supports global and side-specific configurations.
 */
export function createBorder(props: BorderProps) {
  const borderClasses: string[] = [];
  const borderColors = {};

  if (Object.keys(props).length > 0) {
    borderClasses.push("border");
  }

  const { width, style, color, x, y, top, right, bottom, left } = props;

  // 1. Global Props
  applyBorderConfig(
    "border",
    { width, style, color },
    borderClasses,
    borderColors
  );

  // 2. Side-specific Processing
  const sideSpecs: Record<string, BorderObject> = {};

  const collect = (side: string, value?: BorderWidth | BorderObject) => {
    if (value) {
      const obj = typeof value === "string" ? { width: value } : value;
      sideSpecs[side] = { ...sideSpecs[side], ...obj };
    }
  };

  collect("left", x);
  collect("right", x);
  collect("top", y);
  collect("bottom", y);
  collect("top", top);
  collect("right", right);
  collect("bottom", bottom);
  collect("left", left);

  for (const [side, spec] of Object.entries(sideSpecs)) {
    applyBorderConfig(`border-${side}`, spec, borderClasses, borderColors);
  }

  console.log("colors", borderColors);

  return { borderClasses, borderColors };
}
