import React, {TextareaHTMLAttributes} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import {DialogsPageType} from "./../../redux/state";


type DialogsPropsType = {
    state: DialogsPageType
}

export function Dialogs(props: DialogsPropsType) {
    let dialogsElements = props.state.dialogs
        .map((d) => <DialogItem id={d.id} name={d.name}/> )

    let messagesElements = props.state.messages
        .map((m) => <Message id={m.id} message={m.message}/>)

    let newMessageElement = React.createRef<HTMLTextAreaElement>();

    const addMessage = () => {
        let text = newMessageElement.current
        if (text) {
            alert(text.value)
        }
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
                <textarea ref={newMessageElement}></textarea>
                <div>
                    <button onClick={addMessage} >Sent message</button>
                </div>

            </div>
        </div>
    )
}