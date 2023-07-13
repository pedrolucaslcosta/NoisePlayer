import React, { useState, useEffect } from 'react'
import './App.css'
import * as Tone from 'tone';
import { ActivityIcon, CloudHail, FishIcon, PauseIcon, PlayIcon, Volume, Volume1Icon, Volume2, Volume2Icon, VolumeIcon, VolumeX, VolumeXIcon, WavesIcon } from 'lucide-react';
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

    {/* AUDIO SOURCES */}
    <audio src={audioUrlRain} ref={audioRefRain} onEnded={handleEnd} />
    <audio src={audioUrlUnderWater} ref={audioRefUnderWater} onEnded={handleEnd} />

    {/* APPLICATION */}
    <div className='flex h-screen w-screen px-6 lg:px-96 md:px-52 py-16 flex-col gap-2 bg-slate-900 mouse-effect z-50 text-slate-300'> 
      
      <div className="flex gap-2 md:justify-center">
        <WavesIcon className='hover:text-cyan-500 hover:animate-spin' size={32}/> 
        <span className='text-2xl'>NoisePlayer</span>
      </div>

      <span className='flex text-sm text-slate-700 md:justify-center'>
        by <a href="https://pedrolucaslcosta.vercel.app" className='hover:text-cyan-500 transition-all duration-300 hover:underline'>@pedrolucaslco</a>
      </span>

      <div className='py-4'></div>

      <span>Noises</span>


      <div className="grid grid-cols-3 gap-2 w-full">
        
        <NoiseTile title={'12Hz'} icon={'Activity'} audio={frequency} freqValue={12} onClick={handleFrequencyChange}/>
        <NoiseTile title={'40Hz'} icon={'Activity'} audio={frequency} freqValue={40} onClick={handleFrequencyChange}/>
        <NoiseTile title={'100Hz'} icon={'Activity'} audio={frequency} freqValue={100} onClick={handleFrequencyChange}/>
        <NoiseTile title={'180Hz'} icon={'Activity'} audio={frequency} freqValue={180} onClick={handleFrequencyChange}/>
        <NoiseTile title={'380Hz'} icon={'Activity'} audio={frequency} freqValue={380} onClick={handleFrequencyChange}/>
        <NoiseTile title={'600Hz'} icon={'Activity'} audio={frequency} freqValue={600} onClick={handleFrequencyChange}/>
        
        <span className='h-0.5 rounded-full m-2 col-span-3 bg-slate-800'></span>
        <button 
            className='flex justify-center items-center gap-1 col-span-3 py-3 bg-slate-700 rounded-2xl font-semibold text-slate-300'
            onClick={handlePlayPause} 
        >
          {isPlaying ? <PauseIcon size={20} />: <PlayIcon  size={20}/>}
          {isPlaying ? 'Pause': 'Play'}
        </button>

      </div>

      <div className='py-2'></div>

      <span>Sounds</span>

      <div className="grid grid-cols-2 gap-2 w-full">

        <NoiseTile title={'Rain'} icon={'CloudHail'} audio={isPlayingRain} onClick={handlePlayRain}  className={'col-span-1 md:col-span-1 lg:col-span-1'}/>
        <NoiseTile title={'Underwater'} icon={'Fish'} audio={isPlayingUnderWater} onClick={handlePlayUnderWater} className={'col-span-1 md:col-span-1 lg:col-span-1'}/>

      </div>

    </div>
    </>
  )
}

export default App
