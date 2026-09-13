export interface KeyboardShortcut {

  readonly key: string;

  readonly ctrl?: boolean;

  readonly meta?: boolean;

  readonly shift?: boolean;

  readonly alt?: boolean;

  readonly command: string;
}