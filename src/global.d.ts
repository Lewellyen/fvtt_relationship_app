// ========================================
// FOUNDRY VTT INTERFACES
// ========================================

export interface IDocument {
  system: any;
  name?: string;
  update(data: any): Promise<void>;
}
