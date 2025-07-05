import type {
  AnyObject,
  ConstructorOf,
  DeepPartial,
  Mixin,
} from "fvtt-types/src/foundry/common/types.d.mts";
import type ApplicationV2 from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/client-esm/applications/api/application.d.mts";

import { SvelteRendererService } from "@/services/SvelteRendererService";

function SvelteApplicationMixin<
  ActorType = any,
  DataModelType = any,
  BaseClass extends ConstructorOf<
    ApplicationV2<ActorType, DataModelType, ApplicationV2.RenderOptions>
  > = ConstructorOf<
    ApplicationV2<ActorType, DataModelType, ApplicationV2.RenderOptions>
  >,
>(BaseApplication: BaseClass) {
  class SvelteApplication<
    BaseClassI extends ConstructorOf<
      ApplicationV2<ActorType, DataModelType, ApplicationV2.RenderOptions>
    > = BaseClass,
    RenderOptions extends
      ApplicationV2.RenderOptions = ApplicationV2.RenderOptions,
    RenderContext extends AnyObject = AnyObject,
  > extends BaseApplication {
    declare props: Record<string, any>;

    #componentInstance: Record<string, any> | null = null;

    #svelteData: SvelteApplicationSvelteOptions;

    constructor(...args: any[]) {
      // Determine document and configuration object
      super(...args);
      const document = args[0];
      const config: Configuration =
        (args[1] as Configuration) || (this.constructor as any).DEFAULT_OPTIONS;
      // Separate Svelte metadata from Foundry options
      const { svelte, ...appOptions } = config;
      // Initialize Foundry Application with data and options
      // super(document, appOptions as any);
      // Validate Svelte configuration
      if (!svelte) throw new Error("No Svelte data found.");
      const { component, props } = svelte as any;
      if (!component) throw new Error("No Component Found.");
      // Store props and component info
      this.props = props;
      this.#svelteData = svelte;
    }

    protected async close(
      options: DeepPartial<SvelteApplicationMixin.ClosingOptions> = {},
    ): Promise<this> {
      // Destroy Component instance
      if (this.#componentInstance) {
        SvelteRendererService.unmountComponent(this.#componentInstance);
        this.#componentInstance = null;
      }

      options.animate = false;
      return super.close(options);
    }

    async _prepareContext(options: SvelteApplicationMixin.RenderOptions) {
      const context: Record<string, any> = {};
      return context;
    }

    async _renderHTML(
      context: RenderContext,

      options: DeepPartial<RenderOptions>,
    ): Promise<any> {
      // Update context for props

      return "";
    }

    _replaceHTML() {}

    async _renderFrame(options: SvelteApplicationMixin.RenderOptions) {
      const context = await this._prepareContext(options);
      const frame = await super._renderFrame(options);

      const target = (this as any).hasFrame
        ? frame.querySelector(".window-content")
        : frame;
      if (!target) return frame;

      const { component } = this.#svelteData ?? {};
      if (!component) return frame;

      target.innerHTML = "";
      let props = { ...this.props };
      if (context) {
        // Merge context properties into top-level props (flatten) instead of nesting
        props = { ...this.props, ...context };
      }
      this.#componentInstance = SvelteRendererService.mountComponent(
        component,
        target,
        props,
      );

      return frame;
    }
  }

  return SvelteApplication as Mixin<
    typeof SvelteApplication<BaseClass>,
    BaseClass
  >;
}

export type SvelteApplicationSvelteOptions = {
  component: any;
} & Record<string, unknown>;

export type Configuration = (
  | foundry.applications.api.ApplicationV2.Configuration
  | foundry.applications.api.DialogV2.Configuration
  | foundry.applications.api.DocumentSheetV2.Configuration<any>
) & {
  svelte: SvelteApplicationSvelteOptions;
};

declare namespace SvelteApplicationMixin {
  type RenderOptions = foundry.applications.api.ApplicationV2.RenderOptions;
  type ClosingOptions = foundry.applications.api.ApplicationV2.ClosingOptions;
}

export { SvelteApplicationMixin };
export default SvelteApplicationMixin;
