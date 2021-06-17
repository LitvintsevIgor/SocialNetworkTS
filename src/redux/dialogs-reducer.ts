const ADD_MESSAGE = "DIALOGS/ADD-MESSAGE";

export type DialogsActionsTypes = ReturnType<typeof AddMessageActionCreator>

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
}

export const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionsTypes): InitialStateType  => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage: MessageType = {
                id: new Date().getTime(),
                message: action.newMessageBody
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }
        default:
            return state
    }
}
type AddMessageType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}
export const AddMessageActionCreator = (newMessageBody: string) : AddMessageType => ({
    type: ADD_MESSAGE,
    newMessageBody: newMessageBody
}) as const

