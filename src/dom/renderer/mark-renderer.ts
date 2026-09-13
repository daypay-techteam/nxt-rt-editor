import type { EditorMark } from '../../core/mark/editor-mark.js';

export class MarkRenderer {

  render(content: Node,marks: readonly EditorMark[]): Node {
    let result = content;
    for (const mark of marks) {
      result = this.renderMark(result,mark);
    }
    return result;
  }

  private renderMark(content: Node,mark: EditorMark): Node {
    let element: HTMLElement;
    switch (mark.type) {
      case 'bold':
        element =
          globalThis.document.createElement('strong');
        break;
      case 'italic':
        element =
          globalThis.document.createElement('em');
        break;
      case 'underline':
        element =
          globalThis.document.createElement('u');
        break;
      case 'strike':
        element =
          globalThis.document.createElement('s');
        break;
      case 'code':
        element =
          globalThis.document.createElement('code');
        break;
      default:
        return content;
    }
    element.appendChild(content);
    return element;
  }
}