import React from 'react';
import avatar from "./avatar1.png"
import './FriendInfo.css'



const FriendInfo = ({name,photo}) => {
    
    var img = photo.url;
    if (img === '')
        img = avatar
    
    return (
        <div className="row-2 top-row">
            <div className="friend-info">
                <img src={img} alt="Avatar" className="avatar"/>
                <span>{name}</span>
            </div>
            
        </div>
    );
};

export default FriendInfo;