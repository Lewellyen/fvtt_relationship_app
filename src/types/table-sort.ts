/** A custom comparator for a specific column. */
export interface ITableSortComparator {
  columnIndex: number;
  comparator(a: string, b: string): number;
}

/** Alias for backward compatibility */
export type SortRule = ITableSortComparator;

/**
 * Internal sort state for a column.
 */
export interface SortStateItem {
  idx: number;
  asc: boolean;
}

/**
 * Configuration for table sorting.
 */
export interface TableSortConfig {
  comparators?: ITableSortComparator[];
  defaultSort?: Array<{ columnIndex: number; asc: boolean }>;
}
