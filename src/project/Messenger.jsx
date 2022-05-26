import React, {useContext, useEffect, useMemo} from 'react';
import UpLeftRow from "./Up-left-row";
import ContactList from "./ContactList";
import Chat from "./Chat";
import {useState} from "react";
import {AuthContext, userContext} from "./Contex";
import logo from './startPages/logo.png';
import { HubConnectionBuilder } from '@microsoft/signalr';




const Messenger = ({username}) => {
   
    const {server} = useContext(AuthContext)
    const token  = localStorage.getItem("token")
    
    const[render,setRender]=useState({change: false});
    const [chatId,setChatId] = useState(0)
    
    const {logOut} = useContext(AuthContext);

    const [hubCx, setHubCx] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
   
   
     function signal() {
         setRender({change: !render.change})
     }
    useEffect(() => {
        (async () => {
            const newConnection = new HubConnectionBuilder()
                .withUrl("https://" + server +"/chathub") // Ensure same as BE
                .withAutomaticReconnect()
                .build();
            await newConnection.start();
            
            newConnection.on('ReceiveMessage', signal);
            await newConnection.invoke("JoinGroup",username)
            setHubCx(newConnection);
        })(); 
    }, [])
    
    function convertContacts(data){
        const array = [];
        for (const element of data) {
            array.push({
                username: element.id,
                nickname: element.name,
                last: element.last,
                lastdate: convertTime(element.lastdate),
                photo:{url:''},
                server: element.server
            })
        }
        return array;
    }

    
    
    useEffect(  () => {
        async function get()  {
            try {
                const address = "https://" + server + "/api/contacts/"
                const cont = await fetch(address, {headers:{
                    Authorization: "Bearer " + token
                }});
                const data = await cont.json();
                await setContacts(convertContacts(data))
            } catch (e) {
                console.log("Error")
            }
        }
         get();
    },[render]);

    
    function convertTime(time){
        if (time === null)
            return time
        let slash = time.replace('T', " ");
        const words = slash.split('.')
        return words[0]
    }
    
    function convertMessages(data){
        const array = [];
        for (const element of data) {
            array.push({
                id: element.id,
                body: element.content,
                created: convertTime(element.created),
                sent : element.sent,
                type : 'text'
            })
        }
        return array;
    }
    
    useEffect( () => {
        async  function  getMessages() {
         
                try {
                    const address = "https://" + server + "/api/contacts/"+
                        contacts[chatId].username + "/messages/"
                    const cont = await fetch(address,{headers:{
                            Authorization: "Bearer " + token
                        }});
                    if (cont.status === 401){
                        logOut()
                    }
                    const data = await cont.json();
                    await setMessages(convertMessages(data))
                } catch (e) {
                    
                }
            
        }
         getMessages();
    },[contacts, chatId]);
    
    
    const changeChat = (find) => {
        const index = contacts.map(object => object.username).indexOf(find);
        setChatId(index)
    }
    
    const addContact  = async (contact) => {
            const req_str = "https://" + server + "/api/contacts/";
            const res = await fetch(req_str, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify(contact)
            });
            if (res.status === 401){
                logOut()
            }
            setRender({change: !render.change})
    }
    
    
    
    const addMessage = async (body, type) => {
        try{
            const req_str = "https://" + server + "/api/contacts/" + contacts[chatId].username
                + "/messages/"
            const res = await fetch(req_str, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    "content": body
                })
            });
            if (res.status === 401){
                logOut()
            }
        } catch (e){
            console.log("Error");
        }
        setRender({change: !render.change})
    }
    
    const [search,setSearch]=useState('')
    
    
    const searchedContacts = useMemo(()=>{
        return contacts.filter(contact => contact.nickname.toLowerCase().includes(search))
    },[search,contacts])
    
    return (
        
        <userContext.Provider value={
            {contacts:contacts, setContacts:setContacts,newMes:render,setNewMes:setRender, username:username}
        }>
            <div className="row">
                <div className="col-md-4 d-none d-md-block">
                    <UpLeftRow addContact={addContact} setSearch={setSearch}/>
                    <div className="contacts-list"  style={{marginTop:'40px'}}>
                        <ContactList  changeChat={changeChat} contacts={searchedContacts}/>
                    </div>
                </div>
                {
                    contacts.length ?
                        < Chat messages={messages} addMessage={addMessage} person={contacts[chatId]}/>
                        :
                        <div className="col-md-8">
                            <div className="container  text-center text-white" >
                                <img src={logo}  className="logo" alt='logo' style={{width:'125px'}}/>
                                <h1>You don't have chat yet</h1>
                            </div>
                        </div>
                }
            </div>
        </userContext.Provider>
        
    );
};



/*

<UpLeftRow />



 */
export default Messenger;

    