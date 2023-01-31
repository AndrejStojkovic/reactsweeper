import React, { useState, useEffect } from 'react';
import { config, Difficulty } from '../lib/config';
import { randomIntFromInterval } from '../lib/functions';
import Cell from './Cell';

type BoardProps = {
  difficulty: string
}

const Board = ({difficulty} : BoardProps)  => {
  const cfg = config[difficulty as Difficulty];
  let board = new Array(cfg.width).fill(0).map(() => new Array(cfg.height).fill(1));

  useEffect(() => {
    for(var i = 0; i < cfg.width; i++) {
      for(var j = 0; j < cfg.height; j++) {
        board[i][j] = new Cell({
          isOpened: false,
          type: 'empty',
          value: -1,
        });
      }
    }

    // Set bomb cells
    let bombCounter = cfg.mines;

    while(bombCounter) {
      // Set bomb to random coordinates of map
      let x: number = randomIntFromInterval(0, cfg.width - 1);
      let y: number = randomIntFromInterval(0, cfg.height - 1);
      board[x][y] = new Cell({
        isOpened: false,
        type: 'mine',
        value: -1,
      });
      bombCounter--;
    }

    // Set empty cells
  }, [cfg]);

  return (
    <div>Board <br />
      <div>
        {cfg.width} - {cfg.height} - {cfg.mines}
        <div className='board flex flex-col'>
        {board.map((cells, i) => {
          return (
            <div key={i} className='row flex flex-row'>
              {cells.map((subCells, j) => {
                return (
                <div key={j} className='flex items-center justify-center w-6 h-6 bg-gray-200 border-1 border-gray-400 text-sm font-semibold'>
                  <span></span>
                </div>
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

export default Board;