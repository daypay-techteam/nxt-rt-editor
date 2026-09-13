import type { CommandContext } from '../../core/command/command-context.js';
import type { CommandManager } from '../../core/command/command-manager.js';
import type { KeyboardShortcut } from './keyboard-shortcut.js';

export class KeyboardManager {

  private readonly shortcuts = new Map<string, KeyboardShortcut>();

  constructor(
    private readonly commandManager: CommandManager
  ) {}

  register(shortcut: KeyboardShortcut): void {
    const key = this.createKey(shortcut);
    if (this.shortcuts.has(key)) {
      throw new Error(`Keyboard shortcut "${key}" is already registered.`);
    }
    this.shortcuts.set(key, shortcut);
  }

  unregister(commandId: string): void {
    for (const [key, shortcut] of this.shortcuts) {
      if (shortcut.command === commandId) {
        this.shortcuts.delete(key);
      }
    }
  }

  // unregister(shortcut: KeyboardShortcut): void {
  //   const key = this.createKey(shortcut);
  //   this.shortcuts.delete(key);
  // }

  get(shortcut: KeyboardShortcut): KeyboardShortcut | undefined {
    return this.shortcuts.get(this.createKey(shortcut));
  }

  has(shortcut: KeyboardShortcut): boolean {
    return this.shortcuts.has(this.createKey(shortcut));
  }

  getAll(): readonly KeyboardShortcut[] {
    return [...this.shortcuts.values()];
  }

  handle(event: KeyboardEvent,context: CommandContext): boolean {
    const shortcut = this.findShortcut(event);
    if (!shortcut) {
      return false;
    }
    this.commandManager.execute(shortcut.command,context);
    return true;
  }

  clear(): void {
    this.shortcuts.clear();
  }

  private findShortcut(event: KeyboardEvent): KeyboardShortcut | undefined {
    return [...this.shortcuts.values()]
      .find(shortcut =>
        this.matches(shortcut, event)
      );
  }

  private matches(shortcut: KeyboardShortcut,event: KeyboardEvent): boolean {
    return (
      shortcut.key.toLowerCase() ===
        event.key.toLowerCase() &&
      Boolean(shortcut.ctrl) === event.ctrlKey &&
      Boolean(shortcut.meta) === event.metaKey &&
      Boolean(shortcut.shift) === event.shiftKey &&
      Boolean(shortcut.alt) === event.altKey
    );
  }

  private createKey(shortcut: KeyboardShortcut): string {
    return [
      shortcut.ctrl ? 'Ctrl' : '',
      shortcut.meta ? 'Meta' : '',
      shortcut.shift ? 'Shift' : '',
      shortcut.alt ? 'Alt' : '',
      shortcut.key.toLowerCase()
    ]
      .filter(Boolean)
      .join('+');
  }
}