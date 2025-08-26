// ========================================
// PERMISSIONS MODEL INTERFACES
// ========================================

export interface PermissionUser {
  id: string;
  level: number;
}

export interface Permission {
  defaultLevel: number;
  users: PermissionUser[];
}

// ========================================
// DESCRIPTION MODEL INTERFACES
// ========================================

export interface Description {
  text: string;
  category: string;
  permissions: Permission;
}

// ========================================
// RELATIONSHIP EFFECT MODEL INTERFACES
// ========================================

export interface RelationshipEffect {
  type: string;
  description: string;
  permissions: Permission;
}

// ========================================
// CYTOGRAPH COMMON ATTRIBUTES INTERFACE
// ========================================

export interface CytoGraphCommonAttributes {
  // ERFORDERLICHE FELDER
  color: string;

  // OPTIONALE FELDER - Alle in Snake_case
  opacity?: number;
  visibility?: string;
  events?: string;
  "text-events"?: string;
  label?: string;
  "font-size"?: number;
  "font-family"?: string;
  "font-weight"?: string;
  "font-style"?: string;
  "text-valign"?: string;
  "text-halign"?: string;
  "text-justification"?: string;
  "text-wrap"?: string;
  "text-overflow-wrap"?: string;
  "text-max-width"?: number;
  "text-rotation"?: string;
  "text-margin-x"?: number;
  "text-margin-y"?: number;
  "line-height"?: number;
  display?: string;
  "text-outline-color"?: string;
  "text-outline-width"?: number;
  "text-outline-opacity"?: number;
  "text-opacity"?: number;
  "text-decoration"?: string;
  "text-transform"?: string;
  "text-background-color"?: string;
  "text-background-opacity"?: number;
  "text-background-shape"?: string;
  "text-background-padding"?: number;
  "text-border-color"?: string;
  "text-border-width"?: number;
  "text-border-style"?: string;
  "text-border-opacity"?: number;
  "min-zoomed-font-size"?: number;
  "overlay-color"?: string;
  "overlay-opacity"?: number;
  "overlay-padding"?: number;
  "overlay-shape"?: string;
  "overlay-corner-radius"?: string;
  "underlay-color"?: string;
  "underlay-opacity"?: number;
  "underlay-padding"?: number;
  "underlay-shape"?: string;
  "underlay-corner-radius"?: string;
  "transition-property"?: string;
  "transition-duration"?: number;
  "transition-delay"?: number;
  "transition-timing-function"?: string;
  "z-index"?: number;
  "z-compound-depth"?: string;
  "z-index-compare"?: string;
  "box-select-labels"?: string;
}

// ========================================
// CYTOGRAPH NODE ATTRIBUTES INTERFACES
// ========================================

export interface CytoGraphNodeAttributes extends CytoGraphCommonAttributes {
  // ERFORDERLICHE FELDER
  shape: string;
  size: number;
  "border-color": string;
  "border-width": number;

  // OPTIONALE FELDER - Alle in Snake_case
  width?: number;
  height?: number;
  "background-color"?: string;
  "background-opacity"?: number;
  "background-image"?: string;
  "background-image-crossorigin"?: string;
  "background-image-opacity"?: number;
  "background-image-containment"?: string;
  "background-image-smoothing"?: string;
  "background-position-x"?: string;
  "background-position-y"?: string;
  "background-offset-x"?: number;
  "background-offset-y"?: number;
  "background-width-relative-to"?: string;
  "background-height-relative-to"?: string;
  "background-repeat"?: string;
  "background-fit"?: string;
  "background-clip"?: string;
  "background-width"?: string;
  "background-height"?: string;
  "corner-radius"?: string;
  padding?: number;
  "border-style"?: string;
  "border-opacity"?: number;
  "border-dash-pattern"?: number[];
  "border-dash-offset"?: number;
  "border-cap"?: string;
  "border-join"?: string;
  "border-position"?: string;
  "outline-color"?: string;
  "outline-width"?: number;
  "outline-opacity"?: number;
  "outline-offset"?: number;
  "outline-style"?: string;
  "background-gradient-direction"?: string;
  "background-gradient-stop-colors"?: string;
  "background-gradient-stop-positions"?: string;
  "background-blacken"?: number;
  "background-fill"?: string;
  "shape-polygon-points"?: string;
  "bounds-expansion"?: number;
  "pie-size"?: string;
  "pie-hole"?: number;
  "pie-start-angle"?: string;
  "padding-relative-to"?: string;
  position?: string;
  "compound-sizing-wrt-labels"?: string;
  "min-width"?: number;
  "min-height"?: number;
  ghost?: string;
  "ghost-offset-x"?: number;
  "ghost-offset-y"?: number;
  "ghost-opacity"?: number;
}

