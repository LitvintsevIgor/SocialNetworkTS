import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AllAppActionType, AllAppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = "APP/SET_USER_LOGIN_DATA";

export const initialState = {
  initialized: false
}

export const AppReducer = (state: InitialStateType = initialState, action: InitializedSuccessType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


// ACTION
export const InitializedSuccessAC = ()=> ({type: INITIALIZED_SUCCESS} as const)

// TYPES
export type InitializedSuccessType = ReturnType<typeof InitializedSuccessAC>
export type InitialStateType = typeof initialState

// THUNK
export const InitializedSuccessTC = (): ThunkAction<void, AllAppStateType, unknown, AllAppActionType> =>
    (dispatch) => {

    let promis = dispatch(getAuthUserData())
    Promise.all([promis])
        .then( () => {
            dispatch(InitializedSuccessAC())
        } )
}
