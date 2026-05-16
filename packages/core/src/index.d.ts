import type { BackgroundProps } from "./components/Background.astro";
import type { BadgeProps } from "./components/Badge.astro";
import type { BoxProps } from "./components/Box.astro";
import type { BreadcrumbProps } from "./components/Breadcrumb.astro";
import type { ButtonProps } from "./components/Button.astro";
import type { CardProps } from "./components/Card.astro";
import type { ContainerProps } from "./components/Container.astro";
import type { DividerProps } from "./components/Divider.astro";
import type { DrawerProps } from "./components/Drawer.astro";
import type { FlowProps } from "./components/Flow.astro";
import type { GridProps } from "./components/Grid.astro";
import type { GridItemProps } from "./components/GridItem.astro";
import type { GroupProps } from "./components/Group.astro";
import type { ImageProps } from "./components/Image.astro";
import type { LinkProps } from "./components/Link.astro";
import type { ListProps } from "./components/List.astro";
import type { ListItemProps } from "./components/ListItem.astro";
import type { MarkProps } from "./components/Mark.astro";
import type { MarqueeProps } from "./components/Marquee.astro";
import type { MasonryProps } from "./components/Masonry.astro";
import type { MasonryItemProps } from "./components/MasonryItem.astro";
import type { NavBarProps } from "./components/NavBar.astro";
import type { SectionProps } from "./components/Section.astro";
import type { TextProps } from "./components/Text.astro";
import type { ThemeProps } from "./components/Theme.astro";
import type { ThemeToggleProps } from "./components/ThemeToggle.astro";
import type { TitleProps } from "./components/Title.astro";

export type AstroComponent = () => Promise<{ Content: unknown }>;

// Theme
export declare const Theme: (props: ThemeProps) => AstroComponent;
export declare const ThemeToggle: (props: ThemeToggleProps) => AstroComponent;

// Layout
export declare const Container: (props: ContainerProps) => AstroComponent;
export declare const Section: (props: SectionProps) => AstroComponent;
export declare const Box: (props: BoxProps) => AstroComponent;
export declare const Group: (props: GroupProps) => AstroComponent;
export declare const Grid: (props: GridProps) => AstroComponent;
export declare const GridItem: (props: GridItemProps) => AstroComponent;
export declare const Marquee: (props: MarqueeProps) => AstroComponent;
export declare const Masonry: (props: MasonryProps) => AstroComponent;
export declare const MasonryItem: (props: MasonryItemProps) => AstroComponent;
export declare const Flow: (props: FlowProps) => AstroComponent;

// Typography
export declare const Text: (props: TextProps) => AstroComponent;
export declare const Title: (props: TitleProps) => AstroComponent;
export declare const Link: (props: LinkProps) => AstroComponent;
export declare const Mark: (props: MarkProps) => AstroComponent;
export declare const List: (props: ListProps) => AstroComponent;
export declare const ListItem: (props: ListItemProps) => AstroComponent;

// UI
export declare const Button: (props: ButtonProps) => AstroComponent;
export declare const Badge: (props: BadgeProps) => AstroComponent;
export declare const Card: (props: CardProps) => AstroComponent;
export declare const Divider: (props: DividerProps) => AstroComponent;
export declare const Image: (props: ImageProps) => AstroComponent;
export declare const Background: (props: BackgroundProps) => AstroComponent;

// Navigation
export declare const Breadcrumb: (props: BreadcrumbProps) => AstroComponent;
export declare const Drawer: (props: DrawerProps) => AstroComponent;
export declare const NavBar: (props: NavBarProps) => AstroComponent;
