import type { CommandContext } from './command-context.js';
import type { EditorCommand } from './editor-command.js';

export class CommandManager {

  private readonly commands = new Map<string, EditorCommand>();

  register(command: EditorCommand): void {
    this.commands.set(command.id, command);
  }

  unregister(commandId: string): void {
    this.commands.delete(commandId);
  }

  has(commandId: string): boolean {
    return this.commands.has(commandId);
  }

  execute(commandId: string,context: CommandContext): void {
    const command =this.commands.get(commandId);
    if (!command) {
      throw new Error(`Command "${commandId}" is not registered.`);
    }
    command.execute(context);
  }
}