interface EdgeData {
  id: string;
  label: string;
  source: string;
  target: string;
  type: string;
  color: string;
}

interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  type: string;
  color: string;
}

export interface GraphComponentProps {
  nodes: NodeData[];
  edges: EdgeData[];
}

export interface IDocument {
  system: any;
  update(data: any): Promise<void>;
}
