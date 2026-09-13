import type { Editor } from '../editor/editor.js';

import { DOMEventHandler } from './event/dom-event-handler.js';
import { DOMRenderer } from './renderer/dom-renderer.js';

// export class EditorDOM {
//   private readonly renderer: DOMRenderer;
//   private readonly eventHandler: DOMEventHandler;

//   constructor(
//     private readonly editor: Editor,
//     private readonly container: HTMLElement
//   ) {
//     this.renderer = new DOMRenderer();
//     this.eventHandler = new DOMEventHandler(editor, container);
//   }

//   mount(): void {
//     this.container.contentEditable = 'true';
//     this.container.setAttribute('role', 'textbox');
//     this.container.setAttribute('aria-multiline', 'true');
//     this.container.setAttribute('spellcheck', 'true');
//     this.container.tabIndex = 0;
//     this.render();
//     this.eventHandler.attach();
//   }

//   render(): void {
//     const document = this.editor.getDocument();
//     this.renderer.render(this.container,document.content);
//   }

//   destroy(): void {
//     this.eventHandler.detach();
//     this.container.contentEditable = 'false';
//     this.container.removeAttribute('role');
//     this.container.removeAttribute('aria-multiline');
//     this.container.replaceChildren();
//   }
// }

export class EditorDOM {

  private readonly renderer: DOMRenderer;
  private readonly eventHandler: DOMEventHandler;

  private readonly root: HTMLElement;
  private readonly toolbarElement: HTMLElement;
  private readonly contentElement: HTMLElement;

  constructor(
    private readonly editor: Editor,
    private readonly container: HTMLElement
  ) {
    this.root = document.createElement('div');
    this.toolbarElement = document.createElement('div');
    this.contentElement = document.createElement('div');
    this.renderer = new DOMRenderer();
    this.eventHandler = new DOMEventHandler(editor, container);
    this.initialize();
  }

  mount(): void {
    this.container.appendChild(this.root);
    // this.renderer.render(this.contentElement);
    // this.eventHandler.attach(this.contentElement);
    this.render();
  }

  getToolbarElement(): HTMLElement {
    return this.toolbarElement;
  }

  getContentElement(): HTMLElement {
    return this.contentElement;
  }

  render(): void {
    const document = this.editor.getDocument();
    this.renderer.render(this.contentElement, document.content);
  }

  destroy(): void {
    this.eventHandler.detach();
    this.root.remove();
  }

  private initialize(): void {
    this.root.className = 'nxt-editor';
    this.toolbarElement.className = 'nxt-editor-toolbar';
    this.contentElement.className = 'nxt-editor-content';
    this.contentElement.contentEditable = 'true';
    this.root.appendChild(this.toolbarElement);
    this.root.appendChild(this.contentElement);
  }
}