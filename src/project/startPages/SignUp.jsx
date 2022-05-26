import React, {useContext, useState} from 'react';
import logo from './logo.png'
import MyInput from "../Components/MyInput";
import MyButton from "../Components/MyButton";
import {Link} from "react-router-dom";
import './bootstrap.min.css'
import MyModal from "../../MyModal";
import {useNavigate} from "react-router";
import {useRef} from 'react';
import './SignUp.css'
import {AuthContext} from "../Contex";

const SignUp = ({userData}) => {
    
    const[userName,setUserName] = useState('')
    const[nickName,setNickName] = useState('')
    const[password,setPassword] = useState('')
    const[pasValidation,setPasValidation] = useState('')
    const [image,setImage] = useState({url:''})
    const {server} = useContext(AuthContext)
    const[msgBox,setMsgBox] = useState('');
    
    const [visible,setVisible] = useState(false)
    const navigate=useNavigate();

    
    function Err(msg) {
        setMsgBox(msg)
        setVisible(true)
    }


    async function signUp(e) {
        //collect form data in JavaScript variables  
        e.preventDefault()

        //check empty user user field  
        if (userName === "") {
            Err("Fill the user name.");
            return;
        }
        if (nickName === "") {
            Err("Fill the nickname");
            return;
        }

        //check empty password field  
        if (password === "" || pasValidation === "") {
            Err("Fill the password please!");
            return;
        }
        
        let checkPas = checkPassword(password, pasValidation);

        if (checkPas !== true) {
            Err(checkPas)
            return;
        }


        const address = "https://" + server + "/api/User/signup"
        const req = await fetch(address, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": userName,
                "password":password,
                "name": nickName
            })
        })
        
        if (req.status !== 200 || req.status !== 201){
            Err("Something went wrong")
        }
             
        
        setImage('')
        setUserName('')
        setPassword('')
        setPasValidation('')
        setNickName('')
        
        navigate('/echo/log-in')
        // window.location.replace("Login.html");
        //check empty first nickname field

    }

    function checkPassword(pw, pw2){
        if(!(/\d/.test(pw)))
            return "Password has to include digits and letters."
        if(!(/[a-zA-Z]/.test(pw)))
            return "Password has to include digits and letters."
        if (pw !== pw2)
            return "Passwords doesn't match."
        return true;
    }
    
    function closeMsgBox(){
        setMsgBox('');
        setVisible(false);
    }


    const ref = useRef();
    
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setImage({url: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])

    };
    
    return (
        <div className='body'>
            <div className="row">
                <div className="bar">
                    <img className="logo" src={logo} alt='logo'/>
                </div>
            </div>
            <div className="row form justify-content-center">
                <div className="form-content sign-up-form col-md-4 border border-dark">
                    <div className="mb-3">
                        <MyInput value={userName} onChange={e=> setUserName(e.target.value)}
                            type="text" id="username" className="form-control" placeholder="username@"/>
                    </div>
                    <div className="mb-3">
                        <MyInput value={nickName} onChange={e=> setNickName(e.target.value)}
                            type="text" id="nickname" className="form-control" placeholder="Nickname"/>
                    </div>
                    <div className="mb-3">
                        <MyInput value={password} onChange={e=> setPassword(e.target.value)}
                            type="password" id="password" className="form-control" placeholder="password"/>
                    </div>
                    <div className="mb-3">
                        <MyInput value={pasValidation} onChange={e=> setPasValidation(e.target.value)}
                            type="password" id="check-pswrd" className="form-control"
                                 placeholder="repeat your password"/>
                    </div>
                    <div className=" text-center">
                        <input  id="acc-img" ref={ref}
                                type="file" accept="image/*"
                                name="image-upload" onChange={imageHandler}/>
                    </div>
                    
                    
                    <div className=" text-center">
                        <MyButton type="button" id="btn" onClick={signUp} className="start-but">Sign Up</MyButton>
                    </div>
                </div>
                <div className="another-options text-center text-decoration-underline">
                    <p>
                        <Link to="/echo/log-in">Have an account?</Link>
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

export default SignUp;