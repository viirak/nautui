import type { Size } from "../types";

export type Spacing = Size;

/** Step names that exist as `--naut-spacing-*` tokens and `p-*`/`gap-*` utilities. */
export type SpacingStep =
  | "0"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl";

/**
 * Pill-shaped components (`Button`, `Badge`) keep block padding strictly
 * smaller than inline padding — a square outline is what makes them read as
 * pills, and letting the axes drift apart is how they stop looking like pills
 * at all. The ratio eases toward 1 as the step grows because a flat 2:1 reads
 * squat at `md` and above. The `0` step has a ratio of 1, which is the way to
 * ask for equal padding on both axes.
 */
const pillBlockRatio: Record<SpacingStep, number> = {
  "0": 1,
  lg: 0.9,
  md: 0.85,
  sm: 0.75,
  xl: 0.9,
  xs: 0.5,
  xxl: 0.9,
  xxs: 0.5,
};

export function getPillPadding(step: SpacingStep): { x: string; y: string } {
  const ratio = pillBlockRatio[step];
  // A step outside the union would otherwise yield `calc(… * undefined)`,
  // which is invalid at computed-value time and silently drops the padding.
  if (ratio === undefined) {
    throw new TypeError(
      `spacing: unknown padding step ${JSON.stringify(step)}. Expected one of ${Object.keys(pillBlockRatio).join(" | ")}.`
    );
  }
  const x = `var(--naut-spacing-${step})`;
  return { x, y: ratio === 1 ? x : `calc(${x} * ${ratio})` };
}

export interface Padding {
  bottom?: Spacing;
  left?: Spacing;
  right?: Spacing;
  top?: Spacing;
  x?: Spacing;
  y?: Spacing;
}

export interface Margin {
  bottom?: Spacing;
  left?: Spacing;
  right?: Spacing;
  top?: Spacing;
  x?: Spacing;
  y?: Spacing;
}

export interface SpacingProps {
  margin?: Spacing | Margin;
  padding?: Spacing | Padding;
}

function resolveAxis(value: Spacing | undefined, prop: string): string[] {
  if (value === undefined) {
    return [];
  }
  return [`${prop}-${value}`];
}

export function resolvePadding(input: Spacing | Padding | undefined): Padding {
  if (input === undefined) {
    return {};
  }
  if (typeof input === "string") {
    return { x: input, y: input };
  }
  return input as Padding;
}

export function resolveMargin(input: Spacing | Margin | undefined): Margin {
  if (input === undefined) {
    return {};
  }
  if (typeof input === "string") {
    return { x: input, y: input };
  }
  return input as Margin;
}

function isDefined<T>(v: T | undefined): v is T {
  return v !== undefined;
}

function addAxis(
  classes: string[],
  value: Spacing | undefined,
  prefix: string
) {
  if (isDefined(value)) {
    classes.push(...resolveAxis(value, prefix));
  }
}

export function getPaddingClassList(
  input: Spacing | Padding | undefined
): string[] {
  const padding = resolvePadding(input);
  const classes: string[] = [];
  const { x, y, top, bottom, left, right } = padding;

  const allEqual =
    isDefined(x) &&
    x === y &&
    !isDefined(top) &&
    !isDefined(bottom) &&
    !isDefined(left) &&
    !isDefined(right);

  if (allEqual) {
    addAxis(classes, x, "p");
  } else {
    addAxis(classes, x, "px");
    addAxis(classes, y, "py");
    addAxis(classes, top, "pt");
    addAxis(classes, bottom, "pb");
    addAxis(classes, left, "pl");
    addAxis(classes, right, "pr");
  }
  return classes;
}

export function getMarginClassList(
  input: Spacing | Margin | undefined
): string[] {
  const margin = resolveMargin(input);
  const classes: string[] = [];
  const { x, y, top, bottom, left, right } = margin;

  const allEqual =
    isDefined(x) &&
    x === y &&
    !isDefined(top) &&
    !isDefined(bottom) &&
    !isDefined(left) &&
    !isDefined(right);

  if (allEqual) {
    addAxis(classes, x, "m");
  } else {
    addAxis(classes, x, "mx");
    addAxis(classes, y, "my");
    addAxis(classes, top, "mt");
    addAxis(classes, bottom, "mb");
    addAxis(classes, left, "ml");
    addAxis(classes, right, "mr");
  }
  return classes;
}

export function withPaddingDefault(
  input: Spacing | Padding | undefined,
  defaultValue: Spacing
): Padding {
  const padding = resolvePadding(input);
  if (Object.keys(padding).length === 0) {
    return { x: defaultValue, y: defaultValue };
  }
  return padding;
}
