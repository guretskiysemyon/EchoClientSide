import React, {useContext} from 'react';
import logo from './logo.png'
import MyInput from "../Components/MyInput";
import {Link} from "react-router-dom";
import MyButton from "../Components/MyButton";
import {useState} from "react";
import MyModal from "../../MyModal";
import {useNavigate} from "react-router";
import {AuthContext} from "../Contex";
import './LogIn.css'





const LogIn = ({setUser}) => {

    const {server,setIsAuth} = useContext(AuthContext)
    const server_feedback = "localhost:5099"
    const[userName,setUserName] = useState('')

    const[password,setPassword] = useState('')

    const[msgBox,setMsgBox] = useState('');

    const [visible,setVisible] = useState(false)
    
    const navigate=useNavigate();

    function Err(msg) {
        setMsgBox(msg)
        setVisible(true)
    }

    async function logIn() {
        //check empty nickname field  
        if (userName === "") {
            Err("Fill the first name");
            return;
        }

        //check empty password field  
        if (password === "") {
            Err("Fill the password please!");
            return;
        }
        
        const address = "https://" + server + "/api/User/"
        const req = await fetch(address, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": userName,
                "password":password
            })
        })
        
        if (req.status === 404 || req.status === 400){
            Err("One of the fields is wrong or user is not registered.")
            return;
        } 
        const token = await req.text();
        localStorage.setItem("token",token)
        setIsAuth(true)
        setUser(userName)
        navigate('/echo/chats')

    }
    function closeMsgBox(){
        setMsgBox('');
        setVisible(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = "http://" + server_feedback + "/";
    }
    
    return (
        <div className="body">
            
            <div className="row">
                <div className="bar">
                    <img className="logo" src={logo} alt='logo'/>
                </div>
            </div>
            <div className="row form justify-content-center">
                <div className="form-content-log  col-md-4 border border-dark">
                    <div className="mb-3">
                        <MyInput  value={userName} onChange={e=> setUserName(e.target.value)}
                            type="text" className="form-control" id="inputUser" placeholder="username@"/>
                    </div>
                    <div className="mb-3">
                        <MyInput value={password} onChange={e=> setPassword(e.target.value)}
                            type="password" className="form-control" id="inputPassword" placeholder="password"/>
                    </div>
                    <div className=" text-center">
                        <MyButton  onClick={logIn}
                            type="button"  className="btn-log">Log In</MyButton>
                    </div>
                </div>
                <div className="another-options text-center text-decoration-underline">
                    <p>
                        <Link to="/echo/sign-up">Doesn't have accaunt?</Link>
                    </p>
                    <p>
                        <MyButton className="btn-start" type="submit" value="Submit" onClick={handleSubmit}>
                            Give us your feedback!
                        </MyButton>
                    </p>
                </div>
            </div>

            <MyModal id='msgBox' visible={visible} setVisible={setVisible}>
                <div  className="container-fluid align-text-center">{msgBox}</div>
                <MyButton id='ok-but' className='btn-start' onClick={e=>closeMsgBox()}>Ok</MyButton>
            </MyModal>
        </div>
    );
};
        
export default LogIn;