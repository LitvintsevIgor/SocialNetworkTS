import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";


export function MyPosts() {

    let posts = [
        {id: 1, message: "Hello, how are you?", likesCount: 23},
        {id: 2, message: "Its my first post", likesCount: 5}
    ]

    let postsElements = posts
        .map((p) => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    return (
        <div className={s.myPosts}>
            My posts
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <button>Add post</button>
            </div>
            <div className={s.post}>
                new post
            </div>
            {postsElements}
        </div>
    )
}