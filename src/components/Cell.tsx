import React, { useState } from 'react';

const Cell = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <div className='flex items-center justify-center w-6 h-6 bg-gray-200 border-1 border-gray-400 text-sm font-semibold'>8</div>
  )
}

export default Cell;