<script lang="ts">
  import type { EdgeData, CytoGraphEdgeAttributes } from "../global";

  const props = $props<{
    edge?: EdgeData | null;
    nodes?: any[];
    onUpdate?: (edgeId: string, updates: Partial<CytoGraphEdgeAttributes>) => void;
  }>();

  // Lokaler State für die Eingabefelder
  let label = $state('');
  let source = $state('');
  let target = $state('');
  let lineColor = $state('#000000');
  let width = $state(1);
  let lineStyle = $state('solid');
  let fontSize = $state(12);
  let fontWeight = $state('normal');
  let opacity = $state(1);
  let zIndex = $state(0);
  let curveStyle = $state('bezier');
  let arrowShape = $state('none');

  // Aktualisiere lokale Werte wenn sich der Edge ändert
  $effect(() => {
    if (props.edge) {
      const attrs = props.edge.cytoScapeAttributes;
      label = attrs.label || '';
      source = props.edge.source || '';
      target = props.edge.target || '';
      lineColor = attrs['line-color'] || '#000000';
      width = attrs.width || 1;
      lineStyle = attrs['line-style'] || 'solid';
      fontSize = attrs['font-size'] || 12;
      fontWeight = attrs['font-weight'] || 'normal';
      opacity = attrs.opacity || 1;
      zIndex = attrs['z-index'] || 0;
      curveStyle = attrs['curve-style'] || 'bezier';
      arrowShape = attrs['target-arrow-shape'] || 'none';
    }
  });

  // Handler für Eingabeänderungen
  function handleInputChange(field: string, value: any) {
    if (!props.edge || !props.onUpdate) return;

    const updates: Partial<CytoGraphEdgeAttributes> = {};
    updates[field as keyof CytoGraphEdgeAttributes] = value;

    props.onUpdate(props.edge.id, updates);
  }

  // Predefined options
  const lineStyleOptions = [
    { value: 'solid', label: 'Solid' },
    { value: 'dashed', label: 'Dashed' },
    { value: 'dotted', label: 'Dotted' },
    { value: 'double', label: 'Double' }
  ];

  const fontWeightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: 'lighter', label: 'Lighter' },
    { value: 'bolder', label: 'Bolder' }
  ];

  const curveStyleOptions = [
    { value: 'bezier', label: 'Bezier' },
    { value: 'unbundled-bezier', label: 'Unbundled Bezier' },
    { value: 'haystack', label: 'Haystack' },
    { value: 'segments', label: 'Segments' },
    { value: 'straight', label: 'Straight' },
    { value: 'taxi', label: 'Taxi' }
  ];

  const arrowShapeOptions = [
    { value: 'none', label: 'None' },
    { value: 'triangle', label: 'Triangle' },
    { value: 'triangle-tee', label: 'Triangle Tee' },
    { value: 'triangle-cross', label: 'Triangle Cross' },
    { value: 'triangle-backcurve', label: 'Triangle Backcurve' },
    { value: 'vee', label: 'Vee' },
    { value: 'tee', label: 'Tee' },
    { value: 'square', label: 'Square' },
    { value: 'circle', label: 'Circle' },
    { value: 'diamond', label: 'Diamond' },
    { value: 'chevron', label: 'Chevron' }
  ];
</script>

