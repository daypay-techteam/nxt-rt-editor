import type { Editor } from '../editor/editor.js';
import type { EditorCommand } from '../core/command/editor-command.js';
import type { ToolbarItem } from './toolbar/toolbar-item.js';
import type { KeyboardShortcut } from './keyboard/keyboard-shortcut.js';

export interface PluginContext {

  readonly editor: Editor;

  registerCommand(command: EditorCommand): void;

  unregisterCommand(commandId: string): void;

  registerToolbarItem(item: ToolbarItem): void;

  unregisterToolbarItem(itemId: string): void;

  registerKeyboardShortcut(shortcut: KeyboardShortcut): void;

  unregisterKeyboardShortcut(commandId: string): void;
}