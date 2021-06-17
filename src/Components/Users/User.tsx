import style from "./Users.module.css";
import UserAvatar from "../../assets/images/UserAvatar.jpeg";
import React from "react";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

export type UserPropsType = {
    followingInProgress: number []
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    user: UserType
}

export const User: React.FC<UserPropsType> = ({followingInProgress,
                                                  unfollow,
                                                  follow,
                                                  user
                                              }) => {

    return (
        <div>
            <div className={style.avatar}>
                <NavLink to={"/profile/" + user.id}>
                    <img src={user.photos.small !== null ? user.photos.small : UserAvatar} alt="avatar"/>
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  unfollow(user.id)
                              }
                              }>UNFOLLOW</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>FOLLOW</button>}
            </div>
            <div>
                <span>{user.name}</span>
            </div>
            <div>
                <span>{user.status}</span>
            </div>
            <div>
                <span>{"u.location.city"}</span>
            </div>
            <div>
                <span>{"u.location.country"}</span>
            </div>
        </div>
    )
}