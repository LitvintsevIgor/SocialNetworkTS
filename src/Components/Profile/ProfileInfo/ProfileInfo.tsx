import React from "react";
import s from "./ProfileInfo.module.css";


type ProfileInfoPropsType = {
    avatar: string
    description: string
}

export function ProfileInfo(props:ProfileInfoPropsType) {
    return (
        <div className={s.profileInfo}>
            <img
                src={props.avatar}
                alt=""/>
            <div className={s.description}>
                {props.description}
            </div>
        </div>
    )
};