const fields = foundry.data.fields;

export class RelationshipGraphModel extends foundry.abstract.TypeDataModel<any, any, any, any> {
  static defineSchema() {
    return {
      nodes: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField({ required: true, blank: false }),
          label: new fields.StringField({ blank: false }),
          x: new fields.NumberField({ required: true }),
          y: new fields.NumberField({ required: true }),
        }),
        { required: true, blank: true }
      ),
      edges: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField({ required: true, blank: false }),
          label: new fields.StringField({ blank: false }),
          from: new fields.StringField({ required: true, blank: false }),
          to: new fields.StringField({ required: true, blank: false }),
          type: new fields.StringField({ required: true, blank: false }),
          color: new fields.ColorField({ required: true, blank: false }),
        }),
        { required: true, blank: true }
      ),
    };
  }
}

// Automatisch abgeleitete Typen aus dem Schema
import type { DataOfModel } from "../services/SchemaToTypeScriptConvertService";

// Explizit typisiertes RawSchema für RelationshipGraphModel
// (damit InferSchema korrekt funktioniert)
// type RawSchema = ReturnType<typeof RelationshipGraphModel.defineSchema>;

export type RelationshipGraphData = DataOfModel<typeof RelationshipGraphModel>;
export type NodeData = RelationshipGraphData["nodes"] extends Array<infer T> ? T : never;
export type EdgeData = RelationshipGraphData["edges"] extends Array<infer T> ? T : never;

// ✅ Centralized component props interfaces
export interface GraphComponentProps {
  nodes: NodeData[];
  edges: EdgeData[];
}

export interface IDocument {
  system: any;
  update(data: any): Promise<void>;
}
