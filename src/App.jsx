import React, { useState, useEffect } from 'react'
import './App.css'
import * as Tone from 'tone';
import { CloudHail, PauseIcon, PlayCircle, PlayIcon, Volume, Volume1Icon, Volume2, Volume2Icon, VolumeIcon, VolumeX, VolumeXIcon, WavesIcon } from 'lucide-react';


function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimateMusic, setIsAnimateMusic] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [frequency, setFrequency] = useState(500);
  const [noise, setNoise] = useState(null);
  const [filter, setFilter] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [isPlayingRain, setIsPlayingRain] = useState(false);

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

  Tone.start();

  const handlePlayPause = () => {
    if (!isPlaying) {
      noise.start();
    } else {
      noise.stop();
    }
    setIsPlaying(!isPlaying);
    setIsAnimateMusic(!isAnimateMusic);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (gainNode) {
      gainNode.gain.value = newVolume;
    }
    setIsAnimateMusic(false);
    setIsPlaying(false);
    setTimeout('', 1000);
    setIsAnimateMusic(true);
    setIsPlaying(true);
    noise.start();

  };

  const handleFrequencyChange = (e) => {
    const newFrequency = parseInt(e.target.value);
    setFrequency(newFrequency);    
    if (filter) {
      filter.frequency.value = newFrequency;
    }
    noise.stop();
    setIsAnimateMusic(false);
    setIsPlaying(false);
    // handlePlayPause();
  };

  const audioRef = React.createRef();
  const audioUrl = '/sounds/rain.ogg';

  const handlePlayRain = () => {
    const audio = audioRef.current;

    if (isPlayingRain) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlayingRain(!isPlayingRain);
  }

  const handleEnd = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
  };
  

  return (
    <>
    <div className="h-screen w-screen absolute flex items-center justify-center">
      <div id="music-animation" className="loader flex items-center justify-center h-3/4 w-full">
        <span className={isAnimateMusic ? 'stroke animate-music' : ''}></span>
        <span className={isAnimateMusic ? 'stroke animate-music' : ''}></span>
        <span className={isAnimateMusic ? 'stroke animate-music' : ''}></span>
        <span className={isAnimateMusic ? 'stroke animate-music' : ''}></span>
        <span className={isAnimateMusic ? 'stroke animate-music' : ''}></span>
        <span className={isAnimateMusic ? 'stroke animate-music' : ''}></span>
        <span className={isAnimateMusic ? 'stroke animate-music' : ''}></span>
      </div>
    </div>
    
    <div className='p-4 bg-slate-900 mouse-effect z-50 text-neutral-100 h-screen w-screen flex justify-start md:justify-center items-center flex-col gap-4'> 
     
      <div className='w-full md:w-auto lg:w-auto p-6 bg-slate-800 rounded-lg z-50 flex flex-col gap-2 items-center font-medium'>
        <span className='flex gap-2'>
        <WavesIcon className='hover:text-cyan-500 hover:animate-spin'/> NoisePlayer
        </span>
        <span className='text-sm text-slate-600'>
          by <a href="https://pedrolucaslcosta.vercel.app" className='hover:text-cyan-500 transition-all duration-300 hover:underline'>@pedrolucaslco</a>
        </span>
      </div>
      
      {/* FREQUENCY DIV */}
      <div className='grid grid-cols-3 w-full md:w-auto md:grid-cols-7 lg:grid-cols-7 p-6 bg-slate-800 rounded-lg z-50 flex flex-wrap justify-start gap-2 items-center'>  
      
      <button className={frequency == 12 ? 
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-600 border border-slate-700 hover:border-slate-600 rounded-md' :
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md'
      } onClick={handleFrequencyChange} value={12}> 12   Hz</button>
      <button className={frequency == 40 ? 
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-600 border border-slate-700 hover:border-slate-600 rounded-md' :
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md'
      } onClick={handleFrequencyChange} value={40}> 40   Hz</button>
      <button className={frequency == 100 ? 
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-600 border border-slate-700 hover:border-slate-600 rounded-md' :
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md'
      } onClick={handleFrequencyChange} value={100}> 100 Hz</button>
      <button className={frequency == 180 ? 
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-600 border border-slate-700 hover:border-slate-600 rounded-md' :
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md'
      } onClick={handleFrequencyChange} value={180}> 180 Hz</button>
      <button className={frequency == 380 ? 
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-600 border border-slate-700 hover:border-slate-600 rounded-md' :
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md'
      } onClick={handleFrequencyChange} value={380}> 380 Hz</button>
      <button className={frequency == 600 ? 
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-600 border border-slate-700 hover:border-slate-600 rounded-md' :
      ' lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md'
      } onClick={handleFrequencyChange} value={600}> 600 Hz</button>
      <button className={isPlayingRain ? 
      'col-span-3 md:col-span-1 lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-600 border border-slate-700 hover:border-slate-600 rounded-md' :
      'col-span-3 md:col-span-1 lg:w-auto flex items-center justify-center p-4 lg:py-1 lg:px-2 transition-all duration-300 bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-md'
      } onClick={handlePlayRain} value={600}><CloudHail/></button>
      {/* 90,380, 180 */}
      </div>

    <div className='w-full md:w-auto lg:w-auto flex justify-center items-center gap-4'>

      <div className='p-6 bg-slate-800 rounded-lg z-50 inline-flex gap-2 items-center'>  
        <button onClick={handlePlayPause} 
          className='bg-slate-400 rounded-full p-2 font-medium text-slate-800'>
          {/* {isPlaying ? <PauseIcon/> : <PlayCircle />} */}
          {isPlaying ? <PauseIcon/> : <PlayIcon className='translate-x-0.5' />}

        </button>
      </div>

      <div className='w-full lg:w-auto px-6 h-full text-slate-200 bg-slate-800 rounded-lg z-50 inline-flex gap-2 items-center'>  
        {(volume == 0) ? <VolumeXIcon size={40} /> : ''}
        {(volume < 0.5 && volume != 0) ? <Volume1Icon size={40} /> : ''}
        {(volume > 0.5) ? <Volume2Icon size={40} /> : ''}
        {/* <Volume2 size={40}/> */}
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange} 
        />
                
        {volume*100}%
      </div>     
      </div> 
      <audio
        src={audioUrl}
        ref={audioRef}
        onEnded={handleEnd}
      />
    </div>
    </>
  )
}

export default App
