import style from "./Users.module.css";
import UserAvatar from "../../assets/images/UserAvatar.jpeg";
import React from "react";
import {follow, UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

export type UsersPropsType = {
    // follow: (userId: number) => void
    // unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    getNewUserPage: (p: number) => void
    users: UserType[]
    followingInProgress: number []
    // toggleFollowingInProgress: (isFetching: boolean, userID: number) => void
    follow: (userId: number) => void // thunkCreator
    unfollow: (userId: number) => void // thunkCreator
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
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {

                                              props.unfollow(u.id)

                                              // props.toggleFollowingInProgress(true, u.id)
                                              // usersAPI.unfollow(u.id).then(data => {
                                              //     if (data.resultCode === 0) {
                                              //         props.unfollow(u.id)
                                              //     }
                                              //     props.toggleFollowingInProgress(false, u.id)
                                              // })


                                          }
                                          }>UNFOLLOW</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => {


                                        props.follow(u.id)
                                    // props.toggleFollowingInProgress(true, u.id)
                                    // usersAPI.follow(u.id).then(data => {
                                    //     if (data.resultCode === 0) {
                                    //         props.follow(u.id)
                                    //     }
                                    //     props.toggleFollowingInProgress(false, u.id)
                                    // })


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