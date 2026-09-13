import type { EditorPlugin } from "../../editor-plugin";
import type { KeyboardShortcut } from "../../keyboard/keyboard-shortcut";
import type { PluginContext } from "../../plugin-context";
import type { ToolbarItem } from "../../toolbar/toolbar-item";
import { BoldCommand } from "./bold-command.js";

export class BoldPlugin implements EditorPlugin {

  readonly name = 'bold';

  private readonly command = new BoldCommand();

  private readonly toolbarItem: ToolbarItem = {
    id: 'bold',
    label: 'B',
    title: 'Bold',
    command: 'bold',
    group: 'formatting',
    order: 10
  };

  private readonly shortcut: KeyboardShortcut = {
    key: 'b',
    ctrl: true,
    command: 'bold'
  };

  install(context: PluginContext): void {
    context.registerCommand(this.command);
    context.registerToolbarItem(this.toolbarItem);
    context.registerKeyboardShortcut(this.shortcut);
  }

  destroy(context: PluginContext): void {
    context.unregisterCommand(this.command.id);
    context.unregisterToolbarItem(this.toolbarItem.id);
    context.unregisterKeyboardShortcut(this.command.id);
  }
}