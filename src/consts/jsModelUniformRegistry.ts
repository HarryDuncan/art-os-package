/**
 * Module-level registry mapping WebGL uniform IDs to live numeric/array values
 * produced by remote WebSocket model streams (or other external producers).
 *
 * The key is the full uniform name — `u_${shaderParameterKey}_${itemId}` —
 * matching the canvas registry and shader pipeline conventions.
 *
 * `useRawWebglRenderer` reads this registry each frame and uploads overrides
 * after the static scene uniforms so streamed data wins.
 */

const registry = new Map<string, unknown>();

export const setJsModelUniform = (
  uniformId: string,
  value: unknown,
): void => {
  registry.set(uniformId, value);
};

export const clearJsModelUniform = (uniformId: string): void => {
  registry.delete(uniformId);
};

export const clearAllJsModelUniforms = (): void => {
  registry.clear();
};

/** Returns a read-only view of the current registry snapshot. */
export const getJsModelUniformRegistry = (): ReadonlyMap<string, unknown> =>
  registry;
