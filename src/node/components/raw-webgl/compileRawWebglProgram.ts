export type RawWebglProgramHandles = {
  program: WebGLProgram;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;
  attribs: {
    position: number;
    normal: number;
    uv: number;
  };
  getUniformLocation: (name: string) => WebGLUniformLocation | null;
};

export const compileShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader => {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Failed to allocate WebGLShader");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "(no info log)";
    gl.deleteShader(shader);
    const stage = type === gl.VERTEX_SHADER ? "vertex" : "fragment";
    throw new Error(`Failed to compile ${stage} shader:\n${log}\n---\n${source}`);
  }
  return shader;
};

export const linkProgram = (
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram => {
  const program = gl.createProgram();
  if (!program) {
    throw new Error("Failed to allocate WebGLProgram");
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? "(no info log)";
    gl.deleteProgram(program);
    throw new Error(`Failed to link WebGL program:\n${log}`);
  }
  return program;
};

export const buildRawWebglProgram = (
  gl: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string,
): RawWebglProgramHandles => {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource,
  );
  const program = linkProgram(gl, vertexShader, fragmentShader);

  return {
    program,
    vertexShader,
    fragmentShader,
    attribs: {
      position: gl.getAttribLocation(program, "position"),
      normal: gl.getAttribLocation(program, "normal"),
      uv: gl.getAttribLocation(program, "uv"),
    },
    getUniformLocation: (name: string) => gl.getUniformLocation(program, name),
  };
};
