/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { BufferAttribute } from "three";
import { getGeometryAttributes } from "../../attributes/attribute.functions";
import { MeshTransformConfig } from "../../../config.types";
import { FormattedGeometry } from "../../../../assets/geometry/geometry.types";
import { setAttributes } from "../../attributes/set-attributes/setAttributes";
import { mergeArraysWithoutDuplicates } from "../../../../utils/mergeArraysWithoutDuplicates";
import { AttributeConfig } from "../../../../config/material/shaders/build-shader/types";
import { MESH_TRANSFORM } from "../../../../consts/mesh.consts";
import { DEFAULT_MORPH_ATTRIBUTE_CONFIG } from "../../../../consts/meshTransforms.consts";

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
        case MESH_TRANSFORM.SET_UP_QUAD: {
          const attributesSet = transformedMeshes.map((formattedGeometry) => {
            const { geometry } = formattedGeometry;

            const width = attributeConfig.find(({ id }) => id === "width");
            const height = attributeConfig.find(({ id }) => id === "height");
            const pointDisplay = attributeConfig.find(
              ({ id }) => id === "pointDisplay"
            );
            if (width?.value && height.value) {
              const vertexesNumber = Number(width.value) * Number(height.value);
              const indices = new Uint16Array(vertexesNumber);
              const offsets = new Float32Array(vertexesNumber);
              const normals = new Float32Array(vertexesNumber * 3);
              for (let i = 0, j = 0; i < vertexesNumber; i += 1) {
                const x = i % Number(width.value);
                const y = Math.floor(i / Number(height.value));
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
              const attributeSetGeometry = setAttributes(geometry, [
                pointDisplay,
              ]);
              return { ...formattedGeometry, geometry: attributeSetGeometry };
            } else {
              console.warn("No width and height configure");
            }
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
