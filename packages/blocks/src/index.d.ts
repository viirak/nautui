import type { BackgroundGradientProps } from "./components/backgrounds/BackgroundGradient.astro";
import type { SectionHeroProps } from "./components/SectionHero.astro";

export type AstroComponent = () => Promise<{ Content: unknown }>;

// Background
export declare const BackgroundGradient: (
  props: BackgroundGradientProps
) => AstroComponent;

// UI
export declare const SectionHero: (props: SectionHeroProps) => AstroComponent;
