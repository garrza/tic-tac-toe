const Player = (sign) => {
    const getSign = () => sign;

    return { getSign }
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        board[index] = sign;
    }

    const getField = (index) => {
        return board[index];
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return { setField, getField, reset };
})();

const displayGame = (() => {
    const spaces = document.querySelectorAll(".space");
    const reset = document.getElementById("reset");

    spaces.forEach((space) =>
        space.addEventListener("click", (e) => {
            if (gameController.getIsOver() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    );

    reset.addEventListener("click", (e) => {
        gameBoard.reset();
        gameController.reset();
        updateGameboard();
    })

    const updateGameboard = () => {
        for (let i = 0; i < spaces.length; i++) {
            spaces[i].textContent = gameBoard.getField(i);
        }
    }

})();

