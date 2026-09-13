import type { CommandContext } from "../../../core/command/command-context";
import type { EditorCommand } from "../../../core/command/editor-command";

export class ItalicCommand implements EditorCommand {

  readonly id = 'italic';

  execute(context: CommandContext): void {
    console.log(
      'Italic command executed'
    );
    // TODO:
    // Get selection
    // Create transaction
    // Apply italic mark
    // Commit transaction
  }
}