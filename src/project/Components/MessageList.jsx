import React from 'react';
import BoxMessage from "./BoxMessage";
import BoxImage from "./BoxImage";
import AudioBox from "./AudioBox";
import VideoBox from "./VideoBox";



const MessageList = ({messages}) => {
    
    
    if (!messages.length){
        return (
            <h1 style={{
                textAlign:'center',
                color: "white",
                marginTop :'100px',
                fontFamily: "Lucida Console"}}>
               There is no messages yet.
            </h1>
        )
    }
    
    function WhichSide(message){
        if (message.sent)
            return 'right'
        return 'left'
    }
    
    return (
        <div>
            {messages.map((message)=>{
                
                if (message.type === 'text')
                    return <BoxMessage side={WhichSide(message)} key={message.id} 
                                       body={message.body} date={message.created}/>;
                if (message.type === 'img')
                    return <BoxImage side={WhichSide(message)} key={message.id}
                                     url={message.body}  date={message.created} />;
                if (message.type === 'audio')
                    return <AudioBox side={WhichSide(message)} key={message.id} 
                                     url={message.body} date={message.created} /> 
                if (message.type === 'video')
                    return <VideoBox side={WhichSide(message)} key={message.id} 
                                     url={message.body}  date={message.created} />
            })}
        </div>
    );
};

export default MessageList;