import React, {ChangeEvent, useState} from "react";
import {InitialStateType, PostsType} from "../../../redux/profile-reducer";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";


type MyPostsPropsType = {
    profilePage: InitialStateType
    // posts: Array<PostsType>
    // newPostText: string
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
}


export function MyPosts(props: MyPostsPropsType) {

    let state = props.profilePage

    let postsElements = state.posts
        .map((p) => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let onAddPost = () => {
        props.addPost();
        //props.dispatch(AddPostActionCreator(props.newPostText))
    };


    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.myPosts}>
            My posts
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={state.newPostText}/>
                </div>
                <button onClick={onAddPost}>Add post</button>
            </div>
            <div className={s.post}>
                new post
            </div>
            {postsElements}
        </div>
    )
}