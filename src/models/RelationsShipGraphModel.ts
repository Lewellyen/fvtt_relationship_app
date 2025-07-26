const fields = foundry.data.fields;
import { PermissionsModel } from "./PermissionsModel";
import { DescriptionModel } from "./DescriptionModel";
import { RelationshipEffectModel } from "./RelationshipEffectModel";
import { CytoScapeNodeAttributesModel } from "./CytoScapeNodeAttributesModel";
import { CytoScapeEdgeAttributesModel } from "./CytoScapeEdgeAttributesModel";

export class RelationshipGraphModel extends foundry.abstract.TypeDataModel<any, any, any, any> {
  static defineSchema() {
    return {
      // GRAPH METADATA
      // Name/Titel des Graphen
      name: new fields.StringField({ required: true, blank: false, initial: "Neuer Beziehungsgraph" }),
      // Beschreibung des Graphen
      description: new fields.HTMLField({ required: false, blank: true }),
      // Graph-Level Berechtigungen
      permissions: new fields.EmbeddedDataField(PermissionsModel, { required: true, blank: false }),
      // Version des Graphen
      version: new fields.StringField({ required: false, blank: true, initial: "1.0.0" }),
      // Erstellungsdatum
      created: new fields.NumberField({ required: false, blank: true }),
      // Letzte Änderung
      modified: new fields.NumberField({ required: false, blank: true }),
      
      // GRAPH SETTINGS
      // Zoom-Level
      zoom: new fields.NumberField({ required: false, blank: true, initial: 1 }),
      // Pan-Position X
      panX: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Pan-Position Y
      panY: new fields.NumberField({ required: false, blank: true, initial: 0 }),
      // Layout-Typ (grid, random, circle, etc.)
      layoutType: new fields.StringField({ required: false, blank: true, initial: "grid" }),
      
      // NODES
      nodes: new fields.ArrayField(
        new fields.SchemaField({
          // ERFORDERLICHE FELDER
          id: new fields.StringField({ required: true, blank: false }),
          x: new fields.NumberField({ required: true, blank: false }),
          y: new fields.NumberField({ required: true, blank: false }),
          type: new fields.SchemaField({
            value: new fields.StringField({ required: true, blank: false }),
            permissions: new fields.EmbeddedDataField(PermissionsModel, { required: true }),
          }, { required: true, blank: false }),
          globalPermissions: new fields.EmbeddedDataField(PermissionsModel, { required: true }),
          
          // OPTIONALE FELDER
          label: new fields.SchemaField({
            value: new fields.StringField({ required: false, blank: true, initial: "" }),
            permissions: new fields.EmbeddedDataField(PermissionsModel, { required: true }),
          }, { required: true, blank: false }),
          image: new fields.SchemaField({
            path: new fields.FilePathField({ required: false, blank: true, categories: ["IMAGE"] }),
            permissions: new fields.EmbeddedDataField(PermissionsModel, { required: true }),
          }, { required: true, blank: false }),
          descriptions: new fields.SetField(
            new fields.EmbeddedDataField(DescriptionModel, { required: true, blank: true })
          ),
          playerRelationshipEffects: new fields.SetField(
            new fields.EmbeddedDataField(RelationshipEffectModel, { required: true, blank: true })
          ),
          cytoScapeAttributes: new fields.EmbeddedDataField(CytoScapeNodeAttributesModel, { required: true, blank: true }),
        }),
        { required: true, blank: true }
      ),
      
      // EDGES
      edges: new fields.ArrayField(
        new fields.SchemaField({
          // ERFORDERLICHE FELDER
          id: new fields.StringField({ required: true, blank: false }),
          source: new fields.StringField({ required: true, blank: false }),
          target: new fields.StringField({ required: true, blank: false }),
          type: new fields.StringField({ required: true, blank: false }),
          globalPermissions: new fields.EmbeddedDataField(PermissionsModel, { required: true }),
          
          // OPTIONALE FELDER
          label: new fields.SchemaField({
            value: new fields.StringField({ required: false, blank: true, initial: "" }),
            permissions: new fields.EmbeddedDataField(PermissionsModel, { required: true }),
          }, { required: true, blank: false }),
          connectionCategory: new fields.SchemaField({
            value: new fields.StringField({ required: false, blank: true }),
            permissions: new fields.EmbeddedDataField(PermissionsModel, { required: true }),
          }, { required: true, blank: false }),
          cytoScapeAttributes: new fields.EmbeddedDataField(CytoScapeEdgeAttributesModel, { required: true, blank: true }),
        }),
        { required: true, blank: true }
      ),
    };
  }
}