import type { Editor } from '../editor.js';

export class DomEventHandler {

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
    const html = this.container.innerHTML;

    console.log('DOM changed:', html);

    this.editor.updateFromHtml(html);
  };
}