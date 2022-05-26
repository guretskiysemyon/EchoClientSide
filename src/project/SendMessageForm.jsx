import React from 'react';
import MyInput from "./Components/MyInput";
import MyButton from "./Components/MyButton";
import {useState} from "react";
import './SendMessageForm.css'
import AttachFrom from "./AttachFrom";



const SendMessageFrom = ({addMessage}) => {
    
    const [buf,setBuf] = useState('');
    
    
    const  addNewMessage = (body,type) =>{
        addMessage(body,type)
    }
    
    const createNewTextMessage = async (e) => {
        e.preventDefault()
        if (buf === "")
            return
        
        addNewMessage(buf,'text')
        setBuf('')
    }

    const [visible,setVisible] = useState({display:"none"});

    const makeVisible = (e) => {
        e.preventDefault()
        if (visible.display==="block")
            setVisible({display: "none"})
        else
            setVisible({display: "block"})
    }
    
    return (
        
        <div className="row-2 align-self-center bottom-chat">
            <AttachFrom style={visible} addNewMessage={addNewMessage}/>
            <MyButton className="chat-button chat-button" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-paperclip" viewBox="0 0 16 16">
                    <path
                        d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                </svg>
            } onClick={makeVisible}/>
            
            <MyInput id="chat-input" type="text" placeholder="Send message" autoComplete="off"
                     value={buf} onChange={e=> setBuf(e.target.value)}   />
            
            <MyButton className="chat-button" 
                icon={  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-send" viewBox="0 0 16 16">
                    <path
                        d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>}
                onClick={createNewTextMessage}/>

        </div>
        
       
         
    );
};

export default SendMessageFrom;