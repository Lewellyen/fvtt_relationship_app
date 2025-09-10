// Script to update all services with DEPENDENCIES and remove @Inject decorators

const fs = require('fs');
const path = require('path');

// Service dependencies mapping
const serviceDependencies = {
  'RelationshipGraphCRUDService': ['RelationshipGraphDataManager', 'RelationshipGraphPersistenceService', 'FoundryAdapter'],
  'RelationshipGraphDemoService': ['RelationshipGraphDataManager', 'RelationshipGraphPersistenceService'],
  'RelationshipGraphDemoDataService': ['FoundryAdapter'],
  'RelationshipGraphPersistenceService': ['FoundryAdapter'],
  'RegistrationService': ['FoundryLogger', 'ConsoleErrorHandler'],
  'ModuleInitializer': ['FoundryLogger', 'ConsoleErrorHandler', 'RegistrationService']
};

// Files to update
const filesToUpdate = [
  'src/core/services/RelationshipGraphCRUDService.ts',
  'src/core/services/RelationshipGraphDemoService.ts',
  'src/services/RelationshipGraphDemoDataService.ts',
  'src/services/RelationshipGraphPersistenceService.ts',
  'src/services/RegistrationService.ts',
  'src/core/services/ModuleInitializer.ts'
];

function updateService(filePath) {
  const className = path.basename(filePath, '.ts');
  const dependencies = serviceDependencies[className] || [];
  
  if (dependencies.length === 0) {
    console.log(`Skipping ${className} - no dependencies`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add DEPENDENCIES static property
  const dependenciesArray = dependencies.map(dep => dep).join(', ');
  const dependenciesLine = `  static readonly DEPENDENCIES = [${dependenciesArray}]; // ✅ Dependencies explizit definiert`;
  
  // Find the CLASS_NAME line and add DEPENDENCIES after it
  const classnameRegex = /static readonly CLASS_NAME = "[^"]+";/;
  if (classnameRegex.test(content)) {
    content = content.replace(classnameRegex, (match) => {
      return match + '\n  ' + dependenciesLine;
    });
  }
  
  // Remove @Inject decorators from constructor parameters
  content = content.replace(/@Inject\([^)]+\)\s*/g, '');
  
  // Remove @Inject import
  content = content.replace(/import { Inject } from "[^"]+";\n?/g, '');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${className} with dependencies: [${dependenciesArray}]`);
}

// Update all files
filesToUpdate.forEach(updateService);

console.log('All services updated!');
