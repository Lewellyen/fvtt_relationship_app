import type { Action } from "svelte/action";
import { TableSortService } from "../services/TableSortService";
import type {
  ITableSortComparator,
  TableSortConfig,
  SortStateItem,
} from "@/types/table-sort";

/**
 * A Svelte action that makes a table sortable via column header clicks.
 * Applies toggling ascending/descending and adds CSS classes 'sorted-asc'/'sorted-desc'.
 */

export const tableSort: Action<HTMLTableElement, TableSortConfig> = (
  node,
  config = {},
) => {
  const comparators: ITableSortComparator[] = config.comparators ?? [];
  let sortState: SortStateItem[] = (config.defaultSort ?? []).map((s) => ({
    idx: s.columnIndex,
    asc: s.asc,
  }));
  const headers = Array.from(
    node.querySelectorAll("thead th"),
  ) as HTMLElement[];
  let tbody = node.querySelector<HTMLTableSectionElement>("tbody");
  if (!tbody) {
    // Fallback: find <tbody> in an adjacent table when Header/Body getrennt sind
    const next = node.nextElementSibling;
    if (next instanceof HTMLElement) {
      const table = next.querySelector<HTMLTableElement>("table");
      if (table) tbody = table.querySelector<HTMLTableSectionElement>("tbody");
    }
  }
  if (!tbody) return;

  const listeners: Array<{ th: HTMLElement; handler: EventListener }> = [];

  /** Sort rows based on current sortState */
  const sortRows = () => {
    TableSortService.sortRows(tbody, sortState, comparators);
    TableSortService.updateHeaderClasses(headers, sortState);
  };

  // Run initial sort if defaultSort specified
  if (sortState.length) sortRows();

  // Attach click handlers for multi-sort (Shift+click to add secondary sort)
  headers.forEach((th, idx) => {
    (th as HTMLElement).style.cursor = "pointer";
    const handler = (evt: Event) => {
      const event = evt as MouseEvent;
      const multi = event.shiftKey;
      const existing = sortState.find((s) => s.idx === idx);
      if (multi) {
        if (existing) {
          existing.asc = !existing.asc;
        } else {
          sortState.push({ idx, asc: true });
        }
      } else {
        // Single-column sort or toggle primary
        if (sortState.length === 1 && existing) {
          existing.asc = !existing.asc;
        } else {
          sortState = [{ idx, asc: true }];
        }
      }
      sortRows();
    };
    th.addEventListener("click", handler);
    listeners.push({ th: th as HTMLElement, handler });
  });

  return {
    destroy() {
      listeners.forEach(({ th, handler }) =>
        th.removeEventListener("click", handler),
      );
    },
  };
};
