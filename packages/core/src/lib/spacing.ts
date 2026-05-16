import type { MarginProps, PaddingProps, Spacing } from "../types";

type SpacingProps = MarginProps & PaddingProps;

/** Priority: specific side > axis shorthand > all-sides shorthand */
function resolve(
  specific: Spacing | undefined,
  axis: Spacing | undefined,
  all: Spacing | undefined
): string | undefined {
  const val = specific ?? axis ?? all;
  if (val === undefined) {
    return;
  }
  if (val === "0") {
    return "0";
  }
  return `var(--naut-spacing-${val})`;
}

export interface ResolvedPadding {
  paddingBottom: string | undefined;
  paddingLeft: string | undefined;
  paddingRight: string | undefined;
  paddingTop: string | undefined;
}

export interface ResolvedMargin {
  marginBottom: string | undefined;
  marginLeft: string | undefined;
  marginRight: string | undefined;
  marginTop: string | undefined;
}

export function resolvePadding(props: PaddingProps): ResolvedPadding {
  return {
    paddingTop: resolve(props.pt, props.py, props.p),
    paddingRight: resolve(props.pr, props.px, props.p),
    paddingBottom: resolve(props.pb, props.py, props.p),
    paddingLeft: resolve(props.pl, props.px, props.p),
  };
}

export function resolveMargin(props: MarginProps): ResolvedMargin {
  return {
    marginTop: resolve(props.mt, props.my, props.m),
    marginRight: resolve(props.mr, props.mx, props.m),
    marginBottom: resolve(props.mb, props.my, props.m),
    marginLeft: resolve(props.ml, props.mx, props.m),
  };
}

export function createPadding(prefix: string, props: PaddingProps) {
  const padding = resolvePadding(props);
  return {
    [`${prefix}PaddingTop`]: padding.paddingTop,
    [`${prefix}PaddingRight`]: padding.paddingRight,
    [`${prefix}PaddingBottom`]: padding.paddingBottom,
    [`${prefix}PaddingLeft`]: padding.paddingLeft,
  };
}

export function createMargin(prefix: string, props: MarginProps) {
  const margin = resolveMargin(props);
  return {
    [`${prefix}MarginTop`]: margin.marginTop,
    [`${prefix}MarginRight`]: margin.marginRight,
    [`${prefix}MarginBottom`]: margin.marginBottom,
    [`${prefix}MarginLeft`]: margin.marginLeft,
  };
}

/**
 * Converts a ResolvedPadding / ResolvedMargin into an inline style string.
 * Only includes properties that were explicitly set.
 */
export function spacingToStyle(
  spacing: ResolvedPadding | ResolvedMargin
): string {
  return Object.entries(spacing)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => {
      // camelCase → kebab-case  (e.g. paddingTop → padding-top)
      const prop = k.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
      return `${prop}: ${v}`;
    })
    .join("; ");
}

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
