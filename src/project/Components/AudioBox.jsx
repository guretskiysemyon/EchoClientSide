import React from 'react';
import './BoxMessage.css'

const AudioBox = ({date,side,url,time}) => {
    var style= ["box-message"]

    if (side === 'right')
        style.push('right')
    else
        style.push('left')

    const cl = style.join(' ')

    return (
        <div className={cl}>
            <audio controls src={url}/>
            <div id="time">{date}</div>
        </div>
    );
};

export default AudioBox;