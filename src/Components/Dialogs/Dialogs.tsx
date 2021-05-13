import React from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {InitialStateType} from "../../redux/dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


export type DialogsPropsType = {
    dialogsPage: InitialStateType
    updateNewMessageText: (text: string) => void
    sendMessage: (newMessageBody: string) => void
    isAuth: boolean

}

export function Dialogs(props: DialogsPropsType) {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs
        .map((d) => <DialogItem key={d.id} id={d.id} name={d.name}/>)

    let messagesElements = state.messages
        .map((m) => <Message key={m.id} id={m.id} message={m.message}/>)


    let addNewMessage = (values: AddMessageFormType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

type AddMessageFormType = {
    newMessageBody: string
}

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={"Enter your message"}
                      name={"newMessageBody"}
                      component={"textarea"}/>
            <div>
                <button>Sent message</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<AddMessageFormType>({
    // a unique name for the form
    form: 'dialogAddMessageForm'
})(AddMessageForm)