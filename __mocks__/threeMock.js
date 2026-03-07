// Mock for three.js to prevent issues in tests
class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  distanceTo() {
    return 0;
  }
}

class Color {
  constructor() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }
  setHSL() {
    return this;
  }
}

class Object3D {
  constructor() {
    this.position = new Vector3();
    this.scale = new Vector3(1, 1, 1);
    this.matrix = {};
  }
  updateMatrix() {}
}

class BufferGeometry {
  constructor() {
    this.attributes = {
      position: { array: new Float32Array(0), needsUpdate: false },
      color: { array: new Float32Array(0), needsUpdate: false },
    };
  }
  setAttribute() {}
}

class BufferAttribute {
  constructor(array, itemSize) {
    this.array = array;
    this.itemSize = itemSize;
    this.needsUpdate = false;
  }
}

module.exports = {
  Vector3,
  Color,
  Object3D,
  BufferGeometry,
  BufferAttribute,
};
