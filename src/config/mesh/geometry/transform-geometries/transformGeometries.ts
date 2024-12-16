import { BufferAttribute } from "three";
import { getGeometryAttributes } from "../../attributes/attribute.functions";
import { MESH_TRANSFORM } from "../../mesh.consts";
import { MeshTransformConfig } from "../../../config.types";
import { FormattedGeometry } from "assets/geometry/geometry.types";
import { setAttributes } from "../../attributes/set-attributes/setAttributes";
import { DEFAULT_MORPH_ATTRIBUTE_CONFIG } from "./transform.constants";
import { mergeArraysWithoutDuplicates } from "utils/mergeArraysWithoutDuplicates";
import { AttributeConfig } from "config/material/shaders/build-shader/types";

export const transformGeometry = (
  meshTransforms: MeshTransformConfig[] | undefined,
  formattedGeometries: FormattedGeometry[]
): FormattedGeometry[] => {
  if (!meshTransforms || !meshTransforms.length) return formattedGeometries;

  meshTransforms.forEach(({ type, transformedMeshIds, attributeConfig }) => {
    const transformedMeshes = getTransformedMeshes(
      formattedGeometries,
      transformedMeshIds
    );
    if (transformedMeshes.length) {
      switch (type) {
        case MESH_TRANSFORM.MORPH: {
          transformedMeshes.forEach((morphTarget, index) => {
            if (index !== 0) {
              const { vertices } = getGeometryAttributes(morphTarget.geometry);

              transformedMeshes[0].geometry.setAttribute(
                `morphPosition${index - 1}`,
                new BufferAttribute(vertices, 3)
              );

              transformedMeshes[0].geometry.setAttribute(
                `morphNormal${index - 1}`,
                new BufferAttribute(vertices, 3)
              );
            }
          });
          const morphAttributeConfig = mergeAttributeConfigs(
            DEFAULT_MORPH_ATTRIBUTE_CONFIG,
            attributeConfig ?? []
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
        case MESH_TRANSFORM.CUSTOM_ATTRIBUTES: {
          const attributesSet = transformedMeshes.map((formattedGeometry) => {
            const { geometry } = formattedGeometry;
            const setAttributeGeometry = setAttributes(
              geometry,
              attributeConfig
            );
            return { ...formattedGeometry, geometry: setAttributeGeometry };
          });
          return attributesSet;
        }
        case MESH_TRANSFORM.PRE_DEFINED: {
          const attributesSet = transformedMeshes.flatMap(({ geometry }) => {
            attributeConfig?.forEach((config) => {
              if (config.value) {
                // @ts-ignore
                geometry.setAttribute(config.id, config.value);
              }
            });
            return geometry;
          });
          return attributesSet;
        }
        case MESH_TRANSFORM.DEFAULT:
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
  });
  return formattedGeometries;
};

const getTransformedMeshes = (
  formattedGeometries: FormattedGeometry[],
  transformedMeshIds: string[]
) =>
  formattedGeometries
    .filter((geometry) => transformedMeshIds.includes(geometry.name ?? ""))
    .sort((a, b) => {
      const indexA = transformedMeshIds.indexOf(a.name ?? "");
      const indexB = transformedMeshIds.indexOf(b.name ?? "");
      return indexA - indexB;
    });

const mergeAttributeConfigs = (
  defaultAttributeConfig: AttributeConfig[],
  parsedAttributeConfig: AttributeConfig[]
) =>
  mergeArraysWithoutDuplicates(parsedAttributeConfig, defaultAttributeConfig);
