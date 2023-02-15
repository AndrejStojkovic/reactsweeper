import React, { useState, useEffect } from 'react';
import { config, Difficulty } from '../lib/config';
import { randomIntFromInterval } from '../lib/functions';
import { Cell } from './Cell';

type BoardProps = {
  difficulty: string
}

const Board = ({difficulty} : BoardProps)  => {
  const cfg = config[difficulty as Difficulty];
  const [board, setBoard] = useState<Cell[][]>();

  useEffect(() => {
    let newBoard: Cell[][] = [];

    for(var s = 0; s < cfg.width; s++) {
      newBoard.push([]);
    }

    for(var i = 0; i < cfg.width; i++) {
      for(var j = 0; j < cfg.height; j++) {
        newBoard[i][j] = {
          isOpened: false,
          type: 'empty',
          value: -1
        };
      }
    }

    // Set bomb cells
    let bombCounter = cfg.mines;

    while(bombCounter) {
      // Set bomb to random coordinates of map
      let x: number = randomIntFromInterval(0, cfg.width - 1);
      let y: number = randomIntFromInterval(0, cfg.height - 1);
      newBoard[x][y] = {
        isOpened: false,
        type: 'mine',
        value: -1
      };
      bombCounter--;
    }

    // Set empty cells
    // eslint-disable-next-line
    for(var i = 0; i < cfg.width; i++) {
      // eslint-disable-next-line
      for(var j = 0; j < cfg.height; j++) {
        if(newBoard[i][j].type !== 'mine') {
          newBoard[i][j] = {
            isOpened: false,
            type: 'empty',
            value: countMines(newBoard, i, j, cfg.width, cfg.height)
          };
        }
      }
    }

    // set state
    setBoard(newBoard);
  }, [cfg]);

  useEffect(() => {
    console.log('board updated');
    console.log(board);
  }, [board]);

  const OpenCell = (x: number, y: number) => {
    if(!board) return;
    let newBoard = board;
    newBoard[x][y].isOpened = true;
    setBoard(newBoard);
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
                      <div key={j} className='flex items-center justify-center w-6 h-6 bg-gray-100 border-1 border-gray-400 text-sm font-semibold'>
                        <span>{subCells.type === 'mine' ? 'M' : subCells.value}</span>
                      </div>
                    ) : (
                      <div key={j} className='flex items-center justify-center w-6 h-6 bg-gray-50 border-1 border-gray-400 text-sm font-semibold cursor-pointer hover:bg-gray-200'
                           onClick={() => OpenCell(i, j)}></div>
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