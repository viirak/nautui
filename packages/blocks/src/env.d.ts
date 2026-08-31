/// <reference types="astro/client" />

declare module "*.astro" {
  export type Props = Record<string, unknown>;
  export default class AstroComponent {}
}
