import { MeshConfig } from "../../../types/config.types";

export type AdvancedMeshConfig = MeshConfig & {
  id: string;
  assetId: string;
};
