import {ProfileType} from "../Components/Profile/ProfileContainer";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW_POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

export type ProfileActionsTypes = ReturnType<typeof AddPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>
    | ReturnType<typeof setUserProfile>

export type InitialStateType = typeof initialState

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

let initialState = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 23},
        {id: 2, message: "Its my first post", likesCount: 5}
    ] as PostsType[],
    newPostText: "",
    profile: null
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            }
            // state.posts.push(newPost)
            // state.newPostText = ""
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
            // state.newPostText = action.newText
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }
}

export const AddPostActionCreator = () => ({
    type: ADD_POST,
}) as const
export const UpdateNewPostTextActionCreator = (newText: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: newText
}) as const

export const setUserProfile = (profile: null) => ({
    type: SET_USER_PROFILE,
    profile
}) as const