// Main Interface Barrel Export
// Re-exports all interfaces from subdirectories

// Core Interfaces
export type { ILogger } from './core/ILogger';
export type { IErrorHandler } from './core/IErrorHandler';
export type { IModuleInitializer } from './core/IModuleInitializer';
export type { ICSSManager } from './core/ICSSManager';
export type { ISvelteManager } from './core/ISvelteManager';

// Service Interfaces
export type { INotificationService } from './services/INotificationService';
export type { INotificationServiceProvider } from './services/INotificationServiceProvider';
export type { IFoundryServiceProvider } from './services/IFoundryServiceProvider';

// Application Interfaces
export type { IApplicationDependencies } from './applications/IApplicationDependencies';
export type { IBaseApplicationDependencies } from './applications/IBaseApplicationDependencies';
export type { INotificationApplicationDependencies } from './applications/INotificationApplicationDependencies';
export type { IServiceApplicationDependencies } from './applications/IServiceApplicationDependencies';
export type { ISvelteApplicationDependencies } from './applications/ISvelteApplicationDependencies';

// Infrastructure Interfaces
export type { IServiceContainer } from './services/IServiceContainer';
export type { IServiceRegistry } from './services/IServiceRegistry';
export type { IServicePlanner } from './infrastructure/IServicePlanner';
export type { IServiceRegistrar } from './infrastructure/IServiceRegistrar';
export type { IServiceValidator } from './infrastructure/IServiceValidator';
export type { IAPIManager } from './infrastructure/IAPIManager';
export type { IDependencyMapper } from './infrastructure/IDependencyMapper';
export type { IRegistrationService } from './infrastructure/IRegistrationService';
export type { IAnalysisGraphService } from './infrastructure/IAnalysisGraphService';
export type { IEditableGraphService } from './infrastructure/IEditableGraphService';
export type { IReadOnlyGraphService } from './infrastructure/IReadOnlyGraphService';
