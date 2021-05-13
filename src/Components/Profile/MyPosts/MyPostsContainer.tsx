import React from "react";
import {AddPostActionCreator, InitialStateType} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {Dispatch} from "redux";
import {AllAppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";


export type MapStatePropsType = {
    profilePage: InitialStateType
}

export type MapDispatchPropsType = {
    addPost: (newPostBody: string) => void
}

let mapStateToProps = (state: AllAppStateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (newPostBody) => {
            dispatch(AddPostActionCreator(newPostBody))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


















