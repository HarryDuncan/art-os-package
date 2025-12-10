import { BufferGeometry, Vector3 } from "three";
import { Asset } from "../../../assets/types";
import {
  FormattedGeometry,
  GeometryConfig,
} from "../../../assets/geometry/geometry.types";
import { DEFAULT_MODEL3D_CONFIG } from "../../../assets/consts";
import { MeshComponentConfig } from "../../config.types";
import { getAssetGeometry } from "../../../config/mesh/geometry/getAssetGeometries";
import {
  formatPositionFromConfig,
  formatRotationFromConfig,
} from "../../../utils/three-dimension-space/formatFromConfig";
import { setUpCustomBufferGeometry } from "./custom-buffer-geometry/setupCustomBufferGeometry";
import { CustomBufferGeometryType } from "../types";
import { CUSTOM_GEOMETRY_TYPES, MESH_TYPES } from "../consts";
import { MeshType } from "../../../assets/geometry/geometry.types";

export const formatGeometry = (
  loadedAssets: Asset[],
  meshComponentConfigs: MeshComponentConfig[]
): FormattedGeometry[] => {
  return meshComponentConfigs.flatMap((meshConfig) => {
    const formattedConfig = getGeometryForMeshConfig(meshConfig, loadedAssets);
    if (!formattedConfig) {
      return [];
    }
    const position = formatPositionFromConfig(
      meshConfig,
      formattedConfig?.positionOffset
    );
    const rotation = formatRotationFromConfig(meshConfig);
    const configuredGeometry = configureGeometry(
      formattedConfig.geometry,
      meshConfig.geometryConfig
    );
    return {
      meshId: meshConfig.guid,
      materialId: meshConfig.materialId,
      geometry: configuredGeometry,
      assetId: meshConfig.assetId,
      meshType: meshConfig.meshType ?? MESH_TYPES.MESH,
      position: position,
      rotation,
      groupId: meshConfig.groupId,
    } as FormattedGeometry;
  }) as FormattedGeometry[];
};

export const configureGeometry = (
  geometry: BufferGeometry,
  geometryConfig: GeometryConfig = DEFAULT_MODEL3D_CONFIG
) => {
  const formattedGeometry = geometry.clone();
  const { scale, centerMesh } = geometryConfig;
  formattedGeometry.scale(scale, scale, scale);
  if (centerMesh) {
    formattedGeometry.center();
  }

  const size = new Vector3();
  formattedGeometry.computeBoundingBox();
  formattedGeometry.boundingBox?.getSize(size);
  return formattedGeometry;
};

const getGeometryForMeshConfig = (
  meshComponentConfig: MeshComponentConfig,
  loadedAssets: Asset[]
) => {
  const {
    geometryType,
    assetId,
    customGeometryConfig,
    meshType,
    geometryConfig,
  } = meshComponentConfig;
  if (geometryType) {
    if (CUSTOM_GEOMETRY_TYPES.includes(geometryType)) {
      return setUpCustomBufferGeometry(
        geometryType as CustomBufferGeometryType,
        customGeometryConfig ?? {},
        geometryConfig?.scale ?? 1,
        meshType as MeshType
      );
    }
  }
  const asset = loadedAssets.find((asset) => asset.guid === assetId);
  if (!asset) {
    console.warn(
      `no asset found for ${assetId} this mesh will not be rendered`
    );
    return null;
  }
  const geometry = getAssetGeometry(asset, meshComponentConfig);
  console.log("geometry", geometry);
  if (!geometry) {
    console.warn(
      `no geometry found for ${assetId} this mesh will not be rendered`
    );
    return null;
  }
  return geometry[0];
};
