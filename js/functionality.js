'use strict';

function cellClicked(elCell, i, j) {
    // Called when a cell (td) is clicked
    gGame.isOn = true;
    if (gGame.isFirstClick) {
        startTimer();
        gGame.isFirstClick = false;
    }
    var cell = gBoard[i][j];
    cell.isShown = true;
    var minesCount = cell.minesAroundCount;
    var presented = ''
    if (!cell.isMine && minesCount > 0) {
        var presented = minesCount;
    } else if (cell.isMine) presented = MINE;

    elCell.innerText = `${presented}`;
    expandShown(gBoard, elCell, i, j);
};

function cellMarked(elCell, ev, i, j) {
    // Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
    gGame.isOn = true;
    if (gGame.isFirstClick) {
        startTimer();
        gGame.isFirstClick = false;
    }
    if (!elCell.innerText) {
        if (ev.button === 2) {
            if (!gBoard[i][j].isMarked) {
                gBoard[i][j].isMarked = true;
                elCell.innerText = `${FLAG}`;
            };
        };
    } else if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false;
        elCell.innerText = '';
    };
};

function checkGameOver() {
    // Game ends when all mines are marked, and all the other cells are shown

};

function expandShown(board, elCell, i, j) {
    // When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
    // NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
    // BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)

    var cell = board[i][j];
    if (cell.minesAroundCount === 0 && !cell.isMine) elCell.style = 'background-color: rgb(85, 193, 255);';

    //not finish
    // if (cell.minesAroundCount === 0 && !cell.isMine) {
    //     cell.isShown = true;
    //     console.log(cell);
    //     for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
    //         if (rowIdx < 0 || rowIdx > board.length - 1) continue;
    //         for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
    //             if (colIdx < 0 || colIdx > board[0].length - 1) continue;
    //             if (rowIdx === i && colIdx === j) continue;
    //             board[rowIdx][colIdx].isShown = true;
    //             document.getElementById(`${rowIdx, colIdx}`)
    //             console.log(document.getElementById(`${rowIdx, colIdx}`));
    //             elCell.style = 'background-color: rgb(85, 193, 255);';
    //             if (elCell.innerText) elCell.innerText = board[rowIdx][colIdx].minesAroundCount
    //         };
    //     };
    // };
};

function startTimer() {
    gIntervalId = setInterval(function() {
        gGame.secsPassed++;
        if (gGame.secsPassed < 10) gGame.secsPassed = '00' + gGame.secsPassed;
        if (gGame.secsPassed >= 10 && gGame.secsPassed < 100) gGame.secsPassed = '0' + gGame.secsPassed;
        document.querySelector('.timer').innerText = gGame.secsPassed;
        if (gGame.secsPassed === 999) clearInterval(gIntervalId);
    }, 1000);
};