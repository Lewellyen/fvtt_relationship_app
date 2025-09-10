/**
 * Interface für Application-Dependencies
 *
 * Definiert explizit, welche Services eine Application benötigt.
 * Folgt dem Dependency Inversion Principle.
 */
export interface IApplicationDependencies {
  svelteManager: any;
  cssManager: any;
  serviceLocator: any;
  notificationService: any;
  errorHandler: any;
  foundryAdapter: any;
  logger: any;
}
