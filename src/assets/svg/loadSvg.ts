export const LoadSvg = async (path: string) =>
  new Promise(async (resolve: (value: string) => void) => {
    const { SVGLoader } = await import(
      "three/examples/jsm/loaders/SVGLoader.js"
    );
    const loader = new SVGLoader();
    loader.load(path, (_data) => {
      // todo - svg loader - waiting until i need to do it
      resolve("");
    });
  });
