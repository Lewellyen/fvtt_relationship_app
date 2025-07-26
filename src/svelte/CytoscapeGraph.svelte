<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import cytoscape from 'cytoscape';
  import type { NodeData, EdgeData } from '../global';

  // Props mit Svelte 5 Runes-Syntax
  const props = $props<{
    nodes: NodeData[];
    edges: EdgeData[];
    width?: string;
    height?: string;
    interactive?: boolean;
    onNodeClick?: (nodeId: string) => void;
    onEdgeClick?: (edgeId: string) => void;
  }>();

  let cyContainer: HTMLElement;
  let cy: any = null;

  // Default props
  const width = props.width || '100%';
  const height = props.height || '400px';
  const interactive = props.interactive ?? true;

  // Convert props to Cytoscape format
  function createCytoscapeData() {
    return {
      nodes: props.nodes.map((node: NodeData) => ({
        data: {
          id: node.id,
          label: node.label?.value || node.id,
          x: node.x,
          y: node.y,
          type: node.type.value,
          // Cytoscape-Attribute verwenden
          ...node.cytoScapeAttributes
        }
      })),
      edges: props.edges.map((edge: EdgeData) => ({
        data: {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: edge.label?.value || '',
          type: edge.type,
          // Cytoscape-Attribute verwenden
          ...edge.cytoScapeAttributes
        }
      }))
    };
  }

  // Cytoscape styles (ohne :hover)
  const styles = [
    {
      selector: 'node',
      style: {
        'background-color': 'data(backgroundColor)',
        'label': 'data(label)',
        'color': 'data(color)',
        'text-valign': 'data(textValign)',
        'text-halign': 'data(textHalign)',
        'width': 'data(width)',
        'height': 'data(height)',
        'font-size': 'data(fontSize)',
        'border-width': 'data(borderWidth)',
        'border-color': 'data(borderColor)',
        'text-wrap': 'data(textWrap)',
        'text-max-width': 'data(textMaxWidth)',
        'text-outline-color': 'data(textOutlineColor)',
        'text-outline-width': 'data(textOutlineWidth)',
        'text-outline-opacity': 'data(textOutlineOpacity)',
        'font-family': 'data(fontFamily)',
        'font-weight': 'data(fontWeight)',
        'shape': 'data(shape)',
        'size': 'data(size)',
        'opacity': 'data(opacity)',
        'visibility': 'data(visibility)',
        'corner-radius': 'data(cornerRadius)',
        'padding': 'data(padding)'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 'data(width)',
        'line-color': 'data(lineColor)',
        'target-arrow-color': 'data(targetArrowColor)',
        'target-arrow-shape': 'data(targetArrowShape)',
        'curve-style': 'data(curveStyle)',
        'label': 'data(label)',
        'font-size': 'data(fontSize)',
        'text-rotation': 'data(textRotation)',
        'text-margin-y': 'data(textMarginY)',
        'text-background-color': 'data(textBackgroundColor)',
        'text-background-opacity': 'data(textBackgroundOpacity)',
        'text-background-padding': 'data(textBackgroundPadding)',
        'text-outline-color': 'data(textOutlineColor)',
        'text-outline-width': 'data(textOutlineWidth)',
        'text-outline-opacity': 'data(textOutlineOpacity)',
        'font-family': 'data(fontFamily)',
        'font-weight': 'data(fontWeight)',
        'line-opacity': 'data(lineOpacity)',
        'line-style': 'data(lineStyle)',
        'line-cap': 'data(lineCap)',
        'source-arrow-shape': 'data(sourceArrowShape)',
        'source-arrow-color': 'data(sourceArrowColor)',
        'source-arrow-width': 'data(sourceArrowWidth)',
        'source-arrow-fill': 'data(sourceArrowFill)'
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
        'line-color': 'data(lineColor)'
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

  // Reinitialize when props change
  function updateCytoscape() {
    if (cy) {
      destroyCytoscape();
      initCytoscape();
    }
  }

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