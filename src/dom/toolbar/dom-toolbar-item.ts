import type { ToolbarContext, ToolbarItem} from '../../plugin/toolbar/toolbar-item.js';
import type { Editor } from '../../editor/editor.js';

export class DOMToolbarItem {

    readonly element: HTMLButtonElement;

    constructor(
        private readonly editor: Editor,
        private readonly item: ToolbarItem
    ) {
        this.element = document.createElement('button');
        this.initialize();
    }

    private initialize(): void {
        this.element.type = 'button';
        this.element.textContent = this.item.label ?? '';
        this.element.setAttribute('data-toolbar-item', this.item.id);
        this.element.addEventListener('click', this.handleClick);
        this.updateState();
    }

    updateState(): void {
        const context = this.createContext();
        const visible = this.item.isVisible?.(context) ?? true;
        const enabled = this.item.isEnabled?.(context) ?? true;
        const active = this.item.isActive?.(context) ?? false;
        this.element.hidden = !visible;
        this.element.disabled = !enabled;
        this.element.classList.toggle('active', active);
        this.element.setAttribute('aria-pressed', String(active));
    }

    destroy(): void {
        this.element.removeEventListener('click', this.handleClick);
        this.element.remove();
    }

    private readonly handleClick = (): void => {
        const context = this.createContext();
        const enabled = this.item.isEnabled?.(context) ?? true;
        if (!enabled) {
            return;
        }
        this.editor.executeCommand(this.item.command);
    };

    private createContext(): ToolbarContext {
        return {
            editor: this.editor,
            selection: this.editor.getSelection(),
            document: this.editor.getDocument()
        };
    }
}