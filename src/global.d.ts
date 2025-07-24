interface EdgeData {
  id: string;
  label: string;
  from: string;
  to: string;
  type: string;
  color: string;
}

interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  type: string;
}

export interface GraphComponentProps {
  nodes: NodeData[];
  edges: EdgeData[];
}

export interface IDocument {
  system: any;
  update(data: any): Promise<void>;
}
