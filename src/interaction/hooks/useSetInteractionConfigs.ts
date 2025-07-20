import { useEffect } from "react";
import { InteractionConfig } from "../types";
import { useSceneContext } from "../../context/context";

export const useSetInteractionConfigs = (
  interactionConfigs: InteractionConfig[]
) => {
  const { setInteractionConfigs } = useSceneContext();
  useEffect(() => {
    setInteractionConfigs(interactionConfigs);
  }, [interactionConfigs, setInteractionConfigs]);
};
