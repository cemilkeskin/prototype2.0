import React, { useState } from "react";

import list from './bullet-list.svg';
import Waveform from "./Waveform";
import PlayList from "./PlayList"; 

// const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

const tracks = [
  {
    id: 0,
    title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
    url:
      "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3"
  },
  {
    id: 1,
    title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
    url:
      "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3"
  }
];

export default function App() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

  return (
   
    <div className="AppContainer">
    <div className="AppAnimation">sfdglkdfgljk</div>

    <div className="list">
    <PlayList
        tracks={tracks}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      /> 
   </div> 

     
    

   <div className="App">
      <div className="wavebar">
      <Waveform url={selectedTrack.url} />
      </div>
      </div>
    </div>
    

  );
}