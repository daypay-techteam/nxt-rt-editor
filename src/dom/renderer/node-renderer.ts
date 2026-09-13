import type { EditorDocument } from '../../core/document/editor-document.js';
import type { EditorNode } from '../../core/node/editor-node.js';
import { MarkRenderer } from './mark-renderer.js';

export class NodeRenderer {

  private readonly markRenderer = new MarkRenderer();

  renderDocument(editorDocument: EditorDocument): HTMLElement {
    const element = document.createElement('div');
    for (const node of editorDocument.content) {
      element.appendChild(this.render(node));
    }
    return element;
  }

  render(node: EditorNode): HTMLElement {
    const element = this.createElement(node);
    if (node.text) {
      let content: Node = document.createTextNode(node.text);
      content = this.markRenderer.render(content,node.marks ?? []);
      element.appendChild(content);
    }

    if (node.content) {
      for (const child of node.content) {
        element.appendChild(this.render(child));
      }
    }
    return element;
  }

  private createElement(node: EditorNode): HTMLElement {
    switch (node.type) {
      case 'doc':
        return document.createElement('div');
      case 'paragraph':
        return document.createElement('p');
      case 'heading':
        return document.createElement('h1');
      case 'blockquote':
        return document.createElement('blockquote');
      case 'bullet_list':
        return document.createElement('ul');
      case 'ordered_list':
        return document.createElement('ol');
      case 'list_item':
        return document.createElement('li');
      case 'text':
        return document.createElement('span');
      default:
        return document.createElement('div');
    }
  }
}