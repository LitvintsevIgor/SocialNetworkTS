import {ActionsTypes, DialogsPageType, MessageType} from "./state";


const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

export type DialogsActionsTypes = ReturnType<typeof AddMessageActionCreator>
    | ReturnType<typeof UpdateNewMessageTextActionCreator>

export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageType = {
                id: new Date().getTime(),
                message: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ""
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText
            return state
        default:
            return state
    }
}

export const AddMessageActionCreator = (newMessageText: string) => ({
    type: ADD_MESSAGE,
    newPost: newMessageText
}) as const
export const UpdateNewMessageTextActionCreator = (newText: string) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText: newText
}) as const