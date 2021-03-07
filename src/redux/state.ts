let rerenderEntireTree = () => {
    console.log("State was changed")
}

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
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type StateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
}

export let state: StateType = {
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
        ]
    },
    profilePage: {
        posts: [
            {id: 1, message: "Hello, how are you?", likesCount: 23},
            {id: 2, message: "Its my first post", likesCount: 5}
        ],
        newPostText: ""
    }
}

// window.state = state;

export const addPostToState = () => {
    const newPost: PostsType = {
        id: new Date().getTime(),
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ""
    rerenderEntireTree()
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree()
}

export const subscribe = (observer: () => void) =>  {
    rerenderEntireTree = observer; // (наблюдатель) - паттерн
}



