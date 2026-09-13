import type { Editor } from '../../editor/editor.js';
import type { ToolbarManager } from '../../plugin/toolbar/toolbar-manager.js';
import type { ToolbarItem } from '../../plugin/toolbar/toolbar-item.js';
import { DOMToolbarItem } from './dom-toolbar-item.js';
import { DOMToolbarRenderer } from './dom-toolbar-renderer.js';

export class DOMToolbar {

  private readonly renderer: DOMToolbarRenderer;

  private readonly items = new Map<string, DOMToolbarItem>();

  private element: HTMLElement | null = null;

  constructor(
    private readonly editor: Editor,
    private readonly toolbarManager: ToolbarManager
  ) {
    this.renderer = new DOMToolbarRenderer(editor);
  }

  mount(element: HTMLElement): void {
    this.element = element;
    this.render();
  }

  render(): void {
    if (!this.element) {
      return;
    }
    this.destroyItems();
    this.element.innerHTML = '';
    const toolbarItems = this.toolbarManager.getItems();
    for (const item of toolbarItems) {
      const domItem = this.renderer.render(item);
      this.items.set(item.id, domItem);
      this.element.appendChild(domItem.element);
    }
  }

  update(): void {
    for (const item of this.items.values()) {
      item.updateState();
    }
  }

  get(itemId: string): DOMToolbarItem | undefined {
    return this.items.get(itemId);
  }

  destroy(): void {
    this.destroyItems();
    if (this.element) {
      this.element.innerHTML = '';
    }
    this.element = null;
  }

  private destroyItems(): void {
    for (const item of this.items.values()) {
      item.destroy();
    }
    this.items.clear();
  }
}