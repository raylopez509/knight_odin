class Node {
  constructor(coordinates = [0, 0]) {
    this.coordinates = coordinates;
    this.adjacentMoves = [];
  }
}

function getAdjacentMoves(node) {
  let moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  let adjacentMoves = [];
  for (let i = 0; i < moves.length; i++) {
    let moveX = node.coordinates[0] + moves[i][0];
    let moveY = node.coordinates[1] + moves[i][1];
    if (moveX > 0 && moveX < 7 && moveY > 0 && moveY < 7) {
      adjacentMoves.push([moveX, moveY]);
    }
  }
  node.adjacentMoves = adjacentMoves;
}

let test = [3, 4];
let num = [-2, -1];

console.log(test[0] + num[0]);

let node = new Node([0, 0]);
getAdjacentMoves(node);

console.log(node.adjacentMoves);

function createNodes() {
  let gameBoard = new Array(8);
  for (let x = 0; x < 8; x++) {
    let yCoordinate = new Array(8);
    for (let y = 0; y < 8; y++) {
      let node = new Node([x, y]);
      yCoordinate[y] = node;
    }
    gameBoard[x] = yCoordinate;
  }
}

createNodes();
