import type { EditorDocument } from '../document/editor-document.js';
import type { EditorTransaction } from '../transaction/editor-transaction.js';

export interface EditorCommand {
  execute(document: EditorDocument): EditorTransaction;
}