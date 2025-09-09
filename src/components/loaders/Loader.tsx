import { useSceneContext } from "../../context/context";
import { PROCESS_STATUS } from "../../consts/consts";
import { ReactNode, useEffect, useRef, useState } from "react";

interface LoaderProps {
  loaderComponent?: ReactNode;
  loaderMinTime?: number;
}

export const Loader = ({
  loaderComponent,
  loaderMinTime = 1500,
}: LoaderProps) => {
  const { sceneStatus } = useSceneContext();

  const startTime = useRef<number>(Date.now());
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  useEffect(() => {
    const elapsedTime = Date.now() - startTime.current;
    const remainingTime = loaderMinTime - elapsedTime;
    if (remainingTime > 0) {
      const timer = setTimeout(() => setShouldRender(true), remainingTime);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [loaderMinTime]);

  if (sceneStatus === PROCESS_STATUS.RUNNING) return null;
  if (loaderComponent) {
    return <>{loaderComponent}</>;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="50"
        height="50"
        fill="none"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="62.83185307179586"
          strokeDashoffset="0"
          strokeLinecap="round"
          fill="none"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="251.32741228718345"
            dur="2s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};
