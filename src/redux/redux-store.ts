import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {UserReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: UserReducer,
    auth: authReducer
})

export type AllAppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer);


// @ts-ignore
window.store = store;

export type ReduxStoreType = typeof store
export type AppDispatch = typeof store.dispatch


export default store;
