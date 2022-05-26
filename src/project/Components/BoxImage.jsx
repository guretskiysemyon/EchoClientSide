import React from 'react';
import './BoxMessage.css'

const BoxImage = ({date,side,url,time}) => {
    var style= ["box-message"]

    if (side === 'right')
        style.push('right')
    else
        style.push('left')

    const cl = style.join(' ')
    return (
        <div className={cl}>
            <img  src={url} alt="" id="img" className="img" />
            <div id="time">{date}</div>
        </div>
    );
};

export default BoxImage;