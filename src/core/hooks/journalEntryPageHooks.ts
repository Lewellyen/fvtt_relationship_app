import { LoggerService } from "../../services/LoggerService";

/**
 * Registriert Hooks für JournalEntryPage-Operationen.
 * Based on Foundry V13 API: https://foundryvtt.com/api/#journal-entry-page
 */
export function registerJournalEntryPageHooks(): void {
  const logger = LoggerService.getInstance();

  // Hook when a journal entry page is created
  Hooks.on(
    "createJournalEntryPage",
    async (page: JournalEntryPage, options: any, userId: string) => {
      if ((page as any).type === "relationship-app.relationship-graph") {
        logger.debug(`Relationship graph page created: ${page.name}`, {
          pageId: page.id,
          userId,
        });

        // Initialize with default graph if needed
        const graphData = (page as any).system;
        if (!graphData || !graphData.nodes || !graphData.nodes.length) {
          await page.update({
            system: {
              nodes: [],
              edges: [],
              settings: {
                layout: "force",
                nodeSize: 20,
                edgeWidth: 1,
                backgroundColor: "#ffffff",
                gridSize: 50,
              },
            },
          });
        }
      }
    },
  );

  // Hook when a journal entry page is updated
  Hooks.on(
    "updateJournalEntryPage",
    async (
      page: JournalEntryPage,
      changes: any,
      options: any,
      userId: string,
    ) => {
      if ((page as any).type === "relationship-app.relationship-graph") {
        logger.debug(`Relationship graph page updated: ${page.name}`, {
          pageId: page.id,
          userId,
          changes: Object.keys(changes),
        });
      }
    },
  );

  // Hook when a journal entry page is deleted
  Hooks.on(
    "deleteJournalEntryPage",
    async (page: JournalEntryPage, options: any, userId: string) => {
      if ((page as any).type === "relationship-app.relationship-graph") {
        logger.debug(`Relationship graph page deleted: ${page.name}`, {
          pageId: page.id,
          userId,
        });
      }
    },
  );
}
