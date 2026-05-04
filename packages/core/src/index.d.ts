import type { BoxProps } from "./components/Box.astro";
import type { ButtonProps } from "./components/Button.astro";
import type { ContainerProps } from "./components/Container.astro";
import type { GroupProps } from "./components/Group.astro";
import type { SectionProps } from "./components/Section.astro";
import type { ThemeProps } from "./components/Theme.astro";
import type { ThemeToggleProps } from "./components/ThemeToggle.astro";

export type AstroComponent = () => Promise<{ Content: unknown }>;

// Theme
export declare const Theme: (props: ThemeProps) => AstroComponent;
export declare const ThemeToggle: (props: ThemeToggleProps) => AstroComponent;

// Layout
export declare const Container: (props: ContainerProps) => AstroComponent;
export declare const Section: (props: SectionProps) => AstroComponent;
export declare const Box: (props: BoxProps) => AstroComponent;
export declare const Group: (props: GroupProps) => AstroComponent;

// Elements
export declare const Button: (props: ButtonProps) => AstroComponent;
