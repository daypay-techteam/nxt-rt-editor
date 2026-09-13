import type { EditorNode } from '../node/editor-node.js';

export interface EditorDocument {
  readonly type: 'doc';
  readonly content: EditorNode[];
}