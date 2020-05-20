'use strict';

const MINE = '*';

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

var gBoard;

var gLevel = {
    size: 4,
    mines: 2
};

function initGame() {
    // This is called when page loads
    gBoard = buildBoard();
    console.table(gBoard);
    renderBoard(gBoard);
};

function buildBoard() {
    // Builds the board Set mines at random locations Call setMinesNegsCount() Return the created board
    var size = gLevel.size;
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                gameElement: ''
            };
            if (i === 1 && j === 0 || i === 2 && j === 2) {
                board[i][j].isMine = true;
                board[i][j].gameElement = MINE;
            };
        };
    };
    setMinesNegsCount(board);
    return board;
};

function setMinesNegsCount(board) {
    // Count mines around each cell and set the cell's minesAroundCount.
    // var minesCount = board[rowIdx][colIdx].minesAroundCount
    // console.log(board[rowIdx][colIdx].minesAroundCount);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
                if (rowIdx < 0 || rowIdx > board.length - 1) continue;
                for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
                    if (colIdx < 0 || colIdx > board[0].length - 1) continue;
                    if (rowIdx === i && colIdx === j) continue;
                    var currCellContent = board[rowIdx][colIdx].gameElement;
                    if (currCellContent === '*') board[i][j].minesAroundCount++;
                };
            };
        };
    };
    return board;
};

function renderBoard(board) {
    // Render the board as a <table> to the page
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < board[0].length; j++) {
            var tdId = [i, j];

            strHTML += `\t<td onclick="cellClicked(this,${i},${j})" class="cell" id="${tdId}" >\n \t</td>\n`;
        };
        strHTML += `</tr>\n`;
    };
    // console.log('strHTML is:');
    // console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
};

function cellClicked(elCell, i, j) {
    // Called when a cell (td) is clicked
    var cell = gBoard[i][j];
    // console.log(cell)
    cell.isShown = true;
    var minesCount = cell.minesAroundCount;
    var presentedCount = '';
    if (minesCount > 0) presentedCount = minesCount;
    elCell.innerText = `${cell.gameElement} ${presentedCount}`;
};

function cellMarked(elCell) {
    // Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
};

function checkGameOver() {
    // Game ends when all mines are marked, and all the other cells are shown
};

function expandShown(board, elCell, i, j) {
    // When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
    // NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
    // BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
};