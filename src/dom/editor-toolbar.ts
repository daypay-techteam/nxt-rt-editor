export class EditorToolbar {

  constructor(
    private readonly toolbar: HTMLElement,
    private readonly editorElement: HTMLElement
  ) {
  }

  attach(): void {
    this.toolbar.addEventListener('mousedown',this.handleMouseDown);
  }

  detach(): void {
    this.toolbar.removeEventListener('mousedown',this.handleMouseDown);
  }

  private readonly handleMouseDown = (
    event: MouseEvent
  ): void => {

    const target = event.target as HTMLElement;

    const button = target.closest<HTMLButtonElement>(
      'button[data-command]'
    );

    if (!button) {
      return;
    }
    // Important:
    // Prevent the editor from losing its current selection.
    event.preventDefault();
    const command = button.dataset['command'];
    if (!command) {
      return;
    }
    this.execute(command);
  };

  private execute(command: string): void {
    console.log('Toolbar command:',command);
    switch (command) {
      case 'bold':
        this.toggleBold();
        break;
      case 'italic':
        this.toggleItalic();
        break;
      case 'underline':
        this.toggleUnderline();
        break;
      default:
        console.log(`Command "${command}" not implemented yet`);
    }
  }

  private toggleBold(): void {
    console.log('Bold');
  }

  private toggleItalic(): void {
    console.log('Italic');
  }

  private toggleUnderline(): void {
    console.log('Underline');
  }
}