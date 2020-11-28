import React, {useState, useEffect, useContext} from "react";
import app from "./base";
import list from './bullet-list.svg';
import loader from "./loader2.svg";
import upload from "./computing-cloud2.svg" 
import Waveform from "./Waveform";
import PlayList from "./PlayList"; 
import MusicTempo from "music-tempo";


// function FilesAdd({ addFiles }, file) {

  // const uploadChange = async (e) => {

  //   handleSubmit();
  //   const file = e.target.files[0];
  //   var reader = new FileReader();

  // reader.onload = function(fileEvent) {
  //   context.decodeAudioData(fileEvent.target.result, calcTempo);
  //   console.log(file);
  // }

  // reader.readAsArrayBuffer(file);

  // }; 

//   return (
   
//   );
// }


export default function App() {


  const [files, setFiles] = React.useState([]); 

  const [value, setValue] = React.useState(""); 
  const [fileUrl, setFileUrl] = useState(null); 
  const [fileName, setFileName] = useState(""); 
  const [bestanden, setBestanden] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  // const [tracks, setTracks] = useState([]);

  // const handleSubmit = () => {
  //   console.log('dfgdfg');
  //   if (!value) return;
  //   addFiles(value);
  //   setValue("");
  // };
  
  var context = new AudioContext({ sampleRate: 44100 });


  const runChange = async (e) => {
    uploadChange(e);
    setValue(e.target.files[0]);
  }

  const uploadChange = async (e) => {

    setLoading(true);
    const file = e.target.files[0];
    const storageRef = await app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file); 
    setFileUrl(await fileRef.getDownloadURL());
    console.log(fileName, fileUrl); 
  
    // console.log(fileName);
    // console.log(fileUrl);

    var reader = new FileReader();

    reader.onload = function(fileEvent) {
      context.decodeAudioData(fileEvent.target.result, calcTempo);
      console.log(file);
    }
  
    reader.readAsArrayBuffer(file);
 
    setFileName(file.name);

    // if (!fileName || !fileUrl) { 
    //   console.log("error uploading");
    //   return;
    // }
    setLoading(false);
  };   
  
  const uploadFile = async (e) => { 

    setLoadingSubmit(true);
    e.preventDefault()
    
    await app.firestore().collection("allUploadsProto2").doc().set({
      title: fileName,
      url: fileUrl,
    }); 
    // setLoading(false); 
    console.log("done"); 
    setLoadingSubmit(false);

  }  

  
var calcTempo = function (buffer) {
  var audioData = [];
  // Take the average of the two channels
  if (buffer.numberOfChannels == 2) {
    var channel1Data = buffer.getChannelData(0);
    var channel2Data = buffer.getChannelData(1);
    var length = channel1Data.length;
    for (var i = 0; i < length; i++) {
      audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
    }
  } else {
    audioData = buffer.getChannelData(0);
  }
  var mt = new MusicTempo(audioData);

  console.log(mt.tempo);

  document.body.style.backgroundColor = 'rgb(' + mt.tempo + ',' + 255 + ',' + 255 + ')'; 
  // console.log(mt.beats);  
}

const fetchBestanden = () => { 

  app.firestore().collection('allUploadsProto2').onSnapshot(snapshot => {

  setBestanden([]);
  snapshot.forEach(bestand => {
    // console.log(bestand.data());
    setBestanden(bestanden => [...bestanden, {...bestand.data()}]);
    // setTracks(tracks => [...tracks, {...bestand.data()}]);
  
  });
}) 
//const usersCollection = await app.firestore().collection('allUploads').doc(currentUser.uid).collection("tracks").get()
// setUsers(usersCollection.docs.map(doc => {4
//   return doc.data()
// }))
}


const tracks = [
  {
    id: 0,
    title: "test", 
    url: "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3"
  }
];

// console.log(tracks);

useEffect(() => { 
  fetchBestanden();  
  }, []);

useEffect(() => {
console.log(bestanden); 
}, [bestanden]); 



// useEffect(() => {
//   console.log(tracks);
//   }, [tracks])



  // const addFiles = text => {
  //   const newFiles = [...files, { text: text}];
  //   setFiles(newFiles);
  // };

  // useEffect(() => {
  //   console.log(files);
  // }, [files]);


  // const tracks = [files]; 

  console.log(tracks);
 
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]); 

  // console.log(file);



  return (
   
    <div className="AppContainer">
    <div className="AppAnimation">   

    </div>
    
   
    <div className="list"> 
    
       

    <PlayList
        tracks={bestanden} 
        selectedTrack={selectedTrack} 
        setSelectedTrack={setSelectedTrack}
        
      /> 

      <div className="uploadContainer">

      <form onSubmit={uploadFile}> 


{isLoading ? "": 
    ( <div>
      <input id="file-upload" type="file" accept=".mp3" onChange={uploadChange}/>  
    <label htmlFor="file-upload" className="custom-file-upload" type="file" accept=".mp3">  
      <img className="upload" src={upload}></img>
    </label>
      </div> )}
    {isLoading ? 
    <div>
   <input id="file-upload" type="file"  onChange={uploadChange}/>  
    <label for="file-upload" class="custom-file-upload" type="file" accept="mp3">  
      <img className="loaderHome" src={loader}></img>
    </label> </div>
      : ""}  


<input id="file-upload" type="file"  onChange={runChange}/>  




{isLoadingSubmit ? "": 
        (<button type="submit" className="buttonUpload">upload</button>)}
        {isLoadingSubmit ? 
        <div> 
        <button type="submit" className="buttonUpload">
          <img className="loaderHome" src={loader}></img>
          </button> </div>
          : ""}  
</form>


      </div>

      

{/* {bestanden.map((bestand) => { 

return <div className="uploadContainer">

      <h1 className="uploadTitle">{bestand.name}</h1>
      <a className="link" href="/login">
      <p className="uploadDescription">{bestand.file}</p>
      </a>



  <audio controls className="audioControls">
<source src={bestand.file} type="audio/ogg"></source>
 </audio>


</div>
})} */}
   </div> 

 

   <div className="App">
   <div className="containerURL">
    <a className="testURL" href={selectedTrack.url}>{selectedTrack.url}</a>
    </div>
  
      <div className="wavebar">
      <Waveform url={selectedTrack.url} />
      </div>
      </div>
    </div>
    

  );
}
