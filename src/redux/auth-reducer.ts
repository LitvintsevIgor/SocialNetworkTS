import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";


const SET_USER_LOGIN_DATA = "SET_USER_LOGIN_DATA";


export type InitialStateType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}

export const initialState = {
    id: 1,
    email: "",
    login: "",
    // isAuthorized: false
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: SetAuthUserDataACType) => {
    switch (action.type) {
        case SET_USER_LOGIN_DATA:
            return {
                ...state,
                ...action.payload,
                // isAuthorized: true
            }
        default:
            return state
    }
}

export type SetAuthUserDataACType = {
    type: typeof SET_USER_LOGIN_DATA
    payload: {
        id: number
        email: string
        login: string
        isAuth: boolean
    }

}

export const setAuthUserDataAC = (id: number, email: string, login: string, isAuth: boolean): SetAuthUserDataACType => ({
    type: SET_USER_LOGIN_DATA,
    payload: {id, email, login, isAuth}
})

// thunkCreator

export const getAuthUserData = () => {
    return (dispatch: Dispatch) => {

        authAPI.auth().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data  // вот здесь изменил
                dispatch(setAuthUserDataAC(id, email, login, true))
            }
        })
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {

        authAPI.login(email, password, rememberMe)

            .then(data => {
                debugger
                if (data.resultCode === 0) {
                    // @ts-ignore
                    dispatch(getAuthUserData())
                } else {
                    let message = data.messages[0]
                    dispatch(stopSubmit("login", {_error: message}))
                }
            })
    }
}

export const logout = () => {
    return (dispatch: Dispatch) => {

        authAPI.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserDataAC(1, "", "", false))
                }
            })
    }
}