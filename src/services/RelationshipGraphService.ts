export interface NodeData {
  id: string;
  x: number;
  y: number;
  label?: string;
}

export interface EdgeData {
  id?: string;
  from: string;
  to: string;
  label?: string;
  type?: string;
  color?: string;
}

export interface IDocument {
  system: any;
  update(data: any): Promise<void>;
}

export interface IRelationshipGraphService {
  getNodes(): NodeData[];
  getEdges(): EdgeData[];
  addNode(node: NodeData): Promise<void>;
  addEdge(edge: EdgeData): Promise<void>;
  removeNode(id: string): Promise<void>;
  removeEdge(id: string): Promise<void>;
}

export class RelationshipGraphService implements IRelationshipGraphService {
  constructor(private readonly document: IDocument) {}

  getNodes(): NodeData[] {
    return this.document.system.nodes ?? [];
  }

  getEdges(): EdgeData[] {
    return this.document.system.edges ?? [];
  }

  async addNode(node: NodeData): Promise<void> {
    const nodes = [...this.getNodes(), node];
    await this.document.update({ "system.nodes": nodes });
  }

  async addEdge(edge: EdgeData): Promise<void> {
    const newEdge: EdgeData = {
      id: edge.id ?? crypto.randomUUID(),
      type: edge.type ?? "relation",
      color: edge.color ?? "#000000",
      ...edge,
    };
    const edges = [...this.getEdges(), newEdge];
    await this.document.update({ "system.edges": edges });
  }

  async removeNode(id: string): Promise<void> {
    const nodes = this.getNodes().filter((n) => n.id !== id);
    await this.document.update({ "system.nodes": nodes });
  }

  async removeEdge(id: string): Promise<void> {
    const edges = this.getEdges().filter((e) => e.id !== id);
    await this.document.update({ "system.edges": edges });
  }
}
