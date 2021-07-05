import {ProfileType} from "../Components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

const ADD_POST = "PROFILE/ADD-POST";
const SET_USER_PROFILE = "PROFILE/SET_USER_PROFILE";
const GET_STATUS = "PROFILE/GET_STATUS";
const DELETE_POST = "PROFILE/DELETE_POST";
const CHANGE_PHOTO = "PROFILE/CHANGE_PHOTO";

let initialState = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 23},
        {id: 2, message: "Its my first post", likesCount: 5}
    ] as PostsType[],
    profile: {
        aboutMe: "",
        contacts: {
            facebook: "",
            website: "",
            vk: "",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "",
            mainLink: ""
        },
        lookingForAJob: false,
        lookingForAJobDescription: "",
        fullName: "",
        userId: 0,
        photos: {}
    },
    status: ""
}

export type photoFileType = {
    lastModified: number
    lastModifiedDate?: string
    name: string
    size: number
    type: string
    webkitRelativePath?: string
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsTypes): InitialStateType => {
    switch (action.type) {
        case CHANGE_PHOTO:
            debugger
            return {...state, profile: {...state.profile, photos: action.file}}
        case DELETE_POST:
            return {...state, posts: state.posts.filter((p) => p.id !== action.postId)}
        case ADD_POST:
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: action.newPostBody,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case GET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}


// ACTIONS
export const AddPostActionCreator = (newPostBody: string) => ({type: ADD_POST, newPostBody: newPostBody} as const)
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const getStatusAC = (status: string) => ({type: GET_STATUS, status} as const)
export const deletePost = (postId: number) => ({type: DELETE_POST, postId} as const)
export const changePhotoAC = (file: photoFileType) => ({type: CHANGE_PHOTO, file} as const)

// TYPES
export type InitialStateType = typeof initialState
export type ProfileActionsTypes = ReturnType<typeof AddPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof changePhotoAC>
export type PostsType = {
    id: number
    message: string
    likesCount: number
}

// THUNKS
export const getProfileTC = (userId: string) => async (dispatch: Dispatch<ProfileActionsTypes>) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatusTC = (userId: string) => async (dispatch: Dispatch<ProfileActionsTypes>) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(getStatusAC(response.data))
}

export const updateStatusTC = (status: string) => async (dispatch: Dispatch<ProfileActionsTypes>) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatusAC(status))
    }
}

export const changePhotoTC = (file: photoFileType) => async (dispatch: Dispatch<ProfileActionsTypes>) => {
    debugger
    const response = await profileAPI.changePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(changePhotoAC(response.data.data.photos))
    }
}