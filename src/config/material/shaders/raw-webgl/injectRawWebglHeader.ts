// Injects WebGL2 / GLSL ES 3.00 boilerplate around the GLSL strings emitted by
// the shader generator (which assumes three.js auto-injects precision, builtin
// matrix uniforms, and `position`/`normal`/`uv` attributes).
//
// Notes:
// - `#version 300 es` MUST be the very first line of the shader source; no
//   whitespace or comments may precede it.
// - The generator still emits GLSL ES 1.00-style keywords (`attribute`,
//   `varying`, `gl_FragColor`); we rewrite them to their 3.00 equivalents
//   here so the rest of the generator can stay engine-agnostic.

const VERSION_DIRECTIVE = "#version 300 es";

const VERTEX_HEADER = `precision highp float;
in vec3 position;
in vec3 normal;
in vec2 uv;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
`;

const FRAGMENT_HEADER = `precision highp float;
out vec4 fragColor;
`;

// GLSL ES 1.00 sampler functions removed in 3.00 - rewrite to their
// overloaded `texture*` equivalents. Order matters: longer names first so the
// shorter `texture2D` rule doesn't partially-rewrite `texture2DLod` /
// `texture2DProj` / `texture2DProjLod` first.
const rewriteSamplerCalls = (source: string): string =>
  source
    .replace(/\btexture2DProjLod\b/g, "textureProjLod")
    .replace(/\btexture2DProj\b/g, "textureProj")
    .replace(/\btexture2DLod\b/g, "textureLod")
    .replace(/\btexture2D\b/g, "texture")
    .replace(/\btextureCubeLod\b/g, "textureLod")
    .replace(/\btextureCube\b/g, "texture");

const rewriteVertexBody = (source: string): string =>
  rewriteSamplerCalls(
    source.replace(/\battribute\b/g, "in").replace(/\bvarying\b/g, "out"),
  );

const rewriteFragmentBody = (source: string): string =>
  rewriteSamplerCalls(
    source
      .replace(/\bvarying\b/g, "in")
      .replace(/\bgl_FragColor\b/g, "fragColor"),
  );

export const injectRawWebglHeader = (
  source: string,
  type: "vertex" | "fragment",
): string => {
  const header = type === "vertex" ? VERTEX_HEADER : FRAGMENT_HEADER;
  const body =
    type === "vertex" ? rewriteVertexBody(source) : rewriteFragmentBody(source);
  return `${VERSION_DIRECTIVE}\n${header}\n${body}`;
};
