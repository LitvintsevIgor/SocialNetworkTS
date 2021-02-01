import React from "react";
import s from "./Post.module.css";


type MessagePropsType = {
    message: string,
    likesCount: number
}

export function Post(props: MessagePropsType) {

    return (
        <div className={s.item}>
            <img src="https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg" alt=""/>
            {props.message}
            <div>
                <span>{ props.likesCount } Likes</span>
            </div>
        </div>
    )
}