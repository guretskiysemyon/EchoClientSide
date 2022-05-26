import React, {useContext, useState} from 'react';
import MyInput from "./Components/MyInput";
import MyButton from "./Components/MyButton";
import {AuthContext, userContext} from "./Contex";
import MyModal from "../MyModal";



const AddContactForm = ({addContact,setVisible}) => {
    
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [newContServer, setNewContServer] = useState('');
    const {server} = useContext(AuthContext)
    const {contacts,username} = useContext(userContext)
   
    
    const [msgBox,setMsgBox] = useState('');
    const [err,setErr] = useState(false)
    
    function Err(msg) {
        setMsgBox(msg)
        setErr(true)
    }
    
    function isAlreadyHas(arr, string){
        var x = false;
        arr.forEach(element => {
            if (element.username === string)
                x = true
        })
        return x
    }
    
    const InvitationsReq = async () =>{
        try {
           
            const req_inv = "https://" + newContServer + "/api/invitations/";
            const res_inv = await fetch(req_inv, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "from": username,
                    "to": id,
                    "server": server
                })
            });
            if (res_inv.status === 201 ||
                res_inv.status === 200) {
                addContact({
                    id: id,
                    server: newContServer,
                    name: name
                })
                setId('')
                setVisible(false)
            } else {
                Err("We could not find this user on this server")
            }
        } catch (e) {
            Err("We could not find this user on this server")
        }
    }
    const addNewContact = async (e) => {
        e.preventDefault()
        if (name ==='' || newContServer === ''
                        || id===''){
            Err("Fill all fields, please");
        }
         else if(isAlreadyHas(contacts, id)) {
            Err('You already have friend with this username')
        } else if (id === username) {
            Err('You cannot add yourself')
        } else {
            await InvitationsReq();
        }
        setId('')
        setName('')
        setNewContServer('')
    }
    
    function closeMsgBox(e){
        e.preventDefault()
        setMsgBox('');
        setErr(false);
    }
    return (
        <div>
            <form>
                <MyInput value={id} onChange={e=> setId(e.target.value)} placeholder="Username"
                         style={ {background :'white', color: 'black'}} type="text"/>
                <MyInput value={name} onChange={e=> setName(e.target.value)} placeholder="Name"
                         style={ {background :'white', color: 'black'}} type="text"/>
                <MyInput value={newContServer} onChange={e=> setNewContServer(e.target.value)} placeholder="Server"
                         style={ {background :'white', color: 'black'}} type="text" />
                <MyButton onClick={addNewContact}>Add new Contact</MyButton>
                <MyModal id='msgBox' visible={err} setVisible={setErr}>
                    <div  className="container-fluid align-text-center">{msgBox}</div>
                    <MyButton id='ok-but' className='btn-start' onClick={e=>closeMsgBox(e)}>Ok</MyButton>
                </MyModal>
            </form>
        </div>
    );
};

export default AddContactForm;