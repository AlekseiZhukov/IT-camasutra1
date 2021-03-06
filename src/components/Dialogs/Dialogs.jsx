import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import AddMessageFormRedux from "./AddMessageForm/AddMessageForm";
//import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";



const Dialogs = (props) => {

    const dialog = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    const message = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);

    //const addMessage = () => props.addMessage();

    /*const onMessageChange = (event) => {
        let textMessage = event.target.value;
        props.onMessageChange(textMessage);
    }*/
    const addNewMessage = (value) => {
        props.addMessage(value.newMessageBody);

    }

    if (!props.isAuth) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialog}
                </div>
                <div className={s.messages}>
                    <div>{message}</div>
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs