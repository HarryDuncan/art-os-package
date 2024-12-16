export class MockBufferGeometry {
  attributes: any;

  constructor() {
    this.attributes = {
      position: {
        array: [],
        itemSize: 3, // Change this according to your use case
      },
    };
  }

  // Add methods you need for your tests
  // For example, a method to add vertices:
  addVertex(x, y, z) {
    const positionArray = this.attributes.position.array;
    positionArray.push(x, y, z);
  }

  // Other methods that your code may use with BufferGeometry
}
