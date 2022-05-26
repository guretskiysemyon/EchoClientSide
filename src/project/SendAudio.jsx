import React, {useState} from 'react';
import MyButton from "./Components/MyButton";


function SendAudio({addNewMessage,setVisible}) {

    var streamGlob = null;
    var medRec = null;
    let chunks = [];
    var event = null;
    var isRecoding = false;
    const [audioSrc,setAudioSrc] = useState('');
   // var audioSrc = "";
    const [stl,setStl] = useState({display:'none'})
    
    function send() {
        if (isRecoding)
            stopRecord()
        if (audioSrc === '') 
            return
        addNewMessage(audioSrc,'audio');
        reset();
        ///
    }

    function reset() {
        if (isRecoding) {
            streamGlob.getTracks()
                .forEach(track => track.stop());
        }
        setAudioSrc('')
        setStl({display:'none'})
        setVisible(false)
        
    }

    function stopRecord() {
        if (medRec !== undefined && isRecoding) {
            medRec.stop();
            isRecoding = false;
            medRec.onstop = function (event) {
                const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                chunks = [];
                const audioURL = window.URL.createObjectURL(blob);
                setAudioSrc( audioURL);
                streamGlob.getTracks()
                    .forEach(track => track.stop());
                setStl({display: 'block'})
            }
        }
    }

    function recordVoice() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                isRecoding=true;
                medRec = new MediaRecorder(stream);
                medRec.start();
                streamGlob=stream;

                medRec.ondataavailable = function (e) {
                    chunks.push(e.data);
                    event = e;
                }
            });
    }

    return (
      
           <div>
                <MyButton className ="btn btn-outline-dark" id="startAudioBtn" onClick={recordVoice}
                          icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-record2" viewBox="0 0 16 16">
                              <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
                              <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                          </svg>}
                />
                <MyButton className ="btn btn-outline-dark" id="stopAudioBtn" onClick={stopRecord}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           className="bi bi-stop-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path
                        d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/>
                </svg>}/>
               
                <MyButton className ="btn btn-outline-dark" id="resetAudioBtn" onClick={reset} icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>}/>

                <MyButton className ="btn btn-outline-dark" id="sendAudioBtn" onClick={send} icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-send-fill" viewBox="0 0 16 16">
                        <path
                            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                    </svg>
                }/>
                <audio controls src={audioSrc} style={stl}
                       className ="recorded-audio" id='rec-sec'/>
               
            </div>
       
    );
}

export default SendAudio;