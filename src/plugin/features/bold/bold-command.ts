import type { CommandContext } from "../../../core/command/command-context";
import type { EditorCommand } from "../../../core/command/editor-command";

export class BoldCommand implements EditorCommand {

  readonly id = 'bold';

  execute(context: CommandContext): void {
    console.log('Bold command executed');
    // TODO:
    // Get selection
    // Create transaction
    // Apply bold mark
    // Commit transaction
  }
}