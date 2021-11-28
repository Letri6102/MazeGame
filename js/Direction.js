const STAY = -1;
const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

class Direction {
  constructor() {}

  static get STAY() {
    return STAY;
  }

  static get TOP() {
    return TOP;
  }

  static get RIGHT() {
    return RIGHT;
  }

  static get BOTTOM() {
    return BOTTOM;
  }

  static get LEFT() {
    return LEFT;
  }
}