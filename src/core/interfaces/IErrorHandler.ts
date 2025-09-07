// Error Handler interface
export interface IErrorHandler {
  handle(error: any, context: string): void;
  handleAsync<T>(operation: () => Promise<T>, context: string): Promise<T>;
}
