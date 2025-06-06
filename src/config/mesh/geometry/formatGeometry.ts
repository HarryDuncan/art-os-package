import { BufferGeometry, Vector3 } from "three";
import { Asset } from "../../../types";
import {
  AssetGeometry,
  FormattedGeometry,
  GeometryConfig,
} from "../../../assets/geometry/geometry.types";
import { DEFAULT_MODEL3D_CONFIG } from "../../../assets/assets.constants";
import { MeshComponentConfig } from "../../../types/config.types";
import { getAssetGeometries } from "../../../config/mesh/geometry/getAssetGeometries";
import {
  formatPositionFromConfig,
  formatRotationFromConfig,
} from "../../../utils/three-dimension-space/formatFromConfig";
import { setUpCustomBufferGeometry } from "./custom-buffer-geometry/setupCustomBufferGeometry";
import { CustomBufferGeometryType, CustomGeometryConfig } from "../mesh.types";
import { CUSTOM_GEOMETRY_TYPES, MESH_TYPES } from "../mesh.consts";

export const formatGeometry = (
  loadedAssets: Asset[],
  meshComponentConfigs: MeshComponentConfig[]
): FormattedGeometry[] => {
  const geometries = getAssetGeometries(loadedAssets);

  return meshComponentConfigs.flatMap((meshConfig) => {
    const geometry = getGeometryForMeshConfig(
      geometries,
      meshConfig.geometryType,
      meshConfig.assetId,
      meshConfig.customGeometryConfig
    );
    if (!geometry?.geometry) {
      return [];
    }

    const position = formatPositionFromConfig(meshConfig);
    const rotation = formatRotationFromConfig(meshConfig);
    const configuredGeometry = configureGeometry(
      geometry.geometry,
      meshConfig.geometryConfig
    );

    return {
      meshId: meshConfig.id,
      materialId: meshConfig.materialId,
      geometry: configuredGeometry,
      assetId: meshConfig.assetId,
      meshType: meshConfig.meshType ?? MESH_TYPES.MESH,
      position,
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
  geometries: AssetGeometry[],
  geometryType?: string,
  assetId?: string,
  customGeometryConfig?: CustomGeometryConfig
) => {
  if (geometryType) {
    if (CUSTOM_GEOMETRY_TYPES.includes(geometryType)) {
      const customGeometry = setUpCustomBufferGeometry(
        geometryType as CustomBufferGeometryType,
        customGeometryConfig
      );
      return { geometry: customGeometry };
    }
  }

  const meshGeometry = geometries.find(
    (geometry) => geometry.assetId === assetId
  );

  if (!meshGeometry) {
    console.warn(
      `no geometry found for ${assetId} this mesh will not be rendered`
    );
  }

  return {
    ...meshGeometry,
    geometry: meshGeometry?.geometry.clone(),
  };
};
