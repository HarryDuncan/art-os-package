export type InterNodeMap = {
  itemId: string;
  nodeType: string;
  type?: string;
  // Mainly used for graph re-mapping
  parentId: string;
  parentType: string;
};

export interface OutputMap extends InterNodeMap {
  sourceType: string;
  sourceKey: string;
  sourceId: string;
}

export interface InputMap extends InterNodeMap {
  targetType: string;
  targetKey: string;
  targetId: string;
}
