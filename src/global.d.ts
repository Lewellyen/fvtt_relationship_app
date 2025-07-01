/// <reference types="fvtt-types" />

declare global {
  namespace foundry.abstract {
    interface DataModel<SchemaType, SourceType = any> {
      readonly props: SchemaType;
    }
  }
}
