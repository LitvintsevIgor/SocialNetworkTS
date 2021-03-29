const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

export type DialogsActionsTypes = ReturnType<typeof AddMessageActionCreator>
    | ReturnType<typeof UpdateNewMessageTextActionCreator>


export type DialogsType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

export type InitialStateType = typeof initialState

let initialState = {
    dialogs: [
        {id: 1, name: "Петя"},
        {id: 2, name: "Ваня"},
        {id: 3, name: "Маня"},
        {id: 4, name: "Миша"},
        {id: 5, name: "Коля"},
    ] as DialogsType[] ,
    messages: [
        {id: 1, message: "Привет, как дела?"},
        {id: 2, message: "Хехей!"},
        {id: 3, message: "Как твой прогресс?"},
        {id: 4, message: "Какую музыку случаешь?"},
        {id: 5, message: "Как твоя собака?"},
    ] as MessageType[],
    newMessageText: ""
}

export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsTypes): InitialStateType  => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageType = {
                id: new Date().getTime(),
                message: state.newMessageText
            }
            // state.messages.push(newMessage)
            // state.newMessageText = ''
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ""
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            // state.newMessageText = action.newMessage
            return {
                ...state,
                newMessageText: action.newMessage
            }
        default:
            return state
    }
}
type AddMessageType = {
    type: typeof ADD_MESSAGE
}
export const AddMessageActionCreator = () : AddMessageType => ({
    type: ADD_MESSAGE
}) as const

type UpdateNewMessageTextType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT
    newMessage: string
}

export const UpdateNewMessageTextActionCreator = (newText: string) : UpdateNewMessageTextType => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessage: newText
}) as const
