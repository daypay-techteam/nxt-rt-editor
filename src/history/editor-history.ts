import type { EditorDocument } from '../document/editor-document.js';

export class EditorHistory {

  private readonly undoStack: EditorDocument[] = [];

  private readonly redoStack: EditorDocument[] = [];

  push(document: EditorDocument): void {
    this.undoStack.push(document);
    this.redoStack.length = 0;
  }

  undo(): EditorDocument | undefined {
    return this.undoStack.pop();
  }

  redo(): EditorDocument | undefined {
    return this.redoStack.pop();
  }

  clear(): void {
    this.undoStack.length = 0;
    this.redoStack.length = 0;
  }
}