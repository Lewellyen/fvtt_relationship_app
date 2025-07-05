import type {
  ITableSortComparator,
  SortRule,
  SortStateItem,
  TableSortConfig,
} from "@/types/table-sort";

export class TableSortService {
  /**
   * Extracts the cell value at column idx from a table row.
   */
  static getCellValue(row: HTMLTableRowElement, idx: number): string {
    const cell = row.cells[idx];
    if (!cell) return "";
    const input = cell.querySelector("input");
    if (input instanceof HTMLInputElement) {
      if (input.type === "checkbox") {
        return input.checked ? "1" : "0";
      }
      return input.value;
    }
    const select = cell.querySelector("select") as HTMLSelectElement;
    if (select) {
      return select.selectedOptions[0]?.textContent || "";
    }
    return cell.textContent?.trim() || "";
  }

  /**
   * Default comparison between two cell values.
   */
  static defaultCompare(a: string, b: string, asc: boolean): number {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return asc ? aNum - bNum : bNum - aNum;
    }
    return asc ? a.localeCompare(b) : b.localeCompare(a);
  }

  /**
   * Sorts and re-renders rows in the tbody according to sortState and comparators.
   */
  static sortRows(
    tbody: HTMLTableSectionElement,
    sortState: SortStateItem[],
    comparators: SortRule[],
  ): void {
    const rows = Array.from(
      tbody.querySelectorAll("tr"),
    ) as HTMLTableRowElement[];
    rows.sort((a, b) => {
      for (const { idx, asc } of sortState) {
        const rule = comparators.find((r) => r.columnIndex === idx);
        const aVal = this.getCellValue(a, idx);
        const bVal = this.getCellValue(b, idx);
        const cmp = rule
          ? rule.comparator(aVal, bVal) * (asc ? 1 : -1)
          : this.defaultCompare(aVal, bVal, asc);
        if (cmp !== 0) return cmp;
      }
      return 0;
    });
    rows.forEach((row) => tbody.appendChild(row));
  }

  /**
   * Updates header cell classes to reflect sort direction.
   */
  static updateHeaderClasses(
    headers: HTMLElement[],
    sortState: SortStateItem[],
  ): void {
    headers.forEach((h) => {
      h.classList.remove("sorted-asc", "sorted-desc");
    });
    sortState.forEach(({ idx, asc }) => {
      headers[idx].classList.add(asc ? "sorted-asc" : "sorted-desc");
    });
  }
}
