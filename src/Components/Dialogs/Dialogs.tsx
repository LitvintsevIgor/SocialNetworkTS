import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import {StoreType} from "../../redux/store";
import {AddMessageActionCreator, UpdateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import {Store} from "redux";
import {AllAppStateType} from "../../redux/redux-store";



type DialogsPropsType = {
    state: AllAppStateType
    dispatch: (actions: any)=> void
}

export function Dialogs(props: DialogsPropsType) {


    let dialogsElements = props.state.dialogsPage.dialogs
        .map((d) => <DialogItem id={d.id} name={d.name}/> )

    let messagesElements = props.state.dialogsPage.messages
        .map((m) => <Message id={m.id} message={m.message}/>)


    const addMessage = () => {
        props.dispatch(AddMessageActionCreator(props.state.dialogsPage.newMessageText))
    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(UpdateNewMessageTextActionCreator(e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
                <textarea onChange={onMessageChange}
                          value={props.state.dialogsPage.newMessageText}
                          placeholder={"Enter your message"}
                />
                <div>
                    <button onClick={addMessage} >Sent message</button>
                </div>

            </div>
        </div>
    )
}