import React, {useContext} from 'react';
import FriendInfo from "./FriendInfo";
import MessageList from "./Components/MessageList";
import SendMessageFrom from "./SendMessageForm";
import {useState} from "react";
import {AuthContext, userContext} from "./Contex";
import {useEffect} from "react";
import MyButton from "./Components/MyButton";
import MyModal from "../MyModal";


const Chat = ({messages,person,addMessage}) => {
    
    const {logOut} = useContext(AuthContext)
    const {username} = useContext(userContext)
    const [msgBox,setMsgBox] = useState('');
    const [err,setErr] = useState(false)

    function Err(msg) {
        setMsgBox(msg)
        setErr(true)
    }
    function closeMsgBox(e){
        e.preventDefault()
        setMsgBox('');
        setErr(false);
    }
    
    const addNewMessage = async (body, type) => {
      try {
          const req_trans = "https://" + person.server + "/api/transfer"
          const res_trans = await fetch(req_trans, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  "from": username,
                  "to": person.username,
                  "content": body
              })
          });
          addMessage(body,type)
      } catch (e) {
          Err("We could not get server of this person. Try later")
      }
    }
    
    
    
    return (
        <div className="col-md-8">
            <FriendInfo name={person.nickname} photo={person.photo} />
            <div className="row-10  chat-window">
                <div className="message-window" >
                    <MessageList  messages={messages}/>
                </div>
                <div className="bottom-row">
                    <SendMessageFrom addMessage={addNewMessage}/>
                </div>
            </div>
            <MyModal id='msgBox' visible={err} setVisible={setErr}>
                <div  className="container-fluid align-text-center">{msgBox}</div>
                <MyButton id='ok-but' className='btn-start' onClick={e=>closeMsgBox(e)}>Ok</MyButton>
            </MyModal>
        </div>
    );
};

export default Chat;