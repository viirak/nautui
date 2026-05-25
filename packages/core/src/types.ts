export type Size = "sm" | "md" | "lg" | "xl";
export type Gap = Size;
export type Shadow = Size;
export type Radius = Size;
export type Responsive = "base" | Size;

export interface Base {
  class?: string;
  [key: string]: unknown; // for the ...rest prop
}
