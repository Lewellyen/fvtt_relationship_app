import { mount, unmount } from "svelte";

/**
 * Service für Svelte-Komponenten-Mounting und -Unmounting.
 */
export class SvelteRendererService {
  /**
   * Mountet eine Svelte-Komponente mit Props in das Ziel-Element.
   */
  static mountComponent(
    component: any,
    target: Element,
    props: Record<string, any>,
  ): any {
    return mount(component, { target, props });
  }

  /**
   * Unmountet eine zuvor gemountete Svelte-Komponente.
   */
  static unmountComponent(instance: any): void {
    unmount(instance);
  }
}
