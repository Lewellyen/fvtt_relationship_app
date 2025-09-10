import type { IRelationshipGraphDemoDataService } from "./IRelationshipGraphDemoDataService";
import type { IRelationshipGraphService } from "./IRelationshipGraphService";
import type { IFoundryAdapter } from "../core/adapters/IFoundryAdapter";
// ✅ Services direkt importieren (zirkuläre Abhängigkeiten vermeiden)
import { FoundryAdapter } from "../core/adapters/FoundryAdapter";

export class RelationshipGraphDemoDataService implements IRelationshipGraphDemoDataService {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = "demoDataService";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "RelationshipGraphDemoDataService";
  static readonly DEPENDENCIES = [FoundryAdapter]; // ✅ Dependencies explizit definiert

  constructor(private foundryAdapter: IFoundryAdapter) {}

  getDemoData(): { nodes: any[]; edges: any[] } {
    const node1Id = this.foundryAdapter.generateId();
    const node2Id = this.foundryAdapter.generateId();

    // Direkt minimale Cytoscape-Daten erstellen
    const nodes = [
      {
        data: {
          id: node1Id,
          label: "Bauer",
        },
        position: {
          x: 100,
          y: 100,
        },
      },
      {
        data: {
          id: node2Id,
          label: "Müller",
        },
        position: {
          x: 300,
          y: 100,
        },
      },
    ];

    const edges = [
      {
        data: {
          id: this.foundryAdapter.generateId(),
          source: node1Id,
          target: node2Id,
          label: "Weizen",
        },
      },
    ];

    return { nodes, edges };
  }

  async createDemoData(service: IRelationshipGraphService): Promise<void> {
    const demoData = this.getDemoData();

    // Speichere elements und style direkt in das Journal Entry
    if (service.getDocument()) {
      // ✅ Verwende den neuen Wrapper mit automatischem Reload
      await this.foundryAdapter.updateDocumentWithReload(service.getDocument(), {
        "system.elements": demoData,
        "system.style": [],
      });
    }
  }

  // Demo Data Templates
  createSimpleDemo(): { nodes: any[]; edges: any[] } {
    const node1Id = this.foundryAdapter.generateId();
    const node2Id = this.foundryAdapter.generateId();

    const nodes = [
      {
        data: {
          id: node1Id,
          label: "Node 1",
        },
        position: {
          x: 100,
          y: 100,
        },
      },
      {
        data: {
          id: node2Id,
          label: "Node 2",
        },
        position: {
          x: 300,
          y: 100,
        },
      },
    ];

    const edges = [
      {
        data: {
          id: this.foundryAdapter.generateId(),
          source: node1Id,
          target: node2Id,
          label: "Connection",
        },
      },
    ];

    return { nodes, edges };
  }

  createComplexDemo(): { nodes: any[]; edges: any[] } {
    const nodes = Array.from({ length: 10 }, (_, i) => {
      const nodeId = this.foundryAdapter.generateId();
      return {
        data: {
          id: nodeId,
          label: `Complex Node ${i + 1}`,
        },
        position: {
          x: 100 + i * 80,
          y: 100 + i * 60,
        },
      };
    });

    const edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        data: {
          id: this.foundryAdapter.generateId(),
          source: nodes[i].data.id,
          target: nodes[i + 1].data.id,
          label: `Edge ${i + 1}`,
        },
      });
    }

    return { nodes, edges };
  }

  createCharacterDemo(): { nodes: any[]; edges: any[] } {
    const heroId = this.foundryAdapter.generateId();
    const villainId = this.foundryAdapter.generateId();
    const allyId = this.foundryAdapter.generateId();

    const nodes = [
      {
        data: {
          id: heroId,
          label: "Hero",
        },
        position: {
          x: 200,
          y: 200,
        },
      },
      {
        data: {
          id: villainId,
          label: "Villain",
        },
        position: {
          x: 400,
          y: 150,
        },
      },
      {
        data: {
          id: allyId,
          label: "Ally",
        },
        position: {
          x: 300,
          y: 300,
        },
      },
    ];

    const edges = [
      {
        data: {
          id: this.foundryAdapter.generateId(),
          source: heroId,
          target: villainId,
          label: "Fights",
        },
      },
      {
        data: {
          id: this.foundryAdapter.generateId(),
          source: heroId,
          target: allyId,
          label: "Helps",
        },
      },
    ];

    return { nodes, edges };
  }

  createWorldDemo(): { nodes: any[]; edges: any[] } {
    const cityId = this.foundryAdapter.generateId();
    const villageId = this.foundryAdapter.generateId();
    const fortressId = this.foundryAdapter.generateId();

    const nodes = [
      {
        data: {
          id: cityId,
          label: "Capital City",
        },
        position: {
          x: 300,
          y: 200,
        },
      },
      {
        data: {
          id: villageId,
          label: "Forest Village",
        },
        position: {
          x: 100,
          y: 100,
        },
      },
      {
        data: {
          id: fortressId,
          label: "Mountain Fortress",
        },
        position: {
          x: 500,
          y: 300,
        },
      },
    ];

    const edges = [
      {
        data: {
          id: this.foundryAdapter.generateId(),
          source: cityId,
          target: villageId,
          label: "Trade Route",
        },
      },
      {
        data: {
          id: this.foundryAdapter.generateId(),
          source: cityId,
          target: fortressId,
          label: "Military Road",
        },
      },
    ];

    return { nodes, edges };
  }

  // Demo Data Management
  async clearDemoData(service: IRelationshipGraphService): Promise<void> {
    // Lösche alle Elements und Style aus dem Journal Entry
    if (service.getDocument()) {
      await this.foundryAdapter.updateDocument(service.getDocument(), {
        "system.elements": { nodes: [], edges: [] },
        "system.style": [],
      });
    }
  }

  hasDemoData(service: IRelationshipGraphService): boolean {
    const document = service.getDocument();
    if (!document) return false;

    const elements = (document.system as any)?.elements;
    if (!elements) return false;

    return (
      (elements.nodes && elements.nodes.length > 0) || (elements.edges && elements.edges.length > 0)
    );
  }

  // Demo Data Configuration
  private currentTemplate: string = "simple";

  setDemoDataTemplate(template: "simple" | "complex" | "character" | "world"): void {
    this.currentTemplate = template;
  }

  getCurrentTemplate(): string {
    return this.currentTemplate;
  }

  // Cleanup
  cleanup(): void {
    // Reset to default template
    this.currentTemplate = "simple";
  }
}
