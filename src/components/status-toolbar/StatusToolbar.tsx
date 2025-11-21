import React, { useState, useEffect } from "react";
import { useSceneContext } from "../../context/context";
import { Mesh, Material, ShaderMaterial } from "three";

interface StatusToolbarProps {
  isVisible: boolean;
}

interface SceneData {
  runtime: string;
  meshCount: number;
  materialCount: number;
  meshes: Array<{
    name: string;
    type: string;
    visible: boolean;
  }>;
  materials: Array<{
    name: string;
    type: string;
    uniforms: Array<{
      name: string;
      type: string;
      value: unknown;
    }>;
  }>;
}

export const StatusToolbar: React.FC<StatusToolbarProps> = ({ isVisible }) => {
  const { initializedScene } = useSceneContext();

  const [sceneData, setSceneData] = useState<SceneData>({
    runtime: "00:00:00",
    meshCount: 0,
    materialCount: 0,
    meshes: [],
    materials: [],
  });

  useEffect(() => {
    if (!initializedScene.current || !isVisible) return;
    //  console.log("StatusToolbar initializedScene", initializedScene.current);
    const updateSceneData = () => {
      if (!initializedScene.current) return;
      // Calculate runtime
      const elapsed = initializedScene.current.clock.getElapsedTime();
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = Math.floor(elapsed % 60);
      const runtime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      // Get meshes
      const meshes: Array<{ name: string; type: string; visible: boolean }> =
        [];
      const materials: Array<{
        name: string;
        type: string;
        uniforms: Array<{ name: string; type: string; value: unknown }>;
      }> = [];
      const materialSet = new Set<string>();

      initializedScene.current.traverse((object) => {
        if (object.type === "Mesh") {
          const mesh = object as Mesh;
          meshes.push({
            name: mesh.name || "Unnamed Mesh",
            type: mesh.type,
            visible: mesh.visible,
          });

          // Get materials from mesh
          if (mesh.material) {
            const materialArray = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            materialArray.forEach((material: Material) => {
              if (material && !materialSet.has(material.uuid)) {
                materialSet.add(material.uuid);

                // Extract uniforms from material
                const uniforms: Array<{
                  name: string;
                  type: string;
                  value: unknown;
                }> = [];

                // Check if material has uniforms (ShaderMaterial or custom material)
                const materialWithUniforms = material as ShaderMaterial;
                if (materialWithUniforms.uniforms) {
                  Object.entries(materialWithUniforms.uniforms).forEach(
                    ([name, uniform]) => {
                      if (
                        uniform &&
                        typeof uniform === "object" &&
                        "value" in uniform
                      ) {
                        uniforms.push({
                          name,
                          type: typeof uniform.value,
                          value: uniform.value,
                        });
                      }
                    }
                  );
                }

                materials.push({
                  name: material.name || "Unnamed Material",
                  type: material.type,
                  uniforms,
                });
              }
            });
          }
        }
      });

      setSceneData({
        runtime,
        meshCount: meshes.length,
        materialCount: materials.length,
        meshes,
        materials,
      });
    };

    // Update immediately
    updateSceneData();

    // Update every second
    const interval = setInterval(updateSceneData, 1000);

    return () => clearInterval(interval);
  }, [initializedScene, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        width: "300px",
        maxHeight: "80vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "monospace",
        fontSize: "12px",
        overflowY: "auto",
        zIndex: 1000,
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          marginBottom: "16px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          paddingBottom: "8px",
        }}
      >
        <h3
          style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "bold" }}
        >
          Scene Status
        </h3>
        <div>Runtime: {sceneData.runtime}</div>
        <div>Meshes: {sceneData.meshCount}</div>
        <div>Materials: {sceneData.materialCount}</div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: "bold" }}
        >
          Meshes ({sceneData.meshCount})
        </h4>
        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
          {sceneData.meshes.map((mesh, index) => (
            <div
              key={index}
              style={{
                padding: "4px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                opacity: mesh.visible ? 1 : 0.5,
              }}
            >
              <div style={{ fontWeight: "bold" }}>{mesh.name}</div>
              <div
                style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.7)" }}
              >
                Type: {mesh.type} | Visible: {mesh.visible ? "Yes" : "No"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4
          style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: "bold" }}
        >
          Materials ({sceneData.materialCount})
        </h4>
        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
          {sceneData.materials.map((material, index) => (
            <div
              key={index}
              style={{
                padding: "4px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{material.name}</div>
              <div
                style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.7)" }}
              >
                Type: {material.type}
              </div>
              {material.uniforms.length > 0 && (
                <div style={{ marginTop: "4px" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: "2px",
                    }}
                  >
                    Uniforms ({material.uniforms.length}):
                  </div>
                  {material.uniforms.map((uniform, uniformIndex) => (
                    <div
                      key={uniformIndex}
                      style={{
                        fontSize: "10px",
                        color: "rgba(255, 255, 255, 0.8)",
                        marginLeft: "8px",
                        padding: "1px 0",
                      }}
                    >
                      {uniform.name}: {String(uniform.value).substring(0, 50)}
                      {String(uniform.value).length > 50 ? "..." : ""}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
