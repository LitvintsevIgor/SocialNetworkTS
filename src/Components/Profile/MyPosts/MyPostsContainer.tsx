import React from "react";
import {ActionsTypes, PostsType} from "../../../redux/store";
import {AddPostActionCreator, UpdateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {Store} from "redux";
import {ReduxStoreType} from "../../../redux/redux-store";
import { StoreContext } from "../../../StoreContext";


// type MyPostsPropsType = {
//     // posts: Array<PostsType>
//     // newPostText: string
//     // dispatch: (newText: sting) => void
//     store: ReduxStoreType
// }


export function MyPostsContainer () {

    return (
        <StoreContext.Consumer>
            {
            (store) => {
                let state = store.getState();

                let addPost = () => {
                    store.dispatch(AddPostActionCreator(state.profilePage.newPostText))
                };


                let onPostChange = (text: string) => {
                    store.dispatch(UpdateNewPostTextActionCreator(text))
                }
                return <MyPosts updateNewPostText={onPostChange}
                                addPost={addPost}
                                posts={store.getState().profilePage.posts}
                                newPostText={store.getState().profilePage.newPostText}
                />
            }

        }
        </StoreContext.Consumer>

    )
}