import { BufferAttribute, BufferGeometry } from "three";
import { getVerticesCount } from "../attribute.functions";
import { ATTRIBUTE_VALUE_TYPES } from "../../../material/shaders/build-shader/constants/shader.consts";
import { ParameterConfig } from "../../../../types";

export const setAttributes = (
  bufferGeometry: BufferGeometry,
  attributeConfigs: ParameterConfig[] = []
) => {
  const vertexCount = getVerticesCount(bufferGeometry);
  attributeConfigs.forEach(({ id, value, isAttribute, attributeConfig }) => {
    if (isAttribute && attributeConfig) {
      const { attributeValueType, attributeCount } = attributeConfig;
      const valueCount = attributeCount ?? vertexCount;
      switch (attributeValueType) {
        case ATTRIBUTE_VALUE_TYPES.INDEXED:
          setIndexValues(id, valueCount, bufferGeometry);
          break;
        case ATTRIBUTE_VALUE_TYPES.RANDOM_VALUE:
          setRandomValues(id, valueCount, bufferGeometry);
          break;
        case ATTRIBUTE_VALUE_TYPES.RANDOMIZED_BINARY:
          setRandomizedPercentage(
            id,
            valueCount,
            bufferGeometry,
            value as number
          );
          break;
      }
    }
  });

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
  const angles = new Float32Array(vertexCount);
  angles.forEach((_value, index) => {
    angles[index] = Math.random();
  });
  bufferGeometry.setAttribute(attributeId, new BufferAttribute(angles, 1));
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
