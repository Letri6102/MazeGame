class Maze {
    constructor(x, y, w, h, title) {
      this.x = int(x);
      this.y = int(y);
      this.width = int(w);
      this.height = int(h);
      this.title = title;
      this.init();
      // this.stop = 100; 
    }
  
    init() {
      this.margin = 10;
      this.top = 100;
      this.data = [];
      this.columns = int(random(50) + 4);
      this.maxRecursion = 100;
      this.currentRecursion = 0;
  
      if (this.columns * 5 > this.width - this.margin * 2) this.columns = 5;
      this.cellSize = int((this.width - this.margin * 2) / this.columns);
      this.padding = this.cellSize * 0.12;
      this.margin = int((this.width - this.cellSize * this.columns) / 2);
      this.rows = int((this.height - this.top - this.margin) / this.cellSize);
      this.top = int(this.height - this.cellSize * this.rows - this.margin);
      this.count = 1;
      this.totalCells = this.rows * this.columns;
      this.stack = [];
      for (let r = 0; r < this.rows; r++) {
        this.data[r] = [];
        for (let c = 0; c < this.columns; c++) {
          this.data[r].push(new Cell(r, c, this.cellSize, this.cellSize, ''));
        }
      }
      // 1st row
      for (let c = 0; c < this.columns; c++) {
        this.data[0][c].around[Direction.TOP] = BorderType.BORDER;
      }
      // last row
      for (let c = 0; c < this.columns; c++) {
        this.data[this.rows - 1][c].around[Direction.BOTTOM] = BorderType.BORDER;
      }
      // 1st column
      for (let r = 0; r < this.rows; r++) {
        this.data[r][0].around[Direction.LEFT] = BorderType.BORDER;
      }
      // last column
      for (let r = 0; r < this.rows; r++) {
        this.data[r][this.columns - 1].around[Direction.RIGHT] =
          BorderType.BORDER;
      }
      this.data[0][0].type = CellType.START;
      this.data[this.rows - 1][this.columns - 1].type = CellType.EXIT;
      this.player = this.data[0][0];
    }
  
    generate() {
      console.log('generate');
      this.init();
  
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
          this.data[r][c].visited = false;
          if (this.data[r][c].top !== BorderType.BORDER)
            this.data[r][c].top = BorderType.WALL;
          if (this.data[r][c].right !== BorderType.BORDER)
            this.data[r][c].right = BorderType.WALL;
          if (this.data[r][c].bottom !== BorderType.BORDER)
            this.data[r][c].bottom = BorderType.WALL;
          if (this.data[r][c].left !== BorderType.BORDER)
            this.data[r][c].left = BorderType.WALL;
        }
      }
      this.show();
    }
  
    gerenateMoves() {
      // console.log('gerenateMoves');
      // return true;
      this.currentRecursion++;
      const newPosition = this.doRandomMove(this.player);
      if (newPosition) {
        this.player.visited = true;
        newPosition.visited = true;
        //   console.log('player', this.player);
        //   console.log('newPosition', newPosition);
        this.player.around[this.player.getDirection(newPosition)] =
          BorderType.NOWALL;
        newPosition.around[newPosition.getDirection(this.player)] =
          BorderType.NOWALL;
        this.player.type = CellType.PATH;
        this.drawPath(this.player, newPosition);
        this.stack.push(this.player);
        this.player = newPosition;
        this.count++;
        // return true;
        if (this.currentRecursion >= this.maxRecursion) {
          this.currentRecursion = 0;
          return true;
        } else {
          return this.gerenateMoves();
        }
      } else if (this.stack.length > 0) {
       // console.log('het duong');
        // pop stack
       // console.log('count', this.count, this.totalCells);
        if (this.count >= this.totalCells) {
          const hint = 'Enter để bắt đầu tìm lối ra!';
          fill('blue');
          textSize(20);
          text(hint, this.x + this.width / 2 - textWidth(hint) / 2, this.y + 75);
          return false;
        }
        const oldPosition = this.player;
        this.player = this.stack.pop();
        this.drawPath(oldPosition, this.player);
  
        return this.gerenateMoves();
      }
      const hint = 'Enter để bắt đầu tìm lối ra!';  
      fill('blue');
      textSize(20);
      text(hint, this.x + this.width / 2 - textWidth(hint) / 2, this.y + 75);
      return false;
    }
  
    startFindPath() {
      this.currentRecursion = 0;
      this.drawPlayer(this.player, true);
      this.data[0][0].type = CellType.START;
      this.data[this.rows - 1][this.columns - 1].type = CellType.EXIT;
      this.player = this.data[0][0];
      this.player.direction = Direction.RIGHT;
      this.player.type = CellType.SOLUTION;
    }
  
    findPath() {
      this.drawPlayer(this.player, true);
      if (this.player.type !== CellType.EXIT) {
        this.player.type = CellType.SOLUTION;
        if (
          this.player.around[(this.player.direction + 1) % 4] ===
          BorderType.NOWALL
        ) {
          const newPosition = this.data[
            this.player.row +
              (this.player.direction === Direction.RIGHT
                ? 1
                : this.player.direction === Direction.LEFT
                ? -1
                : 0)
          ][
            this.player.column +
              (this.player.direction === Direction.TOP
                ? 1
                : this.player.direction === Direction.BOTTOM
                ? -1
                : 0)
          ];
          this.player.direction = (this.player.direction + 1) % 4;
          newPosition.direction = this.player.direction;
          //Màu đường đi: Đánh dấu đường đi
          this.drawSolutionPath(
            this.player,
            newPosition.type === CellType.SOLUTION ? 'SaddleBrown' : 'AliceBlue',
            newPosition.type === CellType.SOLUTION ? -1 : this.player.direction
          );
          this.player = newPosition;
          this.drawPlayer(this.player, false);
          return true;
        } else {
          this.player.direction = this.player.direction - 1;
          if (this.player.direction === -1) this.player.direction = 3;
          this.drawPlayer(this.player, false);
          return this.findPath();
        }
      }
      this.drawPlayer(this.player, false);
      return false;
    }
  
    drawPath(from, to) {
      // console.log('drawPath', from, to);
      const direction = from.getDirection(to);
      let xOffset = 0;
      let yOffset = 0;
      let w = this.cellSize - this.padding * 2;
      let h = this.cellSize - this.padding * 2;
      if (direction === Direction.TOP) {
        yOffset = -this.padding * 2 - 1;
        h += this.padding * 2 + 1;
      } else if (direction === Direction.RIGHT) {
        w += this.padding * 2 + 1;
      } else if (direction === Direction.BOTTOM) {
        h += this.padding * 2 + 1;
      } else if (direction === Direction.LEFT) {
        xOffset = -this.padding * 2 - 1;
        w += this.padding * 2 + 1;
      }
      fill('blue');
      noStroke();
      // strokeWeight(2);
      rect(
        this.x +
          this.margin +
          this.padding +
          from.column * this.cellSize +
          xOffset,
        this.y + this.top + this.padding + from.row * this.cellSize + yOffset,
        w,
        h
      );
      rect(
        this.x + this.margin + this.padding + to.column * this.cellSize,
        this.y + this.top + this.padding + to.row * this.cellSize,
        this.cellSize - this.padding * 2,
        this.cellSize - this.padding * 2
      );
  
      this.drawPlayer(to, false);
    }
  
    drawPlayer(player, clean) {
      if (clean) fill('grey');
      else fill('red');
      // strokeWeight(2);
      noStroke();
      // ellipseMode(CORNER);
      ellipse(
        this.x + this.margin + player.column * this.cellSize + this.cellSize / 2,
        this.y + this.top + player.row * this.cellSize + this.cellSize / 2,
        this.cellSize - this.padding * 4 + (clean ? 1 : 0),
        this.cellSize - this.padding * 4 + (clean ? 1 : 0)
      );
    }
  
    // Vẽ đường đi
    drawSolutionPath(player, color, direction) {
      fill(color);
      noStroke();
      ellipse(
        this.x + this.margin + player.column * this.cellSize + this.cellSize / 2,
        this.y + this.top + player.row * this.cellSize + this.cellSize / 2,
        this.cellSize - this.padding * 4,
        this.cellSize - this.padding * 4
      );
      if (direction > -1) {
        const dir =
          direction === Direction.TOP
            ? '↑'
            : direction === Direction.RIGHT
            ? '→'
            : direction === Direction.BOTTOM
            ? '↓'
            : direction === Direction.LEFT
            ? '←'
            : '';
        fill('Black');
        textSize(this.cellSize / 2 - this.padding);
        text(
          dir,
          this.x +
            this.margin +
            player.column * this.cellSize +
            this.cellSize / 2 -
            textWidth(dir) / 2,
          this.y +
            +this.top +
            player.row * this.cellSize +
            this.cellSize / 2 +
            this.cellSize / 4 -
            this.padding * 1.2
        );
      }
    }
  
    doRandomMove(player) {
      const moves = [];
      for (let i = 0; i < player.around.length; i++) {
        if (player.around[i] === BorderType.WALL) {
          if (i === Direction.TOP && player.row > 0) {
            if (!this.data[player.row - 1][player.column].visited) {
              moves.push(i);
            }
          } else if (i === Direction.RIGHT && player.column < this.columns - 1) {
            if (!this.data[player.row][player.column + 1].visited) {
              moves.push(i);
            }
          } else if (i === Direction.BOTTOM && player.row < this.rows - 1) {
            if (!this.data[player.row + 1][player.column].visited) {
              moves.push(i);
            }
          } else if (i === Direction.LEFT && player.column > 0) {
            if (!this.data[player.row][player.column - 1].visited) {
              moves.push(i);
            }
          }
        }
      }
      const r = int(random(moves.length));
      if (moves[r] === Direction.TOP) {
        return this.data[player.row - 1][player.column];
      } else if (moves[r] === Direction.RIGHT) {
        return this.data[player.row][player.column + 1];
      } else if (moves[r] === Direction.BOTTOM) {
        return this.data[player.row + 1][player.column];
      } else if (moves[r] === Direction.LEFT) {
        return this.data[player.row][player.column - 1];
      }
      return null;
    }
  
    show() {
      console.log('show');
      fill('WhiteSmoke');
      rect(this.x, this.y, this.width, this.height);
      fill('blue');
      textSize(38);
      text(
        this.title,
        this.x + this.width / 2 - textWidth(this.title) / 2,
        this.y + 50
      );
  
      fill('black');
      rect(
        this.x + this.margin - 2,
        this.y + this.top - 2,
        this.columns * this.cellSize + 4,
        this.rows * this.cellSize + 4
      );
      noStroke();
      // strokeWeight(1);
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
          // https://www.w3schools.com/colors/colors_names.asp
          fill('Aqua');
          rect(
            this.x + this.margin + c * this.cellSize,
            this.y + this.top + r * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }
  