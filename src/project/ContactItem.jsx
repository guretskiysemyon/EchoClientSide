import React from "react";
import avatar from './avatar1.png'
import './ContactItem.css'


const ContactItem = ({data,changeChat}) => {
    
    const handleClick = () => {
        changeChat(data.username)
    }
    
    //var last = data.chat.length;
    var lastMes = "";

    var date =""
  
        if ( data.last !== null){
            lastMes=data.last;
            date= data.lastdate;
        }
        

    
    /*
    var date =""
    if (last){ 
        if ( data.chat[last-1].type === 'text'){
            lastMes=data.chat[last-1].body
        } else {
            lastMes=data.chat[last-1].type + ' was sent'
        }
        date= data.chat[last-1].date + '/' + data.chat[last-1].time
       
    }
    */
    var img = data.photo.url
    if (img === '')
        img = avatar
            
 
    return (
        <div className="ContactItem" onClick={handleClick}>
            <div className="col-3">
                <img className="avatar" src={img} alt={"avatar"}/>
            </div>
            <div className="col-8">
                <div className="person-name"> {data.nickname}</div>
                <div/>
                <div>{lastMes}  {date}</div>
            </div>
        </div>
    );
};

export default ContactItem