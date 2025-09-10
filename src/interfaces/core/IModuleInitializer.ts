// Module Initializer interface
export interface IModuleInitializer {
  initialize(): Promise<void>;
}
