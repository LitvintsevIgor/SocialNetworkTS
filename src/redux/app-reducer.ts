import {Dispatch} from "redux";
import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AllAppActionType, AllAppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = "SET_USER_LOGIN_DATA";


export type InitialStateType = {
    initialized: boolean

}

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

// export type InitializedSuccessType = {
//     type: typeof INITIALIZED_SUCCESS
// }

export const InitializedSuccessAC = ()=> ({
    type: INITIALIZED_SUCCESS,
})

export type InitializedSuccessType = ReturnType<typeof InitializedSuccessAC>

// thunkCreator

export const InitializedSuccessTC = (): ThunkAction<void, AllAppStateType, unknown, AllAppActionType> =>
    (dispatch) => {

    let promis = dispatch(getAuthUserData())
    Promise.all([promis])
        .then( () => {
            dispatch(InitializedSuccessAC())
        } )
}