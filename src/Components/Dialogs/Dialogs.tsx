import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Dialogs.module.css"


type DialogItemPropsType = {
    id: number,
    name: string
}

function DialogItem(props: DialogItemPropsType) {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
};

type MessagePropsType = {
    message: string
}

function Message(props: MessagePropsType) {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
}


export function Dialogs() {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name={"Петя"} id={1}/>
                <DialogItem name={"Ваня"} id={2}/>
                <DialogItem name={"Маня"} id={3}/>
                <DialogItem name={"Миша"} id={4}/>
                <DialogItem name={"Кола"} id={5}/>
            </div>
            <div className={s.messagesItems}>
                <Message message={"Привет, как дела?"}/>
                <Message message={"Хехей!"}/>
                <Message message={"Как твой прогресс?"}/>
                <Message message={"Какую музыку случаешь?"}/>
                <Message message={"Как твои животные?"}/>
            </div>
        </div>
    )
}