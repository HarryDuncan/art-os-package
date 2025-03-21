import { Material } from "three";
import { FormattedGeometry, MeshConfig } from "../../../assets/geometry/geometry.types";
import { MeshComponentConfig } from "../../config.types";
export declare const addMaterials: (formattedGeometries: FormattedGeometry[], materials: Material[], meshComponentConfigs: MeshComponentConfig[]) => MeshConfig[];
