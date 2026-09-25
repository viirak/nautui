export type Size = "sm" | "md" | "lg" | "xl";
export type Gap = Size;
export type Shadow = Size;
export type Radius = Size;
export type Responsive = "base" | Size;
export type ResponsiveValue<T> = {
  [key in Responsive]?: T;
};
export type ResponsiveProp<T> = T | ResponsiveValue<T>;
export type Direction = "row" | "column" | "horizontal" | "vertical";
export type Align =
  | "inherit"
  | "start"
  | "center"
  | "end"
  | "baseline"
  | "stretch";
export type Justify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly"
  | "space-between"
  | "space-around"
  | "space-evenly";

export interface Base {
  class?: string;
  [key: string]: unknown; // for the ...rest prop
}
