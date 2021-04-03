import React from "react";
import {InitialStateType, UserType} from "../../redux/users-reducer";
import style from "./Users.module.css"
import axios from "axios";
import UserAvatar from "../../assets/images/UserAvatar.jpeg"

export type UsersPropsType = {
    usersPage: InitialStateType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
}


export const Users = (props: UsersPropsType) => {
    if (props.usersPage.users.length === 0) {

        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {

            props.setUsers(response.data.items)
        })

        // props.setUsers(
        //     [
        //         {
        //             id: 0,
        //             avatar: "https://meragor.com/files/styles//ava_800_800_wm/lev-na-avu-062.jpg",
        //             followed: true,
        //             firstName: "Anton",
        //             status: "You are not alone",
        //             location: {city: "Voronezh", country: "Russia"}
        //         },
        //         {
        //             id: 1,
        //             avatar: "https://meragor.com/files/styles//ava_800_800_wm/lev-na-avu-062.jpg",
        //             followed: false,
        //             firstName: "Ivan",
        //             status: "Everything is ok",
        //             location: {city: "Rostov", country: "Russia"}
        //         },
        //         {
        //             id: 2,
        //             avatar: "https://meragor.com/files/styles//ava_800_800_wm/lev-na-avu-062.jpg",
        //             followed: true,
        //             firstName: "Petr",
        //             status: "I am sleeping",
        //             location: {city: "Moscow", country: "Russia"}
        //         },
        //     ]
        // )
    }

    let state = props.usersPage

    return (
        <div>

            {
                state.users.map(u => {
                    return (
                        <div key={u.id}>
                            <div className={style.avatar}>
                                <img src={u.photos.small !== null ? u.photos.small : UserAvatar} alt="avatar"/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        props.follow(u.id)
                                    }}>UNFOLLOW</button>
                                    : <button onClick={() => {
                                        props.unfollow(u.id)
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

