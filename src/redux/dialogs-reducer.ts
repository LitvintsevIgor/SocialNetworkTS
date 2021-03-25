import {DialogsPageType, MessageType} from "./store";

const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

export type DialogsActionsTypes = ReturnType<typeof AddMessageActionCreator>
    | ReturnType<typeof UpdateNewMessageTextActionCreator>

export type InitialStateType = typeof initialState

let initialState = {
    dialogs: [
        {id: 1, name: "Петя"},
        {id: 2, name: "Ваня"},
        {id: 3, name: "Маня"},
        {id: 4, name: "Миша"},
        {id: 5, name: "Коля"},
    ],
    messages: [
        {id: 1, message: "Привет, как дела?"},
        {id: 2, message: "Хехей!"},
        {id: 3, message: "Как твой прогресс?"},
        {id: 4, message: "Какую музыку случаешь?"},
        {id: 5, message: "Как твоя собака?"},
    ],
    newMessageText: ""
}

export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsTypes): InitialStateType  => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageType = {
                id: new Date().getTime(),
                message: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText
            return state
        default:
            return state
    }
}
type AddMessageType = {
    type:typeof ADD_MESSAGE
    newPost:string
}
export const AddMessageActionCreator = (newMessageText: string) : AddMessageType => ({
    type: ADD_MESSAGE,
    newPost: newMessageText
}) as const

type UpdateNewMessageTextType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT
    newMessageText: string
}

export const UpdateNewMessageTextActionCreator = (newText: string) : UpdateNewMessageTextType => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText: newText
}) as const