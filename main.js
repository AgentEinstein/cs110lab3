//issues: AI not included yet, you can make moves even after the game ends (it'll be locked to the winning player's turn)
document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll('.row > div');
    const message = document.querySelector('h2 > .display_player');
    const showScore = document.querySelector('h2 > .display_score');
    const newGameButton = document.querySelector('.new_game');
    const resetButton = document.querySelector('.reset');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let score = { 'X': 0, 'O': 0 };
    let gameActive = true;

    updateScore();
    updateMessage("It's your turn, Player X.")
    

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                updateMessage(`${currentPlayer} Wins!`);
                score[currentPlayer]++;
                updateScore();
                gameActive = false;
                return true;
            }
        }
        if (!board.includes('')) {
            updateMessage('It\'s a tie!');
            gameActive = false;
            return true;
        }
        return false;
    }

    function squareClicked(index) {
        if (board[index] !== '' || !gameActive) {
            return;
        }
        board[index] = currentPlayer;
        squares[index].querySelector('.xo').innerText = currentPlayer; 
        squares[index].classList.add('clicked'); 
        if (checkWin()) {
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateMessage(`It's your turn, Player ${currentPlayer}.`);
        if(currentPlayer == 'O'){
            setTimeout(ai, 1000);
        }
        
    }

    function updateScore() {
        showScore.innerText = "X: " + score.X + " O: " + score.O;
    }

    function updateMessage(msg) {
        message.innerText = msg;
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        squares.forEach(square => square.innerText = '');
        squares.forEach(square => square.innerHTML = '<span class="xo"></span>');
        squares.forEach(square => square.classList.remove('clicked'));
        gameActive = true;
        currentPlayer = 'X';
        updateMessage(`It's your turn, Player X.`);
    }

    squares.forEach((square, index) => {
        square.addEventListener('click', () => squareClicked(index));
    });

    newGameButton.addEventListener('click', resetGame);
    resetButton.addEventListener('click', () => {
        score = { 'X': 0, 'O': 0 };
        updateScore();
        resetGame();
    });

    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    
    function ai(){
        let chosen = getRandomInt(8) + 1;
        while(squares[chosen].innerText != ''){
            chosen = getRandomInt(8) + 1;
        }
        squareClicked(chosen);
    }
    

    
    
    
    
    
});

