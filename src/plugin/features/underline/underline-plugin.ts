import type { KeyboardShortcut } from "../../..";
import type { Editor } from "../../../editor/editor";
import type { EditorPlugin } from "../../editor-plugin";
import type { PluginContext } from "../../plugin-context";
import type { ToolbarItem } from "../../toolbar/toolbar-item";
import { UnderlineCommand } from "./underline-command.js";

export class UnderlinePlugin implements EditorPlugin {

  readonly name = 'underline';

  readonly command = new UnderlineCommand();

  readonly toolbarItem: ToolbarItem = {
      id: 'underline',
      label: 'U',
      title: 'Underline',
      command: 'underline',
      group: 'formatting',
      order: 30
    };

  private readonly shortcut: KeyboardShortcut = {
        key: 'u',
        ctrl: true,
        command: 'underline'
      };

  install(context: PluginContext): void {
  
      context.registerCommand(
        this.command
      );
  
      context.registerToolbarItem(
        this.toolbarItem
      );
  
      context.registerKeyboardShortcut(
        this.shortcut
      );
    }
  
    destroy(context: PluginContext): void {
  
      context.unregisterCommand(
        this.command.id
      );
  
      context.unregisterToolbarItem(
        this.toolbarItem.id
      );
  
      context.unregisterKeyboardShortcut(
        this.command.id
      );
    }
}