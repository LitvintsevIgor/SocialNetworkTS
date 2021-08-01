import {ProfileType} from "../Components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {authAPI, profileAPI} from "../api/api";
import {ProfileFormDataType} from "../Components/Profile/ProfileInfo/ProfileInfo";
import {ThunkAction} from "redux-thunk";
import {AllAppActionType, AllAppStateType} from "./redux-store";
import {StateType} from "./store";
import {stopSubmit} from "redux-form";

const ADD_POST = "PROFILE/ADD-POST";
const SET_USER_PROFILE = "PROFILE/SET_USER_PROFILE";
const GET_STATUS = "PROFILE/GET_STATUS";
const DELETE_POST = "PROFILE/DELETE_POST";
const CHANGE_PHOTO = "PROFILE/CHANGE_PHOTO";
const EDIT_PROFILE = "PROFILE/EDIT_PROFILE";
const PROFILE_UPDATE_SUCCESS = "PROFILE/PROFILE_UPDATE_SUCCESS";

let initialState = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 23},
        {id: 2, message: "Its my first post", likesCount: 5}
    ] as PostsType[],
    profile: {
        AboutMe: "",
        contacts: {},
        lookingForAJob: false,
        lookingForAJobDescription: "",
        fullName: "",
        userId: 0,
        photos: {}
    },
    status: "",
    profileUpdateSuccess: false
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
        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                profileUpdateSuccess: action.profileUpdateSuccess
            }
        case CHANGE_PHOTO:
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
export const editProfileDataAC = (profile: ProfileType) => ({type: EDIT_PROFILE, profile} as const)
export const changeProfileUpdateSuccessAC = (profileUpdateSuccess: boolean) => ({type: PROFILE_UPDATE_SUCCESS, profileUpdateSuccess} as const)

// TYPES
export type InitialStateType = typeof initialState
export type ProfileActionsTypes = ReturnType<typeof AddPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof changePhotoAC>
    | ReturnType<typeof editProfileDataAC>
    | ReturnType<typeof changeProfileUpdateSuccessAC>
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
    const response = await profileAPI.changePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(changePhotoAC(response.data.data.photos))
    }
}

export const editProfileDataTC = (formData: ProfileType): ThunkAction<void, AllAppStateType, unknown, AllAppActionType> => async (dispatch, getState) => {
    const userId = getState().auth.id
    const response = await profileAPI.editProfileData(formData)
    if (response.data.resultCode === 0) {
        dispatch(getProfileTC(userId.toString()))
        dispatch(changeProfileUpdateSuccessAC(false))
    } else{
        let message = response.data.messages[0]
        // let indexStrelki = message.indexOf('>')
        let field = message.slice(message.indexOf('>') + 1, -1).toLowerCase()
        dispatch(stopSubmit("Edit profile", { contacts: {[field]: message}}))
        dispatch(changeProfileUpdateSuccessAC(true))
    }
}