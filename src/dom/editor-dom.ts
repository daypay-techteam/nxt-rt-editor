import type { Editor } from '../editor.js';
import { DomEventHandler } from './dom-event-handler.js';
import { DomRenderer } from './dom-renderer.js';

export class EditorDom {

  private readonly renderer: DomRenderer;

  private readonly eventHandler: DomEventHandler;

  constructor(
    private readonly editor: Editor,
    private readonly container: HTMLElement
  ) {
    this.renderer = new DomRenderer();

    this.eventHandler = new DomEventHandler(
      editor,
      container
    );
  }

  mount(): void {
    this.render();

    this.container.contentEditable = 'true';

    this.eventHandler.attach();
  }

  render(): void {
    const document = this.editor.getDocument();

    this.renderer.render(
      this.container,
      document.content
    );
  }

  destroy(): void {
    this.eventHandler.detach();

    this.container.contentEditable = 'false';
    this.container.replaceChildren();
  }
}