import {Dispatch} from "redux";
import {authAPI} from "../api/api";


const SET_USER_LOGIN_DATA = "SET_USER_LOGIN_DATA";



export type InitialStateType = {
    id: number
    email: string
    login: string
    isAuthorized: boolean
}

export const initialState = {
    id: 1,
    email: "",
    login: "",
    isAuthorized: false
}

export const authReducer = (state: InitialStateType = initialState, action: SetAuthUserDataACType) => {
    switch (action.type) {
        case SET_USER_LOGIN_DATA:
            return {
                ...state,
                ...action.data,
                isAuthorized: true
            }
        default:
            return state
    }
}

export type SetAuthUserDataACType = {
    type: typeof SET_USER_LOGIN_DATA
    data: {
        id: number
        email: string
        login: string
    }

}

export const setAuthUserDataAC = (id: number, email: string, login: string): SetAuthUserDataACType => ({type: SET_USER_LOGIN_DATA, data: {id, email, login}})

// thunkCreator

export const getAuthUserData = () => {

    return (dispatch: Dispatch) => {

        authAPI.auth().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserDataAC(id, email, login))
            }
        })

    }

}