/**
 * Interface für Notification-Service-Provider
 *
 * Bietet Services für Benachrichtigungen und Fehlerbehandlung.
 * Folgt dem Interface Segregation Principle.
 */
export interface INotificationServiceProvider {
  /**
   * Notification-Service
   */
  get notificationService(): any;

  /**
   * Error-Handler-Service
   */
  get errorHandler(): any;

  /**
   * Logger-Service
   */
  get logger(): any;
}
