import type { IRelationshipGraphDemoService, IRelationshipGraphDataManager, IRelationshipGraphPersistenceService } from "../../interfaces";
// ✅ Services direkt importieren (zirkuläre Abhängigkeiten vermeiden)
import { RelationshipGraphDataManager } from "./RelationshipGraphDataManager";
import { RelationshipGraphPersistenceService } from "../../services/RelationshipGraphPersistenceService";

/**
 * RelationshipGraphDemoService - Verantwortlich für Demo Data Management
 * Single Responsibility: Nur Demo Data Management
 */
export class RelationshipGraphDemoService implements IRelationshipGraphDemoService {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "relationshipGraphDemoService";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "RelationshipGraphDemoService";
  static readonly DEPENDENCIES = [RelationshipGraphDataManager, RelationshipGraphPersistenceService]; // ✅ Dependencies explizit definiert

  constructor(
    private readonly dataManager: IRelationshipGraphDataManager,
    private readonly persistence: IRelationshipGraphPersistenceService
  ) {}

  // Demo Data Management
  async loadDemoData(demoData: { nodes: any[]; edges: any[] }): Promise<void> {
    if (!this.validateDemoData(demoData)) {
      throw new Error("Invalid demo data");
    }

    const sanitizedData = this.sanitizeDemoData(demoData);

    // Konvertiere Demo-Daten zu Cytoscape-Format
    const nodes = sanitizedData.nodes.map((node) => ({
      data: {
        id: node.id,
        label: node.label?.value || "",
        type: node.type?.value || "",
        x: node.x,
        y: node.y,
        permissions: node.globalPermissions,
        descriptions: node.descriptions,
        playerRelationshipEffects: node.playerRelationshipEffects,
        image: node.image,
        zIndex: node.zIndex,
        ...node.cytoScapeAttributes,
      },
      position: {
        x: node.x,
        y: node.y,
      },
    }));

    const edges = sanitizedData.edges.map((edge) => ({
      data: {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label?.value || "",
        type: edge.type,
        permissions: edge.globalPermissions,
        connectionCategory: edge.connectionCategory,
        zIndex: edge.zIndex,
        ...edge.cytoScapeAttributes,
      },
    }));

    this.dataManager.setNodes(nodes);
    this.dataManager.setEdges(edges);
  }

  createDefaultDemoData(): { nodes: any[]; edges: any[] } {
    return {
      nodes: [
        {
          id: "character1",
          label: { value: "Alice" },
          type: { value: "character" },
          x: 100,
          y: 100,
          globalPermissions: { defaultLevel: 0, users: [] },
          descriptions: {},
          playerRelationshipEffects: {},
          image: "",
          zIndex: 1,
          cytoScapeAttributes: {},
        },
        {
          id: "character2",
          label: { value: "Bob" },
          type: { value: "character" },
          x: 300,
          y: 100,
          globalPermissions: { defaultLevel: 0, users: [] },
          descriptions: {},
          playerRelationshipEffects: {},
          image: "",
          zIndex: 1,
          cytoScapeAttributes: {},
        },
        {
          id: "location1",
          label: { value: "Tavern" },
          type: { value: "location" },
          x: 200,
          y: 250,
          globalPermissions: { defaultLevel: 0, users: [] },
          descriptions: {},
          playerRelationshipEffects: {},
          image: "",
          zIndex: 1,
          cytoScapeAttributes: {},
        },
      ],
      edges: [
        {
          id: "edge1",
          source: "character1",
          target: "character2",
          label: { value: "Friends" },
          type: "ally",
          globalPermissions: { defaultLevel: 0, users: [] },
          connectionCategory: "personal",
          zIndex: 1,
          cytoScapeAttributes: {},
        },
        {
          id: "edge2",
          source: "character1",
          target: "location1",
          label: { value: "Visits" },
          type: "visits",
          globalPermissions: { defaultLevel: 0, users: [] },
          connectionCategory: "location",
          zIndex: 1,
          cytoScapeAttributes: {},
        },
      ],
    };
  }

  async clearDemoData(): Promise<void> {
    this.dataManager.setNodes([]);
    this.dataManager.setEdges([]);
  }

  // Demo Data Validation
  validateDemoData(demoData: { nodes: any[]; edges: any[] }): boolean {
    if (!demoData || !Array.isArray(demoData.nodes) || !Array.isArray(demoData.edges)) {
      return false;
    }

    // Validate nodes
    for (const node of demoData.nodes) {
      if (!node.id || typeof node.id !== "string") {
        return false;
      }
    }

    // Validate edges
    for (const edge of demoData.edges) {
      if (!edge.id || !edge.source || !edge.target) {
        return false;
      }
    }

    return true;
  }

  sanitizeDemoData(demoData: { nodes: any[]; edges: any[] }): { nodes: any[]; edges: any[] } {
    return {
      nodes: demoData.nodes.map((node) => ({
        id: String(node.id || ""),
        label: node.label || { value: "" },
        type: node.type || { value: "default" },
        x: Number(node.x || 0),
        y: Number(node.y || 0),
        globalPermissions: node.globalPermissions || { defaultLevel: 0, users: [] },
        descriptions: node.descriptions || {},
        playerRelationshipEffects: node.playerRelationshipEffects || {},
        image: String(node.image || ""),
        zIndex: Number(node.zIndex || 1),
        cytoScapeAttributes: node.cytoScapeAttributes || {},
      })),
      edges: demoData.edges.map((edge) => ({
        id: String(edge.id || ""),
        source: String(edge.source || ""),
        target: String(edge.target || ""),
        label: edge.label || { value: "" },
        type: String(edge.type || "default"),
        globalPermissions: edge.globalPermissions || { defaultLevel: 0, users: [] },
        connectionCategory: String(edge.connectionCategory || "default"),
        zIndex: Number(edge.zIndex || 1),
        cytoScapeAttributes: edge.cytoScapeAttributes || {},
      })),
    };
  }
}
