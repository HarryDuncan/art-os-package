import { RawWebglAttribute } from "./buildRawWebglAttributes";

// GL-side handle for a single mesh-transform attribute. We resolve the
// attribute location once at upload time so the per-frame bind path is just a
// few cheap GL calls per attribute.
export type RawWebglAttributeBinding = {
  name: string;
  buffer: WebGLBuffer;
  location: number;
  itemSize: number;
};

// Uploads each entry in `attributes` to its own STATIC_DRAW buffer and resolves
// its attribute location in `program`. Attributes that are not declared in the
// shader (or that the GLSL compiler stripped because they're unused) are
// skipped with a warning so we don't hold dead bindings.
export const uploadRawWebglAttributes = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  attributes: Record<string, RawWebglAttribute>,
): RawWebglAttributeBinding[] => {
  const bindings: RawWebglAttributeBinding[] = [];
  Object.entries(attributes).forEach(([name, { array, itemSize }]) => {
    const location = gl.getAttribLocation(program, name);
    if (location < 0) {
      console.warn(
        `uploadRawWebglAttributes: attribute "${name}" not active in program; skipping`,
      );
      return;
    }
    const buffer = gl.createBuffer();
    if (!buffer) {
      console.warn(
        `uploadRawWebglAttributes: failed to create buffer for "${name}"`,
      );
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
    bindings.push({ name, buffer, location, itemSize });
  });
  return bindings;
};

// Per-frame binding: bind each buffer to its location and enable the attrib
// array. Always called after `gl.useProgram(program)`.
export const bindRawWebglAttributes = (
  gl: WebGL2RenderingContext,
  bindings: RawWebglAttributeBinding[],
) => {
  bindings.forEach(({ buffer, location, itemSize }) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, itemSize, gl.FLOAT, false, 0, 0);
  });
};

export const deleteRawWebglAttributes = (
  gl: WebGL2RenderingContext,
  bindings: RawWebglAttributeBinding[],
) => {
  bindings.forEach(({ buffer }) => gl.deleteBuffer(buffer));
};
