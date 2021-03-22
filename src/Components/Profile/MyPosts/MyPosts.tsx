import React, {ChangeEvent, useState} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {ActionsTypes, PostsType} from "../../../redux/store";


type MyPostsPropsType = {
    posts: Array<PostsType>
    newPostText: string
    // dispatch: (action: ActionsTypes) => void
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
}


export function MyPosts(props: MyPostsPropsType) {
    let postsElements = props.posts
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
                              value={props.newPostText}/>
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