import { useContext, useCallback } from "react";
import { SceneContext } from "../context/context";

export const useProcessStatus = () => {
  const {
    dispatch,
    state: { status },
  } = useContext(SceneContext);

  const setStatus = useCallback(
    (status: string) => {
      dispatch({ type: "UPDATE_STATUS", payload: { status } });
    },
    [dispatch]
  );

  return { status, setStatus };
};
