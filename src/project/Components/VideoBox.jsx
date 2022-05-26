import React from 'react';
import './BoxMessage.css'

const VideoBox = ({date,side,url,time}) => {
    var style= ["box-message"]

    if (side === 'right')
        style.push('right')
    else
        style.push('left')

    const cl = style.join(' ')

    return (
        <div className={cl}>
            <video className={cl} controls width='380' >
                <source src={url} />
            </video>
            <div id="time">{date}</div>
        </div>
    );
};

export default VideoBox;