import React from 'react';

const NoiseTile = ({ title, onClick, audio, freqValue, className }) => {

    const defaultClasses = 'lg:w-auto overflow-hidden flex items-center justify-center py-3 lg:py-1 lg:px-2 transition-all duration-300 border border-slate-700 hover:border-slate-600 rounded-md'
    const activeClass = (audio === freqValue || audio === true) ? 'bg-slate-500' : 'bg-slate-700';
    const fullClass = defaultClasses + ' ' + activeClass + ' ' + className;

    return (
        <button
            className={fullClass} onClick={onClick} value={freqValue}>{title}</button>
    );
  }

export default NoiseTile;