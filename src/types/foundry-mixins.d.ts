declare module "fvtt-types/src/foundry/common/types.d.mts" {
  export type AnyObject = Record<string, unknown>;
  export type ConstructorOf<T> = new (...args: any[]) => T;
  export type DeepPartial<T> = { [P in keyof T]?: T[P] };
  export type Mixin<C, B> = C & B;
}

declare module "@league-of-foundry-developers/foundry-vtt-types/src/foundry/client-esm/applications/api/application.d.mts" {
  import { ApplicationV2 } from "foundry/applications/api";
  export default ApplicationV2;
}

declare module "@league-of-foundry-developers/foundry-vtt-types/src/foundry/client-esm/applications/api/handlebars-application.d.mts" {
  import { HandlebarsApplicationMixin } from "foundry/applications/api";
  export default HandlebarsApplicationMixin;
}
