var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
(function() {
  "use strict";
  var _listeners, _observer, _options, _ResizeObserverSingleton_instances, getObserver_fn, _anchor, _hydrate_open, _props, _children, _effect, _main_effect, _failed_effect, _is_creating_fallback, _Boundary_instances, run_fn, _events, _instance, _a, _logger, _svelte, _css, _graphService, _logger2, _svelte2, _css2, _logger3, _svelte3, _css3, _logger4, _svelte4, _css4;
  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = '\n  .relationship-graph-view.svelte-qaxdvx {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1rem;\n    height: 100vh;\n  }\n\n  .graph-container.svelte-qaxdvx {\n    flex: 1;\n    min-height: 0;\n  }\n\n  .info-container.svelte-qaxdvx {\n    height: 300px;\n    min-height: 300px;\n  }\n\n  .relationship-graph-view.svelte-i1dhkx {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1rem;\n  }\n\r\n  .form-field.svelte-1ykx1li {\r\n    margin-bottom: 1rem;\r\n  }\r\n  \r\n  .field-width-full.svelte-1ykx1li {\r\n    width: 100%;\r\n  }\r\n  \r\n  .field-width-half.svelte-1ykx1li {\r\n    width: calc(50% - 0.5rem);\r\n  }\r\n  \r\n  .field-width-third.svelte-1ykx1li {\r\n    width: calc(33.333% - 0.667rem);\r\n  }\r\n  \r\n  .field-label.svelte-1ykx1li {\r\n    display: block;\r\n    margin-bottom: 0.5rem;\r\n    font-weight: 500;\r\n    color: var(--color-text-primary);\r\n    font-size: 0.9rem;\r\n  }\r\n  \r\n  .field-input.svelte-1ykx1li,\r\n  .field-textarea.svelte-1ykx1li,\r\n  .field-select.svelte-1ykx1li {\r\n    width: 100%;\r\n    padding: 0.5rem;\r\n    border: 1px solid var(--color-border-primary);\r\n    border-radius: 4px;\r\n    font-size: 0.9rem;\r\n    transition: border-color 0.2s, box-shadow 0.2s;\r\n  }\r\n  \r\n  .field-input.svelte-1ykx1li:focus,\r\n  .field-textarea.svelte-1ykx1li:focus,\r\n  .field-select.svelte-1ykx1li:focus {\r\n    outline: none;\r\n    border-color: var(--color-primary);\r\n    box-shadow: 0 0 0 2px var(--color-primary-alpha);\r\n  }\r\n  \r\n  .field-textarea.svelte-1ykx1li {\r\n    min-height: 80px;\r\n    resize: vertical;\r\n    font-family: inherit;\r\n  }\r\n  \r\n  .field-select.svelte-1ykx1li {\r\n    cursor: pointer;\r\n  }\r\n  \r\n  /* Checkbox-Gruppe Styles */\r\n  .checkbox-group.svelte-1ykx1li {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 0.5rem;\r\n    padding: 0.5rem;\r\n    border: 1px solid var(--color-border-primary);\r\n    border-radius: 4px;\r\n    background: var(--color-background-primary);\r\n  }\r\n  \r\n  .checkbox-option.svelte-1ykx1li {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n    cursor: pointer;\r\n    padding: 0.25rem;\r\n    border-radius: 4px;\r\n    transition: background-color 0.2s;\r\n  }\r\n  \r\n  .checkbox-option.svelte-1ykx1li:hover {\r\n    background: var(--color-background-secondary);\r\n  }\r\n  \r\n  .checkbox-option.svelte-1ykx1li input[type="checkbox"]:where(.svelte-1ykx1li) {\r\n    margin: 0;\r\n    accent-color: var(--color-primary);\r\n    width: 1.2rem;\r\n    height: 1.2rem;\r\n    cursor: pointer;\r\n  }\r\n  \r\n  .checkbox-option.svelte-1ykx1li span:where(.svelte-1ykx1li) {\r\n    color: var(--color-text-primary);\r\n    font-size: 0.9rem;\r\n    cursor: pointer;\r\n  }\r\n  \r\n  .field-checkbox.svelte-1ykx1li {\r\n    margin-right: 0.5rem;\r\n    width: auto;\r\n  }\r\n  \r\n  .checkbox-label.svelte-1ykx1li {\r\n    display: flex;\r\n    align-items: center;\r\n    cursor: pointer;\r\n  }\r\n  \r\n  .checkbox-text.svelte-1ykx1li {\r\n    cursor: pointer;\r\n  }\r\n  \r\n  .field-color-container.svelte-1ykx1li {\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    align-items: center;\r\n  }\r\n  \r\n  .field-color.svelte-1ykx1li {\r\n    width: 3rem;\r\n    height: 2.5rem;\r\n    padding: 0;\r\n    border: 1px solid var(--color-border-primary);\r\n    border-radius: 4px;\r\n    cursor: pointer;\r\n  }\r\n  \r\n  .field-color-text.svelte-1ykx1li {\r\n    flex: 1;\r\n    font-family: monospace;\r\n  }\r\n  \r\n  .field-description.svelte-1ykx1li {\r\n    display: block;\r\n    margin-top: 0.25rem;\r\n    font-size: 0.8rem;\r\n    line-height: 1.4;\r\n  }\r\n  \r\n  .field-error.svelte-1ykx1li {\r\n    display: block;\r\n    margin-top: 0.25rem;\r\n    color: var(--color-error);\r\n    font-size: 0.8rem;\r\n    line-height: 1.4;\r\n  }\r\n  \r\n  .has-error.svelte-1ykx1li .field-input:where(.svelte-1ykx1li),\r\n  .has-error.svelte-1ykx1li .field-textarea:where(.svelte-1ykx1li),\r\n  .has-error.svelte-1ykx1li .field-select:where(.svelte-1ykx1li) {\r\n    border-color: var(--color-error);\r\n  }\r\n  \r\n  .has-error.svelte-1ykx1li .field-input:where(.svelte-1ykx1li):focus,\r\n  .has-error.svelte-1ykx1li .field-textarea:where(.svelte-1ykx1li):focus,\r\n  .has-error.svelte-1ykx1li .field-select:where(.svelte-1ykx1li):focus {\r\n    border-color: var(--color-error);\r\n    box-shadow: 0 0 0 2px var(--color-error-alpha);\r\n  }\r\n  \r\n  .disabled.svelte-1ykx1li .field-input:where(.svelte-1ykx1li),\r\n  .disabled.svelte-1ykx1li .field-textarea:where(.svelte-1ykx1li),\r\n  .disabled.svelte-1ykx1li .field-select:where(.svelte-1ykx1li),\r\n  .disabled.svelte-1ykx1li .field-checkbox:where(.svelte-1ykx1li) {\r\n    opacity: 0.6;\r\n    cursor: not-allowed;\r\n  }\r\n  \r\n  .readonly.svelte-1ykx1li .field-input:where(.svelte-1ykx1li),\r\n  .readonly.svelte-1ykx1li .field-textarea:where(.svelte-1ykx1li),\r\n  .readonly.svelte-1ykx1li .field-select:where(.svelte-1ykx1li) {\r\n    background-color: var(--color-background-secondary);\r\n    cursor: not-allowed;\r\n  }\r\n  \r\n  /* Responsive Design */\r\n  @media (max-width: 768px) {\r\n    .field-width-half.svelte-1ykx1li,\r\n    .field-width-third.svelte-1ykx1li {\r\n      width: 100%;\r\n    }\r\n  }\r\n\r\n  /* Foundry VTT CSS-Variablen verwenden */\r\n  .form-container.svelte-1hegfbw {\r\n    background: var(--color-background-primary);\r\n    border: 1px solid var(--color-border-primary);\r\n    border-radius: var(--border-radius);\r\n    padding: 1rem;\r\n  }\r\n  \r\n  .form-header.svelte-1hegfbw {\r\n    border-bottom: 1px solid var(--color-border-primary);\r\n    padding: 1rem;\r\n    background: var(--color-background-secondary);\r\n    border-radius: var(--border-radius) var(--border-radius) 0 0;\r\n    margin: -1rem -1rem 1rem -1rem;\r\n  }\r\n  \r\n  .form-title.svelte-1hegfbw {\r\n    color: var(--color-text-primary);\r\n    margin: 0;\r\n    font-size: 1.2rem;\r\n    font-weight: 600;\r\n  }\r\n  \r\n  .form-description.svelte-1hegfbw {\r\n    color: var(--color-text-secondary);\r\n    margin: 0.5rem 0 0 0;\r\n    font-size: 0.9rem;\r\n  }\r\n  \r\n\r\n  \r\n  .field-container.svelte-1hegfbw {\r\n    margin-bottom: 1.5rem;\r\n    transition: all 0.3s ease;\r\n  }\r\n  \r\n  .field-container.svelte-1hegfbw:focus-within {\r\n    transform: translateY(-2px);\r\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\r\n    border-radius: var(--border-radius);\r\n    padding: 0.5rem;\r\n    margin: 0.5rem -0.5rem 1.5rem -0.5rem;\r\n  }\r\n  \r\n  .form-actions.svelte-1hegfbw {\r\n    border-top: 1px solid var(--color-border-primary);\r\n    padding: 1rem;\r\n    background: var(--color-background-secondary);\r\n    border-radius: 0 0 var(--border-radius) var(--border-radius);\r\n    display: flex;\r\n    gap: 0.5rem;\r\n    justify-content: flex-end;\r\n    margin: 1rem -1rem -1rem -1rem;\r\n  }\r\n  \r\n  .btn.svelte-1hegfbw {\r\n    padding: 0.5rem 1rem;\r\n    border: 1px solid var(--color-border-primary);\r\n    border-radius: var(--border-radius);\r\n    cursor: pointer;\r\n    font-size: 0.9rem;\r\n    transition: all 0.2s;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n  }\r\n  \r\n  .btn-primary.svelte-1hegfbw {\r\n    background: var(--color-primary);\r\n    color: var(--color-text-primary);\r\n    border-color: var(--color-primary);\r\n  }\r\n  \r\n  .btn-primary.svelte-1hegfbw:hover:not(:disabled) {\r\n    background: var(--color-primary-hover);\r\n  }\r\n  \r\n  .btn-secondary.svelte-1hegfbw {\r\n    background: var(--color-background-primary);\r\n    color: var(--color-text-primary);\r\n  }\r\n  \r\n  .btn-secondary.svelte-1hegfbw:hover:not(:disabled) {\r\n    background: var(--color-background-secondary);\r\n  }\r\n  \r\n  .btn.svelte-1hegfbw:disabled {\r\n    opacity: 0.6;\r\n    cursor: not-allowed;\r\n  }\r\n  \r\n  .spinner.svelte-1hegfbw {\r\n    display: inline-block;\r\n    width: 1rem;\r\n    height: 1rem;\r\n    border: 2px solid transparent;\r\n    border-top: 2px solid currentColor;\r\n    border-radius: 50%;\r\n    animation: svelte-1hegfbw-spin 1s linear infinite;\r\n  }\r\n  \r\n  @keyframes svelte-1hegfbw-spin {\r\n    0% { transform: rotate(0deg); }\r\n    100% { transform: rotate(360deg); }\r\n  }\r\n  \r\n  /* Scroll-Indikator für bessere UX */\r\n  .dynamic-dialog-app.svelte-1hegfbw::-webkit-scrollbar {\r\n    width: 12px;\r\n  }\r\n  \r\n  .dynamic-dialog-app.svelte-1hegfbw::-webkit-scrollbar-track {\r\n    background: var(--color-background-secondary);\r\n    border-radius: 6px;\r\n  }\r\n  \r\n  .dynamic-dialog-app.svelte-1hegfbw::-webkit-scrollbar-thumb {\r\n    background: var(--color-border-primary);\r\n    border-radius: 6px;\r\n  }\r\n  \r\n  .dynamic-dialog-app.svelte-1hegfbw::-webkit-scrollbar-thumb:hover {\r\n    background: var(--color-primary);\r\n  }\r\n  \r\n  /* Fokus-Indikator für bessere Accessibility */\r\n  .field-container.svelte-1hegfbw:focus-within .field-label {\r\n    color: var(--color-primary);\r\n    font-weight: 600;\r\n  }\r\n  \r\n  /* Smooth Transitions für alle interaktiven Elemente */\r\n  .form-container.svelte-1hegfbw :where(.svelte-1hegfbw) {\r\n    transition: border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;\r\n  }\r\n\n  /* Gleiches Scrolling wie DynamicFormSheet */\n  .metadata-container.svelte-qx734j {\n    height: 100vh;\n    max-height: 100vh;\n    overflow-y: auto;\n    padding: 1rem;\n    box-sizing: border-box;\n  }\n\n  .metadata-header.svelte-qx734j {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 2rem;\n    padding-bottom: 1rem;\n    border-bottom: 1px solid var(--color-border-primary);\n  }\n\n  .header-actions.svelte-qx734j {\n    display: flex;\n    gap: 0.5rem;\n    align-items: center;\n  }\n\n  .metadata-header.svelte-qx734j h1:where(.svelte-qx734j) {\n    margin: 0;\n    font-size: 1.5rem;\n    font-weight: 600;\n  }\n\n  .metadata-content.svelte-qx734j {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .schema-card.svelte-qx734j {\n    background: var(--color-background-secondary);\n    border: 1px solid var(--color-border-primary);\n    border-radius: 6px;\n    overflow: hidden;\n  }\n\n  .schema-card.selected.svelte-qx734j {\n    border-color: var(--color-primary);\n  }\n\n  .schema-header.svelte-qx734j {\n    padding: 1rem;\n    cursor: pointer;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: var(--color-background-primary);\n    border-bottom: 1px solid var(--color-border-primary);\n  }\n\n  .schema-header.svelte-qx734j:hover {\n    background: var(--color-background-tertiary);\n  }\n\n  .schema-header.svelte-qx734j h3:where(.svelte-qx734j) {\n    margin: 0;\n    font-size: 1.1rem;\n    font-weight: 600;\n  }\n\n  .version.svelte-qx734j {\n    background: var(--color-info);\n    color: var(--color-text-primary);\n    padding: 0.2rem 0.5rem;\n    border-radius: 4px;\n    font-size: 0.8rem;\n  }\n\n  .schema-details.svelte-qx734j {\n    padding: 1rem;\n    background: var(--color-background-secondary);\n  }\n\n  .schema-details.svelte-qx734j p:where(.svelte-qx734j) {\n    margin: 0.5rem 0;\n    font-size: 0.9rem;\n  }\n\n  .actions.svelte-qx734j {\n    display: flex;\n    gap: 0.5rem;\n    margin: 1rem 0;\n    flex-wrap: wrap;\n  }\n\n  .rows-section.svelte-qx734j {\n    margin-top: 1.5rem;\n    padding-top: 1rem;\n    border-top: 1px solid var(--color-border-primary);\n  }\n\n  .rows-section.svelte-qx734j h4:where(.svelte-qx734j) {\n    margin: 0 0 1rem 0;\n    font-size: 1rem;\n    font-weight: 600;\n  }\n\n  .row-item.svelte-qx734j {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0.75rem;\n    background: var(--color-background-primary);\n    border: 1px solid var(--color-border-primary);\n    border-radius: 4px;\n    margin-bottom: 0.5rem;\n  }\n\n  .row-info.svelte-qx734j {\n    font-size: 0.9rem;\n  }\n\n  .row-actions.svelte-qx734j {\n    display: flex;\n    gap: 0.5rem;\n  }\n\n  .error-message.svelte-qx734j,\n  .success-message.svelte-qx734j {\n    padding: 1rem;\n    border-radius: 4px;\n    margin-bottom: 1rem;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .error-message.svelte-qx734j {\n    background: var(--color-error-background);\n    color: var(--color-error);\n    border: 1px solid var(--color-error-border);\n  }\n  \n  .success-message.svelte-qx734j {\n    background: var(--color-success-background);\n    color: var(--color-success);\n    border: 1px solid var(--color-success-border);\n  }\n\n  .close-btn.svelte-qx734j {\n    background: none;\n    border: none;\n    font-size: 1.2rem;\n    cursor: pointer;\n    color: inherit;\n    padding: 0;\n    margin-left: 1rem;\n  }\n\n  .close-btn.svelte-qx734j:hover {\n    opacity: 0.7;\n  }\n/* this gets exported as style.css and can be used for the default theming */\n/* these are the necessary styles for React/Svelte Flow, they get used by base.css and style.css */\n.svelte-flow {\n  direction: ltr;\n\n  --xy-edge-stroke-default: #b1b1b7;\n  --xy-edge-stroke-width-default: 1;\n  --xy-edge-stroke-selected-default: #555;\n\n  --xy-connectionline-stroke-default: #b1b1b7;\n  --xy-connectionline-stroke-width-default: 1;\n\n  --xy-attribution-background-color-default: rgba(255, 255, 255, 0.5);\n\n  --xy-minimap-background-color-default: #fff;\n  --xy-minimap-mask-background-color-default: rgba(240, 240, 240, 0.6);\n  --xy-minimap-mask-stroke-color-default: transparent;\n  --xy-minimap-mask-stroke-width-default: 1;\n  --xy-minimap-node-background-color-default: #e2e2e2;\n  --xy-minimap-node-stroke-color-default: transparent;\n  --xy-minimap-node-stroke-width-default: 2;\n\n  --xy-background-color-default: transparent;\n  --xy-background-pattern-dots-color-default: #91919a;\n  --xy-background-pattern-lines-color-default: #eee;\n  --xy-background-pattern-cross-color-default: #e2e2e2;\n  background-color: var(--xy-background-color, var(--xy-background-color-default));\n  --xy-node-color-default: inherit;\n  --xy-node-border-default: 1px solid #1a192b;\n  --xy-node-background-color-default: #fff;\n  --xy-node-group-background-color-default: rgba(240, 240, 240, 0.25);\n  --xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(0, 0, 0, 0.08);\n  --xy-node-boxshadow-selected-default: 0 0 0 0.5px #1a192b;\n  --xy-node-border-radius-default: 3px;\n\n  --xy-handle-background-color-default: #1a192b;\n  --xy-handle-border-color-default: #fff;\n\n  --xy-selection-background-color-default: rgba(0, 89, 220, 0.08);\n  --xy-selection-border-default: 1px dotted rgba(0, 89, 220, 0.8);\n\n  --xy-controls-button-background-color-default: #fefefe;\n  --xy-controls-button-background-color-hover-default: #f4f4f4;\n  --xy-controls-button-color-default: inherit;\n  --xy-controls-button-color-hover-default: inherit;\n  --xy-controls-button-border-color-default: #eee;\n  --xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, 0.08);\n\n  --xy-edge-label-background-color-default: #ffffff;\n  --xy-edge-label-color-default: inherit;\n  --xy-resize-background-color-default: #3367d9;\n}\n.svelte-flow.dark {\n  --xy-edge-stroke-default: #3e3e3e;\n  --xy-edge-stroke-width-default: 1;\n  --xy-edge-stroke-selected-default: #727272;\n\n  --xy-connectionline-stroke-default: #b1b1b7;\n  --xy-connectionline-stroke-width-default: 1;\n\n  --xy-attribution-background-color-default: rgba(150, 150, 150, 0.25);\n\n  --xy-minimap-background-color-default: #141414;\n  --xy-minimap-mask-background-color-default: rgba(60, 60, 60, 0.6);\n  --xy-minimap-mask-stroke-color-default: transparent;\n  --xy-minimap-mask-stroke-width-default: 1;\n  --xy-minimap-node-background-color-default: #2b2b2b;\n  --xy-minimap-node-stroke-color-default: transparent;\n  --xy-minimap-node-stroke-width-default: 2;\n\n  --xy-background-color-default: #141414;\n  --xy-background-pattern-dots-color-default: #777;\n  --xy-background-pattern-lines-color-default: #777;\n  --xy-background-pattern-cross-color-default: #777;\n  --xy-node-color-default: #f8f8f8;\n  --xy-node-border-default: 1px solid #3c3c3c;\n  --xy-node-background-color-default: #1e1e1e;\n  --xy-node-group-background-color-default: rgba(240, 240, 240, 0.25);\n  --xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(255, 255, 255, 0.08);\n  --xy-node-boxshadow-selected-default: 0 0 0 0.5px #999;\n\n  --xy-handle-background-color-default: #bebebe;\n  --xy-handle-border-color-default: #1e1e1e;\n\n  --xy-selection-background-color-default: rgba(200, 200, 220, 0.08);\n  --xy-selection-border-default: 1px dotted rgba(200, 200, 220, 0.8);\n\n  --xy-controls-button-background-color-default: #2b2b2b;\n  --xy-controls-button-background-color-hover-default: #3e3e3e;\n  --xy-controls-button-color-default: #f8f8f8;\n  --xy-controls-button-color-hover-default: #fff;\n  --xy-controls-button-border-color-default: #5b5b5b;\n  --xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, 0.08);\n\n  --xy-edge-label-background-color-default: #141414;\n  --xy-edge-label-color-default: #f8f8f8;\n}\n.svelte-flow__background {\n  background-color: var(--xy-background-color-props, var(--xy-background-color, var(--xy-background-color-default)));\n  pointer-events: none;\n  z-index: -1;\n}\n.svelte-flow__container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n.svelte-flow__pane {\n  z-index: 1;\n}\n.svelte-flow__pane.draggable {\n    cursor: grab;\n  }\n.svelte-flow__pane.dragging {\n    cursor: grabbing;\n  }\n.svelte-flow__pane.selection {\n    cursor: pointer;\n  }\n.svelte-flow__viewport {\n  transform-origin: 0 0;\n  z-index: 2;\n  pointer-events: none;\n}\n.svelte-flow__renderer {\n  z-index: 4;\n}\n.svelte-flow__selection {\n  z-index: 6;\n}\n.svelte-flow__nodesselection-rect:focus,\n.svelte-flow__nodesselection-rect:focus-visible {\n  outline: none;\n}\n.svelte-flow__edge-path {\n  stroke: var(--xy-edge-stroke, var(--xy-edge-stroke-default));\n  stroke-width: var(--xy-edge-stroke-width, var(--xy-edge-stroke-width-default));\n  fill: none;\n}\n.svelte-flow__connection-path {\n  stroke: var(--xy-connectionline-stroke, var(--xy-connectionline-stroke-default));\n  stroke-width: var(--xy-connectionline-stroke-width, var(--xy-connectionline-stroke-width-default));\n  fill: none;\n}\n.svelte-flow .svelte-flow__edges {\n  position: absolute;\n}\n.svelte-flow .svelte-flow__edges svg {\n    overflow: visible;\n    position: absolute;\n    pointer-events: none;\n  }\n.svelte-flow__edge {\n  pointer-events: visibleStroke;\n}\n.svelte-flow__edge.selectable {\n    cursor: pointer;\n  }\n.svelte-flow__edge.animated path {\n    stroke-dasharray: 5;\n    animation: dashdraw 0.5s linear infinite;\n  }\n.svelte-flow__edge.animated path.svelte-flow__edge-interaction {\n    stroke-dasharray: none;\n    animation: none;\n  }\n.svelte-flow__edge.inactive {\n    pointer-events: none;\n  }\n.svelte-flow__edge.selected,\n  .svelte-flow__edge:focus,\n  .svelte-flow__edge:focus-visible {\n    outline: none;\n  }\n.svelte-flow__edge.selected .svelte-flow__edge-path,\n  .svelte-flow__edge.selectable:focus .svelte-flow__edge-path,\n  .svelte-flow__edge.selectable:focus-visible .svelte-flow__edge-path {\n    stroke: var(--xy-edge-stroke-selected, var(--xy-edge-stroke-selected-default));\n  }\n.svelte-flow__edge-textwrapper {\n    pointer-events: all;\n  }\n.svelte-flow__edge .svelte-flow__edge-text {\n    pointer-events: none;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n            user-select: none;\n  }\n/* Arrowhead marker styles - use CSS custom properties as default */\n.svelte-flow__arrowhead polyline {\n  stroke: var(--xy-edge-stroke, var(--xy-edge-stroke-default));\n}\n.svelte-flow__arrowhead polyline.arrowclosed {\n  fill: var(--xy-edge-stroke, var(--xy-edge-stroke-default));\n}\n.svelte-flow__connection {\n  pointer-events: none;\n}\n.svelte-flow__connection .animated {\n    stroke-dasharray: 5;\n    animation: dashdraw 0.5s linear infinite;\n  }\nsvg.svelte-flow__connectionline {\n  z-index: 1001;\n  overflow: visible;\n  position: absolute;\n}\n.svelte-flow__nodes {\n  pointer-events: none;\n  transform-origin: 0 0;\n}\n.svelte-flow__node {\n  position: absolute;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  pointer-events: all;\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  cursor: default;\n}\n.svelte-flow__node.selectable {\n    cursor: pointer;\n  }\n.svelte-flow__node.draggable {\n    cursor: grab;\n    pointer-events: all;\n  }\n.svelte-flow__node.draggable.dragging {\n      cursor: grabbing;\n    }\n.svelte-flow__nodesselection {\n  z-index: 3;\n  transform-origin: left top;\n  pointer-events: none;\n}\n.svelte-flow__nodesselection-rect {\n    position: absolute;\n    pointer-events: all;\n    cursor: grab;\n  }\n.svelte-flow__handle {\n  position: absolute;\n  pointer-events: none;\n  min-width: 5px;\n  min-height: 5px;\n  width: 6px;\n  height: 6px;\n  background-color: var(--xy-handle-background-color, var(--xy-handle-background-color-default));\n  border: 1px solid var(--xy-handle-border-color, var(--xy-handle-border-color-default));\n  border-radius: 100%;\n}\n.svelte-flow__handle.connectingfrom {\n    pointer-events: all;\n  }\n.svelte-flow__handle.connectionindicator {\n    pointer-events: all;\n    cursor: crosshair;\n  }\n.svelte-flow__handle-bottom {\n    top: auto;\n    left: 50%;\n    bottom: 0;\n    transform: translate(-50%, 50%);\n  }\n.svelte-flow__handle-top {\n    top: 0;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n.svelte-flow__handle-left {\n    top: 50%;\n    left: 0;\n    transform: translate(-50%, -50%);\n  }\n.svelte-flow__handle-right {\n    top: 50%;\n    right: 0;\n    transform: translate(50%, -50%);\n  }\n.svelte-flow__edgeupdater {\n  cursor: move;\n  pointer-events: all;\n}\n.svelte-flow__pane.selection .svelte-flow__panel {\n  pointer-events: none;\n}\n.svelte-flow__panel {\n  position: absolute;\n  z-index: 5;\n  margin: 15px;\n}\n.svelte-flow__panel.top {\n    top: 0;\n  }\n.svelte-flow__panel.bottom {\n    bottom: 0;\n  }\n.svelte-flow__panel.top.center, .svelte-flow__panel.bottom.center {\n      left: 50%;\n      transform: translateX(-15px) translateX(-50%);\n    }\n.svelte-flow__panel.left {\n    left: 0;\n  }\n.svelte-flow__panel.right {\n    right: 0;\n  }\n.svelte-flow__panel.left.center, .svelte-flow__panel.right.center {\n      top: 50%;\n      transform: translateY(-15px) translateY(-50%);\n    }\n.svelte-flow__attribution {\n  font-size: 10px;\n  background: var(--xy-attribution-background-color, var(--xy-attribution-background-color-default));\n  padding: 2px 3px;\n  margin: 0;\n}\n.svelte-flow__attribution a {\n    text-decoration: none;\n    color: #999;\n  }\n@keyframes dashdraw {\n  from {\n    stroke-dashoffset: 10;\n  }\n}\n.svelte-flow__edgelabel-renderer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  left: 0;\n  top: 0;\n}\n.svelte-flow__viewport-portal {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.svelte-flow__minimap {\n  background: var(\n    --xy-minimap-background-color-props,\n    var(--xy-minimap-background-color, var(--xy-minimap-background-color-default))\n  );\n}\n.svelte-flow__minimap-svg {\n    display: block;\n  }\n.svelte-flow__minimap-mask {\n    fill: var(\n      --xy-minimap-mask-background-color-props,\n      var(--xy-minimap-mask-background-color, var(--xy-minimap-mask-background-color-default))\n    );\n    stroke: var(\n      --xy-minimap-mask-stroke-color-props,\n      var(--xy-minimap-mask-stroke-color, var(--xy-minimap-mask-stroke-color-default))\n    );\n    stroke-width: var(\n      --xy-minimap-mask-stroke-width-props,\n      var(--xy-minimap-mask-stroke-width, var(--xy-minimap-mask-stroke-width-default))\n    );\n  }\n.svelte-flow__minimap-node {\n    fill: var(\n      --xy-minimap-node-background-color-props,\n      var(--xy-minimap-node-background-color, var(--xy-minimap-node-background-color-default))\n    );\n    stroke: var(\n      --xy-minimap-node-stroke-color-props,\n      var(--xy-minimap-node-stroke-color, var(--xy-minimap-node-stroke-color-default))\n    );\n    stroke-width: var(\n      --xy-minimap-node-stroke-width-props,\n      var(--xy-minimap-node-stroke-width, var(--xy-minimap-node-stroke-width-default))\n    );\n  }\n.svelte-flow__background-pattern.dots {\n    fill: var(\n      --xy-background-pattern-color-props,\n      var(--xy-background-pattern-color, var(--xy-background-pattern-dots-color-default))\n    );\n  }\n.svelte-flow__background-pattern.lines {\n    stroke: var(\n      --xy-background-pattern-color-props,\n      var(--xy-background-pattern-color, var(--xy-background-pattern-lines-color-default))\n    );\n  }\n.svelte-flow__background-pattern.cross {\n    stroke: var(\n      --xy-background-pattern-color-props,\n      var(--xy-background-pattern-color, var(--xy-background-pattern-cross-color-default))\n    );\n  }\n.svelte-flow__controls {\n  display: flex;\n  flex-direction: column;\n  box-shadow: var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default));\n}\n.svelte-flow__controls.horizontal {\n    flex-direction: row;\n  }\n.svelte-flow__controls-button {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 26px;\n    width: 26px;\n    padding: 4px;\n    border: none;\n    background: var(--xy-controls-button-background-color, var(--xy-controls-button-background-color-default));\n    border-bottom: 1px solid\n      var(\n        --xy-controls-button-border-color-props,\n        var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default))\n      );\n    color: var(\n      --xy-controls-button-color-props,\n      var(--xy-controls-button-color, var(--xy-controls-button-color-default))\n    );\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n            user-select: none;\n  }\n.svelte-flow__controls-button svg {\n      width: 100%;\n      max-width: 12px;\n      max-height: 12px;\n      fill: currentColor;\n    }\n.svelte-flow__edge.updating .svelte-flow__edge-path {\n      stroke: #777;\n    }\n.svelte-flow__edge-text {\n    font-size: 10px;\n  }\n.svelte-flow__node.selectable:focus,\n  .svelte-flow__node.selectable:focus-visible {\n    outline: none;\n  }\n.svelte-flow__node-input,\n.svelte-flow__node-default,\n.svelte-flow__node-output,\n.svelte-flow__node-group {\n  padding: 10px;\n  border-radius: var(--xy-node-border-radius, var(--xy-node-border-radius-default));\n  width: 150px;\n  font-size: 12px;\n  color: var(--xy-node-color, var(--xy-node-color-default));\n  text-align: center;\n  border: var(--xy-node-border, var(--xy-node-border-default));\n  background-color: var(--xy-node-background-color, var(--xy-node-background-color-default));\n}\n.svelte-flow__node-input.selectable:hover, .svelte-flow__node-default.selectable:hover, .svelte-flow__node-output.selectable:hover, .svelte-flow__node-group.selectable:hover {\n      box-shadow: var(--xy-node-boxshadow-hover, var(--xy-node-boxshadow-hover-default));\n    }\n.svelte-flow__node-input.selectable.selected,\n    .svelte-flow__node-input.selectable:focus,\n    .svelte-flow__node-input.selectable:focus-visible,\n    .svelte-flow__node-default.selectable.selected,\n    .svelte-flow__node-default.selectable:focus,\n    .svelte-flow__node-default.selectable:focus-visible,\n    .svelte-flow__node-output.selectable.selected,\n    .svelte-flow__node-output.selectable:focus,\n    .svelte-flow__node-output.selectable:focus-visible,\n    .svelte-flow__node-group.selectable.selected,\n    .svelte-flow__node-group.selectable:focus,\n    .svelte-flow__node-group.selectable:focus-visible {\n      box-shadow: var(--xy-node-boxshadow-selected, var(--xy-node-boxshadow-selected-default));\n    }\n.svelte-flow__node-group {\n  background-color: var(--xy-node-group-background-color, var(--xy-node-group-background-color-default));\n}\n.svelte-flow__nodesselection-rect,\n.svelte-flow__selection {\n  background: var(--xy-selection-background-color, var(--xy-selection-background-color-default));\n  border: var(--xy-selection-border, var(--xy-selection-border-default));\n}\n.svelte-flow__nodesselection-rect:focus,\n  .svelte-flow__nodesselection-rect:focus-visible,\n  .svelte-flow__selection:focus,\n  .svelte-flow__selection:focus-visible {\n    outline: none;\n  }\n.svelte-flow__controls-button:hover {\n      background: var(\n        --xy-controls-button-background-color-hover-props,\n        var(--xy-controls-button-background-color-hover, var(--xy-controls-button-background-color-hover-default))\n      );\n      color: var(\n        --xy-controls-button-color-hover-props,\n        var(--xy-controls-button-color-hover, var(--xy-controls-button-color-hover-default))\n      );\n    }\n.svelte-flow__controls-button:disabled {\n      pointer-events: none;\n    }\n.svelte-flow__controls-button:disabled svg {\n        fill-opacity: 0.4;\n      }\n.svelte-flow__controls-button:last-child {\n    border-bottom: none;\n  }\n.svelte-flow__controls.horizontal .svelte-flow__controls-button {\n    border-bottom: none;\n    border-right: 1px solid\n      var(\n        --xy-controls-button-border-color-props,\n        var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default))\n      );\n  }\n.svelte-flow__controls.horizontal .svelte-flow__controls-button:last-child {\n    border-right: none;\n  }\n.svelte-flow__resize-control {\n  position: absolute;\n}\n.svelte-flow__resize-control.left,\n.svelte-flow__resize-control.right {\n  cursor: ew-resize;\n}\n.svelte-flow__resize-control.top,\n.svelte-flow__resize-control.bottom {\n  cursor: ns-resize;\n}\n.svelte-flow__resize-control.top.left,\n.svelte-flow__resize-control.bottom.right {\n  cursor: nwse-resize;\n}\n.svelte-flow__resize-control.bottom.left,\n.svelte-flow__resize-control.top.right {\n  cursor: nesw-resize;\n}\n/* handle styles */\n.svelte-flow__resize-control.handle {\n  width: 5px;\n  height: 5px;\n  border: 1px solid #fff;\n  border-radius: 1px;\n  background-color: var(--xy-resize-background-color, var(--xy-resize-background-color-default));\n  translate: -50% -50%;\n}\n.svelte-flow__resize-control.handle.left {\n  left: 0;\n  top: 50%;\n}\n.svelte-flow__resize-control.handle.right {\n  left: 100%;\n  top: 50%;\n}\n.svelte-flow__resize-control.handle.top {\n  left: 50%;\n  top: 0;\n}\n.svelte-flow__resize-control.handle.bottom {\n  left: 50%;\n  top: 100%;\n}\n.svelte-flow__resize-control.handle.top.left {\n  left: 0;\n}\n.svelte-flow__resize-control.handle.bottom.left {\n  left: 0;\n}\n.svelte-flow__resize-control.handle.top.right {\n  left: 100%;\n}\n.svelte-flow__resize-control.handle.bottom.right {\n  left: 100%;\n}\n/* line styles */\n.svelte-flow__resize-control.line {\n  border-color: var(--xy-resize-background-color, var(--xy-resize-background-color-default));\n  border-width: 0;\n  border-style: solid;\n}\n.svelte-flow__resize-control.line.left,\n.svelte-flow__resize-control.line.right {\n  width: 1px;\n  transform: translate(-50%, 0);\n  top: 0;\n  height: 100%;\n}\n.svelte-flow__resize-control.line.left {\n  left: 0;\n  border-left-width: 1px;\n}\n.svelte-flow__resize-control.line.right {\n  left: 100%;\n  border-right-width: 1px;\n}\n.svelte-flow__resize-control.line.top,\n.svelte-flow__resize-control.line.bottom {\n  height: 1px;\n  transform: translate(0, -50%);\n  left: 0;\n  width: 100%;\n}\n.svelte-flow__resize-control.line.top {\n  top: 0;\n  border-top-width: 1px;\n}\n.svelte-flow__resize-control.line.bottom {\n  border-bottom-width: 1px;\n  top: 100%;\n}\n.svelte-flow__edge-label {\n  text-align: center;\n  position: absolute;\n  padding: 2px;\n  font-size: 10px;\n  color: var(--xy-edge-label-color, var(--xy-edge-label-color-default));\n  background: var(--xy-edge-label-background-color, var(--xy-edge-label-background-color-default));\n}\n.svelte-flow__container {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n/*! tailwindcss v4.1.13 | MIT License | https://tailwindcss.com */\n@layer properties{@supports ((-webkit-hyphens:none) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial}}}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.container{width:100%}.\\!block{display:block!important}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.table{display:table}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.resize{resize:both}.flex-wrap{flex-wrap:wrap}.border{border-style:var(--tw-border-style);border-width:1px}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.filter{filter:var(--tw-blur,)var(--tw-brightness,)var(--tw-contrast,)var(--tw-grayscale,)var(--tw-hue-rotate,)var(--tw-invert,)var(--tw-saturate,)var(--tw-sepia,)var(--tw-drop-shadow,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,ease);transition-duration:var(--tw-duration,0s)}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}\r\n/*$vite$:1*/';
  document.head.appendChild(__vite_style__);
  Object.assign = function(target, ...sources) {
    for (const source2 of sources) {
      if (source2 != null) {
        for (const key in source2) {
          if (Object.prototype.hasOwnProperty.call(source2, key) && key !== "equals") {
            try {
              target[key] = source2[key];
            } catch {
            }
          }
        }
      }
    }
    return target;
  };
  const scriptRel = "modulepreload";
  const assetsURL = function(dep) {
    return "/" + dep;
  };
  const seen = {};
  const __vitePreload = function preload(baseModule, deps, importerUrl) {
    let promise = Promise.resolve();
    if (false) {
      let allSettled = function(promises$2) {
        return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
          status: "fulfilled",
          value: value$1
        }), (reason) => ({
          status: "rejected",
          reason
        }))));
      };
      const links = document.getElementsByTagName("link");
      const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
      const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
      promise = allSettled(deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) for (let i$1 = links.length - 1; i$1 >= 0; i$1--) {
          const link$1 = links[i$1];
          if (link$1.href === dep && (!isCss || link$1.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
        const link2 = document.createElement("link");
        link2.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) link2.as = "script";
        link2.crossOrigin = "";
        link2.href = dep;
        if (cspNonce) link2.setAttribute("nonce", cspNonce);
        document.head.appendChild(link2);
        if (isCss) return new Promise((res, rej) => {
          link2.addEventListener("load", res);
          link2.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
        });
      }));
    }
    function handlePreloadError(err$2) {
      const e$1 = new Event("vite:preloadError", { cancelable: true });
      e$1.payload = err$2;
      window.dispatchEvent(e$1);
      if (!e$1.defaultPrevented) throw err$2;
    }
    return promise.then((res) => {
      for (const item of res || []) {
        if (item.status !== "rejected") continue;
        handlePreloadError(item.reason);
      }
      return baseModule().catch(handlePreloadError);
    });
  };
  const MODULE_ID = "relationship-app";
  const MODULE_ID_PREFIX = `[${MODULE_ID}] |`;
  const MODULE_NAME = "Relationship App";
  const MODULE_METADATA_KEY = "metadata";
  const CSS_CLASSES = {
    // Haupt-Container
    mainContainer: "relationship-app",
    // Beziehungsgraph
    relationshipGraph: "relationship-graph",
    // Knoten
    node: "relationship-node",
    nodeSelected: "relationship-node-selected",
    // Kanten
    edge: "relationship-edge",
    edgeSelected: "relationship-edge-selected",
    // Toolbar
    toolbar: "relationship-toolbar",
    // Formulare
    form: "relationship-form",
    formGroup: "form-group",
    formLabel: "form-label",
    formInput: "form-input",
    formButton: "form-button"
  };
  const EVENTS = {
    // Beziehungsgraph-Events
    relationshipGraphUpdated: "relationship-graph-updated",
    nodeSelected: "node-selected",
    edgeSelected: "edge-selected",
    // Daten-Events
    dataLoaded: "data-loaded",
    dataSaved: "data-saved",
    // UI-Events
    viewChanged: "view-changed",
    settingsChanged: "settings-changed"
  };
  const API_ENDPOINTS = {
    // Beziehungsdaten
    relationships: "/api/relationships",
    // Metadaten
    metadata: "/api/metadata",
    // Export/Import
    export: "/api/export",
    import: "/api/import"
  };
  const VALIDATION_RULES = {
    // Minimale Länge für Namen
    minNameLength: 1,
    // Maximale Länge für Namen
    maxNameLength: 100,
    // Minimale Länge für Beschreibungen
    minDescriptionLength: 0,
    // Maximale Länge für Beschreibungen
    maxDescriptionLength: 1e3
  };
  const ERROR_MESSAGES = {
    // Allgemeine Fehler
    generalError: "Ein unerwarteter Fehler ist aufgetreten.",
    // Validierungsfehler
    validationError: "Die eingegebenen Daten sind ungültig.",
    // Netzwerkfehler
    networkError: "Netzwerkfehler beim Laden der Daten.",
    // Speicherfehler
    saveError: "Fehler beim Speichern der Daten.",
    // Lade-Fehler
    loadError: "Fehler beim Laden der Daten."
  };
  const SUCCESS_MESSAGES = {
    // Speichern erfolgreich
    saveSuccess: "Daten wurden erfolgreich gespeichert.",
    // Löschen erfolgreich
    deleteSuccess: "Element wurde erfolgreich gelöscht.",
    // Import erfolgreich
    importSuccess: "Daten wurden erfolgreich importiert.",
    // Export erfolgreich
    exportSuccess: "Daten wurden erfolgreich exportiert."
  };
  const TIMING = {
    // Debounce-Verzögerung für Eingaben
    inputDebounce: 300,
    // Animation-Dauer
    animationDuration: 200,
    // Auto-Save-Intervall
    autoSaveInterval: 5e3
  };
  const Z_INDEX = {
    // Hintergrund
    background: 0,
    // Beziehungsgraph
    graph: 1,
    // Knoten
    nodes: 2,
    // Kanten
    edges: 3,
    // Tooltips
    tooltips: 10,
    // Modals
    modals: 100
  };
  const _FoundryLogger = class _FoundryLogger {
    // ✅ Keine Dependencies erforderlich
    // ✅ Getter für den echten Klassennamen (gegen Name Mangling)
    static get className() {
      return this.CLASS_NAME;
    }
    constructor() {
    }
    info(message, ...args) {
      if (typeof message === "object" && message !== null) {
        console.log(`${MODULE_ID_PREFIX} ℹ️`, message, ...args);
      } else {
        console.log(`${MODULE_ID_PREFIX} ℹ️ ${message}`, ...args);
      }
    }
    warn(message, ...args) {
      if (typeof message === "object" && message !== null) {
        console.warn(`${MODULE_ID_PREFIX} ⚠️`, message, ...args);
      } else {
        console.warn(`${MODULE_ID_PREFIX} ⚠️ ${message}`, ...args);
      }
    }
    error(message, ...args) {
      if (typeof message === "object" && message !== null) {
        console.error(`${MODULE_ID_PREFIX} ❌`, message, ...args);
      } else {
        console.error(`${MODULE_ID_PREFIX} ❌ ${message}`, ...args);
      }
    }
    debug(message, ...args) {
      let debugEnabled = false;
      try {
        debugEnabled = game?.settings?.get("relationship-app", "debugLogs") === true;
      } catch (error) {
        debugEnabled = false;
      }
      if (!debugEnabled) return;
      if (typeof message === "object" && message !== null) {
        console.debug(`${MODULE_ID_PREFIX} 🐛`, message, ...args);
      } else {
        console.debug(`${MODULE_ID_PREFIX} 🐛 ${message}`, ...args);
      }
    }
  };
  _FoundryLogger.API_NAME = "logger";
  _FoundryLogger.SERVICE_TYPE = "singleton";
  _FoundryLogger.CLASS_NAME = "FoundryLogger";
  _FoundryLogger.DEPENDENCIES = [];
  let FoundryLogger = _FoundryLogger;
  const _FoundryAdapter = class _FoundryAdapter {
    // ✅ Keine Dependencies erforderlich
    // Utils
    generateId() {
      return foundry.utils.randomID();
    }
    async loadDocument(uuid) {
      return await foundry.utils.fromUuid(uuid);
    }
    // UI Notifications
    showInfo(message) {
      ui?.notifications?.info(message);
    }
    showError(message) {
      ui?.notifications?.error(message);
    }
    showWarning(message) {
      ui?.notifications?.warn(message);
    }
    showSuccess(message) {
      ui?.notifications?.info(`✅ ${message}`);
    }
    // Hooks
    onInit(callback) {
      Hooks.once("init", callback);
    }
    onReady(callback) {
      Hooks.once("ready", callback);
    }
    // Document Operations
    async updateDocument(document2, data) {
      return await document2.update(data);
    }
    /**
     * Update-Dokument mit automatischem Reload für Datenkonsistenz
     *
     * Lädt das Dokument vor dem Update neu, um sicherzustellen,
     * dass die neuesten Daten verwendet werden. Ideal für Multi-User-Szenarien.
     *
     * @param document - Das zu aktualisierende Dokument
     * @param data - Die zu speichernden Daten
     * @returns Promise mit dem aktualisierten Dokument
     */
    async updateDocumentWithReload(document2, data) {
      try {
        const documentUuid = document2.uuid;
        const freshDocument = await this.loadDocument(documentUuid);
        if (freshDocument) {
          return await freshDocument.update(data);
        } else {
          return await document2.update(data);
        }
      } catch (error) {
        const logger2 = globalThis.relationshipApp?.logger;
        if (logger2) {
          logger2.warn("Failed to reload document, using direct update:", error);
        } else {
        }
        return await document2.update(data);
      }
    }
    // Settings Operations
    registerSetting(key, config) {
      game?.settings?.register(MODULE_ID, key, config);
    }
    // Debug Setting registrieren - wird jetzt über SettingsService gemacht
    // registerDebugSetting(): void { ... } // Entfernt - zentralisiert in SettingsService
    getSetting(key) {
      return game?.settings?.get(MODULE_ID, key);
    }
    async setSetting(key, value) {
      return await game?.settings?.set(MODULE_ID, key, value);
    }
  };
  _FoundryAdapter.API_NAME = "foundryAdapter";
  _FoundryAdapter.SERVICE_TYPE = "singleton";
  _FoundryAdapter.CLASS_NAME = "FoundryAdapter";
  _FoundryAdapter.DEPENDENCIES = [];
  let FoundryAdapter = _FoundryAdapter;
  const _ConsoleErrorHandler = class _ConsoleErrorHandler {
    // ✅ Dependencies explizit definiert - FoundryLogger bereits an erster Stelle
    constructor(logger2, foundryAdapter2) {
      this.logger = logger2;
      this.foundryAdapter = foundryAdapter2;
    }
    handle(error, context) {
      this.logger.error(`Error in ${context}: ${error.message || error}`, error);
      this.foundryAdapter.showError(`Relationship App: Error in ${context}`);
    }
    async handleAsync(operation, context) {
      try {
        return await operation();
      } catch (error) {
        this.handle(error, context);
        throw error;
      }
    }
  };
  _ConsoleErrorHandler.API_NAME = "errorHandler";
  _ConsoleErrorHandler.SERVICE_TYPE = "singleton";
  _ConsoleErrorHandler.CLASS_NAME = "ConsoleErrorHandler";
  _ConsoleErrorHandler.DEPENDENCIES = [FoundryLogger, FoundryAdapter];
  let ConsoleErrorHandler = _ConsoleErrorHandler;
  const _NotificationService = class _NotificationService {
    // ✅ Dependencies explizit definiert
    constructor(logger2, foundryAdapter2) {
      this.logger = logger2;
      this.foundryAdapter = foundryAdapter2;
    }
    showSuccess(message) {
      this.foundryAdapter.showSuccess(message);
      this.logger.info(`[UI] Success: ${message}`);
    }
    showError(message) {
      this.foundryAdapter.showError(`❌ ${message}`);
      this.logger.error(`[UI] Error: ${message}`);
    }
    showWarning(message) {
      this.foundryAdapter.showWarning(`⚠️ ${message}`);
      this.logger.warn(`[UI] Warning: ${message}`);
    }
    showInfo(message) {
      this.foundryAdapter.showInfo(`ℹ️ ${message}`);
      this.logger.info(`[UI] Info: ${message}`);
    }
  };
  _NotificationService.API_NAME = "notificationService";
  _NotificationService.SERVICE_TYPE = "singleton";
  _NotificationService.CLASS_NAME = "NotificationService";
  _NotificationService.DEPENDENCIES = [FoundryLogger, FoundryAdapter];
  let NotificationService = _NotificationService;
  let _container;
  function setContainer(c) {
    _container = c;
  }
  function use(tokenOrCtor, scope) {
    if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
    return _container.getService(tokenOrCtor, scope);
  }
  function setCurrentScope(scope) {
    if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
    _container.setCurrentScope(scope);
  }
  function disposeScopedServices(scope) {
    if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
    _container.disposeScopedServices(scope);
  }
  function getScopedServiceCount(scope) {
    if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
    return _container.getScopedServiceCount(scope);
  }
  function createChildScope(parentScope, childType) {
    if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
    const childScope = `${childType}-${foundry.utils.randomID()}`;
    _container.addChildScope(parentScope, childScope);
    return childScope;
  }
  function disposeScopeChain(parentScope) {
    if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
    _container.disposeScopeChain(parentScope);
  }
  function createScopeChain(parentScope) {
    if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
    _container.createScopeChain(parentScope);
  }
  function removeChildScope(parentScope, childScope) {
    if (!_container) throw new Error("[Edge] Container not set. Call setContainer(...) in init.");
    _container.removeChildScope(parentScope, childScope);
  }
  var BROWSER = true;
  var DEV = false;
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var array_from = Array.from;
  var object_keys = Object.keys;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  var is_extensible = Object.isExtensible;
  function is_function(thing) {
    return typeof thing === "function";
  }
  const noop = () => {
  };
  function is_promise(value) {
    return typeof value?.then === "function";
  }
  function run$1(fn) {
    return fn();
  }
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }
  function deferred() {
    var resolve;
    var reject;
    var promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
  function fallback(value, fallback2, lazy = false) {
    return value === void 0 ? lazy ? (
      /** @type {() => V} */
      fallback2()
    ) : (
      /** @type {V} */
      fallback2
    ) : value;
  }
  function to_array(value, n) {
    if (Array.isArray(value)) {
      return value;
    }
    if (n === void 0 || !(Symbol.iterator in value)) {
      return Array.from(value);
    }
    const array = [];
    for (const element2 of value) {
      array.push(element2);
      if (array.length === n) break;
    }
    return array;
  }
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const BOUNDARY_EFFECT = 1 << 7;
  const UNOWNED = 1 << 8;
  const DISCONNECTED = 1 << 9;
  const CLEAN = 1 << 10;
  const DIRTY = 1 << 11;
  const MAYBE_DIRTY = 1 << 12;
  const INERT = 1 << 13;
  const DESTROYED = 1 << 14;
  const EFFECT_RAN = 1 << 15;
  const EFFECT_TRANSPARENT = 1 << 16;
  const INSPECT_EFFECT = 1 << 17;
  const HEAD_EFFECT = 1 << 18;
  const EFFECT_PRESERVED = 1 << 19;
  const EFFECT_IS_UPDATING = 1 << 20;
  const USER_EFFECT = 1 << 21;
  const STATE_SYMBOL = Symbol("$state");
  const LEGACY_PROPS = Symbol("legacy props");
  const LOADING_ATTR_SYMBOL = Symbol("");
  const PROXY_PATH_SYMBOL = Symbol("proxy path");
  const STALE_REACTION = new class StaleReactionError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "StaleReactionError");
      __publicField(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
    }
  }();
  const ELEMENT_NODE = 1;
  const TEXT_NODE = 3;
  const COMMENT_NODE = 8;
  const DOCUMENT_FRAGMENT_NODE = 11;
  function equals$1(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function not_equal(a, b) {
    return a !== b;
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }
  function bind_invalid_checkbox_value() {
    if (DEV) {
      const error = new Error(`bind_invalid_checkbox_value
Using \`bind:value\` together with a checkbox input is not allowed. Use \`bind:checked\` instead
https://svelte.dev/e/bind_invalid_checkbox_value`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/bind_invalid_checkbox_value`);
    }
  }
  function bind_invalid_export(component2, key, name) {
    if (DEV) {
      const error = new Error(`bind_invalid_export
Component ${component2} has an export named \`${key}\` that a consumer component is trying to access using \`bind:${key}\`, which is disallowed. Instead, use \`bind:this\` (e.g. \`<${name} bind:this={component} />\`) and then access the property on the bound component instance (e.g. \`component.${key}\`)
https://svelte.dev/e/bind_invalid_export`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/bind_invalid_export`);
    }
  }
  function bind_not_bindable(key, component2, name) {
    if (DEV) {
      const error = new Error(`bind_not_bindable
A component is attempting to bind to a non-bindable property \`${key}\` belonging to ${component2} (i.e. \`<${name} bind:${key}={...}>\`). To mark a property as bindable: \`let { ${key} = $bindable() } = $props()\`
https://svelte.dev/e/bind_not_bindable`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/bind_not_bindable`);
    }
  }
  function component_api_changed(method, component2) {
    if (DEV) {
      const error = new Error(`component_api_changed
Calling \`${method}\` on a component instance (of ${component2}) is no longer valid in Svelte 5
https://svelte.dev/e/component_api_changed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/component_api_changed`);
    }
  }
  function component_api_invalid_new(component2, name) {
    if (DEV) {
      const error = new Error(`component_api_invalid_new
Attempted to instantiate ${component2} with \`new ${name}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working.
https://svelte.dev/e/component_api_invalid_new`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/component_api_invalid_new`);
    }
  }
  function derived_references_self() {
    if (DEV) {
      const error = new Error(`derived_references_self
A derived value cannot reference itself recursively
https://svelte.dev/e/derived_references_self`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/derived_references_self`);
    }
  }
  function each_key_duplicate(a, b, value) {
    if (DEV) {
      const error = new Error(`each_key_duplicate
${value ? `Keyed each block has duplicate key \`${value}\` at indexes ${a} and ${b}` : `Keyed each block has duplicate key at indexes ${a} and ${b}`}
https://svelte.dev/e/each_key_duplicate`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/each_key_duplicate`);
    }
  }
  function effect_in_teardown(rune) {
    if (DEV) {
      const error = new Error(`effect_in_teardown
\`${rune}\` cannot be used inside an effect cleanup function
https://svelte.dev/e/effect_in_teardown`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_in_teardown`);
    }
  }
  function effect_in_unowned_derived() {
    if (DEV) {
      const error = new Error(`effect_in_unowned_derived
Effect cannot be created inside a \`$derived\` value that was not itself created inside an effect
https://svelte.dev/e/effect_in_unowned_derived`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
    }
  }
  function effect_orphan(rune) {
    if (DEV) {
      const error = new Error(`effect_orphan
\`${rune}\` can only be used inside an effect (e.g. during component initialisation)
https://svelte.dev/e/effect_orphan`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_orphan`);
    }
  }
  function effect_update_depth_exceeded() {
    if (DEV) {
      const error = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops
https://svelte.dev/e/effect_update_depth_exceeded`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  function get_abort_signal_outside_reaction() {
    if (DEV) {
      const error = new Error(`get_abort_signal_outside_reaction
\`getAbortSignal()\` can only be called inside an effect or derived
https://svelte.dev/e/get_abort_signal_outside_reaction`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/get_abort_signal_outside_reaction`);
    }
  }
  function hydration_failed() {
    if (DEV) {
      const error = new Error(`hydration_failed
Failed to hydrate the application
https://svelte.dev/e/hydration_failed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/hydration_failed`);
    }
  }
  function invalid_snippet() {
    if (DEV) {
      const error = new Error(`invalid_snippet
Could not \`{@render}\` snippet due to the expression being \`null\` or \`undefined\`. Consider using optional chaining \`{@render snippet?.()}\`
https://svelte.dev/e/invalid_snippet`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/invalid_snippet`);
    }
  }
  function lifecycle_legacy_only(name) {
    if (DEV) {
      const error = new Error(`lifecycle_legacy_only
\`${name}(...)\` cannot be used in runes mode
https://svelte.dev/e/lifecycle_legacy_only`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/lifecycle_legacy_only`);
    }
  }
  function props_invalid_value(key) {
    if (DEV) {
      const error = new Error(`props_invalid_value
Cannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value
https://svelte.dev/e/props_invalid_value`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/props_invalid_value`);
    }
  }
  function props_rest_readonly(property) {
    if (DEV) {
      const error = new Error(`props_rest_readonly
Rest element properties of \`$props()\` such as \`${property}\` are readonly
https://svelte.dev/e/props_rest_readonly`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/props_rest_readonly`);
    }
  }
  function rune_outside_svelte(rune) {
    if (DEV) {
      const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
    }
  }
  function state_descriptors_fixed() {
    if (DEV) {
      const error = new Error(`state_descriptors_fixed
Property descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.
https://svelte.dev/e/state_descriptors_fixed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    }
  }
  function state_prototype_fixed() {
    if (DEV) {
      const error = new Error(`state_prototype_fixed
Cannot set prototype of \`$state\` object
https://svelte.dev/e/state_prototype_fixed`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    }
  }
  function state_unsafe_mutation() {
    if (DEV) {
      const error = new Error(`state_unsafe_mutation
Updating state inside \`$derived(...)\`, \`$inspect(...)\` or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`
https://svelte.dev/e/state_unsafe_mutation`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    }
  }
  let legacy_mode_flag = false;
  let tracing_mode_flag = false;
  function enable_legacy_mode_flag() {
    legacy_mode_flag = true;
  }
  function enable_tracing_mode_flag() {
    tracing_mode_flag = true;
  }
  const EACH_ITEM_REACTIVE = 1;
  const EACH_INDEX_REACTIVE = 1 << 1;
  const EACH_IS_CONTROLLED = 1 << 2;
  const EACH_IS_ANIMATED = 1 << 3;
  const EACH_ITEM_IMMUTABLE = 1 << 4;
  const PROPS_IS_IMMUTABLE = 1;
  const PROPS_IS_RUNES = 1 << 1;
  const PROPS_IS_UPDATED = 1 << 2;
  const PROPS_IS_BINDABLE = 1 << 3;
  const PROPS_IS_LAZY_INITIAL = 1 << 4;
  const TRANSITION_IN = 1;
  const TRANSITION_OUT = 1 << 1;
  const TRANSITION_GLOBAL = 1 << 2;
  const TEMPLATE_FRAGMENT = 1;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const TEMPLATE_USE_SVG = 1 << 2;
  const TEMPLATE_USE_MATHML = 1 << 3;
  const HYDRATION_START = "[";
  const HYDRATION_START_ELSE = "[!";
  const HYDRATION_END = "]";
  const HYDRATION_ERROR = {};
  const ELEMENT_IS_NAMESPACED = 1;
  const ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
  const UNINITIALIZED = Symbol();
  const FILENAME = Symbol("filename");
  const HMR = Symbol("hmr");
  const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
  const NAMESPACE_SVG = "http://www.w3.org/2000/svg";
  const NAMESPACE_MATHML = "http://www.w3.org/1998/Math/MathML";
  const IGNORABLE_RUNTIME_WARNINGS = (
    /** @type {const} */
    [
      "state_snapshot_uncloneable",
      "binding_property_non_reactive",
      "hydration_attribute_changed",
      "hydration_html_changed",
      "ownership_invalid_binding",
      "ownership_invalid_mutation"
    ]
  );
  const ELEMENTS_WITHOUT_TEXT = ["audio", "datalist", "dl", "optgroup", "select", "video"];
  const ATTACHMENT_KEY = "@attach";
  var bold$1 = "font-weight: bold";
  var normal$1 = "font-weight: normal";
  function dynamic_void_element_content(tag2) {
    if (DEV) {
      console.warn(`%c[svelte] dynamic_void_element_content
%c\`<svelte:element this="${tag2}">\` is a void element — it cannot have content
https://svelte.dev/e/dynamic_void_element_content`, bold$1, normal$1);
    } else {
      console.warn(`https://svelte.dev/e/dynamic_void_element_content`);
    }
  }
  function state_snapshot_uncloneable(properties) {
    if (DEV) {
      console.warn(
        `%c[svelte] state_snapshot_uncloneable
%c${properties ? `The following properties cannot be cloned with \`$state.snapshot\` — the return value contains the originals:

${properties}` : "Value cannot be cloned with `$state.snapshot` — the original value was returned"}
https://svelte.dev/e/state_snapshot_uncloneable`,
        bold$1,
        normal$1
      );
    } else {
      console.warn(`https://svelte.dev/e/state_snapshot_uncloneable`);
    }
  }
  const empty = [];
  function snapshot(value, skip_warning = false) {
    if (DEV && !skip_warning) {
      const paths = [];
      const copy = clone(value, /* @__PURE__ */ new Map(), "", paths);
      if (paths.length === 1 && paths[0] === "") {
        state_snapshot_uncloneable();
      } else if (paths.length > 0) {
        const slice = paths.length > 10 ? paths.slice(0, 7) : paths.slice(0, 10);
        const excess = paths.length - slice.length;
        let uncloned = slice.map((path) => `- <value>${path}`).join("\n");
        if (excess > 0) uncloned += `
- ...and ${excess} more`;
        state_snapshot_uncloneable(uncloned);
      }
      return copy;
    }
    return clone(value, /* @__PURE__ */ new Map(), "", empty);
  }
  function clone(value, cloned, path, paths, original = null) {
    if (typeof value === "object" && value !== null) {
      var unwrapped = cloned.get(value);
      if (unwrapped !== void 0) return unwrapped;
      if (value instanceof Map) return (
        /** @type {Snapshot<T>} */
        new Map(value)
      );
      if (value instanceof Set) return (
        /** @type {Snapshot<T>} */
        new Set(value)
      );
      if (is_array(value)) {
        var copy = (
          /** @type {Snapshot<any>} */
          Array(value.length)
        );
        cloned.set(value, copy);
        if (original !== null) {
          cloned.set(original, copy);
        }
        for (var i = 0; i < value.length; i += 1) {
          var element2 = value[i];
          if (i in value) {
            copy[i] = clone(element2, cloned, DEV ? `${path}[${i}]` : path, paths);
          }
        }
        return copy;
      }
      if (get_prototype_of(value) === object_prototype) {
        copy = {};
        cloned.set(value, copy);
        if (original !== null) {
          cloned.set(original, copy);
        }
        for (var key in value) {
          copy[key] = clone(value[key], cloned, DEV ? `${path}.${key}` : path, paths);
        }
        return copy;
      }
      if (value instanceof Date) {
        return (
          /** @type {Snapshot<T>} */
          structuredClone(value)
        );
      }
      if (typeof /** @type {T & { toJSON?: any } } */
      value.toJSON === "function") {
        return clone(
          /** @type {T & { toJSON(): any } } */
          value.toJSON(),
          cloned,
          DEV ? `${path}.toJSON()` : path,
          paths,
          // Associate the instance with the toJSON clone
          value
        );
      }
    }
    if (value instanceof EventTarget) {
      return (
        /** @type {Snapshot<T>} */
        value
      );
    }
    try {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    } catch (e) {
      if (DEV) {
        paths.push(path);
      }
      return (
        /** @type {Snapshot<T>} */
        value
      );
    }
  }
  let tracing_expressions = null;
  function log_entry(signal, entry) {
    const value = signal.v;
    if (value === UNINITIALIZED) {
      return;
    }
    const type = (signal.f & DERIVED) !== 0 ? "$derived" : "$state";
    const current_reaction = (
      /** @type {Reaction} */
      active_reaction
    );
    const dirty = signal.wv > current_reaction.wv || current_reaction.wv === 0;
    const style = dirty ? "color: CornflowerBlue; font-weight: bold" : "color: grey; font-weight: normal";
    console.groupCollapsed(
      signal.label ? `%c${type}%c ${signal.label}` : `%c${type}%c`,
      style,
      dirty ? "font-weight: normal" : style,
      typeof value === "object" && value !== null && STATE_SYMBOL in value ? snapshot(value, true) : value
    );
    if (type === "$derived") {
      const deps = new Set(
        /** @type {Derived} */
        signal.deps
      );
      for (const dep of deps) {
        log_entry(dep);
      }
    }
    if (signal.created) {
      console.log(signal.created);
    }
    if (dirty && signal.updated) {
      console.log(signal.updated);
    }
    if (entry) {
      for (var trace2 of entry.traces) {
        console.log(trace2);
      }
    }
    console.groupEnd();
  }
  function trace(label2, fn) {
    var previously_tracing_expressions = tracing_expressions;
    try {
      tracing_expressions = { entries: /* @__PURE__ */ new Map(), reaction: active_reaction };
      var start = performance.now();
      var value = fn();
      var time = (performance.now() - start).toFixed(2);
      var prefix = untrack(label2);
      if (!effect_tracking()) {
        console.log(`${prefix} %cran outside of an effect (${time}ms)`, "color: grey");
      } else if (tracing_expressions.entries.size === 0) {
        console.log(`${prefix} %cno reactive dependencies (${time}ms)`, "color: grey");
      } else {
        console.group(`${prefix} %c(${time}ms)`, "color: grey");
        var entries = tracing_expressions.entries;
        untrack(() => {
          for (const [signal, traces] of entries) {
            log_entry(signal, traces);
          }
        });
        tracing_expressions = null;
        console.groupEnd();
      }
      return value;
    } finally {
      tracing_expressions = previously_tracing_expressions;
    }
  }
  function get_stack(label2) {
    let error = Error();
    const stack2 = error.stack;
    if (stack2) {
      const lines = stack2.split("\n");
      const new_lines = ["\n"];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === "Error") {
          continue;
        }
        if (line.includes("validate_each_keys")) {
          return null;
        }
        if (line.includes("svelte/src/internal")) {
          continue;
        }
        new_lines.push(line);
      }
      if (new_lines.length === 1) {
        return null;
      }
      define_property(error, "stack", {
        value: new_lines.join("\n")
      });
      define_property(error, "name", {
        // 'Error' suffix is required for stack traces to be rendered properly
        value: `${label2}Error`
      });
    }
    return error;
  }
  function tag(source2, label2) {
    source2.label = label2;
    tag_proxy(source2.v, label2);
    return source2;
  }
  function tag_proxy(value, label2) {
    value?.[PROXY_PATH_SYMBOL]?.(label2);
    return value;
  }
  function label(value) {
    if (typeof value === "symbol") return `Symbol(${value.description})`;
    if (typeof value === "function") return "<function>";
    if (typeof value === "object" && value) return "<object>";
    return String(value);
  }
  function invalid_default_snippet() {
    if (DEV) {
      const error = new Error(`invalid_default_snippet
Cannot use \`{@render children(...)}\` if the parent component uses \`let:\` directives. Consider using a named snippet instead
https://svelte.dev/e/invalid_default_snippet`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/invalid_default_snippet`);
    }
  }
  function invalid_snippet_arguments() {
    if (DEV) {
      const error = new Error(`invalid_snippet_arguments
A snippet function was passed invalid arguments. Snippets should only be instantiated via \`{@render ...}\`
https://svelte.dev/e/invalid_snippet_arguments`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/invalid_snippet_arguments`);
    }
  }
  function lifecycle_outside_component(name) {
    if (DEV) {
      const error = new Error(`lifecycle_outside_component
\`${name}(...)\` can only be used during component initialisation
https://svelte.dev/e/lifecycle_outside_component`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
    }
  }
  function snippet_without_render_tag() {
    if (DEV) {
      const error = new Error(`snippet_without_render_tag
Attempted to render a snippet without a \`{@render}\` block. This would cause the snippet code to be stringified instead of its content being rendered to the DOM. To fix this, change \`{snippet}\` to \`{@render snippet()}\`.
https://svelte.dev/e/snippet_without_render_tag`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/snippet_without_render_tag`);
    }
  }
  function store_invalid_shape(name) {
    if (DEV) {
      const error = new Error(`store_invalid_shape
\`${name}\` is not a store with a \`subscribe\` method
https://svelte.dev/e/store_invalid_shape`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/store_invalid_shape`);
    }
  }
  function svelte_element_invalid_this_value() {
    if (DEV) {
      const error = new Error(`svelte_element_invalid_this_value
The \`this\` prop on \`<svelte:element>\` must be a string, if defined
https://svelte.dev/e/svelte_element_invalid_this_value`);
      error.name = "Svelte error";
      throw error;
    } else {
      throw new Error(`https://svelte.dev/e/svelte_element_invalid_this_value`);
    }
  }
  let component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  let dev_stack = null;
  function set_dev_stack(stack2) {
    dev_stack = stack2;
  }
  function add_svelte_meta(callback, type, component2, line, column, additional) {
    const parent = dev_stack;
    dev_stack = {
      type,
      file: component2[FILENAME],
      line,
      column,
      parent,
      ...additional
    };
    try {
      return callback();
    } finally {
      dev_stack = parent;
    }
  }
  let dev_current_component_function = null;
  function set_dev_current_component_function(fn) {
    dev_current_component_function = fn;
  }
  function getContext(key) {
    const context_map = get_or_init_context_map("getContext");
    const result = (
      /** @type {T} */
      context_map.get(key)
    );
    return result;
  }
  function setContext(key, context) {
    const context_map = get_or_init_context_map("setContext");
    context_map.set(key, context);
    return context;
  }
  function hasContext(key) {
    const context_map = get_or_init_context_map("hasContext");
    return context_map.has(key);
  }
  function getAllContexts() {
    const context_map = get_or_init_context_map("getAllContexts");
    return (
      /** @type {T} */
      context_map
    );
  }
  function push(props, runes = false, fn) {
    component_context = {
      p: component_context,
      c: null,
      e: null,
      s: props,
      x: null,
      l: null
    };
    if (legacy_mode_flag && !runes) {
      component_context.l = {
        s: null,
        u: null,
        r1: [],
        r2: source(false)
      };
    }
    if (DEV) {
      component_context.function = fn;
      dev_current_component_function = fn;
    }
  }
  function pop(component2) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    var effects = context.e;
    if (effects !== null) {
      context.e = null;
      for (var fn of effects) {
        create_user_effect(fn);
      }
    }
    if (component2 !== void 0) {
      context.x = component2;
    }
    component_context = context.p;
    if (DEV) {
      dev_current_component_function = component_context?.function ?? null;
    }
    return component2 ?? /** @type {T} */
    {};
  }
  function is_runes() {
    return !legacy_mode_flag || component_context !== null && component_context.l === null;
  }
  function get_or_init_context_map(name) {
    if (component_context === null) {
      lifecycle_outside_component(name);
    }
    return component_context.c ?? (component_context.c = new Map(get_parent_context(component_context) || void 0));
  }
  function get_parent_context(component_context2) {
    let parent = component_context2.p;
    while (parent !== null) {
      const context_map = parent.c;
      if (context_map !== null) {
        return context_map;
      }
      parent = parent.p;
    }
    return null;
  }
  const regex_is_valid_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
  function proxy(value) {
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = /* @__PURE__ */ state(0);
    var stack2 = DEV && tracing_mode_flag ? get_stack("CreatedAt") : null;
    var parent_version = update_version;
    var with_parent = (fn) => {
      if (update_version === parent_version) {
        return fn();
      }
      var reaction = active_reaction;
      var version2 = update_version;
      set_active_reaction(null);
      set_update_version(parent_version);
      var result = fn();
      set_active_reaction(reaction);
      set_update_version(version2);
      return result;
    };
    if (is_proxied_array) {
      sources.set("length", /* @__PURE__ */ state(
        /** @type {any[]} */
        value.length,
        stack2
      ));
    }
    var path = "";
    function update_path(new_path) {
      path = new_path;
      tag(version, `${path} version`);
      for (const [prop2, source2] of sources) {
        tag(source2, get_label(path, prop2));
      }
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop2, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop2);
          if (s === void 0) {
            s = with_parent(() => {
              var s2 = /* @__PURE__ */ state(descriptor.value, stack2);
              sources.set(prop2, s2);
              if (DEV && typeof prop2 === "string") {
                tag(s2, get_label(path, prop2));
              }
              return s2;
            });
          } else {
            set(s, descriptor.value, true);
          }
          return true;
        },
        deleteProperty(target, prop2) {
          var s = sources.get(prop2);
          if (s === void 0) {
            if (prop2 in target) {
              const s2 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack2));
              sources.set(prop2, s2);
              increment(version);
              if (DEV) {
                tag(s2, get_label(path, prop2));
              }
            }
          } else {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n < ls.v) {
                set(ls, n);
              }
            }
            set(s, UNINITIALIZED);
            increment(version);
          }
          return true;
        },
        get(target, prop2, receiver) {
          if (prop2 === STATE_SYMBOL) {
            return value;
          }
          if (DEV && prop2 === PROXY_PATH_SYMBOL) {
            return update_path;
          }
          var s = sources.get(prop2);
          var exists = prop2 in target;
          if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
            s = with_parent(() => {
              var p = proxy(exists ? target[prop2] : UNINITIALIZED);
              var s2 = /* @__PURE__ */ state(p, stack2);
              if (DEV) {
                tag(s2, get_label(path, prop2));
              }
              return s2;
            });
            sources.set(prop2, s);
          }
          if (s !== void 0) {
            var v = get$1(s);
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop2, receiver);
        },
        getOwnPropertyDescriptor(target, prop2) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop2);
            if (s) descriptor.value = get$1(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop2);
            var value2 = source2?.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop2) {
          if (prop2 === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop2);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
          if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop2)?.writable)) {
            if (s === void 0) {
              s = with_parent(() => {
                var p = has ? proxy(target[prop2]) : UNINITIALIZED;
                var s2 = /* @__PURE__ */ state(p, stack2);
                if (DEV) {
                  tag(s2, get_label(path, prop2));
                }
                return s2;
              });
              sources.set(prop2, s);
            }
            var value2 = get$1(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop2, value2, receiver) {
          var s = sources.get(prop2);
          var has = prop2 in target;
          if (is_proxied_array && prop2 === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack2));
                sources.set(i + "", other_s);
                if (DEV) {
                  tag(other_s, get_label(path, i));
                }
              }
            }
          }
          if (s === void 0) {
            if (!has || get_descriptor(target, prop2)?.writable) {
              s = with_parent(() => /* @__PURE__ */ state(void 0, stack2));
              set(s, proxy(value2));
              sources.set(prop2, s);
              if (DEV) {
                tag(s, get_label(path, prop2));
              }
            }
          } else {
            has = s.v !== UNINITIALIZED;
            var p = with_parent(() => proxy(value2));
            set(s, p);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor?.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            increment(version);
          }
          return true;
        },
        ownKeys(target) {
          get$1(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  function get_label(path, prop2) {
    if (typeof prop2 === "symbol") return `${path}[Symbol(${prop2.description ?? ""})]`;
    if (regex_is_valid_identifier.test(prop2)) return `${path}.${prop2}`;
    return /^\d+$/.test(prop2) ? `${path}[${prop2}]` : `${path}['${prop2}']`;
  }
  function get_proxied_value(value) {
    try {
      if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
        return value[STATE_SYMBOL];
      }
    } catch {
    }
    return value;
  }
  function is(a, b) {
    return Object.is(get_proxied_value(a), get_proxied_value(b));
  }
  // @__NO_SIDE_EFFECTS__
  function derived$1(fn) {
    var flags2 = DERIVED | DIRTY;
    var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
      /** @type {Derived} */
      active_reaction
    ) : null;
    if (active_effect === null || parent_derived !== null && (parent_derived.f & UNOWNED) !== 0) {
      flags2 |= UNOWNED;
    } else {
      active_effect.f |= EFFECT_PRESERVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals: equals$1,
      f: flags2,
      fn,
      reactions: null,
      rv: 0,
      v: (
        /** @type {V} */
        UNINITIALIZED
      ),
      wv: 0,
      parent: parent_derived ?? active_effect,
      ac: null
    };
    if (DEV && tracing_mode_flag) {
      signal.created = get_stack("CreatedAt");
    }
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function user_derived(fn) {
    const d = /* @__PURE__ */ derived$1(fn);
    push_reaction_value(d);
    return d;
  }
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived$1(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived2) {
    var effects = derived2.effects;
    if (effects !== null) {
      derived2.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
          /** @type {Effect} */
          effects[i]
        );
      }
    }
  }
  let stack = [];
  function get_derived_parent_effect(derived2) {
    var parent = derived2.parent;
    while (parent !== null) {
      if ((parent.f & DERIVED) === 0) {
        return (
          /** @type {Effect} */
          parent
        );
      }
      parent = parent.parent;
    }
    return null;
  }
  function execute_derived(derived2) {
    var value;
    var prev_active_effect = active_effect;
    set_active_effect(get_derived_parent_effect(derived2));
    if (DEV) {
      let prev_inspect_effects = inspect_effects;
      set_inspect_effects(/* @__PURE__ */ new Set());
      try {
        if (stack.includes(derived2)) {
          derived_references_self();
        }
        stack.push(derived2);
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
        set_inspect_effects(prev_inspect_effects);
        stack.pop();
      }
    } else {
      try {
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
      }
    }
    return value;
  }
  function update_derived(derived2) {
    var value = execute_derived(derived2);
    if (!derived2.equals(value)) {
      derived2.v = value;
      derived2.wv = increment_write_version();
    }
    if (is_destroying_effect) return;
    var status = (skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
    set_signal_status(derived2, status);
  }
  let inspect_effects = /* @__PURE__ */ new Set();
  const old_values = /* @__PURE__ */ new Map();
  function set_inspect_effects(v) {
    inspect_effects = v;
  }
  function source(v, stack2) {
    var signal = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals: equals$1,
      rv: 0,
      wv: 0
    };
    if (DEV && tracing_mode_flag) {
      signal.created = stack2 ?? get_stack("CreatedAt");
      signal.updated = null;
      signal.set_during_effect = false;
      signal.trace = null;
    }
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function state(v, stack2) {
    const s = source(v, stack2);
    push_reaction_value(s);
    return s;
  }
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value, immutable = false, trackable = true) {
    var _a2;
    const s = source(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
      ((_a2 = component_context.l).s ?? (_a2.s = [])).push(s);
    }
    return s;
  }
  function mutate(source2, value) {
    set(
      source2,
      untrack(() => get$1(source2))
    );
    return value;
  }
  function set(source2, value, should_proxy = false) {
    if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
    // to ensure we error if state is set inside an inspect effect
    (!untracking || (active_reaction.f & INSPECT_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | INSPECT_EFFECT)) !== 0 && !current_sources?.includes(source2)) {
      state_unsafe_mutation();
    }
    let new_value = should_proxy ? proxy(value) : value;
    if (DEV) {
      tag_proxy(
        new_value,
        /** @type {string} */
        source2.label
      );
    }
    return internal_set(source2, new_value);
  }
  function internal_set(source2, value) {
    if (!source2.equals(value)) {
      var old_value = source2.v;
      if (is_destroying_effect) {
        old_values.set(source2, value);
      } else {
        old_values.set(source2, old_value);
      }
      source2.v = value;
      if (DEV && tracing_mode_flag) {
        source2.updated = get_stack("UpdatedAt");
        if (active_effect !== null) {
          source2.set_during_effect = true;
        }
      }
      if ((source2.f & DERIVED) !== 0) {
        if ((source2.f & DIRTY) !== 0) {
          execute_derived(
            /** @type {Derived} */
            source2
          );
        }
        set_signal_status(source2, (source2.f & UNOWNED) === 0 ? CLEAN : MAYBE_DIRTY);
      }
      source2.wv = increment_write_version();
      mark_reactions(source2, DIRTY);
      if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
      if (DEV && inspect_effects.size > 0) {
        const inspects = Array.from(inspect_effects);
        for (const effect2 of inspects) {
          if ((effect2.f & CLEAN) !== 0) {
            set_signal_status(effect2, MAYBE_DIRTY);
          }
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
          }
        }
        inspect_effects.clear();
      }
    }
    return value;
  }
  function update(source2, d = 1) {
    var value = get$1(source2);
    var result = d === 1 ? value++ : value--;
    set(source2, value);
    return result;
  }
  function update_pre(source2, d = 1) {
    var value = get$1(source2);
    return set(source2, d === 1 ? ++value : --value);
  }
  function increment(source2) {
    set(source2, source2.v + 1);
  }
  function mark_reactions(signal, status) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var runes = is_runes();
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags2 = reaction.f;
      if ((flags2 & DIRTY) !== 0) continue;
      if (!runes && reaction === active_effect) continue;
      if (DEV && (flags2 & INSPECT_EFFECT) !== 0) {
        inspect_effects.add(reaction);
        continue;
      }
      set_signal_status(reaction, status);
      if ((flags2 & (CLEAN | UNOWNED)) !== 0) {
        if ((flags2 & DERIVED) !== 0) {
          mark_reactions(
            /** @type {Derived} */
            reaction,
            MAYBE_DIRTY
          );
        } else {
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }
  var bold = "font-weight: bold";
  var normal = "font-weight: normal";
  function assignment_value_stale(property, location) {
    if (DEV) {
      console.warn(`%c[svelte] assignment_value_stale
%cAssignment to \`${property}\` property (${location}) will evaluate to the right-hand side, not the value of \`${property}\` following the assignment. This may result in unexpected behaviour.
https://svelte.dev/e/assignment_value_stale`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/assignment_value_stale`);
    }
  }
  function binding_property_non_reactive(binding, location) {
    if (DEV) {
      console.warn(
        `%c[svelte] binding_property_non_reactive
%c${location ? `\`${binding}\` (${location}) is binding to a non-reactive property` : `\`${binding}\` is binding to a non-reactive property`}
https://svelte.dev/e/binding_property_non_reactive`,
        bold,
        normal
      );
    } else {
      console.warn(`https://svelte.dev/e/binding_property_non_reactive`);
    }
  }
  function console_log_state(method) {
    if (DEV) {
      console.warn(`%c[svelte] console_log_state
%cYour \`console.${method}\` contained \`$state\` proxies. Consider using \`$inspect(...)\` or \`$state.snapshot(...)\` instead
https://svelte.dev/e/console_log_state`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/console_log_state`);
    }
  }
  function event_handler_invalid(handler, suggestion) {
    if (DEV) {
      console.warn(`%c[svelte] event_handler_invalid
%c${handler} should be a function. Did you mean to ${suggestion}?
https://svelte.dev/e/event_handler_invalid`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/event_handler_invalid`);
    }
  }
  function hydration_attribute_changed(attribute, html2, value) {
    if (DEV) {
      console.warn(`%c[svelte] hydration_attribute_changed
%cThe \`${attribute}\` attribute on \`${html2}\` changed its value between server and client renders. The client value, \`${value}\`, will be ignored in favour of the server value
https://svelte.dev/e/hydration_attribute_changed`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/hydration_attribute_changed`);
    }
  }
  function hydration_html_changed(location) {
    if (DEV) {
      console.warn(
        `%c[svelte] hydration_html_changed
%c${location ? `The value of an \`{@html ...}\` block ${location} changed between server and client renders. The client value will be ignored in favour of the server value` : "The value of an `{@html ...}` block changed between server and client renders. The client value will be ignored in favour of the server value"}
https://svelte.dev/e/hydration_html_changed`,
        bold,
        normal
      );
    } else {
      console.warn(`https://svelte.dev/e/hydration_html_changed`);
    }
  }
  function hydration_mismatch(location) {
    if (DEV) {
      console.warn(
        `%c[svelte] hydration_mismatch
%c${location ? `Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near ${location}` : "Hydration failed because the initial UI does not match what was rendered on the server"}
https://svelte.dev/e/hydration_mismatch`,
        bold,
        normal
      );
    } else {
      console.warn(`https://svelte.dev/e/hydration_mismatch`);
    }
  }
  function invalid_raw_snippet_render() {
    if (DEV) {
      console.warn(`%c[svelte] invalid_raw_snippet_render
%cThe \`render\` function passed to \`createRawSnippet\` should return HTML for a single element
https://svelte.dev/e/invalid_raw_snippet_render`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/invalid_raw_snippet_render`);
    }
  }
  function legacy_recursive_reactive_block(filename) {
    if (DEV) {
      console.warn(`%c[svelte] legacy_recursive_reactive_block
%cDetected a migrated \`$:\` reactive block in \`${filename}\` that both accesses and updates the same reactive value. This may cause recursive updates when converted to an \`$effect\`.
https://svelte.dev/e/legacy_recursive_reactive_block`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/legacy_recursive_reactive_block`);
    }
  }
  function lifecycle_double_unmount() {
    if (DEV) {
      console.warn(`%c[svelte] lifecycle_double_unmount
%cTried to unmount a component that was not mounted
https://svelte.dev/e/lifecycle_double_unmount`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/lifecycle_double_unmount`);
    }
  }
  function ownership_invalid_binding(parent, prop2, child2, owner) {
    if (DEV) {
      console.warn(`%c[svelte] ownership_invalid_binding
%c${parent} passed property \`${prop2}\` to ${child2} with \`bind:\`, but its parent component ${owner} did not declare \`${prop2}\` as a binding. Consider creating a binding between ${owner} and ${parent} (e.g. \`bind:${prop2}={...}\` instead of \`${prop2}={...}\`)
https://svelte.dev/e/ownership_invalid_binding`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/ownership_invalid_binding`);
    }
  }
  function ownership_invalid_mutation(name, location, prop2, parent) {
    if (DEV) {
      console.warn(`%c[svelte] ownership_invalid_mutation
%cMutating unbound props (\`${name}\`, at ${location}) is strongly discouraged. Consider using \`bind:${prop2}={...}\` in ${parent} (or using a callback) instead
https://svelte.dev/e/ownership_invalid_mutation`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/ownership_invalid_mutation`);
    }
  }
  function select_multiple_invalid_value() {
    if (DEV) {
      console.warn(`%c[svelte] select_multiple_invalid_value
%cThe \`value\` property of a \`<select multiple>\` element should be an array, but it received a non-array value. The selection will be kept as is.
https://svelte.dev/e/select_multiple_invalid_value`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
    }
  }
  function state_proxy_equality_mismatch(operator) {
    if (DEV) {
      console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
    }
  }
  function transition_slide_display(value) {
    if (DEV) {
      console.warn(`%c[svelte] transition_slide_display
%cThe \`slide\` transition does not work correctly for elements with \`display: ${value}\`
https://svelte.dev/e/transition_slide_display`, bold, normal);
    } else {
      console.warn(`https://svelte.dev/e/transition_slide_display`);
    }
  }
  let hydrating = false;
  function set_hydrating(value) {
    hydrating = value;
  }
  let hydrate_node;
  function set_hydrate_node(node) {
    if (node === null) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    return hydrate_node = node;
  }
  function hydrate_next() {
    return set_hydrate_node(
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(hydrate_node)
    );
  }
  function reset(node) {
    if (!hydrating) return;
    if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    hydrate_node = node;
  }
  function hydrate_template(template) {
    if (hydrating) {
      hydrate_node = template.content;
    }
  }
  function next(count = 1) {
    if (hydrating) {
      var i = count;
      var node = hydrate_node;
      while (i--) {
        node = /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node);
      }
      hydrate_node = node;
    }
  }
  function remove_nodes() {
    var depth = 0;
    var node = hydrate_node;
    while (true) {
      if (node.nodeType === COMMENT_NODE) {
        var data = (
          /** @type {Comment} */
          node.data
        );
        if (data === HYDRATION_END) {
          if (depth === 0) return node;
          depth -= 1;
        } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
          depth += 1;
        }
      }
      var next2 = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      node.remove();
      node = next2;
    }
  }
  function read_hydration_instruction(node) {
    if (!node || node.nodeType !== COMMENT_NODE) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    return (
      /** @type {Comment} */
      node.data
    );
  }
  function init_array_prototype_warnings() {
    const array_prototype2 = Array.prototype;
    const cleanup = Array.__svelte_cleanup;
    if (cleanup) {
      cleanup();
    }
    const { indexOf, lastIndexOf, includes } = array_prototype2;
    array_prototype2.indexOf = function(item, from_index) {
      const index2 = indexOf.call(this, item, from_index);
      if (index2 === -1) {
        for (let i = from_index ?? 0; i < this.length; i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.indexOf(...)");
            break;
          }
        }
      }
      return index2;
    };
    array_prototype2.lastIndexOf = function(item, from_index) {
      const index2 = lastIndexOf.call(this, item, from_index ?? this.length - 1);
      if (index2 === -1) {
        for (let i = 0; i <= (from_index ?? this.length - 1); i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.lastIndexOf(...)");
            break;
          }
        }
      }
      return index2;
    };
    array_prototype2.includes = function(item, from_index) {
      const has = includes.call(this, item, from_index);
      if (!has) {
        for (let i = 0; i < this.length; i += 1) {
          if (get_proxied_value(this[i]) === item) {
            state_proxy_equality_mismatch("array.includes(...)");
            break;
          }
        }
      }
      return has;
    };
    Array.__svelte_cleanup = () => {
      array_prototype2.indexOf = indexOf;
      array_prototype2.lastIndexOf = lastIndexOf;
      array_prototype2.includes = includes;
    };
  }
  function strict_equals(a, b, equal = true) {
    try {
      if (a === b !== (get_proxied_value(a) === get_proxied_value(b))) {
        state_proxy_equality_mismatch(equal ? "===" : "!==");
      }
    } catch {
    }
    return a === b === equal;
  }
  function equals(a, b, equal = true) {
    if (a == b !== (get_proxied_value(a) == get_proxied_value(b))) {
      state_proxy_equality_mismatch(equal ? "==" : "!=");
    }
    return a == b === equal;
  }
  var $window;
  var $document;
  var is_firefox;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    $document = document;
    is_firefox = /Firefox/.test(navigator.userAgent);
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    var text_prototype = Text.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    if (is_extensible(element_prototype)) {
      element_prototype.__click = void 0;
      element_prototype.__className = void 0;
      element_prototype.__attributes = null;
      element_prototype.__style = void 0;
      element_prototype.__e = void 0;
    }
    if (is_extensible(text_prototype)) {
      text_prototype.__t = void 0;
    }
    if (DEV) {
      element_prototype.__svelte_meta = null;
      init_array_prototype_warnings();
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return first_child_getter.call(node);
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return next_sibling_getter.call(node);
  }
  function child(node, is_text) {
    if (!hydrating) {
      return /* @__PURE__ */ get_first_child(node);
    }
    var child2 = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(hydrate_node)
    );
    if (child2 === null) {
      child2 = hydrate_node.appendChild(create_text());
    } else if (is_text && child2.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      child2?.before(text2);
      set_hydrate_node(text2);
      return text2;
    }
    set_hydrate_node(child2);
    return child2;
  }
  function first_child(fragment, is_text) {
    if (!hydrating) {
      var first = (
        /** @type {DocumentFragment} */
        /* @__PURE__ */ get_first_child(
          /** @type {Node} */
          fragment
        )
      );
      if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
      return first;
    }
    if (is_text && hydrate_node?.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      hydrate_node?.before(text2);
      set_hydrate_node(text2);
      return text2;
    }
    return hydrate_node;
  }
  function sibling(node, count = 1, is_text = false) {
    let next_sibling = hydrating ? hydrate_node : node;
    var last_sibling;
    while (count--) {
      last_sibling = next_sibling;
      next_sibling = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(next_sibling);
    }
    if (!hydrating) {
      return next_sibling;
    }
    if (is_text && next_sibling?.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      if (next_sibling === null) {
        last_sibling?.after(text2);
      } else {
        next_sibling.before(text2);
      }
      set_hydrate_node(text2);
      return text2;
    }
    set_hydrate_node(next_sibling);
    return (
      /** @type {TemplateNode} */
      next_sibling
    );
  }
  function clear_text_content(node) {
    node.textContent = "";
  }
  function create_element(tag2, namespace, is2) {
    let options = is2 ? { is: is2 } : void 0;
    if (namespace) {
      return document.createElementNS(namespace, tag2, options);
    }
    return document.createElement(tag2, options);
  }
  function create_fragment() {
    return document.createDocumentFragment();
  }
  function create_comment(data = "") {
    return document.createComment(data);
  }
  function set_attribute$1(element2, key, value = "") {
    if (key.startsWith("xlink:")) {
      element2.setAttributeNS("http://www.w3.org/1999/xlink", key, value);
      return;
    }
    return element2.setAttribute(key, value);
  }
  function validate_effect(rune) {
    if (active_effect === null && active_reaction === null) {
      effect_orphan(rune);
    }
    if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0 && active_effect === null) {
      effect_in_unowned_derived();
    }
    if (is_destroying_effect) {
      effect_in_teardown(rune);
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn, sync, push2 = true) {
    var parent = active_effect;
    if (DEV) {
      while (parent !== null && (parent.f & INSPECT_EFFECT) !== 0) {
        parent = parent.parent;
      }
    }
    var effect2 = {
      ctx: component_context,
      deps: null,
      nodes_start: null,
      nodes_end: null,
      f: type | DIRTY,
      first: null,
      fn,
      last: null,
      next: null,
      parent,
      b: parent && parent.b,
      prev: null,
      teardown: null,
      transitions: null,
      wv: 0,
      ac: null
    };
    if (DEV) {
      effect2.component_function = dev_current_component_function;
    }
    if (sync) {
      try {
        update_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } catch (e) {
        destroy_effect(effect2);
        throw e;
      }
    } else if (fn !== null) {
      schedule_effect(effect2);
    }
    var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & (EFFECT_PRESERVED | BOUNDARY_EFFECT)) === 0;
    if (!inert && push2) {
      if (parent !== null) {
        push_effect(effect2, parent);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
        var derived2 = (
          /** @type {Derived} */
          active_reaction
        );
        (derived2.effects ?? (derived2.effects = [])).push(effect2);
      }
    }
    return effect2;
  }
  function effect_tracking() {
    return active_reaction !== null && !untracking;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null, false);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    validate_effect("$effect");
    if (DEV) {
      define_property(fn, "name", {
        value: "$effect"
      });
    }
    if (!active_reaction && active_effect && (active_effect.f & BRANCH_EFFECT) !== 0) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      (context.e ?? (context.e = [])).push(fn);
    } else {
      return create_user_effect(fn);
    }
  }
  function create_user_effect(fn) {
    return create_effect(EFFECT | USER_EFFECT, fn, false);
  }
  function user_pre_effect(fn) {
    validate_effect("$effect.pre");
    if (DEV) {
      define_property(fn, "name", {
        value: "$effect.pre"
      });
    }
    return create_effect(RENDER_EFFECT | USER_EFFECT, fn, true);
  }
  function inspect_effect(fn) {
    return create_effect(INSPECT_EFFECT, fn, true);
  }
  function effect_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return () => {
      destroy_effect(effect2);
    };
  }
  function component_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect2, () => {
            destroy_effect(effect2);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect2);
          fulfil(void 0);
        }
      });
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn, false);
  }
  function legacy_pre_effect(deps, fn) {
    var context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    var token = { effect: null, ran: false };
    context.l.r1.push(token);
    token.effect = render_effect(() => {
      deps();
      if (token.ran) return;
      token.ran = true;
      set(context.l.r2, true);
      untrack(fn);
    });
  }
  function legacy_pre_effect_reset() {
    var context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    render_effect(() => {
      if (!get$1(context.l.r2)) return;
      for (var token of context.l.r1) {
        var effect2 = token.effect;
        if ((effect2.f & CLEAN) !== 0) {
          set_signal_status(effect2, MAYBE_DIRTY);
        }
        if (check_dirtiness(effect2)) {
          update_effect(effect2);
        }
        token.ran = false;
      }
      context.l.r2.v = false;
    });
  }
  function render_effect(fn) {
    return create_effect(RENDER_EFFECT, fn, true);
  }
  function template_effect(fn, thunks = [], d = derived$1) {
    if (DEV) {
      return render_effect(() => {
        var outer = (
          /** @type {Effect} */
          active_effect
        );
        var inner = () => fn(...deriveds2.map(get$1));
        define_property(outer.fn, "name", { value: "{expression}" });
        define_property(inner, "name", { value: "{expression}" });
        const deriveds2 = thunks.map(d);
        block(inner);
      });
    }
    const deriveds = thunks.map(d);
    return block(() => fn(...deriveds.map(get$1)));
  }
  function block(fn, flags2 = 0) {
    var effect2 = create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags2, fn, true);
    if (DEV) {
      effect2.dev_stack = dev_stack;
    }
    return effect2;
  }
  function branch(fn, push2 = true) {
    return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      effect2.ac?.abort(STALE_REACTION);
      var next2 = effect2.next;
      if ((effect2.f & ROOT_EFFECT) !== 0) {
        effect2.parent = null;
      } else {
        destroy_effect(effect2, remove_dom);
      }
      effect2 = next2;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next2 = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next2;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null && effect2.nodes_end !== null) {
      remove_effect_dom(
        effect2.nodes_start,
        /** @type {TemplateNode} */
        effect2.nodes_end
      );
      removed = true;
    }
    destroy_effect_children(effect2, remove_dom && !removed);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    var transitions = effect2.transitions;
    if (transitions !== null) {
      for (const transition2 of transitions) {
        transition2.stop();
      }
    }
    execute_effect_teardown(effect2);
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    if (DEV) {
      effect2.component_function = null;
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = effect2.ac = null;
  }
  function remove_effect_dom(node, end) {
    while (node !== null) {
      var next2 = node === end ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      node.remove();
      node = next2;
    }
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next2 = effect2.next;
    if (prev !== null) prev.next = next2;
    if (next2 !== null) next2.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next2;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  function pause_effect(effect2, callback) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    run_out_transitions(transitions, () => {
      destroy_effect(effect2);
      if (callback) callback();
    });
  }
  function run_out_transitions(transitions, fn) {
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition2 of transitions) {
        transition2.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    if (effect2.transitions !== null) {
      for (const transition2 of effect2.transitions) {
        if (transition2.is_global || local) {
          transitions.push(transition2);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }
  function resume_effect(effect2) {
    resume_children(effect2, true);
  }
  function resume_children(effect2, local) {
    if ((effect2.f & INERT) === 0) return;
    effect2.f ^= INERT;
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    if (effect2.transitions !== null) {
      for (const transition2 of effect2.transitions) {
        if (transition2.is_global || local) {
          transition2.in();
        }
      }
    }
  }
  const request_idle_callback = typeof requestIdleCallback === "undefined" ? (cb) => setTimeout(cb, 1) : requestIdleCallback;
  let micro_tasks = [];
  let idle_tasks = [];
  function run_micro_tasks() {
    var tasks = micro_tasks;
    micro_tasks = [];
    run_all(tasks);
  }
  function run_idle_tasks() {
    var tasks = idle_tasks;
    idle_tasks = [];
    run_all(tasks);
  }
  function queue_micro_task(fn) {
    if (micro_tasks.length === 0) {
      queueMicrotask(run_micro_tasks);
    }
    micro_tasks.push(fn);
  }
  function queue_idle_task(fn) {
    if (idle_tasks.length === 0) {
      request_idle_callback(run_idle_tasks);
    }
    idle_tasks.push(fn);
  }
  function flush_tasks() {
    if (micro_tasks.length > 0) {
      run_micro_tasks();
    }
    if (idle_tasks.length > 0) {
      run_idle_tasks();
    }
  }
  function handle_error(error) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (DEV && error instanceof Error) {
      adjust_error(error, effect2);
    }
    if ((effect2.f & EFFECT_RAN) === 0) {
      if ((effect2.f & BOUNDARY_EFFECT) === 0) {
        throw error;
      }
      effect2.fn(error);
    } else {
      invoke_error_boundary(error, effect2);
    }
  }
  function invoke_error_boundary(error, effect2) {
    while (effect2 !== null) {
      if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
        try {
          effect2.b.error(error);
          return;
        } catch {
        }
      }
      effect2 = effect2.parent;
    }
    throw error;
  }
  const adjusted_errors = /* @__PURE__ */ new WeakSet();
  function adjust_error(error, effect2) {
    if (adjusted_errors.has(error)) return;
    adjusted_errors.add(error);
    const message_descriptor = get_descriptor(error, "message");
    if (message_descriptor && !message_descriptor.configurable) return;
    var indent = is_firefox ? "  " : "	";
    var component_stack = `
${indent}in ${effect2.fn?.name || "<unknown>"}`;
    var context = effect2.ctx;
    while (context !== null) {
      component_stack += `
${indent}in ${context.function?.[FILENAME].split("/").pop()}`;
      context = context.p;
    }
    define_property(error, "message", {
      value: error.message + `
${component_stack}
`
    });
    if (error.stack) {
      define_property(error, "stack", {
        value: error.stack.split("\n").filter((line) => !line.includes("svelte/src/internal")).join("\n")
      });
    }
  }
  let is_flushing = false;
  let last_scheduled_effect = null;
  let is_updating_effect = false;
  let is_destroying_effect = false;
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  let queued_root_effects = [];
  let dev_effect_stack = [];
  let active_reaction = null;
  let untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  let active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  let current_sources = null;
  function push_reaction_value(value) {
    if (active_reaction !== null && active_reaction.f & EFFECT_IS_UPDATING) {
      if (current_sources === null) {
        current_sources = [value];
      } else {
        current_sources.push(value);
      }
    }
  }
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let write_version = 1;
  let read_version = 0;
  let update_version = read_version;
  function set_update_version(value) {
    update_version = value;
  }
  let skip_reaction = false;
  let captured_signals = null;
  function set_captured_signals(value) {
    captured_signals = value;
  }
  function increment_write_version() {
    return ++write_version;
  }
  function check_dirtiness(reaction) {
    var flags2 = reaction.f;
    if ((flags2 & DIRTY) !== 0) {
      return true;
    }
    if ((flags2 & MAYBE_DIRTY) !== 0) {
      var dependencies = reaction.deps;
      var is_unowned = (flags2 & UNOWNED) !== 0;
      if (dependencies !== null) {
        var i;
        var dependency;
        var is_disconnected = (flags2 & DISCONNECTED) !== 0;
        var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
        var length = dependencies.length;
        if (is_disconnected || is_unowned_connected) {
          var derived2 = (
            /** @type {Derived} */
            reaction
          );
          var parent = derived2.parent;
          for (i = 0; i < length; i++) {
            dependency = dependencies[i];
            if (is_disconnected || !dependency?.reactions?.includes(derived2)) {
              (dependency.reactions ?? (dependency.reactions = [])).push(derived2);
            }
          }
          if (is_disconnected) {
            derived2.f ^= DISCONNECTED;
          }
          if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
            derived2.f ^= UNOWNED;
          }
        }
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (check_dirtiness(
            /** @type {Derived} */
            dependency
          )) {
            update_derived(
              /** @type {Derived} */
              dependency
            );
          }
          if (dependency.wv > reaction.wv) {
            return true;
          }
        }
      }
      if (!is_unowned || active_effect !== null && !skip_reaction) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    if (current_sources?.includes(signal)) {
      return;
    }
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
          /** @type {Derived} */
          reaction,
          effect2,
          false
        );
      } else if (effect2 === reaction) {
        if (root2) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var _a2;
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_skip_reaction = skip_reaction;
    var previous_sources = current_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var previous_update_version = update_version;
    var flags2 = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    skip_reaction = (flags2 & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
    active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    current_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    update_version = ++read_version;
    reaction.f |= EFFECT_IS_UPDATING;
    if (reaction.ac !== null) {
      reaction.ac.abort(STALE_REACTION);
      reaction.ac = null;
    }
    try {
      var result = (
        /** @type {Function} */
        (0, reaction.fn)()
      );
      var deps = reaction.deps;
      if (new_deps !== null) {
        var i;
        remove_reactions(reaction, skipped_deps);
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (!skip_reaction || // Deriveds that already have reactions can cleanup, so we still add them as reactions
        (flags2 & DERIVED) !== 0 && /** @type {import('#client').Derived} */
        reaction.reactions !== null) {
          for (i = skipped_deps; i < deps.length; i++) {
            ((_a2 = deps[i]).reactions ?? (_a2.reactions = [])).push(reaction);
          }
        }
      } else if (deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i < /** @type {Source[]} */
        untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
            /** @type {Effect} */
            reaction
          );
        }
      }
      if (previous_reaction !== null && previous_reaction !== reaction) {
        read_version++;
        if (untracked_writes !== null) {
          if (previous_untracked_writes === null) {
            previous_untracked_writes = untracked_writes;
          } else {
            previous_untracked_writes.push(.../** @type {Source[]} */
            untracked_writes);
          }
        }
      }
      return result;
    } catch (error) {
      handle_error(error);
    } finally {
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      skip_reaction = previous_skip_reaction;
      current_sources = previous_sources;
      set_component_context(previous_component_context);
      untracking = previous_untracking;
      update_version = previous_update_version;
      reaction.f ^= EFFECT_IS_UPDATING;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index2 = index_of.call(reactions, signal);
      if (index2 !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index2] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !new_deps.includes(dependency))) {
      set_signal_status(dependency, MAYBE_DIRTY);
      if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
        dependency.f ^= DISCONNECTED;
      }
      destroy_derived_effects(
        /** @type {Derived} **/
        dependency
      );
      remove_reactions(
        /** @type {Derived} **/
        dependency,
        0
      );
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags2 = effect2.f;
    if ((flags2 & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var was_updating_effect = is_updating_effect;
    active_effect = effect2;
    is_updating_effect = true;
    if (DEV) {
      var previous_component_fn = dev_current_component_function;
      set_dev_current_component_function(effect2.component_function);
      var previous_stack = (
        /** @type {any} */
        dev_stack
      );
      set_dev_stack(effect2.dev_stack ?? dev_stack);
    }
    try {
      if ((flags2 & BLOCK_EFFECT) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.wv = write_version;
      if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) {
        for (var dep of effect2.deps) {
          if (dep.set_during_effect) {
            dep.wv = increment_write_version();
            dep.set_during_effect = false;
          }
        }
      }
      if (DEV) {
        dev_effect_stack.push(effect2);
      }
    } finally {
      is_updating_effect = was_updating_effect;
      active_effect = previous_effect;
      if (DEV) {
        set_dev_current_component_function(previous_component_fn);
        set_dev_stack(previous_stack);
      }
    }
  }
  function log_effect_stack() {
    console.error(
      "Last ten effects were: ",
      dev_effect_stack.slice(-10).map((d) => d.fn)
    );
    dev_effect_stack = [];
  }
  function infinite_loop_guard() {
    try {
      effect_update_depth_exceeded();
    } catch (error) {
      if (DEV) {
        define_property(error, "stack", {
          value: ""
        });
      }
      if (last_scheduled_effect !== null) {
        if (DEV) {
          try {
            invoke_error_boundary(error, last_scheduled_effect);
          } catch (e) {
            log_effect_stack();
            throw e;
          }
        } else {
          invoke_error_boundary(error, last_scheduled_effect);
        }
      } else {
        if (DEV) {
          log_effect_stack();
        }
        throw error;
      }
    }
  }
  function flush_queued_root_effects() {
    var was_updating_effect = is_updating_effect;
    try {
      var flush_count = 0;
      is_updating_effect = true;
      while (queued_root_effects.length > 0) {
        if (flush_count++ > 1e3) {
          infinite_loop_guard();
        }
        var root_effects = queued_root_effects;
        var length = root_effects.length;
        queued_root_effects = [];
        for (var i = 0; i < length; i++) {
          var collected_effects = process_effects(root_effects[i]);
          flush_queued_effects(collected_effects);
        }
        old_values.clear();
      }
    } finally {
      is_flushing = false;
      is_updating_effect = was_updating_effect;
      last_scheduled_effect = null;
      if (DEV) {
        dev_effect_stack = [];
      }
    }
  }
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    for (var i = 0; i < length; i++) {
      var effect2 = effects[i];
      if ((effect2.f & (DESTROYED | INERT)) === 0) {
        if (check_dirtiness(effect2)) {
          var wv = write_version;
          update_effect(effect2);
          if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
            if (effect2.teardown === null) {
              unlink_effect(effect2);
            } else {
              effect2.fn = null;
            }
          }
          if (write_version > wv && (effect2.f & USER_EFFECT) !== 0) {
            break;
          }
        }
      }
    }
    for (; i < length; i += 1) {
      schedule_effect(effects[i]);
    }
  }
  function schedule_effect(signal) {
    if (!is_flushing) {
      is_flushing = true;
      queueMicrotask(flush_queued_root_effects);
    }
    var effect2 = last_scheduled_effect = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags2 = effect2.f;
      if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags2 & CLEAN) === 0) return;
        effect2.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect2);
  }
  function process_effects(root2) {
    var effects = [];
    var effect2 = root2;
    while (effect2 !== null) {
      var flags2 = effect2.f;
      var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
      var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
      if (!is_skippable_branch && (flags2 & INERT) === 0) {
        if ((flags2 & EFFECT) !== 0) {
          effects.push(effect2);
        } else if (is_branch) {
          effect2.f ^= CLEAN;
        } else {
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
          }
        }
        var child2 = effect2.first;
        if (child2 !== null) {
          effect2 = child2;
          continue;
        }
      }
      var parent = effect2.parent;
      effect2 = effect2.next;
      while (effect2 === null && parent !== null) {
        effect2 = parent.next;
        parent = parent.parent;
      }
    }
    return effects;
  }
  function flushSync(fn) {
    var result;
    if (fn) {
      is_flushing = true;
      flush_queued_root_effects();
      is_flushing = true;
      result = fn();
    }
    while (true) {
      flush_tasks();
      if (queued_root_effects.length === 0) {
        is_flushing = false;
        last_scheduled_effect = null;
        if (DEV) {
          dev_effect_stack = [];
        }
        return (
          /** @type {T} */
          result
        );
      }
      is_flushing = true;
      flush_queued_root_effects();
    }
  }
  async function tick() {
    await Promise.resolve();
    flushSync();
  }
  function get$1(signal) {
    var flags2 = signal.f;
    var is_derived = (flags2 & DERIVED) !== 0;
    if (captured_signals !== null) {
      captured_signals.add(signal);
    }
    if (active_reaction !== null && !untracking) {
      if (!current_sources?.includes(signal)) {
        var deps = active_reaction.deps;
        if (signal.rv < read_version) {
          signal.rv = read_version;
          if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
            skipped_deps++;
          } else if (new_deps === null) {
            new_deps = [signal];
          } else if (!skip_reaction || !new_deps.includes(signal)) {
            new_deps.push(signal);
          }
        }
      }
    } else if (is_derived && /** @type {Derived} */
    signal.deps === null && /** @type {Derived} */
    signal.effects === null) {
      var derived2 = (
        /** @type {Derived} */
        signal
      );
      var parent = derived2.parent;
      if (parent !== null && (parent.f & UNOWNED) === 0) {
        derived2.f ^= UNOWNED;
      }
    }
    if (is_derived && !is_destroying_effect) {
      derived2 = /** @type {Derived} */
      signal;
      if (check_dirtiness(derived2)) {
        update_derived(derived2);
      }
    }
    if (DEV && tracing_mode_flag && !untracking && tracing_expressions !== null && active_reaction !== null && tracing_expressions.reaction === active_reaction) {
      if (signal.trace) {
        signal.trace();
      } else {
        var trace2 = get_stack("TracedAt");
        if (trace2) {
          var entry = tracing_expressions.entries.get(signal);
          if (entry === void 0) {
            entry = { traces: [] };
            tracing_expressions.entries.set(signal, entry);
          }
          var last = entry.traces[entry.traces.length - 1];
          if (trace2.stack !== last?.stack) {
            entry.traces.push(trace2);
          }
        }
      }
    }
    if (is_destroying_effect) {
      if (old_values.has(signal)) {
        return old_values.get(signal);
      }
      if (is_derived) {
        derived2 = /** @type {Derived} */
        signal;
        var value = derived2.v;
        if ((derived2.f & CLEAN) !== 0 || depends_on_old_values(derived2)) {
          value = execute_derived(derived2);
        }
        old_values.set(derived2, value);
        return value;
      }
    }
    return signal.v;
  }
  function depends_on_old_values(derived2) {
    if (derived2.v === UNINITIALIZED) return true;
    if (derived2.deps === null) return false;
    for (const dep of derived2.deps) {
      if (old_values.has(dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
        /** @type {Derived} */
        dep
      )) {
        return true;
      }
    }
    return false;
  }
  function safe_get(signal) {
    return signal && get$1(signal);
  }
  function capture_signals(fn) {
    var previous_captured_signals = captured_signals;
    captured_signals = /* @__PURE__ */ new Set();
    var captured = captured_signals;
    var signal;
    try {
      untrack(fn);
      if (previous_captured_signals !== null) {
        for (signal of captured_signals) {
          previous_captured_signals.add(signal);
        }
      }
    } finally {
      captured_signals = previous_captured_signals;
    }
    return captured;
  }
  function invalidate_inner_signals(fn) {
    var captured = capture_signals(() => untrack(fn));
    for (var signal of captured) {
      internal_set(signal, signal.v);
    }
  }
  function untrack(fn) {
    var previous_untracking = untracking;
    try {
      untracking = true;
      return fn();
    } finally {
      untracking = previous_untracking;
    }
  }
  const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function exclude_from_object(obj, keys) {
    var result = {};
    for (var key in obj) {
      if (!keys.includes(key)) {
        result[key] = obj[key];
      }
    }
    return result;
  }
  function deep_read_state(value) {
    if (typeof value !== "object" || !value || value instanceof EventTarget) {
      return;
    }
    if (STATE_SYMBOL in value) {
      deep_read(value);
    } else if (!Array.isArray(value)) {
      for (let key in value) {
        const prop2 = value[key];
        if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
          deep_read(prop2);
        }
      }
    }
  }
  function deep_read(value, visited = /* @__PURE__ */ new Set()) {
    if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
    !(value instanceof EventTarget) && !visited.has(value)) {
      visited.add(value);
      if (value instanceof Date) {
        value.getTime();
      }
      for (let key in value) {
        try {
          deep_read(value[key], visited);
        } catch (e) {
        }
      }
      const proto = get_prototype_of(value);
      if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
        const descriptors = get_descriptors(proto);
        for (let key in descriptors) {
          const get2 = descriptors[key].get;
          if (get2) {
            try {
              get2.call(value);
            } catch (e) {
            }
          }
        }
      }
    }
  }
  function createAttachmentKey() {
    return Symbol(ATTACHMENT_KEY);
  }
  function fromAction(action2, fn = (
    /** @type {() => T} */
    noop
  )) {
    return (element2) => {
      const { update: update2, destroy } = untrack(() => action2(element2, fn()) ?? {});
      if (update2) {
        var ran = false;
        render_effect(() => {
          const arg = fn();
          if (ran) update2(arg);
        });
        ran = true;
      }
      if (destroy) {
        teardown(destroy);
      }
    };
  }
  const regex_return_characters = /\r/g;
  function hash(str) {
    str = str.replace(regex_return_characters, "");
    let hash2 = 5381;
    let i = str.length;
    while (i--) hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
    return (hash2 >>> 0).toString(36);
  }
  const VOID_ELEMENT_NAMES = [
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ];
  function is_void(name) {
    return VOID_ELEMENT_NAMES.includes(name) || name.toLowerCase() === "!doctype";
  }
  const RESERVED_WORDS = [
    "arguments",
    "await",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "eval",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "implements",
    "import",
    "in",
    "instanceof",
    "interface",
    "let",
    "new",
    "null",
    "package",
    "private",
    "protected",
    "public",
    "return",
    "static",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield"
  ];
  function is_reserved(word) {
    return RESERVED_WORDS.includes(word);
  }
  function is_capture_event(name) {
    return name.endsWith("capture") && name !== "gotpointercapture" && name !== "lostpointercapture";
  }
  const DELEGATED_EVENTS = [
    "beforeinput",
    "click",
    "change",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart"
  ];
  function is_delegated(event_name) {
    return DELEGATED_EVENTS.includes(event_name);
  }
  const DOM_BOOLEAN_ATTRIBUTES = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
    "webkitdirectory",
    "defer",
    "disablepictureinpicture",
    "disableremoteplayback"
  ];
  function is_boolean_attribute(name) {
    return DOM_BOOLEAN_ATTRIBUTES.includes(name);
  }
  const ATTRIBUTE_ALIASES = {
    // no `class: 'className'` because we handle that separately
    formnovalidate: "formNoValidate",
    ismap: "isMap",
    nomodule: "noModule",
    playsinline: "playsInline",
    readonly: "readOnly",
    defaultvalue: "defaultValue",
    defaultchecked: "defaultChecked",
    srcobject: "srcObject",
    novalidate: "noValidate",
    allowfullscreen: "allowFullscreen",
    disablepictureinpicture: "disablePictureInPicture",
    disableremoteplayback: "disableRemotePlayback"
  };
  function normalize_attribute(name) {
    name = name.toLowerCase();
    return ATTRIBUTE_ALIASES[name] ?? name;
  }
  const DOM_PROPERTIES = [
    ...DOM_BOOLEAN_ATTRIBUTES,
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    "readOnly",
    "value",
    "volume",
    "defaultValue",
    "defaultChecked",
    "srcObject",
    "noValidate",
    "allowFullscreen",
    "disablePictureInPicture",
    "disableRemotePlayback"
  ];
  function is_dom_property(name) {
    return DOM_PROPERTIES.includes(name);
  }
  const NON_STATIC_PROPERTIES = ["autofocus", "muted", "defaultValue", "defaultChecked"];
  function cannot_be_set_statically(name) {
    return NON_STATIC_PROPERTIES.includes(name);
  }
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }
  const CONTENT_EDITABLE_BINDINGS = ["textContent", "innerHTML", "innerText"];
  function is_content_editable_binding(name) {
    return CONTENT_EDITABLE_BINDINGS.includes(name);
  }
  const LOAD_ERROR_ELEMENTS = [
    "body",
    "embed",
    "iframe",
    "img",
    "link",
    "object",
    "script",
    "style",
    "track"
  ];
  function is_load_error_element(name) {
    return LOAD_ERROR_ELEMENTS.includes(name);
  }
  const SVG_ELEMENTS = [
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "discard",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "hatch",
    "hatchpath",
    "hkern",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "mesh",
    "meshgradient",
    "meshpatch",
    "meshrow",
    "metadata",
    "missing-glyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "solidcolor",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "tref",
    "tspan",
    "unknown",
    "use",
    "view",
    "vkern"
  ];
  function is_svg(name) {
    return SVG_ELEMENTS.includes(name);
  }
  const MATHML_ELEMENTS = [
    "annotation",
    "annotation-xml",
    "maction",
    "math",
    "merror",
    "mfrac",
    "mi",
    "mmultiscripts",
    "mn",
    "mo",
    "mover",
    "mpadded",
    "mphantom",
    "mprescripts",
    "mroot",
    "mrow",
    "ms",
    "mspace",
    "msqrt",
    "mstyle",
    "msub",
    "msubsup",
    "msup",
    "mtable",
    "mtd",
    "mtext",
    "mtr",
    "munder",
    "munderover",
    "semantics"
  ];
  function is_mathml(name) {
    return MATHML_ELEMENTS.includes(name);
  }
  const STATE_CREATION_RUNES = (
    /** @type {const} */
    [
      "$state",
      "$state.raw",
      "$derived",
      "$derived.by"
    ]
  );
  const RUNES = (
    /** @type {const} */
    [
      ...STATE_CREATION_RUNES,
      "$state.snapshot",
      "$props",
      "$props.id",
      "$bindable",
      "$effect",
      "$effect.pre",
      "$effect.tracking",
      "$effect.root",
      "$inspect",
      "$inspect().with",
      "$inspect.trace",
      "$host"
    ]
  );
  function is_rune(name) {
    return RUNES.includes(
      /** @type {RuneName} */
      name
    );
  }
  function is_state_creation_rune(name) {
    return STATE_CREATION_RUNES.includes(
      /** @type {StateCreationRuneName} */
      name
    );
  }
  const RAW_TEXT_ELEMENTS = (
    /** @type {const} */
    ["textarea", "script", "style", "title"]
  );
  function is_raw_text_element(name) {
    return RAW_TEXT_ELEMENTS.includes(
      /** @type {RAW_TEXT_ELEMENTS[number]} */
      name
    );
  }
  function sanitize_location(location) {
    return (
      /** @type {T} */
      location?.replace(/\//g, "/​")
    );
  }
  function compare(a, b, property, location) {
    if (a !== b) {
      assignment_value_stale(
        property,
        /** @type {string} */
        sanitize_location(location)
      );
    }
    return a;
  }
  function assign(object, property, value, location) {
    return compare(
      object[property] = value,
      untrack(() => object[property]),
      property,
      location
    );
  }
  function assign_and(object, property, value, location) {
    return compare(
      object[property] && (object[property] = value),
      untrack(() => object[property]),
      property,
      location
    );
  }
  function assign_or(object, property, value, location) {
    return compare(
      object[property] || (object[property] = value),
      untrack(() => object[property]),
      property,
      location
    );
  }
  function assign_nullish(object, property, value, location) {
    return compare(
      object[property] ?? (object[property] = value),
      untrack(() => object[property]),
      property,
      location
    );
  }
  var all_styles = /* @__PURE__ */ new Map();
  function register_style(hash2, style) {
    var styles = all_styles.get(hash2);
    if (!styles) {
      styles = /* @__PURE__ */ new Set();
      all_styles.set(hash2, styles);
    }
    styles.add(style);
  }
  function cleanup_styles(hash2) {
    var styles = all_styles.get(hash2);
    if (!styles) return;
    for (const style of styles) {
      style.remove();
    }
    all_styles.delete(hash2);
  }
  function add_locations(fn, filename, locations) {
    return (...args) => {
      const dom = fn(...args);
      var node = hydrating ? dom : dom.nodeType === DOCUMENT_FRAGMENT_NODE ? dom.firstChild : dom;
      assign_locations(node, filename, locations);
      return dom;
    };
  }
  function assign_location(element2, filename, location) {
    element2.__svelte_meta = {
      parent: dev_stack,
      loc: { file: filename, line: location[0], column: location[1] }
    };
    if (location[2]) {
      assign_locations(element2.firstChild, filename, location[2]);
    }
  }
  function assign_locations(node, filename, locations) {
    var i = 0;
    var depth = 0;
    while (node && i < locations.length) {
      if (hydrating && node.nodeType === COMMENT_NODE) {
        var comment2 = (
          /** @type {Comment} */
          node
        );
        if (comment2.data === HYDRATION_START || comment2.data === HYDRATION_START_ELSE) depth += 1;
        else if (comment2.data[0] === HYDRATION_END) depth -= 1;
      }
      if (depth === 0 && node.nodeType === ELEMENT_NODE) {
        assign_location(
          /** @type {Element} */
          node,
          filename,
          locations[i++]
        );
      }
      node = node.nextSibling;
    }
  }
  function autofocus(dom, value) {
    if (value) {
      const body = document.body;
      dom.autofocus = true;
      queue_micro_task(() => {
        if (document.activeElement === body) {
          dom.focus();
        }
      });
    }
  }
  function remove_textarea_child(dom) {
    if (hydrating && /* @__PURE__ */ get_first_child(dom) !== null) {
      clear_text_content(dom);
    }
  }
  let listening_to_form_reset = false;
  function add_form_reset_listener() {
    if (!listening_to_form_reset) {
      listening_to_form_reset = true;
      document.addEventListener(
        "reset",
        (evt) => {
          Promise.resolve().then(() => {
            if (!evt.defaultPrevented) {
              for (
                const e of
                /**@type {HTMLFormElement} */
                evt.target.elements
              ) {
                e.__on_r?.();
              }
            }
          });
        },
        // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
        { capture: true }
      );
    }
  }
  function listen(target, events, handler, call_handler_immediately = true) {
    if (call_handler_immediately) {
      handler();
    }
    for (var name of events) {
      target.addEventListener(name, handler);
    }
    teardown(() => {
      for (var name2 of events) {
        target.removeEventListener(name2, handler);
      }
    });
  }
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function listen_to_event_and_reset_event(element2, event2, handler, on_reset = handler) {
    element2.addEventListener(event2, () => without_reactive_context(handler));
    const prev = element2.__on_r;
    if (prev) {
      element2.__on_r = () => {
        prev();
        on_reset(true);
      };
    } else {
      element2.__on_r = () => on_reset(true);
    }
    add_form_reset_listener();
  }
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function replay_events(dom) {
    if (!hydrating) return;
    dom.removeAttribute("onload");
    dom.removeAttribute("onerror");
    const event2 = dom.__e;
    if (event2 !== void 0) {
      dom.__e = void 0;
      queueMicrotask(() => {
        if (dom.isConnected) {
          dom.dispatchEvent(event2);
        }
      });
    }
  }
  function create_event(event_name, dom, handler, options = {}) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation.call(dom, event2);
      }
      if (!event2.cancelBubble) {
        return without_reactive_context(() => {
          return handler?.call(this, event2);
        });
      }
    }
    if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function on(element2, type, handler, options = {}) {
    var target_handler = create_event(type, element2, handler, options);
    return () => {
      element2.removeEventListener(type, target_handler, options);
    };
  }
  function event(event_name, dom, handler, capture, passive2) {
    var options = { capture, passive: passive2 };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || // @ts-ignore
    dom === window || // @ts-ignore
    dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
    dom instanceof HTMLMediaElement) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function delegate(events) {
    for (var i = 0; i < events.length; i++) {
      all_registered_events.add(events[i]);
    }
    for (var fn of root_event_handles) {
      fn(events);
    }
  }
  function handle_event_propagation(event2) {
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event2.type;
    var path = event2.composedPath?.() || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    var path_idx = 0;
    var handled_at = event2.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
        current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated != null && (!/** @type {any} */
          current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          event2.target === current_target)) {
            if (is_array(delegated)) {
              var [fn, ...data] = delegated;
              fn.apply(current_target, [event2, ...data]);
            } else {
              delegated.call(current_target, event2);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2.__root = handler_element;
      delete event2.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function apply(thunk, element2, args, component2, loc, has_side_effects = false, remove_parens = false) {
    let handler;
    let error;
    try {
      handler = thunk();
    } catch (e) {
      error = e;
    }
    if (typeof handler !== "function" && (has_side_effects || handler != null || error)) {
      const filename = component2?.[FILENAME];
      const location = loc ? ` at ${filename}:${loc[0]}:${loc[1]}` : ` in ${filename}`;
      const phase = args[0]?.eventPhase < Event.BUBBLING_PHASE ? "capture" : "";
      const event_name = args[0]?.type + phase;
      const description = `\`${event_name}\` handler${location}`;
      const suggestion = remove_parens ? "remove the trailing `()`" : "add a leading `() =>`";
      event_handler_invalid(description, suggestion);
      if (error) {
        throw error;
      }
    }
    handler?.apply(element2, args);
  }
  let head_anchor;
  function reset_head_anchor() {
    head_anchor = void 0;
  }
  function head(render_fn) {
    let previous_hydrate_node = null;
    let was_hydrating = hydrating;
    var anchor;
    if (hydrating) {
      previous_hydrate_node = hydrate_node;
      if (head_anchor === void 0) {
        head_anchor = /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(document.head);
      }
      while (head_anchor !== null && (head_anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */
      head_anchor.data !== HYDRATION_START)) {
        head_anchor = /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(head_anchor);
      }
      if (head_anchor === null) {
        set_hydrating(false);
      } else {
        head_anchor = set_hydrate_node(
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_next_sibling(head_anchor)
        );
      }
    }
    if (!hydrating) {
      anchor = document.head.appendChild(create_text());
    }
    try {
      block(() => render_fn(anchor), HEAD_EFFECT);
    } finally {
      if (was_hydrating) {
        set_hydrating(true);
        head_anchor = hydrate_node;
        set_hydrate_node(
          /** @type {TemplateNode} */
          previous_hydrate_node
        );
      }
    }
  }
  function create_fragment_from_html(html2) {
    var elem = document.createElement("template");
    elem.innerHTML = html2.replaceAll("<!>", "<!---->");
    return elem.content;
  }
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes_start === null) {
      effect2.nodes_start = start;
      effect2.nodes_end = end;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function from_html(content, flags2) {
    var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (hydrating) {
        assign_nodes(hydrate_node, null);
        return hydrate_node;
      }
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        if (!is_fragment) node = /** @type {Node} */
        /* @__PURE__ */ get_first_child(node);
      }
      var clone2 = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(clone2)
        );
        var end = (
          /** @type {TemplateNode} */
          clone2.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone2, clone2);
      }
      return clone2;
    };
  }
  // @__NO_SIDE_EFFECTS__
  function from_namespace(content, flags2, ns = "svg") {
    var has_start = !content.startsWith("<!>");
    var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
    var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
    var node;
    return () => {
      if (hydrating) {
        assign_nodes(hydrate_node, null);
        return hydrate_node;
      }
      if (!node) {
        var fragment = (
          /** @type {DocumentFragment} */
          create_fragment_from_html(wrapped)
        );
        var root2 = (
          /** @type {Element} */
          /* @__PURE__ */ get_first_child(fragment)
        );
        if (is_fragment) {
          node = document.createDocumentFragment();
          while (/* @__PURE__ */ get_first_child(root2)) {
            node.appendChild(
              /** @type {Node} */
              /* @__PURE__ */ get_first_child(root2)
            );
          }
        } else {
          node = /** @type {Element} */
          /* @__PURE__ */ get_first_child(root2);
        }
      }
      var clone2 = (
        /** @type {TemplateNode} */
        node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(clone2)
        );
        var end = (
          /** @type {TemplateNode} */
          clone2.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone2, clone2);
      }
      return clone2;
    };
  }
  // @__NO_SIDE_EFFECTS__
  function from_svg(content, flags2) {
    return /* @__PURE__ */ from_namespace(content, flags2, "svg");
  }
  // @__NO_SIDE_EFFECTS__
  function from_mathml(content, flags2) {
    return /* @__PURE__ */ from_namespace(content, flags2, "math");
  }
  function fragment_from_tree(structure, ns) {
    var fragment = create_fragment();
    for (var item of structure) {
      if (typeof item === "string") {
        fragment.append(create_text(item));
        continue;
      }
      if (item === void 0 || item[0][0] === "/") {
        fragment.append(create_comment(item ? item[0].slice(3) : ""));
        continue;
      }
      const [name, attributes, ...children] = item;
      const namespace = name === "svg" ? NAMESPACE_SVG : name === "math" ? NAMESPACE_MATHML : ns;
      var element2 = create_element(name, namespace, attributes?.is);
      for (var key in attributes) {
        set_attribute$1(element2, key, attributes[key]);
      }
      if (children.length > 0) {
        var target = element2.tagName === "TEMPLATE" ? (
          /** @type {HTMLTemplateElement} */
          element2.content
        ) : element2;
        target.append(
          fragment_from_tree(children, element2.tagName === "foreignObject" ? void 0 : namespace)
        );
      }
      fragment.append(element2);
    }
    return fragment;
  }
  // @__NO_SIDE_EFFECTS__
  function from_tree(structure, flags2) {
    var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    return () => {
      if (hydrating) {
        assign_nodes(hydrate_node, null);
        return hydrate_node;
      }
      if (node === void 0) {
        const ns = (flags2 & TEMPLATE_USE_SVG) !== 0 ? NAMESPACE_SVG : (flags2 & TEMPLATE_USE_MATHML) !== 0 ? NAMESPACE_MATHML : void 0;
        node = fragment_from_tree(structure, ns);
        if (!is_fragment) node = /** @type {Node} */
        /* @__PURE__ */ get_first_child(node);
      }
      var clone2 = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(clone2)
        );
        var end = (
          /** @type {TemplateNode} */
          clone2.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone2, clone2);
      }
      return clone2;
    };
  }
  function with_script(fn) {
    return () => run_scripts(fn());
  }
  function run_scripts(node) {
    if (hydrating) return node;
    const is_fragment = node.nodeType === DOCUMENT_FRAGMENT_NODE;
    const scripts = (
      /** @type {HTMLElement} */
      node.tagName === "SCRIPT" ? [
        /** @type {HTMLScriptElement} */
        node
      ] : node.querySelectorAll("script")
    );
    const effect2 = (
      /** @type {Effect} */
      active_effect
    );
    for (const script of scripts) {
      const clone2 = document.createElement("script");
      for (var attribute of script.attributes) {
        clone2.setAttribute(attribute.name, attribute.value);
      }
      clone2.textContent = script.textContent;
      if (is_fragment ? node.firstChild === script : node === script) {
        effect2.nodes_start = clone2;
      }
      if (is_fragment ? node.lastChild === script : node === script) {
        effect2.nodes_end = clone2;
      }
      script.replaceWith(clone2);
    }
    return node;
  }
  function text(value = "") {
    if (!hydrating) {
      var t = create_text(value + "");
      assign_nodes(t, t);
      return t;
    }
    var node = hydrate_node;
    if (node.nodeType !== TEXT_NODE) {
      node.before(node = create_text());
      set_hydrate_node(node);
    }
    assign_nodes(node, node);
    return node;
  }
  function comment() {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    var frag = document.createDocumentFragment();
    var start = document.createComment("");
    var anchor = create_text();
    frag.append(start, anchor);
    assign_nodes(start, anchor);
    return frag;
  }
  function append(anchor, dom) {
    if (hydrating) {
      active_effect.nodes_end = hydrate_node;
      hydrate_next();
      return;
    }
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }
  function props_id() {
    var _a2;
    if (hydrating && hydrate_node && hydrate_node.nodeType === COMMENT_NODE && hydrate_node.textContent?.startsWith(`#`)) {
      const id = hydrate_node.textContent.substring(1);
      hydrate_next();
      return id;
    }
    (_a2 = window.__svelte ?? (window.__svelte = {})).uid ?? (_a2.uid = 1);
    return `c${window.__svelte.uid++}`;
  }
  let should_intro = true;
  function set_should_intro(value) {
    should_intro = value;
  }
  function set_text(text2, value) {
    var str = value == null ? "" : typeof value === "object" ? value + "" : value;
    if (str !== (text2.__t ?? (text2.__t = text2.nodeValue))) {
      text2.__t = str;
      text2.nodeValue = str + "";
    }
  }
  function mount(component2, options) {
    return _mount(component2, options);
  }
  function hydrate(component2, options) {
    init_operations();
    options.intro = options.intro ?? false;
    const target = options.target;
    const was_hydrating = hydrating;
    const previous_hydrate_node = hydrate_node;
    try {
      var anchor = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(target)
      );
      while (anchor && (anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */
      anchor.data !== HYDRATION_START)) {
        anchor = /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(anchor);
      }
      if (!anchor) {
        throw HYDRATION_ERROR;
      }
      set_hydrating(true);
      set_hydrate_node(
        /** @type {Comment} */
        anchor
      );
      hydrate_next();
      const instance = _mount(component2, { ...options, anchor });
      if (hydrate_node === null || hydrate_node.nodeType !== COMMENT_NODE || /** @type {Comment} */
      hydrate_node.data !== HYDRATION_END) {
        hydration_mismatch();
        throw HYDRATION_ERROR;
      }
      set_hydrating(false);
      return (
        /**  @type {Exports} */
        instance
      );
    } catch (error) {
      if (error === HYDRATION_ERROR) {
        if (options.recover === false) {
          hydration_failed();
        }
        init_operations();
        clear_text_content(target);
        set_hydrating(false);
        return mount(component2, options);
      }
      throw error;
    } finally {
      set_hydrating(was_hydrating);
      set_hydrate_node(previous_hydrate_node);
      reset_head_anchor();
    }
  }
  const document_listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    init_operations();
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive2 = is_passive_event(event_name);
        target.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
        var n = document_listeners.get(event_name);
        if (n === void 0) {
          document.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
          document_listeners.set(event_name, 1);
        } else {
          document_listeners.set(event_name, n + 1);
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    var component2 = void 0;
    var unmount2 = component_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      branch(() => {
        if (context) {
          push({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        if (hydrating) {
          assign_nodes(
            /** @type {TemplateNode} */
            anchor_node,
            null
          );
        }
        should_intro = intro;
        component2 = Component(anchor_node, props) || {};
        should_intro = true;
        if (hydrating) {
          active_effect.nodes_end = hydrate_node;
        }
        if (context) {
          pop();
        }
      });
      return () => {
        for (var event_name of registered_events) {
          target.removeEventListener(event_name, handle_event_propagation);
          var n = (
            /** @type {number} */
            document_listeners.get(event_name)
          );
          if (--n === 0) {
            document.removeEventListener(event_name, handle_event_propagation);
            document_listeners.delete(event_name);
          } else {
            document_listeners.set(event_name, n);
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          anchor_node.parentNode?.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component2, unmount2);
    return component2;
  }
  let mounted_components = /* @__PURE__ */ new WeakMap();
  function unmount(component2, options) {
    const fn = mounted_components.get(component2);
    if (fn) {
      mounted_components.delete(component2);
      return fn(options);
    }
    if (DEV) {
      lifecycle_double_unmount();
    }
    return Promise.resolve();
  }
  function hmr(original, get_source) {
    function wrapper(anchor, props) {
      let instance = {};
      let effect2;
      let ran = false;
      block(() => {
        const source2 = get_source();
        const component2 = get$1(source2);
        if (effect2) {
          for (var k in instance) delete instance[k];
          destroy_effect(effect2);
        }
        effect2 = branch(() => {
          if (ran) set_should_intro(false);
          Object.defineProperties(
            instance,
            Object.getOwnPropertyDescriptors(
              // @ts-expect-error
              new.target ? new component2(anchor, props) : component2(anchor, props)
            )
          );
          if (ran) set_should_intro(true);
        });
      }, EFFECT_TRANSPARENT);
      ran = true;
      if (hydrating) {
        anchor = hydrate_node;
      }
      return instance;
    }
    wrapper[FILENAME] = original[FILENAME];
    wrapper[HMR] = {
      // When we accept an update, we set the original source to the new component
      original,
      // The `get_source` parameter reads `wrapper[HMR].source`, but in the `accept`
      // function we always replace it with `previous[HMR].source`, which in practice
      // means we only ever update the original
      source: source(original)
    };
    return wrapper;
  }
  function create_ownership_validator(props) {
    const component2 = component_context?.function;
    const parent = component_context?.p?.function;
    return {
      /**
       * @param {string} prop
       * @param {any[]} path
       * @param {any} result
       * @param {number} line
       * @param {number} column
       */
      mutation: (prop2, path, result, line, column) => {
        const name = path[0];
        if (is_bound_or_unset(props, name) || !parent) {
          return result;
        }
        let value = props;
        for (let i = 0; i < path.length - 1; i++) {
          value = value[path[i]];
          if (!value?.[STATE_SYMBOL]) {
            return result;
          }
        }
        const location = sanitize_location(`${component2[FILENAME]}:${line}:${column}`);
        ownership_invalid_mutation(name, location, prop2, parent[FILENAME]);
        return result;
      },
      /**
       * @param {any} key
       * @param {any} child_component
       * @param {() => any} value
       */
      binding: (key, child_component, value) => {
        if (!is_bound_or_unset(props, key) && parent && value()?.[STATE_SYMBOL]) {
          ownership_invalid_binding(
            component2[FILENAME],
            key,
            child_component[FILENAME],
            parent[FILENAME]
          );
        }
      }
    };
  }
  function is_bound_or_unset(props, prop_name) {
    const is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
    return !!get_descriptor(props, prop_name)?.set || is_entry_props && prop_name in props || !(prop_name in props);
  }
  function check_target(target) {
    if (target) {
      component_api_invalid_new(target[FILENAME] ?? "a component", target.name);
    }
  }
  function legacy_api() {
    const component2 = component_context?.function;
    function error(method) {
      component_api_changed(method, component2[FILENAME]);
    }
    return {
      $destroy: () => error("$destroy()"),
      $on: () => error("$on(...)"),
      $set: () => error("$set(...)")
    };
  }
  function inspect(get_value, inspector = console.log) {
    validate_effect("$inspect");
    let initial = true;
    inspect_effect(() => {
      var value = UNINITIALIZED;
      try {
        value = get_value();
      } catch (error) {
        console.error(error);
      }
      if (value !== UNINITIALIZED) {
        var snap = snapshot(value, true);
        untrack(() => {
          inspector(initial ? "init" : "update", ...snap);
        });
      }
      initial = false;
    });
  }
  function validate_snippet_args(anchor, ...args) {
    if (typeof anchor !== "object" || !(anchor instanceof Node)) {
      invalid_snippet_arguments();
    }
    for (let arg of args) {
      if (typeof arg !== "function") {
        invalid_snippet_arguments();
      }
    }
  }
  const PENDING = 0;
  const THEN = 1;
  const CATCH = 2;
  function await_block(node, get_input, pending_fn, then_fn, catch_fn) {
    if (hydrating) {
      hydrate_next();
    }
    var anchor = node;
    var runes = is_runes();
    var active_component_context = component_context;
    var component_function = DEV ? component_context?.function : null;
    var dev_original_stack = DEV ? dev_stack : null;
    var input = UNINITIALIZED;
    var pending_effect;
    var then_effect;
    var catch_effect;
    var input_source = runes ? source(
      /** @type {V} */
      void 0
    ) : /* @__PURE__ */ mutable_source(
      /** @type {V} */
      void 0,
      false,
      false
    );
    var error_source = runes ? source(void 0) : /* @__PURE__ */ mutable_source(void 0, false, false);
    var resolved = false;
    function update2(state2, restore) {
      resolved = true;
      if (restore) {
        set_active_effect(effect2);
        set_active_reaction(effect2);
        set_component_context(active_component_context);
        if (DEV) {
          set_dev_current_component_function(component_function);
          set_dev_stack(dev_original_stack);
        }
      }
      try {
        if (state2 === PENDING && pending_fn) {
          if (pending_effect) resume_effect(pending_effect);
          else pending_effect = branch(() => pending_fn(anchor));
        }
        if (state2 === THEN && then_fn) {
          if (then_effect) resume_effect(then_effect);
          else then_effect = branch(() => then_fn(anchor, input_source));
        }
        if (state2 === CATCH && catch_fn) {
          if (catch_effect) resume_effect(catch_effect);
          else catch_effect = branch(() => catch_fn(anchor, error_source));
        }
        if (state2 !== PENDING && pending_effect) {
          pause_effect(pending_effect, () => pending_effect = null);
        }
        if (state2 !== THEN && then_effect) {
          pause_effect(then_effect, () => then_effect = null);
        }
        if (state2 !== CATCH && catch_effect) {
          pause_effect(catch_effect, () => catch_effect = null);
        }
      } finally {
        if (restore) {
          if (DEV) {
            set_dev_current_component_function(null);
            set_dev_stack(null);
          }
          set_component_context(null);
          set_active_reaction(null);
          set_active_effect(null);
          flushSync();
        }
      }
    }
    var effect2 = block(() => {
      if (input === (input = get_input())) return;
      let mismatch = hydrating && is_promise(input) === (anchor.data === HYDRATION_START_ELSE);
      if (mismatch) {
        anchor = remove_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
      if (is_promise(input)) {
        var promise = input;
        resolved = false;
        promise.then(
          (value) => {
            if (promise !== input) return;
            internal_set(input_source, value);
            update2(THEN, true);
          },
          (error) => {
            if (promise !== input) return;
            internal_set(error_source, error);
            update2(CATCH, true);
            if (!catch_fn) {
              throw error_source.v;
            }
          }
        );
        if (hydrating) {
          if (pending_fn) {
            pending_effect = branch(() => pending_fn(anchor));
          }
        } else {
          queue_micro_task(() => {
            if (!resolved) update2(PENDING, true);
          });
        }
      } else {
        internal_set(input_source, input);
        update2(THEN, false);
      }
      if (mismatch) {
        set_hydrating(true);
      }
      return () => input = UNINITIALIZED;
    });
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function if_block(node, fn, [root_index, hydrate_index] = [0, 0]) {
    if (hydrating && root_index === 0) {
      hydrate_next();
    }
    var anchor = node;
    var consequent_effect = null;
    var alternate_effect = null;
    var condition = UNINITIALIZED;
    var flags2 = root_index > 0 ? EFFECT_TRANSPARENT : 0;
    var has_branch = false;
    const set_branch = (fn2, flag = true) => {
      has_branch = true;
      update_branch(flag, fn2);
    };
    const update_branch = (new_condition, fn2) => {
      if (condition === (condition = new_condition)) return;
      let mismatch = false;
      if (hydrating && hydrate_index !== -1) {
        if (root_index === 0) {
          const data = read_hydration_instruction(anchor);
          if (data === HYDRATION_START) {
            hydrate_index = 0;
          } else if (data === HYDRATION_START_ELSE) {
            hydrate_index = Infinity;
          } else {
            hydrate_index = parseInt(data.substring(1));
            if (hydrate_index !== hydrate_index) {
              hydrate_index = condition ? Infinity : -1;
            }
          }
        }
        const is_else = hydrate_index > root_index;
        if (!!condition === is_else) {
          anchor = remove_nodes();
          set_hydrate_node(anchor);
          set_hydrating(false);
          mismatch = true;
          hydrate_index = -1;
        }
      }
      if (condition) {
        if (consequent_effect) {
          resume_effect(consequent_effect);
        } else if (fn2) {
          consequent_effect = branch(() => fn2(anchor));
        }
        if (alternate_effect) {
          pause_effect(alternate_effect, () => {
            alternate_effect = null;
          });
        }
      } else {
        if (alternate_effect) {
          resume_effect(alternate_effect);
        } else if (fn2) {
          alternate_effect = branch(() => fn2(anchor, [root_index + 1, hydrate_index]));
        }
        if (consequent_effect) {
          pause_effect(consequent_effect, () => {
            consequent_effect = null;
          });
        }
      }
      if (mismatch) {
        set_hydrating(true);
      }
    };
    block(() => {
      has_branch = false;
      fn(set_branch);
      if (!has_branch) {
        update_branch(null, null);
      }
    }, flags2);
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function key_block(node, get_key, render_fn) {
    if (hydrating) {
      hydrate_next();
    }
    var anchor = node;
    var key = UNINITIALIZED;
    var effect2;
    var changed = is_runes() ? not_equal : safe_not_equal;
    block(() => {
      if (changed(key, key = get_key())) {
        if (effect2) {
          pause_effect(effect2);
        }
        effect2 = branch(() => render_fn(anchor));
      }
    });
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function css_props(element2, get_styles) {
    if (hydrating) {
      set_hydrate_node(
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(element2)
      );
    }
    render_effect(() => {
      var styles = get_styles();
      for (var key in styles) {
        var value = styles[key];
        if (value) {
          element2.style.setProperty(key, value);
        } else {
          element2.style.removeProperty(key);
        }
      }
    });
  }
  let current_each_item = null;
  function set_current_each_item(item) {
    current_each_item = item;
  }
  function index(_, i) {
    return i;
  }
  function pause_effects(state2, items, controlled_anchor, items_map) {
    var transitions = [];
    var length = items.length;
    for (var i = 0; i < length; i++) {
      pause_children(items[i].e, transitions, true);
    }
    var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        /** @type {Element} */
        controlled_anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(
        /** @type {Element} */
        controlled_anchor
      );
      items_map.clear();
      link(state2, items[0].prev, items[length - 1].next);
    }
    run_out_transitions(transitions, () => {
      for (var i2 = 0; i2 < length; i2++) {
        var item = items[i2];
        if (!is_controlled) {
          items_map.delete(item.k);
          link(state2, item.prev, item.next);
        }
        destroy_effect(item.e, !is_controlled);
      }
    });
  }
  function each(node, flags2, get_collection, get_key, render_fn, fallback_fn = null) {
    var anchor = node;
    var state2 = { flags: flags2, items: /* @__PURE__ */ new Map(), first: null };
    var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        node
      );
      anchor = hydrating ? set_hydrate_node(
        /** @type {Comment | Text} */
        /* @__PURE__ */ get_first_child(parent_node)
      ) : parent_node.appendChild(create_text());
    }
    if (hydrating) {
      hydrate_next();
    }
    var fallback2 = null;
    var was_empty = false;
    var each_array = /* @__PURE__ */ derived_safe_equal(() => {
      var collection = get_collection();
      return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
    });
    block(() => {
      var array = get$1(each_array);
      var length = array.length;
      if (was_empty && length === 0) {
        return;
      }
      was_empty = length === 0;
      let mismatch = false;
      if (hydrating) {
        var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;
        if (is_else !== (length === 0)) {
          anchor = remove_nodes();
          set_hydrate_node(anchor);
          set_hydrating(false);
          mismatch = true;
        }
      }
      if (hydrating) {
        var prev = null;
        var item;
        for (var i = 0; i < length; i++) {
          if (hydrate_node.nodeType === COMMENT_NODE && /** @type {Comment} */
          hydrate_node.data === HYDRATION_END) {
            anchor = /** @type {Comment} */
            hydrate_node;
            mismatch = true;
            set_hydrating(false);
            break;
          }
          var value = array[i];
          var key = get_key(value, i);
          item = create_item(
            hydrate_node,
            state2,
            prev,
            null,
            value,
            key,
            i,
            render_fn,
            flags2,
            get_collection
          );
          state2.items.set(key, item);
          prev = item;
        }
        if (length > 0) {
          set_hydrate_node(remove_nodes());
        }
      }
      if (!hydrating) {
        reconcile(array, state2, anchor, render_fn, flags2, get_key, get_collection);
      }
      if (fallback_fn !== null) {
        if (length === 0) {
          if (fallback2) {
            resume_effect(fallback2);
          } else {
            fallback2 = branch(() => fallback_fn(anchor));
          }
        } else if (fallback2 !== null) {
          pause_effect(fallback2, () => {
            fallback2 = null;
          });
        }
      }
      if (mismatch) {
        set_hydrating(true);
      }
      get$1(each_array);
    });
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function reconcile(array, state2, anchor, render_fn, flags2, get_key, get_collection) {
    var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
    var should_update = (flags2 & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;
    var length = array.length;
    var items = state2.items;
    var first = state2.first;
    var current = first;
    var seen2;
    var prev = null;
    var to_animate;
    var matched = [];
    var stashed = [];
    var value;
    var key;
    var item;
    var i;
    if (is_animated) {
      for (i = 0; i < length; i += 1) {
        value = array[i];
        key = get_key(value, i);
        item = items.get(key);
        if (item !== void 0) {
          item.a?.measure();
          (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(item);
        }
      }
    }
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      item = items.get(key);
      if (item === void 0) {
        var child_anchor = current ? (
          /** @type {TemplateNode} */
          current.e.nodes_start
        ) : anchor;
        prev = create_item(
          child_anchor,
          state2,
          prev,
          prev === null ? state2.first : prev.next,
          value,
          key,
          i,
          render_fn,
          flags2,
          get_collection
        );
        items.set(key, prev);
        matched = [];
        stashed = [];
        current = prev.next;
        continue;
      }
      if (should_update) {
        update_item(item, value, i, flags2);
      }
      if ((item.e.f & INERT) !== 0) {
        resume_effect(item.e);
        if (is_animated) {
          item.a?.unfix();
          (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).delete(item);
        }
      }
      if (item !== current) {
        if (seen2 !== void 0 && seen2.has(item)) {
          if (matched.length < stashed.length) {
            var start = stashed[0];
            var j;
            prev = start.prev;
            var a = matched[0];
            var b = matched[matched.length - 1];
            for (j = 0; j < matched.length; j += 1) {
              move(matched[j], start, anchor);
            }
            for (j = 0; j < stashed.length; j += 1) {
              seen2.delete(stashed[j]);
            }
            link(state2, a.prev, b.next);
            link(state2, prev, a);
            link(state2, b, start);
            current = start;
            prev = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen2.delete(item);
            move(item, current, anchor);
            link(state2, item.prev, item.next);
            link(state2, item, prev === null ? state2.first : prev.next);
            link(state2, prev, item);
            prev = item;
          }
          continue;
        }
        matched = [];
        stashed = [];
        while (current !== null && current.k !== key) {
          if ((current.e.f & INERT) === 0) {
            (seen2 ?? (seen2 = /* @__PURE__ */ new Set())).add(current);
          }
          stashed.push(current);
          current = current.next;
        }
        if (current === null) {
          continue;
        }
        item = current;
      }
      matched.push(item);
      prev = item;
      current = item.next;
    }
    if (current !== null || seen2 !== void 0) {
      var to_destroy = seen2 === void 0 ? [] : array_from(seen2);
      while (current !== null) {
        if ((current.e.f & INERT) === 0) {
          to_destroy.push(current);
        }
        current = current.next;
      }
      var destroy_length = to_destroy.length;
      if (destroy_length > 0) {
        var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
        if (is_animated) {
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].a?.measure();
          }
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].a?.fix();
          }
        }
        pause_effects(state2, to_destroy, controlled_anchor, items);
      }
    }
    if (is_animated) {
      queue_micro_task(() => {
        if (to_animate === void 0) return;
        for (item of to_animate) {
          item.a?.apply();
        }
      });
    }
    active_effect.first = state2.first && state2.first.e;
    active_effect.last = prev && prev.e;
  }
  function update_item(item, value, index2, type) {
    if ((type & EACH_ITEM_REACTIVE) !== 0) {
      internal_set(item.v, value);
    }
    if ((type & EACH_INDEX_REACTIVE) !== 0) {
      internal_set(
        /** @type {Value<number>} */
        item.i,
        index2
      );
    } else {
      item.i = index2;
    }
  }
  function create_item(anchor, state2, prev, next2, value, key, index2, render_fn, flags2, get_collection) {
    var previous_each_item = current_each_item;
    var reactive = (flags2 & EACH_ITEM_REACTIVE) !== 0;
    var mutable = (flags2 & EACH_ITEM_IMMUTABLE) === 0;
    var v = reactive ? mutable ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : value;
    var i = (flags2 & EACH_INDEX_REACTIVE) === 0 ? index2 : source(index2);
    if (DEV && reactive) {
      v.trace = () => {
        var collection_index = typeof i === "number" ? index2 : i.v;
        get_collection()[collection_index];
      };
    }
    var item = {
      i,
      v,
      k: key,
      a: null,
      // @ts-expect-error
      e: null,
      prev,
      next: next2
    };
    current_each_item = item;
    try {
      item.e = branch(() => render_fn(anchor, v, i, get_collection), hydrating);
      item.e.prev = prev && prev.e;
      item.e.next = next2 && next2.e;
      if (prev === null) {
        state2.first = item;
      } else {
        prev.next = item;
        prev.e.next = item.e;
      }
      if (next2 !== null) {
        next2.prev = item;
        next2.e.prev = item.e;
      }
      return item;
    } finally {
      current_each_item = previous_each_item;
    }
  }
  function move(item, next2, anchor) {
    var end = item.next ? (
      /** @type {TemplateNode} */
      item.next.e.nodes_start
    ) : anchor;
    var dest = next2 ? (
      /** @type {TemplateNode} */
      next2.e.nodes_start
    ) : anchor;
    var node = (
      /** @type {TemplateNode} */
      item.e.nodes_start
    );
    while (node !== end) {
      var next_node = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      dest.before(node);
      node = next_node;
    }
  }
  function link(state2, prev, next2) {
    if (prev === null) {
      state2.first = next2;
    } else {
      prev.next = next2;
      prev.e.next = next2 && next2.e;
    }
    if (next2 !== null) {
      next2.prev = prev;
      next2.e.prev = prev && prev.e;
    }
  }
  function check_hash(element2, server_hash, value) {
    if (!server_hash || server_hash === hash(String(value ?? ""))) return;
    let location;
    const loc = element2.__svelte_meta?.loc;
    if (loc) {
      location = `near ${loc.file}:${loc.line}:${loc.column}`;
    } else if (dev_current_component_function?.[FILENAME]) {
      location = `in ${dev_current_component_function[FILENAME]}`;
    }
    hydration_html_changed(sanitize_location(location));
  }
  function html(node, get_value, svg = false, mathml = false, skip_warning = false) {
    var anchor = node;
    var value = "";
    template_effect(() => {
      var effect2 = (
        /** @type {Effect} */
        active_effect
      );
      if (value === (value = get_value() ?? "")) {
        if (hydrating) hydrate_next();
        return;
      }
      if (effect2.nodes_start !== null) {
        remove_effect_dom(
          effect2.nodes_start,
          /** @type {TemplateNode} */
          effect2.nodes_end
        );
        effect2.nodes_start = effect2.nodes_end = null;
      }
      if (value === "") return;
      if (hydrating) {
        var hash2 = (
          /** @type {Comment} */
          hydrate_node.data
        );
        var next2 = hydrate_next();
        var last = next2;
        while (next2 !== null && (next2.nodeType !== COMMENT_NODE || /** @type {Comment} */
        next2.data !== "")) {
          last = next2;
          next2 = /** @type {TemplateNode} */
          /* @__PURE__ */ get_next_sibling(next2);
        }
        if (next2 === null) {
          hydration_mismatch();
          throw HYDRATION_ERROR;
        }
        if (DEV && !skip_warning) {
          check_hash(
            /** @type {Element} */
            next2.parentNode,
            hash2,
            value
          );
        }
        assign_nodes(hydrate_node, last);
        anchor = set_hydrate_node(next2);
        return;
      }
      var html2 = value + "";
      if (svg) html2 = `<svg>${html2}</svg>`;
      else if (mathml) html2 = `<math>${html2}</math>`;
      var node2 = create_fragment_from_html(html2);
      if (svg || mathml) {
        node2 = /** @type {Element} */
        /* @__PURE__ */ get_first_child(node2);
      }
      assign_nodes(
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(node2),
        /** @type {TemplateNode} */
        node2.lastChild
      );
      if (svg || mathml) {
        while (/* @__PURE__ */ get_first_child(node2)) {
          anchor.before(
            /** @type {Node} */
            /* @__PURE__ */ get_first_child(node2)
          );
        }
      } else {
        anchor.before(node2);
      }
    });
  }
  function slot(anchor, $$props, name, slot_props, fallback_fn) {
    if (hydrating) {
      hydrate_next();
    }
    var slot_fn = $$props.$$slots?.[name];
    var is_interop = false;
    if (slot_fn === true) {
      slot_fn = $$props[name === "default" ? "children" : name];
      is_interop = true;
    }
    if (slot_fn === void 0) {
      if (fallback_fn !== null) {
        fallback_fn(anchor);
      }
    } else {
      slot_fn(anchor, is_interop ? () => slot_props : slot_props);
    }
  }
  function sanitize_slots(props) {
    const sanitized = {};
    if (props.children) sanitized.default = true;
    for (const key in props.$$slots) {
      sanitized[key] = true;
    }
    return sanitized;
  }
  function validate_void_dynamic_element(tag_fn) {
    const tag2 = tag_fn();
    if (tag2 && is_void(tag2)) {
      dynamic_void_element_content(tag2);
    }
  }
  function validate_dynamic_element_tag(tag_fn) {
    const tag2 = tag_fn();
    const is_string = typeof tag2 === "string";
    if (tag2 && !is_string) {
      svelte_element_invalid_this_value();
    }
  }
  function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== "function") {
      store_invalid_shape(name);
    }
  }
  function prevent_snippet_stringification(fn) {
    fn.toString = () => {
      snippet_without_render_tag();
      return "";
    };
    return fn;
  }
  function snippet(node, get_snippet, ...args) {
    var anchor = node;
    var snippet2 = noop;
    var snippet_effect;
    block(() => {
      if (snippet2 === (snippet2 = get_snippet())) return;
      if (snippet_effect) {
        destroy_effect(snippet_effect);
        snippet_effect = null;
      }
      if (DEV && snippet2 == null) {
        invalid_snippet();
      }
      snippet_effect = branch(() => (
        /** @type {SnippetFn} */
        snippet2(anchor, ...args)
      ));
    }, EFFECT_TRANSPARENT);
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function wrap_snippet(component2, fn) {
    const snippet2 = (node, ...args) => {
      var previous_component_function = dev_current_component_function;
      set_dev_current_component_function(component2);
      try {
        return fn(node, ...args);
      } finally {
        set_dev_current_component_function(previous_component_function);
      }
    };
    prevent_snippet_stringification(snippet2);
    return snippet2;
  }
  function createRawSnippet(fn) {
    return (anchor, ...params) => {
      var snippet2 = fn(...params);
      var element2;
      if (hydrating) {
        element2 = /** @type {Element} */
        hydrate_node;
        hydrate_next();
      } else {
        var html2 = snippet2.render().trim();
        var fragment = create_fragment_from_html(html2);
        element2 = /** @type {Element} */
        /* @__PURE__ */ get_first_child(fragment);
        if (DEV && (/* @__PURE__ */ get_next_sibling(element2) !== null || element2.nodeType !== ELEMENT_NODE)) {
          invalid_raw_snippet_render();
        }
        anchor.before(element2);
      }
      const result = snippet2.setup?.(element2);
      assign_nodes(element2, element2);
      if (typeof result === "function") {
        teardown(result);
      }
    };
  }
  function component(node, get_component, render_fn) {
    if (hydrating) {
      hydrate_next();
    }
    var anchor = node;
    var component2;
    var effect2;
    block(() => {
      if (component2 === (component2 = get_component())) return;
      if (effect2) {
        pause_effect(effect2);
        effect2 = null;
      }
      if (component2) {
        effect2 = branch(() => render_fn(anchor, component2));
      }
    }, EFFECT_TRANSPARENT);
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function element(node, get_tag, is_svg2, render_fn, get_namespace, location) {
    let was_hydrating = hydrating;
    if (hydrating) {
      hydrate_next();
    }
    var filename = DEV && location && component_context?.function[FILENAME];
    var tag2;
    var current_tag;
    var element2 = null;
    if (hydrating && hydrate_node.nodeType === ELEMENT_NODE) {
      element2 = /** @type {Element} */
      hydrate_node;
      hydrate_next();
    }
    var anchor = (
      /** @type {TemplateNode} */
      hydrating ? hydrate_node : node
    );
    var effect2;
    var each_item_block = current_each_item;
    block(() => {
      const next_tag = get_tag() || null;
      var ns = get_namespace ? get_namespace() : is_svg2 || next_tag === "svg" ? NAMESPACE_SVG : null;
      if (next_tag === tag2) return;
      var previous_each_item = current_each_item;
      set_current_each_item(each_item_block);
      if (effect2) {
        if (next_tag === null) {
          pause_effect(effect2, () => {
            effect2 = null;
            current_tag = null;
          });
        } else if (next_tag === current_tag) {
          resume_effect(effect2);
        } else {
          destroy_effect(effect2);
          set_should_intro(false);
        }
      }
      if (next_tag && next_tag !== current_tag) {
        effect2 = branch(() => {
          element2 = hydrating ? (
            /** @type {Element} */
            element2
          ) : ns ? document.createElementNS(ns, next_tag) : document.createElement(next_tag);
          if (DEV && location) {
            element2.__svelte_meta = {
              parent: dev_stack,
              loc: {
                file: filename,
                line: location[0],
                column: location[1]
              }
            };
          }
          assign_nodes(element2, element2);
          if (render_fn) {
            if (hydrating && is_raw_text_element(next_tag)) {
              element2.append(document.createComment(""));
            }
            var child_anchor = (
              /** @type {TemplateNode} */
              hydrating ? /* @__PURE__ */ get_first_child(element2) : element2.appendChild(create_text())
            );
            if (hydrating) {
              if (child_anchor === null) {
                set_hydrating(false);
              } else {
                set_hydrate_node(child_anchor);
              }
            }
            render_fn(element2, child_anchor);
          }
          active_effect.nodes_end = element2;
          anchor.before(element2);
        });
      }
      tag2 = next_tag;
      if (tag2) current_tag = tag2;
      set_should_intro(true);
      set_current_each_item(previous_each_item);
    }, EFFECT_TRANSPARENT);
    if (was_hydrating) {
      set_hydrating(true);
      set_hydrate_node(anchor);
    }
  }
  function append_styles$1(anchor, css) {
    queue_micro_task(() => {
      var root2 = anchor.getRootNode();
      var target = (
        /** @type {ShadowRoot} */
        root2.host ? (
          /** @type {ShadowRoot} */
          root2
        ) : (
          /** @type {Document} */
          root2.head ?? /** @type {Document} */
          root2.ownerDocument.head
        )
      );
      if (!target.querySelector("#" + css.hash)) {
        const style = document.createElement("style");
        style.id = css.hash;
        style.textContent = css.code;
        target.appendChild(style);
        if (DEV) {
          register_style(css.hash, style);
        }
      }
    });
  }
  function action(dom, action2, get_value) {
    effect(() => {
      var payload = untrack(() => action2(dom, get_value?.()) || {});
      if (get_value && payload?.update) {
        var inited = false;
        var prev = (
          /** @type {any} */
          {}
        );
        render_effect(() => {
          var value = get_value();
          deep_read_state(value);
          if (inited && safe_not_equal(prev, value)) {
            prev = value;
            payload.update(value);
          }
        });
        inited = true;
      }
      if (payload?.destroy) {
        return () => (
          /** @type {Function} */
          payload.destroy()
        );
      }
    });
  }
  function attach(node, get_fn) {
    var fn = void 0;
    var e;
    block(() => {
      if (fn !== (fn = get_fn())) {
        if (e) {
          destroy_effect(e);
          e = null;
        }
        if (fn) {
          e = branch(() => {
            effect(() => (
              /** @type {(node: Element) => void} */
              fn(node)
            ));
          });
        }
      }
    });
  }
  const ATTR_REGEX = /[&"<]/g;
  const CONTENT_REGEX = /[&<]/g;
  function escape_html(value, is_attr) {
    const str = String(value ?? "");
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = "";
    let last = 0;
    while (pattern.test(str)) {
      const i = pattern.lastIndex - 1;
      const ch = str[i];
      escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
      last = i + 1;
    }
    return escaped + str.substring(last);
  }
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx$1() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }
  const replacements = {
    translate: /* @__PURE__ */ new Map([
      [true, "yes"],
      [false, "no"]
    ])
  };
  function attr(name, value, is_boolean = false) {
    if (value == null || !value && is_boolean) return "";
    const normalized = name in replacements && replacements[name].get(value) || value;
    const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
    return ` ${name}${assignment}`;
  }
  function clsx(value) {
    if (typeof value === "object") {
      return clsx$1(value);
    } else {
      return value ?? "";
    }
  }
  const whitespace = [..." 	\n\r\f \v\uFEFF"];
  function to_class(value, hash2, directives) {
    var classname = value == null ? "" : "" + value;
    if (hash2) {
      classname = classname ? classname + " " + hash2 : hash2;
    }
    if (directives) {
      for (var key in directives) {
        if (directives[key]) {
          classname = classname ? classname + " " + key : key;
        } else if (classname.length) {
          var len = key.length;
          var a = 0;
          while ((a = classname.indexOf(key, a)) >= 0) {
            var b = a + len;
            if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
              classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
            } else {
              a = b;
            }
          }
        }
      }
    }
    return classname === "" ? null : classname;
  }
  function append_styles(styles, important = false) {
    var separator = important ? " !important;" : ";";
    var css = "";
    for (var key in styles) {
      var value = styles[key];
      if (value != null && value !== "") {
        css += " " + key + ": " + value + separator;
      }
    }
    return css;
  }
  function to_css_name(name) {
    if (name[0] !== "-" || name[1] !== "-") {
      return name.toLowerCase();
    }
    return name;
  }
  function to_style(value, styles) {
    if (styles) {
      var new_style = "";
      var normal_styles;
      var important_styles;
      if (Array.isArray(styles)) {
        normal_styles = styles[0];
        important_styles = styles[1];
      } else {
        normal_styles = styles;
      }
      if (value) {
        value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
        var in_str = false;
        var in_apo = 0;
        var in_comment = false;
        var reserved_names = [];
        if (normal_styles) {
          reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
        }
        if (important_styles) {
          reserved_names.push(...Object.keys(important_styles).map(to_css_name));
        }
        var start_index = 0;
        var name_index = -1;
        const len = value.length;
        for (var i = 0; i < len; i++) {
          var c = value[i];
          if (in_comment) {
            if (c === "/" && value[i - 1] === "*") {
              in_comment = false;
            }
          } else if (in_str) {
            if (in_str === c) {
              in_str = false;
            }
          } else if (c === "/" && value[i + 1] === "*") {
            in_comment = true;
          } else if (c === '"' || c === "'") {
            in_str = c;
          } else if (c === "(") {
            in_apo++;
          } else if (c === ")") {
            in_apo--;
          }
          if (!in_comment && in_str === false && in_apo === 0) {
            if (c === ":" && name_index === -1) {
              name_index = i;
            } else if (c === ";" || i === len - 1) {
              if (name_index !== -1) {
                var name = to_css_name(value.substring(start_index, name_index).trim());
                if (!reserved_names.includes(name)) {
                  if (c !== ";") {
                    i++;
                  }
                  var property = value.substring(start_index, i).trim();
                  new_style += " " + property + ";";
                }
              }
              start_index = i + 1;
              name_index = -1;
            }
          }
        }
      }
      if (normal_styles) {
        new_style += append_styles(normal_styles);
      }
      if (important_styles) {
        new_style += append_styles(important_styles, true);
      }
      new_style = new_style.trim();
      return new_style === "" ? null : new_style;
    }
    return value == null ? null : String(value);
  }
  function set_class(dom, is_html, value, hash2, prev_classes, next_classes) {
    var prev = dom.__className;
    if (hydrating || prev !== value || prev === void 0) {
      var next_class_name = to_class(value, hash2, next_classes);
      if (!hydrating || next_class_name !== dom.getAttribute("class")) {
        if (next_class_name == null) {
          dom.removeAttribute("class");
        } else if (is_html) {
          dom.className = next_class_name;
        } else {
          dom.setAttribute("class", next_class_name);
        }
      }
      dom.__className = value;
    } else if (next_classes && prev_classes !== next_classes) {
      for (var key in next_classes) {
        var is_present = !!next_classes[key];
        if (prev_classes == null || is_present !== !!prev_classes[key]) {
          dom.classList.toggle(key, is_present);
        }
      }
    }
    return next_classes;
  }
  function update_styles(dom, prev = {}, next2, priority) {
    for (var key in next2) {
      var value = next2[key];
      if (prev[key] !== value) {
        if (next2[key] == null) {
          dom.style.removeProperty(key);
        } else {
          dom.style.setProperty(key, value, priority);
        }
      }
    }
  }
  function set_style(dom, value, prev_styles, next_styles) {
    var prev = dom.__style;
    if (hydrating || prev !== value) {
      var next_style_attr = to_style(value, next_styles);
      if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
        if (next_style_attr == null) {
          dom.removeAttribute("style");
        } else {
          dom.style.cssText = next_style_attr;
        }
      }
      dom.__style = value;
    } else if (next_styles) {
      if (Array.isArray(next_styles)) {
        update_styles(dom, prev_styles?.[0], next_styles[0]);
        update_styles(dom, prev_styles?.[1], next_styles[1], "important");
      } else {
        update_styles(dom, prev_styles, next_styles);
      }
    }
    return next_styles;
  }
  function select_option(select, value, mounting = false) {
    if (select.multiple) {
      if (value == void 0) {
        return;
      }
      if (!is_array(value)) {
        return select_multiple_invalid_value();
      }
      for (var option of select.options) {
        option.selected = value.includes(get_option_value(option));
      }
      return;
    }
    for (option of select.options) {
      var option_value = get_option_value(option);
      if (is(option_value, value)) {
        option.selected = true;
        return;
      }
    }
    if (!mounting || value !== void 0) {
      select.selectedIndex = -1;
    }
  }
  function init_select(select) {
    var observer = new MutationObserver(() => {
      select_option(select, select.__value);
    });
    observer.observe(select, {
      // Listen to option element changes
      childList: true,
      subtree: true,
      // because of <optgroup>
      // Listen to option element value attribute changes
      // (doesn't get notified of select value changes,
      // because that property is not reflected as an attribute)
      attributes: true,
      attributeFilter: ["value"]
    });
    teardown(() => {
      observer.disconnect();
    });
  }
  function bind_select_value(select, get2, set2 = get2) {
    var mounting = true;
    listen_to_event_and_reset_event(select, "change", (is_reset) => {
      var query = is_reset ? "[selected]" : ":checked";
      var value;
      if (select.multiple) {
        value = [].map.call(select.querySelectorAll(query), get_option_value);
      } else {
        var selected_option = select.querySelector(query) ?? // will fall back to first non-disabled option if no option is selected
        select.querySelector("option:not([disabled])");
        value = selected_option && get_option_value(selected_option);
      }
      set2(value);
    });
    effect(() => {
      var value = get2();
      select_option(select, value, mounting);
      if (mounting && value === void 0) {
        var selected_option = select.querySelector(":checked");
        if (selected_option !== null) {
          value = get_option_value(selected_option);
          set2(value);
        }
      }
      select.__value = value;
      mounting = false;
    });
    init_select(select);
  }
  function get_option_value(option) {
    if ("__value" in option) {
      return option.__value;
    } else {
      return option.value;
    }
  }
  const CLASS = Symbol("class");
  const STYLE = Symbol("style");
  const IS_CUSTOM_ELEMENT = Symbol("is custom element");
  const IS_HTML = Symbol("is html");
  function remove_input_defaults(input) {
    if (!hydrating) return;
    var already_removed = false;
    var remove_defaults = () => {
      if (already_removed) return;
      already_removed = true;
      if (input.hasAttribute("value")) {
        var value = input.value;
        set_attribute(input, "value", null);
        input.value = value;
      }
      if (input.hasAttribute("checked")) {
        var checked = input.checked;
        set_attribute(input, "checked", null);
        input.checked = checked;
      }
    };
    input.__on_r = remove_defaults;
    queue_idle_task(remove_defaults);
    add_form_reset_listener();
  }
  function set_value(element2, value) {
    var attributes = get_attributes(element2);
    if (attributes.value === (attributes.value = // treat null and undefined the same for the initial value
    value ?? void 0) || // @ts-expect-error
    // `progress` elements always need their value set when it's `0`
    element2.value === value && (value !== 0 || element2.nodeName !== "PROGRESS")) {
      return;
    }
    element2.value = value ?? "";
  }
  function set_checked(element2, checked) {
    var attributes = get_attributes(element2);
    if (attributes.checked === (attributes.checked = // treat null and undefined the same for the initial value
    checked ?? void 0)) {
      return;
    }
    element2.checked = checked;
  }
  function set_selected(element2, selected) {
    if (selected) {
      if (!element2.hasAttribute("selected")) {
        element2.setAttribute("selected", "");
      }
    } else {
      element2.removeAttribute("selected");
    }
  }
  function set_default_checked(element2, checked) {
    const existing_value = element2.checked;
    element2.defaultChecked = checked;
    element2.checked = existing_value;
  }
  function set_default_value(element2, value) {
    const existing_value = element2.value;
    element2.defaultValue = value;
    element2.value = existing_value;
  }
  function set_attribute(element2, attribute, value, skip_warning) {
    var attributes = get_attributes(element2);
    if (hydrating) {
      attributes[attribute] = element2.getAttribute(attribute);
      if (attribute === "src" || attribute === "srcset" || attribute === "href" && element2.nodeName === "LINK") {
        if (!skip_warning) {
          check_src_in_dev_hydration(element2, attribute, value ?? "");
        }
        return;
      }
    }
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (attribute === "loading") {
      element2[LOADING_ATTR_SYMBOL] = value;
    }
    if (value == null) {
      element2.removeAttribute(attribute);
    } else if (typeof value !== "string" && get_setters(element2).includes(attribute)) {
      element2[attribute] = value;
    } else {
      element2.setAttribute(attribute, value);
    }
  }
  function set_xlink_attribute(dom, attribute, value) {
    dom.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
  }
  function set_custom_element_data(node, prop2, value) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    let was_hydrating = hydrating;
    if (hydrating) {
      set_hydrating(false);
    }
    set_active_reaction(null);
    set_active_effect(null);
    try {
      if (
        // `style` should use `set_attribute` rather than the setter
        prop2 !== "style" && // Don't compute setters for custom elements while they aren't registered yet,
        // because during their upgrade/instantiation they might add more setters.
        // Instead, fall back to a simple "an object, then set as property" heuristic.
        (setters_cache.has(node.nodeName) || // customElements may not be available in browser extension contexts
        !customElements || customElements.get(node.tagName.toLowerCase()) ? get_setters(node).includes(prop2) : value && typeof value === "object")
      ) {
        node[prop2] = value;
      } else {
        set_attribute(node, prop2, value == null ? value : String(value));
      }
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
      if (was_hydrating) {
        set_hydrating(true);
      }
    }
  }
  function set_attributes(element2, prev, next2, css_hash, skip_warning = false) {
    var attributes = get_attributes(element2);
    var is_custom_element = attributes[IS_CUSTOM_ELEMENT];
    var preserve_attribute_case = !attributes[IS_HTML];
    let is_hydrating_custom_element = hydrating && is_custom_element;
    if (is_hydrating_custom_element) {
      set_hydrating(false);
    }
    var current = prev || {};
    var is_option_element = element2.tagName === "OPTION";
    for (var key in prev) {
      if (!(key in next2)) {
        next2[key] = null;
      }
    }
    if (next2.class) {
      next2.class = clsx(next2.class);
    } else if (css_hash || next2[CLASS]) {
      next2.class = null;
    }
    if (next2[STYLE]) {
      next2.style ?? (next2.style = null);
    }
    var setters = get_setters(element2);
    for (const key2 in next2) {
      let value = next2[key2];
      if (is_option_element && key2 === "value" && value == null) {
        element2.value = element2.__value = "";
        current[key2] = value;
        continue;
      }
      if (key2 === "class") {
        var is_html = element2.namespaceURI === "http://www.w3.org/1999/xhtml";
        set_class(element2, is_html, value, css_hash, prev?.[CLASS], next2[CLASS]);
        current[key2] = value;
        current[CLASS] = next2[CLASS];
        continue;
      }
      if (key2 === "style") {
        set_style(element2, value, prev?.[STYLE], next2[STYLE]);
        current[key2] = value;
        current[STYLE] = next2[STYLE];
        continue;
      }
      var prev_value = current[key2];
      if (value === prev_value && !(value === void 0 && element2.hasAttribute(key2))) {
        continue;
      }
      current[key2] = value;
      var prefix = key2[0] + key2[1];
      if (prefix === "$$") continue;
      if (prefix === "on") {
        const opts = {};
        const event_handle_key = "$$" + key2;
        let event_name = key2.slice(2);
        var delegated = is_delegated(event_name);
        if (is_capture_event(event_name)) {
          event_name = event_name.slice(0, -7);
          opts.capture = true;
        }
        if (!delegated && prev_value) {
          if (value != null) continue;
          element2.removeEventListener(event_name, current[event_handle_key], opts);
          current[event_handle_key] = null;
        }
        if (value != null) {
          if (!delegated) {
            let handle = function(evt) {
              current[key2].call(this, evt);
            };
            current[event_handle_key] = create_event(event_name, element2, handle, opts);
          } else {
            element2[`__${event_name}`] = value;
            delegate([event_name]);
          }
        } else if (delegated) {
          element2[`__${event_name}`] = void 0;
        }
      } else if (key2 === "style") {
        set_attribute(element2, key2, value);
      } else if (key2 === "autofocus") {
        autofocus(
          /** @type {HTMLElement} */
          element2,
          Boolean(value)
        );
      } else if (!is_custom_element && (key2 === "__value" || key2 === "value" && value != null)) {
        element2.value = element2.__value = value;
      } else if (key2 === "selected" && is_option_element) {
        set_selected(
          /** @type {HTMLOptionElement} */
          element2,
          value
        );
      } else {
        var name = key2;
        if (!preserve_attribute_case) {
          name = normalize_attribute(name);
        }
        var is_default = name === "defaultValue" || name === "defaultChecked";
        if (value == null && !is_custom_element && !is_default) {
          attributes[key2] = null;
          if (name === "value" || name === "checked") {
            let input = (
              /** @type {HTMLInputElement} */
              element2
            );
            const use_default = prev === void 0;
            if (name === "value") {
              let previous = input.defaultValue;
              input.removeAttribute(name);
              input.defaultValue = previous;
              input.value = input.__value = use_default ? previous : null;
            } else {
              let previous = input.defaultChecked;
              input.removeAttribute(name);
              input.defaultChecked = previous;
              input.checked = use_default ? previous : false;
            }
          } else {
            element2.removeAttribute(key2);
          }
        } else if (is_default || setters.includes(name) && (is_custom_element || typeof value !== "string")) {
          element2[name] = value;
        } else if (typeof value !== "function") {
          set_attribute(element2, name, value, skip_warning);
        }
      }
    }
    if (is_hydrating_custom_element) {
      set_hydrating(true);
    }
    return current;
  }
  function attribute_effect(element2, fn, thunks = [], css_hash, skip_warning = false, d = derived$1) {
    const deriveds = thunks.map(d);
    var prev = void 0;
    var effects = {};
    var is_select = element2.nodeName === "SELECT";
    var inited = false;
    block(() => {
      var next2 = fn(...deriveds.map(get$1));
      var current = set_attributes(element2, prev, next2, css_hash, skip_warning);
      if (inited && is_select && "value" in next2) {
        select_option(
          /** @type {HTMLSelectElement} */
          element2,
          next2.value
        );
      }
      for (let symbol of Object.getOwnPropertySymbols(effects)) {
        if (!next2[symbol]) destroy_effect(effects[symbol]);
      }
      for (let symbol of Object.getOwnPropertySymbols(next2)) {
        var n = next2[symbol];
        if (symbol.description === ATTACHMENT_KEY && (!prev || n !== prev[symbol])) {
          if (effects[symbol]) destroy_effect(effects[symbol]);
          effects[symbol] = branch(() => attach(element2, () => n));
        }
        current[symbol] = n;
      }
      prev = current;
    });
    if (is_select) {
      var select = (
        /** @type {HTMLSelectElement} */
        element2
      );
      effect(() => {
        select_option(
          select,
          /** @type {Record<string | symbol, any>} */
          prev.value,
          true
        );
        init_select(select);
      });
    }
    inited = true;
  }
  function get_attributes(element2) {
    return (
      /** @type {Record<string | symbol, unknown>} **/
      // @ts-expect-error
      element2.__attributes ?? (element2.__attributes = {
        [IS_CUSTOM_ELEMENT]: element2.nodeName.includes("-"),
        [IS_HTML]: element2.namespaceURI === NAMESPACE_HTML
      })
    );
  }
  var setters_cache = /* @__PURE__ */ new Map();
  function get_setters(element2) {
    var setters = setters_cache.get(element2.nodeName);
    if (setters) return setters;
    setters_cache.set(element2.nodeName, setters = []);
    var descriptors;
    var proto = element2;
    var element_proto = Element.prototype;
    while (element_proto !== proto) {
      descriptors = get_descriptors(proto);
      for (var key in descriptors) {
        if (descriptors[key].set) {
          setters.push(key);
        }
      }
      proto = get_prototype_of(proto);
    }
    return setters;
  }
  function check_src_in_dev_hydration(element2, attribute, value) {
    if (!DEV) return;
    if (attribute === "srcset" && srcset_url_equal(element2, value)) return;
    if (src_url_equal(element2.getAttribute(attribute) ?? "", value)) return;
    hydration_attribute_changed(
      attribute,
      element2.outerHTML.replace(element2.innerHTML, element2.innerHTML && "..."),
      String(value)
    );
  }
  function src_url_equal(element_src, url) {
    if (element_src === url) return true;
    return new URL(element_src, document.baseURI).href === new URL(url, document.baseURI).href;
  }
  function split_srcset(srcset) {
    return srcset.split(",").map((src) => src.trim().split(" ").filter(Boolean));
  }
  function srcset_url_equal(element2, srcset) {
    var element_urls = split_srcset(element2.srcset);
    var urls = split_srcset(srcset);
    return urls.length === element_urls.length && urls.every(
      ([url, width], i) => width === element_urls[i][1] && // We need to test both ways because Vite will create an a full URL with
      // `new URL(asset, import.meta.url).href` for the client when `base: './'`, and the
      // relative URLs inside srcset are not automatically resolved to absolute URLs by
      // browsers (in contrast to img.src). This means both SSR and DOM code could
      // contain relative or absolute URLs.
      (src_url_equal(element_urls[i][0], url) || src_url_equal(url, element_urls[i][0]))
    );
  }
  const now = BROWSER ? () => performance.now() : () => Date.now();
  const raf = {
    // don't access requestAnimationFrame eagerly outside method
    // this allows basic testing of user code without JSDOM
    // bunder will eval and remove ternary when the user's app is built
    tick: (
      /** @param {any} _ */
      (_) => (BROWSER ? requestAnimationFrame : noop)(_)
    ),
    now: () => now(),
    tasks: /* @__PURE__ */ new Set()
  };
  function run_tasks() {
    const now2 = raf.now();
    raf.tasks.forEach((task) => {
      if (!task.c(now2)) {
        raf.tasks.delete(task);
        task.f();
      }
    });
    if (raf.tasks.size !== 0) {
      raf.tick(run_tasks);
    }
  }
  function loop(callback) {
    let task;
    if (raf.tasks.size === 0) {
      raf.tick(run_tasks);
    }
    return {
      promise: new Promise((fulfill) => {
        raf.tasks.add(task = { c: callback, f: fulfill });
      }),
      abort() {
        raf.tasks.delete(task);
      }
    };
  }
  function dispatch_event(element2, type) {
    without_reactive_context(() => {
      element2.dispatchEvent(new CustomEvent(type));
    });
  }
  function css_property_to_camelcase(style) {
    if (style === "float") return "cssFloat";
    if (style === "offset") return "cssOffset";
    if (style.startsWith("--")) return style;
    const parts = style.split("-");
    if (parts.length === 1) return parts[0];
    return parts[0] + parts.slice(1).map(
      /** @param {any} word */
      (word) => word[0].toUpperCase() + word.slice(1)
    ).join("");
  }
  function css_to_keyframe(css) {
    const keyframe = {};
    const parts = css.split(";");
    for (const part of parts) {
      const [property, value] = part.split(":");
      if (!property || value === void 0) break;
      const formatted_property = css_property_to_camelcase(property.trim());
      keyframe[formatted_property] = value.trim();
    }
    return keyframe;
  }
  const linear = (t) => t;
  function animation(element2, get_fn, get_params) {
    var item = (
      /** @type {EachItem} */
      current_each_item
    );
    var from;
    var to;
    var animation2;
    var original_styles = null;
    item.a ?? (item.a = {
      element: element2,
      measure() {
        from = this.element.getBoundingClientRect();
      },
      apply() {
        animation2?.abort();
        to = this.element.getBoundingClientRect();
        if (from.left !== to.left || from.right !== to.right || from.top !== to.top || from.bottom !== to.bottom) {
          const options = get_fn()(this.element, { from, to }, get_params?.());
          animation2 = animate(this.element, options, void 0, 1, () => {
            animation2?.abort();
            animation2 = void 0;
          });
        }
      },
      fix() {
        if (element2.getAnimations().length) return;
        var { position, width, height } = getComputedStyle(element2);
        if (position !== "absolute" && position !== "fixed") {
          var style = (
            /** @type {HTMLElement | SVGElement} */
            element2.style
          );
          original_styles = {
            position: style.position,
            width: style.width,
            height: style.height,
            transform: style.transform
          };
          style.position = "absolute";
          style.width = width;
          style.height = height;
          var to2 = element2.getBoundingClientRect();
          if (from.left !== to2.left || from.top !== to2.top) {
            var transform = `translate(${from.left - to2.left}px, ${from.top - to2.top}px)`;
            style.transform = style.transform ? `${style.transform} ${transform}` : transform;
          }
        }
      },
      unfix() {
        if (original_styles) {
          var style = (
            /** @type {HTMLElement | SVGElement} */
            element2.style
          );
          style.position = original_styles.position;
          style.width = original_styles.width;
          style.height = original_styles.height;
          style.transform = original_styles.transform;
        }
      }
    });
    item.a.element = element2;
  }
  function transition(flags2, element2, get_fn, get_params) {
    var is_intro = (flags2 & TRANSITION_IN) !== 0;
    var is_outro = (flags2 & TRANSITION_OUT) !== 0;
    var is_both = is_intro && is_outro;
    var is_global = (flags2 & TRANSITION_GLOBAL) !== 0;
    var direction = is_both ? "both" : is_intro ? "in" : "out";
    var current_options;
    var inert = element2.inert;
    var overflow = element2.style.overflow;
    var intro;
    var outro;
    function get_options() {
      return without_reactive_context(() => {
        return current_options ?? (current_options = get_fn()(element2, get_params?.() ?? /** @type {P} */
        {}, {
          direction
        }));
      });
    }
    var transition2 = {
      is_global,
      in() {
        element2.inert = inert;
        if (!is_intro) {
          outro?.abort();
          outro?.reset?.();
          return;
        }
        if (!is_outro) {
          intro?.abort();
        }
        dispatch_event(element2, "introstart");
        intro = animate(element2, get_options(), outro, 1, () => {
          dispatch_event(element2, "introend");
          intro?.abort();
          intro = current_options = void 0;
          element2.style.overflow = overflow;
        });
      },
      out(fn) {
        if (!is_outro) {
          fn?.();
          current_options = void 0;
          return;
        }
        element2.inert = true;
        dispatch_event(element2, "outrostart");
        outro = animate(element2, get_options(), intro, 0, () => {
          dispatch_event(element2, "outroend");
          fn?.();
        });
      },
      stop: () => {
        intro?.abort();
        outro?.abort();
      }
    };
    var e = (
      /** @type {Effect} */
      active_effect
    );
    (e.transitions ?? (e.transitions = [])).push(transition2);
    if (is_intro && should_intro) {
      var run2 = is_global;
      if (!run2) {
        var block2 = (
          /** @type {Effect | null} */
          e.parent
        );
        while (block2 && (block2.f & EFFECT_TRANSPARENT) !== 0) {
          while (block2 = block2.parent) {
            if ((block2.f & BLOCK_EFFECT) !== 0) break;
          }
        }
        run2 = !block2 || (block2.f & EFFECT_RAN) !== 0;
      }
      if (run2) {
        effect(() => {
          untrack(() => transition2.in());
        });
      }
    }
  }
  function animate(element2, options, counterpart, t2, on_finish) {
    var is_intro = t2 === 1;
    if (is_function(options)) {
      var a;
      var aborted = false;
      queue_micro_task(() => {
        if (aborted) return;
        var o = options({ direction: is_intro ? "in" : "out" });
        a = animate(element2, o, counterpart, t2, on_finish);
      });
      return {
        abort: () => {
          aborted = true;
          a?.abort();
        },
        deactivate: () => a.deactivate(),
        reset: () => a.reset(),
        t: () => a.t()
      };
    }
    counterpart?.deactivate();
    if (!options?.duration) {
      on_finish();
      return {
        abort: noop,
        deactivate: noop,
        reset: noop,
        t: () => t2
      };
    }
    const { delay = 0, css, tick: tick2, easing = linear } = options;
    var keyframes = [];
    if (is_intro && counterpart === void 0) {
      if (tick2) {
        tick2(0, 1);
      }
      if (css) {
        var styles = css_to_keyframe(css(0, 1));
        keyframes.push(styles, styles);
      }
    }
    var get_t = () => 1 - t2;
    var animation2 = element2.animate(keyframes, { duration: delay, fill: "forwards" });
    animation2.onfinish = () => {
      animation2.cancel();
      var t1 = counterpart?.t() ?? 1 - t2;
      counterpart?.abort();
      var delta = t2 - t1;
      var duration = (
        /** @type {number} */
        options.duration * Math.abs(delta)
      );
      var keyframes2 = [];
      if (duration > 0) {
        var needs_overflow_hidden = false;
        if (css) {
          var n = Math.ceil(duration / (1e3 / 60));
          for (var i = 0; i <= n; i += 1) {
            var t = t1 + delta * easing(i / n);
            var styles2 = css_to_keyframe(css(t, 1 - t));
            keyframes2.push(styles2);
            needs_overflow_hidden || (needs_overflow_hidden = styles2.overflow === "hidden");
          }
        }
        if (needs_overflow_hidden) {
          element2.style.overflow = "hidden";
        }
        get_t = () => {
          var time = (
            /** @type {number} */
            /** @type {globalThis.Animation} */
            animation2.currentTime
          );
          return t1 + delta * easing(time / duration);
        };
        if (tick2) {
          loop(() => {
            if (animation2.playState !== "running") return false;
            var t3 = get_t();
            tick2(t3, 1 - t3);
            return true;
          });
        }
      }
      animation2 = element2.animate(keyframes2, { duration, fill: "forwards" });
      animation2.onfinish = () => {
        get_t = () => t2;
        tick2?.(t2, 1 - t2);
        on_finish();
      };
    };
    return {
      abort: () => {
        if (animation2) {
          animation2.cancel();
          animation2.effect = null;
          animation2.onfinish = noop;
        }
      },
      deactivate: () => {
        on_finish = noop;
      },
      reset: () => {
        if (t2 === 0) {
          tick2?.(1, 0);
        }
      },
      t: () => get_t()
    };
  }
  function bind_active_element(update2) {
    listen(document, ["focusin", "focusout"], (event2) => {
      if (event2 && event2.type === "focusout" && /** @type {FocusEvent} */
      event2.relatedTarget) {
        return;
      }
      update2(document.activeElement);
    });
  }
  function bind_value(input, get2, set2 = get2) {
    var runes = is_runes();
    listen_to_event_and_reset_event(input, "input", (is_reset) => {
      if (DEV && input.type === "checkbox") {
        bind_invalid_checkbox_value();
      }
      var value = is_reset ? input.defaultValue : input.value;
      value = is_numberlike_input(input) ? to_number(value) : value;
      set2(value);
      if (runes && value !== (value = get2())) {
        var start = input.selectionStart;
        var end = input.selectionEnd;
        input.value = value ?? "";
        if (end !== null) {
          input.selectionStart = start;
          input.selectionEnd = Math.min(end, input.value.length);
        }
      }
    });
    if (
      // If we are hydrating and the value has since changed,
      // then use the updated value from the input instead.
      hydrating && input.defaultValue !== input.value || // If defaultValue is set, then value == defaultValue
      // TODO Svelte 6: remove input.value check and set to empty string?
      untrack(get2) == null && input.value
    ) {
      set2(is_numberlike_input(input) ? to_number(input.value) : input.value);
    }
    render_effect(() => {
      if (DEV && input.type === "checkbox") {
        bind_invalid_checkbox_value();
      }
      var value = get2();
      if (is_numberlike_input(input) && value === to_number(input.value)) {
        return;
      }
      if (input.type === "date" && !value && !input.value) {
        return;
      }
      if (value !== input.value) {
        input.value = value ?? "";
      }
    });
  }
  const pending = /* @__PURE__ */ new Set();
  function bind_group(inputs, group_index, input, get2, set2 = get2) {
    var is_checkbox = input.getAttribute("type") === "checkbox";
    var binding_group = inputs;
    let hydration_mismatch2 = false;
    if (group_index !== null) {
      for (var index2 of group_index) {
        binding_group = binding_group[index2] ?? (binding_group[index2] = []);
      }
    }
    binding_group.push(input);
    listen_to_event_and_reset_event(
      input,
      "change",
      () => {
        var value = input.__value;
        if (is_checkbox) {
          value = get_binding_group_value(binding_group, value, input.checked);
        }
        set2(value);
      },
      // TODO better default value handling
      () => set2(is_checkbox ? [] : null)
    );
    render_effect(() => {
      var value = get2();
      if (hydrating && input.defaultChecked !== input.checked) {
        hydration_mismatch2 = true;
        return;
      }
      if (is_checkbox) {
        value = value || [];
        input.checked = value.includes(input.__value);
      } else {
        input.checked = is(input.__value, value);
      }
    });
    teardown(() => {
      var index3 = binding_group.indexOf(input);
      if (index3 !== -1) {
        binding_group.splice(index3, 1);
      }
    });
    if (!pending.has(binding_group)) {
      pending.add(binding_group);
      queue_micro_task(() => {
        binding_group.sort((a, b) => a.compareDocumentPosition(b) === 4 ? -1 : 1);
        pending.delete(binding_group);
      });
    }
    queue_micro_task(() => {
      if (hydration_mismatch2) {
        var value;
        if (is_checkbox) {
          value = get_binding_group_value(binding_group, value, input.checked);
        } else {
          var hydration_input = binding_group.find((input2) => input2.checked);
          value = hydration_input?.__value;
        }
        set2(value);
      }
    });
  }
  function bind_checked(input, get2, set2 = get2) {
    listen_to_event_and_reset_event(input, "change", (is_reset) => {
      var value = is_reset ? input.defaultChecked : input.checked;
      set2(value);
    });
    if (
      // If we are hydrating and the value has since changed,
      // then use the update value from the input instead.
      hydrating && input.defaultChecked !== input.checked || // If defaultChecked is set, then checked == defaultChecked
      untrack(get2) == null
    ) {
      set2(input.checked);
    }
    render_effect(() => {
      var value = get2();
      input.checked = Boolean(value);
    });
  }
  function get_binding_group_value(group, __value, checked) {
    var value = /* @__PURE__ */ new Set();
    for (var i = 0; i < group.length; i += 1) {
      if (group[i].checked) {
        value.add(group[i].__value);
      }
    }
    if (!checked) {
      value.delete(__value);
    }
    return Array.from(value);
  }
  function is_numberlike_input(input) {
    var type = input.type;
    return type === "number" || type === "range";
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  function bind_files(input, get2, set2 = get2) {
    listen_to_event_and_reset_event(input, "change", () => {
      set2(input.files);
    });
    if (
      // If we are hydrating and the value has since changed,
      // then use the updated value from the input instead.
      hydrating && input.files
    ) {
      set2(input.files);
    }
    render_effect(() => {
      input.files = get2();
    });
  }
  function time_ranges_to_array(ranges) {
    var array = [];
    for (var i = 0; i < ranges.length; i += 1) {
      array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
  }
  function bind_current_time(media, get2, set2 = get2) {
    var raf_id;
    var value;
    var callback = () => {
      cancelAnimationFrame(raf_id);
      if (!media.paused) {
        raf_id = requestAnimationFrame(callback);
      }
      var next_value = media.currentTime;
      if (value !== next_value) {
        set2(value = next_value);
      }
    };
    raf_id = requestAnimationFrame(callback);
    media.addEventListener("timeupdate", callback);
    render_effect(() => {
      var next_value = Number(get2());
      if (value !== next_value && !isNaN(
        /** @type {any} */
        next_value
      )) {
        media.currentTime = value = next_value;
      }
    });
    teardown(() => {
      cancelAnimationFrame(raf_id);
      media.removeEventListener("timeupdate", callback);
    });
  }
  function bind_buffered(media, set2) {
    var current;
    listen(media, ["loadedmetadata", "progress", "timeupdate", "seeking"], () => {
      var ranges = media.buffered;
      if (!current || current.length !== ranges.length || current.some((range, i) => ranges.start(i) !== range.start || ranges.end(i) !== range.end)) {
        current = time_ranges_to_array(ranges);
        set2(current);
      }
    });
  }
  function bind_seekable(media, set2) {
    listen(media, ["loadedmetadata"], () => set2(time_ranges_to_array(media.seekable)));
  }
  function bind_played(media, set2) {
    listen(media, ["timeupdate"], () => set2(time_ranges_to_array(media.played)));
  }
  function bind_seeking(media, set2) {
    listen(media, ["seeking", "seeked"], () => set2(media.seeking));
  }
  function bind_ended(media, set2) {
    listen(media, ["timeupdate", "ended"], () => set2(media.ended));
  }
  function bind_ready_state(media, set2) {
    listen(
      media,
      ["loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "emptied"],
      () => set2(media.readyState)
    );
  }
  function bind_playback_rate(media, get2, set2 = get2) {
    effect(() => {
      var value = Number(get2());
      if (value !== media.playbackRate && !isNaN(value)) {
        media.playbackRate = value;
      }
    });
    effect(() => {
      listen(media, ["ratechange"], () => {
        set2(media.playbackRate);
      });
    });
  }
  function bind_paused(media, get2, set2 = get2) {
    var paused = get2();
    var update2 = () => {
      if (paused !== media.paused) {
        set2(paused = media.paused);
      }
    };
    listen(media, ["play", "pause", "canplay"], update2, paused == null);
    effect(() => {
      if ((paused = !!get2()) !== media.paused) {
        if (paused) {
          media.pause();
        } else {
          media.play().catch(() => {
            set2(paused = true);
          });
        }
      }
    });
  }
  function bind_volume(media, get2, set2 = get2) {
    var callback = () => {
      set2(media.volume);
    };
    if (get2() == null) {
      callback();
    }
    listen(media, ["volumechange"], callback, false);
    render_effect(() => {
      var value = Number(get2());
      if (value !== media.volume && !isNaN(value)) {
        media.volume = value;
      }
    });
  }
  function bind_muted(media, get2, set2 = get2) {
    var callback = () => {
      set2(media.muted);
    };
    if (get2() == null) {
      callback();
    }
    listen(media, ["volumechange"], callback, false);
    render_effect(() => {
      var value = !!get2();
      if (media.muted !== value) media.muted = value;
    });
  }
  function bind_online(update2) {
    listen(window, ["online", "offline"], () => {
      update2(navigator.onLine);
    });
  }
  function bind_prop(props, prop2, value) {
    var desc = get_descriptor(props, prop2);
    if (desc && desc.set) {
      props[prop2] = value;
      teardown(() => {
        props[prop2] = null;
      });
    }
  }
  const _ResizeObserverSingleton = class _ResizeObserverSingleton {
    /** @param {ResizeObserverOptions} options */
    constructor(options) {
      __privateAdd(this, _ResizeObserverSingleton_instances);
      /** */
      __privateAdd(this, _listeners, /* @__PURE__ */ new WeakMap());
      /** @type {ResizeObserver | undefined} */
      __privateAdd(this, _observer);
      /** @type {ResizeObserverOptions} */
      __privateAdd(this, _options);
      __privateSet(this, _options, options);
    }
    /**
     * @param {Element} element
     * @param {(entry: ResizeObserverEntry) => any} listener
     */
    observe(element2, listener) {
      var listeners = __privateGet(this, _listeners).get(element2) || /* @__PURE__ */ new Set();
      listeners.add(listener);
      __privateGet(this, _listeners).set(element2, listeners);
      __privateMethod(this, _ResizeObserverSingleton_instances, getObserver_fn).call(this).observe(element2, __privateGet(this, _options));
      return () => {
        var listeners2 = __privateGet(this, _listeners).get(element2);
        listeners2.delete(listener);
        if (listeners2.size === 0) {
          __privateGet(this, _listeners).delete(element2);
          __privateGet(this, _observer).unobserve(element2);
        }
      };
    }
  };
  _listeners = new WeakMap();
  _observer = new WeakMap();
  _options = new WeakMap();
  _ResizeObserverSingleton_instances = new WeakSet();
  getObserver_fn = function() {
    return __privateGet(this, _observer) ?? __privateSet(this, _observer, new ResizeObserver(
      /** @param {any} entries */
      (entries) => {
        for (var entry of entries) {
          _ResizeObserverSingleton.entries.set(entry.target, entry);
          for (var listener of __privateGet(this, _listeners).get(entry.target) || []) {
            listener(entry);
          }
        }
      }
    ));
  };
  /** @static */
  __publicField(_ResizeObserverSingleton, "entries", /* @__PURE__ */ new WeakMap());
  let ResizeObserverSingleton = _ResizeObserverSingleton;
  var resize_observer_content_box = /* @__PURE__ */ new ResizeObserverSingleton({
    box: "content-box"
  });
  var resize_observer_border_box = /* @__PURE__ */ new ResizeObserverSingleton({
    box: "border-box"
  });
  var resize_observer_device_pixel_content_box = /* @__PURE__ */ new ResizeObserverSingleton({
    box: "device-pixel-content-box"
  });
  function bind_resize_observer(element2, type, set2) {
    var observer = type === "contentRect" || type === "contentBoxSize" ? resize_observer_content_box : type === "borderBoxSize" ? resize_observer_border_box : resize_observer_device_pixel_content_box;
    var unsub = observer.observe(
      element2,
      /** @param {any} entry */
      (entry) => set2(entry[type])
    );
    teardown(unsub);
  }
  function bind_element_size(element2, type, set2) {
    var unsub = resize_observer_border_box.observe(element2, () => set2(element2[type]));
    effect(() => {
      untrack(() => set2(element2[type]));
      return unsub;
    });
  }
  function is_bound_this(bound_value, element_or_component) {
    return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
  }
  function bind_this(element_or_component = {}, update2, get_value, get_parts) {
    effect(() => {
      var old_parts;
      var parts;
      render_effect(() => {
        old_parts = parts;
        parts = get_parts?.() || [];
        untrack(() => {
          if (element_or_component !== get_value(...parts)) {
            update2(element_or_component, ...parts);
            if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
              update2(null, ...old_parts);
            }
          }
        });
      });
      return () => {
        queue_micro_task(() => {
          if (parts && is_bound_this(get_value(...parts), element_or_component)) {
            update2(null, ...parts);
          }
        });
      };
    });
    return element_or_component;
  }
  function bind_content_editable(property, element2, get2, set2 = get2) {
    element2.addEventListener("input", () => {
      set2(element2[property]);
    });
    render_effect(() => {
      var value = get2();
      if (element2[property] !== value) {
        if (value == null) {
          var non_null_value = element2[property];
          set2(non_null_value);
        } else {
          element2[property] = value + "";
        }
      }
    });
  }
  function bind_property(property, event_name, element2, set2, get2) {
    var handler = () => {
      set2(element2[property]);
    };
    element2.addEventListener(event_name, handler);
    if (get2) {
      render_effect(() => {
        element2[property] = get2();
      });
    } else {
      handler();
    }
    if (element2 === document.body || element2 === window || element2 === document) {
      teardown(() => {
        element2.removeEventListener(event_name, handler);
      });
    }
  }
  function bind_focused(element2, set2) {
    listen(element2, ["focus", "blur"], () => {
      set2(element2 === document.activeElement);
    });
  }
  function bind_window_scroll(type, get2, set2 = get2) {
    var is_scrolling_x = type === "x";
    var target_handler = () => without_reactive_context(() => {
      scrolling = true;
      clearTimeout(timeout);
      timeout = setTimeout(clear, 100);
      set2(window[is_scrolling_x ? "scrollX" : "scrollY"]);
    });
    addEventListener("scroll", target_handler, {
      passive: true
    });
    var scrolling = false;
    var timeout;
    var clear = () => {
      scrolling = false;
    };
    var first = true;
    render_effect(() => {
      var latest_value = get2();
      if (first) {
        first = false;
      } else if (!scrolling && latest_value != null) {
        scrolling = true;
        clearTimeout(timeout);
        if (is_scrolling_x) {
          scrollTo(latest_value, window.scrollY);
        } else {
          scrollTo(window.scrollX, latest_value);
        }
        timeout = setTimeout(clear, 100);
      }
    });
    effect(target_handler);
    teardown(() => {
      removeEventListener("scroll", target_handler);
    });
  }
  function bind_window_size(type, set2) {
    listen(window, ["resize"], () => without_reactive_context(() => set2(window[type])));
  }
  function trusted(fn) {
    return function(...args) {
      var event2 = (
        /** @type {Event} */
        args[0]
      );
      if (event2.isTrusted) {
        fn?.apply(this, args);
      }
    };
  }
  function self(fn) {
    return function(...args) {
      var event2 = (
        /** @type {Event} */
        args[0]
      );
      if (event2.target === this) {
        fn?.apply(this, args);
      }
    };
  }
  function stopPropagation(fn) {
    return function(...args) {
      var event2 = (
        /** @type {Event} */
        args[0]
      );
      event2.stopPropagation();
      return fn?.apply(this, args);
    };
  }
  function once(fn) {
    var ran = false;
    return function(...args) {
      if (ran) return;
      ran = true;
      return fn?.apply(this, args);
    };
  }
  function stopImmediatePropagation(fn) {
    return function(...args) {
      var event2 = (
        /** @type {Event} */
        args[0]
      );
      event2.stopImmediatePropagation();
      return fn?.apply(this, args);
    };
  }
  function preventDefault(fn) {
    return function(...args) {
      var event2 = (
        /** @type {Event} */
        args[0]
      );
      event2.preventDefault();
      return fn?.apply(this, args);
    };
  }
  function passive(node, [event2, handler]) {
    user_pre_effect(() => {
      return on(node, event2, handler() ?? noop, {
        passive: true
      });
    });
  }
  function nonpassive(node, [event2, handler]) {
    user_pre_effect(() => {
      return on(node, event2, handler() ?? noop, {
        passive: false
      });
    });
  }
  function init(immutable = false) {
    const context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    const callbacks = context.l.u;
    if (!callbacks) return;
    let props = () => deep_read_state(context.s);
    if (immutable) {
      let version = 0;
      let prev = (
        /** @type {Record<string, any>} */
        {}
      );
      const d = /* @__PURE__ */ derived$1(() => {
        let changed = false;
        const props2 = context.s;
        for (const key in props2) {
          if (props2[key] !== prev[key]) {
            prev[key] = props2[key];
            changed = true;
          }
        }
        if (changed) version++;
        return version;
      });
      props = () => get$1(d);
    }
    if (callbacks.b.length) {
      user_pre_effect(() => {
        observe_all(context, props);
        run_all(callbacks.b);
      });
    }
    user_effect(() => {
      const fns = untrack(() => callbacks.m.map(run$1));
      return () => {
        for (const fn of fns) {
          if (typeof fn === "function") {
            fn();
          }
        }
      };
    });
    if (callbacks.a.length) {
      user_effect(() => {
        observe_all(context, props);
        run_all(callbacks.a);
      });
    }
  }
  function observe_all(context, props) {
    if (context.l.s) {
      for (const signal of context.l.s) get$1(signal);
    }
    props();
  }
  function reactive_import(fn) {
    var s = source(0);
    return function() {
      if (arguments.length === 1) {
        set(s, get$1(s) + 1);
        return arguments[0];
      } else {
        get$1(s);
        return fn();
      }
    };
  }
  function bubble_event($$props, event2) {
    var events = (
      /** @type {Record<string, Function[] | Function>} */
      $$props.$$events?.[event2.type]
    );
    var callbacks = is_array(events) ? events.slice() : events == null ? [] : [events];
    for (var fn of callbacks) {
      fn.call(this, event2);
    }
  }
  function add_legacy_event_listener($$props, event_name, event_callback) {
    var _a2;
    $$props.$$events || ($$props.$$events = {});
    (_a2 = $$props.$$events)[event_name] || (_a2[event_name] = []);
    $$props.$$events[event_name].push(event_callback);
  }
  function update_legacy_props($$new_props) {
    for (var key in $$new_props) {
      if (key in this) {
        this[key] = $$new_props[key];
      }
    }
  }
  function subscribe_to_store(store, run2, invalidate) {
    if (store == null) {
      run2(void 0);
      if (invalidate) invalidate(void 0);
      return noop;
    }
    const unsub = untrack(
      () => store.subscribe(
        run2,
        // @ts-expect-error
        invalidate
      )
    );
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  const subscriber_queue = [];
  function readable(value, start) {
    return {
      subscribe: writable(value, start).subscribe
    };
  }
  function writable(value, start = noop) {
    let stop = null;
    const subscribers = /* @__PURE__ */ new Set();
    function set2(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set2(fn(
        /** @type {T} */
        value
      ));
    }
    function subscribe(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set2, update2) || noop;
      }
      run2(
        /** @type {T} */
        value
      );
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0 && stop) {
          stop();
          stop = null;
        }
      };
    }
    return { set: set2, update: update2, subscribe };
  }
  function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single ? [stores] : stores;
    if (!stores_array.every(Boolean)) {
      throw new Error("derived() expects stores as input, got a falsy value");
    }
    const auto = fn.length < 2;
    return readable(initial_value, (set2, update2) => {
      let started = false;
      const values = [];
      let pending2 = 0;
      let cleanup = noop;
      const sync = () => {
        if (pending2) {
          return;
        }
        cleanup();
        const result = fn(single ? values[0] : values, set2, update2);
        if (auto) {
          set2(result);
        } else {
          cleanup = typeof result === "function" ? result : noop;
        }
      };
      const unsubscribers = stores_array.map(
        (store, i) => subscribe_to_store(
          store,
          (value) => {
            values[i] = value;
            pending2 &= ~(1 << i);
            if (started) {
              sync();
            }
          },
          () => {
            pending2 |= 1 << i;
          }
        )
      );
      started = true;
      sync();
      return function stop() {
        run_all(unsubscribers);
        cleanup();
        started = false;
      };
    });
  }
  function readonly(store) {
    return {
      // @ts-expect-error TODO i suspect the bind is unnecessary
      subscribe: store.subscribe.bind(store)
    };
  }
  function get(store) {
    let value;
    subscribe_to_store(store, (_) => value = _)();
    return value;
  }
  let is_store_binding = false;
  let IS_UNMOUNTED = Symbol();
  function store_get(store, store_name, stores) {
    const entry = stores[store_name] ?? (stores[store_name] = {
      store: null,
      source: /* @__PURE__ */ mutable_source(void 0),
      unsubscribe: noop
    });
    if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
      entry.unsubscribe();
      entry.store = store ?? null;
      if (store == null) {
        entry.source.v = void 0;
        entry.unsubscribe = noop;
      } else {
        var is_synchronous_callback = true;
        entry.unsubscribe = subscribe_to_store(store, (v) => {
          if (is_synchronous_callback) {
            entry.source.v = v;
          } else {
            set(entry.source, v);
          }
        });
        is_synchronous_callback = false;
      }
    }
    if (store && IS_UNMOUNTED in stores) {
      return get(store);
    }
    return get$1(entry.source);
  }
  function store_unsub(store, store_name, stores) {
    let entry = stores[store_name];
    if (entry && entry.store !== store) {
      entry.unsubscribe();
      entry.unsubscribe = noop;
    }
    return store;
  }
  function store_set(store, value) {
    store.set(value);
    return value;
  }
  function invalidate_store(stores, store_name) {
    var entry = stores[store_name];
    if (entry.store !== null) {
      store_set(entry.store, entry.source.v);
    }
  }
  function setup_stores() {
    const stores = {};
    function cleanup() {
      teardown(() => {
        for (var store_name in stores) {
          const ref = stores[store_name];
          ref.unsubscribe();
        }
        define_property(stores, IS_UNMOUNTED, {
          enumerable: false,
          value: true
        });
      });
    }
    return [stores, cleanup];
  }
  function store_mutate(store, expression, new_value) {
    store.set(new_value);
    return expression;
  }
  function update_store(store, store_value, d = 1) {
    store.set(store_value + d);
    return store_value;
  }
  function update_pre_store(store, store_value, d = 1) {
    const value = store_value + d;
    store.set(value);
    return value;
  }
  function mark_store_binding() {
    is_store_binding = true;
  }
  function capture_store_binding(fn) {
    var previous_is_store_binding = is_store_binding;
    try {
      is_store_binding = false;
      return [fn(), is_store_binding];
    } finally {
      is_store_binding = previous_is_store_binding;
    }
  }
  function update_prop(fn, d = 1) {
    const value = fn();
    fn(value + d);
    return value;
  }
  function update_pre_prop(fn, d = 1) {
    const value = fn() + d;
    fn(value);
    return value;
  }
  const rest_props_handler = {
    get(target, key) {
      if (target.exclude.includes(key)) return;
      return target.props[key];
    },
    set(target, key) {
      if (DEV) {
        props_rest_readonly(`${target.name}.${String(key)}`);
      }
      return false;
    },
    getOwnPropertyDescriptor(target, key) {
      if (target.exclude.includes(key)) return;
      if (key in target.props) {
        return {
          enumerable: true,
          configurable: true,
          value: target.props[key]
        };
      }
    },
    has(target, key) {
      if (target.exclude.includes(key)) return false;
      return key in target.props;
    },
    ownKeys(target) {
      return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
    }
  };
  // @__NO_SIDE_EFFECTS__
  function rest_props(props, exclude, name) {
    return new Proxy(
      DEV ? { props, exclude, name, other: {}, to_proxy: [] } : { props, exclude },
      rest_props_handler
    );
  }
  const legacy_rest_props_handler = {
    get(target, key) {
      if (target.exclude.includes(key)) return;
      get$1(target.version);
      return key in target.special ? target.special[key]() : target.props[key];
    },
    set(target, key, value) {
      if (!(key in target.special)) {
        var previous_effect = active_effect;
        try {
          set_active_effect(target.parent_effect);
          target.special[key] = prop(
            {
              get [key]() {
                return target.props[key];
              }
            },
            /** @type {string} */
            key,
            PROPS_IS_UPDATED
          );
        } finally {
          set_active_effect(previous_effect);
        }
      }
      target.special[key](value);
      update(target.version);
      return true;
    },
    getOwnPropertyDescriptor(target, key) {
      if (target.exclude.includes(key)) return;
      if (key in target.props) {
        return {
          enumerable: true,
          configurable: true,
          value: target.props[key]
        };
      }
    },
    deleteProperty(target, key) {
      if (target.exclude.includes(key)) return true;
      target.exclude.push(key);
      update(target.version);
      return true;
    },
    has(target, key) {
      if (target.exclude.includes(key)) return false;
      return key in target.props;
    },
    ownKeys(target) {
      return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
    }
  };
  function legacy_rest_props(props, exclude) {
    return new Proxy(
      {
        props,
        exclude,
        special: {},
        version: source(0),
        // TODO this is only necessary because we need to track component
        // destruction inside `prop`, because of `bind:this`, but it
        // seems likely that we can simplify `bind:this` instead
        parent_effect: (
          /** @type {Effect} */
          active_effect
        )
      },
      legacy_rest_props_handler
    );
  }
  const spread_props_handler = {
    get(target, key) {
      let i = target.props.length;
      while (i--) {
        let p = target.props[i];
        if (is_function(p)) p = p();
        if (typeof p === "object" && p !== null && key in p) return p[key];
      }
    },
    set(target, key, value) {
      let i = target.props.length;
      while (i--) {
        let p = target.props[i];
        if (is_function(p)) p = p();
        const desc = get_descriptor(p, key);
        if (desc && desc.set) {
          desc.set(value);
          return true;
        }
      }
      return false;
    },
    getOwnPropertyDescriptor(target, key) {
      let i = target.props.length;
      while (i--) {
        let p = target.props[i];
        if (is_function(p)) p = p();
        if (typeof p === "object" && p !== null && key in p) {
          const descriptor = get_descriptor(p, key);
          if (descriptor && !descriptor.configurable) {
            descriptor.configurable = true;
          }
          return descriptor;
        }
      }
    },
    has(target, key) {
      if (key === STATE_SYMBOL || key === LEGACY_PROPS) return false;
      for (let p of target.props) {
        if (is_function(p)) p = p();
        if (p != null && key in p) return true;
      }
      return false;
    },
    ownKeys(target) {
      const keys = [];
      for (let p of target.props) {
        if (is_function(p)) p = p();
        if (!p) continue;
        for (const key in p) {
          if (!keys.includes(key)) keys.push(key);
        }
        for (const key of Object.getOwnPropertySymbols(p)) {
          if (!keys.includes(key)) keys.push(key);
        }
      }
      return keys;
    }
  };
  function spread_props(...props) {
    return new Proxy({ props }, spread_props_handler);
  }
  function prop(props, key, flags2, fallback2) {
    var runes = !legacy_mode_flag || (flags2 & PROPS_IS_RUNES) !== 0;
    var bindable = (flags2 & PROPS_IS_BINDABLE) !== 0;
    var lazy = (flags2 & PROPS_IS_LAZY_INITIAL) !== 0;
    var fallback_value = (
      /** @type {V} */
      fallback2
    );
    var fallback_dirty = true;
    var get_fallback = () => {
      if (fallback_dirty) {
        fallback_dirty = false;
        fallback_value = lazy ? untrack(
          /** @type {() => V} */
          fallback2
        ) : (
          /** @type {V} */
          fallback2
        );
      }
      return fallback_value;
    };
    var setter;
    if (bindable) {
      var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
      setter = get_descriptor(props, key)?.set ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
    }
    var initial_value;
    var is_store_sub = false;
    if (bindable) {
      [initial_value, is_store_sub] = capture_store_binding(() => (
        /** @type {V} */
        props[key]
      ));
    } else {
      initial_value = /** @type {V} */
      props[key];
    }
    if (initial_value === void 0 && fallback2 !== void 0) {
      initial_value = get_fallback();
      if (setter) {
        if (runes) props_invalid_value(key);
        setter(initial_value);
      }
    }
    var getter;
    if (runes) {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value === void 0) return get_fallback();
        fallback_dirty = true;
        return value;
      };
    } else {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value !== void 0) {
          fallback_value = /** @type {V} */
          void 0;
        }
        return value === void 0 ? fallback_value : value;
      };
    }
    if (runes && (flags2 & PROPS_IS_UPDATED) === 0) {
      return getter;
    }
    if (setter) {
      var legacy_parent = props.$$legacy;
      return function(value, mutation) {
        if (arguments.length > 0) {
          if (!runes || !mutation || legacy_parent || is_store_sub) {
            setter(mutation ? getter() : value);
          }
          return value;
        }
        return getter();
      };
    }
    var overridden = false;
    var d = ((flags2 & PROPS_IS_IMMUTABLE) !== 0 ? derived$1 : derived_safe_equal)(() => {
      overridden = false;
      return getter();
    });
    if (bindable) get$1(d);
    var parent_effect = (
      /** @type {Effect} */
      active_effect
    );
    return function(value, mutation) {
      if (arguments.length > 0) {
        const new_value = mutation ? get$1(d) : runes && bindable ? proxy(value) : value;
        set(d, new_value);
        overridden = true;
        if (fallback_value !== void 0) {
          fallback_value = new_value;
        }
        return value;
      }
      if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
        return d.v;
      }
      return get$1(d);
    };
  }
  var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED | BOUNDARY_EFFECT;
  function boundary(node, props, children) {
    new Boundary(node, props, children);
  }
  class Boundary {
    /**
     * @param {TemplateNode} node
     * @param {BoundaryProps} props
     * @param {((anchor: Node) => void)} children
     */
    constructor(node, props, children) {
      __privateAdd(this, _Boundary_instances);
      /** @type {TemplateNode} */
      __privateAdd(this, _anchor);
      /** @type {TemplateNode} */
      __privateAdd(this, _hydrate_open);
      /** @type {BoundaryProps} */
      __privateAdd(this, _props);
      /** @type {((anchor: Node) => void)} */
      __privateAdd(this, _children);
      /** @type {Effect} */
      __privateAdd(this, _effect);
      /** @type {Effect | null} */
      __privateAdd(this, _main_effect, null);
      /** @type {Effect | null} */
      __privateAdd(this, _failed_effect, null);
      __privateAdd(this, _is_creating_fallback, false);
      __privateSet(this, _anchor, node);
      __privateSet(this, _props, props);
      __privateSet(this, _children, children);
      __privateSet(this, _hydrate_open, hydrate_node);
      __privateSet(this, _effect, block(() => {
        active_effect.b = this;
        if (hydrating) {
          hydrate_next();
        }
        try {
          __privateSet(this, _main_effect, branch(() => children(__privateGet(this, _anchor))));
        } catch (error) {
          this.error(error);
        }
      }, flags));
      if (hydrating) {
        __privateSet(this, _anchor, hydrate_node);
      }
    }
    /** @param {unknown} error */
    error(error) {
      var onerror = __privateGet(this, _props).onerror;
      let failed = __privateGet(this, _props).failed;
      const reset2 = () => {
        if (__privateGet(this, _failed_effect) !== null) {
          pause_effect(__privateGet(this, _failed_effect), () => {
            __privateSet(this, _failed_effect, null);
          });
        }
        __privateSet(this, _main_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
          __privateSet(this, _is_creating_fallback, false);
          return branch(() => __privateGet(this, _children).call(this, __privateGet(this, _anchor)));
        }));
      };
      if (__privateGet(this, _is_creating_fallback) || !onerror && !failed) {
        throw error;
      }
      var previous_reaction = active_reaction;
      try {
        set_active_reaction(null);
        onerror?.(error, reset2);
      } finally {
        set_active_reaction(previous_reaction);
      }
      if (__privateGet(this, _main_effect)) {
        destroy_effect(__privateGet(this, _main_effect));
        __privateSet(this, _main_effect, null);
      }
      if (__privateGet(this, _failed_effect)) {
        destroy_effect(__privateGet(this, _failed_effect));
        __privateSet(this, _failed_effect, null);
      }
      if (hydrating) {
        set_hydrate_node(__privateGet(this, _hydrate_open));
        next();
        set_hydrate_node(remove_nodes());
      }
      if (failed) {
        queue_micro_task(() => {
          __privateSet(this, _failed_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
            __privateSet(this, _is_creating_fallback, true);
            try {
              return branch(() => {
                failed(
                  __privateGet(this, _anchor),
                  () => error,
                  () => reset2
                );
              });
            } catch (error2) {
              invoke_error_boundary(
                error2,
                /** @type {Effect} */
                __privateGet(this, _effect).parent
              );
              return null;
            } finally {
              __privateSet(this, _is_creating_fallback, false);
            }
          }));
        });
      }
    }
  }
  _anchor = new WeakMap();
  _hydrate_open = new WeakMap();
  _props = new WeakMap();
  _children = new WeakMap();
  _effect = new WeakMap();
  _main_effect = new WeakMap();
  _failed_effect = new WeakMap();
  _is_creating_fallback = new WeakMap();
  _Boundary_instances = new WeakSet();
  /**
   * @param {() => Effect | null} fn
   */
  run_fn = function(fn) {
    var previous_effect = active_effect;
    var previous_reaction = active_reaction;
    var previous_ctx = component_context;
    set_active_effect(__privateGet(this, _effect));
    set_active_reaction(__privateGet(this, _effect));
    set_component_context(__privateGet(this, _effect).ctx);
    try {
      return fn();
    } finally {
      set_active_effect(previous_effect);
      set_active_reaction(previous_reaction);
      set_component_context(previous_ctx);
    }
  };
  function validate_each_keys(collection, key_fn) {
    render_effect(() => {
      const keys = /* @__PURE__ */ new Map();
      const maybe_array = collection();
      const array = is_array(maybe_array) ? maybe_array : maybe_array == null ? [] : Array.from(maybe_array);
      const length = array.length;
      for (let i = 0; i < length; i++) {
        const key = key_fn(array[i], i);
        if (keys.has(key)) {
          const a = String(keys.get(key));
          const b = String(i);
          let k = String(key);
          if (k.startsWith("[object ")) k = null;
          each_key_duplicate(a, b, k);
        }
        keys.set(key, i);
      }
    });
  }
  function validate_binding(binding, get_object, get_property, line, column) {
    var warned = false;
    var filename = dev_current_component_function?.[FILENAME];
    render_effect(() => {
      if (warned) return;
      var [object, is_store_sub] = capture_store_binding(get_object);
      if (is_store_sub) return;
      var property = get_property();
      var ran = false;
      var effect2 = render_effect(() => {
        if (ran) return;
        object[property];
      });
      ran = true;
      if (effect2.deps === null) {
        var location = `${filename}:${line}:${column}`;
        binding_property_non_reactive(binding, location);
        warned = true;
      }
    });
  }
  function createClassComponent(options) {
    return new Svelte4Component(options);
  }
  function asClassComponent(component2) {
    return class extends Svelte4Component {
      /** @param {any} options */
      constructor(options) {
        super({
          component: component2,
          ...options
        });
      }
    };
  }
  class Svelte4Component {
    /**
     * @param {ComponentConstructorOptions & {
     *  component: any;
     * }} options
     */
    constructor(options) {
      /** @type {any} */
      __privateAdd(this, _events);
      /** @type {Record<string, any>} */
      __privateAdd(this, _instance);
      var sources = /* @__PURE__ */ new Map();
      var add_source = (key, value) => {
        var s = /* @__PURE__ */ mutable_source(value, false, false);
        sources.set(key, s);
        return s;
      };
      const props = new Proxy(
        { ...options.props || {}, $$events: {} },
        {
          get(target, prop2) {
            return get$1(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          },
          has(target, prop2) {
            if (prop2 === LEGACY_PROPS) return true;
            get$1(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
            return Reflect.has(target, prop2);
          },
          set(target, prop2, value) {
            set(sources.get(prop2) ?? add_source(prop2, value), value);
            return Reflect.set(target, prop2, value);
          }
        }
      );
      __privateSet(this, _instance, (options.hydrate ? hydrate : mount)(options.component, {
        target: options.target,
        anchor: options.anchor,
        props,
        context: options.context,
        intro: options.intro ?? false,
        recover: options.recover
      }));
      if (!options?.props?.$$host || options.sync === false) {
        flushSync();
      }
      __privateSet(this, _events, props.$$events);
      for (const key of Object.keys(__privateGet(this, _instance))) {
        if (key === "$set" || key === "$destroy" || key === "$on") continue;
        define_property(this, key, {
          get() {
            return __privateGet(this, _instance)[key];
          },
          /** @param {any} value */
          set(value) {
            __privateGet(this, _instance)[key] = value;
          },
          enumerable: true
        });
      }
      __privateGet(this, _instance).$set = /** @param {Record<string, any>} next */
      (next2) => {
        Object.assign(props, next2);
      };
      __privateGet(this, _instance).$destroy = () => {
        unmount(__privateGet(this, _instance));
      };
    }
    /** @param {Record<string, any>} props */
    $set(props) {
      __privateGet(this, _instance).$set(props);
    }
    /**
     * @param {string} event
     * @param {(...args: any[]) => any} callback
     * @returns {any}
     */
    $on(event2, callback) {
      __privateGet(this, _events)[event2] = __privateGet(this, _events)[event2] || [];
      const cb = (...args) => callback.call(this, ...args);
      __privateGet(this, _events)[event2].push(cb);
      return () => {
        __privateGet(this, _events)[event2] = __privateGet(this, _events)[event2].filter(
          /** @param {any} fn */
          (fn) => fn !== cb
        );
      };
    }
    $destroy() {
      __privateGet(this, _instance).$destroy();
    }
  }
  _events = new WeakMap();
  _instance = new WeakMap();
  function run(fn) {
    user_pre_effect(() => {
      fn();
      var effect2 = (
        /** @type {import('#client').Effect} */
        active_effect
      );
      if ((effect2.f & DIRTY) !== 0) {
        let filename = "a file (we can't know which one)";
        if (DEV) {
          filename = dev_current_component_function?.[FILENAME] ?? filename;
        }
        legacy_recursive_reactive_block(filename);
        set_signal_status(effect2, MAYBE_DIRTY);
      }
    });
  }
  function handlers(...handlers2) {
    return function(event2) {
      const { stopImmediatePropagation: stopImmediatePropagation2 } = event2;
      let stopped = false;
      event2.stopImmediatePropagation = () => {
        stopped = true;
        stopImmediatePropagation2.call(event2);
      };
      const errors = [];
      for (const handler of handlers2) {
        try {
          handler?.call(this, event2);
        } catch (e) {
          errors.push(e);
        }
        if (stopped) {
          break;
        }
      }
      for (let error of errors) {
        queueMicrotask(() => {
          throw error;
        });
      }
    };
  }
  function createBubbler() {
    const active_component_context = component_context;
    if (active_component_context === null) {
      lifecycle_outside_component("createBubbler");
    }
    return (type) => (event2) => {
      const events = (
        /** @type {Record<string, Function | Function[]>} */
        active_component_context.s.$$events?.[
          /** @type {any} */
          type
        ]
      );
      if (events) {
        const callbacks = is_array(events) ? events.slice() : [events];
        for (const fn of callbacks) {
          fn.call(active_component_context.x, event2);
        }
        return !event2.defaultPrevented;
      }
      return true;
    };
  }
  let SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /**
       * @param {*} $$componentCtor
       * @param {*} $$slots
       * @param {*} use_shadow_dom
       */
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        /** The Svelte component constructor */
        __publicField(this, "$$ctor");
        /** Slots */
        __publicField(this, "$$s");
        /** @type {any} The Svelte component instance */
        __publicField(this, "$$c");
        /** Whether or not the custom element is connected */
        __publicField(this, "$$cn", false);
        /** @type {Record<string, any>} Component props data */
        __publicField(this, "$$d", {});
        /** `true` if currently in the process of reflecting component props back to attributes */
        __publicField(this, "$$r", false);
        /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
        __publicField(this, "$$p_d", {});
        /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
        __publicField(this, "$$l", {});
        /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
        __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
        /** @type {any} The managed render effect for reflecting attributes */
        __publicField(this, "$$me");
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      /**
       * @param {string} type
       * @param {EventListenerOrEventListenerObject} listener
       * @param {boolean | AddEventListenerOptions} [options]
       */
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      /**
       * @param {string} type
       * @param {EventListenerOrEventListenerObject} listener
       * @param {boolean | AddEventListenerOptions} [options]
       */
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot = function(name) {
            return (anchor) => {
              const slot2 = document.createElement("slot");
              if (name !== "default") slot2.name = name;
              append(anchor, slot2);
            };
          };
          await Promise.resolve();
          if (!this.$$cn || this.$$c) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              if (name === "default" && !this.$$d.children) {
                this.$$d.children = create_slot(name);
                $$slots.default = true;
              } else {
                $$slots[name] = create_slot(name);
              }
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          for (const key in this.$$p_d) {
            if (!(key in this.$$d) && this[key] !== void 0) {
              this.$$d[key] = this[key];
              delete this[key];
            }
          }
          this.$$c = createClassComponent({
            component: this.$$ctor,
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$host: this
            }
          });
          this.$$me = effect_root(() => {
            render_effect(() => {
              this.$$r = true;
              for (const key of object_keys(this.$$c)) {
                if (!this.$$p_d[key]?.reflect) continue;
                this.$$d[key] = this.$$c[key];
                const attribute_value = get_custom_element_value(
                  key,
                  this.$$d[key],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(this.$$p_d[key].attribute || key);
                } else {
                  this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                }
              }
              this.$$r = false;
            });
          });
          for (const type in this.$$l) {
            for (const listener of this.$$l[type]) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      /**
       * @param {string} attr
       * @param {string} _oldValue
       * @param {string} newValue
       */
      attributeChangedCallback(attr2, _oldValue, newValue) {
        if (this.$$r) return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn && this.$$c) {
            this.$$c.$destroy();
            this.$$me();
            this.$$c = void 0;
          }
        });
      }
      /**
       * @param {string} attribute_name
       */
      $$g_p(attribute_name) {
        return object_keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop2, value, props_definition, transform) {
    const type = props_definition[prop2]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop2]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        // conversion already handled above
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach((node) => {
      result[
        /** @type {Element} node */
        node.slot || "default"
      ] = true;
    });
    return result;
  }
  function create_custom_element(Component, props_definition, slots, exports, use_shadow_dom, extend) {
    let Class = class extends SvelteElement {
      constructor() {
        super(Component, slots, use_shadow_dom);
        this.$$p_d = props_definition;
      }
      static get observedAttributes() {
        return object_keys(props_definition).map(
          (key) => (props_definition[key].attribute || key).toLowerCase()
        );
      }
    };
    object_keys(props_definition).forEach((prop2) => {
      define_property(Class.prototype, prop2, {
        get() {
          return this.$$c && prop2 in this.$$c ? this.$$c[prop2] : this.$$d[prop2];
        },
        set(value) {
          value = get_custom_element_value(prop2, value, props_definition);
          this.$$d[prop2] = value;
          var component2 = this.$$c;
          if (component2) {
            var setter = get_descriptor(component2, prop2)?.get;
            if (setter) {
              component2[prop2] = value;
            } else {
              component2.$set({ [prop2]: value });
            }
          }
        }
      });
    });
    exports.forEach((property) => {
      define_property(Class.prototype, property, {
        get() {
          return this.$$c?.[property];
        }
      });
    });
    if (extend) {
      Class = extend(Class);
    }
    Component.element = /** @type {any} */
    Class;
    return Class;
  }
  function log_if_contains_state(method, ...objects) {
    untrack(() => {
      try {
        let has_state = false;
        const transformed = [];
        for (const obj of objects) {
          if (obj && typeof obj === "object" && STATE_SYMBOL in obj) {
            transformed.push(snapshot(obj, true));
            has_state = true;
          } else {
            transformed.push(obj);
          }
        }
        if (has_state) {
          console_log_state(method);
          console.log("%c[snapshot]", "color: grey", ...transformed);
        }
      } catch {
      }
    });
    return objects;
  }
  if (DEV) {
    let throw_rune_error = function(rune) {
      if (!(rune in globalThis)) {
        let value;
        Object.defineProperty(globalThis, rune, {
          configurable: true,
          // eslint-disable-next-line getter-return
          get: () => {
            if (value !== void 0) {
              return value;
            }
            rune_outside_svelte(rune);
          },
          set: (v) => {
            value = v;
          }
        });
      }
    };
    throw_rune_error("$state");
    throw_rune_error("$effect");
    throw_rune_error("$derived");
    throw_rune_error("$inspect");
    throw_rune_error("$props");
    throw_rune_error("$bindable");
  }
  function getAbortSignal() {
    if (active_reaction === null) {
      get_abort_signal_outside_reaction();
    }
    return (active_reaction.ac ?? (active_reaction.ac = new AbortController())).signal;
  }
  function onMount(fn) {
    if (component_context === null) {
      lifecycle_outside_component("onMount");
    }
    if (legacy_mode_flag && component_context.l !== null) {
      init_update_callbacks(component_context).m.push(fn);
    } else {
      user_effect(() => {
        const cleanup = untrack(fn);
        if (typeof cleanup === "function") return (
          /** @type {() => void} */
          cleanup
        );
      });
    }
  }
  function onDestroy(fn) {
    if (component_context === null) {
      lifecycle_outside_component("onDestroy");
    }
    onMount(() => () => untrack(fn));
  }
  function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    return new CustomEvent(type, { detail, bubbles, cancelable });
  }
  function createEventDispatcher() {
    const active_component_context = component_context;
    if (active_component_context === null) {
      lifecycle_outside_component("createEventDispatcher");
    }
    return (type, detail, options) => {
      const events = (
        /** @type {Record<string, Function | Function[]>} */
        active_component_context.s.$$events?.[
          /** @type {any} */
          type
        ]
      );
      if (events) {
        const callbacks = is_array(events) ? events.slice() : [events];
        const event2 = create_custom_event(
          /** @type {string} */
          type,
          detail,
          options
        );
        for (const fn of callbacks) {
          fn.call(active_component_context.x, event2);
        }
        return !event2.defaultPrevented;
      }
      return true;
    };
  }
  function beforeUpdate(fn) {
    if (component_context === null) {
      lifecycle_outside_component("beforeUpdate");
    }
    if (component_context.l === null) {
      lifecycle_legacy_only("beforeUpdate");
    }
    init_update_callbacks(component_context).b.push(fn);
  }
  function afterUpdate(fn) {
    if (component_context === null) {
      lifecycle_outside_component("afterUpdate");
    }
    if (component_context.l === null) {
      lifecycle_legacy_only("afterUpdate");
    }
    init_update_callbacks(component_context).a.push(fn);
  }
  function init_update_callbacks(context) {
    var l = (
      /** @type {ComponentContextLegacy} */
      context.l
    );
    return l.u ?? (l.u = { a: [], b: [], m: [] });
  }
  const VERSION = "5.35.6";
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined") {
    ((_a = window.__svelte ?? (window.__svelte = {})).v ?? (_a.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
  }
  var root$4 = /* @__PURE__ */ from_html(`<div class="relationship-graph-view svelte-qaxdvx"><div class="graph-container svelte-qaxdvx"><div>Platzhalter für Graph</div></div> <div class="info-container svelte-qaxdvx"><div>Platzhalter für Info-Panel</div></div></div>`);
  function RelationshipGraphView($$anchor, $$props) {
    push($$props, true);
    if ($$props.logger) {
      $$props.logger.debug("RelationshipGraphView", $$props.elements);
      $$props.logger.debug("RelationshipGraphView", $$props.interactive);
      $$props.logger.debug("RelationshipGraphView", $$props.onNodeClick);
      $$props.logger.debug("RelationshipGraphView", $$props.onEdgeClick);
    }
    var div = root$4();
    append($$anchor, div);
    pop();
  }
  var root$3 = /* @__PURE__ */ from_html(`<div class="relationship-graph-view svelte-i1dhkx"><div class="graph-container"><div>Platzhalter für Graph</div></div> <div class="info-container"><div>Platzhalter für Info-Panel</div></div></div>`);
  function RelationshipGraphEdit($$anchor, $$props) {
    push($$props, true);
    if ($$props.logger) {
      $$props.logger.debug("RelationshipGraphEdit", $$props.elements);
      $$props.logger.debug("RelationshipGraphEdit", $$props.interactive);
      $$props.logger.debug("RelationshipGraphEdit", $$props.onNodeClick);
      $$props.logger.debug("RelationshipGraphEdit", $$props.onEdgeClick);
    }
    var div = root$3();
    append($$anchor, div);
    pop();
  }
  const _SvelteManager = class _SvelteManager {
    // ✅ Dependencies explizit definiert - FoundryLogger bereits an erster Stelle
    constructor(logger2) {
      this.logger = logger2;
    }
    /**
     * Mountet eine Svelte-Komponente
     */
    async mountComponent(component2, target, props) {
      this.writeLog("info", `[SvelteManager] Mounting component: ${component2.name}`);
      const propsWithLogger = {
        ...props,
        logger: this.logger
      };
      const app = mount(component2, {
        target,
        props: propsWithLogger
      });
      this.writeLog("info", "[SvelteManager] Component mounted successfully");
      return app;
    }
    /**
     * Unmountet eine Svelte-App
     */
    async unmountApp(app) {
      if (app) {
        this.writeLog("info", "[SvelteManager] Unmounting app");
        await unmount(app);
        this.writeLog("info", "[SvelteManager] App unmounted successfully");
      }
    }
    /**
     * Mountet eine Graph-Komponente mit spezifischer Logik
     */
    async mountGraphComponent(element2, document2, isEditMode) {
      this.writeLog("info", `[SvelteManager] Mounting graph component, edit mode: ${isEditMode}`);
      const target = element2.querySelector("#relationship-graph-svelte");
      if (!target) {
        throw new Error("Svelte mount point '#relationship-graph-svelte' not found");
      }
      const system = document2.system;
      const elements = system?.elements || { nodes: [], edges: [] };
      this.writeLog("info", `[SvelteManager] Graph elements: ${JSON.stringify(elements)}`);
      const component2 = isEditMode ? RelationshipGraphEdit : RelationshipGraphView;
      await this.mountComponent(component2, target, {
        elements,
        interactive: isEditMode,
        onNodeClick: () => {
        },
        onEdgeClick: () => {
        }
      });
    }
    writeLog(modus, message, ...args) {
      if (this.logger) {
        this.logger[modus](message, ...args);
      } else {
        console[modus](message, ...args);
      }
    }
  };
  _SvelteManager.API_NAME = "svelteManager";
  _SvelteManager.SERVICE_TYPE = "scoped";
  _SvelteManager.CLASS_NAME = "SvelteManager";
  _SvelteManager.DEPENDENCIES = [FoundryLogger];
  let SvelteManager = _SvelteManager;
  const _CSSManager = class _CSSManager {
    // Referenzzählung pro CSS-Pfad
    constructor(logger2) {
      this.logger = logger2;
      this.loadedCSS = /* @__PURE__ */ new Set();
      this.cssReferenceCount = /* @__PURE__ */ new Map();
      let debugEnabled = false;
      try {
        debugEnabled = game?.settings?.get("relationship-app", "debugLogs") === true;
      } catch (error) {
        debugEnabled = false;
      }
      if (debugEnabled) {
        this.testLoggerInjection();
      }
    }
    /**
     * Testet ob der FoundryLogger korrekt injiziert wurde und funktioniert
     */
    testLoggerInjection() {
      this.writeLog("debug", `[CSSManager] 🔍 Testing FoundryLogger injection...`);
      if (this.logger) {
        this.writeLog("debug", `[CSSManager] ✅ FoundryLogger injected successfully`);
        const hasInfo = typeof this.logger.info === "function";
        const hasError = typeof this.logger.error === "function";
        const hasWarn = typeof this.logger.warn === "function";
        this.writeLog("debug", `[CSSManager] 🔍 Logger methods check:`, {
          hasInfo,
          hasError,
          hasWarn,
          loggerType: this.logger.constructor.name
        });
        if (hasInfo && hasError && hasWarn) {
          this.writeLog("debug", `[CSSManager] ✅ FoundryLogger methods available`);
          try {
            this.logger.info(`[CSSManager] 🎯 FoundryLogger test successful - injection working!`);
            this.writeLog("debug", `[CSSManager] ✅ FoundryLogger functional test passed`);
          } catch (error) {
            this.writeLog("error", `[CSSManager] ❌ FoundryLogger functional test failed:`, error);
          }
        } else {
          this.writeLog("error", `[CSSManager] ❌ FoundryLogger missing required methods`);
        }
      } else {
        this.writeLog(
          "error",
          `[CSSManager] ❌ FoundryLogger injection failed - logger is undefined`
        );
      }
    }
    /**
     * Lädt eine CSS-Datei, falls sie noch nicht geladen wurde
     */
    async loadCSS(cssPath) {
      const currentCount = this.cssReferenceCount.get(cssPath) || 0;
      this.cssReferenceCount.set(cssPath, currentCount + 1);
      if (this.isCSSLoaded(cssPath)) {
        if (this.logger) {
          this.logger.info(`[CSSManager] CSS already loaded: ${cssPath} (refs: ${currentCount + 1})`);
        } else {
          this.writeLog("debug", `[CSSManager] CSS already loaded: ${cssPath} (refs: ${currentCount + 1})`);
        }
        return;
      }
      try {
        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = cssPath;
        link2.id = `css-${cssPath.replace(/[^a-zA-Z0-9]/g, "-")}`;
        document.head.appendChild(link2);
        this.loadedCSS.add(cssPath);
        if (this.logger) {
          this.logger.info(`[CSSManager] CSS loaded successfully: ${cssPath} (refs: ${currentCount + 1})`);
        } else {
          this.writeLog("info", `[CSSManager] CSS loaded successfully: ${cssPath} (refs: ${currentCount + 1})`);
        }
      } catch (error) {
        this.cssReferenceCount.set(cssPath, currentCount);
        if (this.logger) {
          this.logger.error(`[CSSManager] Failed to load CSS: ${cssPath}`, error);
        } else {
          this.writeLog("error", `[CSSManager] Failed to load CSS: ${cssPath}`, error);
        }
        throw error;
      }
    }
    /**
     * Entfernt eine CSS-Datei aus dem DOM
     */
    async unloadCSS(cssPath) {
      const currentCount = this.cssReferenceCount.get(cssPath) || 0;
      const newCount = Math.max(0, currentCount - 1);
      if (newCount === 0) {
        const linkId = `css-${cssPath.replace(/[^a-zA-Z0-9]/g, "-")}`;
        const link2 = document.getElementById(linkId);
        if (link2) {
          link2.remove();
          this.loadedCSS.delete(cssPath);
          this.cssReferenceCount.delete(cssPath);
          if (this.logger) {
            this.logger.info(`[CSSManager] CSS unloaded: ${cssPath}`);
          } else {
            this.writeLog("info", `[CSSManager] CSS unloaded: ${cssPath}`);
          }
        }
      } else {
        this.cssReferenceCount.set(cssPath, newCount);
        if (this.logger) {
          this.logger.info(`[CSSManager] CSS reference count decreased: ${cssPath} (refs: ${newCount})`);
        } else {
          this.writeLog("info", `[CSSManager] CSS reference count decreased: ${cssPath} (refs: ${newCount})`);
        }
      }
    }
    /**
     * Prüft ob eine CSS-Datei bereits geladen ist
     */
    isCSSLoaded(cssPath) {
      return this.loadedCSS.has(cssPath) || document.querySelector(`link[href*="${cssPath}"]`) !== null;
    }
    /**
     * Lädt alle CSS-Dateien für eine Application
     */
    async loadMultipleCSS(cssPaths) {
      const loadPromises = cssPaths.map((cssPath) => this.loadCSS(cssPath));
      await Promise.all(loadPromises);
      if (this.logger) {
        this.logger.info(`[CSSManager] Loaded ${cssPaths.length} CSS files`);
      } else {
        this.writeLog("info", `[CSSManager] Loaded ${cssPaths.length} CSS files`);
      }
    }
    writeLog(modus, message, ...args) {
      if (this.logger) {
        this.logger[modus](message, ...args);
      } else {
        console[modus](message, ...args);
      }
    }
  };
  _CSSManager.API_NAME = "cssManager";
  _CSSManager.SERVICE_TYPE = "scoped";
  _CSSManager.CLASS_NAME = "CSSManager";
  _CSSManager.DEPENDENCIES = [FoundryLogger];
  let CSSManager = _CSSManager;
  const _GraphService = class _GraphService {
    constructor(page, foundryAdapter2) {
      this._initialized = false;
      this._page = page;
      this._foundryAdapter = foundryAdapter2;
      this._snapshot = null;
      this._instanceId = foundry.utils.randomID();
    }
    // -- Public ----------------------------------------------------------------
    async init(page) {
      this._page = page;
      if (!this._foundryAdapter) {
        const api = globalThis.game?.modules?.get("relationship-app")?.api;
        this._foundryAdapter = api?.foundryAdapter;
      }
      this._snapshot = foundry.utils.deepClone(this._loadFromSystem());
      this._initialized = true;
    }
    get instanceId() {
      return this._instanceId;
    }
    getSnapshot() {
      if (!this._initialized || !this._snapshot) throw new Error("GraphService not initialized. Call init() first.");
      return foundry.utils.deepClone(this._snapshot);
    }
    getNode(id) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      return this._snapshot?.nodes[id];
    }
    async addNode(node) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      const next2 = this._cloneCurrent();
      next2.nodes[node.id] = foundry.utils.deepClone(node);
      await this._write(next2);
    }
    async updateNode(id, patch) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      const next2 = this._cloneCurrent();
      const base = next2.nodes[id] ?? { id };
      next2.nodes[id] = { ...base, ...patch, id };
      await this._write(next2);
    }
    async removeNode(id) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      const next2 = this._cloneCurrent();
      delete next2.nodes[id];
      for (const [eid, e] of Object.entries(next2.edges)) {
        if (e.source === id || e.target === id) delete next2.edges[eid];
      }
      if (next2.policy) delete next2.policy[id];
      await this._write(next2);
    }
    getEdge(id) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      return this._snapshot?.edges[id];
    }
    async addEdge(edge) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      const next2 = this._cloneCurrent();
      this._assertEndpointsExist(next2, edge.source, edge.target);
      next2.edges[edge.id] = foundry.utils.deepClone(edge);
      await this._write(next2);
    }
    async updateEdge(id, patch) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      const next2 = this._cloneCurrent();
      const base = next2.edges[id] ?? { id };
      const newSource = patch.source ?? base.source;
      const newTarget = patch.target ?? base.target;
      if (newSource && newTarget) this._assertEndpointsExist(next2, newSource, newTarget);
      next2.edges[id] = { ...base, ...patch, id };
      await this._write(next2);
    }
    async removeEdge(id) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      const next2 = this._cloneCurrent();
      delete next2.edges[id];
      await this._write(next2);
    }
    // --- Policy API ------------------------------------------------------------
    /** GM-only: komplette Policy eines Nodes setzen/überschreiben */
    async setPolicy(nodeId, policy) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      if (!game.user?.isGM) throw new Error("Only GM can modify policies.");
      const next2 = this._cloneCurrent();
      if (!next2.policy) next2.policy = {};
      next2.policy[nodeId] = foundry.utils.deepClone(policy);
      await this._write(next2);
    }
    getPolicy(nodeId) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      return this._snapshot?.policy?.[nodeId];
    }
    /** GM-only: Node-Sichtbarkeit (für Spieler) setzen */
    async setNodeVisible(nodeId, visible) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      if (!game.user?.isGM) throw new Error("Only GM can modify node visibility.");
      const next2 = this._cloneCurrent();
      if (!next2.policy) next2.policy = {};
      const np = next2.policy[nodeId] ?? { visibility: {} };
      np.visible = visible;
      next2.policy[nodeId] = np;
      await this._write(next2);
    }
    /** Sichtbarkeitsstatus eines Nodes lesen (Default: false) */
    isNodeVisible(nodeId) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      const p = this._snapshot?.policy?.[nodeId];
      return p?.visible === true;
    }
    /** GM-only: komplette Policy eines Nodes entfernen */
    async removePolicy(nodeId) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      if (!game.user?.isGM) throw new Error("Only GM can remove policies.");
      const next2 = this._cloneCurrent();
      if (!next2.policy || !(nodeId in next2.policy)) return;
      delete next2.policy[nodeId];
      await this._write(next2);
    }
    /** GM-only: nur Node-Visibility zurücksetzen (Policy-Eintrag bleibt sonst erhalten) */
    async clearNodeVisible(nodeId) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      if (!game.user?.isGM) throw new Error("Only GM can modify visibility.");
      const next2 = this._cloneCurrent();
      const p = next2.policy?.[nodeId];
      if (!p) return;
      delete p.visible;
      next2.policy[nodeId] = p;
      await this._write(next2);
    }
    /** GM-only: Feld-Visibilities zurücksetzen (alle oder ausgewählte Pfade) */
    async clearFieldVisibility(nodeId, paths) {
      if (!this._initialized) throw new Error("GraphService not initialized. Call init() first.");
      if (!game.user?.isGM) throw new Error("Only GM can modify field policies.");
      const next2 = this._cloneCurrent();
      const p = next2.policy?.[nodeId];
      if (!p) return;
      if (!paths || paths.length === 0) {
        p.visibility = {};
      } else {
        for (const fp of paths) delete p.visibility[fp];
      }
      next2.policy[nodeId] = p;
      await this._write(next2);
    }
    // -- Intern ----------------------------------------------------------------
    _loadFromSystem() {
      if (!this._page) throw new Error("GraphService not initialized. Call init() first.");
      const sys = this._page.system;
      return {
        version: sys.version ?? 1,
        nodes: foundry.utils.deepClone(sys.nodes ?? {}),
        edges: foundry.utils.deepClone(sys.edges ?? {}),
        policy: foundry.utils.deepClone(sys.policy ?? {})
      };
    }
    _cloneCurrent() {
      if (!this._snapshot) throw new Error("GraphService not initialized. Call init() first.");
      return foundry.utils.deepClone(this._snapshot);
    }
    async _write(next2) {
      await this._writeToSystem(next2);
      this._snapshot = foundry.utils.deepClone(next2);
    }
    async _writeToSystem(next2) {
      if (!this._initialized || !this._page) throw new Error("GraphService not initialized. Call init() first.");
      const prev = this._snapshot;
      if (!prev) throw new Error("GraphService not initialized. Call init() first.");
      let patch = {};
      if (next2.version !== prev.version) {
        patch["system.version"] = next2.version;
      }
      patch = { ...patch, ...this._dictDiff("system.nodes", prev.nodes, next2.nodes) };
      patch = { ...patch, ...this._dictDiff("system.edges", prev.edges, next2.edges) };
      patch = { ...patch, ...this._dictDiff("system.policy", prev.policy ?? {}, next2.policy ?? {}) };
      if (foundry.utils.isEmpty(patch)) return;
      if (this._foundryAdapter) {
        await this._foundryAdapter.updateDocumentWithReload(this._page, patch);
      } else {
        await this._page.update(patch, { _graphService: this._instanceId, render: false });
      }
    }
    /**
     * Patch für Dictionary-Felder (Record<string, any>) erzeugen:
     * - Entfernte Keys -> `${basePath}.-=${key}`: null
     * - Neu/Geändert   -> `${basePath}.${key}`: value   (ganzen Eintrag setzen)
     */
    _dictDiff(basePath, prev, next2) {
      const patch = {};
      for (const k of Object.keys(prev)) {
        if (!(k in next2)) patch[`${basePath}.-=${k}`] = null;
      }
      for (const [k, newVal] of Object.entries(next2)) {
        const oldVal = prev[k];
        if (oldVal === void 0) {
          patch[`${basePath}.${k}`] = newVal;
        } else {
          const d = foundry.utils.diffObject(oldVal, newVal);
          if (!foundry.utils.isEmpty(d)) patch[`${basePath}.${k}`] = newVal;
        }
      }
      return patch;
    }
    _assertEndpointsExist(g, source2, target) {
      if (!g.nodes[source2]) throw new Error(`Edge source '${source2}' does not exist`);
      if (!g.nodes[target]) throw new Error(`Edge target '${target}' does not exist`);
    }
  };
  _GraphService.API_NAME = "graphService";
  _GraphService.SERVICE_TYPE = "scoped";
  _GraphService.CLASS_NAME = "GraphService";
  _GraphService.DEPENDENCIES = [FoundryLogger];
  let GraphService = _GraphService;
  function bindFoundrySync(page, service) {
    Hooks.on("updateJournalEntryPage", async (doc, changes, options, userId) => {
      if (doc.id !== page.id) return;
      void userId;
      if (options?._graphService === service.instanceId) return;
      const sys = changes.system ?? {};
      const touched = "nodes" in sys || "edges" in sys || "policy" in sys || "version" in sys;
      if (!touched) return;
      await service.init(page);
    });
  }
  const _JournalEntryPageRelationshipGraphSheet = class _JournalEntryPageRelationshipGraphSheet extends foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet {
    constructor(...args) {
      super(...args);
      // Lazy-Memoized Getter – kein Service im Konstruktor auflösen!
      __privateAdd(this, _logger);
      __privateAdd(this, _svelte);
      __privateAdd(this, _css);
      __privateAdd(this, _graphService);
      this.svelteApp = null;
    }
    get logger() {
      return __privateGet(this, _logger) ?? __privateSet(this, _logger, use(FoundryLogger));
    }
    get svelteManager() {
      if (!this._pageScope) throw new Error("Page scope not set. Call _onRender first.");
      return __privateGet(this, _svelte) ?? __privateSet(this, _svelte, use(SvelteManager, this._pageScope));
    }
    get cssManager() {
      if (!this._pageScope) throw new Error("Page scope not set. Call _onRender first.");
      return __privateGet(this, _css) ?? __privateSet(this, _css, use(CSSManager, this._pageScope));
    }
    get graphService() {
      if (!this._pageScope) throw new Error("Page scope not set. Call _onRender first.");
      return __privateGet(this, _graphService) ?? __privateSet(this, _graphService, use(GraphService, this._pageScope));
    }
    /** @override */
    get title() {
      return this.options.window.title;
    }
    /** @override */
    async _renderHTML(context, options) {
      return await super._renderHTML(context, options);
    }
    /** @override */
    _replaceHTML(html2, options, context) {
      return super._replaceHTML(html2, options, context);
    }
    async _preparePartContext(partContext, part, options) {
      const context = await super._preparePartContext(partContext, part, options);
      return context;
    }
    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      this.logger.info(
        "[JournalEntryPageRelationshipGraphSheet] _prepareContext called with context:",
        context
      );
      this.logger.info(
        "[JournalEntryPageRelationshipGraphSheet] _prepareContext called with options:",
        options
      );
      return context;
    }
    async _loadCSS() {
      const cssPath = "modules/relationship-app/styles/journal-entry-relationship-graph-sheet.css";
      await this.cssManager.loadCSS(cssPath);
    }
    async _onRender(context, options) {
      this.logger.info("[JournalEntryPageRelationshipGraphSheet] _onRender started", {
        context,
        options
      });
      const pageId = this.document.uuid;
      this._pageScope = `page-${pageId}`;
      setCurrentScope(this._pageScope);
      await this.graphService.init(this.document);
      bindFoundrySync(this.document, this.graphService);
      await super._onRender(context, options);
      await this.svelteManager.unmountApp(this.svelteApp);
      this.svelteApp = null;
      const journalEntryPage = this.document;
      const isEditMode = !this.isView;
      await this._loadCSS();
      this.svelteApp = await this.svelteManager.mountGraphComponent(
        this.element,
        journalEntryPage,
        isEditMode
      );
      this.logger.info(
        "[JournalEntryPageRelationshipGraphSheet] Graph component mounted successfully"
      );
    }
    /** @override */
    async _onClose(options) {
      this.logger.info(
        "[JournalEntryPageRelationshipGraphSheet] _onClose called with options:",
        options
      );
      await this.svelteManager.unmountApp(this.svelteApp);
      this.svelteApp = null;
      if (this._pageScope) {
        disposeScopedServices(this._pageScope);
        this.logger.info(
          `[JournalEntryPageRelationshipGraphSheet] Disposed scoped services for scope: ${this._pageScope}`
        );
      }
      return super._onClose(options);
    }
  };
  _logger = new WeakMap();
  _svelte = new WeakMap();
  _css = new WeakMap();
  _graphService = new WeakMap();
  _JournalEntryPageRelationshipGraphSheet.EDIT_PARTS = (() => {
    const parts = foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet.EDIT_PARTS;
    const { header, footer, ...rest } = parts;
    return {
      header,
      content: {
        template: "modules/relationship-app/templates/journal-entry-relationship-graph-edit-part.hbs"
      },
      ...rest,
      footer
    };
  })();
  _JournalEntryPageRelationshipGraphSheet.VIEW_PARTS = (() => {
    const parts = foundry.applications.sheets.journal.JournalEntryPageHandlebarsSheet.VIEW_PARTS;
    return {
      ...parts,
      content: {
        template: "modules/relationship-app/templates/journal-entry-relationship-graph-view-part.hbs"
      }
    };
  })();
  _JournalEntryPageRelationshipGraphSheet.DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "journal-entry-relationship-graph",
    // CSS classes to apply
    classes: ["journal-entry-page", "relationship-graph"],
    type: "relationship-app.relationship-graph",
    // Window sizing and behavior
    position: { width: 800, height: 600 },
    window: { title: "Beziehungsgraph" },
    resizable: true,
    includeTOC: true
  };
  let JournalEntryPageRelationshipGraphSheet = _JournalEntryPageRelationshipGraphSheet;
  const fields = foundry.data.fields;
  class RelationshipGraphModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
      return {
        version: new fields.NumberField({
          required: true,
          initial: 1,
          min: 1,
          integer: true
        }),
        nodes: new fields.ObjectField({
          required: true,
          initial: {}
        }),
        edges: new fields.ObjectField({
          required: true,
          initial: {}
        }),
        policy: new fields.ObjectField({
          required: true,
          initial: {}
        })
      };
    }
  }
  const _RegistrationService = class _RegistrationService {
    // ✅ Dependencies explizit definiert - FoundryLogger bereits an erster Stelle
    constructor(logger2, errorHandler2) {
      this.logger = logger2;
      this.errorHandler = errorHandler2;
    }
    async registerAll() {
      try {
        await this.registerSheet();
        await this.registerModel();
        await this.registerMetadata();
        await this.registerServices();
      } catch (error) {
        this.errorHandler.handle(error, "RegistrationService.registerAll");
        throw error;
      }
    }
    async registerSheet() {
      this.logger.info("🚀 Relationship App: Registering JournalEntryPageRelationshipGraphSheet...");
      const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;
      DocumentSheetConfig.registerSheet(
        JournalEntryPage,
        "relationship-app",
        JournalEntryPageRelationshipGraphSheet,
        {
          types: ["relationship-app.relationship-graph"],
          makeDefault: true,
          label: () => {
            return game?.i18n?.format("TYPES.JournalEntryPage.relationship-graph", {
              page: game?.i18n?.localize("TYPES.JournalEntryPage.relationship-graph")
            }) || "Relationship Graph";
          }
        }
      );
    }
    async registerModel() {
      this.logger.info("🚀 Relationship App: Registering RelationshipGraphModel...");
      CONFIG.JournalEntryPage.dataModels["relationship-app.relationship-graph"] = RelationshipGraphModel;
    }
    async registerMetadata() {
      this.logger.info("🚀 Relationship App: Registering metadata...");
      game?.settings?.register(MODULE_ID, MODULE_METADATA_KEY, {
        name: "Relationship App Metadata",
        hint: "Metadata for the Relationship App",
        scope: "world",
        config: false,
        type: Object
      });
    }
    async registerServices() {
      this.logger.info(
        "🚀 Relationship App: Services will be registered in API after initialization..."
      );
    }
  };
  _RegistrationService.API_NAME = "registrationService";
  _RegistrationService.SERVICE_TYPE = "singleton";
  _RegistrationService.CLASS_NAME = "RegistrationService";
  _RegistrationService.DEPENDENCIES = [FoundryLogger, ConsoleErrorHandler];
  let RegistrationService = _RegistrationService;
  var RegistrationService$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    RegistrationService
  });
  class ServicePlanner {
    constructor(logger2, serviceRegistry, dependencyMapper) {
      this.logger = logger2;
      this.serviceRegistry = serviceRegistry;
      this.dependencyMapper = dependencyMapper;
    }
    /**
     * Service Baupläne für alle Services erstellen
     * Single Source of Truth: Holt Services von ServiceRegistry
     */
    createServicePlans() {
      this.logger.info(`[ServicePlanner] 📋 Creating service plans`);
      const plans = /* @__PURE__ */ new Map();
      const allServices = this.serviceRegistry.getAllServices();
      const dependencyGraph = this.dependencyMapper.buildDependencyGraph();
      this.logger.info(
        `[ServicePlanner] 📋 Processing ${allServices.length} services from ServiceRegistry`
      );
      for (const ServiceClass of allServices) {
        this.logger.info(
          `[ServicePlanner] 📝 Creating plan for: ${ServiceClass.name || ServiceClass}`
        );
        const plan = this.createServicePlan(ServiceClass, dependencyGraph);
        plans.set(ServiceClass, plan);
        this.logger.info(
          `[ServicePlanner] 📋 Plan created for ${ServiceClass.name || ServiceClass}:`,
          {
            dependencies: plan.dependencies.map((d) => d.name || d),
            resolutionOrder: plan.resolutionOrder.map((d) => d.name || d),
            isSingleton: plan.isSingleton
          }
        );
      }
      this.logger.info(`[ServicePlanner] ✅ Created ${plans.size} service plans`);
      return plans;
    }
    /**
     * Einzelnen Service-Plan erstellen
     */
    createServicePlan(serviceClass, dependencyGraph) {
      const dependencies = dependencyGraph.get(serviceClass) || [];
      const resolutionOrder = this.calculateResolutionOrder(serviceClass, dependencyGraph);
      return {
        constructor: serviceClass,
        dependencies,
        resolutionOrder,
        isSingleton: this.isSingleton(serviceClass),
        isTransient: this.isTransient(serviceClass),
        isScoped: this.isScoped(serviceClass),
        apiName: this.getApiName(serviceClass),
        serviceType: this.getServiceType(serviceClass)
      };
    }
    /**
     * Resolution Order berechnen (Topological Sort)
     */
    calculateResolutionOrder(serviceClass, dependencyGraph) {
      this.logger.info(
        `[ServicePlanner] 🔄 Calculating resolution order for: ${serviceClass.name || serviceClass}`
      );
      const visited = /* @__PURE__ */ new Set();
      const resolutionOrder = [];
      this.topologicalSort(serviceClass, dependencyGraph, visited, resolutionOrder);
      this.logger.info(
        `[ServicePlanner] 🔄 Resolution order for ${serviceClass.name || serviceClass}:`,
        resolutionOrder.map((s) => s.name || s)
      );
      return resolutionOrder;
    }
    topologicalSort(service, graph, visited, result) {
      if (visited.has(service)) {
        return;
      }
      visited.add(service);
      const dependencies = graph.get(service) || [];
      for (const dependency of dependencies) {
        this.topologicalSort(dependency, graph, visited, result);
      }
      result.push(service);
    }
    /**
     * Prüfen ob Service ein Singleton ist
     */
    isSingleton(serviceClass) {
      const serviceType = serviceClass.SERVICE_TYPE;
      return serviceType === "singleton" || serviceType === void 0;
    }
    /**
     * Prüfen ob Service ein Transient ist
     */
    isTransient(serviceClass) {
      const serviceType = serviceClass.SERVICE_TYPE;
      return serviceType === "transient";
    }
    /**
     * Prüfen ob Service ein Scoped ist
     */
    isScoped(serviceClass) {
      const serviceType = serviceClass.SERVICE_TYPE;
      return serviceType === "scoped";
    }
    /**
     * API Name aus Service-Klasse extrahieren
     */
    getApiName(serviceClass) {
      return serviceClass.API_NAME || serviceClass.name || serviceClass.toString();
    }
    /**
     * Service Type aus Service-Klasse extrahieren
     */
    getServiceType(serviceClass) {
      return serviceClass.SERVICE_TYPE || "singleton";
    }
    /**
     * Service-Plan für einen Service abrufen
     */
    getServicePlan(serviceClass, plans) {
      return plans.get(serviceClass);
    }
    /**
     * Alle Service-Pläne validieren
     */
    validateServicePlans(plans) {
      this.logger.info(`[ServicePlanner] 🔍 Validating ${plans.size} service plans`);
      const result = {
        isValid: true,
        errors: [],
        warnings: []
      };
      for (const [serviceClass, plan] of plans) {
        for (const dependency of plan.dependencies) {
          if (!this.serviceRegistry.hasService(dependency)) {
            result.isValid = false;
            result.errors.push(
              `Dependency ${dependency.name || dependency} not found for service ${serviceClass.name || serviceClass}`
            );
          }
        }
        if (!plan.apiName) {
          result.warnings.push(
            `No API_NAME defined for service ${serviceClass.name || serviceClass}`
          );
        }
      }
      this.logger.info(`[ServicePlanner] 🔍 Validation result:`, {
        isValid: result.isValid,
        errors: result.errors.length,
        warnings: result.warnings.length
      });
      return result;
    }
  }
  var ServicePlanner$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ServicePlanner
  });
  class ServiceValidator {
    constructor(logger2) {
      this.logger = logger2;
    }
    /**
     * Dependency Graph validieren
     */
    validateDependencyGraph(dependencyGraph) {
      this.logger.info(
        `[ServiceValidator] 🔍 Validating dependency graph with ${dependencyGraph.size} services`
      );
      const result = {
        isValid: true,
        errors: [],
        warnings: []
      };
      if (this.checkCircularDependencies(dependencyGraph)) {
        result.isValid = false;
        result.errors.push("Circular dependencies detected in dependency graph");
      }
      for (const [service, dependencies] of dependencyGraph) {
        for (const dependency of dependencies) {
          if (!dependencyGraph.has(dependency)) {
            result.isValid = false;
            result.errors.push(
              `Service ${service.name || service} depends on unknown service ${dependency.name || dependency}`
            );
          }
        }
      }
      this.logger.info(`[ServiceValidator] 🔍 Dependency graph validation result:`, {
        isValid: result.isValid,
        errors: result.errors.length,
        warnings: result.warnings.length
      });
      return result;
    }
    /**
     * Service-Pläne validieren
     */
    validateServicePlans(servicePlans) {
      this.logger.info(`[ServiceValidator] 🔍 Validating ${servicePlans.size} service plans`);
      const result = {
        isValid: true,
        errors: [],
        warnings: []
      };
      for (const [serviceClass, plan] of servicePlans) {
        const planValidation = this.validateServicePlan(serviceClass, plan);
        if (!planValidation.isValid) {
          result.isValid = false;
          result.errors.push(...planValidation.errors);
        }
        result.warnings.push(...planValidation.warnings);
      }
      this.logger.info(`[ServiceValidator] 🔍 Service plans validation result:`, {
        isValid: result.isValid,
        errors: result.errors.length,
        warnings: result.warnings.length
      });
      return result;
    }
    /**
     * Einzelnen Service-Plan validieren
     */
    validateServicePlan(serviceClass, plan) {
      const result = {
        isValid: true,
        errors: [],
        warnings: []
      };
      if (!plan.constructor || typeof plan.constructor !== "function") {
        result.isValid = false;
        result.errors.push(`Invalid constructor for service ${serviceClass.name || serviceClass}`);
      }
      if (!Array.isArray(plan.dependencies)) {
        result.isValid = false;
        result.errors.push(
          `Dependencies must be an array for service ${serviceClass.name || serviceClass}`
        );
      }
      if (!Array.isArray(plan.resolutionOrder)) {
        result.isValid = false;
        result.errors.push(
          `Resolution order must be an array for service ${serviceClass.name || serviceClass}`
        );
      }
      if (!plan.apiName || typeof plan.apiName !== "string") {
        result.warnings.push(`No valid API_NAME for service ${serviceClass.name || serviceClass}`);
      }
      if (!["singleton", "factory", "transient", "scoped"].includes(plan.serviceType)) {
        result.warnings.push(
          `Invalid service type '${plan.serviceType}' for service ${serviceClass.name || serviceClass}`
        );
      }
      if (plan.dependencies.length === 0 && serviceClass.DEPENDENCIES && serviceClass.DEPENDENCIES.length > 0) {
        result.warnings.push(
          `Service ${serviceClass.name || serviceClass} has DEPENDENCIES defined but no dependencies were resolved`
        );
      }
      if (serviceClass.DEPENDENCIES === void 0) {
        result.warnings.push(
          `Service ${serviceClass.name || serviceClass} has no DEPENDENCIES property defined. This should be explicitly declared as an empty array if no dependencies are needed.`
        );
      }
      return result;
    }
    /**
     * Service-Erstellung validieren
     */
    validateServiceCreation(service, ctor) {
      this.logger.info(
        `[ServiceValidator] 🔍 Validating service creation for: ${ctor.name || ctor}`
      );
      if (!service) {
        this.logger.error(
          `[ServiceValidator] ❌ Service is null or undefined for ${ctor.name || ctor}`
        );
        return false;
      }
      if (typeof service !== "object") {
        this.logger.error(
          `[ServiceValidator] ❌ Service is not an object for ${ctor.name || ctor}`
        );
        return false;
      }
      this.logger.info(
        `[ServiceValidator] ✅ Service creation valid for ${ctor.name || ctor}`
      );
      return true;
    }
    /**
     * Zirkuläre Dependencies prüfen
     */
    checkCircularDependencies(dependencyGraph) {
      this.logger.info(`[ServiceValidator] 🔍 Checking for circular dependencies`);
      const visited = /* @__PURE__ */ new Set();
      const recursionStack = /* @__PURE__ */ new Set();
      for (const service of dependencyGraph.keys()) {
        if (this.hasCircularDependency(service, dependencyGraph, visited, recursionStack)) {
          this.logger.error(
            `[ServiceValidator] ❌ Circular dependency detected starting from ${service.name || service}`
          );
          return true;
        }
      }
      this.logger.info(`[ServiceValidator] ✅ No circular dependencies found`);
      return false;
    }
    hasCircularDependency(service, graph, visited, recursionStack) {
      if (recursionStack.has(service)) {
        this.logger.error(
          `[ServiceValidator] ❌ Circular dependency detected: ${service.name || service} is in recursion stack`
        );
        return true;
      }
      if (visited.has(service)) {
        return false;
      }
      visited.add(service);
      recursionStack.add(service);
      const dependencies = graph.get(service) || [];
      for (const dependency of dependencies) {
        if (this.hasCircularDependency(dependency, graph, visited, recursionStack)) {
          return true;
        }
      }
      recursionStack.delete(service);
      return false;
    }
    /**
     * Service-Container validieren
     */
    validateServiceContainer(serviceContainer) {
      this.logger.info(`[ServiceValidator] 🔍 Validating service container`);
      const result = {
        isValid: true,
        errors: [],
        warnings: []
      };
      if (!serviceContainer) {
        result.isValid = false;
        result.errors.push("Service container is null or undefined");
        return result;
      }
      if (typeof serviceContainer.getService !== "function") {
        result.isValid = false;
        result.errors.push("Service container missing getService method");
      }
      if (typeof serviceContainer.createService !== "function") {
        result.isValid = false;
        result.errors.push("Service container missing createService method");
      }
      this.logger.info(`[ServiceValidator] 🔍 Service container validation result:`, {
        isValid: result.isValid,
        errors: result.errors.length,
        warnings: result.warnings.length
      });
      return result;
    }
    /**
     * Fehlerbehandlung für Service-Erstellung
     */
    handleServiceCreationError(error, ctor) {
      this.logger.error(
        `[ServiceValidator] ❌ Service creation error for ${ctor.name || ctor}:`,
        error
      );
      this.logger.error(`Service creation failed for ${ctor.name || ctor}:`, error);
    }
  }
  var ServiceValidator$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ServiceValidator
  });
  class ServiceFactory {
    constructor(logger2, servicePlans, serviceValidator, serviceContainer) {
      this.logger = logger2;
      this.servicePlans = servicePlans;
      this.serviceValidator = serviceValidator;
      this.serviceContainer = serviceContainer;
    }
    /**
     * Service mit Dependencies erstellen
     */
    createService(ctor) {
      this.writeLog("info", `[ServiceFactory] 🏗️ Creating service: ${ctor.name || ctor}`);
      const plan = this.servicePlans.get(ctor);
      if (!plan) {
        this.writeLog(
          "error",
          `[ServiceFactory] ❌ No service plan found for ${ctor.name || ctor}`
        );
        throw new Error(`No service plan found for ${ctor.name || ctor}`);
      }
      this.writeLog(
        "info",
        `[ServiceFactory] 📋 Service plan for ${ctor.name || ctor}:`,
        {
          dependencies: plan.dependencies.map((d) => d.name || d),
          isSingleton: plan.isSingleton,
          isScoped: plan.isScoped,
          isTransient: plan.isTransient,
          serviceType: plan.serviceType
        }
      );
      const dependencies = this.resolveDependencies(plan);
      this.writeLog(
        "info",
        `[ServiceFactory] 🔗 Resolved dependencies for ${ctor.name || ctor}:`,
        {
          count: dependencies.length,
          dependencies: dependencies.map((d) => d.constructor.name)
        }
      );
      const service = new plan.constructor(...dependencies);
      if (!this.serviceValidator.validateServiceCreation(service, ctor)) {
        this.serviceValidator.handleServiceCreationError(
          new Error(`Service creation validation failed for ${ctor.name || ctor}`),
          ctor
        );
        throw new Error(`Service creation validation failed for ${ctor.name || ctor}`);
      }
      this.writeLog(
        "info",
        `[ServiceFactory] ✅ Service created successfully: ${ctor.name || ctor}`
      );
      return service;
    }
    /**
     * Dependencies über Container auflösen (mit korrektem Caching!)
     */
    resolveDependencies(plan) {
      this.writeLog(
        "info",
        `[ServiceFactory] 🔗 Resolving dependencies for: ${plan.constructor.name || plan.constructor}`
      );
      const dependencies = [];
      for (const dependency of plan.dependencies) {
        this.writeLog(
          "info",
          `[ServiceFactory] 🔍 Resolving dependency: ${dependency.name || dependency}`
        );
        try {
          const resolvedDependency = this.serviceContainer.getService(dependency);
          dependencies.push(resolvedDependency);
          this.writeLog(
            "info",
            `[ServiceFactory] ✅ Dependency resolved: ${dependency.name || dependency} -> ${resolvedDependency.constructor.name}`
          );
        } catch (error) {
          this.writeLog(
            "error",
            `[ServiceFactory] ❌ Failed to resolve dependency ${dependency.name || dependency}:`,
            error
          );
          this.serviceValidator.handleServiceCreationError(error, dependency);
          throw error;
        }
      }
      return dependencies;
    }
    writeLog(modus, message, ...args) {
      if (this.logger) {
        this.logger[modus](message, ...args);
      }
    }
  }
  var ServiceFactory$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ServiceFactory
  });
  class ServiceCache {
    // Scoped Cache
    constructor(logger2) {
      this.logger = logger2;
      this.instances = /* @__PURE__ */ new Map();
      this.scopedInstances = /* @__PURE__ */ new Map();
    }
    /**
     * Singleton Service abrufen oder erstellen
     */
    getSingleton(ctor, factory) {
      this.writeLog("info", `[ServiceCache] 🔍 Getting singleton: ${ctor.name || ctor}`);
      if (this.instances.has(ctor)) {
        this.writeLog(
          "info",
          `[ServiceCache] ♻️ Returning cached singleton: ${ctor.name || ctor}`
        );
        return this.instances.get(ctor);
      }
      this.writeLog(
        "info",
        `[ServiceCache] 🏗️ Creating new singleton: ${ctor.name || ctor}`
      );
      const service = factory();
      this.instances.set(ctor, service);
      this.writeLog("info", `[ServiceCache] 💾 Cached singleton: ${ctor.name || ctor}`);
      return service;
    }
    /**
     * Scoped Service abrufen oder erstellen
     */
    getScoped(identifier, scope, factory) {
      this.writeLog(
        "info",
        `[ServiceCache] 🎯 Getting scoped service: ${identifier.name || identifier} (scope: ${scope})`
      );
      if (!this.scopedInstances.has(scope)) {
        this.scopedInstances.set(scope, /* @__PURE__ */ new Map());
        this.writeLog("info", `[ServiceCache] 📁 Created new scope: ${scope}`);
      }
      const scopeInstances = this.scopedInstances.get(scope);
      if (scopeInstances.has(identifier)) {
        this.writeLog(
          "info",
          `[ServiceCache] ♻️ Returning cached scoped service: ${identifier.name || identifier} (scope: ${scope})`
        );
        return scopeInstances.get(identifier);
      }
      this.writeLog(
        "info",
        `[ServiceCache] 🏗️ Creating new scoped service: ${identifier.name || identifier} (scope: ${scope})`
      );
      const service = factory();
      scopeInstances.set(identifier, service);
      this.writeLog(
        "info",
        `[ServiceCache] 💾 Cached scoped service: ${identifier.name || identifier} (scope: ${scope})`
      );
      return service;
    }
    /**
     * Transient Service erstellen (kein Caching)
     */
    getTransient(identifier, factory) {
      this.writeLog(
        "info",
        `[ServiceCache] 🔄 Creating transient service: ${identifier.name || identifier}`
      );
      return factory();
    }
    /**
     * Singleton Service aus Cache entfernen
     */
    disposeSingleton(identifier) {
      this.writeLog(
        "info",
        `[ServiceCache] 🗑️ Disposing singleton: ${identifier.name || identifier}`
      );
      if (this.instances.has(identifier)) {
        this.instances.delete(identifier);
        this.writeLog(
          "info",
          `[ServiceCache] ✅ Singleton disposed: ${identifier.name || identifier}`
        );
      } else {
        this.writeLog(
          "info",
          `[ServiceCache] ℹ️ Singleton not cached: ${identifier.name || identifier}`
        );
      }
    }
    /**
     * Alle Singleton Services aus Cache entfernen
     */
    disposeAllSingletons() {
      this.writeLog(
        "info",
        `[ServiceCache] 🗑️ Disposing all singletons (${this.instances.size} cached)`
      );
      this.instances.clear();
      this.writeLog("info", `[ServiceCache] ✅ All singletons disposed`);
    }
    /**
     * Scoped Services eines Scopes entsorgen
     */
    disposeScopedServices(scope) {
      this.writeLog("info", `[ServiceCache] 🗑️ Disposing scoped services: ${scope}`);
      if (this.scopedInstances.has(scope)) {
        const scopeInstances = this.scopedInstances.get(scope);
        const count = scopeInstances.size;
        scopeInstances.clear();
        this.scopedInstances.delete(scope);
        this.writeLog(
          "info",
          `[ServiceCache] ✅ Disposed ${count} scoped services from scope: ${scope}`
        );
      } else {
        this.writeLog("info", `[ServiceCache] ℹ️ No scoped services found in scope: ${scope}`);
      }
    }
    /**
     * Alle Scoped Services entsorgen
     */
    disposeAllScopedServices() {
      this.writeLog(
        "info",
        `[ServiceCache] 🗑️ Disposing all scoped services (${this.scopedInstances.size} scopes)`
      );
      for (const [scope, scopeInstances] of this.scopedInstances) {
        const count = scopeInstances.size;
        scopeInstances.clear();
        this.writeLog("info", `[ServiceCache] ✅ Disposed ${count} services from scope: ${scope}`);
      }
      this.scopedInstances.clear();
      this.writeLog("info", `[ServiceCache] ✅ All scoped services disposed`);
    }
    /**
     * Alle Services entsorgen
     */
    disposeAll() {
      this.writeLog(
        "info",
        `[ServiceCache] 🗑️ Disposing all services (${this.instances.size} singletons, ${this.scopedInstances.size} scopes)`
      );
      this.disposeAllSingletons();
      this.disposeAllScopedServices();
      this.writeLog("info", `[ServiceCache] ✅ All services disposed`);
    }
    /**
     * Prüfen ob Singleton im Cache ist
     */
    hasSingleton(identifier) {
      return this.instances.has(identifier);
    }
    /**
     * Anzahl gecachter Singleton Services
     */
    getSingletonCount() {
      return this.instances.size;
    }
    /**
     * Anzahl Scoped Services in einem Scope
     */
    getScopedServiceCount(scope) {
      if (this.scopedInstances.has(scope)) {
        return this.scopedInstances.get(scope).size;
      }
      return 0;
    }
    /**
     * Anzahl aller Scopes
     */
    getScopeCount() {
      return this.scopedInstances.size;
    }
    writeLog(modus, message, ...args) {
      if (this.logger) {
        this.logger[modus](message, ...args);
      }
    }
  }
  var ServiceCache$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ServiceCache
  });
  class ScopeManager {
    constructor(logger2) {
      this.logger = logger2;
      this.currentScope = null;
      this.scopeChains = /* @__PURE__ */ new Map();
    }
    /**
     * Aktuellen Scope setzen
     */
    setCurrentScope(scope) {
      this.writeLog("info", `[ScopeManager] 🎯 Setting current scope: ${scope}`);
      this.currentScope = scope;
    }
    /**
     * Aktuellen Scope abrufen
     */
    getCurrentScope() {
      return this.currentScope;
    }
    /**
     * Scope leeren
     */
    clearScope(scope) {
      this.writeLog("info", `[ScopeManager] 🗑️ Clearing scope: ${scope}`);
      this.writeLog("info", `[ScopeManager] ✅ Scope cleared: ${scope}`);
    }
    /**
     * Scope Chain erstellen
     */
    createScopeChain(parentScope) {
      this.writeLog("info", `[ScopeManager] 🔗 Creating scope chain for parent: ${parentScope}`);
      const chain = {
        parentScope,
        childScopes: /* @__PURE__ */ new Set(),
        addChildScope: (scope) => {
          chain.childScopes.add(scope);
          this.writeLog(
            "info",
            `[ScopeManager] ➕ Added child scope: ${scope} to parent: ${parentScope}`
          );
        },
        removeChildScope: (scope) => {
          chain.childScopes.delete(scope);
          this.writeLog(
            "info",
            `[ScopeManager] ➖ Removed child scope: ${scope} from parent: ${parentScope}`
          );
        },
        disposeAllChildScopes: () => {
          this.writeLog(
            "info",
            `[ScopeManager] 🧹 Disposing ${chain.childScopes.size} child scopes for parent: ${parentScope}`
          );
          chain.childScopes.clear();
        },
        getChildScopeCount: () => chain.childScopes.size,
        isChildScope: (scope) => chain.childScopes.has(scope)
      };
      this.scopeChains.set(parentScope, chain);
      this.writeLog("info", `[ScopeManager] ✅ Scope chain created for parent: ${parentScope}`);
      return chain;
    }
    /**
     * Child Scope zu Parent hinzufügen
     */
    addChildScope(parentScope, childScope) {
      const chain = this.scopeChains.get(parentScope);
      if (chain) {
        chain.addChildScope(childScope);
      } else {
        this.writeLog("warn", `[ScopeManager] ⚠️ Parent scope chain not found: ${parentScope}`);
      }
    }
    /**
     * Child Scope von Parent entfernen
     */
    removeChildScope(parentScope, childScope) {
      const chain = this.scopeChains.get(parentScope);
      if (chain) {
        chain.removeChildScope(childScope);
      } else {
        this.writeLog("warn", `[ScopeManager] ⚠️ Parent scope chain not found: ${parentScope}`);
      }
    }
    /**
     * Scope Chain entsorgen
     */
    disposeScopeChain(parentScope) {
      const chain = this.scopeChains.get(parentScope);
      if (chain) {
        this.writeLog("info", `[ScopeManager] 🧹 Disposing scope chain for parent: ${parentScope}`);
        chain.disposeAllChildScopes();
        this.scopeChains.delete(parentScope);
        this.writeLog("info", `[ScopeManager] ✅ Scope chain disposed for parent: ${parentScope}`);
      } else {
        this.writeLog("warn", `[ScopeManager] ⚠️ Scope chain not found: ${parentScope}`);
      }
    }
    /**
     * Scope Chain abrufen
     */
    getScopeChain(parentScope) {
      return this.scopeChains.get(parentScope);
    }
    /**
     * Alle Scope Chains entsorgen
     */
    disposeAllScopeChains() {
      this.writeLog(
        "info",
        `[ScopeManager] 🗑️ Disposing all scope chains (${this.scopeChains.size} chains)`
      );
      for (const [parentScope, chain] of this.scopeChains) {
        chain.disposeAllChildScopes();
        this.writeLog("info", `[ScopeManager] ✅ Disposed scope chain: ${parentScope}`);
      }
      this.scopeChains.clear();
      this.writeLog("info", `[ScopeManager] ✅ All scope chains disposed`);
    }
    /**
     * Anzahl Scope Chains
     */
    getScopeChainCount() {
      return this.scopeChains.size;
    }
    /**
     * Alle Parent Scopes abrufen
     */
    getAllParentScopes() {
      return Array.from(this.scopeChains.keys());
    }
    writeLog(modus, message, ...args) {
      if (this.logger) {
        this.logger[modus](message, ...args);
      }
    }
  }
  var ScopeManager$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ScopeManager
  });
  const _ServiceContainer = class _ServiceContainer {
    constructor(logger2, servicePlans, serviceValidator) {
      this.logger = logger2;
      this.servicePlans = servicePlans;
      this.serviceValidator = serviceValidator;
    }
    /**
     * ServiceFactory nachträglich injizieren
     */
    setServiceFactory(factory) {
      this.serviceFactory = factory;
      this.writeLog("info", `[ServiceContainer] ✅ ServiceFactory injected`);
    }
    /**
     * ServiceCache nachträglich injizieren
     */
    setServiceCache(cache) {
      this.serviceCache = cache;
      this.writeLog("info", `[ServiceContainer] ✅ ServiceCache injected`);
    }
    /**
     * ScopeManager nachträglich injizieren
     */
    setScopeManager(scopeManager) {
      this.scopeManager = scopeManager;
      this.writeLog("info", `[ServiceContainer] ✅ ScopeManager injected`);
    }
    static getInstance(logger2, servicePlans, serviceValidator) {
      if (!_ServiceContainer.instance) {
        _ServiceContainer.instance = new _ServiceContainer(logger2, servicePlans, serviceValidator);
      }
      return _ServiceContainer.instance;
    }
    /**
     * Service über spezialisierte Services abrufen oder erstellen
     */
    getService(ctor, scope) {
      this.writeLog(
        "info",
        `[ServiceContainer] 🏪 Getting service: ${ctor.name || ctor}${scope ? ` (scope: ${scope})` : ""}`
      );
      const plan = this.servicePlans.get(ctor);
      if (!plan) {
        this.writeLog(
          "error",
          `[ServiceContainer] ❌ No service plan found for ${ctor.name || ctor}`
        );
        throw new Error(`No service plan found for ${ctor.name || ctor}`);
      }
      if (!this.serviceFactory || !this.serviceCache || !this.scopeManager) {
        throw new Error(
          "ServiceContainer not properly initialized. Missing ServiceFactory, ServiceCache, or ScopeManager."
        );
      }
      const factory = () => this.serviceFactory.createService(ctor);
      if (plan.isTransient) {
        this.writeLog(
          "info",
          `[ServiceContainer] 🔄 Creating transient service: ${ctor.name || ctor}`
        );
        return this.serviceCache.getTransient(ctor, factory);
      }
      if (plan.isScoped) {
        const scopeKey = scope || this.scopeManager.getCurrentScope() || "default";
        this.writeLog(
          "info",
          `[ServiceContainer] 🎯 Getting scoped service: ${ctor.name || ctor} (scope: ${scopeKey})`
        );
        return this.serviceCache.getScoped(ctor, scopeKey, factory);
      }
      if (plan.isSingleton) {
        this.writeLog(
          "info",
          `[ServiceContainer] ♻️ Getting singleton service: ${ctor.name || ctor}`
        );
        return this.serviceCache.getSingleton(ctor, factory);
      }
      this.writeLog(
        "warn",
        `[ServiceContainer] ⚠️ Unknown service type for ${ctor.name || ctor}, treating as singleton`
      );
      return this.serviceCache.getSingleton(ctor, factory);
    }
    /**
     * Service mit Dependencies erstellen (delegiert an ServiceFactory)
     */
    createService(ctor) {
      if (!this.serviceFactory) {
        throw new Error("ServiceFactory not injected. Call setServiceFactory() first.");
      }
      return this.serviceFactory.createService(ctor);
    }
    /**
     * Alle Services erstellen (delegiert an ServiceFactory)
     */
    createAllServices() {
      this.writeLog(
        "info",
        `[ServiceContainer] 🏗️ Creating all services (${this.servicePlans.size} plans)`
      );
      const creationOrder = this.calculateCreationOrder();
      for (const serviceClass of creationOrder) {
        try {
          this.writeLog(
            "info",
            `[ServiceContainer] 🏗️ Creating service: ${serviceClass.name || serviceClass}`
          );
          this.getService(serviceClass);
          this.writeLog(
            "info",
            `[ServiceContainer] ✅ Service created: ${serviceClass.name || serviceClass}`
          );
        } catch (error) {
          this.writeLog(
            "error",
            `[ServiceContainer] ❌ Failed to create service ${serviceClass.name || serviceClass}:`,
            error
          );
          this.serviceValidator.handleServiceCreationError(error, serviceClass);
          throw error;
        }
      }
      this.writeLog("info", `[ServiceContainer] ✅ All services created successfully`);
    }
    /**
     * Erstellungsreihenfolge berechnen (Topological Sort)
     */
    calculateCreationOrder() {
      this.writeLog("info", `[ServiceContainer] 🔄 Calculating creation order`);
      const visited = /* @__PURE__ */ new Set();
      const result = [];
      for (const serviceClass of this.servicePlans.keys()) {
        this.topologicalSort(serviceClass, visited, result);
      }
      this.writeLog(
        "info",
        `[ServiceContainer] 🔄 Creation order:`,
        result.map((s) => s.name || s)
      );
      return result;
    }
    topologicalSort(service, visited, result) {
      if (visited.has(service)) {
        return;
      }
      visited.add(service);
      const plan = this.servicePlans.get(service);
      if (plan) {
        for (const dependency of plan.dependencies) {
          this.topologicalSort(dependency, visited, result);
        }
      }
      result.push(service);
    }
    /**
     * Service aus Cache entfernen (delegiert an ServiceCache)
     */
    disposeService(identifier) {
      if (!this.serviceCache) {
        throw new Error("ServiceCache not injected. Call setServiceCache() first.");
      }
      this.serviceCache.disposeSingleton(identifier);
    }
    /**
     * Alle Services aus Cache entfernen (delegiert an ServiceCache)
     */
    disposeAll() {
      if (!this.serviceCache) {
        throw new Error("ServiceCache not injected. Call setServiceCache() first.");
      }
      this.serviceCache.disposeAll();
    }
    /**
     * Prüfen ob Service im Cache ist (delegiert an ServiceCache)
     */
    hasCachedService(identifier) {
      if (!this.serviceCache) {
        return false;
      }
      return this.serviceCache.hasSingleton(identifier);
    }
    /**
     * Anzahl gecachter Services (delegiert an ServiceCache)
     */
    getCachedServiceCount() {
      if (!this.serviceCache) {
        return 0;
      }
      return this.serviceCache.getSingletonCount();
    }
    /**
     * Service-Plan abrufen
     */
    getServicePlan(identifier) {
      return this.servicePlans.get(identifier);
    }
    /**
     * Alle Service-Pläne abrufen
     */
    getAllServicePlans() {
      return this.servicePlans;
    }
    /**
     * Aktuellen Scope setzen (delegiert an ScopeManager)
     */
    setCurrentScope(scope) {
      if (!this.scopeManager) {
        throw new Error("ScopeManager not injected. Call setScopeManager() first.");
      }
      this.scopeManager.setCurrentScope(scope);
    }
    /**
     * Scope leeren (delegiert an ScopeManager)
     */
    clearScope(scope) {
      if (!this.scopeManager) {
        throw new Error("ScopeManager not injected. Call setScopeManager() first.");
      }
      this.scopeManager.clearScope(scope);
    }
    /**
     * Scoped Services eines Scopes entsorgen (delegiert an ServiceCache)
     */
    disposeScopedServices(scope) {
      if (!this.serviceCache) {
        throw new Error("ServiceCache not injected. Call setServiceCache() first.");
      }
      this.serviceCache.disposeScopedServices(scope);
    }
    /**
     * Anzahl Scoped Services in einem Scope (delegiert an ServiceCache)
     */
    getScopedServiceCount(scope) {
      if (!this.serviceCache) {
        return 0;
      }
      return this.serviceCache.getScopedServiceCount(scope);
    }
    writeLog(modus, message, ...args) {
      if (this.logger) {
        this.logger[modus](message, ...args);
      }
    }
    // Scope Chain Management (delegiert an ScopeManager)
    createScopeChain(parentScope) {
      if (!this.scopeManager) {
        throw new Error("ScopeManager not injected. Call setScopeManager() first.");
      }
      return this.scopeManager.createScopeChain(parentScope);
    }
    addChildScope(parentScope, childScope) {
      if (!this.scopeManager) {
        throw new Error("ScopeManager not injected. Call setScopeManager() first.");
      }
      this.scopeManager.addChildScope(parentScope, childScope);
    }
    removeChildScope(parentScope, childScope) {
      if (!this.scopeManager) {
        throw new Error("ScopeManager not injected. Call setScopeManager() first.");
      }
      this.scopeManager.removeChildScope(parentScope, childScope);
    }
    disposeScopeChain(parentScope) {
      if (!this.scopeManager || !this.serviceCache) {
        throw new Error(
          "ScopeManager or ServiceCache not injected. Call setScopeManager() and setServiceCache() first."
        );
      }
      this.scopeManager.disposeScopeChain(parentScope);
      this.serviceCache.disposeScopedServices(parentScope);
    }
    getScopeChain(parentScope) {
      if (!this.scopeManager) {
        return void 0;
      }
      return this.scopeManager.getScopeChain(parentScope);
    }
  };
  _ServiceContainer.API_NAME = "serviceContainer";
  _ServiceContainer.SERVICE_TYPE = "singleton";
  _ServiceContainer.CLASS_NAME = "ServiceContainer";
  _ServiceContainer.DEPENDENCIES = [FoundryLogger, ServicePlanner, ServiceValidator];
  let ServiceContainer = _ServiceContainer;
  var ServiceContainer$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ServiceContainer
  });
  const _ServiceRegistry = class _ServiceRegistry {
    constructor(logger2) {
      this.logger = logger2;
      this.serviceRegistry = /* @__PURE__ */ new Map();
    }
    static getInstance(logger2) {
      if (!_ServiceRegistry.instance) {
        _ServiceRegistry.instance = new _ServiceRegistry(logger2);
      }
      return _ServiceRegistry.instance;
    }
    /**
     * EINZIGER Eingangspunkt für Services
     * Registriert alle Services aus einer Service-Quelle
     */
    registerAllServices(serviceSource) {
      this.writeLog(
        "info",
        `[ServiceRegistry] 📚 Registering ${serviceSource.length} services from source`
      );
      for (const serviceConfig of serviceSource) {
        const serviceName = serviceConfig.name.CLASS_NAME || serviceConfig.name.className || serviceConfig.name.name || serviceConfig.name;
        const serviceClass = serviceConfig.class;
        this.writeLog("info", `[ServiceRegistry] 📝 Registering service: ${serviceName}`);
        this.registerService(serviceClass, serviceClass);
      }
      this.writeLog(
        "info",
        `[ServiceRegistry] ✅ All services registered. Total: ${this.serviceRegistry.size}`
      );
    }
    /**
     * Einzelnen Service registrieren
     */
    registerService(identifier, constructor) {
      this.writeLog("debug", `[ServiceRegistry] 🔍 Debug - identifier:`, identifier);
      this.writeLog("debug", `[ServiceRegistry] 🔍 Debug - constructor:`, constructor);
      if (!identifier) {
        this.writeLog("error", `[ServiceRegistry] ❌ Identifier is undefined!`);
        return;
      }
      const serviceName = identifier.CLASS_NAME || identifier.className || identifier.name || identifier;
      this.writeLog("info", `[ServiceRegistry] 📝 Registering service: ${serviceName}`);
      this.serviceRegistry.set(identifier, constructor);
    }
    /**
     * Service-Konstruktor abrufen
     */
    getServiceConstructor(identifier) {
      const constructor = this.serviceRegistry.get(identifier);
      this.writeLog(
        "debug",
        `[ServiceRegistry] 🔍 Getting constructor for: ${identifier.name || identifier}`,
        {
          found: !!constructor,
          constructor: constructor?.name || constructor
        }
      );
      return constructor;
    }
    /**
     * Alle registrierten Services abrufen
     * Wird von anderen Klassen verwendet (Single Source of Truth)
     */
    getAllServices() {
      const services = Array.from(this.serviceRegistry.keys());
      this.writeLog(
        "info",
        `[ServiceRegistry] 📋 Providing ${services.length} services to other classes`
      );
      return services;
    }
    /**
     * Prüfen ob Service registriert ist
     */
    hasService(identifier) {
      return this.serviceRegistry.has(identifier);
    }
    /**
     * Anzahl registrierter Services
     */
    getServiceCount() {
      return this.serviceRegistry.size;
    }
    /**
     * Registry leeren (für Tests)
     */
    clear() {
      this.writeLog(
        "info",
        `[ServiceRegistry] 🗑️ Clearing registry (${this.serviceRegistry.size} services)`
      );
      this.serviceRegistry.clear();
    }
    writeLog(modus, message, ...args) {
      if (this.logger) {
        this.logger[modus](message, ...args);
      } else {
        console[modus](message, ...args);
      }
    }
  };
  _ServiceRegistry.API_NAME = "serviceRegistry";
  _ServiceRegistry.SERVICE_TYPE = "singleton";
  _ServiceRegistry.CLASS_NAME = "ServiceRegistry";
  _ServiceRegistry.DEPENDENCIES = [FoundryLogger];
  let ServiceRegistry = _ServiceRegistry;
  var ServiceRegistry$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ServiceRegistry
  });
  const _ModuleInitializer = class _ModuleInitializer {
    // ✅ Dependencies explizit definiert - FoundryLogger bereits an erster Stelle
    constructor(logger2, errorHandler2, registrationService) {
      this.logger = logger2;
      this.errorHandler = errorHandler2;
      this.registrationService = registrationService;
    }
    async initialize() {
      try {
        this.logger.info("🚀 Relationship App: Starting initialization...");
        await this.registrationService.registerAll();
        this.logger.info("✅ Relationship App: Initialization completed!");
      } catch (error) {
        this.errorHandler.handle(error, "Module initialization");
        throw error;
      }
    }
  };
  _ModuleInitializer.API_NAME = "moduleInitializer";
  _ModuleInitializer.SERVICE_TYPE = "singleton";
  _ModuleInitializer.CLASS_NAME = "ModuleInitializer";
  _ModuleInitializer.DEPENDENCIES = [FoundryLogger, ConsoleErrorHandler, RegistrationService];
  let ModuleInitializer = _ModuleInitializer;
  var ModuleInitializer$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ModuleInitializer
  });
  class ServiceRegistrar {
    constructor(logger2, serviceContainer) {
      this.logger = logger2;
      this.serviceContainer = serviceContainer;
      this.serviceLocator = /* @__PURE__ */ new Map();
    }
    /**
     * Alle Services registrieren - NUR FACTORIES
     */
    registerAllServices() {
      this.logger.info(`[ServiceRegistrar] 📝 Registering all services as factories`);
      const servicePlans = this.serviceContainer.getAllServicePlans();
      this.logger.info(
        `[ServiceRegistrar] 📋 Registering ${servicePlans.size} services as factories`
      );
      for (const [serviceClass] of servicePlans) {
        this.registerService(serviceClass);
      }
      this.logger.info(`[ServiceRegistrar] ✅ All services registered as factories`);
    }
    /**
     * Einzelnen Service registrieren
     */
    registerService(serviceClass) {
      const serviceName = serviceClass.CLASS_NAME || serviceClass.className || serviceClass.name || serviceClass;
      this.logger.info(`[ServiceRegistrar] 📝 Registering service factory: ${serviceName}`);
      this.serviceLocator.set(serviceClass, () => this.serviceContainer.getService(serviceClass));
      this.serviceLocator.set(serviceName, () => this.serviceContainer.getService(serviceClass));
      this.logger.info(`[ServiceRegistrar] ✅ Service factory registered: ${serviceName}`);
    }
    /**
     * Service über Factory abrufen - On-Demand
     */
    getService(identifier, scope) {
      this.logger.info(
        `[ServiceRegistrar] 🔍 Getting service: ${identifier.name || identifier}${scope ? ` (scope: ${scope})` : ""}`
      );
      const factory = this.serviceLocator.get(identifier);
      if (!factory) {
        throw new Error(`Service ${identifier.name || identifier} not registered`);
      }
      const service = this.serviceContainer.getService(identifier, scope);
      this.logger.info(
        `[ServiceRegistrar] ✅ Service retrieved: ${identifier.name || identifier}${scope ? ` (scope: ${scope})` : ""}`
      );
      return service;
    }
    /**
     * Prüfen ob Service registriert ist
     */
    hasService(identifier) {
      return this.serviceLocator.has(identifier);
    }
    /**
     * Alle registrierten Services abrufen
     */
    getRegisteredServices() {
      return Array.from(this.serviceLocator.keys());
    }
    /**
     * Service aus Registrierung entfernen
     */
    unregisterService(identifier) {
      this.logger.info(
        `[ServiceRegistrar] 🗑️ Unregistering service: ${identifier.name || identifier}`
      );
      if (this.serviceLocator.has(identifier)) {
        this.serviceLocator.delete(identifier);
        this.logger.info(
          `[ServiceRegistrar] ✅ Service unregistered: ${identifier.name || identifier}`
        );
      } else {
        this.logger.info(
          `[ServiceRegistrar] ℹ️ Service not registered: ${identifier.name || identifier}`
        );
      }
    }
    /**
     * Alle Services aus Registrierung entfernen
     */
    unregisterAll() {
      this.logger.info(
        `[ServiceRegistrar] 🗑️ Unregistering all services (${this.serviceLocator.size} registered)`
      );
      this.serviceLocator.clear();
      this.logger.info(`[ServiceRegistrar] ✅ All services unregistered`);
    }
    /**
     * Service Discovery - Services auffindbar machen
     */
    enableServiceDiscovery() {
      this.logger.info(`[ServiceRegistrar] 🔍 Enabling service discovery`);
      globalThis.relationshipApp = globalThis.relationshipApp || {};
      globalThis.relationshipApp.serviceLocator = this;
      this.logger.info(`[ServiceRegistrar] ✅ Service discovery enabled`);
    }
    /**
     * Service Metadaten abrufen
     */
    getServiceMetadata(identifier) {
      const plan = this.serviceContainer.getServicePlan(identifier);
      if (!plan) {
        return null;
      }
      return {
        apiName: plan.apiName,
        serviceType: plan.serviceType,
        isSingleton: plan.isSingleton,
        dependencies: plan.dependencies.map((d) => d.name || d),
        isRegistered: this.hasService(identifier)
      };
    }
    /**
     * Alle Service Metadaten abrufen
     */
    getAllServiceMetadata() {
      const metadata = /* @__PURE__ */ new Map();
      const servicePlans = this.serviceContainer.getAllServicePlans();
      for (const [serviceClass] of servicePlans) {
        metadata.set(serviceClass, this.getServiceMetadata(serviceClass));
      }
      return metadata;
    }
  }
  var ServiceRegistrar$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ServiceRegistrar
  });
  class DependencyMapper {
    constructor(logger2, serviceRegistry) {
      this.logger = logger2;
      this.serviceRegistry = serviceRegistry;
    }
    /**
     * Dependency Graph für alle Services erstellen
     * Single Source of Truth: Holt Services von ServiceRegistry
     */
    buildDependencyGraph() {
      this.logger.info(`[DependencyMapper] 🗺️ Building dependency graph`);
      const graph = /* @__PURE__ */ new Map();
      const allServices = this.serviceRegistry.getAllServices();
      this.logger.info(
        `[DependencyMapper] 📋 Processing ${allServices.length} services from ServiceRegistry`
      );
      for (const ServiceClass of allServices) {
        this.logger.debug(
          `[DependencyMapper] 🔍 Analyzing dependencies for: ${ServiceClass.name || ServiceClass}`
        );
        const dependencies = this.extractDependencies(ServiceClass);
        graph.set(ServiceClass, dependencies);
        this.logger.debug(
          `[DependencyMapper] 🔗 Dependencies for ${ServiceClass.name || ServiceClass}:`,
          {
            count: dependencies.length,
            dependencies: dependencies.map((d) => d.name || d)
          }
        );
      }
      this.logger.info(`[DependencyMapper] ✅ Dependency graph built with ${graph.size} services`);
      return graph;
    }
    /**
     * Dependencies für einen Service extrahieren
     */
    extractDependencies(serviceClass) {
      this.logger.debug(
        `[DependencyMapper] 🔍 Extracting dependencies for: ${serviceClass.name || serviceClass}`
      );
      const staticDependencies = this.extractStaticDependencies(serviceClass);
      if (staticDependencies !== null) {
        this.logger.debug(
          `[DependencyMapper] 📋 Using static dependencies:`,
          staticDependencies.map((d) => d.name || d)
        );
        return staticDependencies;
      } else {
        throw new Error(
          `[DependencyMapper] ❌ Service '${serviceClass.name || serviceClass}' has no static readonly DEPENDENCIES!`
        );
      }
    }
    /**
     * Dependencies aus static readonly DEPENDENCIES property extrahieren
     */
    extractStaticDependencies(serviceClass) {
      const className = serviceClass.CLASS_NAME || serviceClass.className || serviceClass.name || serviceClass;
      this.logger.debug(`[DependencyMapper] 📋 Checking static dependencies for: ${className}`);
      try {
        if (serviceClass.DEPENDENCIES && Array.isArray(serviceClass.DEPENDENCIES)) {
          const filteredDependencies = serviceClass.DEPENDENCIES.filter(Boolean);
          this.logger.debug(`[DependencyMapper] 📋 Found static dependencies for ${className}:`, {
            original: serviceClass.DEPENDENCIES,
            filtered: filteredDependencies,
            count: filteredDependencies.length
          });
          return filteredDependencies;
        }
        this.logger.debug(`[DependencyMapper] 📋 No static dependencies found for: ${className}`);
        return [];
      } catch (error) {
        this.logger.error(
          `[DependencyMapper] 📋 Error extracting static dependencies for ${className}:`,
          error
        );
        return [];
      }
    }
    /**
     * Zirkuläre Dependencies prüfen
     */
    checkCircularDependencies(dependencyGraph) {
      this.logger.info(`[DependencyMapper] 🔍 Checking for circular dependencies`);
      const visited = /* @__PURE__ */ new Set();
      const recursionStack = /* @__PURE__ */ new Set();
      for (const service of dependencyGraph.keys()) {
        if (this.hasCircularDependency(service, dependencyGraph, visited, recursionStack)) {
          this.logger.error(`[DependencyMapper] ❌ Circular dependency detected!`);
          return true;
        }
      }
      this.logger.info(`[DependencyMapper] ✅ No circular dependencies found`);
      return false;
    }
    hasCircularDependency(service, graph, visited, recursionStack) {
      if (recursionStack.has(service)) {
        return true;
      }
      if (visited.has(service)) {
        return false;
      }
      visited.add(service);
      recursionStack.add(service);
      const dependencies = graph.get(service) || [];
      for (const dependency of dependencies) {
        if (this.hasCircularDependency(dependency, graph, visited, recursionStack)) {
          return true;
        }
      }
      recursionStack.delete(service);
      return false;
    }
  }
  var DependencyMapper$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    DependencyMapper
  });
  class APIManager {
    constructor(logger2, serviceContainer) {
      this.logger = logger2;
      this.serviceContainer = serviceContainer;
      this.registeredServices = /* @__PURE__ */ new Map();
    }
    /**
     * Services in globaler API registrieren
     */
    registerInGlobalAPI() {
      this.logger.info(`[APIManager] 🌐 Registering services in global API (lazy)`);
      const moduleApi = this.getModuleAPI();
      if (!moduleApi) {
        this.logger.error(`[APIManager] ❌ Module API not available`);
        return;
      }
      const servicePlans = this.serviceContainer.getAllServicePlans();
      this.logger.info(`[APIManager] 📋 Registering ${servicePlans.size} services in API (lazy)`);
      for (const [serviceClass, plan] of servicePlans) {
        this.registerServiceInAPI(serviceClass, plan, moduleApi);
      }
      this.logger.info(`[APIManager] ✅ All services registered in global API (lazy)`);
      this.logger.info(
        `[APIManager] 📊 Final registered services count: ${this.registeredServices.size}`
      );
    }
    /**
     * Service in API registrieren - LAZY mit Getter-Memoization
     */
    registerServiceInAPI(serviceClass, plan, moduleApi) {
      const apiName = plan.apiName || serviceClass.API_NAME || serviceClass.name;
      const serviceType = plan.serviceType || serviceClass.SERVICE_TYPE;
      this.logger.info(`[APIManager] 🌐 Registering service in API:`, {
        service: serviceClass.name || serviceClass,
        apiName,
        serviceType
      });
      if (!apiName) {
        this.logger.warn(
          `[APIManager] ⚠️ Service has no API name: ${serviceClass.name || serviceClass}`
        );
        return;
      }
      try {
        Object.defineProperty(moduleApi, apiName, {
          configurable: true,
          enumerable: true,
          get: () => {
            const instance = this.serviceContainer.getService(serviceClass);
            Object.defineProperty(moduleApi, apiName, {
              value: instance,
              enumerable: true,
              configurable: false
            });
            return instance;
          }
        });
        if (typeof serviceClass.prototype.create === "function") {
          moduleApi[apiName] = (...args) => {
            const service = this.serviceContainer.getService(serviceClass);
            return service.create(...args);
          };
        }
        this.registeredServices.set(apiName, serviceClass);
        this.logger.info(`[APIManager] ✅ Service registered in API (lazy): ${apiName}`);
      } catch (error) {
        this.logger.error(`[APIManager] ❌ Failed to register service ${apiName}:`, error);
      }
    }
    /**
     * Module API abrufen oder erstellen
     */
    getModuleAPI() {
      let moduleApi = globalThis.game?.modules?.get("relationship-app")?.api;
      if (!moduleApi) {
        this.logger.info(`[APIManager] 🔧 Module API not available, creating it`);
        const module = globalThis.game?.modules?.get("relationship-app");
        if (module) {
          module.api = {};
          moduleApi = module.api;
          this.logger.info(`[APIManager] ✅ Module API created`);
        } else {
          this.logger.error(`[APIManager] ❌ Module 'relationship-app' not found`);
          return null;
        }
      }
      return moduleApi;
    }
    /**
     * Service aus API entfernen
     */
    unregisterFromAPI(apiName) {
      this.logger.info(`[APIManager] 🗑️ Unregistering service from API: ${apiName}`);
      const moduleApi = this.getModuleAPI();
      if (moduleApi && moduleApi[apiName]) {
        delete moduleApi[apiName];
        this.registeredServices.delete(apiName);
        this.logger.info(`[APIManager] ✅ Service unregistered from API: ${apiName}`);
      } else {
        this.logger.info(`[APIManager] ℹ️ Service not found in API: ${apiName}`);
      }
    }
    /**
     * Alle Services aus API entfernen
     */
    unregisterAllFromAPI() {
      this.logger.info(
        `[APIManager] 🗑️ Unregistering all services from API (${this.registeredServices.size} registered)`
      );
      const moduleApi = this.getModuleAPI();
      if (moduleApi) {
        for (const apiName of this.registeredServices.keys()) {
          delete moduleApi[apiName];
        }
      }
      this.registeredServices.clear();
      this.logger.info(`[APIManager] ✅ All services unregistered from API`);
    }
    /**
     * API Metadaten generieren
     */
    generateAPIMetadata() {
      this.logger.info(`[APIManager] 📊 Generating API metadata`);
      const metadata = {
        moduleId: "relationship-app",
        version: "0.14.0",
        services: /* @__PURE__ */ new Map(),
        totalServices: this.registeredServices.size
      };
      const servicePlans = this.serviceContainer.getAllServicePlans();
      for (const [serviceClass, plan] of servicePlans) {
        metadata.services.set(plan.apiName, {
          serviceClass: serviceClass.name || serviceClass,
          apiName: plan.apiName,
          serviceType: plan.serviceType,
          isSingleton: plan.isSingleton,
          dependencies: plan.dependencies.map((d) => d.name || d),
          isRegistered: this.registeredServices.has(plan.apiName)
        });
      }
      this.logger.info(`[APIManager] 📊 API metadata generated:`, {
        totalServices: metadata.totalServices,
        services: Array.from(metadata.services.keys())
      });
      return metadata;
    }
    /**
     * API Status abrufen
     */
    getAPIStatus() {
      const moduleApi = this.getModuleAPI();
      return {
        isAvailable: !!moduleApi,
        registeredServices: this.registeredServices.size,
        serviceNames: Array.from(this.registeredServices.keys()),
        moduleId: "relationship-app"
      };
    }
    /**
     * Service aus API abrufen
     */
    getServiceFromAPI(apiName) {
      const moduleApi = this.getModuleAPI();
      if (!moduleApi) {
        return null;
      }
      return moduleApi[apiName];
    }
    /**
     * Alle Services aus API abrufen
     */
    getAllServicesFromAPI() {
      const moduleApi = this.getModuleAPI();
      if (!moduleApi) {
        return /* @__PURE__ */ new Map();
      }
      const services = /* @__PURE__ */ new Map();
      for (const [apiName, service] of this.registeredServices) {
        services.set(apiName, service);
      }
      return services;
    }
  }
  var APIManager$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APIManager
  });
  const _SettingsService = class _SettingsService {
    constructor(logger2, foundryAdapter2) {
      this.foundryAdapter = foundryAdapter2;
    }
    /**
     * Alle Settings registrieren
     */
    registerAll() {
      if (!this.foundryAdapter) {
        throw new Error("FoundryAdapter not available for settings registration");
      }
      this.foundryAdapter.registerSetting("debugLogs", {
        name: "Debug Logging",
        hint: "Enable detailed debug logging for development",
        scope: "world",
        config: true,
        type: Boolean,
        default: false
      });
      this.foundryAdapter.registerSetting("metadata", {
        name: "Relationship App Metadata",
        hint: "Metadata for the Relationship App",
        scope: "world",
        config: false,
        type: Object
      });
    }
    /**
     * Boolean-Setting abrufen
     */
    getBoolean(key) {
      return this.foundryAdapter?.getSetting(key) ?? false;
    }
    /**
     * String-Setting abrufen
     */
    getString(key, defaultValue = "") {
      return this.foundryAdapter?.getSetting(key) ?? defaultValue;
    }
    /**
     * Number-Setting abrufen
     */
    getNumber(key, defaultValue = 0) {
      return this.foundryAdapter?.getSetting(key) ?? defaultValue;
    }
    /**
     * Object-Setting abrufen
     */
    getObject(key, defaultValue) {
      return this.foundryAdapter?.getSetting(key) ?? defaultValue;
    }
    /**
     * Setting setzen
     */
    async setSetting(key, value) {
      if (!this.foundryAdapter) {
        throw new Error("FoundryAdapter not available for setting update");
      }
      return await this.foundryAdapter.setSetting(key, value);
    }
    /**
     * Debug-Logging aktiviert?
     */
    isDebugLoggingEnabled() {
      return this.getBoolean("debugLogs");
    }
    /**
     * Metadata abrufen
     */
    getMetadata() {
      return this.getObject("metadata", {});
    }
    /**
     * Metadata setzen
     */
    async setMetadata(metadata) {
      return await this.setSetting("metadata", metadata);
    }
  };
  _SettingsService.API_NAME = "settingsService";
  _SettingsService.SERVICE_TYPE = "singleton";
  _SettingsService.CLASS_NAME = "SettingsService";
  _SettingsService.DEPENDENCIES = [];
  let SettingsService = _SettingsService;
  var SettingsService$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    SettingsService
  });
  const SERVICE_CONFIG = [
    // 🏗️ Cross-Cutting Concerns (Grundbausteine)
    // Diese Services werden überall gebraucht
    { name: FoundryLogger, class: FoundryLogger },
    // Logging-System
    { name: ConsoleErrorHandler, class: ConsoleErrorHandler },
    // Fehlerbehandlung
    { name: FoundryAdapter, class: FoundryAdapter },
    // Foundry VTT API
    { name: NotificationService, class: NotificationService },
    // Benachrichtigungen
    // 🎨 Svelte & UI Services (Benutzeroberfläche)
    { name: SvelteManager, class: SvelteManager },
    // Svelte-Komponenten
    { name: CSSManager, class: CSSManager },
    // Styling
    // 🔧 Application Services (Anwendungslogik)
    { name: GraphService, class: GraphService },
    { name: SettingsService, class: SettingsService }
    // Hier kommen später die Business-Services hin
  ];
  function createElement(config) {
    return {
      id: config.field,
      name: config.field,
      label: config.label || config.field,
      type: config.type,
      required: config.required || false,
      placeholder: config.placeholder || "",
      default: config.default,
      options: config.options || [],
      description: config.description || "",
      category: config.category || "Allgemein",
      validation: config.validation || {},
      ui: {
        width: config.ui?.width || "full",
        multiline: config.ui?.multiline || false,
        rows: config.ui?.rows || 3,
        disabled: config.ui?.disabled || false,
        readonly: config.ui?.readonly || false
      },
      showIf: config.showIf
    };
  }
  function createTextElement(field, options = {}) {
    return createElement({
      field,
      type: options.multiline ? "textarea" : "text",
      label: options.label,
      required: options.required,
      placeholder: options.placeholder,
      default: options.default,
      description: options.description,
      category: options.category,
      validation: options.validation,
      showIf: options.showIf,
      ui: {
        width: "full",
        multiline: options.multiline,
        rows: options.multiline ? 3 : void 0
      }
    });
  }
  function createSelectElement(field, options) {
    return createElement({
      field,
      type: "select",
      label: options.label,
      required: options.required,
      options: options.options,
      default: options.default,
      description: options.description,
      category: options.category
    });
  }
  function createMultiSelectElement(field, options) {
    return createElement({
      field,
      type: "multiselect",
      label: options.label,
      required: options.required,
      options: options.options,
      default: options.default || [],
      description: options.description,
      category: options.category
    });
  }
  function createNumberElement(field, options = {}) {
    return createElement({
      field,
      type: "number",
      label: options.label,
      required: options.required,
      placeholder: options.placeholder,
      default: options.default,
      description: options.description,
      category: options.category,
      validation: {
        min: options.min,
        max: options.max
      }
    });
  }
  function createBooleanElement(field, options = {}) {
    return createElement({
      field,
      type: "boolean",
      label: options.label,
      required: options.required,
      default: options.default,
      description: options.description,
      category: options.category
    });
  }
  function createTextareaElement(field, options = {}) {
    return createElement({
      field,
      type: "textarea",
      label: options.label,
      required: options.required,
      placeholder: options.placeholder,
      default: options.default,
      description: options.description,
      category: options.category,
      ui: {
        width: "full",
        multiline: true,
        rows: options.rows || 3
      }
    });
  }
  function createOptions(...options) {
    return options;
  }
  function createOptionsWithLabels(options) {
    return Object.entries(options).map(([value, label2]) => ({ value, label: label2 }));
  }
  function createGroup(title, elements) {
    return { type: "group", title, elements };
  }
  function handleCheckboxChange(e, updateValue) {
    const target = e.target;
    updateValue(target.checked);
  }
  function handleSelectChange(e, updateValue) {
    const target = e.target;
    updateValue(target.value);
  }
  var on_input = (
    // Multi-Select Funktionen
    // Option hinzufügen
    // Option entfernen
    // CSS-Klassen für Feldbreite
    // CSS-Klassen für Fehlerzustand
    (e, updateValue) => updateValue(e.target.value)
  );
  var root_2$1 = /* @__PURE__ */ from_html(`<small class="field-description svelte-1ykx1li"> </small>`);
  var root_3$2 = /* @__PURE__ */ from_html(`<div class="field-error svelte-1ykx1li"> </div>`);
  var root_1$2 = /* @__PURE__ */ from_html(`<div><label class="field-label svelte-1ykx1li"> </label> <input type="text" class="field-input svelte-1ykx1li"/> <!> <!></div>`);
  var on_input_1 = (e, updateValue) => updateValue(e.target.value);
  var root_6 = /* @__PURE__ */ from_html(`<small class="field-description svelte-1ykx1li"> </small>`);
  var root_7$1 = /* @__PURE__ */ from_html(`<div class="field-error svelte-1ykx1li"> </div>`);
  var root_5$2 = /* @__PURE__ */ from_html(`<div><label class="field-label svelte-1ykx1li"> </label> <textarea class="field-textarea svelte-1ykx1li"></textarea> <!> <!></div>`);
  var root_11$1 = /* @__PURE__ */ from_html(`<option> </option>`);
  var root_12 = /* @__PURE__ */ from_html(`<option> </option>`);
  var root_13 = /* @__PURE__ */ from_html(`<small class="field-description svelte-1ykx1li"> </small>`);
  var root_14 = /* @__PURE__ */ from_html(`<div class="field-error svelte-1ykx1li"> </div>`);
  var root_9$1 = /* @__PURE__ */ from_html(`<div><label class="field-label svelte-1ykx1li"> </label> <select class="field-select svelte-1ykx1li"><option>Bitte wählen...</option><!></select> <!> <!></div>`);
  var on_change = (e, toggleSelection, option) => toggleSelection(get$1(option), e.target.checked);
  var root_18 = /* @__PURE__ */ from_html(`<label class="checkbox-option svelte-1ykx1li"><input type="checkbox" class="svelte-1ykx1li"/> <span class="svelte-1ykx1li"> </span></label>`);
  var on_change_1 = (e, toggleSelection, option) => toggleSelection(get$1(option).value, e.target.checked);
  var root_19 = /* @__PURE__ */ from_html(`<label class="checkbox-option svelte-1ykx1li"><input type="checkbox" class="svelte-1ykx1li"/> <span class="svelte-1ykx1li"> </span></label>`);
  var root_20 = /* @__PURE__ */ from_html(`<small class="field-description svelte-1ykx1li"> </small>`);
  var root_21 = /* @__PURE__ */ from_html(`<div class="field-error svelte-1ykx1li"> </div>`);
  var root_16 = /* @__PURE__ */ from_html(`<div><div class="field-label svelte-1ykx1li"> </div> <div class="checkbox-group svelte-1ykx1li"></div> <!> <!></div>`);
  var root_24 = /* @__PURE__ */ from_html(`<small class="field-description svelte-1ykx1li"> </small>`);
  var root_25 = /* @__PURE__ */ from_html(`<div class="field-error svelte-1ykx1li"> </div>`);
  var root_23 = /* @__PURE__ */ from_html(`<div><label class="field-label checkbox-label svelte-1ykx1li"><input type="checkbox" class="field-checkbox svelte-1ykx1li"/> <span class="checkbox-text svelte-1ykx1li"> </span></label> <!> <!></div>`);
  var on_input_2 = (e, updateValue) => updateValue(Number(e.target.value));
  var root_28 = /* @__PURE__ */ from_html(`<small class="field-description svelte-1ykx1li"> </small>`);
  var root_29 = /* @__PURE__ */ from_html(`<div class="field-error svelte-1ykx1li"> </div>`);
  var root_27 = /* @__PURE__ */ from_html(`<div><label class="field-label svelte-1ykx1li"> </label> <input type="number" class="field-input svelte-1ykx1li"/> <!> <!></div>`);
  var on_change_2 = (e, updateValue) => updateValue(e.target.value);
  var root_32 = /* @__PURE__ */ from_html(`<small class="field-description svelte-1ykx1li"> </small>`);
  var root_33 = /* @__PURE__ */ from_html(`<div class="field-error svelte-1ykx1li"> </div>`);
  var root_31 = /* @__PURE__ */ from_html(`<div><label class="field-label svelte-1ykx1li"> </label> <input type="date" class="field-input svelte-1ykx1li"/> <!> <!></div>`);
  var on_change_3 = (e, updateValue) => updateValue(e.target.value);
  var on_input_3 = (e, updateValue) => updateValue(e.target.value);
  var root_36 = /* @__PURE__ */ from_html(`<small class="field-description svelte-1ykx1li"> </small>`);
  var root_37 = /* @__PURE__ */ from_html(`<div class="field-error svelte-1ykx1li"> </div>`);
  var root_35 = /* @__PURE__ */ from_html(`<div><label class="field-label svelte-1ykx1li"> </label> <div class="color-input-container"><input type="color" class="field-color svelte-1ykx1li"/> <input type="text" class="field-color-text svelte-1ykx1li" placeholder="#000000"/></div> <!> <!></div>`);
  var on_input_4 = (e, updateValue) => updateValue(e.target.value);
  var root_39 = /* @__PURE__ */ from_html(`<small class="field-description svelte-1ykx1li"> </small>`);
  var root_40 = /* @__PURE__ */ from_html(`<div class="field-error svelte-1ykx1li"> </div>`);
  var root_38 = /* @__PURE__ */ from_html(`<div><label class="field-label svelte-1ykx1li"> </label> <input type="text" class="field-input svelte-1ykx1li"/> <!> <!></div>`);
  function DynamicFormField($$anchor, $$props) {
    push($$props, true);
    function updateValue(newValue) {
      $$props.onUpdate(newValue);
    }
    function handleBlur(e) {
      const target = e.target;
      updateValue(target.value);
    }
    function toggleSelection(optionValue, checked) {
      const currentValues = $$props.value || [];
      let newValues;
      if (checked) {
        newValues = [...currentValues, optionValue];
      } else {
        newValues = currentValues.filter((v) => v !== optionValue);
      }
      updateValue(newValues);
    }
    const fieldWidthClass = /* @__PURE__ */ user_derived(() => `field-width-${$$props.element.ui?.width || "full"}`);
    const fieldClasses = /* @__PURE__ */ user_derived(() => [
      "form-field",
      get$1(fieldWidthClass),
      $$props.error ? "has-error" : "",
      $$props.element.ui?.disabled ? "disabled" : "",
      $$props.element.ui?.readonly ? "readonly" : ""
    ].filter(Boolean).join(" "));
    var fragment = comment();
    var node = first_child(fragment);
    {
      var consequent_2 = ($$anchor2) => {
        var div = root_1$2();
        var label2 = child(div);
        var text2 = child(label2);
        reset(label2);
        var input = sibling(label2, 2);
        remove_input_defaults(input);
        input.__input = [on_input, updateValue];
        var node_1 = sibling(input, 2);
        {
          var consequent = ($$anchor3) => {
            var small = root_2$1();
            var text_1 = child(small, true);
            reset(small);
            template_effect(() => set_text(text_1, $$props.element.description));
            append($$anchor3, small);
          };
          if_block(node_1, ($$render) => {
            if ($$props.element.description) $$render(consequent);
          });
        }
        var node_2 = sibling(node_1, 2);
        {
          var consequent_1 = ($$anchor3) => {
            var div_1 = root_3$2();
            var text_2 = child(div_1, true);
            reset(div_1);
            template_effect(() => set_text(text_2, $$props.error));
            append($$anchor3, div_1);
          };
          if_block(node_2, ($$render) => {
            if ($$props.error) $$render(consequent_1);
          });
        }
        reset(div);
        template_effect(() => {
          set_class(div, 1, clsx(get$1(fieldClasses)), "svelte-1ykx1li");
          set_attribute(label2, "for", $$props.element.id);
          set_text(text2, `${$$props.element.label ?? ""}${$$props.element.required ? " *" : ""}`);
          set_attribute(input, "id", $$props.element.id);
          set_value(input, $$props.value || "");
          set_attribute(input, "placeholder", $$props.element.placeholder || "");
          input.required = $$props.element.required || false;
          input.disabled = $$props.element.ui?.disabled || false;
          input.readOnly = $$props.element.ui?.readonly || false;
        });
        event("blur", input, handleBlur);
        append($$anchor2, div);
      };
      var alternate = ($$anchor2, $$elseif) => {
        {
          var consequent_5 = ($$anchor3) => {
            var div_2 = root_5$2();
            var label_1 = child(div_2);
            var text_3 = child(label_1);
            reset(label_1);
            var textarea = sibling(label_1, 2);
            remove_textarea_child(textarea);
            textarea.__input = [on_input_1, updateValue];
            var node_3 = sibling(textarea, 2);
            {
              var consequent_3 = ($$anchor4) => {
                var small_1 = root_6();
                var text_4 = child(small_1, true);
                reset(small_1);
                template_effect(() => set_text(text_4, $$props.element.description));
                append($$anchor4, small_1);
              };
              if_block(node_3, ($$render) => {
                if ($$props.element.description) $$render(consequent_3);
              });
            }
            var node_4 = sibling(node_3, 2);
            {
              var consequent_4 = ($$anchor4) => {
                var div_3 = root_7$1();
                var text_5 = child(div_3, true);
                reset(div_3);
                template_effect(() => set_text(text_5, $$props.error));
                append($$anchor4, div_3);
              };
              if_block(node_4, ($$render) => {
                if ($$props.error) $$render(consequent_4);
              });
            }
            reset(div_2);
            template_effect(() => {
              set_class(div_2, 1, clsx(get$1(fieldClasses)), "svelte-1ykx1li");
              set_attribute(label_1, "for", $$props.element.id);
              set_text(text_3, `${$$props.element.label ?? ""}${$$props.element.required ? " *" : ""}`);
              set_attribute(textarea, "id", $$props.element.id);
              set_attribute(textarea, "rows", $$props.element.ui?.rows || 3);
              set_attribute(textarea, "placeholder", $$props.element.placeholder || "");
              textarea.required = $$props.element.required || false;
              textarea.disabled = $$props.element.ui?.disabled || false;
              textarea.readOnly = $$props.element.ui?.readonly || false;
              set_value(textarea, $$props.value || "");
            });
            event("blur", textarea, handleBlur);
            append($$anchor3, div_2);
          };
          var alternate_1 = ($$anchor3, $$elseif2) => {
            {
              var consequent_9 = ($$anchor4) => {
                var div_4 = root_9$1();
                var label_2 = child(div_4);
                var text_6 = child(label_2);
                reset(label_2);
                var select = sibling(label_2, 2);
                select.__change = [handleSelectChange, updateValue];
                var option_1 = child(select);
                option_1.value = option_1.__value = "";
                var node_5 = sibling(option_1);
                each(node_5, 17, () => $$props.element.options || [], index, ($$anchor5, option) => {
                  var fragment_1 = comment();
                  var node_6 = first_child(fragment_1);
                  {
                    var consequent_6 = ($$anchor6) => {
                      var option_2 = root_11$1();
                      var text_7 = child(option_2, true);
                      reset(option_2);
                      var option_2_value = {};
                      template_effect(() => {
                        set_selected(option_2, $$props.value === get$1(option));
                        set_text(text_7, get$1(option));
                        if (option_2_value !== (option_2_value = get$1(option))) {
                          option_2.value = (option_2.__value = get$1(option)) ?? "";
                        }
                      });
                      append($$anchor6, option_2);
                    };
                    var alternate_2 = ($$anchor6) => {
                      var option_3 = root_12();
                      var text_8 = child(option_3, true);
                      reset(option_3);
                      var option_3_value = {};
                      template_effect(() => {
                        set_selected(option_3, $$props.value === get$1(option).value);
                        set_text(text_8, get$1(option).label || get$1(option).value);
                        if (option_3_value !== (option_3_value = get$1(option).value)) {
                          option_3.value = (option_3.__value = get$1(option).value) ?? "";
                        }
                      });
                      append($$anchor6, option_3);
                    };
                    if_block(node_6, ($$render) => {
                      if (typeof get$1(option) === "string") $$render(consequent_6);
                      else $$render(alternate_2, false);
                    });
                  }
                  append($$anchor5, fragment_1);
                });
                reset(select);
                var node_7 = sibling(select, 2);
                {
                  var consequent_7 = ($$anchor5) => {
                    var small_2 = root_13();
                    var text_9 = child(small_2, true);
                    reset(small_2);
                    template_effect(() => set_text(text_9, $$props.element.description));
                    append($$anchor5, small_2);
                  };
                  if_block(node_7, ($$render) => {
                    if ($$props.element.description) $$render(consequent_7);
                  });
                }
                var node_8 = sibling(node_7, 2);
                {
                  var consequent_8 = ($$anchor5) => {
                    var div_5 = root_14();
                    var text_10 = child(div_5, true);
                    reset(div_5);
                    template_effect(() => set_text(text_10, $$props.error));
                    append($$anchor5, div_5);
                  };
                  if_block(node_8, ($$render) => {
                    if ($$props.error) $$render(consequent_8);
                  });
                }
                reset(div_4);
                template_effect(() => {
                  set_class(div_4, 1, clsx(get$1(fieldClasses)), "svelte-1ykx1li");
                  set_attribute(label_2, "for", $$props.element.id);
                  set_text(text_6, `${$$props.element.label ?? ""}${$$props.element.required ? " *" : ""}`);
                  set_attribute(select, "id", $$props.element.id);
                  select.required = $$props.element.required || false;
                  select.disabled = $$props.element.ui?.disabled || false;
                });
                append($$anchor4, div_4);
              };
              var alternate_3 = ($$anchor4, $$elseif3) => {
                {
                  var consequent_13 = ($$anchor5) => {
                    var div_6 = root_16();
                    var div_7 = child(div_6);
                    var text_11 = child(div_7);
                    reset(div_7);
                    var div_8 = sibling(div_7, 2);
                    each(div_8, 21, () => $$props.element.options || [], index, ($$anchor6, option) => {
                      var fragment_2 = comment();
                      var node_9 = first_child(fragment_2);
                      {
                        var consequent_10 = ($$anchor7) => {
                          var label_3 = root_18();
                          var input_1 = child(label_3);
                          remove_input_defaults(input_1);
                          input_1.__change = [on_change, toggleSelection, option];
                          var span = sibling(input_1, 2);
                          var text_12 = child(span, true);
                          reset(span);
                          reset(label_3);
                          template_effect(
                            ($0) => {
                              set_checked(input_1, $0);
                              set_text(text_12, get$1(option));
                            },
                            [() => ($$props.value || []).includes(get$1(option))]
                          );
                          append($$anchor7, label_3);
                        };
                        var alternate_4 = ($$anchor7) => {
                          var label_4 = root_19();
                          var input_2 = child(label_4);
                          remove_input_defaults(input_2);
                          input_2.__change = [on_change_1, toggleSelection, option];
                          var span_1 = sibling(input_2, 2);
                          var text_13 = child(span_1, true);
                          reset(span_1);
                          reset(label_4);
                          template_effect(
                            ($0) => {
                              set_checked(input_2, $0);
                              set_text(text_13, get$1(option).label || get$1(option).value);
                            },
                            [() => ($$props.value || []).includes(get$1(option).value)]
                          );
                          append($$anchor7, label_4);
                        };
                        if_block(node_9, ($$render) => {
                          if (typeof get$1(option) === "string") $$render(consequent_10);
                          else $$render(alternate_4, false);
                        });
                      }
                      append($$anchor6, fragment_2);
                    });
                    reset(div_8);
                    var node_10 = sibling(div_8, 2);
                    {
                      var consequent_11 = ($$anchor6) => {
                        var small_3 = root_20();
                        var text_14 = child(small_3, true);
                        reset(small_3);
                        template_effect(() => set_text(text_14, $$props.element.description));
                        append($$anchor6, small_3);
                      };
                      if_block(node_10, ($$render) => {
                        if ($$props.element.description) $$render(consequent_11);
                      });
                    }
                    var node_11 = sibling(node_10, 2);
                    {
                      var consequent_12 = ($$anchor6) => {
                        var div_9 = root_21();
                        var text_15 = child(div_9, true);
                        reset(div_9);
                        template_effect(() => set_text(text_15, $$props.error));
                        append($$anchor6, div_9);
                      };
                      if_block(node_11, ($$render) => {
                        if ($$props.error) $$render(consequent_12);
                      });
                    }
                    reset(div_6);
                    template_effect(() => {
                      set_class(div_6, 1, clsx(get$1(fieldClasses)), "svelte-1ykx1li");
                      set_text(text_11, `${$$props.element.label ?? ""}${$$props.element.required ? " *" : ""}`);
                    });
                    append($$anchor5, div_6);
                  };
                  var alternate_5 = ($$anchor5, $$elseif4) => {
                    {
                      var consequent_16 = ($$anchor6) => {
                        var div_10 = root_23();
                        var label_5 = child(div_10);
                        var input_3 = child(label_5);
                        remove_input_defaults(input_3);
                        input_3.__change = [handleCheckboxChange, updateValue];
                        var span_2 = sibling(input_3, 2);
                        var text_16 = child(span_2);
                        reset(span_2);
                        reset(label_5);
                        var node_12 = sibling(label_5, 2);
                        {
                          var consequent_14 = ($$anchor7) => {
                            var small_4 = root_24();
                            var text_17 = child(small_4, true);
                            reset(small_4);
                            template_effect(() => set_text(text_17, $$props.element.description));
                            append($$anchor7, small_4);
                          };
                          if_block(node_12, ($$render) => {
                            if ($$props.element.description) $$render(consequent_14);
                          });
                        }
                        var node_13 = sibling(node_12, 2);
                        {
                          var consequent_15 = ($$anchor7) => {
                            var div_11 = root_25();
                            var text_18 = child(div_11, true);
                            reset(div_11);
                            template_effect(() => set_text(text_18, $$props.error));
                            append($$anchor7, div_11);
                          };
                          if_block(node_13, ($$render) => {
                            if ($$props.error) $$render(consequent_15);
                          });
                        }
                        reset(div_10);
                        template_effect(() => {
                          set_class(div_10, 1, clsx(get$1(fieldClasses)), "svelte-1ykx1li");
                          set_attribute(input_3, "id", $$props.element.id);
                          set_checked(input_3, $$props.value || false);
                          input_3.disabled = $$props.element.ui?.disabled || false;
                          set_text(text_16, `${$$props.element.label ?? ""}${$$props.element.required ? " *" : ""}`);
                        });
                        append($$anchor6, div_10);
                      };
                      var alternate_6 = ($$anchor6, $$elseif5) => {
                        {
                          var consequent_19 = ($$anchor7) => {
                            var div_12 = root_27();
                            var label_6 = child(div_12);
                            var text_19 = child(label_6);
                            reset(label_6);
                            var input_4 = sibling(label_6, 2);
                            remove_input_defaults(input_4);
                            input_4.__input = [on_input_2, updateValue];
                            var node_14 = sibling(input_4, 2);
                            {
                              var consequent_17 = ($$anchor8) => {
                                var small_5 = root_28();
                                var text_20 = child(small_5, true);
                                reset(small_5);
                                template_effect(() => set_text(text_20, $$props.element.description));
                                append($$anchor8, small_5);
                              };
                              if_block(node_14, ($$render) => {
                                if ($$props.element.description) $$render(consequent_17);
                              });
                            }
                            var node_15 = sibling(node_14, 2);
                            {
                              var consequent_18 = ($$anchor8) => {
                                var div_13 = root_29();
                                var text_21 = child(div_13, true);
                                reset(div_13);
                                template_effect(() => set_text(text_21, $$props.error));
                                append($$anchor8, div_13);
                              };
                              if_block(node_15, ($$render) => {
                                if ($$props.error) $$render(consequent_18);
                              });
                            }
                            reset(div_12);
                            template_effect(() => {
                              set_class(div_12, 1, clsx(get$1(fieldClasses)), "svelte-1ykx1li");
                              set_attribute(label_6, "for", $$props.element.id);
                              set_text(text_19, `${$$props.element.label ?? ""}${$$props.element.required ? " *" : ""}`);
                              set_attribute(input_4, "id", $$props.element.id);
                              set_value(input_4, $$props.value || "");
                              set_attribute(input_4, "placeholder", $$props.element.placeholder || "");
                              input_4.required = $$props.element.required || false;
                              set_attribute(input_4, "min", $$props.element.validation?.min);
                              set_attribute(input_4, "max", $$props.element.validation?.max);
                              input_4.disabled = $$props.element.ui?.disabled || false;
                              input_4.readOnly = $$props.element.ui?.readonly || false;
                            });
                            event("blur", input_4, handleBlur);
                            append($$anchor7, div_12);
                          };
                          var alternate_7 = ($$anchor7, $$elseif6) => {
                            {
                              var consequent_22 = ($$anchor8) => {
                                var div_14 = root_31();
                                var label_7 = child(div_14);
                                var text_22 = child(label_7);
                                reset(label_7);
                                var input_5 = sibling(label_7, 2);
                                remove_input_defaults(input_5);
                                input_5.__change = [on_change_2, updateValue];
                                var node_16 = sibling(input_5, 2);
                                {
                                  var consequent_20 = ($$anchor9) => {
                                    var small_6 = root_32();
                                    var text_23 = child(small_6, true);
                                    reset(small_6);
                                    template_effect(() => set_text(text_23, $$props.element.description));
                                    append($$anchor9, small_6);
                                  };
                                  if_block(node_16, ($$render) => {
                                    if ($$props.element.description) $$render(consequent_20);
                                  });
                                }
                                var node_17 = sibling(node_16, 2);
                                {
                                  var consequent_21 = ($$anchor9) => {
                                    var div_15 = root_33();
                                    var text_24 = child(div_15, true);
                                    reset(div_15);
                                    template_effect(() => set_text(text_24, $$props.error));
                                    append($$anchor9, div_15);
                                  };
                                  if_block(node_17, ($$render) => {
                                    if ($$props.error) $$render(consequent_21);
                                  });
                                }
                                reset(div_14);
                                template_effect(() => {
                                  set_class(div_14, 1, clsx(get$1(fieldClasses)), "svelte-1ykx1li");
                                  set_attribute(label_7, "for", $$props.element.id);
                                  set_text(text_22, `${$$props.element.label ?? ""}${$$props.element.required ? " *" : ""}`);
                                  set_attribute(input_5, "id", $$props.element.id);
                                  set_value(input_5, $$props.value || "");
                                  input_5.required = $$props.element.required || false;
                                  input_5.disabled = $$props.element.ui?.disabled || false;
                                  input_5.readOnly = $$props.element.ui?.readonly || false;
                                });
                                append($$anchor8, div_14);
                              };
                              var alternate_8 = ($$anchor8, $$elseif7) => {
                                {
                                  var consequent_25 = ($$anchor9) => {
                                    var div_16 = root_35();
                                    var label_8 = child(div_16);
                                    var text_25 = child(label_8);
                                    reset(label_8);
                                    var div_17 = sibling(label_8, 2);
                                    var input_6 = child(div_17);
                                    remove_input_defaults(input_6);
                                    input_6.__change = [on_change_3, updateValue];
                                    var input_7 = sibling(input_6, 2);
                                    remove_input_defaults(input_7);
                                    input_7.__input = [on_input_3, updateValue];
                                    reset(div_17);
                                    var node_18 = sibling(div_17, 2);
                                    {
                                      var consequent_23 = ($$anchor10) => {
                                        var small_7 = root_36();
                                        var text_26 = child(small_7, true);
                                        reset(small_7);
                                        template_effect(() => set_text(text_26, $$props.element.description));
                                        append($$anchor10, small_7);
                                      };
                                      if_block(node_18, ($$render) => {
                                        if ($$props.element.description) $$render(consequent_23);
                                      });
                                    }
                                    var node_19 = sibling(node_18, 2);
                                    {
                                      var consequent_24 = ($$anchor10) => {
                                        var div_18 = root_37();
                                        var text_27 = child(div_18, true);
                                        reset(div_18);
                                        template_effect(() => set_text(text_27, $$props.error));
                                        append($$anchor10, div_18);
                                      };
                                      if_block(node_19, ($$render) => {
                                        if ($$props.error) $$render(consequent_24);
                                      });
                                    }
                                    reset(div_16);
                                    template_effect(() => {
                                      set_class(div_16, 1, clsx(get$1(fieldClasses)), "svelte-1ykx1li");
                                      set_attribute(label_8, "for", $$props.element.id);
                                      set_text(text_25, `${$$props.element.label ?? ""}${$$props.element.required ? " *" : ""}`);
                                      set_attribute(input_6, "id", $$props.element.id);
                                      set_value(input_6, $$props.value || "#000000");
                                      input_6.required = $$props.element.required || false;
                                      input_6.disabled = $$props.element.ui?.disabled || false;
                                      set_value(input_7, $$props.value || "#000000");
                                      input_7.required = $$props.element.required || false;
                                      input_7.disabled = $$props.element.ui?.disabled || false;
                                      input_7.readOnly = $$props.element.ui?.readonly || false;
                                    });
                                    event("blur", input_7, handleBlur);
                                    append($$anchor9, div_16);
                                  };
                                  var alternate_9 = ($$anchor9) => {
                                    var div_19 = root_38();
                                    var label_9 = child(div_19);
                                    var text_28 = child(label_9);
                                    reset(label_9);
                                    var input_8 = sibling(label_9, 2);
                                    remove_input_defaults(input_8);
                                    input_8.__input = [on_input_4, updateValue];
                                    var node_20 = sibling(input_8, 2);
                                    {
                                      var consequent_26 = ($$anchor10) => {
                                        var small_8 = root_39();
                                        var text_29 = child(small_8, true);
                                        reset(small_8);
                                        template_effect(() => set_text(text_29, $$props.element.description));
                                        append($$anchor10, small_8);
                                      };
                                      if_block(node_20, ($$render) => {
                                        if ($$props.element.description) $$render(consequent_26);
                                      });
                                    }
                                    var node_21 = sibling(node_20, 2);
                                    {
                                      var consequent_27 = ($$anchor10) => {
                                        var div_20 = root_40();
                                        var text_30 = child(div_20, true);
                                        reset(div_20);
                                        template_effect(() => set_text(text_30, $$props.error));
                                        append($$anchor10, div_20);
                                      };
                                      if_block(node_21, ($$render) => {
                                        if ($$props.error) $$render(consequent_27);
                                      });
                                    }
                                    reset(div_19);
                                    template_effect(() => {
                                      set_class(div_19, 1, clsx(get$1(fieldClasses)), "svelte-1ykx1li");
                                      set_attribute(label_9, "for", $$props.element.id);
                                      set_text(text_28, `${$$props.element.label ?? ""}${$$props.element.required ? " *" : ""}`);
                                      set_attribute(input_8, "id", $$props.element.id);
                                      set_value(input_8, $$props.value || "");
                                      set_attribute(input_8, "placeholder", $$props.element.placeholder || "");
                                      input_8.required = $$props.element.required || false;
                                      input_8.disabled = $$props.element.ui?.disabled || false;
                                      input_8.readOnly = $$props.element.ui?.readonly || false;
                                    });
                                    event("blur", input_8, handleBlur);
                                    append($$anchor9, div_19);
                                  };
                                  if_block(
                                    $$anchor8,
                                    ($$render) => {
                                      if ($$props.element.type === "color") $$render(consequent_25);
                                      else $$render(alternate_9, false);
                                    },
                                    $$elseif7
                                  );
                                }
                              };
                              if_block(
                                $$anchor7,
                                ($$render) => {
                                  if ($$props.element.type === "date") $$render(consequent_22);
                                  else $$render(alternate_8, false);
                                },
                                $$elseif6
                              );
                            }
                          };
                          if_block(
                            $$anchor6,
                            ($$render) => {
                              if ($$props.element.type === "number") $$render(consequent_19);
                              else $$render(alternate_7, false);
                            },
                            $$elseif5
                          );
                        }
                      };
                      if_block(
                        $$anchor5,
                        ($$render) => {
                          if ($$props.element.type === "boolean") $$render(consequent_16);
                          else $$render(alternate_6, false);
                        },
                        $$elseif4
                      );
                    }
                  };
                  if_block(
                    $$anchor4,
                    ($$render) => {
                      if ($$props.element.type === "multiselect") $$render(consequent_13);
                      else $$render(alternate_5, false);
                    },
                    $$elseif3
                  );
                }
              };
              if_block(
                $$anchor3,
                ($$render) => {
                  if ($$props.element.type === "select") $$render(consequent_9);
                  else $$render(alternate_3, false);
                },
                $$elseif2
              );
            }
          };
          if_block(
            $$anchor2,
            ($$render) => {
              if ($$props.element.type === "textarea") $$render(consequent_5);
              else $$render(alternate_1, false);
            },
            $$elseif
          );
        }
      };
      if_block(node, ($$render) => {
        if ($$props.element.type === "text") $$render(consequent_2);
        else $$render(alternate, false);
      });
    }
    append($$anchor, fragment);
    pop();
  }
  delegate(["input", "change"]);
  var root_1$1 = /* @__PURE__ */ from_html(`<p class="form-description svelte-1hegfbw"> </p>`);
  var root_3$1 = /* @__PURE__ */ from_html(`<div class="field-container svelte-1hegfbw"><!></div>`);
  var root_4 = /* @__PURE__ */ from_html(`<span class="spinner svelte-1hegfbw"></span>`);
  var root_5$1 = /* @__PURE__ */ from_html(`<button type="button" class="btn btn-secondary svelte-1hegfbw"> </button>`);
  var root$2 = /* @__PURE__ */ from_html(`<div><div class="form-header svelte-1hegfbw"><h3 class="form-title svelte-1hegfbw"> </h3> <!></div> <form class="dynamic-form svelte-1hegfbw"><!> <div class="form-actions svelte-1hegfbw"><button type="submit" class="btn btn-primary svelte-1hegfbw"><!> </button> <!></div></form></div>`);
  function DynamicFormSheet($$anchor, $$props) {
    push($$props, true);
    let formValues = /* @__PURE__ */ state(proxy({}));
    let errors = /* @__PURE__ */ state(proxy({}));
    let isSubmitting = /* @__PURE__ */ state(false);
    const defaultConfig = {
      submitLabel: "Speichern",
      cancelLabel: "Abbrechen",
      showCancelButton: true,
      modalSize: "medium",
      embedding: { mode: "embedded", zIndex: 1e3, animation: "fade" },
      validation: { location: "child", timing: "onSubmit" },
      styling: { theme: "foundry", inheritParentStyles: true }
    };
    const mergedConfig = /* @__PURE__ */ user_derived(() => ({
      ...defaultConfig,
      ...$$props.config,
      embedding: { ...defaultConfig.embedding, ...$$props.config.embedding },
      validation: { ...defaultConfig.validation, ...$$props.config.validation },
      styling: { ...defaultConfig.styling, ...$$props.config.styling }
    }));
    user_effect(() => {
      if ($$props.config.initialValues) {
        set(formValues, { ...$$props.config.initialValues }, true);
      } else {
        const defaults = {};
        $$props.config.elements.forEach((element2) => {
          if (element2.default !== void 0) {
            defaults[element2.name] = element2.default;
          }
        });
        set(formValues, defaults, true);
      }
      scrollToFirstField();
    });
    function updateFieldValue(fieldName, value) {
      set(formValues, { ...get$1(formValues), [fieldName]: value }, true);
      if (get$1(mergedConfig).validation.timing === "onChange") {
        validateField(fieldName);
      }
      if (get$1(mergedConfig).state?.shareIntermediateValues && get$1(mergedConfig).state?.onIntermediateUpdate) {
        get$1(mergedConfig).state.onIntermediateUpdate(get$1(formValues));
      }
    }
    function validateField(fieldName) {
      const element2 = $$props.config.elements.find((e) => e.name === fieldName);
      if (!element2) return;
      const fieldErrors = [];
      if (element2.required && (!get$1(formValues)[fieldName] || get$1(formValues)[fieldName] === "")) {
        fieldErrors.push(`${element2.label} ist erforderlich`);
      }
      if (element2.validation?.pattern && get$1(formValues)[fieldName]) {
        const regex = new RegExp(element2.validation.pattern);
        if (!regex.test(get$1(formValues)[fieldName])) {
          fieldErrors.push(`${element2.label} entspricht nicht dem erwarteten Format`);
        }
      }
      if (element2.type === "number" && get$1(formValues)[fieldName] !== void 0) {
        const numValue = Number(get$1(formValues)[fieldName]);
        if (element2.validation?.min !== void 0 && numValue < element2.validation.min) {
          fieldErrors.push(`${element2.label} muss mindestens ${element2.validation.min} sein`);
        }
        if (element2.validation?.max !== void 0 && numValue > element2.validation.max) {
          fieldErrors.push(`${element2.label} darf maximal ${element2.validation.max} sein`);
        }
      }
      if (element2.validation?.custom) {
        const customError = element2.validation.custom(get$1(formValues)[fieldName]);
        if (customError) fieldErrors.push(customError);
      }
      if (fieldErrors.length > 0) {
        get$1(errors)[fieldName] = fieldErrors.join(", ");
        scrollToField(fieldName);
      } else {
        delete get$1(errors)[fieldName];
        set(errors, { ...get$1(errors) }, true);
      }
    }
    function validateAllFields() {
      $$props.config.elements.forEach((element2) => validateField(element2.name));
      return Object.keys(get$1(errors)).length === 0;
    }
    function scrollToField(fieldName) {
      const fieldElement = document.querySelector(`[data-field-name="${fieldName}"]`);
      if (fieldElement) {
        fieldElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        const inputElement = fieldElement.querySelector("input, textarea, select");
        if (inputElement) {
          setTimeout(
            () => {
              inputElement.focus();
            },
            300
          );
        }
      }
    }
    function scrollToFirstField() {
      const firstVisibleField = $$props.config.elements.find((element2) => !element2.showIf || element2.showIf(get$1(formValues)));
      if (firstVisibleField) {
        setTimeout(
          () => {
            scrollToField(firstVisibleField.name);
          },
          100
        );
      }
    }
    async function handleSubmit(e) {
      e.preventDefault();
      if (get$1(isSubmitting)) return;
      if (!validateAllFields()) {
        const firstErrorField = Object.keys(get$1(errors))[0];
        if (firstErrorField) {
          scrollToField(firstErrorField);
        }
        return;
      }
      set(isSubmitting, true);
      try {
        if ($$props.config.onSubmit) {
          await $$props.config.onSubmit(get$1(formValues));
        } else if ($$props.onSubmit) {
          await $$props.onSubmit(get$1(formValues));
        }
        closeModal();
      } catch (error) {
        if ($$props.logger) {
          $$props.logger.error("Fehler beim Absenden des Formulars:", error);
        }
      } finally {
        set(isSubmitting, false);
      }
    }
    function closeModal() {
      if ($$props.config.onCancel) {
        $$props.config.onCancel();
      } else if ($$props.onCancel) {
        $$props.onCancel();
      } else {
        if ($$props.logger) {
          $$props.logger.debug("Modal geschlossen");
        }
      }
    }
    function handleKeydown(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    function handleKeyNavigation(e) {
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    }
    const formClasses = /* @__PURE__ */ user_derived(() => [
      "dynamic-form-sheet",
      `form-size-${get$1(mergedConfig).modalSize}`,
      `theme-${get$1(mergedConfig).styling.theme}`,
      get$1(mergedConfig).styling.customClasses?.container || ""
    ].filter(Boolean).join(" "));
    var div = root$2();
    event("keydown", $window, handleKeydown);
    event("keyup", $window, handleKeyNavigation);
    var div_1 = child(div);
    var h3 = child(div_1);
    var text2 = child(h3, true);
    reset(h3);
    var node = sibling(h3, 2);
    {
      var consequent = ($$anchor2) => {
        var p = root_1$1();
        var text_1 = child(p, true);
        reset(p);
        template_effect(() => set_text(text_1, get$1(mergedConfig).description));
        append($$anchor2, p);
      };
      if_block(node, ($$render) => {
        if (get$1(mergedConfig).description) $$render(consequent);
      });
    }
    reset(div_1);
    var form = sibling(div_1, 2);
    var node_1 = child(form);
    each(node_1, 17, () => $$props.config.elements, (element2) => element2.id, ($$anchor2, element2) => {
      var fragment = comment();
      var node_2 = first_child(fragment);
      {
        var consequent_1 = ($$anchor3) => {
          var div_2 = root_3$1();
          var node_3 = child(div_2);
          DynamicFormField(node_3, {
            get element() {
              return get$1(element2);
            },
            get value() {
              return get$1(formValues)[get$1(element2).name];
            },
            get error() {
              return get$1(errors)[get$1(element2).name];
            },
            onUpdate: (value) => updateFieldValue(get$1(element2).name, value)
          });
          reset(div_2);
          template_effect(() => set_attribute(div_2, "data-field-name", get$1(element2).name));
          append($$anchor3, div_2);
        };
        if_block(node_2, ($$render) => {
          if (!get$1(element2).showIf || get$1(element2).showIf(get$1(formValues))) $$render(consequent_1);
        });
      }
      append($$anchor2, fragment);
    });
    var div_3 = sibling(node_1, 2);
    var button = child(div_3);
    var node_4 = child(button);
    {
      var consequent_2 = ($$anchor2) => {
        var span = root_4();
        append($$anchor2, span);
      };
      if_block(node_4, ($$render) => {
        if (get$1(isSubmitting)) $$render(consequent_2);
      });
    }
    var text_2 = sibling(node_4);
    reset(button);
    var node_5 = sibling(button, 2);
    {
      var consequent_3 = ($$anchor2) => {
        var button_1 = root_5$1();
        button_1.__click = closeModal;
        var text_3 = child(button_1, true);
        reset(button_1);
        template_effect(() => {
          button_1.disabled = get$1(isSubmitting);
          set_text(text_3, get$1(mergedConfig).cancelLabel);
        });
        append($$anchor2, button_1);
      };
      if_block(node_5, ($$render) => {
        if (get$1(mergedConfig).showCancelButton) $$render(consequent_3);
      });
    }
    reset(div_3);
    reset(form);
    reset(div);
    template_effect(() => {
      set_class(div, 1, `form-container ${get$1(formClasses) ?? ""}`, "svelte-1hegfbw");
      set_text(text2, get$1(mergedConfig).title);
      button.disabled = get$1(isSubmitting);
      set_text(text_2, ` ${get$1(mergedConfig).submitLabel ?? ""}`);
    });
    event("submit", form, handleSubmit);
    append($$anchor, div);
    pop();
  }
  delegate(["click"]);
  const _DynamicDialogApp = class _DynamicDialogApp extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2
  ) {
    constructor(parentScope) {
      super();
      // Lazy-Memoized Getter – kein Service im Konstruktor auflösen!
      __privateAdd(this, _logger2);
      __privateAdd(this, _svelte2);
      __privateAdd(this, _css2);
      this.svelteApp = null;
      this._parentScope = parentScope;
      if (parentScope) {
        this._instanceScope = createChildScope(parentScope, "DynamicDialogApp");
        this._instanceId = this._instanceScope;
      } else {
        this._instanceId = this.generateInstanceId();
        this._instanceScope = `instance-${this._instanceId}`;
      }
    }
    get logger() {
      return __privateGet(this, _logger2) ?? __privateSet(this, _logger2, use(FoundryLogger));
    }
    get svelteManager() {
      if (!this._instanceScope) throw new Error("Instance scope not set. Call _onRender first.");
      return __privateGet(this, _svelte2) ?? __privateSet(this, _svelte2, use(SvelteManager, this._instanceScope));
    }
    get cssManager() {
      if (!this._instanceScope) throw new Error("Instance scope not set. Call _onRender first.");
      return __privateGet(this, _css2) ?? __privateSet(this, _css2, use(CSSManager, this._instanceScope));
    }
    generateInstanceId() {
      const timestamp = Date.now();
      const randomId = foundry.utils.randomID();
      return `${this.constructor.name}-${timestamp}-${randomId}`;
    }
    /** @override */
    get title() {
      return this.options.window.title;
    }
    /** @override */
    async _renderHTML(context, options) {
      return super._renderHTML(context, options);
    }
    /** @override */
    _replaceHTML(html2, options, context) {
      return super._replaceHTML(html2, options, context);
    }
    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      this.logger.info(`[${_DynamicDialogApp.appId}] _prepareContext called with context:`, context);
      this.logger.info(`[${_DynamicDialogApp.appId}] _prepareContext called with options:`, options);
      return context;
    }
    async _prepareConfig(config) {
      _DynamicDialogApp.config = config;
      this.logger.info(
        `[${_DynamicDialogApp.appId}] _prepareConfig called with config:`,
        _DynamicDialogApp.config
      );
      return _DynamicDialogApp.config;
    }
    async _prepareOnSubmit(onSubmit) {
      _DynamicDialogApp.onSubmit = onSubmit;
      this.logger.info(
        `[${_DynamicDialogApp.appId}] _prepareOnSubmit called with onSubmit:`,
        _DynamicDialogApp.onSubmit
      );
      return _DynamicDialogApp.onSubmit;
    }
    async _prepareOnCancel(onCancel) {
      _DynamicDialogApp.onCancel = onCancel;
      this.logger.info(
        `[${_DynamicDialogApp.appId}] _prepareOnCancel called with onCancel:`,
        _DynamicDialogApp.onCancel
      );
      return _DynamicDialogApp.onCancel;
    }
    async _onRender(context, options) {
      this.logger.info(`[${_DynamicDialogApp.appId}] _onRender started`, {
        instanceId: this._instanceId,
        context,
        options
      });
      if (this._instanceScope) {
        setCurrentScope(this._instanceScope);
      }
      try {
        await super._onRender(context, options);
        await this._loadCSS();
        const target = this.element.querySelector("#dynamic-dialog-svelte");
        if (!target) {
          this.logger.warn(
            `[${_DynamicDialogApp.appId}] Svelte mount point '#dynamic-dialog-svelte' not found`
          );
          return;
        }
        this.logger.info(`[${_DynamicDialogApp.appId}] Found target element:`, target);
        await this.svelteManager.unmountApp(this.svelteApp);
        this.svelteApp = null;
        this.svelteApp = await this.svelteManager.mountComponent(
          DynamicFormSheet,
          target,
          {
            config: _DynamicDialogApp.config,
            onSubmit: _DynamicDialogApp.onSubmit,
            onCancel: _DynamicDialogApp.onCancel
          }
        );
        this.logger.info(`[${_DynamicDialogApp.appId}] DynamicFormSheet mounted successfully`);
      } catch (error) {
        this.logger.error(`[${_DynamicDialogApp.appId}] Error during render:`, error);
        throw error;
      }
    }
    /**
     * CSS-Datei für die DynamicDialogApp laden
     */
    async _loadCSS() {
      const cssPath = "modules/relationship-app/styles/dynamic-dialog-app.css";
      await this.cssManager.loadCSS(cssPath);
    }
    /** @override */
    async _onClose(options) {
      this.logger.info(`[${_DynamicDialogApp.appId}] _onClose called`, {
        instanceId: this._instanceId,
        parentScope: this._parentScope,
        options
      });
      await this.svelteManager.unmountApp(this.svelteApp);
      this.svelteApp = null;
      if (this._parentScope && this._instanceScope) {
        removeChildScope(this._parentScope, this._instanceScope);
        this.logger.info(
          `[${_DynamicDialogApp.appId}] Removed child scope from parent chain: ${this._instanceScope}`
        );
      }
      if (this._instanceScope) {
        disposeScopedServices(this._instanceScope);
        this.logger.info(
          `[${_DynamicDialogApp.appId}] Disposed instance scope: ${this._instanceScope}`
        );
      }
      return super._onClose(options);
    }
    /**
     * Statische Methode zum einfachen Öffnen des Dialogs
     */
    static async show(config, parentScope) {
      return new Promise((resolve) => {
        const app = new _DynamicDialogApp(parentScope);
        app._prepareConfig(config);
        app._prepareOnSubmit((values) => {
          app.close();
          resolve(values);
        });
        app._prepareOnCancel(() => {
          app.close();
          resolve(null);
        });
        app.render({ force: true });
      });
    }
  };
  _logger2 = new WeakMap();
  _svelte2 = new WeakMap();
  _css2 = new WeakMap();
  _DynamicDialogApp.PARTS = {
    main: {
      template: "modules/relationship-app/templates/DynamicFormApp.hbs"
    }
  };
  _DynamicDialogApp.appId = "DynamicDialogApp";
  _DynamicDialogApp.config = {
    title: "Dynamic Dialog",
    elements: []
  };
  _DynamicDialogApp.onSubmit = () => {
  };
  _DynamicDialogApp.onCancel = () => {
  };
  _DynamicDialogApp.DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "dynamic-dialog",
    // CSS classes to apply
    classes: ["dynamic-dialog"],
    // Window sizing and behavior
    position: { width: 800, height: 600 },
    window: { title: "Dynamic Dialog", resizable: true },
    tag: "div"
  };
  let DynamicDialogApp = _DynamicDialogApp;
  var DynamicDialogApp$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    default: DynamicDialogApp
  });
  var root$1 = /* @__PURE__ */ from_html(`<div><h1>Dynamic Table</h1></div>`);
  function DynamicTableSheet($$anchor, $$props) {
    var div = root$1();
    append($$anchor, div);
  }
  const _DynamicTableApp = class _DynamicTableApp extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2
  ) {
    constructor(parentScope) {
      super();
      // Lazy-Memoized Getter – kein Service im Konstruktor auflösen!
      __privateAdd(this, _logger3);
      __privateAdd(this, _svelte3);
      __privateAdd(this, _css3);
      this.svelteApp = null;
      this._parentScope = parentScope;
      if (parentScope) {
        this._instanceScope = createChildScope(parentScope, "DynamicTableApp");
        this._instanceId = this._instanceScope;
      } else {
        this._instanceId = this.generateInstanceId();
        this._instanceScope = `instance-${this._instanceId}`;
      }
    }
    get logger() {
      return __privateGet(this, _logger3) ?? __privateSet(this, _logger3, use(FoundryLogger));
    }
    get svelteManager() {
      if (!this._instanceScope) throw new Error("Instance scope not set. Call _onRender first.");
      return __privateGet(this, _svelte3) ?? __privateSet(this, _svelte3, use(SvelteManager, this._instanceScope));
    }
    get cssManager() {
      if (!this._instanceScope) throw new Error("Instance scope not set. Call _onRender first.");
      return __privateGet(this, _css3) ?? __privateSet(this, _css3, use(CSSManager, this._instanceScope));
    }
    generateInstanceId() {
      const timestamp = Date.now();
      const randomId = foundry.utils.randomID();
      return `${this.constructor.name}-${timestamp}-${randomId}`;
    }
    /** @override */
    get title() {
      return this.options.window.title;
    }
    /** @override */
    async _renderHTML(context, options) {
      return super._renderHTML(context, options);
    }
    /** @override */
    _replaceHTML(html2, options, context) {
      return super._replaceHTML(html2, options, context);
    }
    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      this.logger.info(`[${_DynamicTableApp.appId}] _prepareContext called with context:`, context);
      this.logger.info(`[${_DynamicTableApp.appId}] _prepareContext called with options:`, options);
      return context;
    }
    async _prepareConfig(config) {
      _DynamicTableApp.config = config;
      this.logger.info(
        `[${_DynamicTableApp.appId}] _prepareConfig called with config:`,
        _DynamicTableApp.config
      );
      return _DynamicTableApp.config;
    }
    async _prepareOnSubmit(onSubmit) {
      _DynamicTableApp.onSubmit = onSubmit;
      this.logger.info(
        `[${_DynamicTableApp.appId}] _prepareOnSubmit called with onSubmit:`,
        _DynamicTableApp.onSubmit
      );
      return _DynamicTableApp.onSubmit;
    }
    async _prepareOnCancel(onCancel) {
      _DynamicTableApp.onCancel = onCancel;
      this.logger.info(
        `[${_DynamicTableApp.appId}] _prepareOnCancel called with onCancel:`,
        _DynamicTableApp.onCancel
      );
      return _DynamicTableApp.onCancel;
    }
    async _onRender(context, options) {
      this.logger.info(`[${_DynamicTableApp.appId}] _onRender started`, {
        instanceId: this._instanceId,
        context,
        options
      });
      if (this._instanceScope) {
        setCurrentScope(this._instanceScope);
      }
      try {
        await super._onRender(context, options);
        await this._loadCSS();
        const target = this.element.querySelector("#dynamic-table-svelte");
        if (!target) {
          this.logger.warn(
            `[${_DynamicTableApp.appId}] Svelte mount point '#dynamic-table-svelte' not found`
          );
          return;
        }
        this.logger.info(`[${_DynamicTableApp.appId}] Found target element:`, target);
        await this.svelteManager.unmountApp(this.svelteApp);
        this.svelteApp = null;
        this.svelteApp = await this.svelteManager.mountComponent(
          DynamicTableSheet,
          target,
          {
            config: _DynamicTableApp.config,
            onSubmit: _DynamicTableApp.onSubmit,
            onCancel: _DynamicTableApp.onCancel
          }
        );
        this.logger.info(`[${_DynamicTableApp.appId}] DynamicTableSheet mounted successfully`);
      } catch (error) {
        this.logger.error(`[${_DynamicTableApp.appId}] Error during render:`, error);
        throw error;
      }
    }
    /**
     * CSS-Datei für die DynamicTableApp laden
     */
    async _loadCSS() {
      const cssPath = "modules/relationship-app/styles/dynamic-table-app.css";
      await this.cssManager.loadCSS(cssPath);
    }
    /** @override */
    async _onClose(options) {
      this.logger.info(`[${_DynamicTableApp.appId}] _onClose called`, {
        instanceId: this._instanceId,
        parentScope: this._parentScope,
        options
      });
      await this.svelteManager.unmountApp(this.svelteApp);
      this.svelteApp = null;
      if (this._parentScope && this._instanceScope) {
        removeChildScope(this._parentScope, this._instanceScope);
        this.logger.info(
          `[${_DynamicTableApp.appId}] Removed child scope from parent chain: ${this._instanceScope}`
        );
      }
      if (this._instanceScope) {
        disposeScopedServices(this._instanceScope);
        this.logger.info(
          `[${_DynamicTableApp.appId}] Disposed instance scope: ${this._instanceScope}`
        );
      }
      return super._onClose(options);
    }
    /**
     * Statische Methode zum einfachen Öffnen der Tabelle
     */
    static async show(config, parentScope) {
      return new Promise((resolve) => {
        const app = new _DynamicTableApp(parentScope);
        app._prepareConfig(config);
        app._prepareOnSubmit((data) => {
          app.close();
          resolve(data);
        });
        app._prepareOnCancel(() => {
          app.close();
          resolve(null);
        });
        app.render({ force: true });
      });
    }
  };
  _logger3 = new WeakMap();
  _svelte3 = new WeakMap();
  _css3 = new WeakMap();
  _DynamicTableApp.PARTS = {
    main: {
      template: "modules/relationship-app/templates/DynamicTableApp.hbs"
    }
  };
  _DynamicTableApp.appId = "DynamicTableApp";
  _DynamicTableApp.config = {
    title: "Dynamic Table",
    columns: []
  };
  _DynamicTableApp.onSubmit = () => {
  };
  _DynamicTableApp.onCancel = () => {
  };
  _DynamicTableApp.DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "dynamic-table",
    // CSS classes to apply
    classes: ["dynamic-table"],
    // Window sizing and behavior
    position: { width: 1200, height: 800 },
    window: { title: "Dynamic Table", resizable: true },
    tag: "div"
  };
  let DynamicTableApp = _DynamicTableApp;
  var DynamicTableApp$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    default: DynamicTableApp
  });
  var on_click = (__1, startCreatingNewSchema) => startCreatingNewSchema();
  var on_click_1 = (__2, errorMessage) => set(errorMessage, null);
  var root_1 = /* @__PURE__ */ from_html(`<div class="error-message svelte-qx734j"><span> </span> <button class="close-btn svelte-qx734j">×</button></div>`);
  var on_click_2 = (__3, successMessage) => set(successMessage, null);
  var root_2 = /* @__PURE__ */ from_html(`<div class="success-message svelte-qx734j"><span> </span> <button class="close-btn svelte-qx734j">×</button></div>`);
  var root_3 = /* @__PURE__ */ from_html(`<p>Lade Schemas...</p>`);
  var root_5 = /* @__PURE__ */ from_html(`<p>Keine Schemas vorhanden. Erstellen Sie Ihr erstes Schema.</p>`);
  var on_click_3 = (__4, selectSchema, schema) => selectSchema(get$1(schema).id);
  var on_click_4 = (__5, startEditingSchema, schema) => startEditingSchema(get$1(schema));
  var on_click_5 = (__6, duplicateSchema, schema) => duplicateSchema(get$1(schema).id);
  var on_click_6 = (__7, deleteSchema, schema) => deleteSchema(get$1(schema).id);
  var on_click_7 = (__8, startCreatingNewRow, schema) => startCreatingNewRow(get$1(schema).id);
  var root_11 = /* @__PURE__ */ from_html(`- <em>Erforderlich</em>`, 1);
  var on_click_8 = (__9, startEditingRow, schema, row) => startEditingRow(get$1(schema).id, get$1(row));
  var on_click_9 = (__10, deleteMetadataRow, schema, row) => deleteMetadataRow(get$1(schema).id, get$1(row).id);
  var root_10 = /* @__PURE__ */ from_html(`<div class="row-item svelte-qx734j"><div class="row-info svelte-qx734j"><strong> </strong> <!></div> <div class="row-actions svelte-qx734j"><button>Bearbeiten</button> <button>Löschen</button></div></div>`);
  var root_9 = /* @__PURE__ */ from_html(`<div class="rows-section svelte-qx734j"><h4 class="svelte-qx734j">Metadaten-Zeilen</h4> <!></div>`);
  var root_8 = /* @__PURE__ */ from_html(`<div class="schema-details svelte-qx734j"><p class="svelte-qx734j"><strong>Beschreibung:</strong> </p> <p class="svelte-qx734j"><strong>Autor:</strong> </p> <p class="svelte-qx734j"><strong>Kategorien:</strong> </p> <p class="svelte-qx734j"><strong>Metadaten-Zeilen:</strong> </p> <div class="actions svelte-qx734j"><button>Bearbeiten</button> <button>Duplizieren</button> <button>Löschen</button> <button class="bright">Neue Zeile</button></div> <!></div>`);
  var root_7 = /* @__PURE__ */ from_html(`<div><button class="schema-header svelte-qx734j"><h3 class="svelte-qx734j"> </h3> <span class="version svelte-qx734j"> </span></button> <!></div>`);
  var root = /* @__PURE__ */ from_html(`<div class="metadata-container svelte-qx734j"><div class="metadata-header svelte-qx734j"><h1 class="svelte-qx734j">Metadaten-Verwaltung</h1> <div class="header-actions svelte-qx734j"><button class="bright">Neues Schema</button></div></div> <!> <!> <div class="metadata-content svelte-qx734j"><!></div></div>`);
  function MetadataManagementView($$anchor, $$props) {
    push($$props, true);
    if ($$props.logger) {
      $$props.logger.debug("MetadataManagementView");
    }
    let metadata = /* @__PURE__ */ state(proxy({ schemas: [] }));
    let editingSchema = /* @__PURE__ */ state(null);
    let editingRow = /* @__PURE__ */ state(null);
    let selectedSchemaId = /* @__PURE__ */ state(null);
    let isCreatingNewSchema = /* @__PURE__ */ state(false);
    let isCreatingNewRow = /* @__PURE__ */ state(false);
    let isLoading = false;
    let errorMessage = /* @__PURE__ */ state(null);
    let successMessage = /* @__PURE__ */ state(null);
    let newSchema = proxy({
      id: "",
      name: "",
      label: "",
      description: "",
      author: "",
      version: "1.0.0",
      categories: [],
      rows: []
    });
    let newRow = proxy({
      id: "",
      name: "",
      label: "",
      type: "string",
      required: false,
      category: "Allgemein",
      default: "",
      options: [],
      placeholder: "",
      description: "",
      value: ""
    });
    const FIELD_TYPES = [
      { value: "string", label: "Text" },
      { value: "number", label: "Zahl" },
      { value: "boolean", label: "Wahr/Falsch" },
      { value: "select", label: "Auswahl" },
      { value: "textarea", label: "Mehrzeiliger Text" }
    ];
    const DEFAULT_CATEGORIES = [
      "Allgemein",
      "Beziehungen",
      "Eigenschaften",
      "Notizen",
      "System"
    ];
    function generateSchemaId() {
      return foundry.utils.randomID();
    }
    function generateRowId() {
      return foundry.utils.randomID();
    }
    function validateSchema(schema) {
      const errors = [];
      if (!schema.name?.trim()) errors.push("Schema-Name ist erforderlich");
      if (!schema.label?.trim()) errors.push("Schema-Label ist erforderlich");
      return errors;
    }
    function validateMetadataRow(row) {
      const errors = [];
      if (!row.name?.trim()) errors.push("Feldname ist erforderlich");
      if (!row.label?.trim()) errors.push("Feldlabel ist erforderlich");
      if (!row.type) errors.push("Feldtyp ist erforderlich");
      return errors;
    }
    function getSchemaById(schemaId) {
      return get$1(metadata).schemas.find((s) => s.id === schemaId);
    }
    function getRowById(schemaId, rowId) {
      const schema = getSchemaById(schemaId);
      return schema?.rows.find((r2) => r2.id === rowId);
    }
    function getCategoriesFromSchema(schema) {
      return [.../* @__PURE__ */ new Set([...DEFAULT_CATEGORIES, ...schema.categories])];
    }
    async function createSchema(schemaData) {
      const errors = validateSchema(schemaData);
      if (errors.length > 0) {
        set(errorMessage, errors.join(", "), true);
        return;
      }
      const newSchema2 = {
        id: generateSchemaId(),
        rows: [],
        categories: Array.isArray(schemaData.categories) ? [...schemaData.categories] : [...DEFAULT_CATEGORIES],
        name: schemaData.name || "",
        label: schemaData.label || "",
        description: schemaData.description || "",
        version: schemaData.version || "1.0.0",
        author: schemaData.author || ""
      };
      get$1(metadata).schemas.push(newSchema2);
      await saveMetadataToRegistry(get$1(metadata));
      newSchema2.name = "";
      newSchema2.label = "";
      newSchema2.description = "";
      newSchema2.author = "";
      newSchema2.version = "1.0.0";
      newSchema2.categories = [];
      newSchema2.rows = [];
      set(isCreatingNewSchema, false);
      set(successMessage, "Schema erfolgreich erstellt");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function updateSchema(schemaId, updates) {
      const schemaIndex = get$1(metadata).schemas.findIndex((s) => s.id === schemaId);
      if (schemaIndex === -1) return;
      const errors = validateSchema(updates);
      if (errors.length > 0) {
        set(errorMessage, errors.join(", "), true);
        return;
      }
      get$1(metadata).schemas[schemaIndex] = { ...get$1(metadata).schemas[schemaIndex], ...updates };
      await saveMetadataToRegistry(get$1(metadata));
      set(editingSchema, null);
      set(successMessage, "Schema erfolgreich aktualisiert");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function deleteSchema(schemaId) {
      if (confirm("Sind Sie sicher, dass Sie dieses Schema löschen möchten?")) {
        get$1(metadata).schemas = get$1(metadata).schemas.filter((s) => s.id !== schemaId);
        await saveMetadataToRegistry(get$1(metadata));
        if (get$1(selectedSchemaId) === schemaId) {
          set(selectedSchemaId, null);
        }
        set(successMessage, "Schema erfolgreich gelöscht");
        setTimeout(() => set(successMessage, null), 3e3);
      }
    }
    async function duplicateSchema(schemaId) {
      const originalSchema = getSchemaById(schemaId);
      if (!originalSchema) return;
      const duplicatedSchema = {
        ...originalSchema,
        id: generateSchemaId(),
        name: `${originalSchema.name}_copy`,
        label: `${originalSchema.label} (Kopie)`,
        version: "1.0.0"
      };
      get$1(metadata).schemas.push(duplicatedSchema);
      await saveMetadataToRegistry(get$1(metadata));
      set(successMessage, "Schema erfolgreich dupliziert");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function addMetadataRow(schemaId, rowData) {
      const errors = validateMetadataRow(rowData);
      if (errors.length > 0) {
        set(errorMessage, errors.join(", "), true);
        return;
      }
      const schema = getSchemaById(schemaId);
      if (!schema) return;
      const newRow2 = {
        id: generateRowId(),
        name: rowData.name || "",
        label: rowData.label || "",
        value: rowData.default || null,
        type: rowData.type || "string",
        required: rowData.required || false,
        default: rowData.default || null,
        options: rowData.options || [],
        placeholder: rowData.placeholder || "",
        description: rowData.description || "",
        category: rowData.category || "Allgemein"
      };
      schema.rows.push(newRow2);
      await saveMetadataToRegistry(get$1(metadata));
      newRow2.name = "";
      newRow2.label = "";
      newRow2.type = "string";
      newRow2.required = false;
      newRow2.category = "Allgemein";
      newRow2.default = "";
      newRow2.options = [];
      newRow2.placeholder = "";
      newRow2.description = "";
      set(isCreatingNewRow, false);
      set(successMessage, "Metadaten-Zeile erfolgreich hinzugefügt");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function updateMetadataRow(schemaId, rowId, updates) {
      const schema = getSchemaById(schemaId);
      if (!schema) return;
      const rowIndex = schema.rows.findIndex((r2) => r2.id === rowId);
      if (rowIndex === -1) return;
      const errors = validateMetadataRow(updates);
      if (errors.length > 0) {
        set(errorMessage, errors.join(", "), true);
        return;
      }
      const existingRow = schema.rows[rowIndex];
      schema.rows[rowIndex] = {
        id: existingRow.id,
        name: existingRow.name,
        label: existingRow.label,
        type: existingRow.type,
        required: existingRow.required,
        default: existingRow.default,
        options: existingRow.options,
        placeholder: existingRow.placeholder,
        description: existingRow.description,
        category: existingRow.category,
        value: existingRow.value,
        ...updates
      };
      await saveMetadataToRegistry(get$1(metadata));
      set(editingRow, null);
      set(successMessage, "Metadaten-Zeile erfolgreich aktualisiert");
      setTimeout(() => set(successMessage, null), 3e3);
    }
    async function deleteMetadataRow(schemaId, rowId) {
      if (confirm("Sind Sie sicher, dass Sie diese Metadaten-Zeile löschen möchten?")) {
        const schema = getSchemaById(schemaId);
        if (!schema) return;
        schema.rows = schema.rows.filter((r2) => r2.id !== rowId);
        await saveMetadataToRegistry(get$1(metadata));
        set(successMessage, "Metadaten-Zeile erfolgreich gelöscht");
        setTimeout(() => set(successMessage, null), 3e3);
      }
    }
    async function reorderMetadataRows(schemaId, rowIds) {
      const schema = getSchemaById(schemaId);
      if (!schema) return;
      const reorderedRows = [];
      for (const rowId of rowIds) {
        const row = schema.rows.find((r2) => r2.id === rowId);
        if (row) reorderedRows.push(row);
      }
      schema.rows = reorderedRows;
      await saveMetadataToRegistry(get$1(metadata));
    }
    async function startCreatingNewSchema() {
      set(isCreatingNewSchema, true);
      set(editingSchema, null);
      const config = createSchemaFormConfig();
      const result = $$props.parentApp ? await $$props.parentApp.openDynamicDialog(config) : await DynamicDialogApp.show(config, $$props.parentScope);
      if (result) {
        if ($$props.logger) {
          $$props.logger.debug("Neues Schema erstellt:", result);
        }
      }
      set(isCreatingNewSchema, false);
    }
    async function startEditingSchema(schema) {
      set(editingSchema, schema, true);
      set(isCreatingNewSchema, false);
      const config = createSchemaFormConfig();
      const result = $$props.parentApp ? await $$props.parentApp.openDynamicDialog(config) : await DynamicDialogApp.show(config, $$props.parentScope);
      if (result) {
        if ($$props.logger) {
          $$props.logger.debug("Schema bearbeitet:", result);
        }
      }
      set(editingSchema, null);
    }
    async function startEditingRow(schemaId, row) {
      set(editingRow, { ...row }, true);
      set(isCreatingNewRow, false);
      const config = createRowFormConfig();
      const result = $$props.parentApp ? await $$props.parentApp.openDynamicDialog(config) : await DynamicDialogApp.show(config, $$props.parentScope);
      if (result) {
        if ($$props.logger) {
          $$props.logger.debug("Metadaten-Zeile bearbeitet:", result);
        }
      }
      set(editingRow, null);
    }
    async function startCreatingNewRow(schemaId) {
      set(isCreatingNewRow, true);
      set(editingRow, null);
      const config = createRowFormConfig();
      const result = $$props.parentApp ? await $$props.parentApp.openDynamicDialog(config) : await DynamicDialogApp.show(config, $$props.parentScope);
      if (result) {
        if ($$props.logger) {
          $$props.logger.debug("Neue Metadaten-Zeile erstellt:", result);
        }
      }
      set(isCreatingNewRow, false);
    }
    function selectSchema(schemaId) {
      set(selectedSchemaId, get$1(selectedSchemaId) === schemaId ? null : schemaId, true);
    }
    let schemaFormData = /* @__PURE__ */ user_derived(() => get$1(editingSchema) || newSchema);
    let rowFormData = /* @__PURE__ */ user_derived(() => get$1(editingRow) || newRow);
    function createSchemaFormConfig() {
      let elements = [];
      elements.push(createTextElement("name", {
        required: true,
        placeholder: "Technischer Name (z.B. character_metadata)",
        label: "Name",
        description: "Technischer Name für API-Zugriffe"
      }));
      elements.push(createTextElement("label", {
        required: true,
        placeholder: "Anzeigename (z.B. Charakter-Metadaten)",
        label: "Label",
        description: "Benutzerfreundlicher Anzeigename"
      }));
      elements.push(createTextElement("description", {
        multiline: true,
        placeholder: "Beschreibung des Schemas",
        label: "Beschreibung",
        description: "Detaillierte Beschreibung des Schemas"
      }));
      elements.push(createTextElement("version", {
        default: "1.0.0",
        placeholder: "1.0.0",
        label: "Version",
        description: "Versionsnummer des Schemas"
      }));
      elements.push(createTextElement("author", {
        placeholder: "Ihr Name",
        label: "Autor",
        description: "Name des Autors oder der Organisation"
      }));
      elements.push(createMultiSelectElement("categories", {
        options: DEFAULT_CATEGORIES,
        label: "Kategorien",
        description: "Verfügbare Kategorien für die Gruppierung der Metadaten"
      }));
      return {
        title: get$1(isCreatingNewSchema) ? "Neues Schema erstellen" : "Schema bearbeiten",
        elements,
        initialValues: get$1(editingSchema) || {},
        submitLabel: get$1(isCreatingNewSchema) ? "Erstellen" : "Aktualisieren",
        onSubmit: async (values) => {
          if (get$1(editingSchema)) {
            await updateSchema(get$1(editingSchema).id, values);
          } else {
            await createSchema(values);
          }
        },
        onCancel: () => {
        }
      };
    }
    function createRowFormConfig() {
      let elements = [];
      elements.push(createTextElement("name", {
        required: true,
        placeholder: "Technischer Name (z.B. strength)",
        label: "Name",
        description: "Technischer Name für API-Zugriffe"
      }));
      elements.push(createTextElement("label", {
        required: true,
        placeholder: "Anzeigename (z.B. Stärke)",
        label: "Label",
        description: "Benutzerfreundlicher Anzeigename"
      }));
      elements.push(createSelectElement("type", {
        required: true,
        options: createOptions("string", "number", "boolean", "select", "textarea"),
        label: "Typ",
        description: "Datentyp des Feldes"
      }));
      elements.push(createMultiSelectElement("category", {
        options: DEFAULT_CATEGORIES,
        label: "Kategorie",
        description: "Kategorie für die Gruppierung"
      }));
      elements.push(createTextElement("description", {
        multiline: true,
        placeholder: "Beschreibung des Feldes",
        label: "Beschreibung",
        description: "Detaillierte Beschreibung des Feldes"
      }));
      elements.push(createTextElement("placeholder", {
        placeholder: "Platzhaltertext",
        label: "Platzhalter",
        description: "Text der im Eingabefeld angezeigt wird"
      }));
      elements.push(createTextElement("default", {
        placeholder: "Standardwert",
        label: "Standardwert",
        description: "Standardwert wenn kein Wert gesetzt ist"
      }));
      elements.push(createBooleanElement("required", {
        default: false,
        label: "Pflichtfeld",
        description: "Gibt an, ob das Feld zwingend ausgefüllt werden muss"
      }));
      elements.push(createTextElement("options", {
        multiline: true,
        placeholder: "Option1, Option2, Option3 (kommagetrennt)",
        label: "Verfügbare Optionen",
        description: "Verfügbare Auswahlmöglichkeiten (kommagetrennt) - nur für Select-Felder relevant",
        showIf: (values) => values.type === "select"
      }));
      return {
        title: get$1(isCreatingNewRow) ? "Neue Metadaten-Zeile erstellen" : "Metadaten-Zeile bearbeiten",
        elements,
        initialValues: get$1(editingRow) || {},
        submitLabel: get$1(isCreatingNewRow) ? "Erstellen" : "Aktualisieren",
        onSubmit: async (values) => {
          if (get$1(editingRow) && get$1(selectedSchemaId)) {
            await updateMetadataRow(get$1(selectedSchemaId), get$1(editingRow).id, values);
          } else if (get$1(selectedSchemaId)) {
            await addMetadataRow(get$1(selectedSchemaId), values);
          }
        },
        onCancel: () => {
        }
      };
    }
    function addNewOption() {
      if (get$1(editingRow)) {
        get$1(editingRow).options = [...get$1(editingRow).options || [], ""];
      } else {
        newRow.options = [...newRow.options || [], ""];
      }
    }
    function removeOption(index2) {
      if (get$1(editingRow) && get$1(editingRow).options) {
        get$1(editingRow).options = get$1(editingRow).options.filter((_, i) => i !== index2);
      } else if (newRow.options) {
        newRow.options = newRow.options.filter((_, i) => i !== index2);
      }
    }
    function updateOption(index2, value) {
      if (get$1(editingRow) && get$1(editingRow).options) {
        get$1(editingRow).options = get$1(editingRow).options.map((opt, i) => i === index2 ? value : opt);
      } else if (newRow.options) {
        newRow.options = newRow.options.map((opt, i) => i === index2 ? value : opt);
      }
    }
    async function saveMetadataToRegistry(metadataParameter) {
      await game?.settings?.set(MODULE_ID, MODULE_METADATA_KEY, metadataParameter);
    }
    async function getMetadataFromRegistry() {
      return await game?.settings?.get(MODULE_ID, MODULE_METADATA_KEY);
    }
    async function loadMetadata() {
      const loaded = await getMetadataFromRegistry();
      if (loaded && loaded.schemas) {
        loaded.schemas.forEach((schema) => {
          if (!schema.categories || !Array.isArray(schema.categories)) {
            schema.categories = [...DEFAULT_CATEGORIES];
          } else {
            schema.categories = [...schema.categories];
          }
          if (!schema.rows || !Array.isArray(schema.rows)) {
            schema.rows = [];
          } else {
            schema.rows = [...schema.rows];
          }
        });
        set(metadata, loaded, true);
      } else {
        set(metadata, { schemas: [] }, true);
      }
    }
    user_effect(() => {
      if (get$1(metadata) && get$1(metadata).schemas !== void 0 && get$1(metadata).schemas.length > 0) {
        setTimeout(
          () => {
            saveMetadataToRegistry(get$1(metadata));
          },
          100
        );
      }
    });
    onMount(() => {
      loadMetadata();
      const handleEscape = (e) => {
        if (e.key === "Escape" && (get$1(isCreatingNewSchema) || get$1(editingSchema) || get$1(isCreatingNewRow) || get$1(editingRow))) {
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    });
    var div = root();
    var div_1 = child(div);
    var div_2 = sibling(child(div_1), 2);
    var button = child(div_2);
    button.__click = [on_click, startCreatingNewSchema];
    reset(div_2);
    reset(div_1);
    var node = sibling(div_1, 2);
    {
      var consequent = ($$anchor2) => {
        var div_3 = root_1();
        var span = child(div_3);
        var text2 = child(span, true);
        reset(span);
        var button_1 = sibling(span, 2);
        button_1.__click = [on_click_1, errorMessage];
        reset(div_3);
        template_effect(() => set_text(text2, get$1(errorMessage)));
        append($$anchor2, div_3);
      };
      if_block(node, ($$render) => {
        if (get$1(errorMessage)) $$render(consequent);
      });
    }
    var node_1 = sibling(node, 2);
    {
      var consequent_1 = ($$anchor2) => {
        var div_4 = root_2();
        var span_1 = child(div_4);
        var text_1 = child(span_1, true);
        reset(span_1);
        var button_2 = sibling(span_1, 2);
        button_2.__click = [on_click_2, successMessage];
        reset(div_4);
        template_effect(() => set_text(text_1, get$1(successMessage)));
        append($$anchor2, div_4);
      };
      if_block(node_1, ($$render) => {
        if (get$1(successMessage)) $$render(consequent_1);
      });
    }
    var div_5 = sibling(node_1, 2);
    var node_2 = child(div_5);
    {
      var consequent_2 = ($$anchor2) => {
        var p = root_3();
        append($$anchor2, p);
      };
      var alternate = ($$anchor2, $$elseif) => {
        {
          var consequent_3 = ($$anchor3) => {
            var p_1 = root_5();
            append($$anchor3, p_1);
          };
          var alternate_1 = ($$anchor3) => {
            var fragment = comment();
            var node_3 = first_child(fragment);
            each(node_3, 17, () => get$1(metadata).schemas, (schema) => schema.id, ($$anchor4, schema) => {
              var div_6 = root_7();
              var button_3 = child(div_6);
              button_3.__click = [on_click_3, selectSchema, schema];
              var h3 = child(button_3);
              var text_2 = child(h3, true);
              reset(h3);
              var span_2 = sibling(h3, 2);
              var text_3 = child(span_2);
              reset(span_2);
              reset(button_3);
              var node_4 = sibling(button_3, 2);
              {
                var consequent_6 = ($$anchor5) => {
                  var div_7 = root_8();
                  var p_2 = child(div_7);
                  var text_4 = sibling(child(p_2));
                  reset(p_2);
                  var p_3 = sibling(p_2, 2);
                  var text_5 = sibling(child(p_3));
                  reset(p_3);
                  var p_4 = sibling(p_3, 2);
                  var text_6 = sibling(child(p_4));
                  reset(p_4);
                  var p_5 = sibling(p_4, 2);
                  var text_7 = sibling(child(p_5));
                  reset(p_5);
                  var div_8 = sibling(p_5, 2);
                  var button_4 = child(div_8);
                  button_4.__click = [on_click_4, startEditingSchema, schema];
                  var button_5 = sibling(button_4, 2);
                  button_5.__click = [on_click_5, duplicateSchema, schema];
                  var button_6 = sibling(button_5, 2);
                  button_6.__click = [on_click_6, deleteSchema, schema];
                  var button_7 = sibling(button_6, 2);
                  button_7.__click = [on_click_7, startCreatingNewRow, schema];
                  reset(div_8);
                  var node_5 = sibling(div_8, 2);
                  {
                    var consequent_5 = ($$anchor6) => {
                      var div_9 = root_9();
                      var node_6 = sibling(child(div_9), 2);
                      each(node_6, 17, () => get$1(schema).rows, (row) => row.id, ($$anchor7, row) => {
                        var div_10 = root_10();
                        var div_11 = child(div_10);
                        var strong = child(div_11);
                        var text_8 = child(strong, true);
                        reset(strong);
                        var text_9 = sibling(strong);
                        var node_7 = sibling(text_9);
                        {
                          var consequent_4 = ($$anchor8) => {
                            var fragment_1 = root_11();
                            next();
                            append($$anchor8, fragment_1);
                          };
                          if_block(node_7, ($$render) => {
                            if (get$1(row).required) $$render(consequent_4);
                          });
                        }
                        reset(div_11);
                        var div_12 = sibling(div_11, 2);
                        var button_8 = child(div_12);
                        button_8.__click = [on_click_8, startEditingRow, schema, row];
                        var button_9 = sibling(button_8, 2);
                        button_9.__click = [on_click_9, deleteMetadataRow, schema, row];
                        reset(div_12);
                        reset(div_10);
                        template_effect(() => {
                          set_text(text_8, get$1(row).label);
                          set_text(text_9, ` (${get$1(row).name ?? ""}) - ${get$1(row).type ?? ""} `);
                        });
                        append($$anchor7, div_10);
                      });
                      reset(div_9);
                      append($$anchor6, div_9);
                    };
                    if_block(node_5, ($$render) => {
                      if (get$1(schema).rows.length > 0) $$render(consequent_5);
                    });
                  }
                  reset(div_7);
                  template_effect(
                    ($0) => {
                      set_text(text_4, ` ${(get$1(schema).description || "Keine Beschreibung") ?? ""}`);
                      set_text(text_5, ` ${(get$1(schema).author || "Unbekannt") ?? ""}`);
                      set_text(text_6, ` ${$0 ?? ""}`);
                      set_text(text_7, ` ${get$1(schema).rows.length ?? ""}`);
                    },
                    [() => get$1(schema).categories.join(", ")]
                  );
                  append($$anchor5, div_7);
                };
                if_block(node_4, ($$render) => {
                  if (get$1(selectedSchemaId) === get$1(schema).id) $$render(consequent_6);
                });
              }
              reset(div_6);
              template_effect(() => {
                set_class(div_6, 1, `schema-card ${get$1(selectedSchemaId) === get$1(schema).id ? "selected" : ""}`, "svelte-qx734j");
                set_text(text_2, get$1(schema).label);
                set_text(text_3, `v${get$1(schema).version ?? ""}`);
              });
              append($$anchor4, div_6);
            });
            append($$anchor3, fragment);
          };
          if_block(
            $$anchor2,
            ($$render) => {
              if (get$1(metadata).schemas.length === 0) $$render(consequent_3);
              else $$render(alternate_1, false);
            },
            $$elseif
          );
        }
      };
      if_block(node_2, ($$render) => {
        if (isLoading) $$render(consequent_2);
        else $$render(alternate, false);
      });
    }
    reset(div_5);
    reset(div);
    append($$anchor, div);
    pop();
  }
  delegate(["click"]);
  const _MetadataManagementApplication = class _MetadataManagementApplication extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2
  ) {
    constructor() {
      super();
      // Lazy-Memoized Getter – kein Service im Konstruktor auflösen!
      __privateAdd(this, _logger4);
      __privateAdd(this, _svelte4);
      __privateAdd(this, _css4);
      this._openChildApps = /* @__PURE__ */ new Set();
      this.svelteApp = null;
    }
    // Tracking offener Child Apps
    get logger() {
      return __privateGet(this, _logger4) ?? __privateSet(this, _logger4, use(FoundryLogger));
    }
    get svelte() {
      if (!this._appScope) throw new Error("App scope not set. Call _onRender first.");
      return __privateGet(this, _svelte4) ?? __privateSet(this, _svelte4, use(SvelteManager, this._appScope));
    }
    get css() {
      if (!this._appScope) throw new Error("App scope not set. Call _onRender first.");
      return __privateGet(this, _css4) ?? __privateSet(this, _css4, use(CSSManager, this._appScope));
    }
    /** @override */
    get title() {
      return this.options.window.title;
    }
    /** @override */
    async _renderHTML(context, options) {
      return super._renderHTML(context, options);
    }
    /** @override */
    _replaceHTML(html2, options, context) {
      return super._replaceHTML(html2, options, context);
    }
    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      this.logger.info(
        "[MetadataManagementApplication] _prepareContext called with context:",
        context
      );
      this.logger.info(
        "[MetadataManagementApplication] _prepareContext called with options:",
        options
      );
      return context;
    }
    async _loadCSS() {
      const cssPath = "modules/relationship-app/styles/metadata-management-app.css";
      await this.css.loadCSS(cssPath);
    }
    async _onRender(context, options) {
      this.logger.info("[MetadataManagementApplication] _onRender started", { context, options });
      const appId = "MetadataManagementApplication";
      this._appScope = `app-${appId}`;
      setCurrentScope(this._appScope);
      createScopeChain(this._appScope);
      await super._onRender(context, options);
      const target = this.element.querySelector("#metadata-management-svelte");
      if (!target) {
        this.logger.warn("[MetadataManagementApplication] Svelte mount point not found");
        return;
      }
      this.logger.info("[MetadataManagementApplication] Found target element:", target);
      await this.svelte.unmountApp(this.svelteApp);
      this.svelteApp = null;
      await this._loadCSS();
      this.svelteApp = await this.svelte.mountComponent(
        MetadataManagementView,
        target,
        {
          parentScope: this._appScope,
          parentApp: this
          // Parent App-Referenz für automatisches Tracking
        }
      );
      this.logger.info("[MetadataManagementApplication] MetadataManagementView mounted successfully");
    }
    /** @override */
    async _onClose(options) {
      this.logger.info("[MetadataManagementApplication] _onClose called with options:", options);
      if (this._openChildApps.size > 0) {
        this.logger.info(
          `[MetadataManagementApplication] Closing ${this._openChildApps.size} open child apps`
        );
        for (const childApp of this._openChildApps) {
          try {
            await childApp.close();
            this.logger.info(
              `[MetadataManagementApplication] Closed child app: ${childApp.constructor.name}`
            );
          } catch (error) {
            this.logger.warn(`[MetadataManagementApplication] Error closing child app:`, error);
          }
        }
        this._openChildApps.clear();
      }
      await this.svelte.unmountApp(this.svelteApp);
      this.svelteApp = null;
      if (this._appScope) {
        this.logger.info(
          `[MetadataManagementApplication] Disposing scope chain with all child services: ${this._appScope}`
        );
        disposeScopeChain(this._appScope);
        this.logger.info(`[MetadataManagementApplication] ✅ All child services have been disposed`);
      }
      return super._onClose(options);
    }
    /**
     * Dynamic Dialog öffnen mit Parent Scope
     */
    async openDynamicDialog(config) {
      const DynamicDialogApp2 = (await __vitePreload(async () => {
        const { default: __vite_default__ } = await Promise.resolve().then(function() {
          return DynamicDialogApp$1;
        });
        return { default: __vite_default__ };
      }, false ? __VITE_PRELOAD__ : void 0)).default;
      const app = new DynamicDialogApp2(this._appScope);
      this._openChildApps.add(app);
      const result = await new Promise((resolve) => {
        app._prepareConfig(config);
        app._prepareOnSubmit((values) => {
          app.close();
          this._openChildApps.delete(app);
          resolve(values);
        });
        app._prepareOnCancel(() => {
          app.close();
          this._openChildApps.delete(app);
          resolve(null);
        });
        app.render({ force: true });
      });
      return result;
    }
    /**
     * Dynamic Table öffnen mit Parent Scope
     */
    async openDynamicTable(config) {
      const DynamicTableApp2 = (await __vitePreload(async () => {
        const { default: __vite_default__ } = await Promise.resolve().then(function() {
          return DynamicTableApp$1;
        });
        return { default: __vite_default__ };
      }, false ? __VITE_PRELOAD__ : void 0)).default;
      const app = new DynamicTableApp2(this._appScope);
      this._openChildApps.add(app);
      const result = await new Promise((resolve) => {
        app._prepareConfig(config);
        app._prepareOnSubmit((data) => {
          app.close();
          this._openChildApps.delete(app);
          resolve(data);
        });
        app._prepareOnCancel(() => {
          app.close();
          this._openChildApps.delete(app);
          resolve(null);
        });
        app.render({ force: true });
      });
      return result;
    }
  };
  _logger4 = new WeakMap();
  _svelte4 = new WeakMap();
  _css4 = new WeakMap();
  _MetadataManagementApplication.PARTS = {
    main: {
      template: "modules/relationship-app/templates/metadata-management-main.hbs"
    }
  };
  _MetadataManagementApplication.DEFAULT_OPTIONS = {
    // Unique ID for the sheet
    id: "metadata-management",
    // CSS classes to apply
    classes: ["metadata-management"],
    // Window sizing and behavior
    position: { width: 800, height: 600 },
    window: { title: "Metadata Management", resizable: true },
    tag: "div"
  };
  let MetadataManagementApplication = _MetadataManagementApplication;
  const foundryAdapter = new FoundryAdapter();
  const logger = new FoundryLogger();
  const errorHandler = new ConsoleErrorHandler(logger, foundryAdapter);
  const notificationService = new NotificationService(logger, foundryAdapter);
  logger.info(`[SOLID Boot] 🚀 Phase 1: Early Bootstrap - Creating core services`);
  globalThis.relationshipApp = {
    foundryAdapter,
    logger,
    errorHandler,
    notificationService
  };
  logger.info(`[SOLID Boot] ✅ Phase 1 completed - Core services available globally`);
  foundryAdapter.onInit(async () => {
    const { logger: logger2, errorHandler: errorHandler2, notificationService: notificationService2 } = globalThis.relationshipApp;
    logger2.info(`[SOLID Boot] 🚀 Phase 2: Service Registry Setup`);
    try {
      const { ServiceRegistry: ServiceRegistry2 } = await __vitePreload(async () => {
        const { ServiceRegistry: ServiceRegistry3 } = await Promise.resolve().then(function() {
          return ServiceRegistry$1;
        });
        return { ServiceRegistry: ServiceRegistry3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const serviceRegistry = new ServiceRegistry2(logger2);
      const { DependencyMapper: DependencyMapper2 } = await __vitePreload(async () => {
        const { DependencyMapper: DependencyMapper3 } = await Promise.resolve().then(function() {
          return DependencyMapper$1;
        });
        return { DependencyMapper: DependencyMapper3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const dependencyMapper = new DependencyMapper2(logger2, serviceRegistry);
      const { ServicePlanner: ServicePlanner2 } = await __vitePreload(async () => {
        const { ServicePlanner: ServicePlanner3 } = await Promise.resolve().then(function() {
          return ServicePlanner$1;
        });
        return { ServicePlanner: ServicePlanner3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const servicePlanner = new ServicePlanner2(logger2, serviceRegistry, dependencyMapper);
      const { ServiceValidator: ServiceValidator2 } = await __vitePreload(async () => {
        const { ServiceValidator: ServiceValidator3 } = await Promise.resolve().then(function() {
          return ServiceValidator$1;
        });
        return { ServiceValidator: ServiceValidator3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const serviceValidator = new ServiceValidator2(logger2);
      logger2.info(`[SOLID Boot] 📚 Registering ${SERVICE_CONFIG.length} runtime services`);
      serviceRegistry.registerAllServices([...SERVICE_CONFIG]);
      logger2.info(`[SOLID Boot] 🗺️ Building dependency graph`);
      const dependencyGraph = dependencyMapper.buildDependencyGraph();
      logger2.info(`[SOLID Boot] 📋 Creating service plans`);
      const servicePlans = servicePlanner.createServicePlans();
      logger2.info(`[SOLID Boot] 🔍 Validating dependencies and plans`);
      const dependencyValidation = serviceValidator.validateDependencyGraph(dependencyGraph);
      const planValidation = serviceValidator.validateServicePlans(servicePlans);
      if (!dependencyValidation.isValid) {
        throw new Error(`Dependency validation failed: ${dependencyValidation.errors.join(", ")}`);
      }
      if (!planValidation.isValid) {
        throw new Error(`Plan validation failed: ${planValidation.errors.join(", ")}`);
      }
      const { ServiceContainer: ServiceContainer2 } = await __vitePreload(async () => {
        const { ServiceContainer: ServiceContainer3 } = await Promise.resolve().then(function() {
          return ServiceContainer$1;
        });
        return { ServiceContainer: ServiceContainer3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const serviceContainer = new ServiceContainer2(logger2, servicePlans, serviceValidator);
      const { ServiceFactory: ServiceFactory2 } = await __vitePreload(async () => {
        const { ServiceFactory: ServiceFactory3 } = await Promise.resolve().then(function() {
          return ServiceFactory$1;
        });
        return { ServiceFactory: ServiceFactory3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const { ServiceCache: ServiceCache2 } = await __vitePreload(async () => {
        const { ServiceCache: ServiceCache3 } = await Promise.resolve().then(function() {
          return ServiceCache$1;
        });
        return { ServiceCache: ServiceCache3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const { ScopeManager: ScopeManager2 } = await __vitePreload(async () => {
        const { ScopeManager: ScopeManager3 } = await Promise.resolve().then(function() {
          return ScopeManager$1;
        });
        return { ScopeManager: ScopeManager3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const serviceCache = new ServiceCache2(logger2);
      const scopeManager = new ScopeManager2(logger2);
      const serviceFactory = new ServiceFactory2(
        logger2,
        servicePlans,
        serviceValidator,
        serviceContainer
      );
      serviceContainer.setServiceFactory(serviceFactory);
      serviceContainer.setServiceCache(serviceCache);
      serviceContainer.setScopeManager(scopeManager);
      const { ServiceRegistrar: ServiceRegistrar2 } = await __vitePreload(async () => {
        const { ServiceRegistrar: ServiceRegistrar3 } = await Promise.resolve().then(function() {
          return ServiceRegistrar$1;
        });
        return { ServiceRegistrar: ServiceRegistrar3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const serviceRegistrar = new ServiceRegistrar2(logger2, serviceContainer);
      const { APIManager: APIManager2 } = await __vitePreload(async () => {
        const { APIManager: APIManager3 } = await Promise.resolve().then(function() {
          return APIManager$1;
        });
        return { APIManager: APIManager3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const apiManager = new APIManager2(logger2, serviceContainer);
      logger2.info(`[SOLID Boot] 📝 Registering services as factories`);
      serviceRegistrar.registerAllServices();
      logger2.info(`[SOLID Boot] 🔧 Registering settings via SettingsService`);
      const { SettingsService: SettingsService2 } = await __vitePreload(async () => {
        const { SettingsService: SettingsService3 } = await Promise.resolve().then(function() {
          return SettingsService$1;
        });
        return { SettingsService: SettingsService3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const settingsService = new SettingsService2(logger2, foundryAdapter);
      settingsService.registerAll();
      setContainer(serviceContainer);
      logger2.info(`[SOLID Boot] 🌐 Registering services in Foundry API`);
      apiManager.registerInGlobalAPI();
      let debugEnabled = false;
      try {
        debugEnabled = game?.settings?.get("relationship-app", "debugLogs") === true;
      } catch (error) {
        debugEnabled = false;
      }
      if (debugEnabled) {
        globalThis.relationshipApp = {
          ...globalThis.relationshipApp,
          serviceContainer,
          // ← Für getService()
          serviceRegistrar,
          // ← Für getService()
          apiManager
          // ← Für API-Zugriff
        };
      }
      logger2.info(
        `[SOLID Boot] ✅ Phase 2 completed - All services registered and available (on-demand)`
      );
    } catch (error) {
      logger2.error(`[SOLID Boot] ❌ Phase 2 failed:`, error);
      errorHandler2.handle(error, "SOLID Boot Phase 2");
      notificationService2.showError("Service registration failed. Check console for details.");
    }
  });
  foundryAdapter.onReady(async () => {
    const { logger: logger2, errorHandler: errorHandler2, notificationService: notificationService2 } = globalThis.relationshipApp;
    logger2.info(`[SOLID Boot] 🚀 Phase 3: Module Initialization`);
    try {
      const { RegistrationService: RegistrationService2 } = await __vitePreload(async () => {
        const { RegistrationService: RegistrationService3 } = await Promise.resolve().then(function() {
          return RegistrationService$1;
        });
        return { RegistrationService: RegistrationService3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const registrationService = new RegistrationService2(logger2, errorHandler2);
      const { ModuleInitializer: ModuleInitializer2 } = await __vitePreload(async () => {
        const { ModuleInitializer: ModuleInitializer3 } = await Promise.resolve().then(function() {
          return ModuleInitializer$1;
        });
        return { ModuleInitializer: ModuleInitializer3 };
      }, false ? __VITE_PRELOAD__ : void 0);
      const moduleInitializer = new ModuleInitializer2(logger2, errorHandler2, registrationService);
      logger2.info(`[SOLID Boot] 🚀 Starting module initialization`);
      await moduleInitializer.initialize();
      logger2.info(`[SOLID Boot] ✅ Phase 3 completed - Module initialized`);
      notificationService2.showSuccess("SOLID Boot completed successfully!");
    } catch (error) {
      logger2.error(`[SOLID Boot] ❌ Phase 3 failed:`, error);
      errorHandler2.handle(error, "SOLID Boot Phase 3");
      notificationService2.showError("Module initialization failed. Check console for details.");
    }
    const metadataManagementApplication = new MetadataManagementApplication();
    await metadataManagementApplication.render({ force: true });
    logger2.info(`[SOLID Boot] Metadata Management Application rendered`);
  });
})();
//# sourceMappingURL=relationship-app.js.map
