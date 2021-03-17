const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW_POST-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

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
export type ActionsTypes = ReturnType<typeof AddPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>
    | ReturnType<typeof AddMessageActionCreator>
    | ReturnType<typeof UpdateNewMessageTextActionCreator>



export const AddPostActionCreator = (newPostText: string) => ({
        type: ADD_POST,
        newPost: newPostText
}) as const

export const UpdateNewPostTextActionCreator = (newText: string)  => ({
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
}) as const

export const AddMessageActionCreator = (newMessageText: string) => ({
        type: ADD_MESSAGE,
        newPost: newMessageText
}) as const

export const UpdateNewMessageTextActionCreator = (newText: string) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText: newText
}) as const



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
        if (action.type === ADD_POST) {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ""
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber()
        } else if (action.type === ADD_MESSAGE) {
            const newMessage = {
                id: new Date().getTime(),
                message: this._state.dialogsPage.newMessageText
            }
            this._state.dialogsPage.messages.push(newMessage)
            this._state.dialogsPage.newMessageText = ""
            this._callSubscriber()
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.newMessageText
            this._callSubscriber()
        }
    }
}
export default store;




