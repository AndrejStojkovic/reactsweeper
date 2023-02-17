import React, { useState, useEffect } from 'react';
import { config, Difficulty, colors } from '../lib/config';
import { randomIntFromInterval } from '../lib/functions';
import mine from '../media/mine.png';
import { Cell } from './Cell';

type BoardProps = {
  difficulty: string,
  gameState: boolean,
  StartGame: () => void,
  EndGame: () => void
}

const Board = ({difficulty, gameState, StartGame, EndGame} : BoardProps)  => {
  const cfg = config[difficulty as Difficulty];
  const [board, setBoard] = useState<Cell[][]>();
  const [openedCells, setOpenedCells] = useState(0);

  useEffect(() => {
    let newBoard: Cell[][] = [];

    for(var s = 0; s < cfg.width; s++) {
      newBoard.push([]);
    }

    // Create the board
    for(var i = 0; i < cfg.width; i++) {
      for(var j = 0; j < cfg.height; j++) {
        newBoard[i][j] = {
          isOpened: false,
          type: 'empty',
          value: 0,
          flagged: false,
          exploded: false
        };
      }
    }

    // Add mines to the board
    let bombCounter = cfg.mines;
    while(bombCounter) {
      let x: number = randomIntFromInterval(0, cfg.width - 1);
      let y: number = randomIntFromInterval(0, cfg.height - 1);
      newBoard[x][y] = {
        isOpened: false,
        type: 'mine',
        value: -1,
        flagged: false,
        exploded: false
      };
      bombCounter--;
    }

    // Count the mines around each cell and set the value
    // eslint-disable-next-line
    for(var i = 0; i < cfg.width; i++) {
      // eslint-disable-next-line
      for(var j = 0; j < cfg.height; j++) {
        if(newBoard[i][j].type !== 'mine') {
          newBoard[i][j] = {
            isOpened: false,
            type: 'empty',
            value: countMines(newBoard, i, j, cfg.width, cfg.height),
            flagged: false,
            exploded: false
          };
        }
      }
    }

    setBoard(newBoard);
    setOpenedCells(0);
  }, [cfg]);

  const OpenCell = (x: number, y: number) => {
    if(!board) return;

    if(!gameState && openedCells > 0) return;

    if(!gameState) StartGame();

    if(!isValid(x, y, cfg.width, cfg.height)) return;

    if(board[x][y].isOpened || board[x][y].flagged) return;

    let newBoard = board;
    newBoard[x][y].isOpened = true;
    
    if(newBoard[x][y].type === 'mine') {
      newBoard[x][y].exploded = true;
      RevealBombs();
      // TO-DO: Mark the bomb with a red background
      EndGame();
    }

    if(newBoard[x][y].type === 'empty' && !newBoard[x][y].value) {
      Flood(x, y);
    }

    setOpenedCells(openedCells + 1);
    setBoard(newBoard.slice(0));  // .slice(0) forces the array to re-render or .map in this case
  }

  const Flood = (x: number, y: number) => {
    OpenCell(x - 1, y);
    OpenCell(x + 1, y);
    OpenCell(x, y - 1);
    OpenCell(x, y + 1);
  }

  const RevealBombs = () => {
    for(let i = 0; i < cfg.width; i++) {
      for(let j = 0; j < cfg.height; j++) {
        if(board && board[i][j].type === 'mine') {
          board[i][j].isOpened = true;
        }
      }
    }
  }

  // TO-DO: Create this function
  const FlagCell = () => {

  }

  return (
    <div>Board <br />
      <div>
        {cfg.width} - {cfg.height} - {cfg.mines}
        <div className='board flex flex-col border-1 border-gray-600'>
          {board?.map((cells, i) => {
            return (
              <div key={i} className='row flex flex-row'>
                {cells.map((subCells, j) => {
                  return (
                    subCells.isOpened ? (
                      <div key={j} className={`flex items-center justify-center w-6 h-6 bg-gray-100 text-sm font-semibold bg-cover ${subCells.exploded ? 'bg-exploded-cell' : 'bg-opened-cell'}`}>
                        <span style={{color: subCells.value > 0 ? `#${colors[subCells.value - 1]}` : 'black'}} className='font-bold'>
                          {subCells.type === 'mine' ?
                            <img className='w-4 h-4' src={mine} alt='M' /> : subCells.value > 0 ? subCells.value : ' '}
                        </span>
                      </div>
                    ) : (
                      <div key={j} className={`flex items-center justify-center w-6 h-6 bg-gray-50 text-sm font-semibold ${gameState || !openedCells ? 'cursor-pointer' : 'cursor-default'} hover:bg-gray-200 bg-unopened-cell bg-cover`}
                        onClick={() => OpenCell(i, j)}>
                      </div>
                    )
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function countMines(board: Cell[][], i: number, j: number, width: number, height: number) {
  let ct = 0;
  for(var x = i - 1; x <= i + 1; x++) {
    for(var y = j - 1; y <= j + 1; y++) {
      if(isValid(x, y, width, height) && board[x][y].type === 'mine') {
        ct++;
      }
    }
  }
  return ct;
}

function isValid(i: number, j: number, width: number, height: number) {
  return i >= 0 && i < width && j >= 0 && j < height;
}

export default Board;