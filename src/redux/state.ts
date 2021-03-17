import {ProfileActionsTypes, profileReducer} from "./profile-reducer";
import {DialogsActionsTypes, dialogsReducer} from "./dialogs-reducer";

export type DialogsType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessageType>
    newMessageText: string
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type StateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}
export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsTypes) => void
}
export type ActionsTypes = ProfileActionsTypes | DialogsActionsTypes

let store: StoreType = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Петя"},
                {id: 2, name: "Ваня"},
                {id: 3, name: "Маня"},
                {id: 4, name: "Миша"},
                {id: 5, name: "Кола"},
            ],
            messages: [
                {id: 1, message: "Привет, как дела?"},
                {id: 2, message: "Хехей!"},
                {id: 3, message: "Как твой прогресс?"},
                {id: 4, message: "Какую музыку случаешь?"},
                {id: 5, message: "Как твоя собака?"},
            ],
            newMessageText: ""
        },
        profilePage: {
            posts: [
                {id: 1, message: "Hello, how are you?", likesCount: 23},
                {id: 2, message: "Its my first post", likesCount: 5}
            ],
            newPostText: ""
        }
    },
    _callSubscriber() {
        console.log("State was changed")
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; // (наблюдатель) - паттерн
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber()
    }
}
export default store;




