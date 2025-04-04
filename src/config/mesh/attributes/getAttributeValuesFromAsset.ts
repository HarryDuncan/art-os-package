import { Asset, ASSET_TYPES } from "../../../types";
import { AttributeConfig } from "../../material/shaders/build-shader/types";
import { BufferAttribute } from "three";

export const getAttributeValuesFromAssets = (
  attributeConfig: AttributeConfig[],
  assets: Asset[]
) =>
  attributeConfig.map((config) => {
    if (config.assetId) {
      const selectedAsset = assets.find((asset) => asset.id === config.assetId);
      switch (selectedAsset?.assetType) {
        case ASSET_TYPES.VIDEO:
          return getVideoAttributeValues(selectedAsset, config);
        case ASSET_TYPES.TEXTURE:
          return getTextureAttributeValues(selectedAsset, config);

        default:
      }
      if (selectedAsset) {
      }
    }
    return config;
  });

const getVideoAttributeValues = (
  selectedAsset: Asset,
  config: AttributeConfig
) => {
  return config;
};

const getTextureAttributeValues = (
  selectedAsset: Asset,
  config: AttributeConfig
) => {
  const texture = selectedAsset.data;
  // @ts-ignore
  const { width, height } = texture.source.data;
  const numPoints = width * height;
  let originalColors;
  const threshold = 0;
  // @ts-ignore
  const img = texture.image;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let numVisible = 0;
  canvas.width = width;
  canvas.height = height;
  if (ctx) {
    ctx.scale(1, 1);
    ctx.drawImage(img, 0, 0, width, height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    originalColors = Float32Array.from(imgData.data);
    for (let i = 0; i < numPoints; i += 1) {
      if (originalColors[i * 4] > threshold) numVisible += 1;
    }
  }

  const indices = new Uint16Array(numVisible);
  const offsets = new Float32Array(numVisible * 3);
  const angles = new Float32Array(numVisible);

  for (let i = 0, j = 0; i < numVisible; i += 1) {
    if (originalColors && originalColors[i * 4] > threshold) {
      const x = i % width;
      const y = Math.floor(i / height);
      offsets[j * 3 + 0] = x;
      offsets[j * 3 + 1] = y;
      offsets[j * 3 + 2] = 0;
      indices[j] = i;
      angles[j] = Math.random() * Math.PI;
      j += 1;
    }
  }
  if (config.id === "position") {
    return {
      ...config,
      value: new BufferAttribute(offsets, 3),
    };
  }
  if (config.id === "pointOffset") {
    return {
      ...config,
      value: new BufferAttribute(offsets, 3),
    };
  }
  if (config.id === "pointIndex") {
    return {
      ...config,
      value: new BufferAttribute(indices, 1),
    };
  }
  return {
    ...config,
    attributeCount: numPoints,
  };
};

//     geometry.setAttribute(
//       "pindex",
//       new InstancedBufferAttribute(indices, 1, false)
//     );
//     geometry.setAttribute(
//       "offset",
//       new InstancedBufferAttribute(offsets, 3, false)
//     );
//     geometry.setAttribute(
//       "angle",
//       new InstancedBufferAttribute(angles, 1, false)
//     );

// }
