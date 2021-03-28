import React from "react";
import {
    AddMessageActionCreator,
    InitialStateType, MessageType,
    UpdateNewMessageTextActionCreator
} from "../../redux/dialogs-reducer";
import {AllAppStateType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";



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
    dialogsPage: InitialStateType
}

export type MapDispatchPropsType = {
    updateNewMessageText: (text: string) => void
    sendMessage: () => void
}


let mapStateToProps = (state: AllAppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
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


export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);