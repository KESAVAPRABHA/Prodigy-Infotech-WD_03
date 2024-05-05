// Initialize game state
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let playerXPoints = 0;
let playerOPoints = 0;

// Get all cell elements
const cells = document.querySelectorAll('.cell');

// Function to check for a win
function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
    return winConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

// Function to check for a draw
function checkDraw() {
    return board.every(cell => cell !== '');
}

// Function to make AI move
function makeAIMove() {
    // Generate a random move
    let index;
    do {
        index = Math.floor(Math.random() * 9); // Generate random index between 0 and 8
    } while (board[index] !== ''); // Keep generating until an empty cell is found

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    // Check for win or draw
    if (checkWin(currentPlayer)) {
        if (currentPlayer === 'X') {
            playerXPoints++;
            document.getElementById('playerXPoints').textContent = playerXPoints;
        } else {
            playerOPoints++;
            document.getElementById('playerOPoints').textContent = playerOPoints;
        }
        setTimeout(() => {
            alert(`${currentPlayer === 'X' ? 'Player X' : 'Player O'} wins!`);
            resetGame();
        }, 100);
    } else if (checkDraw()) {
        setTimeout(() => {
            alert("It's a draw!");
            resetGame();
        }, 100);
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.id.slice(4); // Extract cell index from cell id
        if (board[index] === '') {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            // Add class based on currentPlayer
            cell.classList.add(currentPlayer.toLowerCase());
            
            // Check for win or draw
            if (checkWin(currentPlayer) || checkDraw()) {
                if (currentPlayer === 'X') {
                    playerXPoints++;
                    document.getElementById('playerXPoints').textContent = playerXPoints;
                } else {
                    playerOPoints++;
                    document.getElementById('playerOPoints').textContent = playerOPoints;
                }
                setTimeout(() => {
                    alert(`${currentPlayer === 'X' ? 'Player X' : 'Player O'} wins!`);
                    resetGame();
                }, 100);
            } else {
                // Switch player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                // If AI's turn, make AI move after a short delay
                if (currentPlayer === 'O') {
                    setTimeout(makeAIMove, 500);
                }
            }
        }
    });
});

