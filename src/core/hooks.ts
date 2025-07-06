import { registerJournalEntryPageHooks } from "./hooks/journalEntryPageHooks";

/**
 * Registriert alle Hooks für das Relationship App Modul.
 */
export function registerHooks(): void {
  registerJournalEntryPageHooks();
}
