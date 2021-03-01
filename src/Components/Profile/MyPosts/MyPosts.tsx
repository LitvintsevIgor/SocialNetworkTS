import React, {useState} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostsType} from "../../../redux/state";



type MyPostsPropsType = {
    posts: Array<PostsType>
    addPostToState: (newPostMessage: string) => void
}

export function MyPosts(props: MyPostsPropsType) {
    let postsElements = props.posts
        .map((p) => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        if (newPostElement.current) {               // проверка, сущесетвует ли вообще этот current
            props.addPostToState(newPostElement.current.value)
            newPostElement.current.value = "";
        }
    };

    // let addPost = () => {
    //     if (newPostElement.current) {               // проверка, сущесетвует ли вообще этот current
    //         props.addPostToState(newPostElement.current.value)
    //         newPostElement.current.value = "";
    //     }
    // };


    return (
        <div className={s.myPosts}>
            My posts
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <button onClick={addPost} >Add post</button>
            </div>
            <div className={s.post}>
                new post
            </div>
            {postsElements}
        </div>
    )
}