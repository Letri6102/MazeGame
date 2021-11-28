const START = 1;
const EXIT = 2;
const EMPTY = 3;
const PATH = 4;
const VISITED_PATH = 5;
const SOLUTION = 6;

class CellType {
  constructor() {}

  static get START() {
    return START;
  }

  static get EXIT() {
    return EXIT;
  }

  static get EMPTY() {
    return EMPTY;
  }

  static get PATH() {
    return PATH;
  }

  static get VISITED_PATH() {
    return VISITED_PATH;
  }

  static get SOLUTION() {
    return SOLUTION;
  }
}