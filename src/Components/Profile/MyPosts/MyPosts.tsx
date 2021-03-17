import React, {ChangeEvent, useState} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {ActionsTypes, AddPostActionCreator, PostsType, UpdateNewPostTextActionCreator} from "../../../redux/state";


type MyPostsPropsType = {
    posts: Array<PostsType>
    // addPostToState: () => void
    // updateNewPostText: (newText: string) => void
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}


export function MyPosts(props: MyPostsPropsType) {
    let postsElements = props.posts
        .map((p) => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let addPost = () => {
            // props.addPostToState()
            //props.dispatch({ type: "ADD-POST", newPost: props.newPostText })
            props.dispatch(AddPostActionCreator(props.newPostText))
    };


    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // props.updateNewPostText(e.currentTarget.value)
        //props.dispatch({type: "UPDATE-NEW_POST-TEXT", newText: e.currentTarget.value })
        props.dispatch(UpdateNewPostTextActionCreator(e.currentTarget.value))
    }

    return (
        <div className={s.myPosts}>
            My posts
            <div>
                <div>
                    <textarea onChange={onPostChange}
                              value={props.newPostText}/>
                </div>
                <button onClick={addPost}>Add post</button>
            </div>
            <div className={s.post}>
                new post
            </div>
            {postsElements}
        </div>
    )
}