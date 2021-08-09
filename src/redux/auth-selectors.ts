import {AllAppStateType} from "./redux-store";

export const selectIsAuth = (state: AllAppStateType) => {
    return state.auth.isAuth
}

export const selectCurrentUserLogin = (state: AllAppStateType) => {
    return state.auth.login
}
