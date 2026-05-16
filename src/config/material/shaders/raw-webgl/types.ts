export type RawWebglUniformValue =
  | number
  | number[]
  | Float32Array
  | Int32Array;

export type RawWebglUniform = {
  value: RawWebglUniformValue;
};

export type RawWebglUniformObject = Record<string, RawWebglUniform>;

export type RawWebglTextureRelationship = "texture" | "video" | "video_stream";

export type RawWebglTextureBinding = {
  uniformId: string;
  assetId: string;
  relationship: RawWebglTextureRelationship;
};

export type RawWebglBlending = {
  blendSrc: number;
  blendDst: number;
  transparent: boolean;
  depthTest: boolean;
};

export type RawWebglShaderMaterial = {
  guid: string;
  vertexShader: string;
  fragmentShader: string;
  uniforms: RawWebglUniformObject;
  textureBindings: RawWebglTextureBinding[];
  blending: RawWebglBlending;
};
