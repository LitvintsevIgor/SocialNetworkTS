import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";



let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
})

export type AllAppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer);

export type ReduxStoreType = typeof store
export type AppDispatch = typeof store.dispatch


export default store;
