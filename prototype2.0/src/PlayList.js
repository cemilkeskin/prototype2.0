import React from "react";

const PlayList = ({ tracks, selectedTrack, setSelectedTrack }) => {
  return (
    <div className="playlist">
      {tracks.map(track => (
        <div
          key={track.id}
          className={
            track.id === selectedTrack.id
              ? "playlist-item selected"
              : "playlist-item"
          }
          onClick={() => {setSelectedTrack(track)
            console.log(track);}
         }
        >
          <p className="playlistTitle">{track.title}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayList;
