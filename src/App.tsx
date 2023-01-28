import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className='App'>
      <div className='container mx-auto p-5'>
        <div className='flex flex-col items-center'>
          <div className='title text-center mb-5'>
            <h1 className='text-3xl font-semibold'>ReactSweeper</h1>
            <h3 className='text-lg'>The famous Minesweeper game made with React and Typescript.</h3>
          </div>
          <Game />
        </div>
      </div>
    </div>
  );
}

export default App;
