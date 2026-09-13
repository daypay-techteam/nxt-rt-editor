import type { EditorPlugin } from "../../editor-plugin";
import type { KeyboardShortcut } from "../../keyboard/keyboard-shortcut";
import type { PluginContext } from "../../plugin-context";
import type { ToolbarItem } from "../../toolbar/toolbar-item";
import { ItalicCommand } from "./italic-command.js";

export class ItalicPlugin implements EditorPlugin {
  
  readonly name = 'italic';
  readonly command = new ItalicCommand();
  readonly toolbarItem: ToolbarItem = 
    {
      id: 'italic',
      label: 'I',
      title: 'Italic',
      command: 'italic',
      group: 'formatting',
      order: 20
    };

  private readonly shortcut: KeyboardShortcut = {
      key: 'i',
      ctrl: true,
      command: 'italic'
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