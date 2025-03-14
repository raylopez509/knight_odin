class Node {
  constructor(coordinates = [0, 0]) {
    this.coordinates = coordinates;
    this.adjacentMoves = [];
    this.path = [];
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

//  

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

function doesArrayContainNode(array, node) {
  let x = node.coordinates[0];
  let y = node.coordinates[1];
  for(arrayNode of array) {
    if(arrayNode.coordinates[0] === x && arrayNode.coordinates[1] === y) {
      return true;
    }
  }
  return false;
}

function knightMoves(start, end) {
  startNode = gameBoard[start[0]][start[1]];
  let currentPath = []
  startNode.path = [startNode];
  let queue = [];
  let nodesWithAddedPaths = [];
  queue.push(startNode);
  let ifFound = false;
  while(!ifFound) {
    let currentNode = queue.shift();
    console.log(`currentnode: [${currentNode.coordinates[0]},${currentNode.coordinates[1]}]`)
    currentPath = currentNode.path;
    console.log("currentpath:")
    for(let path of currentPath) {
      console.log(`[${path.coordinates[0]},${path.coordinates[1]}]`);
    }

    // currentPath.push(currentNode);
    for(let nodeCoordinates of currentNode.adjacentMoves) {
      let node = gameBoard[nodeCoordinates[0]][nodeCoordinates[1]];
      if(!doesArrayContainNode(nodesWithAddedPaths, node)) {
        for(let pathNode of currentPath) {
          node.path.push(pathNode);
        }
        node.path.push(node);
        nodesWithAddedPaths.push(node);
      }
      if(node.coordinates[0] != end[0] ||
        node.coordinates[1] != end[1]
      ) {
        if(!doesArrayContainNode(currentPath, node)) {
          queue.push(node);
        }
      }
      else {
        ifFound = true;
        currentPath = node.path;
      }
    }
  }
  return currentPath;
}

function printMoves(array) {
  let str = '[';
  let i = 0;
  for(let node of array) {
    str = str + `[${node.coordinates}]`;
    if(i != array.length - 1) {
      str = str + ","
    }
    else {
      str = str + "]"
    }
    i++;
  }
  console.log(str);
}

printMoves(knightMoves([0,0],[7,7]));

