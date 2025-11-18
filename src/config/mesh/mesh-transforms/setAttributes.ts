import { BufferAttribute, BufferGeometry } from "three";
import { getVerticesCount } from "./attribute.functions";
import {
  ASSET_MAPPING_RELATIONSHIPS,
  ATTRIBUTE_VALUE_TYPES,
} from "../../material/shaders/schema";
import { TransformValueConfig } from "../../config.types";

export const setAttributes = (
  bufferGeometry: BufferGeometry,
  transformValues: Record<string, TransformValueConfig>
) => {
  const vertexCount = getVerticesCount(bufferGeometry);
  Object.entries(transformValues).forEach(
    ([key, { type, value, relationship }]) => {
      const attributeKey = `a_${key}`;
      if (type) {
        switch (type) {
          case ATTRIBUTE_VALUE_TYPES.INDEXED:
            setIndexValues(attributeKey, vertexCount, bufferGeometry);
            break;
          case ATTRIBUTE_VALUE_TYPES.RANDOM_VALUE:
            setRandomValues(attributeKey, vertexCount, bufferGeometry);
            break;
          case ATTRIBUTE_VALUE_TYPES.SINGLE_VALUE:
            setSingleValue(
              attributeKey,
              vertexCount,
              bufferGeometry,
              value as string,
              relationship
            );
            break;
          case ATTRIBUTE_VALUE_TYPES.RANDOMIZED_BINARY:
            setRandomizedPercentage(
              attributeKey,
              vertexCount,
              bufferGeometry,
              value as number
            );
            break;
        }
      }
    }
  );

  return bufferGeometry;
};

const setIndexValues = (
  attributeId: string,
  vertexCount: number,
  bufferGeometry: BufferGeometry
) => {
  const pointIds = new Float32Array(vertexCount);
  pointIds.forEach((_value, index) => {
    pointIds[index] = Number(index.toFixed(1));
  });
  bufferGeometry.setAttribute(attributeId, new BufferAttribute(pointIds, 1));
};

const setRandomValues = (
  attributeId: string,
  vertexCount: number,
  bufferGeometry: BufferGeometry
) => {
  const values = new Float32Array(vertexCount);
  values.forEach((_value, index) => {
    values[index] = Math.random();
  });
  bufferGeometry.setAttribute(attributeId, new BufferAttribute(values, 1));
};

const setRandomizedPercentage = (
  attributeId: string,
  vertexCount: number,
  bufferGeometry: BufferGeometry,
  value: number = 0.5
) => {
  const randomBool = new Float32Array(vertexCount);
  randomBool.forEach((_, index) => {
    randomBool[index] = Math.random() < value ? 1.0 : 0.0;
  });

  bufferGeometry.setAttribute(attributeId, new BufferAttribute(randomBool, 1));
};

const setSingleValue = (
  attributeId: string,
  vertexCount: number,
  bufferGeometry: BufferGeometry,
  value: any,
  relationship?: string
) => {
  if (relationship === ASSET_MAPPING_RELATIONSHIPS.VERTEX_POINT) {
    bufferGeometry.setAttribute(attributeId, new BufferAttribute(value, 3));
  } else if (relationship === ASSET_MAPPING_RELATIONSHIPS.NORMAL) {
    bufferGeometry.setAttribute(attributeId, new BufferAttribute(value, 3));
  } else {
    const array = new Float32Array(vertexCount);
    array.fill(value);
    bufferGeometry.setAttribute(attributeId, new BufferAttribute(array, 1));
  }
  // bufferGeometry.setAttribute(attributeId, value);
};
