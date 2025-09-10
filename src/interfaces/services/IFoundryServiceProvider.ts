/**
 * Interface für Foundry-Service-Provider
 *
 * Bietet Services für Foundry VTT Integration.
 * Folgt dem Interface Segregation Principle.
 */
export interface IFoundryServiceProvider {
  /**
   * Foundry-Adapter-Service
   */
  get foundryAdapter(): any;

  /**
   * Logger-Service
   */
  get logger(): any;
}
