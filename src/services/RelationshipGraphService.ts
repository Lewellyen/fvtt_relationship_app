import type { RelationshipGraphData } from "../global";
import type { IRelationshipGraphService } from "./IRelationshipGraphService";
import type { IRelationshipGraphPersistenceService } from "./IRelationshipGraphPersistenceService";
import type { IFoundryAdapter } from "../core/adapters/IFoundryAdapter";
import type { IRelationshipGraphDataManager } from "../interfaces/services/IRelationshipGraphDataManager";
import type { IRelationshipGraphCRUDService, IRelationshipGraphAnalysisService, IRelationshipGraphDemoService } from "../interfaces";
// ✅ Services direkt importieren (zirkuläre Abhängigkeiten vermeiden)
import { RelationshipGraphPersistenceService } from "./RelationshipGraphPersistenceService";
import { FoundryAdapter } from "../core/adapters/FoundryAdapter";
import { RelationshipGraphDataManager } from "../core/services/RelationshipGraphDataManager";
import { RelationshipGraphCRUDService } from "../core/services/RelationshipGraphCRUDService";
import { RelationshipGraphAnalysisService } from "../core/services/RelationshipGraphAnalysisService";
import { RelationshipGraphDemoService } from "../core/services/RelationshipGraphDemoService";
// Diese Interfaces werden nicht direkt verwendet, da sie über IRelationshipGraphService geerbt werden

export class RelationshipGraphService implements IRelationshipGraphService {
  // ✅ Metadaten direkt in der Klasse
  static readonly API_NAME = "createGraphService";
  static readonly SERVICE_TYPE = "factory" as const;
  static readonly CLASS_NAME = "RelationshipGraphService";
  static readonly DEPENDENCIES = [
    RelationshipGraphPersistenceService,
    FoundryAdapter,
    RelationshipGraphDataManager,
    RelationshipGraphCRUDService,
    RelationshipGraphAnalysisService,
    RelationshipGraphDemoService
  ]; // ✅ Dependencies explizit definiert
  private style: any[] = [];

  constructor(
    private document: any,
    private persistence: IRelationshipGraphPersistenceService,
    private foundryAdapter: IFoundryAdapter,
    private readonly dataManager: IRelationshipGraphDataManager,
    private readonly crudService: IRelationshipGraphCRUDService,
    private readonly analysisService: IRelationshipGraphAnalysisService,
    private readonly demoService: IRelationshipGraphDemoService
  ) {
    // Factory Service - data loading happens when document is provided
    // loadData() will be called externally when needed
  }

  // ✅ Delegation an DataManager
  getElements(): any {
    return this.dataManager.getElements();
  }

  getNodes(): any[] {
    return this.dataManager.getNodes();
  }

  getEdges(): any[] {
    return this.dataManager.getEdges();
  }

  // Document Access
  getDocument(): any {
    return this.document;
  }

  // ✅ Delegation an DataManager
  findNodeById(id: string): any {
    return this.dataManager.findNodeById(id);
  }

  findEdgesBySource(sourceId: string): any[] {
    return this.dataManager.findEdgesBySource(sourceId);
  }

  findEdgesByTarget(targetId: string): any[] {
    return this.dataManager.findEdgesByTarget(targetId);
  }

  filterNodesByType(type: string): any[] {
    return this.dataManager.filterNodesByType(type);
  }

  filterEdgesByType(type: string): any[] {
    return this.dataManager.filterEdgesByType(type);
  }

  getGraphData(): RelationshipGraphData {
    return {
      description: this.document?.description || "Neuer Beziehungsgraph",
      version: "1.0.0",
      created: this.document?.created || Date.now(),
      modified: this.document?.modified || Date.now(),
      elements: this.dataManager.getElements(),
      style: this.style,
    };
  }

  getNode(nodeId: string): any {
    return this.findNodeById(nodeId);
  }

  getEdge(edgeId: string): any {
    return this.dataManager.getEdges().find((e: any) => e.data.id === edgeId);
  }

  getNodeById(id: string): any {
    return this.findNodeById(id);
  }

  getEdgeById(id: string): any {
    return this.dataManager.getEdges().find((e: any) => e.data.id === id);
  }

