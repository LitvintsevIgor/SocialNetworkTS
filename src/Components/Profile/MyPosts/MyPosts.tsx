import React, {useState} from "react";
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostsType} from "../../../redux/state";


type MyPostsPropsType = {
    posts: Array<PostsType>
    addPostToState: () => void
    updateNewPostText: (newText: any) => void
    newPostText: string
}

export function MyPosts(props: MyPostsPropsType) {
    let postsElements = props.posts
        .map((p) => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        if (newPostElement.current) {               // проверка, сущесетвует ли вообще этот current
            props.addPostToState()
        }
    };

    let onPostChange = () => {
        if(newPostElement.current) {
            let text = newPostElement.current.value
            props.updateNewPostText(text)
        }
    }

    return (
        <div className={s.myPosts}>
            My posts
            <div>
                <div>
                    <textarea ref={newPostElement}
                              onChange={onPostChange}
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