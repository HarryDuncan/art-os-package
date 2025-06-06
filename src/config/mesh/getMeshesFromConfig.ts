import { Material, Object3D } from "three";
import { formatGeometry } from "./geometry/formatGeometry";
import { addMaterials } from "./mesh-materials/addMaterials";
import { setUpMeshes } from "./mesh-setup/setUpMeshes";
import { setUpRandomizedMeshConfigs } from "./randomized/setUpRandomizedMeshConfigs";
import { Asset } from "../../types";
import { SceneConfig } from "../../types/config.types";
import { transformGeometry } from "./geometry/transform-geometries/transformGeometries";
import { multipleMeshes } from "./multiple-meshes/multipleMeshes";
// import { setUpAdvancedMeshes } from "./advanced-mesh/setUpAdvancedMeshes";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export const getMeshesFromConfig = (
  assets: Asset[],
  materials: Material[],
  config: SceneConfig
): Object3D[] | GLTF[] => {
  const { meshComponentConfigs, meshTransforms } = config; //advancedMeshConfigs,
  const meshConfigs =
    meshComponentConfigs?.filter(
      (meshConfig) => !meshConfig.randomizationConfig
    ) ?? [];
  const randomizedMeshes = setUpRandomizedMeshConfigs(meshComponentConfigs);
  const multipleMeshConfigs = multipleMeshes(meshComponentConfigs);
  const allMeshes = [
    ...meshConfigs,
    ...randomizedMeshes,
    ...multipleMeshConfigs,
  ];
  const formattedGeometry = formatGeometry(assets, allMeshes);

  const transformedGeometry = transformGeometry(
    meshTransforms ?? [],
    formattedGeometry,
    assets
  );

  const geometriesWithMaterials = addMaterials(
    transformedGeometry,
    materials,
    allMeshes
  );
  const meshes = setUpMeshes(geometriesWithMaterials);

  // const advancedMeshes = setUpAdvancedMeshes(
  //   assets,
  //   advancedMeshConfigs,
  //   materials,
  //   meshTransforms,
  //   attributeConfigs
  // ) as unknown as GLTF[];

  return [...meshes] as Object3D[];
};
