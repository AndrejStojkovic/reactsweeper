import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <div className='w-[500px] p-4 mt-8 border-t-2 text-center font-mono'>
      Copyright © {year} - <a href='https://github.com/AndrejStojkovic' className='hover:text-neutral-700 underline'>Andrej Stojkovikj</a><br />
      <a href='https://github.com/AndrejStojkovic/reactsweeper' className='hover:text-neutral-700 underline'>Github Repository</a>
    </div>
  )
}

export default Footer;