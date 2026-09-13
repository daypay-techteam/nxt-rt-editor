import type { EditorDocument } from "../../core/document/editor-document.js";
import type { EditorSelection } from "../../core/selection/editor-selection.js";
import type { Editor } from "../../editor/editor.js";

export interface ToolbarContext {
  readonly editor: Editor;
  readonly document: EditorDocument;
  readonly selection: EditorSelection;
}

export interface ToolbarItem {

  readonly id: string;

  readonly label?: string;

  readonly title?: string;

  readonly icon?: string;

  readonly command: string;

  readonly group?: string;

  readonly order?: number;

  readonly isVisible?: (context: ToolbarContext) => boolean;

  readonly isEnabled?: (context: ToolbarContext) => boolean;

  readonly isActive?: (context: ToolbarContext) => boolean;
}