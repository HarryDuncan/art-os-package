/**
 * Module-level registry mapping WebGL uniform IDs to live HTMLCanvasElements
 * produced by JS-class models (e.g. the person-mask MediaPipe runtime).
 *
 * The key is the full uniform name — `u_${shaderParameterKey}_${itemId}` —
 * matching the convention used everywhere else in the shader pipeline.
 *
 * `useRawWebglRenderer` polls this registry inside its rAF draw loop and
 * lazily allocates a `WebGLTexture` the first time it sees each entry, then
 * calls `gl.texSubImage2D` on every subsequent frame to push fresh pixels.
 *
 * Consumers in art-os-2 call `registerJsModelCanvas` / `unregisterJsModelCanvas`
 * (exported from the package index) to add and remove entries.
 */

const registry = new Map<string, HTMLCanvasElement>();

export const registerJsModelCanvas = (
  uniformId: string,
  canvas: HTMLCanvasElement,
): void => {
  registry.set(uniformId, canvas);
};

export const unregisterJsModelCanvas = (uniformId: string): void => {
  registry.delete(uniformId);
};

/** Returns a read-only view of the current registry snapshot. */
export const getJsModelCanvasRegistry = (): ReadonlyMap<
  string,
  HTMLCanvasElement
> => registry;
