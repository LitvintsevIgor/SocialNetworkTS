import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import {InitialStateType} from "../../redux/dialogs-reducer";
import { Redirect } from "react-router-dom";




export type DialogsPropsType = {
    // state: AllAppStateType
    // dispatch: (actions: any)=> void
    dialogsPage: InitialStateType
    updateNewMessageText: (text: string) => void
    // sendMessage: (newMessageText: string) => void
    sendMessage: () => void
    // updateNewMessageText: (text: string) => void
    isAuth: boolean

}

export function Dialogs(props: DialogsPropsType) {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs
        .map((d) => <DialogItem key={d.id} id={d.id} name={d.name}/> )

    let messagesElements = state.messages
        .map((m) => <Message key={m.id} id={m.id} message={m.message}/>)


    const addMessage = () => {
        props.sendMessage();
        // props.dispatch(AddMessageActionCreator(props.state.dialogsPage.newMessageText))
    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value);
        // props.dispatch(UpdateNewMessageTextActionCreator(e.currentTarget.value))
    }

    // if (!props.isAuth) return <Redirect to={"/login"}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
                <textarea onChange={onMessageChange}
                          value={state.newMessageText}
                          placeholder={"Enter your message"}
                />
                <div>
                    <button onClick={addMessage} >Sent message</button>
                </div>

            </div>
        </div>
    )
}