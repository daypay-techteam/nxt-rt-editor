import type { EditorNode } from "../node/editor-node";

export interface EditorDocument {
  readonly type: 'doc';
  readonly content: EditorNode[];
}