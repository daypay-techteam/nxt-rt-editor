import type { EditorDocument } from '../core/document/editor-document.js';
import { EditorDOM } from '../dom/editor-dom.js';
import { DOMToolbar } from '../dom/toolbar/dom-toolbar.js';
import type { EditorPlugin } from '../plugin/editor-plugin.js';
import type { NxtRTEditorConfig } from './editor-config.js';
import { Editor } from './editor.js';

export class NxtRTEditor {

  private readonly editor: Editor;
  private readonly editorDOM: EditorDOM;
  private readonly toolbar: DOMToolbar;

  constructor(config: NxtRTEditorConfig) {
    this.editor = new Editor(config.document ?? {type: 'doc',content: []});
    for (const plugin of config.plugins ?? []) {
      this.editor.use(plugin);
    }
    this.editorDOM = new EditorDOM(this.editor,config.element);
    this.toolbar = new DOMToolbar(this.editor,this.editor.toolbarManager);
    this.editorDOM.mount();
    this.toolbar.mount(this.editorDOM.getToolbarElement());
  }

  getEditor(): Editor {
    return this.editor;
  }

  destroy(): void {
    this.toolbar.destroy();
    this.editorDOM.destroy();
    this.editor.destroy();
  }
}