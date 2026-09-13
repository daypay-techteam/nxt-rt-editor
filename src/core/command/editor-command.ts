import type { CommandContext } from './command-context.js';

export interface EditorCommand {

  readonly id: string;
  
  execute(context: CommandContext): void;
}