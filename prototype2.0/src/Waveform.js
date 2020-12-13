import React, { useEffect, useRef, useState } from "react";
import play from './play-button-1.svg';
import pause from './pause.svg';

import list from './bullet-list.svg';


import WaveSurfer from "wavesurfer.js";
import app from "./base";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#202020",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 7,
  barRadius: 4,
  responsive: true,
  height: 55,
  

  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});

export default function Waveform({ url, doc }) {

  const [selectedBestand, setSelectedBestand] = useState([]);
  const waveformRef = useRef(null); 
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false); 
  const [volume, setVolume] = useState(0.5);
  let data;

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    console.log(doc);
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    app.firestore().collection("allUploadsProto2").doc(doc).get()
    .then(function(res) {
      data = res.data();
      if(data){
        console.log(data.url); 
        wavesurfer.current.load(data.url);  
      }

    }); 

    // wavesurfer.current.load(doc)

    wavesurfer.current.load(url);  

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [doc]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };
 
  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <div onClick={handlePlayPause} >{!playing ? <img className="playpause" src={play}></img> : <img className="playpause" src={pause}></img>}</div>
        
        </div>
        <div className="controls">
     
       
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        
        </div>
        
    </div>
  );
}