// ========================================
// CYTOGRAPH EDGE ATTRIBUTES INTERFACES
// ========================================

export interface CytoGraphEdgeAttributes extends CytoGraphCommonAttributes {
  // OPTIONALE FELDER (keine erforderlichen Edge-spezifischen Felder) - Alle in Snake_case
  width?: number;
  "line-color"?: string;
  "line-opacity"?: number;
  "line-style"?: string;
  "curve-style"?: string;
  "target-arrow-shape"?: string;
  "target-arrow-color"?: string;
  "target-arrow-width"?: number;
  "target-arrow-fill"?: string;
  "source-arrow-shape"?: string;
  "source-arrow-color"?: string;
  "source-arrow-width"?: number;
  "source-arrow-fill"?: string;
  "mid-source-arrow-shape"?: string;
  "mid-source-arrow-color"?: string;
  "mid-source-arrow-width"?: number;
  "mid-source-arrow-fill"?: string;
  "mid-target-arrow-shape"?: string;
  "mid-target-arrow-color"?: string;
  "mid-target-arrow-width"?: number;
  "mid-target-arrow-fill"?: string;
  "line-cap"?: string;
  "line-fill"?: string;
  "line-outline-width"?: number;
  "line-outline-color"?: string;
  "line-gradient-stop-colors"?: string;
  "line-gradient-stop-positions"?: string;
  "line-dash-pattern"?: number[];
  "line-dash-offset"?: number;
  "control-point-step-size"?: number;
  "control-point-weights"?: number;
  "segment-weights"?: number;
  "segment-distances"?: number;
  "segment-radii"?: number;
  "radius-type"?: string;
  "taxi-turn"?: string;
  "taxi-radius"?: number;
  "taxi-turn-min-distance"?: number;
  "taxi-direction"?: string;
  "edge-distances"?: string;
  "haystack-radius"?: number;
  "arrow-scale"?: number;
  "loop-direction"?: string;
  "loop-sweep"?: string;
  "source-distance-from-node"?: number;
  "target-distance-from-node"?: number;
  "source-endpoint"?: string;
  "target-endpoint"?: string;
  "source-label"?: string;
  "source-text-offset"?: number;
  "source-text-margin-x"?: number;
  "source-text-margin-y"?: number;
  "source-text-rotation"?: string;
  "target-label"?: string;
  "target-text-offset"?: number;
  "target-text-margin-x"?: number;
  "target-text-margin-y"?: number;
  "target-text-rotation"?: string;
}

// ========================================
// NODE DATA INTERFACES
// ========================================

export interface NodeData {
  // ERFORDERLICHE FELDER
  id: string;
  x: number;
  y: number;
  type: {
    value: string;
    permissions: Permission;
  };
  globalPermissions: Permission;

  // OPTIONALE FELDER
  label?: {
    value: string;
    permissions: Permission;
  };
  image?: {
    path: string;
    permissions: Permission;
  };
  descriptions?: Description[];
  playerRelationshipEffects?: RelationshipEffect[];
  cytoScapeAttributes?: CytoGraphNodeAttributes;
  zIndex?: number;
}

// ========================================
// EDGE DATA INTERFACES
// ========================================

export interface EdgeData {
  // ERFORDERLICHE FELDER
  id: string;
  source: string;
  target: string;
  type: string;
  globalPermissions: Permission;

  // OPTIONALE FELDER
  label?: {
    value: string;
    permissions: Permission;
  };
  connectionCategory?: {
    value: string;
    permissions: Permission;
  };
  cytoScapeAttributes?: CytoGraphEdgeAttributes;
  zIndex?: number;
}

// ========================================
// RELATIONSHIP GRAPH MODEL INTERFACES
// ========================================

export interface RelationshipGraphData {
  // GRAPH METADATA
  description?: string;
  version?: string;
  created?: number;
  modified?: number;

  // GRAPH ELEMENTS - Direkt im Cytoscape-Format
  elements: {
    nodes: any[];
    edges: any[];
  };

  // CYTOGRAPHE STYLE als JSON
  style: any[];
}

// ========================================
// COMPONENT PROPS INTERFACES
// ========================================

export interface GraphComponentProps {
  graph: RelationshipGraphData;
  nodes: NodeData[];
  edges: EdgeData[];
}

// ========================================
// FOUNDRY VTT INTERFACES
// ========================================

export interface IDocument {
  system: any;
  name?: string;
  update(data: any): Promise<void>;
}
