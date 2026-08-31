const selectableOverrides = new Map<string, boolean>();
let onSelectableChange: (() => void) | null = null;

/** Used by meshPositionInteraction to refresh handles when selectable changes. */
export const setMeshSelectableChangeListener = (
  listener: (() => void) | null,
): void => {
  onSelectableChange = listener;
};

export const clearMeshPositionSelectableOverrides = (): void => {
  selectableOverrides.clear();
  onSelectableChange?.();
};

export const setMeshPositionSelectable = (
  meshId: string,
  selectable: boolean,
): void => {
  selectableOverrides.set(meshId, selectable);
  onSelectableChange?.();
};

export const isMeshPositionSelectable = (meshId: string): boolean =>
  selectableOverrides.get(meshId) === true;
