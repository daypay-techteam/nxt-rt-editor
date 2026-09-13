import type { EditorDocument } from '../index.js';
import type { EditorPlugin } from '../plugin/editor-plugin.js';

export interface EditorConfig {
  readonly plugins?: EditorPlugin[];
}

export interface NxtRTEditorConfig {
  readonly element: HTMLElement;
  readonly document?: EditorDocument;
  readonly plugins?: readonly EditorPlugin[];
}