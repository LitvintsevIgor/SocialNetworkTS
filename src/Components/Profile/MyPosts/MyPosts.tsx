import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";


export function MyPosts(props: any) {
    debugger;
    return (
        <div>
            My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>

            <div>
                new post
            </div>
            <Post message={"Hello, how are you?"} likesCount={23}/>
            <Post message={"Its my first post"} likesCount={5}/>
        </div>
    )
}