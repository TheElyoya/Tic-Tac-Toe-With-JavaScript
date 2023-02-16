let allCells = document.querySelectorAll("[data-cell]");
const CLASS_X = "x";
const CLASS_CIRCLE = "circle";
let circleTurn;
let board = document.getElementById("board");
let winningText = document.querySelector("[data-winning-message]");
let messageDiv = document.getElementById("winning-message");
let restartButton = document.getElementById("restartButton");
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
allCells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});
addHoverToBoard();
function handleClick(e) {
  let cell = e.target;
  let currentMark = circleTurn ? CLASS_CIRCLE : CLASS_X;

  //add mark
  addMark(cell, currentMark);
  //check for win
  if (checkForWin(currentMark)) {
    endGame(false);
    //check for draw
  } else if (isDraw()) {
    endGame(true);
  }

  //swipe turns
  swipTurns();
  //add hover class to board
  addHoverToBoard();
}

function addMark(cell, currentMark) {
  cell.classList.add(currentMark);
}

function swipTurns() {
  circleTurn = !circleTurn;
}

function addHoverToBoard() {
  board.classList.remove(CLASS_CIRCLE);
  board.classList.remove(CLASS_X);
  if (circleTurn) {
    board.classList.add(CLASS_CIRCLE);
  } else {
    board.classList.add(CLASS_X);
  }
}

function checkForWin(currentMark) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return allCells[index].classList.contains(currentMark);
    });
  });
}
function endGame(draw) {
  if (draw) {
    winningText.innerHTML = "Draw !";
    messageDiv.classList.add("show");
  } else {
    winningText.innerHTML = `${circleTurn ? "O's" : "X's"} Wins ! `;
    messageDiv.classList.add("show");
  }
}

function isDraw() {
  return [...allCells].every((cell) => {
    return (
      cell.classList.contains(CLASS_CIRCLE) || cell.classList.contains(CLASS_X)
    );
  });
}

restartButton.onclick = function () {
  messageDiv.classList.remove("show");
  allCells.forEach((cell) => {
    cell.classList.remove(CLASS_CIRCLE);
    cell.classList.remove(CLASS_X);
    cell.addEventListener("click", handleClick, { once: true });
  });
};
