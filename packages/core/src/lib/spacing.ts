import type { Size } from "../types";

export type Spacing = Size | "0";

export interface PaddingProps {
  p?: Spacing; // all sides
  pb?: Spacing; // bottom only
  pl?: Spacing; // left only
  pr?: Spacing; // right only
  pt?: Spacing; // top only
  px?: Spacing; // left + right
  py?: Spacing; // top + bottom
}

export interface MarginProps {
  m?: Spacing; // all sides
  mb?: Spacing; // bottom only
  ml?: Spacing; // left only
  mr?: Spacing; // right only
  mt?: Spacing; // top only
  mx?: Spacing; // left + right
  my?: Spacing; // top + bottom
}

export interface SpacingProps extends PaddingProps, MarginProps {}

// Extracts spacing props from a component's props
export function extractSpacingProps<T extends SpacingProps>(props: T) {
  const { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, ...rest } =
    props;

  const filterUndefined = (obj: Record<string, Spacing | undefined>) =>
    Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v !== undefined)
    ) as Partial<SpacingProps>;

  const padding = filterUndefined({ p, px, py, pt, pr, pb, pl });
  const margin = filterUndefined({ m, mx, my, mt, mr, mb, ml });
  const spacing = { ...padding, ...margin };
  return { padding, margin, spacing, nonSpacing: rest as T };
}

// spacing classes
export function getSpacingClasses(props: SpacingProps): string[] {
  return Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}-${value}`);
}
