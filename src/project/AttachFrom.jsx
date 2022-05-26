import React from 'react';
import MyButton from "./Components/MyButton";
import SendImageInput from "./SendImageInput";
import {useState} from "react";
import MyModal from "../MyModal";
import SendAudio from "./SendAudio";
import SendVideo from "./SendVideo";



const AttachFrom = ({style,addNewMessage}) => {
    
    const[visiblePicture,setVisiblePicture] = useState(false)
    const[visibleAudio,setVisibleAudio] = useState(false)
    const[visibleVideo,setVisibleVideo] = useState(false)
    const [blockModal,setBlocModal] = useState(false)
    
    
    return (
        <div className="attach-form" style={style}>
            <MyModal visible={visiblePicture} setVisible={setVisiblePicture}>
                <SendImageInput setVisible={setVisiblePicture} addNewMessage={addNewMessage}/>
            </MyModal>
            <MyButton  onClick={e=>setVisiblePicture(true)}
                className="attach-btn" id="image" icon ={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path
                        d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                </svg>
            }/>
            <MyModal visible={visibleAudio} setVisible={blockModal}>
                <SendAudio addNewMessage={addNewMessage} setVisible={setVisibleAudio}/>
            </MyModal>
            
            <MyButton  onClick={e=>setVisibleAudio(true)}
                className="attach-btn" id="audio"  icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-mic-fill" viewBox="0 0 16 16">
                    <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                    <path
                        d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                </svg>}/>
            
            <MyModal visible={visibleVideo} setVisible={setVisibleVideo}>
                <SendVideo setVisible={setVisibleVideo} addNewMessage={addNewMessage}/>
            </MyModal>
            
            <MyButton  onClick={e=>setVisibleVideo(true)}
                className="attach-btn" id="video" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-camera-video-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
                </svg>}/>
            
        </div>
    );
};

export default AttachFrom;