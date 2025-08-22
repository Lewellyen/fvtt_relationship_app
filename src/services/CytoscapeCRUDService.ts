import cytoscape from "cytoscape";

export class CytoscapeCRUDService {
  private cy: any;
  private graphJournalUuid: string;
  private graphJournalPage: any = null;

  constructor(graphJournalUuid: string) {
    this.graphJournalUuid = graphJournalUuid;
  }

  /**
   * Initialisiert Cytoscape mit gespeicherten Elements
   */
  async initialize(): Promise<void> {
    try {
      // Verwende foundry.utils.fromUuid() um das JournalEntryPage über UUID zu laden
      this.graphJournalPage = await (foundry.utils as any).fromUuid(this.graphJournalUuid);
      console.log(`Journal Entry Page ${this.graphJournalUuid} found successfully`);
    } catch {
      console.warn(`Journal Entry Page ${this.graphJournalUuid} not found, creating new one`);
      // Erstelle ein neues Journal Entry Page falls es nicht existiert
      const newJournalPage = await JournalEntryPage.create({
        name: "Beziehungsgraph",
        type: "relationship-graph",
        system: {
          elements: { nodes: [], edges: [] },
          style: [],
        },
      } as any);

      if (newJournalPage) {
        this.graphJournalPage = newJournalPage;
        this.graphJournalUuid = newJournalPage.uuid;
        console.log(`Created new Journal Entry Page with UUID: ${newJournalPage.uuid}`);
      }
    }

    if (!this.graphJournalPage) {
      throw new Error("Failed to create or retrieve Journal Entry Page");
    }

    // Sicherstellen, dass system Daten existieren
    if (!this.graphJournalPage.system) {
      this.graphJournalPage.system = {};
    }

    // Standardwerte für elements und style setzen, falls sie nicht existieren
    const system = this.graphJournalPage.system as any;
    const elements = system.elements || { nodes: [], edges: [] };
    const style = system.style || [];

    this.cy = cytoscape({
      elements: elements,
      style: style.length > 0 ? style : this.getDefaultStyle(),
      layout: { 
        name: "random",
        fit: true,
        padding: 50,
        animate: false,
        randomize: true,
        componentSpacing: 100,
        nodeRepulsion: 4000,
        nodeOverlap: 20,
        idealEdgeLength: 100,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      minZoom: 0.1,
      maxZoom: 10,
      wheelSensitivity: 0.3,
      autoungrabify: false,
      autolock: false,
    });

    // Event-Listener für Änderungen
    this.setupChangeListeners();
    
    // Zentriere und zoome auf die Nodes
    this.fitToNodes();
  }

  /**
   * Zentriert und zoomt auf alle Nodes
   */
  private fitToNodes(): void {
    if (!this.cy || this.cy.nodes().length === 0) return;
    
    // Warte kurz, damit das Layout fertig ist
    setTimeout(() => {
      // Fit to nodes with padding
      this.cy.fit(this.cy.nodes(), 100);
      
      // Ensure minimum zoom
      if (this.cy.zoom() < 0.3) {
        this.cy.zoom(0.3);
      }
      
      // Center the view
      this.cy.center();
    }, 100);
  }

  /**
   * Event-Listener für automatisches Speichern
   */
  private setupChangeListeners(): void {
    // Node hinzugefügt
    this.cy.on("add", "node", () => {
      this.saveElementsToFoundry();
    });

    // Node entfernt
    this.cy.on("remove", "node", () => {
      this.saveElementsToFoundry();
    });

    // Edge hinzugefügt
    this.cy.on("add", "edge", () => {
      this.saveElementsToFoundry();
    });

    // Edge entfernt
    this.cy.on("remove", "edge", () => {
      this.saveElementsToFoundry();
    });

    // Node-Daten geändert
    this.cy.on("change", "node", () => {
      this.saveElementsToFoundry();
    });

    // Edge-Daten geändert
    this.cy.on("change", "edge", () => {
      this.saveElementsToFoundry();
    });

    // Position geändert
    this.cy.on("position", "node", () => {
      this.saveElementsToFoundry();
    });
  }

  /**
   * Speichert Elements zurück nach Foundry
   */
  private async saveElementsToFoundry(): Promise<void> {
    if (!this.graphJournalPage) {
      console.warn("Graph journal page not available for saving");
      return;
    }

    const elements = {
      nodes: this.cy.nodes().map((node: any) => ({
        data: node.data(),
        position: node.position(),
      })),
      edges: this.cy.edges().map((edge: any) => ({
        data: edge.data(),
      })),
    };

    await this.graphJournalPage.update({
      "system.elements": elements,
    } as any);
  }

  /**
   * Standard-Style für Cytoscape
   */
  private getDefaultStyle(): any[] {
    return [
      {
        selector: "node",
        style: {
          "background-color": "#666",
          width: 60,
          height: 60,
          label: "data(label)",
          "text-valign": "center",
          "text-halign": "center",
          "font-size": "14px",
          "font-weight": "bold",
          color: "#333",
          "border-color": "#333",
          "border-width": 2,
          shape: "ellipse",
        },
      },
      {
        selector: 'node[group = "adelige"]',
        style: {
          "background-color": "#FFD700",
          "border-color": "#B8860B",
          "border-width": 3,
          width: 80,
          height: 80,
        },
      },
      {
        selector: 'node[group = "bürger"]',
        style: {
          "background-color": "#4169E1",
          "border-color": "#000080",
          "border-width": 2,
          width: 70,
          height: 70,
        },
      },
      {
        selector: 'node[group = "bauern"]',
        style: {
          "background-color": "#228B22",
          "border-color": "#006400",
          "border-width": 2,
          width: 65,
          height: 65,
        },
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#ccc",
          "target-arrow-color": "#ccc",
          "target-arrow-shape": "triangle",
          "target-arrow-width": 2,
          "curve-style": "bezier",
          "font-size": "12px",
          "font-weight": "bold",
          color: "#333",
        },
      },
      {
        selector: 'edge[type = "verwandtschaft"]',
        style: {
          "line-color": "#DC143C",
          "target-arrow-color": "#DC143C",
          width: 4,
        },
      },
      {
        selector: 'edge[type = "feindschaft"]',
        style: {
          "line-color": "#8B0000",
          "target-arrow-color": "#8B0000",
          width: 3,
          "line-style": "dashed",
        },
      },
    ];
  }

