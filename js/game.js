'use strict';

const MINE = '*'
const FLAG = '#'

var gGame;

var gBoard;

var gLevel;

var gIntervalId;

function initGame() {
    // This is called when page loads
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isFirstClick: true
    };
    setLevel();
};

function setLevel(elButton) {
    if (!gLevel || elButton.className === 'beginner') {
        gLevel = {
            size: 4,
            mines: 2
        };
    } else if (elButton.className === 'medium') {
        gLevel = {
            size: 8,
            mines: 12
        };
    } else if (elButton.className === 'expert') {
        gLevel = {
            size: 12,
            mines: 30
        };
    };
    gBoard = buildBoard();
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
            };
        };
    };
    placeMines(board);
    setMinesNegsCount(board);
    return board;
};

function placeMines(board) {
    var minesPos = createMinesPos();
    for (var i = 0; i < minesPos.length; i++) {
        var currPos = minesPos[i];
        board[currPos.i][currPos.j].isMine = true;
    };
    return board;
};

function createMinesPos() {
    var mines = [];
    for (var i = 0; i < gLevel.mines; i++) {
        var randPos = getRandPos();
        mines.push(randPos);
    };
    return mines;
};

function getRandPos() {
    var randPos = {
        i: getRandomIntInclusive(0, gLevel.size - 1),
        j: getRandomIntInclusive(0, gLevel.size - 1)
    };
    return randPos;
};

function setMinesNegsCount(board) {
    // Count mines around each cell and set the cell's minesAroundCount.
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
                if (rowIdx < 0 || rowIdx > board.length - 1) continue;
                for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
                    if (colIdx < 0 || colIdx > board[0].length - 1) continue;
                    if (rowIdx === i && colIdx === j) continue;
                    var currCellContent = board[rowIdx][colIdx].isMine;
                    if (currCellContent) board[i][j].minesAroundCount++;
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
            strHTML += `\t<td onclick="cellClicked(this,${i},${j})" onmousedown="cellMarked(this,event,${i},${j})" oncontextmenu="return false;"
            class="cell" id="${tdId}" >\n \t</td>\n`;
        };
        strHTML += `</tr>\n`;
    };
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
};