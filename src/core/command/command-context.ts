import type { Editor } from '../../editor/editor.js';

export interface CommandContext {
  readonly editor: Editor;
}
