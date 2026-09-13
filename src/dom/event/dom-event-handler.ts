import type { Editor } from '../../editor/editor.js';
import { DOMParser } from '../parser/dom-parser.js';

export class DOMEventHandler {

  private readonly parser = new DOMParser();

  constructor(
    private readonly editor: Editor,
    private readonly container: HTMLElement
  ) {
  }

  attach(): void {
    this.container.addEventListener(
      'input',
      this.handleInput
    );
  }

  detach(): void {
    this.container.removeEventListener(
      'input',
      this.handleInput
    );
  }

  private readonly handleInput = (): void => {

      const document =
    this.parser.parse(this.container);

  this.editor.updateDocument(
    document
  );
  };
}