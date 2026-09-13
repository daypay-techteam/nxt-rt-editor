import type { EditorDocument } from '../core/document/editor-document.js';
import { CommandManager } from '../core/command/command-manager.js';
import { EditorHistory } from '../core/history/editor-history.js';
import { PluginManager } from '../plugin/plugin-manager.js';
import type { PluginContext } from '../plugin/plugin-context.js';
import type { EditorPlugin } from '../plugin/editor-plugin.js';
import type { EditorSelection } from '../core/selection/editor-selection.js';
import { ToolbarManager } from '../plugin/toolbar/toolbar-manager.js';
import { KeyboardManager } from '../plugin/keyboard/keyboard-manager.js';

export class Editor {

  private document: EditorDocument;

  private selection: EditorSelection = {from: 0,to: 0};

  readonly commandManager: CommandManager;

  readonly toolbarManager: ToolbarManager;

  readonly keyboardManager: KeyboardManager;

  readonly history: EditorHistory;

  readonly pluginManager: PluginManager;

  private readonly pluginContext: PluginContext;

  constructor(document: EditorDocument) {
    this.document = document;
    this.commandManager = new CommandManager();
    this.toolbarManager = new ToolbarManager();
    this.keyboardManager =new KeyboardManager(this.commandManager);
    this.history = new EditorHistory();
    this.pluginContext = this.createPluginContext();
    this.pluginManager = new PluginManager(this.pluginContext);
  }

  getDocument(): EditorDocument {
    return this.document;
  }

  getSelection(): EditorSelection {
    return this.selection;
  }

  updateDocument(document: EditorDocument): void {
    this.document = document;
  }

  updateSelection(selection: EditorSelection): void {
    this.selection = selection;
  }

  executeCommand(commandId: string): void {
    this.commandManager.execute(commandId,{editor: this});
  }

  use(plugin: EditorPlugin): void {
    this.pluginManager.register(plugin);
  }

  destroy(): void {
    this.pluginManager.destroy();
    this.keyboardManager.clear();
  }

  private createPluginContext(): PluginContext {
    return {
      editor: this,

      registerCommand: (command): void => {
        this.commandManager.register(command);
      },

      unregisterCommand: (commandId): void => {
        this.commandManager.unregister(commandId);
      },

      registerToolbarItem: (item): void => {
        this.toolbarManager.register(item);
      },

      unregisterToolbarItem: (itemId): void => {
        this.toolbarManager.unregister(itemId);
      },

      registerKeyboardShortcut: (shortcut): void => {
        this.keyboardManager.register(shortcut);
      },

      unregisterKeyboardShortcut: (shortcut): void => {
        this.keyboardManager.unregister(shortcut);
      }
    };
  }
}