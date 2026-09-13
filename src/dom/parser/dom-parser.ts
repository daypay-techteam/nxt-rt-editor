import type { EditorDocument } from '../../core/document/editor-document.js';
import type { EditorNode } from '../../core/node/editor-node.js';

export class DOMParser {

  parse(container: HTMLElement): EditorDocument {
    return {
      type: 'doc',
      content: this.parseChildren(container)
    };
  }

  private parseChildren(parent: Node): EditorNode[] {
    const nodes: EditorNode[] = [];
    parent.childNodes.forEach(
      (child) => {
        const node = this.parseNode(child);
        if (node) {
          nodes.push(node);
        }
      }
    );
    return nodes;
  }

  private parseNode(node: Node): EditorNode | null {
    // Text node
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (!text) {
        return null;
      }
      return {
        type: 'text',
        text
      };
    }

    // Only handle elements
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const element = node as HTMLElement;
    const tagName = element.tagName.toLowerCase();
    switch (tagName) {
      case 'p':
        return {
          type: 'paragraph',
          content:this.parseChildren(element)
        };
      case 'div':
        return {
          type: 'paragraph',
          content: this.parseChildren(element)
        };
      default:
        return {
          type: 'paragraph',
          content: this.parseChildren(element)
        };
    }
  }
}