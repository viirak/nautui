import type { BreadcrumbProps } from "./components/Breadcrumb.astro";
import type { DocLayoutProps } from "./components/DocLayout.astro";
import type { SectionHeroProps } from "./components/SectionHero.astro";
import type { MegaMenuProps } from "./components/MegaMenu.astro";
import type { MegaMenuItemProps } from "./components/MegaMenu.astro";
import type { TOCProps } from "./components/TOC.astro";

export type AstroComponent = () => Promise<{ Content: unknown }>;

// Layout
export declare const DocLayout: (props: DocLayoutProps) => AstroComponent;

// UI
export declare const Breadcrumb: (props: BreadcrumbProps) => AstroComponent;
export declare const MegaMenu: (props: MegaMenuProps) => AstroComponent;
export declare const MegaMenuItem: (props: MegaMenuItemProps) => AstroComponent;
export declare const SectionHero: (props: SectionHeroProps) => AstroComponent;
export declare const TOC: (props: TOCProps) => AstroComponent;
