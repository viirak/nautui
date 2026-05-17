export type Size = "sm" | "md" | "lg" | "xl";
export type Gap = Size;
export type Shadow = Size;
export type Radius = Size;
export type Responsive = "base" | Size;

// export type DisplaySize = "display" | "display-lg" | "display-xl";

export type Pattern = "dots" | "dots-x" | "grid" | "stripes";

export interface Base {
  class?: string;
  [key: string]: unknown; // for the ...rest prop
}
