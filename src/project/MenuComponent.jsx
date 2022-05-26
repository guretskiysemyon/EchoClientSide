import React from 'react';
import MyInput from "../MyInput";

const MenuComponent = () => {
    return (
        <div>
            <p className="text-center">
                Chats
            </p>
            
            <div className=" input-group search mb-3 justify-content-center flex-nowrap mx-auto">
                <MyInput type="text"  className="form-control-sm" placeholder="Search"
                       />
            </div>
        </div>
    );
};

export default MenuComponent;