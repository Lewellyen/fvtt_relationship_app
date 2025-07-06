const { HandlebarsApplicationMixin } = foundry.applications.api;
const { JournalEntryPageSheet } = foundry.applications.sheets.journal;

// Helper function for localization with fallback
function localize(key: string, fallback?: string): string {
  return game.i18n?.localize(key) || fallback || key;
}

// Use type assertion to break the infinite type recursion
export default class JournalEntryPageRelationshipGraphSheet extends (HandlebarsApplicationMixin(
  JournalEntryPageSheet,
) as any) {
  static DEFAULT_OPTIONS = {
    id: "relationship-graph-sheet",
    classes: [
      "relationship-graph-sheet",
      "journal-sheet",
      "journal-entry-page",
    ],
    position: {
      width: 800,
      height: 600,
    },
    resizable: true,
    tag: "div",
    mode: "edit", // Default to edit mode
  };

  static PARTS = {
    div: {
      template:
        "./modules/relationship-app/templates/relationship-graph-combined.hbs",
    },
  };

  /**
   * Whether the sheet is in view mode.
   * @returns {boolean}
   */
  get isView() {
    return this.options.mode === "view";
  }

  /**
   * Whether the sheet is in edit mode.
   * @returns {boolean}
   */
  get isEdit() {
    return this.options.mode === "edit";
  }

  /**
   * The JournalEntryPage for this sheet.
   * @returns {JournalEntryPage}
   */
  get page() {
    return this.document;
  }

  async _preparePartContext(partId: any, context: any) {
    context.partId = `${this.id}-${partId}`;
    return context;
  }

  /** @override */
  async _prepareContext(options: any) {
    console.log("🔍 [RelationshipGraph] _prepareContext called", { options });
    const context = await super._prepareContext(options);
    console.log(
      "🔍 [RelationshipGraph] super._prepareContext result:",
      context,
    );

    // Register Handlebars helpers
    if (!Handlebars.helpers.objectLength) {
      Handlebars.registerHelper("objectLength", function (obj: any) {
        if (!obj || typeof obj !== "object") return 0;
        return Object.keys(obj).length;
      });
    }

    const graphData = this.document.system as any;
    console.log("🔍 [RelationshipGraph] document.system:", graphData);
    (context as any).graphData = {
      nodes: graphData?.nodes || [],
      edges: graphData?.edges || [],
      settings: graphData?.settings || {},
      nodeCount: graphData?.nodes?.length || 0,
      edgeCount: graphData?.edges?.length || 0,
    };
    (context as any).isEditMode = this.isEdit;
    (context as any).isViewMode = this.isView;
    (context as any).canEdit =
      this.isEdit &&
      game.user &&
      this.document.canUserModify?.(game.user, "update");
    (context as any).canView =
      game.user && this.document.canUserModify?.(game.user, "limited");
    console.log("🔍 [RelationshipGraph] final context:", context);
    console.log(
      "🔍 [RelationshipGraph] document.system in context:",
      this.document.system,
    );
    return context;
  }

  /** @override */
  async _onRender(context: any, options: any) {
    try {
      console.log("🔍 [RelationshipGraph] _onRender called", {
        context,
        options,
      });

      await super._onRender(context, options);
      const html = this.element as HTMLElement;

      // Basic event listeners for both modes
      this._attachBasicEventListeners(html);

      // Edit mode specific event listeners
      if (context.isEditMode) {
        this._attachEditModeEventListeners(html);
      }

      // View mode specific event listeners
      if (!context.isEditMode) {
        this._attachViewModeEventListeners(html);
      }

      console.log("🔍 [RelationshipGraph] Event listeners attached");
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error in _onRender:", error);
      throw error;
    }
  }

  /**
   * Handle edit page button click.
   * @param {Event} event - The click event
   * @protected
   */
  async _onEditPageClick(event: Event) {
    event.preventDefault();
    // Switch to edit mode
    await this.render({ mode: "edit" });
  }

  _attachBasicEventListeners(html: HTMLElement) {
    // Settings change listeners
    html
      .querySelectorAll(
        'input[name="settings.title"], textarea[name="settings.description"]',
      )
      .forEach((input) =>
        input.addEventListener("change", this._onSettingsChange.bind(this)),
      );

    // Checkbox settings
    html
      .querySelectorAll(
        'input[name="settings.showProperties"], input[name="settings.showLabels"]',
      )
      .forEach((checkbox) =>
        checkbox.addEventListener("change", this._onSettingsChange.bind(this)),
      );
  }

  _attachEditModeEventListeners(html: HTMLElement) {
    // Toolbar buttons
    html
      .querySelector(".add-node-btn")
      ?.addEventListener("click", this._onAddNodeClick.bind(this));
    html
      .querySelector(".add-edge-btn")
      ?.addEventListener("click", this._onAddEdgeClick.bind(this));
    html
      .querySelector(".clear-graph-btn")
      ?.addEventListener("click", this._onClearGraphClick.bind(this));
    html
      .querySelector(".export-graph-btn")
      ?.addEventListener("click", this._onExportGraphClick.bind(this));

    // Node actions
    html
      .querySelectorAll(".edit-node-btn")
      .forEach((btn) =>
        btn.addEventListener("click", this._onEditNodeClick.bind(this)),
      );
    html
      .querySelectorAll(".remove-node-btn")
      .forEach((btn) =>
        btn.addEventListener("click", this._onRemoveNodeClick.bind(this)),
      );

    // Edge actions
    html
      .querySelectorAll(".edit-edge-btn")
      .forEach((btn) =>
        btn.addEventListener("click", this._onEditEdgeClick.bind(this)),
      );
    html
      .querySelectorAll(".remove-edge-btn")
      .forEach((btn) =>
        btn.addEventListener("click", this._onRemoveEdgeClick.bind(this)),
      );

    // Modal event listeners
    this._attachModalEventListeners(html);

    // View button in edit mode
    html
      .querySelectorAll("[data-action='viewPage']")
      .forEach((btn) =>
        btn.addEventListener("click", this._onViewPageClick.bind(this)),
      );
  }

  _attachViewModeEventListeners(html: HTMLElement) {
    // Legend item clicks
    html
      .querySelectorAll(".legend-item")
      .forEach((item) =>
        item.addEventListener("click", this._onLegendItemClick.bind(this)),
      );

    // Node details panel interactions
    html
      .querySelectorAll(".node-details-panel, .edge-details-panel")
      .forEach((panel) => {
        const closeBtn = panel.querySelector(".close-panel");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            (panel as HTMLElement).style.display = "none";
          });
        }
      });

    // Edit button in view mode
    html
      .querySelectorAll("[data-action='editPage']")
      .forEach((btn) =>
        btn.addEventListener("click", this._onEditPageClick.bind(this)),
      );
  }

  /**
   * Handle view page button click.
   * @param {Event} event - The click event
   * @protected
   */
  async _onViewPageClick(event: Event) {
    event.preventDefault();
    // Switch to view mode
    await this.render({ mode: "view" });
  }

  _attachModalEventListeners(html: HTMLElement) {
    // Node modal
    const nodeModal = html.querySelector("#node-editor-modal") as HTMLElement;
    if (nodeModal) {
      html.querySelector("#node-modal-close")?.addEventListener("click", () => {
        nodeModal.style.display = "none";
      });
      html
        .querySelector("#node-modal-cancel")
        ?.addEventListener("click", () => {
          nodeModal.style.display = "none";
        });
      html
        .querySelector("#node-modal-save")
        ?.addEventListener("click", this._onNodeModalSave.bind(this));

      // Range input value display
      const sizeInput = html.querySelector(
        "#node-size-input",
      ) as HTMLInputElement;
      const sizeValue = html.querySelector("#node-size-value");
      if (sizeInput && sizeValue) {
        sizeInput.addEventListener("input", () => {
          sizeValue.textContent = sizeInput.value;
        });
      }
    }

    // Edge modal
    const edgeModal = html.querySelector("#edge-editor-modal") as HTMLElement;
    if (edgeModal) {
      html.querySelector("#edge-modal-close")?.addEventListener("click", () => {
        edgeModal.style.display = "none";
      });
      html
        .querySelector("#edge-modal-cancel")
        ?.addEventListener("click", () => {
          edgeModal.style.display = "none";
        });
      html
        .querySelector("#edge-modal-save")
        ?.addEventListener("click", this._onEdgeModalSave.bind(this));

      // Range input value display
      const widthInput = html.querySelector(
        "#edge-width-input",
      ) as HTMLInputElement;
      const widthValue = html.querySelector("#edge-width-value");
      if (widthInput && widthValue) {
        widthInput.addEventListener("input", () => {
          widthValue.textContent = widthInput.value;
        });
      }
    }
  }

  async _onAddNodeClick(event: any) {
    event.preventDefault();
    const nodeData = {
      id: `node_${Date.now()}`,
      label: "New Node",
      x: Math.random() * 400,
      y: Math.random() * 300,
      type: "default",
      properties: {},
      color: "#4a90e2",
      size: 20,
    };
    await this._onNodeAdd(nodeData);
  }

  async _onNodeAdd(nodeData: any) {
    try {
      console.log("🔍 [RelationshipGraph] Node add - Before:", {
        currentSystem: this.document.system,
        newNodeData: nodeData,
      });

      // Get current data from the document using foundry.utils.getProperty
      const currentNodes =
        (foundry.utils.getProperty(this.document.system, "nodes") as any[]) ||
        [];
      const currentEdges =
        (foundry.utils.getProperty(this.document.system, "edges") as any[]) ||
        [];
      const currentSettings =
        (foundry.utils.getProperty(this.document.system, "settings") as Record<
          string,
          any
        >) || {};

      // Create updated data
      const updatedNodes = [...currentNodes, nodeData];

      const updateData = {
        system: {
          nodes: updatedNodes,
          edges: currentEdges,
          settings: currentSettings,
          nodeCount: updatedNodes.length,
          edgeCount: currentEdges.length,
        },
      };

      console.log("🔍 [RelationshipGraph] Node add - Update data:", updateData);

      // Update the document
      await this.document.update(updateData);

      console.log(
        "🔍 [RelationshipGraph] Node add - After:",
        this.document.system,
      );

      await this.render({ force: true });
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error adding node:", error);
      ui.notifications?.error("Failed to add node to graph");
    }
  }

  async _onAddEdgeClick(event: any) {
    event.preventDefault();
    const edgeData = {
      source: "node_1",
      target: "node_2",
      label: "New Edge",
      type: "default",
      properties: {},
      color: "#666666",
      width: 1,
    };
    await this._onEdgeAdd(edgeData);
  }

  async _onEdgeAdd(edgeData: any) {
    try {
      // Get current data from the document using foundry.utils.getProperty
      const currentNodes =
        (foundry.utils.getProperty(this.document.system, "nodes") as any[]) ||
        [];
      const currentEdges =
        (foundry.utils.getProperty(this.document.system, "edges") as any[]) ||
        [];
      const currentSettings =
        (foundry.utils.getProperty(this.document.system, "settings") as Record<
          string,
          any
        >) || {};

      // Create updated data
      const updatedEdges = [...currentEdges, edgeData];

      // Update the document
      await this.document.update({
        system: {
          nodes: currentNodes,
          edges: updatedEdges,
          settings: currentSettings,
          nodeCount: currentNodes.length,
          edgeCount: updatedEdges.length,
        },
      });
      await this.render({ force: true });
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error adding edge:", error);
      ui.notifications?.error("Failed to add edge to graph");
    }
  }

  async _onEditNodeClick(event: any) {
    event.preventDefault();
    const nodeId = event.currentTarget.dataset.nodeId;

    try {
      // Get current node data
      const currentNodes =
        (foundry.utils.getProperty(this.document.system, "nodes") as any[]) ||
        [];
      const node = currentNodes.find((n: any) => n.id === nodeId);

      if (!node) {
        ui.notifications?.error("Node not found");
        return;
      }

      console.log("🔍 [RelationshipGraph] Editing node:", node);

      // Get modal elements
      const modal = this.element?.querySelector(
        "#node-editor-modal",
      ) as HTMLElement;
      const form = this.element?.querySelector(
        "#node-editor-form",
      ) as HTMLFormElement;

      if (!modal || !form) {
        ui.notifications?.error("Modal not found");
        return;
      }

      // Set form data
      form.dataset.nodeId = nodeId;

      const labelInput = form.querySelector(
        "#node-label-input",
      ) as HTMLInputElement;
      const typeSelect = form.querySelector(
        "#node-type-input",
      ) as HTMLSelectElement;
      const colorInput = form.querySelector(
        "#node-color-input",
      ) as HTMLInputElement;
      const sizeInput = form.querySelector(
        "#node-size-input",
      ) as HTMLInputElement;
      const sizeValue = form.querySelector("#node-size-value") as HTMLElement;
      const propertiesInput = form.querySelector(
        "#node-properties-input",
      ) as HTMLTextAreaElement;

      if (labelInput) labelInput.value = node.label || "";
      if (typeSelect) typeSelect.value = node.type || "default";
      if (colorInput) colorInput.value = node.color || "#4a90e2";
      if (sizeInput) {
        sizeInput.value = (node.size || 20).toString();
        if (sizeValue) sizeValue.textContent = sizeInput.value;
      }
      if (propertiesInput) {
        // Convert properties object to string
        const propertiesString =
          node.properties && Object.keys(node.properties).length > 0
            ? JSON.stringify(node.properties, null, 2)
            : "";
        propertiesInput.value = propertiesString;
      }

      // Show modal
      modal.style.display = "block";
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error opening node editor:", error);
      ui.notifications?.error("Failed to open node editor");
    }
  }

  async _onRemoveNodeClick(event: any) {
    event.preventDefault();
    const nodeId = event.currentTarget.dataset.nodeId;
    await this._onNodeRemove(nodeId);
  }

  async _onNodeRemove(nodeId: any) {
    try {
      // Get current data from the document using foundry.utils.getProperty
      const currentNodes =
        (foundry.utils.getProperty(this.document.system, "nodes") as any[]) ||
        [];
      const currentEdges =
        (foundry.utils.getProperty(this.document.system, "edges") as any[]) ||
        [];
      const currentSettings =
        (foundry.utils.getProperty(this.document.system, "settings") as Record<
          string,
          any
        >) || {};

      // Remove node and its connected edges
      const updatedNodes = currentNodes.filter((n: any) => n.id !== nodeId);
      const updatedEdges = currentEdges.filter(
        (e: any) => e.source !== nodeId && e.target !== nodeId,
      );

      await this.document.update({
        system: {
          nodes: updatedNodes,
          edges: updatedEdges,
          settings: currentSettings,
          nodeCount: updatedNodes.length,
          edgeCount: updatedEdges.length,
        },
      });
      await this.render({ force: true });
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error removing node:", error);
      ui.notifications?.error("Failed to remove node");
    }
  }

  async _onEditEdgeClick(event: any) {
    event.preventDefault();
    const source = event.currentTarget.dataset.source;
    const target = event.currentTarget.dataset.target;

    try {
      // Get current edge data
      const currentEdges =
        (foundry.utils.getProperty(this.document.system, "edges") as any[]) ||
        [];
      const edge = currentEdges.find(
        (e: any) => e.source === source && e.target === target,
      );

      if (!edge) {
        ui.notifications?.error("Edge not found");
        return;
      }

      console.log("🔍 [RelationshipGraph] Editing edge:", edge);

      // Get modal elements
      const modal = this.element?.querySelector(
        "#edge-editor-modal",
      ) as HTMLElement;
      const form = this.element?.querySelector(
        "#edge-editor-form",
      ) as HTMLFormElement;

      if (!modal || !form) {
        ui.notifications?.error("Modal not found");
        return;
      }

      // Set form data
      form.dataset.edgeId = `${source}-${target}`;

      const sourceSelect = form.querySelector(
        "#edge-source-input",
      ) as HTMLSelectElement;
      const targetSelect = form.querySelector(
        "#edge-target-input",
      ) as HTMLSelectElement;
      const labelInput = form.querySelector(
        "#edge-label-input",
      ) as HTMLInputElement;
      const typeSelect = form.querySelector(
        "#edge-type-input",
      ) as HTMLSelectElement;
      const colorInput = form.querySelector(
        "#edge-color-input",
      ) as HTMLInputElement;
      const widthInput = form.querySelector(
        "#edge-width-input",
      ) as HTMLInputElement;
      const widthValue = form.querySelector("#edge-width-value") as HTMLElement;
      const propertiesInput = form.querySelector(
        "#edge-properties-input",
      ) as HTMLTextAreaElement;

      if (sourceSelect) sourceSelect.value = edge.source || "";
      if (targetSelect) targetSelect.value = edge.target || "";
      if (labelInput) labelInput.value = edge.label || "";
      if (typeSelect) typeSelect.value = edge.type || "default";
      if (colorInput) colorInput.value = edge.color || "#666666";
      if (widthInput) {
        widthInput.value = (edge.width || 1).toString();
        if (widthValue) widthValue.textContent = widthInput.value;
      }
      if (propertiesInput) {
        // Convert properties object to string
        const propertiesString =
          edge.properties && Object.keys(edge.properties).length > 0
            ? JSON.stringify(edge.properties, null, 2)
            : "";
        propertiesInput.value = propertiesString;
      }

      // Show modal
      modal.style.display = "block";
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error opening edge editor:", error);
      ui.notifications?.error("Failed to open edge editor");
    }
  }

  async _onRemoveEdgeClick(event: any) {
    event.preventDefault();
    const source = event.currentTarget.dataset.source;
    const target = event.currentTarget.dataset.target;
    await this._onEdgeRemove(source, target);
  }

  async _onEdgeRemove(source: any, target: any) {
    try {
      // Get current data from the document using foundry.utils.getProperty
      const currentNodes =
        (foundry.utils.getProperty(this.document.system, "nodes") as any[]) ||
        [];
      const currentEdges =
        (foundry.utils.getProperty(this.document.system, "edges") as any[]) ||
        [];
      const currentSettings =
        (foundry.utils.getProperty(this.document.system, "settings") as Record<
          string,
          any
        >) || {};

      // Remove the specific edge
      const updatedEdges = currentEdges.filter(
        (e: any) => !(e.source === source && e.target === target),
      );

      await this.document.update({
        system: {
          nodes: currentNodes,
          edges: updatedEdges,
          settings: currentSettings,
          nodeCount: currentNodes.length,
          edgeCount: updatedEdges.length,
        },
      });
      await this.render({ force: true });
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error removing edge:", error);
      ui.notifications?.error("Failed to remove edge");
    }
  }

  async _onSettingsChange(event: any) {
    const target = event.currentTarget;
    const settingName = target.name.replace("settings.", "");

    // Handle different input types
    let settingValue: any;
    if (target.type === "checkbox") {
      settingValue = target.checked;
    } else {
      settingValue = target.value;
    }

    const settings = { [settingName]: settingValue };
    await this._onSettingsUpdate(settings);
  }

  async _onSettingsUpdate(settings: any) {
    try {
      console.log("🔍 [RelationshipGraph] Settings update - Before:", {
        currentSystem: this.document.system,
        newSettings: settings,
      });

      // Get current data from the document using foundry.utils.getProperty
      const currentNodes =
        (foundry.utils.getProperty(this.document.system, "nodes") as any[]) ||
        [];
      const currentEdges =
        (foundry.utils.getProperty(this.document.system, "edges") as any[]) ||
        [];
      const currentSettings =
        (foundry.utils.getProperty(this.document.system, "settings") as Record<
          string,
          any
        >) || {};

      // Update settings properly
      const updatedSettings = { ...currentSettings, ...settings };

      const updateData = {
        system: {
          nodes: currentNodes,
          edges: currentEdges,
          settings: updatedSettings,
          nodeCount: currentNodes.length,
          edgeCount: currentEdges.length,
        },
      };

      console.log(
        "🔍 [RelationshipGraph] Settings update - Update data:",
        updateData,
      );

      await this.document.update(updateData);

      console.log(
        "🔍 [RelationshipGraph] Settings update - After:",
        this.document.system,
      );

      await this.render({ force: true });
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error updating settings:", error);
      ui.notifications?.error("Failed to update graph settings");
    }
  }

  // New event handlers for edit mode
  async _onClearGraphClick(event: any) {
    event.preventDefault();
    const confirmed = await Dialog.confirm({
      title: localize(
        "RELATIONSHIP_APP.CLEAR_GRAPH_CONFIRM_TITLE",
        "Graph leeren",
      ),
      content: localize(
        "RELATIONSHIP_APP.CLEAR_GRAPH_CONFIRM_CONTENT",
        "Sind Sie sicher, dass Sie alle Knoten und Kanten löschen möchten?",
      ),
    });

    if (confirmed) {
      try {
        await this.document.update({
          system: {
            nodes: [],
            edges: [],
            settings: this.document.system?.settings || {},
          },
        });
        await this.render({ force: true });
        ui.notifications?.info(
          localize("RELATIONSHIP_APP.GRAPH_CLEARED", "Graph wurde geleert"),
        );
      } catch (error) {
        ui.notifications?.error("Failed to clear graph");
      }
    }
  }

  async _onExportGraphClick(event: any) {
    event.preventDefault();
    try {
      const graphData = this.document.system as any;
      const exportData = {
        version: "1.0",
        timestamp: new Date().toISOString(),
        data: graphData,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relationship-graph-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);

      ui.notifications?.info(
        localize("RELATIONSHIP_APP.GRAPH_EXPORTED", "Graph wurde exportiert"),
      );
    } catch (error) {
      ui.notifications?.error("Failed to export graph");
    }
  }

  async _onLegendItemClick(event: any) {
    event.preventDefault();
    const nodeId = event.currentTarget.dataset.nodeId;
    const graphData = this.document.system as any;
    const node = graphData.nodes?.find((n: any) => n.id === nodeId);

    if (node) {
      this._showNodeDetails(node);
    }
  }

  _showNodeDetails(node: any) {
    const detailsPanel = this.element?.querySelector(
      "#node-details",
    ) as HTMLElement;
    if (detailsPanel) {
      const labelSpan = detailsPanel.querySelector("#node-label");
      const typeSpan = detailsPanel.querySelector("#node-type");
      const colorSpan = detailsPanel.querySelector("#node-color");

      if (labelSpan) labelSpan.textContent = node.label;
      if (typeSpan) typeSpan.textContent = node.type;
      if (colorSpan) {
        colorSpan.textContent = node.color;
        (colorSpan as HTMLElement).style.color = node.color;
      }

      // Show properties if enabled
      const propertiesList = detailsPanel.querySelector("#properties-list");
      if (
        propertiesList &&
        node.properties &&
        Object.keys(node.properties).length > 0
      ) {
        propertiesList.innerHTML = Object.entries(node.properties)
          .map(([key, value]) => `<div><strong>${key}:</strong> ${value}</div>`)
          .join("");
      }

      detailsPanel.style.display = "block";
    }
  }

  async _onNodeModalSave(event: any) {
    event.preventDefault();
    const form = this.element?.querySelector(
      "#node-editor-form",
    ) as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);
    const nodeData = {
      id: form.dataset.nodeId || `node_${Date.now()}`,
      label: formData.get("label") as string,
      type: formData.get("type") as string,
      color: formData.get("color") as string,
      size: parseInt(formData.get("size") as string),
      properties: this._parseProperties(formData.get("properties") as string),
    };

    try {
      if (form.dataset.nodeId) {
        await this._onNodeUpdate(nodeData);
      } else {
        await this._onNodeAdd(nodeData);
      }

      const modal = this.element?.querySelector(
        "#node-editor-modal",
      ) as HTMLElement;
      if (modal) modal.style.display = "none";
    } catch (error) {
      ui.notifications?.error("Failed to save node");
    }
  }

  async _onEdgeModalSave(event: any) {
    event.preventDefault();
    const form = this.element?.querySelector(
      "#edge-editor-form",
    ) as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);
    const edgeData = {
      source: formData.get("source") as string,
      target: formData.get("target") as string,
      label: formData.get("label") as string,
      type: formData.get("type") as string,
      color: formData.get("color") as string,
      width: parseInt(formData.get("width") as string),
      properties: this._parseProperties(formData.get("properties") as string),
    };

    try {
      if (form.dataset.edgeId) {
        await this._onEdgeUpdate(edgeData);
      } else {
        await this._onEdgeAdd(edgeData);
      }

      const modal = this.element?.querySelector(
        "#edge-editor-modal",
      ) as HTMLElement;
      if (modal) modal.style.display = "none";
    } catch (error) {
      ui.notifications?.error("Failed to save edge");
    }
  }

  async _onNodeUpdate(nodeData: any) {
    try {
      // Get current data from the document using foundry.utils.getProperty
      const currentNodes =
        (foundry.utils.getProperty(this.document.system, "nodes") as any[]) ||
        [];
      const currentEdges =
        (foundry.utils.getProperty(this.document.system, "edges") as any[]) ||
        [];
      const currentSettings =
        (foundry.utils.getProperty(this.document.system, "settings") as Record<
          string,
          any
        >) || {};

      // Update the specific node
      const nodeIndex = currentNodes.findIndex(
        (n: any) => n.id === nodeData.id,
      );
      if (nodeIndex !== -1) {
        currentNodes[nodeIndex] = {
          ...currentNodes[nodeIndex],
          ...nodeData,
        };

        await this.document.update({
          system: {
            nodes: currentNodes,
            edges: currentEdges,
            settings: currentSettings,
            nodeCount: currentNodes.length,
            edgeCount: currentEdges.length,
          },
        });
        await this.render({ force: true });
      }
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error updating node:", error);
      ui.notifications?.error("Failed to update node");
    }
  }

  async _onEdgeUpdate(edgeData: any) {
    try {
      // Get current data from the document using foundry.utils.getProperty
      const currentNodes =
        (foundry.utils.getProperty(this.document.system, "nodes") as any[]) ||
        [];
      const currentEdges =
        (foundry.utils.getProperty(this.document.system, "edges") as any[]) ||
        [];
      const currentSettings =
        (foundry.utils.getProperty(this.document.system, "settings") as Record<
          string,
          any
        >) || {};

      // Update the specific edge
      const edgeIndex = currentEdges.findIndex(
        (e: any) =>
          e.source === edgeData.source && e.target === edgeData.target,
      );
      if (edgeIndex !== -1) {
        currentEdges[edgeIndex] = {
          ...currentEdges[edgeIndex],
          ...edgeData,
        };

        await this.document.update({
          system: {
            nodes: currentNodes,
            edges: currentEdges,
            settings: currentSettings,
            nodeCount: currentNodes.length,
            edgeCount: currentEdges.length,
          },
        });
        await this.render({ force: true });
      }
    } catch (error) {
      console.error("🔍 [RelationshipGraph] Error updating edge:", error);
      ui.notifications?.error("Failed to update edge");
    }
  }

  _parseProperties(propertiesString: string): Record<string, any> {
    if (!propertiesString?.trim()) return {};

    try {
      // Try to parse as JSON first
      return JSON.parse(propertiesString);
    } catch {
      // Fallback to key=value format
      const properties: Record<string, any> = {};
      const lines = propertiesString.split("\n");

      for (const line of lines) {
        const [key, ...valueParts] = line.split("=");
        if (key?.trim()) {
          properties[key.trim()] = valueParts.join("=").trim();
        }
      }

      return properties;
    }
  }
}
