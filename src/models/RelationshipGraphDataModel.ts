// Define the schema type based on the defineSchema method
interface RelationshipGraphSchema {
  nodes: RelationshipGraphNode[];
  edges: RelationshipGraphEdge[];
  settings: RelationshipGraphSettings;
  [key: string]: any;
}

export class RelationshipGraphDataModel extends foundry.abstract.TypeDataModel<
  RelationshipGraphSchema,
  any,
  any,
  any
> {
  // Declare the properties that will be added by the schema
  declare nodes: RelationshipGraphNode[];
  declare edges: RelationshipGraphEdge[];
  declare settings: RelationshipGraphSettings;

  // Declare derived properties
  declare nodeCount: number;
  declare edgeCount: number;
  declare nodeMap: Map<string, RelationshipGraphNode>;
  declare edgeMap: Map<string, RelationshipGraphEdge[]>;

  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      nodes: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField({ required: true }),
          label: new fields.StringField({ required: true }),
          x: new fields.NumberField({ required: true }),
          y: new fields.NumberField({ required: true }),
          type: new fields.StringField({ initial: "default" }),
          properties: new fields.ObjectField({ initial: {} }),
          color: new fields.StringField({ initial: "#4a90e2" }),
          size: new fields.NumberField({ initial: 20 }),
        }),
      ),
      edges: new fields.ArrayField(
        new fields.SchemaField({
          source: new fields.StringField({ required: true }),
          target: new fields.StringField({ required: true }),
          label: new fields.StringField({ required: false }),
          type: new fields.StringField({ initial: "default" }),
          properties: new fields.ObjectField({ initial: {} }),
          color: new fields.StringField({ initial: "#666666" }),
          width: new fields.NumberField({ initial: 1 }),
        }),
      ),
      settings: new fields.SchemaField({
        // Graph metadata
        title: new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),

        // Display settings
        showProperties: new fields.BooleanField({ initial: true }),
        showLabels: new fields.BooleanField({ initial: true }),

        // Layout settings
        layout: new fields.StringField({ initial: "force" }),
        nodeSize: new fields.NumberField({ initial: 20 }),
        edgeWidth: new fields.NumberField({ initial: 1 }),
        backgroundColor: new fields.StringField({ initial: "#ffffff" }),
        gridSize: new fields.NumberField({ initial: 50 }),
      }),
    };
  }

  prepareDerivedData() {
    // Berechne abgeleitete Daten
    this.nodeCount = this.nodes.length;
    this.edgeCount = this.edges.length;

    // Erstelle eine Map für schnellen Zugriff auf Nodes
    this.nodeMap = new Map(
      this.nodes.map((node: RelationshipGraphNode) => [node.id, node]),
    );

    // Erstelle eine Map für Edges pro Node
    this.edgeMap = new Map();
    this.edges.forEach((edge: RelationshipGraphEdge) => {
      if (!this.edgeMap.has(edge.source)) {
        this.edgeMap.set(edge.source, []);
      }
      if (!this.edgeMap.has(edge.target)) {
        this.edgeMap.set(edge.target, []);
      }
      this.edgeMap.get(edge.source)!.push(edge);
      this.edgeMap.get(edge.target)!.push(edge);
    });
  }

  /**
   * Füge einen neuen Node hinzu
   */
  addNode(nodeData: Partial<RelationshipGraphNode>) {
    const newNode = {
      id: nodeData.id || `node_${Date.now()}`,
      label: nodeData.label || "New Node",
      x: nodeData.x || 0,
      y: nodeData.y || 0,
      type: nodeData.type || "default",
      properties: nodeData.properties || {},
      color: nodeData.color || "#4a90e2",
      size: nodeData.size || 20,
    };

    this.nodes.push(newNode);
    this.prepareDerivedData();
    return newNode;
  }

  /**
   * Füge eine neue Edge hinzu
   */
  addEdge(edgeData: Partial<RelationshipGraphEdge>) {
    const newEdge = {
      source: edgeData.source!,
      target: edgeData.target!,
      label: edgeData.label || "",
      type: edgeData.type || "default",
      properties: edgeData.properties || {},
      color: edgeData.color || "#666666",
      width: edgeData.width || 1,
    };

    this.edges.push(newEdge);
    this.prepareDerivedData();
    return newEdge;
  }

  /**
   * Entferne einen Node und alle zugehörigen Edges
   */
  removeNode(nodeId: string) {
    this.nodes = this.nodes.filter(
      (node: RelationshipGraphNode) => node.id !== nodeId,
    );
    this.edges = this.edges.filter(
      (edge: RelationshipGraphEdge) =>
        edge.source !== nodeId && edge.target !== nodeId,
    );
    this.prepareDerivedData();
  }

  /**
   * Entferne eine Edge
   */
  removeEdge(source: string, target: string) {
    this.edges = this.edges.filter(
      (edge: RelationshipGraphEdge) =>
        !(edge.source === source && edge.target === target),
    );
    this.prepareDerivedData();
  }
}

export interface RelationshipGraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: string;
  properties: Record<string, any>;
  color: string;
  size: number;
}

export interface RelationshipGraphEdge {
  source: string;
  target: string;
  label?: string;
  type: string;
  properties: Record<string, any>;
  color: string;
  width: number;
}

export interface RelationshipGraphSettings {
  // Graph metadata
  title?: string;
  description?: string;

  // Display settings
  showProperties?: boolean;
  showLabels?: boolean;

  // Layout settings
  layout: string;
  nodeSize: number;
  edgeWidth: number;
  backgroundColor: string;
  gridSize: number;
}
