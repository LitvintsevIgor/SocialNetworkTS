

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