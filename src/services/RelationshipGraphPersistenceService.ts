import type { IDocument, RelationshipGraphData } from "../global";
import type { IRelationshipGraphPersistenceService } from "./IRelationshipGraphPersistenceService";

export class RelationshipGraphPersistenceService implements IRelationshipGraphPersistenceService {
  async load(document: IDocument): Promise<RelationshipGraphData> {
    const documentId = (document as any).id || (document as any)._id;
    const freshDocument = (globalThis as any).game?.journal?.get?.(documentId);
    const system = freshDocument?.system ?? document.system;
    return {
      name: "Relationship Graph",
      permissions: { defaultLevel: 0, users: [] },
      nodes: system.nodes || [],
      edges: system.edges || [],
    };
  }

  async save(document: IDocument, data: Partial<RelationshipGraphData> | object): Promise<void> {
    const documentUuid = (document as any).uuid;
    const freshDocument = await (foundry.utils as any).fromUuid(documentUuid);
    if (freshDocument) {
      const updates = { ...freshDocument.system, ...data };
      await freshDocument.update(updates);
    } else {
      await document.update(data);
    }
  }
}
