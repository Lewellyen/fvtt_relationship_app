import type { IRelationshipGraphDataManager } from "../../interfaces";

/**
 * RelationshipGraphDataManager - Verantwortlich für Data Management
 * Single Responsibility: Nur Data Management und Access
 */
export class RelationshipGraphDataManager implements IRelationshipGraphDataManager {
  // ✅ Metadaten für Service Registration
  static readonly API_NAME = "relationshipGraphDataManager";
  static readonly SERVICE_TYPE = "singleton" as const;
  static readonly CLASS_NAME = "RelationshipGraphDataManager";

  private elements: any = { nodes: [], edges: [] };

  // Data Access
  getElements(): any {
    return this.elements;
  }

  getNodes(): any[] {
    return this.elements.nodes || [];
  }

  getEdges(): any[] {
    return this.elements.edges || [];
  }

  findNodeById(id: string): any {
    return this.elements.nodes?.find((node: any) => node.data.id === id);
  }

  findEdgesBySource(sourceId: string): any[] {
    return this.elements.edges?.filter((edge: any) => edge.data.source === sourceId) || [];
  }

  findEdgesByTarget(targetId: string): any[] {
    return this.elements.edges?.filter((edge: any) => edge.data.target === targetId) || [];
  }

  // Filter Methods
  filterNodesByType(type: string): any[] {
    return this.elements.nodes?.filter((node: any) => node.data.type === type) || [];
  }

  filterEdgesByType(type: string): any[] {
    return this.elements.edges?.filter((edge: any) => edge.data.type === type) || [];
  }

  // Data Management
  setElements(elements: any): void {
    this.elements = elements;
  }

  setNodes(nodes: any[]): void {
    this.elements.nodes = nodes;
  }

  setEdges(edges: any[]): void {
    this.elements.edges = edges;
  }

  // Search Operations
  searchNodes(query: string): any[] {
    const lowerQuery = query.toLowerCase();
    return (
      this.elements.nodes?.filter(
        (node: any) =>
          node.data.label?.toLowerCase().includes(lowerQuery) ||
          node.data.type?.toLowerCase().includes(lowerQuery)
      ) || []
    );
  }

  searchEdges(query: string): any[] {
    const lowerQuery = query.toLowerCase();
    return (
      this.elements.edges?.filter(
        (edge: any) =>
          edge.data.label?.toLowerCase().includes(lowerQuery) ||
          edge.data.type?.toLowerCase().includes(lowerQuery)
      ) || []
    );
  }
}
