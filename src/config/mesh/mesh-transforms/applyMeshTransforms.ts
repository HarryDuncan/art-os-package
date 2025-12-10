import { MeshComponentConfig, MeshTransformConfig } from "../../config.types";
import { FormattedGeometry } from "../../../assets/geometry/geometry.types";
import { formatMeshTransforms } from "./formatMeshTransforms";
import { Asset } from "../../../assets/types";
import { setAttributes } from "./setAttributes";

export const applyMeshTransforms = (
  meshTransforms: MeshTransformConfig[] | undefined,
  formattedGeometries: FormattedGeometry[],
  assets: Asset[],
  meshComponentConfigs: MeshComponentConfig[]
): FormattedGeometry[] => {
  if (!meshTransforms || !meshTransforms.length) return formattedGeometries;

  const formattedMeshTransforms = formatMeshTransforms(
    meshTransforms,
    assets,
    meshComponentConfigs
  );

  formattedMeshTransforms.forEach(({ values, transformedMeshIds }) => {
    const transformedMeshes = getTransformedMeshes(
      formattedGeometries,
      transformedMeshIds
    );
    if (transformedMeshes.length) {
      return transformedMeshes.map((formattedGeometry) => {
        const { geometry } = formattedGeometry;
        const setAttributeGeometry = setAttributes(geometry, values ?? {});
        return { ...formattedGeometry, geometry: setAttributeGeometry };
      });
    } else {
      console.warn(
        `No transformed meshes - check transform config ${transformedMeshIds}`
      );
    }
    return formattedGeometries;
  });

  return formattedGeometries;
};

const getTransformedMeshes = (
  formattedGeometries: FormattedGeometry[],
  transformedMeshIds: string[]
) =>
  formattedGeometries
    .filter((geometry) => transformedMeshIds.includes(geometry.meshId ?? ""))
    .sort((a, b) => {
      const indexA = transformedMeshIds.indexOf(a.meshId ?? "");
      const indexB = transformedMeshIds.indexOf(b.meshId ?? "");
      return indexA - indexB;
    });

// case MESH_TRANSFORM_TYPES.MORPH: {
//   transformedMeshes.forEach((morphTarget, index) => {
//     if (index !== 0) {
//       const { vertices, normals } = getGeometryAttributes(
//         morphTarget.geometry
//       );

//       transformedMeshes[0].geometry.setAttribute(
//         `morphPosition${index - 1}`,
//         new BufferAttribute(vertices, 3)
//       );

//       transformedMeshes[0].geometry.setAttribute(
//         `morphNormal${index - 1}`,
//         new BufferAttribute(normals, 3)
//       );
//     }
//   });
//   const morphAttributeConfig = mergeAttributeConfigs(
//     DEFAULT_MORPH_ATTRIBUTE_CONFIG as ParameterConfig[],
//     attributeConfigs ?? []
//   );
//   const configuredRootGeometry = setAttributes(
//     transformedMeshes[0].geometry,
//     morphAttributeConfig
//   );
//   transformedMeshes[0] = {
//     ...transformedMeshes[0],
//     geometry: configuredRootGeometry,
//   };
//   return transformedMeshes;
// }

// case MESH_TRANSFORM_TYPES.PRE_DEFINED: {
//   const attributesSet = transformedMeshes.flatMap(({ geometry }) => {
//     attributeConfigs?.forEach((config) => {
//       if (config.value) {
//         geometry.setAttribute(
//           config.id,
//           config.value as BufferAttribute
//         );
//       }
//     });
//     return geometry;
//   });
//   return attributesSet;
// }
