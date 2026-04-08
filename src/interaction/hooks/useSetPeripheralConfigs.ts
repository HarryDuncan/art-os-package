import { useEffect } from "react";
import { PeripheralConfig } from "../../config/config.types";
import { useSceneContext } from "../../context/context";

export const useSetPeripheralConfigs = (
  peripheralConfigs: PeripheralConfig[] | undefined,
) => {
  const { setPeripheralConfigs } = useSceneContext();
  useEffect(() => {
    if (peripheralConfigs && peripheralConfigs.length > 0) {
      setPeripheralConfigs(peripheralConfigs);
    }
  }, [peripheralConfigs, setPeripheralConfigs]);
};
