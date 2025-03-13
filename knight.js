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
    if (moveX >= 0 && moveX <= 7 && moveY >= 0 && moveY <= 7) {
      adjacentMoves.push([moveX, moveY]);
    }
  }
  node.adjacentMoves = adjacentMoves;
}

const gameBoard = new Array(8);

function createNodes() {
  for (let x = 0; x < 8; x++) {
    let yCoordinate = new Array(8);
    for (let y = 0; y < 8; y++) {
      let node = new Node([x, y]);
      getAdjacentMoves(node);
      yCoordinate[y] = node;
    }
    gameBoard[x] = yCoordinate;
  }
}

createNodes();

console.log(gameBoard[0][0].coordinates);
printAdjacentMoves(gameBoard[0][0]);
console.log(gameBoard[1][2].coordinates);
printAdjacentMoves(gameBoard[1][2]);
console.log(gameBoard[2][1].coordinates);
printAdjacentMoves(gameBoard[2][1]);

function printAdjacentMoves(node) {
  let str = "[";
  for(let i = 0; i < node.adjacentMoves.length; i++) {
    str = str + `[${node.adjacentMoves[i]}]`;
    if(i != node.adjacentMoves.length - 1) {
      str = str + ", "
    }
    else {
      str = str + "]"
    }
  }
  console.log(str);
}

function knightMoves(start, end) {
  if(start == null) {
    return;
  }
  let currentpath = []
  let queue = [];
  queue.push(start);
  let ifFound = false;
  while(!ifFound) {
    let currentNode = queue.shift();
    currentPath.push(currentNode);
    for(let node of currentNode.adjacentMoves)
      if(node.coordinates[0] != end.coordinates[0] ||
        node.coordinates[1] != end.coordinates[1]
      ) {
        queue.push(node);
      }
      else {
        ifFound = true;
        currentPath.push(node);
      }
  }
}