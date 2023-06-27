const Player = (sign) => {
    const getSign = () => sign;

    return { getSign }
};

const gameBoard = (() =>{
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        board[index] = sign;
    }

    const getField = (index) => {
        return board[index];
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return { setField, getField, resetBoard };
})();

