import type { EditorMark } from "../mark/editor-mark";

export interface EditorNode {
  readonly type: string;

  readonly attrs?: Record<string, unknown>;

  readonly content?: EditorNode[];

  readonly text?: string;

  readonly marks?: EditorMark[];
}