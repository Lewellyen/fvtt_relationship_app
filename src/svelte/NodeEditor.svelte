<script lang="ts">
  import type { NodeData, CytoGraphNodeAttributes } from "../global";

  const props = $props<{
    node?: NodeData | null;
    onUpdate?: (nodeId: string, updates: Partial<CytoGraphNodeAttributes>) => void;
  }>();

  // Lokaler State für die Eingabefelder
  let label = $state('');
  let x = $state(0);
  let y = $state(0);
  let color = $state('#000000');
  let backgroundColor = $state('#ffffff');
  let borderColor = $state('#000000');
  let borderWidth = $state(0);
  let borderStyle = $state('solid');
  let shape = $state('ellipse');
  let width = $state(80);
  let height = $state(80);
  let fontSize = $state(14);
  let fontWeight = $state('normal');
  let opacity = $state(1);
  let zIndex = $state(0);

  // Aktualisiere lokale Werte wenn sich der Node ändert
  $effect(() => {
    if (props.node) {
      const attrs = props.node.cytoScapeAttributes;
      label = attrs.label || '';
      x = attrs.x || 0;
      y = attrs.y || 0;
      color = attrs.color || '#000000';
      backgroundColor = attrs['background-color'] || '#ffffff';
      borderColor = attrs['border-color'] || '#000000';
      borderWidth = attrs['border-width'] || 0;
      borderStyle = attrs['border-style'] || 'solid';
      shape = attrs.shape || 'ellipse';
      width = attrs.width || 80;
      height = attrs.height || 80;
      fontSize = attrs['font-size'] || 14;
      fontWeight = attrs['font-weight'] || 'normal';
      opacity = attrs.opacity || 1;
      zIndex = attrs['z-index'] || 0;
    }
  });

  // Handler für Eingabeänderungen
  function handleInputChange(field: string, value: any) {
    if (!props.node || !props.onUpdate) return;
    
    const updates: Partial<CytoGraphNodeAttributes> = {};
    updates[field as keyof CytoGraphNodeAttributes] = value;
    
    props.onUpdate(props.node.id, updates);
  }

  // Vordefinierte Optionen
  const shapeOptions = [
    { value: 'ellipse', label: 'Ellipse' },
    { value: 'triangle', label: 'Dreieck' },
    { value: 'rectangle', label: 'Rechteck' },
    { value: 'diamond', label: 'Diamant' },
    { value: 'hexagon', label: 'Sechseck' },
    { value: 'octagon', label: 'Achteck' },
    { value: 'vee', label: 'V-Form' },
    { value: 'rhomboid', label: 'Rhomboid' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'star', label: 'Stern' },
    { value: 'tag', label: 'Tag' },
    { value: 'roundrectangle', label: 'Abgerundetes Rechteck' },
    { value: 'cutrectangle', label: 'Abgeschnittenes Rechteck' },
    { value: 'barrel', label: 'Fass' },
    { value: 'bottomroundrectangle', label: 'Unten abgerundet' },
    { value: 'concavehexagon', label: 'Konkaves Sechseck' }
  ];

  const borderStyleOptions = [
    { value: 'solid', label: 'Durchgezogen' },
    { value: 'dotted', label: 'Gepunktet' },
    { value: 'dashed', label: 'Gestrichelt' },
    { value: 'double', label: 'Doppelt' },
    { value: 'groove', label: 'Gefurcht' },
    { value: 'ridge', label: 'Erhaben' },
    { value: 'inset', label: 'Eingesetzt' },
    { value: 'outset', label: 'Hervorgehoben' }
  ];

  const fontWeightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Fett' },
    { value: 'bolder', label: 'Fetter' },
    { value: 'lighter', label: 'Dünner' },
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '300', label: '300' },
    { value: '400', label: '400' },
    { value: '500', label: '500' },
    { value: '600', label: '600' },
    { value: '700', label: '700' },
    { value: '800', label: '800' },
    { value: '900', label: '900' }
  ];
</script>

