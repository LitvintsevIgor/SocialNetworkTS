import React from "react";
import {ActionsTypes, PostsType} from "../../../redux/store";
import {AddPostActionCreator, UpdateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {Store} from "redux";


type MyPostsPropsType = {
    // posts: Array<PostsType>
    // newPostText: string
    // dispatch: (action: ActionsTypes) => void
    store: Store
}


export function MyPostsContainer (props: MyPostsPropsType) {

    let state = props.store.getState();

    let addPost = () => {
            props.store.dispatch(AddPostActionCreator(state.profilePage.newPostText))
    };


    let onPostChange = (text: string) => {
        props.store.dispatch(UpdateNewPostTextActionCreator(text))
    }

    return (
        <MyPosts updateNewPostText={onPostChange}
                 addPost={addPost}
                 posts={state.profilePage.posts}
                 newPostText={state.profilePage.newPostText}
        />
    )
}