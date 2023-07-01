const Player = (sign) => {
    const getSign = () => sign;

    return { getSign };
};

const gameAudio = (() => {
    let buttonSound = new Audio("./sound/button.mp3");

    let checks = [
        new Audio("./sound/key1.mp3"),
        new Audio("./sound/key2.mp3"),
        new Audio("./sound/key3.mp3"),
        new Audio("./sound/key4.mp3")
    ];

    let winSounds = [
        new Audio("./sound/1.wav"),
        new Audio("./sound/2.wav"),
        new Audio("./sound/3.wav"),
        new Audio("./sound/4.wav"),
        new Audio("./sound/5.wav"),
        new Audio("./sound/6.wav"),
        new Audio("./sound/7.wav")
    ];

    const button = () => {
        buttonSound.play();
    };

    const check = () => {
        let i = Math.floor(Math.random() * checks.length);
        checks[i].currentTime = 0;
        checks[i].play();
    };

    const victory = () => {
        let i = Math.floor(Math.random() * winSounds.length);
        winSounds[i].currentTime = 0;
        winSounds[i].play();
    }
    return { button, check, victory };
})();


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
            gameAudio.check();
        })
    );


    resetButton.addEventListener("click", (e) => {
        gameAudio.button();
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
            gameAudio.victory();
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
