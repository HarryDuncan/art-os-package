import { Asset } from "../../../assets/types";
import {
  MeshComponentConfig,
  MeshTransformConfig,
  RawWebglConfig,
} from "../../../config/config.types";
import {
  RAW_WEBGL_DEFAULTS,
  RAW_WEBGL_PLANE_GEOMETRY_TYPES,
} from "../../../config/material/shaders/raw-webgl/consts";
import {
  RawWebglBlending,
  RawWebglShaderMaterial,
  RawWebglUniform,
} from "../../../config/material/shaders/raw-webgl/types";
import { MESH_TYPES } from "../../../config/mesh/consts";
import { DetailedPlaneConfig } from "../../../config/mesh/types";
import { degreesToEuler } from "../../../utils/three-dimension-space/degreesToEuler";
import { packageConsole } from "../../../utils/packageConsole";
import { buildRawWebglProgram, RawWebglProgramHandles } from "./compileRawWebglProgram";
import { createPlaneGeometry } from "./createPlaneGeometry";
import { createRawPlane, RawPlaneGeometry } from "./geometry/createRawPlane";
import {
  compose,
  createMat3,
  createMat4,
  multiply,
  normalFromMat4,
} from "./math/mat4";
import { buildRawWebglAttributes } from "./mesh-transforms/buildRawWebglAttributes";
import {
  bindRawWebglAttributes,
  deleteRawWebglAttributes,
  RawWebglAttributeBinding,
  uploadRawWebglAttributes,
} from "./mesh-transforms/uploadRawWebglAttributes";
import { RawWebglTextureCache } from "./uploadRawWebglTextures";

// Uniforms the renderer drives itself; excluded from the material uniform
// upload so scene config can't fight the renderer for these slots.
const RENDERER_OWNED_UNIFORMS = new Set([
  "uTime",
  "uResolution",
  "modelMatrix",
  "viewMatrix",
  "modelViewMatrix",
  "projectionMatrix",
  "normalMatrix",
]);

export type RawWebglMaterialUniform = {
  location: WebGLUniformLocation;
  // The material's uniform object (not a snapshot) so external mutation of
  // `.value` is picked up on the next frame.
  uniform: RawWebglUniform;
  // Last uploaded scalar / small-array value; typed arrays always upload.
  last: number | number[] | undefined;
};

export type RawWebglProgramEntry = {
  materialId: string;
  handles: RawWebglProgramHandles;
  blending: RawWebglBlending;
  materialUniforms: RawWebglMaterialUniform[];
  materialUniformsByName: Map<string, RawWebglMaterialUniform>;
  locations: {
    uTime: WebGLUniformLocation | null;
    uResolution: WebGLUniformLocation | null;
    modelMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
    projectionMatrix: WebGLUniformLocation | null;
    normalMatrix: WebGLUniformLocation | null;
  };
  // Per-frame bookkeeping owned by the renderer loop.
  frameId: number;
  projectionDirty: boolean;
  resolutionDirty: boolean;
  lastItem: RawWebglDrawItem | null;
};

export type RawWebglDrawItem = {
  meshId: string;
  program: RawWebglProgramEntry;
  vao: WebGLVertexArrayObject;
  buffers: WebGLBuffer[];
  attributeBindings: RawWebglAttributeBinding[];
  mode: number;
  count: number;
  // null: drawArrays (points).
  indexType: number | null;
  modelMatrix: Float32Array;
  modelViewMatrix: Float32Array;
  normalMatrix: Float32Array;
};

export type RawWebglDrawItems = {
  items: RawWebglDrawItem[];
  programs: RawWebglProgramEntry[];
  dispose: () => void;
};

type BuildParams = {
  gl: WebGL2RenderingContext;
  meshComponentConfigs: MeshComponentConfig[] | undefined;
  shaderMaterials: RawWebglShaderMaterial[];
  meshTransforms: MeshTransformConfig[] | undefined;
  assets: Asset[];
  viewMatrix: Float32Array;
  textureCache: RawWebglTextureCache;
  legacyConfig?: Partial<RawWebglConfig>;
};

type MeshSource = {
  meshId: string | undefined;
  material: RawWebglShaderMaterial;
  geometry: RawPlaneGeometry;
  isPoints: boolean;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
};

export const isRawWebglPlaneMesh = (config: MeshComponentConfig) =>
  config.meshType !== MESH_TYPES.NONE &&
  RAW_WEBGL_PLANE_GEOMETRY_TYPES.includes(config.geometryType ?? "");

