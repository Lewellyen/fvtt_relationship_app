<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import cytoscape from 'cytoscape';
  import type { NodeData, EdgeData } from '../global';

  // Props mit Svelte 5 Runes-Syntax
  const props = $props<{
    nodes: NodeData[];
    edges: EdgeData[];
    selectedNodeId?: string | null;
    selectedEdgeId?: string | null;
    width?: string;
    height?: string;
    interactive?: boolean;
    onNodeClick?: (nodeId: string) => void;
    onEdgeClick?: (edgeId: string) => void;
    onNodeDoubleClick?: (nodeId: string) => void;
    onEdgeDoubleClick?: (edgeId: string) => void;
  }>();

  let cyContainer: HTMLElement;
  let cy: any = null;

  // Default props
  const width = props.width || '100%';
  const height = props.height || '400px';
  const interactive = props.interactive ?? true;

  // Hilfsfunktion: Konvertiert Snake_case mit Bindestrichen zu Snake_case mit Unterstrichen
  function convertToCytoscapeData(obj: any): any {
    if (!obj) return obj;
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      // Konvertiere Bindestriche zu Unterstrichen für Cytoscape data() Syntax
      const cytoscapeKey = key.replace(/-/g, '_');
      result[cytoscapeKey] = value;
    }
    return result;
  }

  // Convert props to Cytoscape format
  function createCytoscapeData() {
    // Debug: Ursprüngliche Node-Daten
    const nodes = props.nodes.map((node: NodeData) => {
      // Konvertiere Snake_case mit Bindestrichen zu Snake_case mit Unterstrichen
      const data = {
        ...convertToCytoscapeData(node.cytoScapeAttributes),
        id: node.id,
        label: node.label?.value || node.id,
        x: node.x,
        y: node.y,
      };
      console.log('Cytoscape Node Data:', data);
      return { data };
    });
    const edges = props.edges.map((edge: EdgeData) => {
      // Konvertiere Snake_case mit Bindestrichen zu Snake_case mit Unterstrichen
      const data = {
        ...convertToCytoscapeData(edge.cytoScapeAttributes),
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label?.value || edge.source + " → " + edge.target,
      };
      console.log('Cytoscape Edge Data:', data);
      return { data };
    });
    return { nodes, edges };
  }

  // Cytoscape styles - korrekte Syntax mit Unterstrichen in data()
  const styles = [
    {
      selector: 'node',
      style: {
        'background-color': 'data(background_color)',
        'label': 'data(label)',
        'color': 'data(color)',
        'text-valign': 'data(text_valign)',
        'text-halign': 'data(text_halign)',
        'width': 'data(width)',
        'height': 'data(height)',
        'font-size': 'data(font_size)',
        'border-width': 'data(border_width)',
        'border-color': 'data(border_color)',
        'font-family': 'data(font_family)',
        'font-weight': 'data(font_weight)',
        'shape': 'data(shape)',
        'opacity': 'data(opacity)',
        'visibility': 'data(visibility)',
        'padding': 'data(padding)'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 'data(width)',
        'line-color': 'data(line_color)',
        'target-arrow-color': 'data(target_arrow_color)',
        'target-arrow-shape': 'data(target_arrow_shape)',
        'curve-style': 'data(curve_style)',
        'label': 'data(label)',
        'text-margin-y': 'data(text_margin_y)',
        'line-opacity': 'data(line_opacity)',
        'line-style': 'data(line_style)'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'background-color': '#3498db',
        'border-width': 3,
        'border-color': '#2980b9'
      }
    },
    {
      selector: 'edge:selected',
      style: {
        'width': 5,
        'line-color': 'data(line_color)'
      }
    }
  ];

  // Initialize Cytoscape
  function initCytoscape() {
    if (!cyContainer) return;

    const elements = createCytoscapeData();
    

    
    cy = cytoscape({
      container: cyContainer,
      elements: elements,
      style: styles as any,
      layout: {
        name: 'preset',
        positions: function(node: any) {
          const nodeData = props.nodes.find((n: any) => n.id === node.id());
          return nodeData ? { x: nodeData.x, y: nodeData.y } : { x: 0, y: 0 };
        }
      },
      userZoomingEnabled: interactive,
      userPanningEnabled: interactive,
      boxSelectionEnabled: interactive,
      selectionType: (interactive ? 'single' : 'none') as any
    } as any);

    // Add event listeners if interactive
    if (interactive) {
      cy.on('tap', 'node', function(evt: any) {
        const node = evt.target;
        if (props.onNodeClick) {
          props.onNodeClick(node.id());
        }
        console.log('Node clicked:', node.id());
      });

      cy.on('tap', 'edge', function(evt: any) {
        const edge = evt.target;
        if (props.onEdgeClick) {
          props.onEdgeClick(edge.id());
        }
        console.log('Edge clicked:', edge.id());
      });

      cy.on('cxttap', 'node', function(evt: any) {
        const node = evt.target;
        if (props.onNodeDoubleClick) {
          props.onNodeDoubleClick(node.id());
        }
        console.log('Node double-clicked:', node.id());
      });

      cy.on('cxttap', 'edge', function(evt: any) {
        const edge = evt.target;
        if (props.onEdgeDoubleClick) {
          props.onEdgeDoubleClick(edge.id());
        }
        console.log('Edge double-clicked:', edge.id());
      });

      cy.on('tap', function(evt: any) {
        if (evt.target === cy) {
          console.log('Background clicked');
        }
      });
    }

    // Fit to content
    cy.fit();
  }

  // Cleanup function
  function destroyCytoscape() {
    if (cy) {
      cy.destroy();
      cy = null;
    }
  }

  // Update selection in Cytoscape
  function updateSelection() {
    if (!cy) return;
    
    // Clear all selections first
    cy.elements().unselect();
    
    // Select node if specified
    if (props.selectedNodeId) {
      const node = cy.getElementById(props.selectedNodeId);
      if (node.length > 0) {
        node.select();
      }
    }
    
    // Select edge if specified
    if (props.selectedEdgeId) {
      const edge = cy.getElementById(props.selectedEdgeId);
      if (edge.length > 0) {
        edge.select();
      }
    }
  }

  // Reinitialize when props change
  function updateCytoscape() {
    if (cy) {
      destroyCytoscape();
      initCytoscape();
    }
  }

  // Update selection when selection props change
  $effect(() => {
    if (cy && (props.selectedNodeId !== undefined || props.selectedEdgeId !== undefined)) {
      updateSelection();
    }
  });

  onMount(() => {
    initCytoscape();
  });

  onDestroy(() => {
    destroyCytoscape();
  });

  // Watch for prop changes
  $effect(() => {
    if (cy) {
      updateCytoscape();
    }
  });
</script>

<div class="cytoscape-graph-container" style="width: {width}; height: {height};">
  <div bind:this={cyContainer} class="cytoscape-container"></div>
</div>

<style>
  .cytoscape-graph-container {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
    background: #f8f9fa;
  }

  .cytoscape-container {
    width: 100%;
    height: 100%;
  }
</style> 