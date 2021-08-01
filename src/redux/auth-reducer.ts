import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AllAppActionType, AllAppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";


const SET_USER_LOGIN_DATA = "AUTH/SET_USER_LOGIN_DATA";
const GET_CAPTCHA_URL_SUCCESS = "AUTH/GET_CAPTCHA_URL_SUCCESS";

export const initialState = {
    id: 1,
    email: "",
    login: "",
    isAuth: false,
    captchaUrl: null as null | string
}

export const authReducer = (state: InitialStateType = initialState, action: SetAuthUserDataACType): InitialStateType => {
    switch (action.type) {
        case SET_USER_LOGIN_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

// TYPES
export type InitialStateType = typeof initialState
export type SetAuthUserDataACType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof getCaptchaUrlAC>

// ACTION
export const setAuthUserDataAC = (id: number, email: string, login: string, isAuth: boolean) => ({
    type: SET_USER_LOGIN_DATA,
    payload: {id, email, login, isAuth}
} as const)

export const getCaptchaUrlAC = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
} as const)


// THUNKS
export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authAPI.authMe()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkAction<void, AllAppStateType, unknown, AllAppActionType> => async (dispatch) => {
    const response = await authAPI.loginMe(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages[0]
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = () => async (dispatch: Dispatch<SetAuthUserDataACType>) => {
    const response = await authAPI.logoutMe()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(1, "", "", false))
    }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
        dispatch(getCaptchaUrlAC(response.data.url))
}