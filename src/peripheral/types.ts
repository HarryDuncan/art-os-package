export type PeripheralInteractionType =
  | "mousePosition"
  | "mouseClick"
  | "keyStroke"
  | "scroll";

// --- Type-specific configs ---

export interface MousePositionConfig {
  coordinateSpace: "normalized" | "screen" | "element";
}

export interface MouseClickConfig {
  button: "left" | "right" | "middle";
  mode: "toggle" | "momentary";
}

export interface KeyStrokeConfig {
  key: string;
  mode: "toggle" | "momentary";
}

export interface ScrollConfig {
  target: "window" | "container";
  axis: "y" | "x" | "both";
  normalize: boolean;
  maxScroll?: number;
}

export type PeripheralInteractionConfig =
  | MousePositionConfig
  | MouseClickConfig
  | KeyStrokeConfig
  | ScrollConfig;

// --- Output definition ---

export type ShaderDataType =
  | "float"
  | "vec2"
  | "vec3"
  | "vec4"
  | "bool"
  | "int";

export interface PeripheralOutput {
  key: string;
  shaderType: ShaderDataType;
}

// --- Single interaction entry ---

export interface PeripheralInteraction {
  guid: string;
  title: string;
  description?: string;
  type: PeripheralInteractionType;
  config: PeripheralInteractionConfig;
  output: PeripheralOutput;
  enabled: boolean;
}
