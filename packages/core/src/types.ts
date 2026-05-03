export type Pattern = "dots" | "dots-x" | "paper-grid" | "stripes";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Spacing = "0" | Size;
export type Shadow = Omit<Size, "xl" | "xs">;
export type Radius = "sm" | "md" | "lg";

export interface Margin {
  bottom?: Spacing;
  left?: Spacing;
  right?: Spacing;
  top?: Spacing;
}

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
