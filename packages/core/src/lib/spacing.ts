import type { MarginProps, PaddingProps } from "../types";

type SpacingProps = MarginProps & PaddingProps;

export function extractSpacingProps<T extends SpacingProps>(props: T) {
  const {
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    ...nonSpacingProps
  } = props;
  return {
    spacing: { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml },
    nonSpacing: nonSpacingProps as T,
  };
}

// spacing classes
export function createSpacingClasses(props: SpacingProps): string[] {
  return Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}-${value}`);
}
