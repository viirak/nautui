import type {
  Direction,
  Justify,
  Responsive,
  ResponsiveProp,
  ResponsiveValue,
} from "../types";

const responsiveKeys: Responsive[] = ["base", "sm", "md", "lg", "xl"];
const spacePrefix = /^space-/;

export function resolveResponsiveValue<T extends string>(
  value: ResponsiveProp<T> | undefined,
  defaultValue?: T
): ResponsiveValue<T> {
  let resolved: ResponsiveValue<T>;
  if (value === undefined) {
    resolved = {};
  } else if (typeof value === "string") {
    resolved = { base: value };
  } else {
    resolved = value;
  }

  if (defaultValue === undefined) {
    return resolved;
  }
  return { base: defaultValue, ...resolved };
}

export function getResponsiveClasses<T extends string>(
  value: ResponsiveProp<T> | undefined,
  prefix: string,
  normalize: (value: T) => string = (value) => value
): string[] {
  if (value === undefined) {
    return [];
  }

  const responsive = resolveResponsiveValue(value);

  return responsiveKeys.flatMap((key) => {
    const item = responsive[key];
    if (item === undefined) {
      return [];
    }
    const breakpoint = key === "base" ? "" : `${key}-`;
    return [`${breakpoint}${prefix}-${normalize(item)}`];
  });
}

export function normalizeDirection(value: Direction): "row" | "column" {
  if (value === "vertical") {
    return "column";
  }
  if (value === "horizontal") {
    return "row";
  }
  return value;
}

export function normalizeJustify(value: Justify): string {
  return value.replace(spacePrefix, "");
}