  /**
   * CRUD-Operationen für Nodes
   */

  // CREATE
  async addNode(nodeData: any): Promise<any> {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return null;
    }

    const node = this.cy.add({
      group: "nodes",
      data: {
        id: foundry.utils.randomID(),
        ...nodeData,
      },
      position: nodeData.position || { x: 0, y: 0 },
    });

    return node;
  }

  // READ
  getNode(nodeId: string): any {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return null;
    }
    return this.cy.getElementById(nodeId);
  }

  getAllNodes(): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }
    return this.cy.nodes();
  }

  // UPDATE
  async updateNode(nodeId: string, newData: any): Promise<void> {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return;
    }

    const node = this.cy.getElementById(nodeId);
    if (node.length > 0) {
      node.data(newData);
    }
  }

  // DELETE
  async removeNode(nodeId: string): Promise<void> {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return;
    }

    const node = this.cy.getElementById(nodeId);
    if (node.length > 0) {
      this.cy.remove(node);
    }
  }

  /**
   * CRUD-Operationen für Edges
   */

  // CREATE
  async addEdge(sourceId: string, targetId: string, edgeData: any): Promise<any> {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return null;
    }

    const edge = this.cy.add({
      group: "edges",
      data: {
        id: foundry.utils.randomID(),
        source: sourceId,
        target: targetId,
        ...edgeData,
      },
    });

    return edge;
  }

  // READ
  getEdge(edgeId: string): any {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return null;
    }
    return this.cy.getElementById(edgeId);
  }

  getAllEdges(): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }
    return this.cy.edges();
  }

  // UPDATE
  async updateEdge(edgeId: string, newData: any): Promise<void> {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return;
    }

    const edge = this.cy.getElementById(edgeId);
    if (edge.length > 0) {
      edge.data(newData);
    }
  }

  // DELETE
  async removeEdge(edgeId: string): Promise<void> {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return;
    }

    const edge = this.cy.getElementById(edgeId);
    if (edge.length > 0) {
      this.cy.remove(edge);
    }
  }

  /**
   * Cytoscape-optimierte Filter-Operationen
   */
  filterByGroup(groupName: string): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }
    return this.cy.elements(`node[group = "${groupName}"]`);
  }

  filterByType(nodeType: string): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }
    return this.cy.elements(`node[type = "${nodeType}"]`);
  }

  filterByImportance(minImportance: number): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }
    return this.cy.elements(`node[importance >= ${minImportance}]`);
  }

  searchByName(searchTerm: string): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }
    return this.cy.elements(`node[name *= "${searchTerm}"]`);
  }

  /**
   * Komplexe Filterung
   */
  filterByComplexCriteria(criteria: {
    groups?: string[];
    types?: string[];
    minImportance?: number;
    factions?: string[];
    locations?: string[];
    searchTerm?: string;
  }): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }

    let elements = this.cy.elements("node");

    if (criteria.groups && criteria.groups.length > 0) {
      const groupConditions = criteria.groups.map((g) => `group = "${g}"`).join(",");
      elements = elements.filter(`node[${groupConditions}]`);
    }

    if (criteria.types && criteria.types.length > 0) {
      const typeConditions = criteria.types.map((t) => `type = "${t}"`).join(",");
      elements = elements.filter(`node[${typeConditions}]`);
    }

    if (criteria.minImportance) {
      elements = elements.filter(`node[importance >= ${criteria.minImportance}]`);
    }

    if (criteria.factions && criteria.factions.length > 0) {
      const factionConditions = criteria.factions.map((f) => `faction = "${f}"`).join(",");
      elements = elements.filter(`node[${factionConditions}]`);
    }

    if (criteria.locations && criteria.locations.length > 0) {
      const locationConditions = criteria.locations.map((l) => `location = "${l}"`).join(",");
      elements = elements.filter(`node[${locationConditions}]`);
    }

    if (criteria.searchTerm) {
      elements = elements.filter(`node[name *= "${criteria.searchTerm}"]`);
    }

    return elements;
  }

  /**
   * Graph-Algorithmen
   */
  getConnectedComponents(): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }
    return this.cy.elements().components();
  }

  getShortestPath(sourceId: string, targetId: string): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }
    const source = this.cy.getElementById(sourceId);
    const target = this.cy.getElementById(targetId);
    return source.shortestPath(target);
  }

  getNeighbors(nodeId: string): any[] {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return [];
    }
    const node = this.cy.getElementById(nodeId);
    return node.closedNeighborhood().filter(`node[id != "${nodeId}"]`);
  }

  /**
   * Layout-Operationen
   */
  async applyLayout(layoutName: string): Promise<void> {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return;
    }

    const layout = this.cy.layout({ name: layoutName });
    await layout.promiseOn("layoutstop");
    this.saveElementsToFoundry();
  }

  /**
   * Export/Import
   */
  exportElements(): any {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return { nodes: [], edges: [] };
    }

    return {
      nodes: this.cy.nodes().map((node: any) => ({
        data: node.data(),
        position: node.position(),
      })),
      edges: this.cy.edges().map((edge: any) => ({
        data: edge.data(),
      })),
    };
  }

  importElements(elements: any): void {
    if (!this.cy) {
      console.warn("Cytoscape instance not initialized");
      return;
    }

    this.cy.elements().remove();
    this.cy.add(elements);
    this.saveElementsToFoundry();
  }

  /**
   * Getter für Cytoscape-Instanz
   */
  getCytoscape(): any {
    return this.cy;
  }
}
