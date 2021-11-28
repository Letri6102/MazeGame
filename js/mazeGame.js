let maze;
let solving = false;

function setup() {
  createCanvas(windowWidth -20, windowHeight -20);
  frameRate(30);
  maze = new Maze(
    0,
    0,
    windowWidth - 20,
    windowHeight - 20,
    'Trò chơi mê cung - TÌM ĐƯỜNG'
  );
  maze.generate();
}

//Drawing the maze
function draw() {
  if (!solving && !maze.gerenateMoves()) {
    console.log('DONE');
    noLoop();
  } else if (solving) {
    if (!maze.findPath()) {
      console.log('Solved');
      noLoop();
    }
  }
}

//Key Events for the game
function keyPressed() {
  if (keyCode === ENTER) {
    solving = true;
    maze.startFindPath();
    // frameRate(10);
    loop();
  }
}

// function mouseClicked() {
//   if (!solving) {
//     solving = true;
//     maze.startFindPath();
//     // frameRate(10);
//     loop();
//   }
// }


// function keyPressed() {
//   if (key === 'g') {
//     maze.generate();
//     loop();
//   }
// }