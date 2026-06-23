import type { DocLayoutProps } from "./components/DocLayout.astro";
import type { SectionHeroProps } from "./components/SectionHero.astro";

export type AstroComponent = () => Promise<{ Content: unknown }>;

// Layout
export declare const DocLayout: (props: DocLayoutProps) => AstroComponent;

// UI
export declare const SectionHero: (props: SectionHeroProps) => AstroComponent;
