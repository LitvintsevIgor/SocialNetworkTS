import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import {StoreType} from "../../redux/store";
import {AddMessageActionCreator, UpdateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import {Store} from "redux";
import {AllAppStateType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";



type DialogsPropsType = {
    // state: AllAppStateType
    // dispatch: (actions: any)=> void
    store: Store
}

export function DialogsContainer(props: DialogsPropsType) {

    let state = props.store.getState().dialogsPage;

    // let dialogsElements = props.state.dialogsPage.dialogs
    //     .map((d) => <DialogItem id={d.id} name={d.name}/> )
    //
    // let messagesElements = props.state.dialogsPage.messages
    //     .map((m) => <Message id={m.id} message={m.message}/>)


    const onSendMessageClick = () => {
        props.store.dispatch(AddMessageActionCreator(state.newMessageText))
    }

    let onMessageChange = (text: string) => {
        props.store.dispatch(UpdateNewMessageTextActionCreator(text))
    }

    return (
        <Dialogs updateNewMessageText={onMessageChange}
                 sendMessage={onSendMessageClick}
                 dialogsPage={state}
        />
    )
}