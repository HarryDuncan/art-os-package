import { useEffect, useState } from "react";
import { SceneConfig } from "./config.types";
import { useAssetLocation } from "../compat/asset-location/useAssetLocation";

export const useFetchConfig = (filePath: string | null) => {
  const [data, setData] = useState<SceneConfig[] | null>(null);
  const configuredData = useAssetLocation(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data && filePath?.length) {
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error("Failed to fetch JSON file");
          }
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (filePath) {
      fetchData();
    }
  }, [filePath, data, setData]);
  return configuredData;
};
