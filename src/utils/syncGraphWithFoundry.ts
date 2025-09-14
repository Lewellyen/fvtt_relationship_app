// sync.ts
import { GraphService } from "../services/GraphService";

export function bindFoundrySync(page: JournalEntryPage, service: GraphService) {
  Hooks.on("updateJournalEntryPage", async (doc, changes, options, userId) => {
    if (doc.id !== page.id) return;

    void userId;
    // eigene Updates überspringen
    if ((options as any)?._graphService === service.instanceId) return;

    const sys = (changes as any).system ?? {};
    const touched = "nodes" in sys || "edges" in sys || "policy" in sys || "version" in sys;
    if (!touched) return;

    await service.init(page);  // Snapshot neu laden
  });
}
