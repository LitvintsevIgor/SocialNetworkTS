import React, {ChangeEvent} from "react";
import s from "./Dialogs.module.css"
import {DialogItem} from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import {StoreType} from "../../redux/store";
import {AddMessageActionCreator, UpdateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import {Store} from "redux";
import {AllAppStateType, ReduxStoreType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";
import { StoreContext } from "../../StoreContext";



// type DialogsPropsType = {
//     // state: AllAppStateType
//     // dispatch: (actions: any)=> void
//     store: ReduxStoreType
// }

export function DialogsContainer() {
    return (
        <StoreContext.Consumer>
             {
            (store) => {
                let state = store.getState().dialogsPage;

                const onSendMessageClick = () => {
                    store.dispatch(AddMessageActionCreator(state.newMessageText))
                }

                let onMessageChange = (text: string) => {
                    store.dispatch(UpdateNewMessageTextActionCreator(text))
                }

                return <Dialogs updateNewMessageText={onMessageChange}
                                sendMessage={onSendMessageClick}
                                dialogsPage={state}
                />
            }
        }

        </StoreContext.Consumer>


    )
}