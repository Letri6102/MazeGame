const WALL = 1;
const BORDER = 2;
const NOWALL = 3;

class BorderType {
  constructor() {}

  static get WALL() {
    return WALL;
  }

  static get BORDER() {
    return BORDER;
  }

  static get NOWALL() {
    return NOWALL;
  }
}