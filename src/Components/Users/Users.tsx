import style from "./Users.module.css";
import UserAvatar from "../../assets/images/UserAvatar.jpeg";
import React from "react";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

export type UsersPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    getNewUserPage: (p: number) => void
    users: UserType[]
}

export const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (
        <div>
            <div>
                {pages.map(p => <span onClick={() => props.getNewUserPage(p)}
                                      className={props.currentPage === p ? style.selectedPage : ""}>{p}</span>)}
            </div>

            {props.users.map(u => {
                return (
                    <div key={u.id}>
                        <div className={style.avatar}>
                            <NavLink to={"/profile/" + u.id}>
                                <img src={u.photos.small !== null ? u.photos.small : UserAvatar} alt="avatar"/>
                            </NavLink>

                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {

                                    axios.delete(`https://social-network.samuraijs.com/api/1.0//follow/${u.id}`,
                                        {
                                            withCredentials: true,
                                            headers: {"API-KEY": "77376ca6-8140-4501-a63e-0618cf645ecb"}
                                        })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id)

                                            }
                                        })
                                }}>UNFOLLOW</button>
                                : <button onClick={() => {

                                    axios.post(`https://social-network.samuraijs.com/api/1.0//follow/${u.id}`,
                                        {},
                                        {
                                            withCredentials: true,
                                            headers: {"API-KEY": "77376ca6-8140-4501-a63e-0618cf645ecb"}
                                        })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(u.id)
                                                // props.follow(u.id)
                                            }
                                        })



                                }}>FOLLOW</button>}
                        </div>
                        <div>
                            <span>{u.name}</span>
                        </div>
                        <div>
                            <span>{u.status}</span>
                        </div>
                        <div>
                            <span>{"u.location.city"}</span>
                        </div>
                        <div>
                            <span>{"u.location.country"}</span>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}