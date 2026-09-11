import type { EditorNode } from '../node/editor-node.js';

export class DomRenderer {

  render(container: HTMLElement, nodes: EditorNode[]): void {
    container.replaceChildren();

    for (const node of nodes) {
      const element = this.renderNode(node);

      if (element) {
        container.appendChild(element);
      }
    }
  }

  private renderNode(node: EditorNode): HTMLElement | Text | null {
    if (node.type === 'paragraph') {
      const paragraph = document.createElement('p');

      this.renderChildren(paragraph, node);

      return paragraph;
    }

    if (node.type === 'text') {
      return document.createTextNode(node.text ?? '');
    }

    return null;
  }

  private renderChildren(
    element: HTMLElement,
    node: EditorNode
  ): void {
    for (const child of node.content ?? []) {
      const childElement = this.renderNode(child);

      if (childElement) {
        element.appendChild(childElement);
      }
    }
  }
}