<div class="node-editor">
  <div class="editor-header">
    <h3>Node Bearbeiten</h3>
    {#if props.node}
      <span class="node-id">ID: {props.node.id}</span>
    {/if}
  </div>

  {#if props.node}
    <div class="editor-content">
      <!-- Grundlegende Eigenschaften -->
      <div class="form-group">
        <h4>Grundlegend</h4>
        
        <div class="input-row">
          <label for="label">Label:</label>
          <input 
            id="label"
            type="text" 
            bind:value={label}
            oninput={() => handleInputChange('label', label)}
            placeholder="Node Beschriftung"
          />
        </div>

        <div class="input-row">
          <label for="x">X-Position:</label>
          <input 
            id="x"
            type="number" 
            bind:value={x}
            oninput={() => handleInputChange('x', x)}
            step="1"
          />
        </div>

        <div class="input-row">
          <label for="y">Y-Position:</label>
          <input 
            id="y"
            type="number" 
            bind:value={y}
            oninput={() => handleInputChange('y', y)}
            step="1"
          />
        </div>
      </div>

      <!-- Visuelle Eigenschaften -->
      <div class="form-group">
        <h4>Darstellung</h4>
        
        <div class="input-row">
          <label for="shape">Form:</label>
          <select 
            id="shape"
            bind:value={shape}
            onchange={() => handleInputChange('shape', shape)}
          >
            {#each shapeOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <div class="input-row">
          <label for="width">Breite:</label>
          <input 
            id="width"
            type="number" 
            bind:value={width}
            oninput={() => handleInputChange('width', width)}
            min="1"
            max="500"
            step="1"
          />
        </div>

        <div class="input-row">
          <label for="height">Höhe:</label>
          <input 
            id="height"
            type="number" 
            bind:value={height}
            oninput={() => handleInputChange('height', height)}
            min="1"
            max="500"
            step="1"
          />
        </div>

        <div class="input-row">
          <label for="opacity">Transparenz:</label>
          <input 
            id="opacity"
            type="range" 
            bind:value={opacity}
            oninput={() => handleInputChange('opacity', opacity)}
            min="0"
            max="1"
            step="0.1"
          />
          <span class="value-display">{opacity}</span>
        </div>

        <div class="input-row">
          <label for="zIndex">Z-Index:</label>
          <input 
            id="zIndex"
            type="number" 
            bind:value={zIndex}
            oninput={() => handleInputChange('z-index', zIndex)}
            step="1"
          />
        </div>
      </div>

      <!-- Farben -->
      <div class="form-group">
        <h4>Farben</h4>
        
        <div class="input-row">
          <label for="color">Textfarbe:</label>
          <input 
            id="color"
            type="color" 
            bind:value={color}
            oninput={() => handleInputChange('color', color)}
          />
          <input 
            type="text" 
            bind:value={color}
            oninput={() => handleInputChange('color', color)}
            placeholder="#000000"
          />
        </div>

        <div class="input-row">
          <label for="backgroundColor">Hintergrundfarbe:</label>
          <input 
            id="backgroundColor"
            type="color" 
            bind:value={backgroundColor}
            oninput={() => handleInputChange('background-color', backgroundColor)}
          />
          <input 
            type="text" 
            bind:value={backgroundColor}
            oninput={() => handleInputChange('background-color', backgroundColor)}
            placeholder="#ffffff"
          />
        </div>

        <div class="input-row">
          <label for="borderColor">Rahmenfarbe:</label>
          <input 
            id="borderColor"
            type="color" 
            bind:value={borderColor}
            oninput={() => handleInputChange('border-color', borderColor)}
          />
          <input 
            type="text" 
            bind:value={borderColor}
            oninput={() => handleInputChange('border-color', borderColor)}
            placeholder="#000000"
          />
        </div>
      </div>

      <!-- Rahmen -->
      <div class="form-group">
        <h4>Rahmen</h4>
        
        <div class="input-row">
          <label for="borderWidth">Rahmenbreite:</label>
          <input 
            id="borderWidth"
            type="number" 
            bind:value={borderWidth}
            oninput={() => handleInputChange('border-width', borderWidth)}
            min="0"
            max="20"
            step="1"
          />
        </div>

        <div class="input-row">
          <label for="borderStyle">Rahmenstil:</label>
          <select 
            id="borderStyle"
            bind:value={borderStyle}
            onchange={() => handleInputChange('border-style', borderStyle)}
          >
            {#each borderStyleOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Text -->
      <div class="form-group">
        <h4>Text</h4>
        
        <div class="input-row">
          <label for="fontSize">Schriftgröße:</label>
          <input 
            id="fontSize"
            type="number" 
            bind:value={fontSize}
            oninput={() => handleInputChange('font-size', fontSize)}
            min="8"
            max="72"
            step="1"
          />
        </div>

        <div class="input-row">
          <label for="fontWeight">Schriftgewicht:</label>
          <select 
            id="fontWeight"
            bind:value={fontWeight}
            onchange={() => handleInputChange('font-weight', fontWeight)}
          >
            {#each fontWeightOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  {:else}
    <div class="no-selection">
      <p>Kein Node ausgewählt</p>
      <p class="hint">Klicke auf einen Node in der Liste oder im Graphen</p>
    </div>
  {/if}
</div>

<style>
  .node-editor {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
    border-left: 1px solid #dee2e6;
  }

  .editor-header {
    padding: 1rem;
    background: #e9ecef;
    border-bottom: 1px solid #dee2e6;
  }

  .editor-header h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #495057;
  }

  .node-id {
    font-size: 0.85rem;
    color: #6c757d;
    font-family: monospace;
  }

  .editor-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group h4 {
    margin: 0 0 0.75rem 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #495057;
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 0.25rem;
  }

  .input-row {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    gap: 0.5rem;
  }

  .input-row label {
    min-width: 120px;
    font-size: 0.85rem;
    color: #495057;
    font-weight: 500;
  }

  .input-row input,
  .input-row select {
    flex: 1;
    padding: 0.375rem 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 0.85rem;
    background: white;
  }

  .input-row input:focus,
  .input-row select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .input-row input[type="color"] {
    width: 50px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .input-row input[type="range"] {
    flex: 1;
    height: 6px;
    background: #dee2e6;
    border-radius: 3px;
    outline: none;
  }

  .input-row input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
  }

  .input-row input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }

  .value-display {
    min-width: 40px;
    text-align: center;
    font-size: 0.8rem;
    color: #6c757d;
    font-family: monospace;
  }

  .no-selection {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    text-align: center;
    padding: 2rem;
  }

  .no-selection p {
    margin: 0.5rem 0;
  }

  .hint {
    font-size: 0.85rem;
    color: #adb5bd;
  }
</style> 