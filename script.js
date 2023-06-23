const Gameboard = (() => {
    let _board = [['1','2','3'],['4','5','6'],['7','8','9']];
    const getBoard = () => {
        return _board;
    };
    const resetBoard = () => {
        _board = [['1','2','3'],['4','5','6'],['7','8','9']]; 
    };
    const setBoardVal = (i, j, val)  => {
        _board[i,j] = val
    };
    
})();