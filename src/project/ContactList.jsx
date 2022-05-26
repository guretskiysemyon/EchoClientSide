import React from 'react';
import ContactItem from "./ContactItem";

const ContactList = ({contacts, changeChat}) => {
    if (!contacts.length){
        return (
            <h1 style={{textAlign:'center'}}>
                Not found
            </h1>
        )
    }
    
    return (
        <div>
            {contacts.map((person)=>
                <ContactItem key={person.username}  changeChat={changeChat} data={person}/>)}
        </div>
    );
};

export default ContactList;