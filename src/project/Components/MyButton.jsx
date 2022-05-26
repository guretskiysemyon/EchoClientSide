import React from 'react';

const MyButton = ({icon,children,...props}) => {
    return (
        <button {...props} >
            {children}
            {icon}
        </button>
    );
};

export default MyButton;