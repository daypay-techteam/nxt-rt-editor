import type { EditorCommand } from '../core/command/editor-command.js';
import type { KeyboardShortcut } from './keyboard/keyboard-shortcut.js';
import type { PluginContext } from './plugin-context.js';
import type { ToolbarItem } from './toolbar/toolbar-item.js';

export interface EditorPlugin {

  readonly name: string;

  readonly commands?: readonly EditorCommand[];

  readonly toolbarItems?: readonly ToolbarItem[];

  readonly keyboardShortcuts?: readonly KeyboardShortcut[];

  install(context: PluginContext): void;

  destroy?(context: PluginContext): void;
}