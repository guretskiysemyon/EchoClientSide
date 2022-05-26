import React from 'react';
import {useRef, useState} from "react";
import MyButton from "./Components/MyButton";

const SendVideo = ({addNewMessage,setVisible}) => {

    const [video,setVideo] = useState({url:''})

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setVideo({url: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])

    };


    const sendUrl = (e) => {
        e.preventDefault()
        if (video.url !== '')
            addNewMessage(video.url,'video')
        setVisible(false)
        setVideo({url:''})
        ref.current.value = null;
    }


    const ref = useRef();

    /*
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
   */
    return (
        <div>
                <input id="videoPicker" ref={ref}
                    type="file" accept="video/*"
                    name="video-upload" onChange={imageHandler} />
          

            <MyButton className="btn btn-outline-dark" id="video" onClick={sendUrl}
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-send" viewBox="0 0 16 16">
                    <path
                        d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>} />
        </div>
    );
};


export default SendVideo;
