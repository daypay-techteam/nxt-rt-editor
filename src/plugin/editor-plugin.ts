import type { Editor } from '../editor.js';

export interface EditorPlugin {
  readonly name: string;

  install(editor: Editor): void;

  destroy?(editor: Editor): void;
}