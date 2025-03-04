// script.js
let board = document.getElementById("board");
let status = document.getElementById("status");
let gameContainer = document.getElementById("game-container");
let winnerScreen = document.getElementById("winner-screen");
let winnerMessage = document.getElementById("winner-message");
let playerXInput = document.getElementById("playerX");
let playerOInput = document.getElementById("playerO");
let playerX = "X", playerO = "O";
let currentPlayer;
let gameBoard;

function startGame() {
    playerX = playerXInput.value || "X";
    playerO = playerOInput.value || "O";
    currentPlayer = "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    createBoard();
    gameContainer.style.display = "block";
    winnerScreen.style.display = "none";
}

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.textContent = value;
        cell.addEventListener("click", makeMove);
        board.appendChild(cell);
    });
}

function makeMove(event) {
    let index = event.target.dataset.index;
    if (gameBoard[index] === "") {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add("taken");
        if (checkWinner()) {
            let winnerName = currentPlayer === "X" ? playerX : playerO;
            showWinnerScreen(`🎉 Congratulations ${winnerName}! You win! 🎉`);
            return;
        }
        if (!gameBoard.includes("")) {
            showWinnerScreen("🤝 It's a Draw! 🤝");
            return;
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function showWinnerScreen(message) {
    winnerMessage.innerHTML = message;
    gameContainer.style.display = "none";
    winnerScreen.style.display = "flex";
}

function restartGame() {
    startGame();
}
