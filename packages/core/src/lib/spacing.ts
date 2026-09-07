import type { Size } from "../types";

export type Spacing = Size;

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
