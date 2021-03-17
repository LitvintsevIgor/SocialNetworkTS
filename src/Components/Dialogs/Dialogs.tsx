import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import store, {StoreType} from "./../../redux/state";
import {AddMessageActionCreator, UpdateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";



type DialogsPropsType = {
    store: StoreType
}

export function Dialogs(props: DialogsPropsType) {

    let state = props.store.getState()

    let dialogsElements = state.dialogsPage.dialogs
        .map((d) => <DialogItem id={d.id} name={d.name}/> )

    let messagesElements = state.dialogsPage.messages
        .map((m) => <Message id={m.id} message={m.message}/>)


    const addMessage = () => {
        store.dispatch(AddMessageActionCreator(state.dialogsPage.newMessageText))
    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        store.dispatch(UpdateNewMessageTextActionCreator(e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
                <textarea onChange={onMessageChange}
                          value={state.dialogsPage.newMessageText}
                          placeholder={"Enter your message"}
                />
                <div>
                    <button onClick={addMessage} >Sent message</button>
                </div>

            </div>
        </div>
    )
}