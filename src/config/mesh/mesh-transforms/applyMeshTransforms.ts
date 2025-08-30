import { BufferAttribute, Vector2 } from "three";
import { MeshTransformConfig, TransformValueConfig } from "../../config.types";
import { FormattedGeometry } from "../../../assets/geometry/geometry.types";
import { MESH_TRANSFORM_TYPES } from "../../material/shaders/schema";
import { formatMeshTransforms } from "./formatMeshTransforms";
import { Asset } from "../../../assets/types";
import { setAttributes } from "./setAttributes";

export const applyMeshTransforms = (
  meshTransforms: MeshTransformConfig[] | undefined,
  formattedGeometries: FormattedGeometry[],
  assets: Asset[]
): FormattedGeometry[] => {
  if (!meshTransforms || !meshTransforms.length) return formattedGeometries;

  const formattedMeshTransforms = formatMeshTransforms(meshTransforms, assets);

  formattedMeshTransforms.forEach(({ type, values, transformedMeshIds }) => {
    const transformedMeshes = getTransformedMeshes(
      formattedGeometries,
      transformedMeshIds
    );
    if (transformedMeshes.length) {
      switch (type) {
        case MESH_TRANSFORM_TYPES.SINGLE_PARAMETERS:
        case MESH_TRANSFORM_TYPES.CUSTOM_ATTRIBUTES: {
          return transformedMeshes.map((formattedGeometry) => {
            const { geometry } = formattedGeometry;
            const setAttributeGeometry = setAttributes(geometry, values ?? {});
            return { ...formattedGeometry, geometry: setAttributeGeometry };
          });
        }
        case MESH_TRANSFORM_TYPES.SET_UP_PLANE:
        case MESH_TRANSFORM_TYPES.SET_UP_QUAD: {
          const attributesSet = transformedMeshes.map((formattedGeometry) => {
            const { geometry } = formattedGeometry;

            const quadDimensions = values[
              "quadDimensions" as keyof typeof values
            ] as TransformValueConfig;
            if (quadDimensions) {
              let x: number, y: number;
              if (Array.isArray(quadDimensions.value)) {
                [x, y] = quadDimensions.value;
              } else if (
                quadDimensions.value &&
                typeof quadDimensions.value === "object" &&
                "x" in quadDimensions.value &&
                "y" in quadDimensions.value
              ) {
                x = (quadDimensions.value as Vector2).x;
                y = (quadDimensions.value as Vector2).y;
              } else {
                throw new Error(
                  "quadDimensions.value must be a Vector2 or [x, y] array"
                );
              }
              const width = x;
              const height = y;
              if (width && height) {
                const vertexesNumber = Number(width) * Number(height);
                const indices = new Uint16Array(vertexesNumber);
                const offsets = new Float32Array(vertexesNumber * 3);
                const normals = new Float32Array(vertexesNumber * 3);

                for (let i = 0; i < vertexesNumber; i++) {
                  const x = i % Number(width);
                  const y = Math.floor(i / Number(width));

                  // Set vertex positions directly
                  offsets[i * 3 + 0] = x; // x coordinate
                  offsets[i * 3 + 1] = y; // y coordinate
                  offsets[i * 3 + 2] = 0; // z: flat plane

                  indices[i] = i;

                  // Set normals pointing up
                  normals[i * 3 + 0] = 0; // nx
                  normals[i * 3 + 1] = 0; // ny
                  normals[i * 3 + 2] = 1; // nz
                }

                const positions = new BufferAttribute(offsets, 3);
                const pointOffset = new BufferAttribute(offsets, 3);
                const indexes = new BufferAttribute(indices, 1);
                const normalAttributes = new BufferAttribute(normals, 3);

                geometry.setAttribute("position", positions);
                geometry.setAttribute("pointIndex", indexes);
                geometry.setAttribute("normal", normalAttributes);
                geometry.setAttribute("pointOffset", pointOffset);
                geometry.setIndex(null);

                return {
                  ...formattedGeometry,
                  geometry,
                };
              } else {
                console.warn("No width and height configured");
              }
            }
            return geometry;
          });

          return attributesSet;
        }

        // case MESH_TRANSFORM_TYPES.DEFAULT:
        default: {
          return formattedGeometries;
        }
      }
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
