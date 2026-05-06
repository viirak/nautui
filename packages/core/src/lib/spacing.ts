import type { MarginProps, PaddingProps, Spacing } from "../types";

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
