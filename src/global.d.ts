/// <reference types="fvtt-types" />


// Map the Actor document to the DeathwatchActor subclass for typing
declare global {
  namespace foundry.abstract {
    interface DataModel<SchemaType, SourceType = any> {
      readonly props: SchemaType;
    }
  }
}
