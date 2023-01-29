import React, { useEffect } from 'react';
import { config, Difficulty } from '../lib/config';
import Cell from './Cell';

type BoardType = {
  difficulty: string
}

const Board = ({difficulty} : BoardType)  => {
  const board = config[difficulty as Difficulty];
  //const map = [board.height][board.width];

  useEffect(() => {
    // Set bomb cells
    // Set empty cells
  }, [board]);

  return (
    <div>Board <br />
      <div>
        {board.width} - {board.height} - {board.mines}
        <Cell />
      </div>
    </div>
  )
}

export default Board;