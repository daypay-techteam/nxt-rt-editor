import type { EditorDocument } from '../document/editor-document.js';
import type { EditorSelection } from '../selection/editor-selection.js';

export interface EditorTransaction {
  readonly document: EditorDocument;
  readonly selection?: EditorSelection;
}