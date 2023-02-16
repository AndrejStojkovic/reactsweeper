import React, {useEffect, useState} from 'react';
import {
  getHighscoreLocalStorage,
  setHighscoreLocalStorage,
  getPlayCounterLocalStorage,
  setPlayCounterLocalStorage
} from '../lib/localStorage';
import Board from './Board';

const Game = () => {
  const [gameState, setGameState] = useState(false);  // false - not started, true - started
  const [difficulty, setDifficulty] = useState('beginner');
  const [highscore, setHighscore] = useState(0);
  const [playCounter, setPlayCounter] = useState(0);

  const StartGame = () => setGameState(true);
  const EndGame = () => setGameState(false);

  useEffect(() => {
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
        <Board difficulty={difficulty}
              gameState={gameState}
              StartGame={StartGame}
              EndGame={EndGame}/>
      </div>
    </div>
  )
}

export default Game;