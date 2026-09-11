export interface EditorSelection {
  readonly from: number;
  readonly to: number;
}

export function createSelection(
  from: number,
  to: number = from
): EditorSelection {
  return {
    from,
    to
  };
}