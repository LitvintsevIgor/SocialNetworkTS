import {ActionsTypes, PostsType, ProfilePageType} from "./state";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW_POST-TEXT";

export type ProfileActionsTypes = ReturnType<typeof AddPostActionCreator>
    | ReturnType<typeof UpdateNewPostTextActionCreator>


export const profileReducer = (state: ProfilePageType, action: ActionsTypes) => {

    switch (action.type) {
        case ADD_POST:
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ""
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export const AddPostActionCreator = (newPostText: string) => ({
    type: ADD_POST,
    newPost: newPostText
}) as const
export const UpdateNewPostTextActionCreator = (newText: string)  => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: newText
}) as const