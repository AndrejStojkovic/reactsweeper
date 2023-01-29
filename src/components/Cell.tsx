import React, { useEffect, useState } from 'react';

export type CellType = {
  isOpened?: boolean,
  type: 'mine' | 'empty',
  value: number,
}

const Cell = ({type, value}: CellType) => {
  const [data, setData] = useState<CellType>();

  useEffect(() => {
    setData({
      isOpened: false,
      type: type,
      value: value
    });
  }, []);

  return (
    <div className='flex items-center justify-center w-6 h-6 bg-gray-200 border-1 border-gray-400 text-sm font-semibold'>
      {type === 'mine' ? 'B' : data?.value}
    </div>
  )
}

export default Cell;