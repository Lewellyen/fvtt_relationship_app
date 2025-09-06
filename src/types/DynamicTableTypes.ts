import type { IFormFieldDefinition } from './DynamicFormTypes';

/**
 * Erweiterte Spalten-Definition für Tabellen
 */
export interface ITableColumnDefinition extends IFormFieldDefinition {
  // Sortierbarkeit der Spalte
  sortable?: boolean;
  
  // Filterbarkeit der Spalte
  filterable?: boolean;
  
  // Größenänderung der Spalte
  resizable?: boolean;
  
  // Spaltenbreite (CSS-Wert oder Pixel)
  width?: string | number;
  
  // Minimale Spaltenbreite
  minWidth?: number;
  
  // Maximale Spaltenbreite
  maxWidth?: number;
  
  // Spalte fixieren (links/rechts)
  frozen?: 'left' | 'right' | false;
  
  // Spalte standardmäßig ein-/ausblenden
  visible?: boolean;
  
  // Spalten-Reihenfolge
  order?: number;
  
  // Spalten-spezifische Filter-Optionen
  filterOptions?: Array<{ value: string; label: string }>;
  
  // Custom-Renderer für Anzeige
  renderer?: (value: any, row: ITableRowData) => string;
  
  // Custom-Editor für Bearbeitung
  editor?: (value: any, row: ITableRowData) => any;
}

/**
 * Tabellenzeilen-Daten
 */
export interface ITableRowData {
  // Eindeutige ID der Zeile
  id: string;
  
  // Spalten-Daten
  [columnName: string]: any;
  
  // Zeilen-spezifische Eigenschaften
  _selected?: boolean;
  _editing?: boolean;
  _new?: boolean;
  _modified?: boolean;
  _deleted?: boolean;
}

/**
 * Tabellen-State für Sortierung, Filter und Auswahl
 */
export interface ITableState {
  // Sortierung
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  
  // Filter
  filters: Record<string, any>;
  globalSearch?: string;
  
  // Auswahl
  selectedRows: string[];
  selectAll?: boolean;
  
  // Pagination
  currentPage: number;
  pageSize: number;
  
  // Spalten
  columnOrder: string[];
  hiddenColumns: string[];
  columnWidths: Record<string, number>;
}

/**
 * Bulk-Aktion-Definition
 */
export interface IBulkAction {
  id: string;
  label: string;
  icon?: string;
  action: (selectedRows: ITableRowData[]) => void | Promise<void>;
  enabled?: (selectedRows: ITableRowData[]) => boolean;
  confirmMessage?: string;
}

/**
 * Hauptkonfiguration für DynamicTableApp
 */
export interface IDynamicTableConfig {
  // Titel der Tabelle
  title: string;
  
  // Beschreibung/Untertitel
  description?: string;
  
  // Spalten-Definitionen
  columns: ITableColumnDefinition[];
  
  // Initiale Daten
  initialData?: ITableRowData[];
  
  // Callback-Funktionen
  onSubmit?: (data: ITableRowData[]) => void | Promise<void>;
  onCancel?: () => void;
  onRowAdd?: (row: ITableRowData) => void | Promise<void>;
  onRowEdit?: (row: ITableRowData) => void | Promise<void>;
  onRowDelete?: (row: ITableRowData) => void | Promise<void>;
  onBulkAction?: (action: string, rows: ITableRowData[]) => void | Promise<void>;
  
  // UI-Konfiguration
  submitLabel?: string;
  cancelLabel?: string;
  showCancelButton?: boolean;
  tableSize?: 'small' | 'medium' | 'large' | 'fullscreen';
  
  // CRUD-Berechtigungen
  allowAdd?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  allowBulkActions?: boolean;
  
  // Tabellen-Features
  allowSorting?: boolean;
  allowFiltering?: boolean;
  allowColumnResize?: boolean;
  allowColumnReorder?: boolean;
  allowRowReorder?: boolean;
  
  // Pagination
  enablePagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  
  // Bulk-Aktionen
  bulkActions?: IBulkAction[];
  
  // Import/Export
  allowImport?: boolean;
  allowExport?: boolean;
  importFormats?: ('csv' | 'json' | 'excel')[];
  exportFormats?: ('csv' | 'json' | 'excel')[];
  
  // Styling & Theme
  styling?: {
    theme: 'inherit' | 'foundry' | 'custom' | 'auto';
    inheritParentStyles: boolean;
    customClasses?: {
      container?: string;
      table?: string;
      toolbar?: string;
      header?: string;
      row?: string;
      cell?: string;
      button?: string;
    };
    responsive: {
      mobile: 'stack' | 'grid' | 'adaptive';
      tablet: 'stack' | 'grid' | 'adaptive';
      desktop: 'stack' | 'grid' | 'adaptive';
    };
  };
  
  // Validierung
  validation?: {
    location: 'cell' | 'row' | 'both';
    timing: 'onChange' | 'onBlur' | 'onSubmit' | 'manual';
    allowInvalidSubmit: boolean;
    customValidator?: (data: ITableRowData[]) => string[] | null;
  };
  
  // State-Management
  state?: {
    persistState: boolean;
    shareIntermediateValues: boolean;
    updateFrequency: 'onChange' | 'onBlur' | 'onSubmit' | 'manual';
    onIntermediateUpdate?: (data: ITableRowData[]) => void;
    persistInParent: boolean;
  };
}

/**
 * Tabellen-Ereignisse
 */
export interface ITableEvent {
  type: 'row-add' | 'row-edit' | 'row-delete' | 'row-select' | 'sort' | 'filter' | 'bulk-action';
  data?: any;
  row?: ITableRowData;
  rows?: ITableRowData[];
  column?: string;
  value?: any;
}

/**
 * Import/Export-Formate
 */
export interface IImportExportFormat {
  name: string;
  extension: string;
  mimeType: string;
  import: (data: string) => ITableRowData[];
  export: (data: ITableRowData[], columns: ITableColumnDefinition[]) => string;
}
