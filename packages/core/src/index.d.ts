import type { ButtonProps } from "./components/Button.astro";
import type { ThemeProps } from "./components/Theme.astro";
import type { ThemeToggleProps } from "./components/ThemeToggle.astro";

export type AstroComponent = () => Promise<{ Content: unknown }>;

// Theme
export declare const Theme: (props: ThemeProps) => AstroComponent;
export declare const ThemeToggle: (props: ThemeToggleProps) => AstroComponent;

// Elements
export declare const Button: (props: ButtonProps) => AstroComponent;
