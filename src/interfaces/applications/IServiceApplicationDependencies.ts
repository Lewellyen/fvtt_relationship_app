/**
 * Dependencies für Service-basierte Applications
 *
 * Enthält Services für Service-Resolution und Foundry-Integration.
 */
export interface IServiceApplicationDependencies {
  serviceLocator: any;
  foundryAdapter: any;
  logger: any;
}
