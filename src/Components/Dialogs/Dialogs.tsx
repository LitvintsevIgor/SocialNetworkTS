import React from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";

export function Dialogs() {

    let dialogs = [
        {id: 1, name: "Петя"},
        {id: 2, name: "Ваня"},
        {id: 3, name: "Маня"},
        {id: 4, name: "Миша"},
        {id: 5, name: "Кола"},
    ]

    let messages = [
        {id: 1, message: "Привет, как дела?"},
        {id: 2, message: "Хехей!"},
        {id: 3, message: "Как твой прогресс?"},
        {id: 4, message: "Какую музыку случаешь?"},
        {id: 5, message: "Как твоя собака?"},
    ]

    let dialogsElements = dialogs
        .map((d) => <DialogItem id={d.id} name={d.name}/> )

    let messagesElements = messages
        .map((m) => <Message id={m.id} message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
            </div>
        </div>
    )
}