class Cell {
  constructor(row, column, w, h, display) {
    this.row = row;
    this.column = column;
    this.width = int(w);
    this.height = int(h);
    this.display = display;
    this.visited = false;

    this.around = [
      BorderType.WALL,
      BorderType.WALL,
      BorderType.WALL,
      BorderType.WALL
    ];

    this.type = CellType.EMPTY;
    this.direction = Direction.RIGHT;
  }

  getDirection(cell) {
    if (!cell || (this.row === cell.row && this.column == cell.column)) {
      return Direction.STAY;
    }
    if (this.row === cell.row) {
      if (this.column < cell.column) return Direction.RIGHT;
      return Direction.LEFT;
    } else if (this.column === cell.column) {
      if (this.row < cell.row) return Direction.BOTTOM;
      return Direction.TOP;
    }
  }

  draw() {}
}