import React, {useState} from 'react';
import {Routes,Navigate, useNavigate} from "react-router";
import { Route} from "react-router-dom";
import StartPage from "./startPages/StartPage";
import LogIn from "./startPages/LogIn";
import SignUp from "./startPages/SignUp";
import Messenger from "./Messenger";
import {AuthContext} from "./Contex";




const Echo = ({userData}) => {

    
    //Put your server here
    const server = "localhost:7099"

    const [isAuth,setIsAuth] = useState(false)
    const [user,setUser] = useState('');
   
    const navigate = useNavigate();
    
    let logOut = (e) => {
        e.preventDefault()
        localStorage.clear()
        setUser('')
        navigate('/echo/log-in')
    }
    return (
        <AuthContext.Provider 
                    value={{
                        isAuth: isAuth,
                        setIsAuth: setIsAuth,
                        logOut: logOut,
                        server: server
                    }}>
            
            <Routes>
                <Route exact path='/echo/chats' element={<Messenger username={user}/>}/>
                <Route path='/' element={<StartPage/>}/>
                <Route path='/echo/log-in' element={<LogIn setUser={setUser} userData={userData}/>}/>
                <Route path='/echo/sign-up' element={<SignUp userData={userData}/>}/>
                <Route path='/*' element={<Navigate to="/" replace />}/>
            </Routes>
            
        </AuthContext.Provider>
           
            
            
        
    );
};

export default Echo;