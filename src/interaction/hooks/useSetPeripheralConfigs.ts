import { useEffect } from "react";
import { PeripheralConfig } from "../../config/config.types";
import { useSceneContext } from "../../context/context";

export const useSetPeripheralConfigs = (
  peripheralConfigs: PeripheralConfig[],
) => {
  const { setPeripheralConfigs } = useSceneContext();
  useEffect(() => {
    setPeripheralConfigs(peripheralConfigs);
  }, [peripheralConfigs, setPeripheralConfigs]);
};
