import {ProfileType} from "../Components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const GET_STATUS = "GET_STATUS";
const DELETE_POST = "DELETE_POST";

export type ProfileActionsTypes = ReturnType<typeof AddPostActionCreator>
    | SetUserProfileType
    | GetStatusACType
    | DeletePostType

export type InitialStateType = typeof initialState

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

// export type ProfileType = {
//     aboutMe: string,
//     contacts: {
//         facebook: string,
//         website: null | string,
//         vk: string,
//         twitter: string,
//         instagram: string,
//         youtube: null | string,
//         github: string,
//         mainLink: null | string
//     },
//     lookingForAJob: boolean,
//     lookingForAJobDescription: string,
//     fullName: string,
//     userId: number,
//     photos: {
//         small: string,
//         large: string
//     }
// }

let initialState = {
    posts: [
        {id: 1, message: "Hello, how are you?", likesCount: 23},
        {id: 2, message: "Its my first post", likesCount: 5}
    ] as PostsType[],
    // newPostText: "",
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
        photos: {
            small: "",
            large: ""
        }
    },
    status: ""
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsTypes): InitialStateType => {

    switch (action.type) {
        case "DELETE_POST":
            return {...state, posts: state.posts.filter( (p) => p.id !== action.postId )}
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

export const AddPostActionCreator = (newPostBody: string) => ({
    type: ADD_POST,
    newPostBody: newPostBody
}) as const

export type SetUserProfileType = ReturnType<typeof setUserProfile>

export const setUserProfile = (profile: ProfileType) => ({
    type: SET_USER_PROFILE,
    profile
}) as const

export const getStatusAC = (status: string) => ({
    type: GET_STATUS,
    status
}) as const

export const deletePost = (postId: number) => ({
    type: DELETE_POST,
    postId
} as const)

type DeletePostType = ReturnType<typeof deletePost>

// thunkCreator

export const getProfileTC = (userId: string) => {

    return (dispatch: Dispatch<ProfileActionsTypes>) => {
        profileAPI.getProfile(userId).then(data => {
            dispatch(setUserProfile(data))
        })
    }
}

export const getStatusTC = (userId: string) => {
    return (dispatch: Dispatch<ProfileActionsTypes>) => {
        profileAPI.getStatus(userId).then(data => {
            dispatch(getStatusAC(data))
        })
    }
}

export type GetStatusACType = ReturnType<typeof getStatusAC>

export const updateStatusTC = (status: string) => {
    return (dispatch: Dispatch<ProfileActionsTypes>) => {
        profileAPI.updateStatus(status)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getStatusAC(status))
                }

        })
    }
}