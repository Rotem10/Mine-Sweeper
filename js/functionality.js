'use strict';

function cellClicked(elCell, ev, i, j) {
    // Called when a cell (td) is clicked
    if (!gGame.isOn) return
    if (ev.button !== 0) return
    if (gBoard[i][j].isMarked) return

    if (gGame.isFirstClick) firstClick(i, j)

    if (gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true
        elCell.innerText = `${MINE}`;
        elCell.className += ' mine'
    }
    expandShown(i, j)
    checkGameOver(i, j)
};

function cellMarked(elCell, ev, i, j) {
    // Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
    if (!gGame.isOn) return
    if (ev.button !== 2) return
    if (gBoard[i][j].isShown) return
    if (!gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = true;
        gGame.markedCount++;
        elCell.innerText = `${FLAG}`;
    } else {
        gBoard[i][j].isMarked = false;
        elCell.innerText = ''
    }
    if (gGame.isFirstClick) {
        firstClick(i, j)
    }
    checkGameOver(i, j)
};

function checkGameOver(i, j) {
    // Game ends when all mines are marked, and all the other cells are shown
    if (gBoard[i][j].isMine) {
        gLevel.mines--;
        gGame.livesCounter--;
        if (!gBoard[i][j].isMarked) {
            document.getElementById(`${i},${j}`).style = 'background-color:  #e81224;';
            document.querySelector('.restart').innerText = '🤯';
            if (gGame.livesCounter === 2) document.querySelector('.livesCounter').innerText = `${LIVE}${LIVE}`
            if (gGame.livesCounter === 1) document.querySelector('.livesCounter').innerText = `${LIVE}`
            if (gLevel.mines === 0 || gGame.livesCounter === 0) {
                document.querySelector('.livesCounter').innerText = `Game Over`
                for (var rowIdx = 0; rowIdx < gBoard.length; rowIdx++) {
                    for (var colIdx = 0; colIdx < gBoard[0].length; colIdx++) {
                        if (gBoard[rowIdx][colIdx].isMine && !gBoard[rowIdx][colIdx].isShown) {
                            document.getElementById(`${rowIdx},${colIdx}`).innerText = `${MINE}`
                            document.querySelector('.restart').innerText = '🤯';
                        }
                    }
                }
                gGame.isOn = false
                clearInterval(gIntervalId)
            }
        }
    } else {
        if (gGame.totalCount === 0)
            for (var rowIdx = 0; rowIdx < gBoard.length; rowIdx++) {
                for (var colIdx = 0; colIdx < gBoard[0].length; colIdx++) {
                    if (gBoard[rowIdx][colIdx].minesAroundCount >= 0) {
                        gGame.totalCount++;
                    }
                }
            }
        if (gGame.totalCount === gGame.shownCount) {
            gGame.isOn = false
            clearInterval(gIntervalId)
            document.querySelector('.livesCounter').innerText = `Victory`
            document.querySelector('.restart').innerText = '😎';
        }
    }

};

function expandShown(i, j) {
    // When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
    // NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
    // BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
    if (gBoard[i][j].isMarked) return
    var elCell = document.getElementById(`${i},${j}`);
    if (gBoard[i][j].isEmpty) {
        gBoard[i][j].isShown = true;
        gGame.shownCount++
            elCell.className += ' empty'
        for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
            if (rowIdx < 0 || rowIdx > gBoard.length - 1) continue;
            for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
                if (colIdx < 0 || colIdx > gBoard[0].length - 1) continue;
                if (rowIdx === i && colIdx === j) continue;
                var currNieghbor = gBoard[rowIdx][colIdx]
                if (!currNieghbor.isShown && !currNieghbor.isMine && !currNieghbor.isMarked) {
                    if (currNieghbor.isEmpty) {
                        expandShown(rowIdx, colIdx);
                    } else {
                        gBoard[rowIdx][colIdx].isShown = true;
                        gGame.shownCount++
                            var elNeighbor = document.getElementById(`${rowIdx},${colIdx}`);
                        elNeighbor.innerText = gBoard[rowIdx][colIdx].minesAroundCount;
                    }
                }
            }
        }
    } else {
        if (!gBoard[i][j].isMine) {
            gBoard[i][j].isShown = true;
            gGame.shownCount++;
            elCell.innerText = gBoard[i][j].minesAroundCount;
        }
    }
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

function firstClick(i, j) {
    if (gGame.secsPassed === 0) {
        startTimer()
    }
    if (!gBoard[i][j].isMarked) {
        gBoard[i][j].isEmpty = true;
        gBoard[i][j].isShown = true;
        gGame.shownCount++;
        placeMines();
        setMinesNegsCount();
        for (var rowIdx = 0; rowIdx < gBoard.length; rowIdx++) {
            for (var colIdx = 0; colIdx < gBoard[0].length; colIdx++) {
                if (gBoard[rowIdx][colIdx].minesAroundCount === 0 && !gBoard[rowIdx][colIdx].isMine) {
                    gBoard[rowIdx][colIdx].isEmpty = true;
                }
            }
        }
        gGame.isFirstClick = false;
    }
    expandShown(i, j)
};