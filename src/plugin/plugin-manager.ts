import type { EditorPlugin } from './editor-plugin.js';
import type { PluginContext } from './plugin-context.js';

export class PluginManager {

  private readonly plugins: EditorPlugin[] = [];

  constructor(
    private readonly context: PluginContext
  ) {}

  register(plugin: EditorPlugin): void {

    plugin.install(this.context);

    this.plugins.push(plugin);
  }

  unregister(name: string): void {

    const index =
      this.plugins.findIndex(
        plugin => plugin.name === name
      );

    if (index === -1) {
      return;
    }

    const plugin = this.plugins[index];

    if (plugin) {
      plugin.destroy?.(this.context);
      this.plugins.splice(index, 1);
    }
  }

  getAll(): readonly EditorPlugin[] {
    return this.plugins;
  }

  destroy(): void {

    for (const plugin of this.plugins) {
      plugin.destroy?.(this.context);
    }

    this.plugins.length = 0;
  }
}