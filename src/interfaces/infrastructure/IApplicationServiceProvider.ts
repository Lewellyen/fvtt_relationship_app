/**
 * Interface für Application-Service-Provider
 *
 * Bietet spezifische Services für Applications.
 * Folgt dem Interface Segregation Principle.
 */
export interface IApplicationServiceProvider {
  /**
   * Svelte-Management-Service
   */
  get svelteManager(): any;

  /**
   * CSS-Management-Service
   */
  get cssManager(): any;

  /**
   * Service-Locator
   */
  get serviceLocator(): any;

  /**
   * Logger-Service
   */
  get logger(): any;
}
