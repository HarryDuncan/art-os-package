/**
 * Logs which GPU/driver the browser actually gave this WebGL context.
 * Filter console for `[WebGL GPU]`.
 */
export const logWebGLGpuInfo = (
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  label: string,
  extras?: Record<string, unknown>,
) => {
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const vendor = debugInfo
    ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
    : gl.getParameter(gl.VENDOR);
  const renderer = debugInfo
    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  const version = gl.getParameter(gl.VERSION);
  const shadingLanguageVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
  const rendererLower = String(renderer).toLowerCase();
  const looksSoftware =
    rendererLower.includes("swiftshader") ||
    rendererLower.includes("llvmpipe") ||
    rendererLower.includes("softpipe") ||
    rendererLower.includes("microsoft basic render") ||
    rendererLower.includes("software");

  console.log(`[WebGL GPU] ${label}`, {
    vendor,
    renderer,
    version,
    shadingLanguageVersion,
    looksSoftware,
    isWebGL2: typeof WebGL2RenderingContext !== "undefined" &&
      gl instanceof WebGL2RenderingContext,
    ...extras,
  });

  if (looksSoftware) {
    console.warn(
      `[WebGL GPU] ${label}: software / non-GPU renderer detected — no hardware acceleration`,
      renderer,
    );
  }
};
