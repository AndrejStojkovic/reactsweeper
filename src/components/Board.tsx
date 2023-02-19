import React, { useState, useEffect } from 'react';
import { config, Difficulty, colors } from '../lib/config';
import { randomIntFromInterval, isValid } from '../lib/functions';
import mine from '../media/mine.png';
import flag from '../media/flag.png';
import { Cell } from './Cell';

type BoardProps = {
  difficulty: string,
  gameState: boolean,
  Flags: number,
  SetState: (val: number) => void,
  StartGame: () => void,
  EndGame: () => void,
  SetFlags: (val: number) => void
}

const Board = ({difficulty, gameState, StartGame, EndGame, Flags, SetFlags, SetState} : BoardProps)  => {
  const cfg = config[difficulty as Difficulty];
  const [board, setBoard] = useState<Cell[][]>();
  const [openedCells, setOpenedCells] = useState(0);

  const Reset = () => {
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
          exploded: false,
          visited: false
        };
      }
    }

    // Add mines to the board
    let bombCounter = cfg.mines;
    while(bombCounter) {
      let x: number = randomIntFromInterval(0, cfg.width - 1);
      let y: number = randomIntFromInterval(0, cfg.height - 1);
      
      while(newBoard[x][y].type === 'mine') {
        x = randomIntFromInterval(0, cfg.width - 1);
        y = randomIntFromInterval(0, cfg.height - 1);
      }

      newBoard[x][y] = {
        isOpened: false,
        type: 'mine',
        value: -1,
        flagged: false,
        exploded: false,
        visited: false
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
            exploded: false,
            visited: false
          };
        }
      }
    }

    SetFlags(cfg.mines);
    SetState(0);
    setBoard(newBoard);
    setOpenedCells(0);
  }

  useEffect(() => {
    Reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg]);

  const OpenCell = (x: number, y: number) => {
    if(!board) return;

    if(!gameState && openedCells > 0) return;

    if(!gameState) StartGame();

    if(!isValid(x, y, cfg.width, cfg.height)) return;

    if(board[x][y].visited || board[x][y].flagged) return;

    board[x][y].isOpened = true;
    board[x][y].visited = true;
    
    if(board[x][y].type === 'mine') {
      board[x][y].exploded = true;
      RevealBombs();
      SetState(-1);
      EndGame();
    }

    if(board[x][y].type === 'empty' && !board[x][y].value) {
      Flood(x, y);
    }

    setOpenedCells(countOpenCells(board, cfg.width, cfg.height));
    setBoard(board.slice(0));  // .slice(0) forces the array to re-render or .map in this case

    if(countOpenCells(board, cfg.width, cfg.height) === (cfg.width * cfg.height) - cfg.mines && Flags >= 0) {
      SetState(1);
      EndGame();
    }
  }

  const Flood = (x: number, y: number) => {
    if(!board) return;

    for(let i = x - 1; i <= x + 1; i++) {
      for(let j = y - 1; j <= y + 1; j++) {
        if(i === x && j === y) continue;
        if(!isValid(i, j, cfg.width, cfg.height)) continue;

        OpenCell(i, j);
        board[i][j].flagged = false;
      }
    }
  }

  const RevealBombs = () => {
    if(!board) return;

    for(let i = 0; i < cfg.width; i++) {
      for(let j = 0; j < cfg.height; j++) {
        if(board[i][j].type === 'mine' && !board[i][j].flagged) {
          board[i][j].isOpened = true;
        }
      }
    }
  }

  const FlagCell = (x: number, y: number) => {
    if(!gameState) return;

    if(!board) return;    

    if(!isValid(x, y, cfg.width, cfg.height)) return;

    if(board[x][y].isOpened) return;

    board[x][y].flagged = !board[x][y].flagged;

    setBoard(board.slice(0));

    let currentFlags = 0;
    for(let i = 0; i < cfg.width; i++) {
      for(let j = 0; j < cfg.height; j++) {
        currentFlags += board[i][j].flagged ? 1 : 0;
      }
    }
    
    SetFlags(cfg.mines - currentFlags);
  }

  return (
    <div>
      <div>
        <div className='board flex flex-col select-none border-2 border-minesweeper'>
          {board?.map((cells, i) => {
            return (
              <div key={i} className='row flex flex-row'>
                {cells.map((subCells, j) => {
                  return (
                    subCells.isOpened ? (
                      <div key={j} className={`flex items-center justify-center w-6 h-6 bg-gray-100 text-xs font-game bg-cover ${subCells.exploded ? 'bg-exploded-cell' : 'bg-opened-cell'}`}>
                        <span style={{color: subCells.value > 0 ? `#${colors[subCells.value - 1]}` : 'black'}} className={`font-bold ${subCells.value > 0 ? 'mt-[1px]' : ''}`}>
                          {subCells.type === 'mine' ?
                            <img className='w-4 h-4' src={mine} alt='M' /> : subCells.value > 0 ? subCells.value : ' '}
                        </span>
                      </div>
                    ) : (
                      <div key={j} className={`flex items-center justify-center w-6 h-6 bg-gray-50 text-sm font-semibold ${!gameState ? 'cursor-default' : 'cursor-pointer'} hover:bg-gray-200 bg-unopened-cell bg-cover`}
                        onClick={() => OpenCell(i, j)} onContextMenu={() => FlagCell(i, j)}>
                        {subCells.flagged && <img src={flag} className='w-5 h-5' alt='F' />}
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
  for(let x = i - 1; x <= i + 1; x++) {
    for(let y = j - 1; y <= j + 1; y++) {
      ct += isValid(x, y, width, height) && board[x][y].type === 'mine' ? 1 : 0;
    }
  }
  return ct;
}

function countOpenCells(board: Cell[][], width: number, height: number) {
  let ct = 0;
  for(let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++) {
      ct += isValid(i, j, width, height) && board[i][j].isOpened ? 1 : 0;
    }
  }
  return ct;
}

export default Board;