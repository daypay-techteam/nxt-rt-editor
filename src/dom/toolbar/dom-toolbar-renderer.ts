import type { Editor } from '../../editor/editor.js';
import type { ToolbarItem } from '../../plugin/toolbar/toolbar-item.js';
import { DOMToolbarItem } from './dom-toolbar-item.js';

export class DOMToolbarRenderer {

  constructor(
    private readonly editor: Editor
  ) {}

  render(
    item: ToolbarItem
  ): DOMToolbarItem {

    return new DOMToolbarItem(
      this.editor,
      item
    );
  }
}