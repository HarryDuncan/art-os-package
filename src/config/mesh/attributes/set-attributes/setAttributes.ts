import { BufferAttribute, BufferGeometry } from "three";
import { getVerticesCount } from "../attribute.functions";
import {
  AttributeConfig,
  AttributeValueConfig,
} from "config/material/shaders/build-shader/types";

const RANDOM_ATTRIBUTE_IDS = ["randomAngle", "random", "pointType"];
const INDEX_ATTRIBUTE_IDS = ["pointIndex", "index"];
const RANDOMIZED_ATTRIBUTE_IDS = ["pointDisplay", "signDirection"];

export const setAttributes = (
  bufferGeometry: BufferGeometry,
  attributeConfig: AttributeConfig[] = []
) => {
  const vertexCount = getVerticesCount(bufferGeometry);
  attributeConfig.forEach(({ id, valueConfig, attributeCount }) => {
    const valueCount = attributeCount ?? vertexCount;
    if (checkIds(id, RANDOM_ATTRIBUTE_IDS)) {
      setRandomValues(id, valueCount, bufferGeometry);
    } else if (checkIds(id, INDEX_ATTRIBUTE_IDS)) {
      setIndexValues(id, valueCount, bufferGeometry);
    } else if (checkIds(id, RANDOMIZED_ATTRIBUTE_IDS)) {
      setRandomizedPercentage(id, valueCount, bufferGeometry, valueConfig);
    }
  });
  return bufferGeometry;
};

const checkIds = (id: string, allowedIds: string[]) =>
  allowedIds.some((allowedId) => id.indexOf(allowedId) !== -1);

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
  valueConfig?: AttributeValueConfig
) => {
  const { randomizedPercentage } = valueConfig ?? {
    randomizedPercentage: 0.5,
  };
  const randomBool = new Float32Array(vertexCount);
  randomBool.forEach((_value, index) => {
    randomBool[index] = Math.random() < randomizedPercentage ? 1.0 : 0.0;
  });
  bufferGeometry.setAttribute(attributeId, new BufferAttribute(randomBool, 1));
};
