import React, {useEffect, useState} from 'react';
import {
  getHighscoreLocalStorage,
  setHighscoreLocalStorage,
  getPlayCounterLocalStorage,
  setPlayCounterLocalStorage
} from '../lib/localStorage';
import { leadingZeroes } from '../lib/functions';
import Board from './Board';

import SmileyNormal from '../media/smiley_normal.png';
import SmileyWin from '../media/smiley_win.png';
import SmileyLose from '../media/smiley_lose.png';

const Game = () => {
  const [gameState, setGameState] = useState(false);  // false - not started, true - started
  const [state, setState] = useState(0);  // -1 = lose, 0 = normal, 1 = win
  const [difficulty, setDifficulty] = useState('beginner');
  const [highscore, setHighscore] = useState(0);
  const [playCounter, setPlayCounter] = useState(0);
  const [flagCounter, setFlagCounter] = useState(0);
  const [smiley, setSmiley] = useState(SmileyNormal);

  const StartGame = () => setGameState(true);
  const EndGame = () => setGameState(false);
  const SetFlags = (val: number) => setFlagCounter(val);
  const SetState = (val: number) => setState(val);

  useEffect(() => {
    setSmiley(state === 1 ? SmileyWin : state === -1 ? SmileyLose : SmileyNormal);
  }, [gameState]);

  useEffect(() => {
    document.getElementsByClassName('game')[0].addEventListener('contextmenu', (e) => {e.preventDefault()});
    setHighscore(Number(getHighscoreLocalStorage()));
    setPlayCounter(Number(getPlayCounterLocalStorage()));
  }, []);

  return (
    <div className='w-full'>
      <div className='settings'>
        <div className='difficulty flex items-center justify-center mb-1'>
          <div>Difficulty: </div>
          <select onChange={(e) => setDifficulty(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 ml-2'>
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='expert'>Expert</option>
          </select>
        </div>

        <div className='highscore text-center'>
          <div>Highscore: <span className='font-semibold'>{highscore}</span></div>
        </div>
        <div className='highscore text-center'>
          <div>Times played: <span className='font-semibold'>{playCounter}</span></div>
        </div>
      </div>

      <div className={`text-sm text-gray-500 mt-3 mb-2 text-center ${gameState ? 'opacity-0' : 'opacity-100'}`}>
        Click on a cell to start the game.
      </div>

      <div className='game w-full flex flex-col items-center justify-center'>
        <div className='bg-[#bdbdbd] p-2'>
          <div className='flex flex-row justify-between items-center mb-2 p-1 select-none border-2 border-minesweeper'>
            <div className='flag-counter relative bg-black font-digital text-[42px] text-[#600000] leading-[0.75] border-1 border-minesweeper'>
              <div>888</div>
              <div className='text-[#ff0000] absolute top-0 left-0'>{leadingZeroes(flagCounter, 3)}</div>
            </div>

            <div className='flex justify-center items-center smiley w-8 h-8 bg-cover bg-unopened-cell cursor-pointer' onClick={() => EndGame()}>
              <img src={smiley} className='w-5 h-5' alt='S' />
            </div>

            <div className='timer relative bg-black font-digital text-[42px] text-[#600000] leading-[0.75] border-1 border-minesweeper'>
              <div>888</div>
              <div className='text-[#ff0000] absolute top-0 left-0'>000</div>
            </div>
          </div>
          <Board difficulty={difficulty}
            gameState={gameState}
            StartGame={StartGame}
            EndGame={EndGame}
            Flags={flagCounter}
            SetFlags={SetFlags}
            SetState={SetState}/>
        </div>
        
      </div>
    </div>
  )
}

export default Game;