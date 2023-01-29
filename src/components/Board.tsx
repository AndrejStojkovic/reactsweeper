import React, { useState, useEffect } from 'react';
import { config, Difficulty } from '../lib/config';
import Cell, {CellType} from './Cell';

type BoardType = {
  difficulty: string
}

const Board = ({difficulty} : BoardType)  => {
  const board = config[difficulty as Difficulty];
  const [map, setMap] = useState<CellType>();

  useEffect(() => {
    // Set bomb cells
    let bombCounter = board.mines;

    while(bombCounter) {
      // Set bomb to random coordinates of map
      bombCounter--;
    }

    // Set empty cells
  }, [board]);

  return (
    <div>Board <br />
      <div>
        {board.width} - {board.height} - {board.mines}
        <Cell type='empty' value={2} />
        <Cell type='mine' value={-1} />
      </div>
    </div>
  )
}

export default Board;