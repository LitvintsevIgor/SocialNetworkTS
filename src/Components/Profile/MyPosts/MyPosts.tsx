import React from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostsType} from "../../../index";



type MyPostsPropsType = {
    posts: Array<PostsType>
}

export function MyPosts(props: MyPostsPropsType) {
    let postsElements = props.posts
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