import React from "react";
import {
    AddMessageActionCreator,
    InitialStateType
} from "../../redux/dialogs-reducer";
import {AllAppStateType} from "../../redux/redux-store";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";


export type MapStatePropsType = {
    dialogsPage: InitialStateType,
    // isAuth: boolean
}

export type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}


let mapStateToProps = (state: AllAppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(AddMessageActionCreator(newMessageBody))
        }

    }
}

export  default compose<React.ComponentType> (
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);