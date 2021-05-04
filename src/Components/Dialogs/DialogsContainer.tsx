import React from "react";
import {
    AddMessageActionCreator,
    InitialStateType, MessageType,
    UpdateNewMessageTextActionCreator
} from "../../redux/dialogs-reducer";
import {AllAppStateType} from "../../redux/redux-store";
import {Dialogs, DialogsPropsType} from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";



// type DialogsPropsType = {
//     // state: AllAppStateType
//     // dispatch: (actions: any)=> void
//     store: ReduxStoreType
// }

// export function DialogsContainer() {
//     return (
//         <StoreContext.Consumer>
//              {
//             (store) => {
//                 let state = store.getState().dialogsPage;
//
//                 const onSendMessageClick = () => {
//                     store.dispatch(AddMessageActionCreator(state.newMessageText))
//                 }
//
//                 let onMessageChange = (text: string) => {
//                     store.dispatch(UpdateNewMessageTextActionCreator(text))
//                 }
//
//                 return <Dialogs updateNewMessageText={onMessageChange}
//                                 sendMessage={onSendMessageClick}
//                                 dialogsPage={state}
//                 />
//             }
//         }
//
//         </StoreContext.Consumer>
//     )
// }


export type MapStatePropsType = {
    dialogsPage: InitialStateType,
    // isAuth: boolean
}

export type MapDispatchPropsType = {
    updateNewMessageText: (text: string) => void
    sendMessage: () => void
}


let mapStateToProps = (state: AllAppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        // isAuth: state.auth.isAuthorized
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(UpdateNewMessageTextActionCreator(text))
        },
        sendMessage: () => {
            dispatch(AddMessageActionCreator())
        }

    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs)


export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);