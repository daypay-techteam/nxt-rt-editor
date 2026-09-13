
import type { EditorDocument } from './core/document/editor-document.js';
import { NxtRTEditor } from './editor/nxt-rt-editor.js';
import { BoldPlugin } from './plugin/features/bold/bold-plugin.js';
import { ItalicPlugin } from './plugin/features/italic/italic-plugin.js';
import { UnderlinePlugin } from './plugin/features/underline/underline-plugin.js';

const initialDocument: EditorDocument = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello NxtEditor!'
        }
      ]
    }
  ]
};

const editorElement = document.getElementById('editor');
if (!editorElement) {
  throw new Error('NxtEditor element "#editor" was not found.');
}

const editor = new NxtRTEditor({
    element: editorElement,
    document: initialDocument,
    plugins: [
      new BoldPlugin(),
      new ItalicPlugin(),
      new UnderlinePlugin()
    ]
});