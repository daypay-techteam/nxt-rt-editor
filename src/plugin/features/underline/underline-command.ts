import type { CommandContext } from "../../../core/command/command-context";
import type { EditorCommand } from "../../../core/command/editor-command";

export class UnderlineCommand implements EditorCommand {

  readonly id = 'underline';

  execute(context: CommandContext): void {
    console.log(
      'Underline command executed'
    );
    // TODO:
    // Get selection
    // Create transaction
    // Apply underline mark
    // Commit transaction
  }
}