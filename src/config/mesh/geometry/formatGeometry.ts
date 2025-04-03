import { BufferGeometry, Vector3 } from "three";
import { Asset } from "../../../assets/asset.types";
import {
  FormattedGeometry,
  GeometryConfig,
} from "../../../assets/geometry/geometry.types";
import { DEFAULT_MODEL3D_CONFIG } from "../../../assets/assets.constants";
import { MeshComponentConfig } from "../../config.types";
import { getAssetGeometries } from "../../../config/mesh/geometry/getAssetGeometries";
import {
  formatPositionFromConfig,
  formatRotationFromConfig,
} from "../../../utils/three-dimension-space/formatFromConfig";
import { setUpCustomBufferGeometry } from "./custom-buffer-geometry/setupCustomBufferGeometry";
import { CustomBufferGeometryType } from "../mesh.types";
import { CUSTOM_GEOMETRY_TYPES, MESH_TYPES } from "../../../consts/mesh.consts";

export const formatGeometry = (
  loadedAssets: Asset[],
  meshComponentConfigs: MeshComponentConfig[]
): FormattedGeometry[] => {
  const geometries = getAssetGeometries(loadedAssets);

  return meshComponentConfigs.flatMap((meshConfig) => {
    const geometry = getGeometryForMeshConfig(
      geometries,
      meshConfig.geometryId ?? ""
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
      geometry: configuredGeometry,
      name: meshConfig.id,
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
  geometries: FormattedGeometry[],
  geometryId: string
) => {
  if (CUSTOM_GEOMETRY_TYPES.includes(geometryId)) {
    const customGeometry = setUpCustomBufferGeometry(
      geometryId as CustomBufferGeometryType,
      {}
    );

    return { geometry: customGeometry };
  }
  const meshGeometry = geometries.find(
    (geometry) =>
      // @ts-ignore
      geometry.name === geometryId || geometry.assetId === geometryId
  );
  if (!meshGeometry) {
    console.warn(
      `no geometry found for ${geometryId} this mesh will not be rendered
        geometry names ${geometries.map(({ name }) => name)}`
    );
  }

  return {
    ...meshGeometry,
    geometry: meshGeometry?.geometry.clone(),
  };
};
