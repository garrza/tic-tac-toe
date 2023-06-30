const Player = (sign) => {
    const getSign = () => sign;

    return { getSign };
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        board[index] = sign;
    };

    const getField = (index) => {
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setField, getField, reset };
})();

const displayGame = (() => {
    const spaces = document.querySelectorAll(".space");
    const resetButton = document.getElementById("reset");
    const info = document.getElementById("info");

    spaces.forEach((space) =>
        space.addEventListener("click", (e) => {
            if (gameFlow.getIsOver() || e.target.textContent !== "") return;
            gameFlow.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    );


    resetButton.addEventListener("click", (e) => {
        gameBoard.reset();
        gameFlow.reset();
        updateGameboard();
        setMessageElement("Player X's turn")
    });

    const updateGameboard = () => {
        for (let i = 0; i < spaces.length; i++) {
            spaces[i].textContent = gameBoard.getField(i);
            spaces[i].textContent === "X"
                ? spaces[i].setAttribute("style", "color:blue")
                : spaces[i].setAttribute("style", "color:red");
        }
    };

    const setResultMessage = (winner) => {
        if (winner === "Draw") {
            setMessageElement("It's a draw!");
        } else {
            setMessageElement(`Player ${winner} wins!`);
        }
    };

    const setMessageElement = (message) => {
        info.textContent = message;
    };

    return { setResultMessage, setMessageElement };
})();

const gameFlow = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, currentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayGame.setResultMessage(currentPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9) {
            displayGame.setResultMessage("Draw");
            isOver = true;
            return;
        }
        round++;
        displayGame.setMessageElement(`Player ${currentPlayerSign()}'s turn`);
    };

    const currentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => gameBoard.getField(index) === currentPlayerSign()
                )
            );
    };

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    return { playRound, getIsOver, reset };
})();
