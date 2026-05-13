export type Pattern =
  | "dots"
  | "dots-x"
  | "paper-grid"
  | "stripes"
  | "mini-stripes";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Shadow = Omit<Size, "xl" | "xs">;
export type Radius = "sm" | "md" | "lg";
export type Spacing =
  | "0"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "display"
  | "display-lg"
  | "display-xl";

/** Flat padding shorthand props — mirrors CSS padding shorthands */
export interface PaddingProps {
  p?: Spacing; // all sides
  pb?: Spacing; // bottom only
  pl?: Spacing; // left only
  pr?: Spacing; // right only
  pt?: Spacing; // top only
  px?: Spacing; // left + right
  py?: Spacing; // top + bottom
}

/** Flat margin shorthand props — mirrors CSS margin shorthands */
export interface MarginProps {
  m?: Spacing; // all sides
  mb?: Spacing; // bottom only
  ml?: Spacing; // left only
  mr?: Spacing; // right only
  mt?: Spacing; // top only
  mx?: Spacing; // left + right
  my?: Spacing; // top + bottom
}

/** Full spacing props (padding + margin) for layout components */
export interface SpacingProps extends PaddingProps, MarginProps {}

export interface Border {
  bottom: boolean;
  left: boolean;
  right: boolean;
  top: boolean;
}

export interface Base {
  class?: string;
  [key: string]: unknown; // for the ...rest prop
}
