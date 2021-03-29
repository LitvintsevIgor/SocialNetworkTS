import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {UserReducer} from "./users-reducer";



let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: UserReducer
})

export type AllAppStateType = ReturnType<typeof rootReducer>
let store = createStore(rootReducer);

export type ReduxStoreType = typeof store
export type AppDispatch = typeof store.dispatch


export default store;
