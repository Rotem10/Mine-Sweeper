'use strict';

function cellClicked(elCell, i, j) {
    // Called when a cell (td) is clicked
    var cell = gBoard[i][j];
    cell.isShown = true;
    var minesCount = cell.minesAroundCount;
    var presented = ''
    if (!cell.isMine && minesCount > 0) {
        var presented = minesCount;
    } else if (cell.isMine) presented = MINE;

    elCell.innerText = `${presented}`;
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