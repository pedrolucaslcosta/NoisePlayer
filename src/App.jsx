import React, { useState, useEffect } from 'react'
import './App.css'
import * as Tone from 'tone';
import { CloudHail, FishIcon, PauseIcon, PlayIcon, Volume, Volume1Icon, Volume2, Volume2Icon, VolumeIcon, VolumeX, VolumeXIcon, WavesIcon } from 'lucide-react';
import NoiseTile from './components/NoiseTile';

function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimateMusic, setIsAnimateMusic] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [frequency, setFrequency] = useState(500);
  const [noise, setNoise] = useState(null);
  const [filter, setFilter] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [isPlayingRain, setIsPlayingRain] = useState(false);
  const [isPlayingUnderWater, setIsPlayingUnderWater] = useState(false);
  

  useEffect(() => {
    
    // nodes create
    const noiseNode = new Tone.Noise('brown');
    const filterNode = new Tone.Filter(frequency, 'lowpass');
    const gain = new Tone.Gain(volume);

    // nodes connect
    noiseNode.connect(filterNode);
    filterNode.connect(gain);
    gain.toDestination();

    // set states
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
  };

  const handleFrequencyChange = (e) => {
    const newFrequency = parseInt(e.target.value);
    setFrequency(newFrequency);    
    setIsPlaying(false);
    setIsAnimateMusic(false);    
  };

  const audioRefRain = React.createRef();
  const audioUrlRain = '/sounds/rain.ogg';

  const audioRefUnderWater = React.createRef();
  const audioUrlUnderWater = '/sounds/underwater.ogg';  

  const handlePlayRain = () => {
    const audio = audioRefRain.current;

    if (isPlayingRain) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlayingRain(!isPlayingRain);
  }
  
  const handlePlayUnderWater = () => {
    const audio = audioRefUnderWater.current;

    if (isPlayingUnderWater) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlayingUnderWater(!isPlayingUnderWater);
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
      <div className='grid grid-cols-2 w-full md:w-auto md:grid-cols-6 lg:grid-cols-6 p-6 bg-slate-800 rounded-lg z-50 flex flex-wrap justify-start gap-2 items-center'>  
      
        <div className='col-span-2 md:col-span-8 lg:col-span-8 text-center py-4'>Brown Noise</div>
        
          <NoiseTile title={'12Hz'} audio={frequency} freqValue={12} onClick={handleFrequencyChange}/>
          <NoiseTile title={'40Hz'} audio={frequency} freqValue={40} onClick={handleFrequencyChange}/>
          <NoiseTile title={'100Hz'} audio={frequency} freqValue={100} onClick={handleFrequencyChange}/>
          <NoiseTile title={'180Hz'} audio={frequency} freqValue={180} onClick={handleFrequencyChange}/>
          <NoiseTile title={'380Hz'} audio={frequency} freqValue={380} onClick={handleFrequencyChange}/>
          <NoiseTile title={'600Hz'} audio={frequency} freqValue={600} onClick={handleFrequencyChange}/>
          
          <button 
            className='w-full flex justify-center gap-2 mt-4 py-4 col-span-2 md:col-span-6 lg:col-span-6 bg-slate-400 rounded-lg p-2 font-semibold text-slate-800'
            onClick={handlePlayPause} 
          >

            {isPlaying ? <PauseIcon/>: <PlayIcon className='translate-x-0.5' />}
            {isPlaying ? 'Pause': 'Play'}
          </button>

      </div>
      <div className='grid grid-cols-2 w-full md:w-auto md:grid-cols-2 lg:grid-cols-2 p-6 bg-slate-800 rounded-lg z-50 flex flex-wrap justify-start gap-2 items-center'>  
      
          <div className='col-span-2 md:col-span-2 lg:col-span-2 text-center py-4'>Sounds</div>

          <NoiseTile title={<CloudHail/>} audio={isPlayingRain} onClick={handlePlayRain}  className={'col-span-1 md:col-span-1 lg:col-span-1'}/>
          <NoiseTile title={<FishIcon />} audio={isPlayingUnderWater} onClick={handlePlayUnderWater} className={'col-span-1 md:col-span-1 lg:col-span-1'}/>
      </div>
      <audio src={audioUrlRain} ref={audioRefRain} onEnded={handleEnd} />
      <audio src={audioUrlUnderWater} ref={audioRefUnderWater} onEnded={handleEnd} />
      </div>
    </>
  )
}

export default App
