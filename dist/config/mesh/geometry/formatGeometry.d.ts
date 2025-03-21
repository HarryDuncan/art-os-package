import { Asset } from "../../../assets/asset.types";
import { FormattedGeometry, GeometryConfig } from "../../../assets/geometry/geometry.types";
import { MeshComponentConfig } from "../../config.types";
export declare const formatGeometry: (loadedAssets: Asset[], meshComponentConfigs: MeshComponentConfig[]) => FormattedGeometry[];
export declare const configureGeometry: (geometry: BufferGeometry, geometryConfig?: GeometryConfig) => any;
