export interface IServiceManager {
  // Generic service retrieval
  getService<T>(serviceIdentifier: any, cacheKey?: any, ...args: any[]): T;

  // Service resolution (for singletons)
  resolve<T>(serviceIdentifier: any): T;

  // Service availability check
  hasService(serviceIdentifier: any): boolean;

  // Disposal methods
  disposeService(serviceIdentifier: any, cacheKey?: any): void;
  disposeAll(): void;
}
