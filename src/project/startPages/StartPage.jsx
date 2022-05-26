import React from 'react';
import image from './start-img.jpg'
import {Link} from "react-router-dom";
import MyButton from "../Components/MyButton";
import './StartPage.css'


const StartPage = () => {
    return (
        <div className="container-fluid start-page">
            <div className="row h-auto ">
                <div className="col col-2 align-right">
                    <MyButton type="button" className="btn btn-sgn-up">
                        <Link to="/echo/sign-up">Sign Up</Link>
                    </MyButton>
                </div>
                <div className="col col-8 justify-content-center">
                    <img className="mx-auto d-block" src={image} alt="start-phone"/>
                </div>
                <div className="col col-2  align-left">
                    <MyButton type="button" className="btn  btn-log-in">
                        <Link to="/echo/log-in">Log In</Link>
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export default StartPage;