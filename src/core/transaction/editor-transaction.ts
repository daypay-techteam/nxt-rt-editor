import type { EditorDocument } from "../document/editor-document";
import type { EditorSelection } from "../selection/editor-selection";

export interface EditorTransaction {
  readonly document: EditorDocument;
  readonly selection?: EditorSelection;
}