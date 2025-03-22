import { Group, ShapeGeometry, MeshBasicMaterial, Mesh } from "three";

export const loadSvg = async (url: string): Promise<Group> => {
  const { SVGLoader } = await import("three/examples/jsm/loaders/SVGLoader.js");

  return new Promise((resolve, reject) => {
    const loader = new SVGLoader();
    loader.load(
      url,
      (svgData) => {
        const paths = svgData.paths;
        const group = new Group();
        paths.forEach((path) => {
          const shapes = path.toShapes(true);
          shapes.forEach((shape) => {
            const geometry = new ShapeGeometry(shape);
            const material = new MeshBasicMaterial({ color: path.color });
            const mesh = new Mesh(geometry, material);
            group.add(mesh);
          });
        });
        resolve(group);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
};
