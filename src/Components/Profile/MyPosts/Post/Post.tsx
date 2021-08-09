import React from "react";
import s from "./Post.module.css";
import {Avatar, Comment, Tooltip} from 'antd';


type MessagePropsType = {
    id: number
    message: string
    likesCount: number
}

export function Post(props: MessagePropsType) {

    return (
        <>
            <Comment
                // actions={actions}
                author={<a>Han Solo</a>}
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }
                content={
                    <p>
                        {props.message}
                    </p>
                }
                // datetime={
                //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                //         <span>{moment().fromNow()}</span>
                //     </Tooltip>
                // }
            />
        </>
    )
}

// export function Post(props: MessagePropsType) {
//
//     return (
//         <div className={s.item}>
//             <img src="https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg" alt=""/>
//             {props.message}
//             <div>
//                 <span>Likes</span> {props.likesCount}
//             </div>
//         </div>
//     )
// }