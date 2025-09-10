// Main Interface Barrel Export
// Re-exports all interfaces from subdirectories

// Core Interfaces
export type { ILogger } from './core/ILogger';
export type { IErrorHandler } from './core/IErrorHandler';
export type { IModuleInitializer } from './core/IModuleInitializer';
export type { ICSSManager } from './core/ICSSManager';
export type { ISvelteManager } from './core/ISvelteManager';

// Service Interfaces
export type { IRelationshipGraphService } from './services/IRelationshipGraphService';
export type { IRelationshipGraphDataAccess } from './services/IRelationshipGraphDataAccess';
export type { IRelationshipGraphCRUD } from './services/IRelationshipGraphCRUD';
export type { IRelationshipGraphAnalysis } from './services/IRelationshipGraphAnalysis';
export type { IRelationshipGraphAnalysisService } from './services/IRelationshipGraphAnalysisService';
export type { IRelationshipGraphCRUDService } from './services/IRelationshipGraphCRUDService';
export type { IRelationshipGraphDataManager } from './services/IRelationshipGraphDataManager';
export type { IRelationshipGraphDemo } from './services/IRelationshipGraphDemo';
export type { IRelationshipGraphDemoService } from './services/IRelationshipGraphDemoService';
export type { IRelationshipGraphPersistence } from './services/IRelationshipGraphPersistence';
export type { INotificationService } from './services/INotificationService';
export type { IRelationshipGraphDemoDataService } from './services/IRelationshipGraphDemoDataService';
export type { IRelationshipGraphPersistenceService } from './services/IRelationshipGraphPersistenceService';
export type { INotificationServiceProvider } from './services/INotificationServiceProvider';
export type { IFoundryServiceProvider } from './services/IFoundryServiceProvider';

// Application Interfaces
export type { IApplicationDependencies } from './applications/IApplicationDependencies';
export type { IBaseApplicationDependencies } from './applications/IBaseApplicationDependencies';
export type { INotificationApplicationDependencies } from './applications/INotificationApplicationDependencies';
export type { IServiceApplicationDependencies } from './applications/IServiceApplicationDependencies';
export type { ISvelteApplicationDependencies } from './applications/ISvelteApplicationDependencies';

// Infrastructure Interfaces
export type { IServiceManager } from './services/IServiceManager';
export type { IServiceContainer } from './services/IServiceContainer';
export type { IServiceFactory } from './services/IServiceFactory';
export type { IServiceRegistry } from './services/IServiceRegistry';
export type { IServiceLocator } from './infrastructure/IServiceLocator';
export type { IServicePlanner } from './infrastructure/IServicePlanner';
export type { IServiceRegistrar } from './infrastructure/IServiceRegistrar';
export type { IServiceRegistrationManager } from './infrastructure/IServiceRegistrationManager';
export type { IServiceRegistrationStrategy } from './infrastructure/IServiceRegistrationStrategy';
export type { IServiceResolver } from './infrastructure/IServiceResolver';
export type { IServiceValidator } from './infrastructure/IServiceValidator';
export type { IAPIManager } from './infrastructure/IAPIManager';
export type { IAPIRegistrationService } from './infrastructure/IAPIRegistrationService';
export type { ICrossCuttingServiceManager } from './infrastructure/ICrossCuttingServiceManager';
export type { IDependencyMapper } from './infrastructure/IDependencyMapper';
export type { IRegistrationService } from './infrastructure/IRegistrationService';
export type { IAnalysisGraphService } from './infrastructure/IAnalysisGraphService';
export type { IEditableGraphService } from './infrastructure/IEditableGraphService';
export type { IReadOnlyGraphService } from './infrastructure/IReadOnlyGraphService';
