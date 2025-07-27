# Relationship App

A Foundry VTT module for creating and managing relationship graphs between actors and other entities. Built with **Svelte 5**, Flowbite, and Tailwind CSS for a modern, reactive user experience.

## Features

- **Interactive Relationship Graphs**: Create and visualize relationships between characters, locations, items, and organizations
- **Modern UI**: Built with Svelte 5 for reactivity and Flowbite for beautiful components
- **SOLID Architecture**: Clean, maintainable code following SOLID principles
- **Foundry Integration**: Seamless integration with Foundry VTT's journal system
- **Dark Mode Support**: Automatically adapts to Foundry's theme
- **Export/Import**: Save and load relationship graphs as JSON files
- **Real-time Updates**: Reactive UI updates without page refreshes

## Technology Stack

- **Frontend**: Svelte 5 for reactivity, Flowbite for UI components
- **Styling**: Tailwind CSS with Foundry-compatible theming
- **Graph Visualization**: Cytoscape.js for interactive graph rendering
- **Architecture**: SOLID principles with dependency injection
- **Build Tool**: Vite for fast development and optimized builds

## Installation

1. Download the module files
2. Place them in your Foundry VTT `modules` directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the module:
   ```bash
   npm run build
   ```
5. Enable the module in Foundry VTT

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Commands

```bash
# Start development build with watch mode
npm run dev

# Build for production
npm run build

# Run all checks (lint, type-check, build)
npm run check-all

# Run linter
npm run lint

# Run type checker
npm run type-check

# Format code
npm run format

# Run tests
npm run test
```

## Architecture

### SOLID Principles

The module follows SOLID principles:

- **Single Responsibility**: Each service has one clear purpose
- **Open/Closed**: Services are open for extension, closed for modification
- **Liskov Substitution**: Interfaces can be implemented by different classes
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: High-level modules don't depend on low-level modules

### Service Layer

- **RelationshipGraphService**: Main business logic coordinator
- **RelationshipGraphPersistenceService**: Foundry document persistence
- **RelationshipGraphValidationService**: Data validation
- **RelationshipGraphCytoscapeService**: Graph visualization
- **RelationshipGraphDemoDataService**: Provides demo graph data
- **ServiceFactory**: Dependency injection container

### Svelte Integration

- **Reactive Stores**: Graph data and UI state management
- **Component System**: Modular, reusable components
- **Event Handling**: Declarative event management
- **Foundry Integration**: Seamless integration with Foundry's document system

## Usage

### Creating a Relationship Graph

1. Create a new Journal Entry in Foundry VTT
2. Add a new page with the "Relationship Graph" type
3. Use the toolbar to add nodes (characters, locations, etc.)
4. Connect nodes with edges to show relationships
5. Customize colors, labels, and properties

### Node Types

- **Character**: People, NPCs, players
- **Location**: Places, cities, dungeons
- **Item**: Objects, weapons, artifacts
- **Organization**: Groups, factions, guilds

### Edge Types

- **Ally**: Friendly relationships
- **Foe**: Hostile relationships
- **Family**: Family connections
- **Romance**: Romantic relationships
- **Business**: Professional relationships

## Configuration

### Foundry Integration

The module automatically integrates with Foundry's:

- Journal Entry system
- Permission system
- Theme system (light/dark mode)
- Localization system

### Customization

You can customize the appearance by modifying the CSS variables in `styles/tailwind.css`:

```css
:root {
  --primary-color: #0d6efd;
  --background-color: #f8f9fa;
  --font-color: #212529;
  /* ... more variables */
}
```

## API Reference

### Svelte Components

#### relationshipGraphComponent(document)

Main component for the relationship graph interface.

**Properties:**

- `graphStore`: Reactive graph data store
- `uiStore`: Reactive UI state store
- `graphService`: Business logic service

**Methods:**

- `addNode()`: Add a new node
- `removeNode(nodeId)`: Remove a node
- `addEdge()`: Add a new edge
- `removeEdge(sourceId, targetId)`: Remove an edge
- `exportGraph()`: Export graph data
- `importGraph(file)`: Import graph data

### Services

#### RelationshipGraphService

Main service for graph operations.

```typescript
interface IRelationshipGraphService {
  loadGraphData(): Promise<RelationshipGraphData>;
  saveGraphData(data: RelationshipGraphData): Promise<void>;
  addNode(node: any): Promise<void>;
  removeNode(nodeId: string): Promise<void>;
  // ... more methods
}
```
Additional interfaces such as `IRelationshipGraphPersistenceService`,
`IRelationshipGraphValidationService`, and `IRelationshipGraphDemoDataService` keep persistence, validation, and demo data concerns
separate from the main service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run check-all` to ensure code quality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### v0.3.1

- Complete migration to Alpine.js and Flowbite
- SOLID architecture implementation
- Modern UI with Tailwind CSS
- Improved performance and reactivity
- Better Foundry integration

### v0.3.0

- Initial Alpine.js integration
- Flowbite component library
- Service layer refactoring

### v0.2.0

- Basic relationship graph functionality
- Cytoscape.js integration
- Foundry VTT compatibility

### v0.1.0

- Initial release
- Basic graph visualization
- Journal entry integration
