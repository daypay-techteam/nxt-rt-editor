import { Editor } from './editor.js';
import type { EditorDocument } from './document/editor-document.js';
import { EditorDom } from './dom/editor-dom.js';

const initialDocument: EditorDocument = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',

      content: [
        {
          type: 'text',
          text: 'Hello JJEditor!'
        }
      ]
    }
  ]
};

const editor = new Editor(initialDocument);
const container = window.document.getElementById('editor');
if (!container) {
  throw new Error('Editor container not found');
}
const editorDom = new EditorDom(
  editor,
  container
);

editorDom.mount();