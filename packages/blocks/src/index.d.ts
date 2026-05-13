import type { SectionHeroProps } from "./components/SectionHero.astro";

export type AstroComponent = () => Promise<{ Content: unknown }>;

// UI
export declare const SectionHero: (props: SectionHeroProps) => AstroComponent;
