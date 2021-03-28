import React from "react";
import {AddPostActionCreator, InitialStateType, UpdateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {Dispatch} from "redux";
import {AllAppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";


// type MyPostsPropsType = {
//     // posts: Array<PostsType>
//     // newPostText: string
//     // dispatch: (newText: sting) => void
//     store: ReduxStoreType
// }


// export function MyPostsContainer () {
//
//     return (
//         <StoreContext.Consumer>
//             {
//             (store) => {
//                 let state = store.getState();
//
//                 let addPost = () => {
//                     store.dispatch(AddPostActionCreator(state.profilePage.newPostText))
//                 };
//
//
//                 let onPostChange = (text: string) => {
//                     store.dispatch(UpdateNewPostTextActionCreator(text))
//                 }
//                 return <MyPosts updateNewPostText={onPostChange}
//                                 addPost={addPost}
//                                 posts={store.getState().profilePage.posts}
//                                 newPostText={store.getState().profilePage.newPostText}
//                 />
//             }
//
//         }
//         </StoreContext.Consumer>
//
//     )
// }

export type MapStatePropsType = {
    profilePage: InitialStateType
}

export type MapDispatchPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
}

let mapStateToProps = (state: AllAppStateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: () => {
            dispatch(AddPostActionCreator())
        },
        updateNewPostText: (text: string) => {
            dispatch(UpdateNewPostTextActionCreator(text))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)


















