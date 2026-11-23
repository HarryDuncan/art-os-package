import { RawWebglUniformValue } from "../../../config/material/shaders/raw-webgl/types";

// Heuristic dispatch keyed on the JS shape of each uniform value. Good enough
// for float-only shaders. TODO: plumb GLSL `valueType` through from
// `formatRawWebglUniforms` so we can call gl.uniform1i / uniform1iv for
// `int` / `bool` / `sampler2D[]` uniforms.
export const setRawWebglUniform = (
  gl: WebGL2RenderingContext,
  location: WebGLUniformLocation | null,
  value: RawWebglUniformValue,
) => {
  if (location === null) return;

  if (typeof value === "number") {
    gl.uniform1f(location, value);
    return;
  }

  if (Array.isArray(value)) {
    switch (value.length) {
      case 1:
        gl.uniform1f(location, value[0]);
        return;
      case 2:
        gl.uniform2fv(location, value);
        return;
      case 3:
        gl.uniform3fv(location, value);
        return;
      case 4:
        gl.uniform4fv(location, value);
        return;
      default:
        gl.uniform1fv(location, value);
        return;
    }
  }

  if (value instanceof Float32Array) {
    if (value.length === 9) {
      gl.uniformMatrix3fv(location, false, value);
      return;
    }
    if (value.length === 16) {
      gl.uniformMatrix4fv(location, false, value);
      return;
    }
    gl.uniform1fv(location, value);
    return;
  }

  if (value instanceof Int32Array) {
    if (value.length === 1) {
      gl.uniform1i(location, value[0]);
      return;
    }
    gl.uniform1iv(location, value);
    return;
  }
};
