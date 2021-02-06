import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";


export function MyPosts() {
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
            <Post message={"Hello, how are you?"} likesCount={23}/>
            <Post message={"Its my first post"} likesCount={5}/>
        </div>
    )
}