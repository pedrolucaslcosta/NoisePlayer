import React from 'react';
import Icon from './Icon';

const NoiseTile = ({ title, icon, onClick, audio, freqValue, className }) => {

  // const defaultClasses = 'lg:w-auto overflow-hidden flex items-center justify-center py-3 lg:py-1 lg:px-2 transition-all duration-300 border border-slate-700 hover:border-slate-600 rounded-md';
  const defaultClasses = 'flex p-4 flex-col gap-2 rounded-2xl overflow-hidden';
  
  const activeClass = (audio === freqValue || audio === true) ? 'bg-slate-400 dark:bg-slate-500' : 'bg-slate-300 dark:bg-slate-700';
  const fullClass = defaultClasses + ' ' + activeClass + ' ' + className;

  return (
      <button className={fullClass} onClick={onClick} value={freqValue}>
        <span className=''><Icon name={icon} /></span>
        <span className='text-sm'>
          {title}
        </span>
      </button>
  );
  }

export default NoiseTile;