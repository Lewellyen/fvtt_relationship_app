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
// CYTOGRAPH COMMON ATTRIBUTES INTERFACES
// ========================================

export interface CytoGraphCommonAttributes {
  // ERFORDERLICHE FELDER
  color: string;
  
  // OPTIONALE FELDER
  opacity?: number;
  visibility?: string;
  events?: string;
  textEvents?: string;
  label?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  textValign?: string;
  textHalign?: string;
  textJustification?: string;
  textWrap?: string;
  textOverflowWrap?: string;
  textMaxWidth?: number;
  textRotation?: string;
  textMarginX?: number;
  textMarginY?: number;
  lineHeight?: number;
  display?: string;
  textOutlineColor?: string;
  textOutlineWidth?: number;
  textOutlineOpacity?: number;
  textOpacity?: number;
  textDecoration?: string;
  textTransform?: string;
  textBackgroundColor?: string;
  textBackgroundOpacity?: number;
  textBackgroundShape?: string;
  textBackgroundPadding?: number;
  textBorderColor?: string;
  textBorderWidth?: number;
  textBorderStyle?: string;
  textBorderOpacity?: number;
  minZoomedFontSize?: number;
  overlayColor?: string;
  overlayOpacity?: number;
  overlayPadding?: number;
  overlayShape?: string;
  overlayCornerRadius?: string;
  underlayColor?: string;
  underlayOpacity?: number;
  underlayPadding?: number;
  underlayShape?: string;
  underlayCornerRadius?: string;
  transitionProperty?: string;
  transitionDuration?: number;
  transitionDelay?: number;
  transitionTimingFunction?: string;
  zIndex?: number;
  zCompoundDepth?: string;
  zIndexCompare?: string;
  boxSelectLabels?: string;
}

// ========================================
// CYTOGRAPH NODE ATTRIBUTES INTERFACES
// ========================================

export interface CytoGraphNodeAttributes extends CytoGraphCommonAttributes {
  // ERFORDERLICHE FELDER
  shape: string;
  size: number;
  borderColor: string;
  borderWidth: number;
  
  // OPTIONALE FELDER
  width?: number;
  height?: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
  backgroundImage?: string;
  backgroundImageCrossorigin?: string;
  backgroundImageOpacity?: number;
  backgroundImageContainment?: string;
  backgroundImageSmoothing?: string;
  backgroundPositionX?: string;
  backgroundPositionY?: string;
  backgroundOffsetX?: number;
  backgroundOffsetY?: number;
  backgroundWidthRelativeTo?: string;
  backgroundHeightRelativeTo?: string;
  backgroundRepeat?: string;
  backgroundFit?: string;
  backgroundClip?: string;
  backgroundWidth?: string;
  backgroundHeight?: string;
  cornerRadius?: string;
  padding?: number;
  borderStyle?: string;
  borderOpacity?: number;
  borderDashPattern?: number[];
  borderDashOffset?: number;
  borderCap?: string;
  borderJoin?: string;
  borderPosition?: string;
  outlineColor?: string;
  outlineWidth?: number;
  outlineOpacity?: number;
  outlineOffset?: number;
  outlineStyle?: string;
  backgroundGradientDirection?: string;
  backgroundGradientStopColors?: string;
  backgroundGradientStopPositions?: string;
  backgroundBlacken?: number;
  backgroundFill?: string;
  shapePolygonPoints?: string;
  boundsExpansion?: number;
  pieSize?: string;
  pieHole?: number;
  pieStartAngle?: string;
  paddingRelativeTo?: string;
  position?: string;
  compoundSizingWrtLabels?: string;
  minWidth?: number;
  minHeight?: number;
  ghost?: string;
  ghostOffsetX?: number;
  ghostOffsetY?: number;
  ghostOpacity?: number;
}

// ========================================
// CYTOGRAPH EDGE ATTRIBUTES INTERFACES
// ========================================

export interface CytoGraphEdgeAttributes extends CytoGraphCommonAttributes {
  // OPTIONALE FELDER (keine erforderlichen Edge-spezifischen Felder)
  width?: number;
  lineColor?: string;
  lineOpacity?: number;
  lineStyle?: string;
  curveStyle?: string;
  targetArrowShape?: string;
  targetArrowColor?: string;
  targetArrowWidth?: number;
  targetArrowFill?: string;
  sourceArrowShape?: string;
  sourceArrowColor?: string;
  sourceArrowWidth?: number;
  sourceArrowFill?: string;
  midSourceArrowShape?: string;
  midSourceArrowColor?: string;
  midSourceArrowWidth?: number;
  midSourceArrowFill?: string;
  midTargetArrowShape?: string;
  midTargetArrowColor?: string;
  midTargetArrowWidth?: number;
  midTargetArrowFill?: string;
  lineCap?: string;
  lineFill?: string;
  lineOutlineWidth?: number;
  lineOutlineColor?: string;
  lineGradientStopColors?: string;
  lineGradientStopPositions?: string;
  lineDashPattern?: number[];
  lineDashOffset?: number;
  controlPointStepSize?: number;
  controlPointWeights?: number;
  segmentWeights?: number;
  segmentDistances?: number;
  segmentRadii?: number;
  radiusType?: string;
  taxiTurn?: string;
  taxiRadius?: number;
  taxiTurnMinDistance?: number;
  taxiDirection?: string;
  edgeDistances?: string;
  haystackRadius?: number;
  arrowScale?: number;
  loopDirection?: string;
  loopSweep?: string;
  sourceDistanceFromNode?: number;
  targetDistanceFromNode?: number;
  sourceEndpoint?: string;
  targetEndpoint?: string;
  sourceLabel?: string;
  sourceTextOffset?: number;
  sourceTextMarginX?: number;
  sourceTextMarginY?: number;
  sourceTextRotation?: string;
  targetLabel?: string;
  targetTextOffset?: number;
  targetTextMarginX?: number;
  targetTextMarginY?: number;
  targetTextRotation?: string;
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
}

// ========================================
// RELATIONSHIP GRAPH MODEL INTERFACES
// ========================================

export interface RelationshipGraphData {
  // GRAPH METADATA
  name: string;
  description?: string;
  permissions: Permission;
  version?: string;
  created?: number;
  modified?: number;
  
  // GRAPH SETTINGS
  zoom?: number;
  panX?: number;
  panY?: number;
  layoutType?: string;
  
  // GRAPH ELEMENTS
  nodes: NodeData[];
  edges: EdgeData[];
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
  update(data: any): Promise<void>;
}
