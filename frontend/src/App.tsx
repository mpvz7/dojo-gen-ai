//App.tsx

import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import 'audio-react-recorder/dist/index.css';
import React, { useState } from "react";
import { Streamlit } from "streamlit-component-lib";

export const App = () => {
  const [recordState, setRecordState] = useState(null);
  const [audioDataURL, setAudioDataURL] = useState('');

  const onClick = () => {
    if (recordState === RecordState.START) {
      setRecordState(RecordState.STOP);
    } else {
      setAudioDataURL('');
      setRecordState(RecordState.START);
    }
  };

  const onStop = (data) => {
    setAudioDataURL(data.url);
    data.blob.arrayBuffer().then((arrayBuffer) => {
       const uint8Array = new Uint8Array(arrayBuffer);
        Streamlit.setComponentValue({ "arr": uint8Array });
     });
  };
  
  const recordButtonLabel = recordState === RecordState.START ? 'Stop' : 'Start'

  return (
    <div>
      <AudioReactRecorder state={recordState} onStop={onStop}/>
      <div>
        <audio id='audio' controls src={audioDataURL} />
        <button id='toggle' onClick={onClick}>{recordButtonLabel}</button>
      </div>
    </div>
  );
};