export const buildRawWebglDrawItems = ({
  gl,
  meshComponentConfigs,
  shaderMaterials,
  meshTransforms,
  assets,
  viewMatrix,
  textureCache,
  legacyConfig,
}: BuildParams): RawWebglDrawItems => {
  const sources = getMeshSources(meshComponentConfigs, shaderMaterials, legacyConfig);
  const programsByMaterial = new Map<string, RawWebglProgramEntry | null>();
  const items: RawWebglDrawItem[] = [];

  sources.forEach((source) => {
    let program = programsByMaterial.get(source.material.guid);
    if (program === undefined) {
      program = buildProgramEntry(gl, source.material, viewMatrix, textureCache);
      programsByMaterial.set(source.material.guid, program);
    }
    if (!program) return;
    const item = buildDrawItem(gl, program, source, meshTransforms, assets, viewMatrix);
    if (item) items.push(item);
  });

  const programs = Array.from(programsByMaterial.values()).filter(
    (p): p is RawWebglProgramEntry => p !== null,
  );

  return {
    items: sortForDrawing(items),
    programs,
    dispose: () => {
      items.forEach((item) => {
        gl.deleteVertexArray(item.vao);
        item.buffers.forEach((buffer) => gl.deleteBuffer(buffer));
        deleteRawWebglAttributes(gl, item.attributeBindings);
      });
      programs.forEach(({ handles }) => {
        gl.deleteProgram(handles.program);
        gl.deleteShader(handles.vertexShader);
        gl.deleteShader(handles.fragmentShader);
      });
    },
  };
};

const getMeshSources = (
  meshComponentConfigs: MeshComponentConfig[] | undefined,
  shaderMaterials: RawWebglShaderMaterial[],
  legacyConfig?: Partial<RawWebglConfig>,
): MeshSource[] => {
  const planeConfigs = (meshComponentConfigs ?? []).filter(isRawWebglPlaneMesh);

  if (!planeConfigs.length) {
    const material = shaderMaterials[0];
    return material ? [getLegacySource(material, legacyConfig)] : [];
  }

  return planeConfigs.flatMap((config) => {
    const material = shaderMaterials.find((m) => m.guid === config.materialId);
    if (!material) {
      packageConsole.warn(
        `raw-webgl: mesh ${config.guid} has no built shader material "${config.materialId}"; skipping`,
      );
      return [];
    }
    const { width, height } = (config.customGeometryConfig ?? {}) as Partial<DetailedPlaneConfig>;
    const meshType = config.meshType ?? RAW_WEBGL_DEFAULTS.meshType;
    const geometry = createRawPlane({
      geometryType: config.geometryType ?? RAW_WEBGL_DEFAULTS.geometryType,
      meshType,
      width: width ?? RAW_WEBGL_DEFAULTS.planeWidth,
      height: height ?? RAW_WEBGL_DEFAULTS.planeHeight,
      scale: config.geometryConfig?.scale ?? RAW_WEBGL_DEFAULTS.scale,
      centered:
        (config.centerGeometryToOrigin ?? false) ||
        (config.geometryConfig?.centerMesh ?? !config.geometryConfig),
    });
    return [
      {
        meshId: config.guid,
        material,
        geometry,
        isPoints: meshType === MESH_TYPES.POINTS,
        position: {
          x: config.position?.x ?? 0,
          y: config.position?.y ?? 0,
          z: config.position?.z ?? 0,
        },
        rotation: {
          x: degreesToEuler(config.rotation?.x ?? 0),
          y: degreesToEuler(config.rotation?.y ?? 0),
          z: degreesToEuler(config.rotation?.z ?? 0),
        },
      },
    ];
  });
};

// Scenes without plane meshes keep the original behaviour: one fullscreen
// clip-space plane drawn with the first material.
const getLegacySource = (
  material: RawWebglShaderMaterial,
  legacyConfig?: Partial<RawWebglConfig>,
): MeshSource => {
  const plane = createPlaneGeometry(
    legacyConfig?.planeGeometryConfig?.xSegments ?? RAW_WEBGL_DEFAULTS.legacyPlaneSegments,
    legacyConfig?.planeGeometryConfig?.ySegments ?? RAW_WEBGL_DEFAULTS.legacyPlaneSegments,
  );
  const isPoints = legacyConfig?.drawMode
    ? legacyConfig.drawMode === "POINTS"
    : RAW_WEBGL_DEFAULTS.legacyDrawMode === MESH_TYPES.POINTS;
  return {
    meshId: undefined,
    material,
    geometry: {
      positions: plane.positions,
      normals: plane.normals,
      uvs: plane.uvs,
      indices: isPoints ? null : plane.indices,
      vertexCount: plane.vertexCount,
    },
    isPoints,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  };
};