  getNodeByLabel(label: string): any {
    return this.dataManager.getNodes().find((n: any) => n.data.label === label);
  }

  getEdgeByLabel(label: string): any {
    return this.dataManager.getEdges().find((e: any) => e.data.label === label);
  }

  getNodeByType(type: string): any {
    return this.dataManager.getNodes().find((n: any) => n.data.type === type);
  }

  getEdgeByType(type: string): any {
    return this.dataManager.getEdges().find((e: any) => e.data.type === type);
  }

  // ✅ Delegation an CRUDService
  async addNode(nodeData: any): Promise<void> {
    await this.crudService.addNode(nodeData);
    await this.saveData();
  }

  // ✅ Delegation an CRUDService
  async addEdge(edgeData: any): Promise<void> {
    await this.crudService.addEdge(edgeData);
    await this.saveData();
  }

  async updateNode(nodeId: string, updates: any): Promise<void> {
    await this.crudService.updateNode(nodeId, updates);
    await this.saveData();
  }

  async removeNode(nodeId: string): Promise<void> {
    await this.crudService.removeNode(nodeId);
    await this.saveData();
  }

  async updateEdge(edgeId: string, updates: any): Promise<void> {
    await this.crudService.updateEdge(edgeId, updates);
    await this.saveData();
  }

  async removeEdge(edgeId: string): Promise<void> {
    await this.crudService.removeEdge(edgeId);
    await this.saveData();
  }

  async moveNode(nodeId: string, x: number, y: number): Promise<void> {
    await this.crudService.moveNode(nodeId, x, y);
    await this.saveData();
  }

  async connectNodes(sourceId: string, targetId: string, edgeData?: any): Promise<void> {
    await this.crudService.connectNodes(sourceId, targetId, edgeData);
    await this.saveData();
  }

  async disconnectNodes(sourceId: string, targetId: string): Promise<void> {
    await this.crudService.disconnectNodes(sourceId, targetId);
    await this.saveData();
  }

  // ✅ Delegation an DataManager
  searchNodes(query: string): any[] {
    return this.dataManager.searchNodes(query);
  }

  searchEdges(query: string): any[] {
    return this.dataManager.searchEdges(query);
  }

  // ✅ Delegation an AnalysisService
  getConnectedNodes(nodeId: string): any[] {
    return this.analysisService.getConnectedNodes(nodeId);
  }

  getNodeDegree(nodeId: string): number {
    return this.analysisService.getNodeDegree(nodeId);
  }

  getGraphStats(): any {
    return this.analysisService.getGraphStats();
  }

  // ✅ Weitere Analysis-Methoden
  findShortestPath(sourceId: string, targetId: string): string[] {
    return this.analysisService.findShortestPath(sourceId, targetId);
  }

  findCycles(): string[][] {
    return this.analysisService.findCycles();
  }

  getIsolatedNodes(): any[] {
    return this.analysisService.getIsolatedNodes();
  }

  getMostConnectedNodes(limit?: number): any[] {
    return this.analysisService.getMostConnectedNodes(limit);
  }

  // ✅ Delegation an DemoService
  async loadDemoData(demoData: { nodes: any[]; edges: any[] }): Promise<void> {
    if (!this.persistence || !this.document) {
      return;
    }

    try {
      await this.demoService.loadDemoData(demoData);
      await this.saveData();
    } catch (error) {
      throw error;
    }
  }

  async loadData(): Promise<void> {
    if (!this.persistence || !this.document) {
      return;
    }

    try {
      const graph = await this.persistence.load(this.document);
      this.dataManager.setElements(graph.elements || { nodes: [], edges: [] });
      this.style = graph.style || [];
    } catch {
      this.dataManager.setElements({ nodes: [], edges: [] });
      this.style = [];
    }
  }

  async saveData(): Promise<void> {
    if (!this.persistence || !this.document) {
      return;
    }

    try {
      await this.persistence.save(this.document, {
        elements: this.dataManager.getElements(),
        style: this.style || [],
      });
    } catch (error) {
      throw error;
    }
  }

  // Cleanup
  cleanup(): void {
    this.dataManager.setElements({ nodes: [], edges: [] });
    this.style = [];
  }
}
