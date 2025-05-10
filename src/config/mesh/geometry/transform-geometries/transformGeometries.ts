import { BufferAttribute, Vector2 } from "three";
import { getGeometryAttributes } from "../../attributes/attribute.functions";
import { MeshTransformConfig } from "../../../../types/config.types";
import { FormattedGeometry } from "../../../../assets/geometry/geometry.types";
import { setAttributes } from "../../attributes/set-attributes/setAttributes";
import { mergeArraysWithoutDuplicates } from "../../../../utils/mergeArraysWithoutDuplicates";
import { MESH_TRANSFORM_TYPE } from "../../../../consts/mesh.consts";
import { DEFAULT_MORPH_ATTRIBUTE_CONFIG } from "../../meshTransforms.consts";
import { Asset, AttributeConfig } from "../../../../types";
import { getAttributeValuesFromAssets } from "../../attributes/getAttributeValuesFromAsset";

export const transformGeometry = (
  meshTransforms: MeshTransformConfig[] | undefined,
  formattedGeometries: FormattedGeometry[],
  assets: Asset[]
): FormattedGeometry[] => {
  if (!meshTransforms || !meshTransforms.length) return formattedGeometries;

  // format asset data into attribute config for mesh transforms
  const formattedMeshTransforms = formatTransforms(meshTransforms, assets);
  // console.log(getAttributeValuesFromAssets)
  console.log(formattedMeshTransforms);
  formattedMeshTransforms.forEach(
    ({ type, transformedMeshIds, attributeConfigs }) => {
      const transformedMeshes = getTransformedMeshes(
        formattedGeometries,
        transformedMeshIds
      );

      if (transformedMeshes.length) {
        switch (type) {
          case MESH_TRANSFORM_TYPE.MORPH: {
            transformedMeshes.forEach((morphTarget, index) => {
              if (index !== 0) {
                const { vertices, normals } = getGeometryAttributes(
                  morphTarget.geometry
                );

                transformedMeshes[0].geometry.setAttribute(
                  `morphPosition${index - 1}`,
                  new BufferAttribute(vertices, 3)
                );

                transformedMeshes[0].geometry.setAttribute(
                  `morphNormal${index - 1}`,
                  new BufferAttribute(normals, 3)
                );
              }
            });
            const morphAttributeConfig = mergeAttributeConfigs(
              DEFAULT_MORPH_ATTRIBUTE_CONFIG as AttributeConfig[],
              attributeConfigs ?? []
            );
            const configuredRootGeometry = setAttributes(
              transformedMeshes[0].geometry,
              morphAttributeConfig
            );
            transformedMeshes[0] = {
              ...transformedMeshes[0],
              geometry: configuredRootGeometry,
            };
            return transformedMeshes;
          }
          case MESH_TRANSFORM_TYPE.CUSTOM_ATTRIBUTES: {
            const attributesSet = transformedMeshes.map((formattedGeometry) => {
              const { geometry } = formattedGeometry;
              const setAttributeGeometry = setAttributes(
                geometry,
                attributeConfigs ?? []
              );
              return { ...formattedGeometry, geometry: setAttributeGeometry };
            });
            return attributesSet;
          }
          case MESH_TRANSFORM_TYPE.PRE_DEFINED: {
            const attributesSet = transformedMeshes.flatMap(({ geometry }) => {
              attributeConfigs?.forEach((config) => {
                if (config.value) {
                  geometry.setAttribute(
                    config.id,
                    config.value as BufferAttribute
                  );
                }
              });
              return geometry;
            });
            return attributesSet;
          }
          case MESH_TRANSFORM_TYPE.SET_UP_QUAD: {
            console.log("SET_UP_QUAD");
            const attributesSet = transformedMeshes.map((formattedGeometry) => {
              const { geometry } = formattedGeometry;

              const quadDimensions = attributeConfigs?.find(
                ({ id }) => id === "quadDimensions"
              );
              if (quadDimensions) {
                const { value } = quadDimensions as { value: Vector2 };
                const width = value?.x;
                const height = value?.y;

                if (width && height) {
                  const vertexesNumber = Number(width) * Number(height);
                  const indices = new Uint16Array(vertexesNumber);
                  const offsets = new Float32Array(vertexesNumber);
                  const normals = new Float32Array(vertexesNumber * 3);
                  for (let i = 0, j = 0; i < vertexesNumber; i += 1) {
                    const x = i % Number(width);
                    const y = Math.floor(i / Number(height));
                    offsets[j * 3 + 0] = x;
                    offsets[j * 3 + 1] = y;
                    offsets[j * 3 + 2] = 0;
                    indices[j] = i;
                    j += 1;

                    normals[j * 3 + 0] = 0; // nx
                    normals[j * 3 + 1] = 0; // ny
                    normals[j * 3 + 2] = 1; // nz
                  }
                  const positions = new BufferAttribute(offsets, 3);
                  const indexes = new BufferAttribute(indices, 3);
                  const normalAttributes = new BufferAttribute(normals, 3);
                  geometry.setAttribute("position", positions);
                  geometry.setAttribute("pointIndex", indexes);
                  geometry.setAttribute("normal", normalAttributes);

                  return {
                    ...formattedGeometry,
                    geometry,
                  };
                } else {
                  console.warn("No width and height configure");
                }
              }
              return geometry;
            });

            return attributesSet;
          }
          case MESH_TRANSFORM_TYPE.DEFAULT:
          default: {
            return formattedGeometries;
          }
        }
      } else {
        console.warn(
          `No transformed meshes - check tranform config ${transformedMeshIds}`
        );
      }
      return formattedGeometries;
    }
  );
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

const mergeAttributeConfigs = (
  defaultAttributeConfig: AttributeConfig[],
  parsedAttributeConfig: AttributeConfig[]
) =>
  mergeArraysWithoutDuplicates(parsedAttributeConfig, defaultAttributeConfig);
const TRANSFORM_SORTING = [
  MESH_TRANSFORM_TYPE.SET_UP_QUAD,
  MESH_TRANSFORM_TYPE.MORPH,
];

const formatTransforms = (
  meshTransforms: MeshTransformConfig[],
  assets: Asset[]
) => {
  // Sort transforms based on TRANSFORM_SORTING order
  const sortedTransforms = [...meshTransforms].sort((a, b) => {
    const indexA = TRANSFORM_SORTING.indexOf(a.type);
    const indexB = TRANSFORM_SORTING.indexOf(b.type);
    return indexA - indexB;
  });

  return sortedTransforms.map((transform) => {
    const { attributeConfigs } = transform;
    const formattedAttributeConfigs = getAttributeValuesFromAssets(
      attributeConfigs ?? [],
      assets
    );
    return { ...transform, attributeConfigs: formattedAttributeConfigs };
  });
};