const buildProgramEntry = (
  gl: WebGL2RenderingContext,
  material: RawWebglShaderMaterial,
  viewMatrix: Float32Array,
  textureCache: RawWebglTextureCache,
): RawWebglProgramEntry | null => {
  let handles: RawWebglProgramHandles;
  try {
    handles = buildRawWebglProgram(gl, material.vertexShader, material.fragmentShader);
  } catch (error) {
    packageConsole.error(
      `raw-webgl: program build failed for material ${material.guid}`,
      error,
    );
    return null;
  }
  const { getUniformLocation } = handles;

  // A program's uniform state persists, so samplers and the (static) view
  // matrix are set once here and never again.
  gl.useProgram(handles.program);
  const viewLocation = getUniformLocation("viewMatrix");
  if (viewLocation !== null) gl.uniformMatrix4fv(viewLocation, false, viewMatrix);
  material.textureBindings.forEach((binding) => {
    const location = getUniformLocation(binding.uniformId);
    if (location === null) return;
    const unit = textureCache.getUnit(binding);
    if (unit !== null) gl.uniform1i(location, unit);
  });

  const materialUniformsByName = new Map<string, RawWebglMaterialUniform>();
  Object.keys(material.uniforms).forEach((name) => {
    if (RENDERER_OWNED_UNIFORMS.has(name)) return;
    const location = getUniformLocation(name);
    if (location === null) return;
    materialUniformsByName.set(name, {
      location,
      uniform: material.uniforms[name],
      last: undefined,
    });
  });
  const materialUniforms = Array.from(materialUniformsByName.values());

  return {
    materialId: material.guid,
    handles,
    blending: material.blending,
    materialUniforms,
    materialUniformsByName,
    locations: {
      uTime: getUniformLocation("uTime"),
      uResolution: getUniformLocation("uResolution"),
      modelMatrix: getUniformLocation("modelMatrix"),
      modelViewMatrix: getUniformLocation("modelViewMatrix"),
      projectionMatrix: getUniformLocation("projectionMatrix"),
      normalMatrix: getUniformLocation("normalMatrix"),
    },
    frameId: -1,
    projectionDirty: true,
    resolutionDirty: true,
    lastItem: null,
  };
};

const buildDrawItem = (
  gl: WebGL2RenderingContext,
  program: RawWebglProgramEntry,
  source: MeshSource,
  meshTransforms: MeshTransformConfig[] | undefined,
  assets: Asset[],
  viewMatrix: Float32Array,
): RawWebglDrawItem | null => {
  const { geometry } = source;
  const { attribs } = program.handles;
  const vao = gl.createVertexArray();
  if (!vao) {
    packageConsole.warn("raw-webgl: gl.createVertexArray returned null");
    return null;
  }
  gl.bindVertexArray(vao);

  // Buffers the shader doesn't read (location < 0) are never created.
  const buffers: WebGLBuffer[] = [];
  const addAttribute = (location: number, data: Float32Array, size: number) => {
    if (location < 0) return;
    const buffer = gl.createBuffer();
    if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    buffers.push(buffer);
  };
  addAttribute(attribs.position, geometry.positions, 3);
  addAttribute(attribs.normal, geometry.normals, 3);
  addAttribute(attribs.uv, geometry.uvs, 2);

  let indexType: number | null = null;
  if (geometry.indices) {
    const indexBuffer = gl.createBuffer();
    if (indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);
      buffers.push(indexBuffer);
      indexType =
        geometry.indices instanceof Uint16Array ? gl.UNSIGNED_SHORT : gl.UNSIGNED_INT;
    }
  }

  const attributeBindings = uploadRawWebglAttributes(
    gl,
    program.handles.program,
    buildRawWebglAttributes(meshTransforms, geometry.vertexCount, assets, source.meshId),
  );
  bindRawWebglAttributes(gl, attributeBindings);
  gl.bindVertexArray(null);

  const modelMatrix = compose(createMat4(), source.position, source.rotation);
  const modelViewMatrix = multiply(createMat4(), viewMatrix, modelMatrix);
  const normalMatrix = normalFromMat4(createMat3(), modelViewMatrix);

  const drawsPoints = source.isPoints || indexType === null;
  return {
    meshId: source.meshId ?? "",
    program,
    vao,
    buffers,
    attributeBindings,
    mode: drawsPoints ? gl.POINTS : gl.TRIANGLES,
    count: drawsPoints ? geometry.vertexCount : (geometry.indices?.length ?? 0),
    indexType: drawsPoints ? null : indexType,
    modelMatrix,
    modelViewMatrix,
    normalMatrix,
  };
};

// Opaque meshes first, grouped by program to minimise useProgram / state
// changes (order between them is resolved by the depth buffer). Transparent
// meshes keep their config order since blending is order-dependent.
const sortForDrawing = (items: RawWebglDrawItem[]) => {
  const opaque = items.filter((item) => !item.program.blending.transparent);
  const transparent = items.filter((item) => item.program.blending.transparent);
  const programOrder = new Map<RawWebglProgramEntry, number>();
  opaque.forEach((item) => {
    if (!programOrder.has(item.program)) programOrder.set(item.program, programOrder.size);
  });
  const sortedOpaque = opaque
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        (programOrder.get(a.item.program) ?? 0) - (programOrder.get(b.item.program) ?? 0) ||
        a.index - b.index,
    )
    .map(({ item }) => item);
  return [...sortedOpaque, ...transparent];
};
