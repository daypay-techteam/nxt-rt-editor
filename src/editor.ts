import type { EditorCommand } from './command/editor-command.js';
import type { EditorDocument } from './document/editor-document.js';
import { EditorHistory } from './history/editor-history.js';
import type { EditorPlugin } from './plugin/editor-plugin.js';
import type { EditorSelection } from './selection/editor-selection.js';

export class Editor {

  private document: EditorDocument;

  private selection: EditorSelection;

  private readonly history: EditorHistory;

  private readonly plugins: EditorPlugin[] = [];

  constructor(document: EditorDocument) {
    this.document = document;

    this.selection = {
      from: 0,
      to: 0
    };

    this.history = new EditorHistory();
  }

  getDocument(): EditorDocument {
    return this.document;
  }

  getSelection(): EditorSelection {
    return this.selection;
  }

  execute(command: EditorCommand): void {
    this.history.push(this.document);

    const transaction = command.execute(this.document);

    this.document = transaction.document;

    if (transaction.selection) {
      this.selection = transaction.selection;
    }
  }

  updateFromHtml(html: string): void {
    console.log('HTML received from DOM:', html);
  }

  use(plugin: EditorPlugin): void {
    plugin.install(this);
    this.plugins.push(plugin);
  }

  destroy(): void {
    for (const plugin of this.plugins) {
      plugin.destroy?.(this);
    }

    this.plugins.length = 0;
  }
}