import React from "react";
import "./bootstrap.min.css"
import "./App.css"
import Audio from './project/bensound-cute.mp3'
import Image from './project/ceH-HBO6KwI.jpg'
import Video from './project/Every programming tutorial.mp4'
import {BrowserRouter} from "react-router-dom";
import Echo from "./project/Echo";




function App() {
    
    return (
        <BrowserRouter>
                <Echo/>
        </BrowserRouter>
      
    );
    
    
}

export default App;

