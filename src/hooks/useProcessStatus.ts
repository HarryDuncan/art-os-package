import { useCallback } from "react";
import { useSceneContext } from "../context/context";

export const useProcessStatus = () => {
  const {
    dispatch,
    state: { status },
  } = useSceneContext();

  const setStatus = useCallback(
    (status: string) => {
      dispatch({ type: "UPDATE_STATUS", payload: { status } });
    },
    [dispatch]
  );

  return { status, setStatus };
};
