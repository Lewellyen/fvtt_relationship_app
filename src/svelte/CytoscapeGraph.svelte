<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import cytoscape from 'cytoscape';

  // Props mit Svelte 5 Runes-Syntax
  const props = $props<{
    nodes: Array<{ id: string; x: number; y: number; label?: string }>;
    edges: Array<{ from: string; to: string; label?: string }>;
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
      nodes: props.nodes.map((node: any) => ({
        data: { 
          id: node.id,
          label: node.label || node.id,
          x: node.x,
          y: node.y
        }
      })),
      edges: props.edges.map((edge: any) => ({
        data: {
          id: `${edge.from}-${edge.to}`,
          source: edge.from,
          target: edge.to,
          label: edge.label || `${edge.from} → ${edge.to}`
        }
      }))
    };
  }

  // Cytoscape styles (ohne :hover)
  const styles = [
    {
      selector: 'node',
      style: {
        'background-color': '#4a90e2',
        'label': 'data(label)',
        'color': '#fff',
        'text-valign': 'center',
        'text-halign': 'center',
        'width': 60,
        'height': 60,
        'font-size': '12px',
        'border-width': 2,
        'border-color': '#2c3e50',
        'text-wrap': 'wrap',
        'text-max-width': 50,
        // Fix für matschige Labels bei Zoom
        'text-outline-color': '#2c3e50',
        'text-outline-width': 1,
        'text-outline-opacity': 0.8,
        'font-family': 'Arial, sans-serif',
        'font-weight': 'bold'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#34495e',
        'target-arrow-color': '#34495e',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': '10px',
        'text-rotation': 'autorotate',
        'text-margin-y': '-10px',
        'text-background-color': '#fff',
        'text-background-opacity': 0.8,
        'text-background-padding': '2px',
        // Fix für matschige Edge-Labels bei Zoom
        'text-outline-color': '#34495e',
        'text-outline-width': 0.5,
        'text-outline-opacity': 0.6,
        'font-family': 'Arial, sans-serif',
        'font-weight': 'bold'
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
        'line-color': '#2c3e50'
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