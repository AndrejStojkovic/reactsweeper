import React from 'react';

type CellState = {
  isOpened?: boolean,
  type: 'mine' | 'empty',
  value: number,
}

class Cell extends React.Component<CellState> {
  state: CellState = {
    isOpened: false,
    type: 'empty',
    value: -1
  }

  render() {
    return (
      <div className='flex items-center justify-center w-6 h-6 bg-gray-200 border-1 border-gray-400 text-sm font-semibold'>
        {this.state.type === 'mine' ? 'B' : this.state.value}
      </div>
    )
  }
}

export default Cell;