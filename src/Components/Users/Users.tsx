import style from "./Users.module.css";
import UserAvatar from "../../assets/images/UserAvatar.jpeg";
import React from "react";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    getNewUserPage: (p: number) => void
    users: UserType[]
    followingInProgress: number []
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const Users: React.FC<UsersPropsType> = ({
                                                    totalUsersCount,
                                                    pageSize,
                                                    currentPage,
                                                    getNewUserPage,
                                                    users,
                                                    followingInProgress,
                                                    unfollow,
                                                    follow,
                                                }) => {

    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       getNewUserPage={getNewUserPage}/>
            <div>
                {users.map(u => {
                    return (
                        <User key={u.id} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow}
                              user={u}/>
                    )
                })
                }
            </div>
        </div>
    )
}