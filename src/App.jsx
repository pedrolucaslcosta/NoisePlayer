import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { PauseIcon, PlayCircle, WavesIcon } from 'lucide-react';

const App = () => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [frequency, setFrequency] = useState(500);
  const [noise, setNoise] = useState(null);
  const [filter, setFilter] = useState(null);
  const [gainNode, setGainNode] = useState(null);

  useEffect(() => {
    
    // brown noise
    const noiseNode = new Tone.Noise('brown');

    // change frequency
    const filterNode = new Tone.Filter(frequency, 'lowpass');
    noiseNode.connect(filterNode);

    // change volume
    const gain = new Tone.Gain(volume);
    filterNode.connect(gain);
    gain.toDestination();

    setNoise(noiseNode);
    setFilter(filterNode);
    setGainNode(gain);

    return () => {
      noiseNode.dispose();
      filterNode.dispose();
      gain.dispose();
    };

  }, [volume, frequency]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      Tone.start();
      noise.start();
    } else {
      noise.stop();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (gainNode) {
      gainNode.gain.value = newVolume;
    }
  };

  const handleFrequencyChange = (e) => {
    const newFrequency = parseInt(e.target.value);
    setFrequency(newFrequency);
    if (filter) {
      filter.frequency.value = newFrequency;
    }
  };

  return (
    <>
    <div className='bg-slate-900 mouse-effect text-neutral-100 h-screen w-screen flex justify-center items-center flex-col gap-4'> 
      <div className='p-6 bg-slate-800 rounded-lg z-50 flex flex-col gap-2 items-center font-medium'>
        <span className='flex gap-2'>
        <WavesIcon className='hover:text-cyan-500 hover:animate-spin'/> NoisePlayer
        </span>
        <span className='text-sm text-slate-600'>
          by <a href="https://pedrolucaslcosta.vercel.app" className='hover:text-cyan-500 transition-all duration-300 hover:underline'>@pedrolucaslco</a>
        </span>
      </div>
      <div className='p-6 bg-slate-800 rounded-lg z-50 flex gap-2 items-center'>  
      
      <button onClick={handlePlayPause} 
      className='bg-slate-100 rounded-full p-2 font-medium text-slate-800'>
        {isPlaying ? <PauseIcon/> : <PlayCircle />}
      </button>
        
        <label htmlFor="volume">Volume: {volume*100}%</label>
      <input
        type="range"
        id="volume"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className='bg-neutral-100'
      />
      <label htmlFor="frequency">Frequency: {frequency} Hz</label>
      <input
        type="range"
        id="frequency"
        min="4"
        max="1000"
        step="1"
        value={frequency}
        onChange={handleFrequencyChange}
        
      />
      <button className='py-1 px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md' onClick={handleFrequencyChange} value={12}> 12   Hz</button>
      <button className='py-1 px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md' onClick={handleFrequencyChange} value={40}> 40   Hz</button>
      <button className='py-1 px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md' onClick={handleFrequencyChange} value={100}> 100 Hz</button>
      <button className='py-1 px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md' onClick={handleFrequencyChange} value={180}> 180 Hz</button>
      <button className='py-1 px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md' onClick={handleFrequencyChange} value={380}> 380 Hz</button>
      <button className='py-1 px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md' onClick={handleFrequencyChange} value={600}> 600 Hz</button>
      {/* 90,380, 180 */}
      </div>
    </div>
    </>
  );
};

export default App;