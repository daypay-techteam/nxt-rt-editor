import type { ToolbarItem } from "./toolbar-item";

export class ToolbarManager {

  private readonly items = new Map<string,ToolbarItem>();

  register(item: ToolbarItem): void {
    this.items.set(item.id, item);
  }

  unregister(itemId: string): void {
    this.items.delete(itemId);
  }

  get(id: string): ToolbarItem | undefined {
    return this.items.get(id);
  }

  has(id: string): boolean {
    return this.items.has(id);
  }

  getItems(): readonly ToolbarItem[] {
    return [...this.items.values()]
      .sort(
        (a, b) =>
          (a.order ?? 0) -
          (b.order ?? 0)
      );
  }

  clear(): void {
    this.items.clear();
  }
}