<div class="edge-editor">
  <!-- Basic Properties -->
  <div class="form-section">
    <h4>Basic Properties</h4>
    
    <div class="form-group">
      <label for="edge-label">Label</label>
              <input
          type="text"
          id="edge-label"
          value={label}
          oninput={(e) => { const target = e.target as HTMLInputElement; label = target.value; handleInputChange('label', target.value); }}
          placeholder="Enter edge label..."
          class="form-control"
        />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="edge-source">Source Node</label>
        <select
          id="edge-source"
          value={source}
          onchange={(e) => { const target = e.target as HTMLSelectElement; source = target.value; handleInputChange('source', target.value); }}
          class="form-control"
        >
          <option value="">Select source node...</option>
          {#each props.nodes || [] as node}
            <option value={node.id}>{node.label?.value || node.id}</option>
          {/each}
        </select>
      </div>
      
      <div class="form-group">
        <label for="edge-target">Target Node</label>
        <select
          id="edge-target"
          value={target}
          onchange={(e) => { const targetElement = e.target as HTMLSelectElement; target = targetElement.value; handleInputChange('target', targetElement.value); }}
          class="form-control"
        >
          <option value="">Select target node...</option>
          {#each props.nodes || [] as node}
            <option value={node.id}>{node.label?.value || node.id}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Visual Properties -->
  <div class="form-section">
    <h4>Visual Properties</h4>
    
    <div class="form-group">
      <label for="edge-line-color">Line Color</label>
      <div class="color-input-group">
        <input
          type="color"
          id="edge-line-color"
          value={lineColor}
          onchange={(e) => { const target = e.target as HTMLInputElement; lineColor = target.value; handleInputChange('line-color', target.value); }}
          class="color-picker"
        />
        <input
          type="text"
          value={lineColor}
          oninput={(e) => { const target = e.target as HTMLInputElement; lineColor = target.value; handleInputChange('line-color', target.value); }}
          placeholder="#000000"
          class="color-text"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="edge-width">Width</label>
        <input
          type="number"
          id="edge-width"
          value={width}
          oninput={(e) => { const target = e.target as HTMLInputElement; width = parseInt(target.value); handleInputChange('width', parseInt(target.value)); }}
          min="1"
          max="20"
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label for="edge-line-style">Line Style</label>
        <select
          id="edge-line-style"
          value={lineStyle}
          onchange={(e) => { const target = e.target as HTMLSelectElement; lineStyle = target.value; handleInputChange('line-style', target.value); }}
          class="form-control"
        >
          {#each lineStyleOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="edge-curve-style">Curve Style</label>
        <select
          id="edge-curve-style"
          value={curveStyle}
          onchange={(e) => { const target = e.target as HTMLSelectElement; curveStyle = target.value; handleInputChange('curve-style', target.value); }}
          class="form-control"
        >
          {#each curveStyleOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
      
      <div class="form-group">
        <label for="edge-arrow-shape">Arrow Shape</label>
        <select
          id="edge-arrow-shape"
          value={arrowShape}
          onchange={(e) => { const target = e.target as HTMLSelectElement; arrowShape = target.value; handleInputChange('target-arrow-shape', target.value); }}
          class="form-control"
        >
          {#each arrowShapeOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Text Properties -->
  <div class="form-section">
    <h4>Text Properties</h4>
    
    <div class="form-row">
      <div class="form-group">
        <label for="edge-font-size">Font Size</label>
        <input
          type="number"
          id="edge-font-size"
          value={fontSize}
          oninput={(e) => { const target = e.target as HTMLInputElement; fontSize = parseInt(target.value); handleInputChange('font-size', parseInt(target.value)); }}
          min="8"
          max="32"
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label for="edge-font-weight">Font Weight</label>
        <select
          id="edge-font-weight"
          value={fontWeight}
          onchange={(e) => { const target = e.target as HTMLSelectElement; fontWeight = target.value; handleInputChange('font-weight', target.value); }}
          class="form-control"
        >
          {#each fontWeightOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Advanced Properties -->
  <div class="form-section">
    <h4>Advanced Properties</h4>
    
    <div class="form-row">
      <div class="form-group">
        <label for="edge-opacity">Opacity</label>
        <input
          type="range"
          id="edge-opacity"
          value={opacity}
          oninput={(e) => { const target = e.target as HTMLInputElement; opacity = parseFloat(target.value); handleInputChange('opacity', parseFloat(target.value)); }}
          min="0"
          max="1"
          step="0.1"
          class="form-control"
        />
        <div class="range-value">{opacity}</div>
      </div>
      
      <div class="form-group">
        <label for="edge-z-index">Z-Index</label>
        <input
          type="number"
          id="edge-z-index"
          value={zIndex}
          oninput={(e) => { const target = e.target as HTMLInputElement; zIndex = parseInt(target.value); handleInputChange('z-index', parseInt(target.value)); }}
          min="0"
          max="100"
          class="form-control"
        />
      </div>
    </div>
  </div>
</div>

<style>
  .edge-editor {
    padding: 1rem;
  }

  .form-section {
    margin-bottom: 1.5rem;
  }

  .form-section h4 {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: #495057;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #495057;
  }

  .form-control {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .form-control:focus {
    border-color: #007bff;
  }

  .color-input-group {
    display: flex;
    gap: 0.5rem;
  }

  .color-picker {
    width: 50px;
    height: 38px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
  }

  .color-text {
    flex: 1;
  }

  .range-value {
    text-align: center;
    font-size: 0.75rem;
    color: #6c757d;
    margin-top: 0.25rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style> 