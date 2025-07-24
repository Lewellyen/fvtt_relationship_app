export interface IServiceManager {
  // Generic service retrieval
  getService<T>(serviceIdentifier: string, cacheKey?: any, ...args: any[]): T;

  // Disposal methods
  disposeService(serviceIdentifier: string, cacheKey?: any): void;
  disposeAll(): void;
}
