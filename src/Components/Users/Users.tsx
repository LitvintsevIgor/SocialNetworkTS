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
    setCurrentPage: (pageNumber: number) => void
    setUsersTotalCount: (totalCount: number) => void
}

export class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
            this.props.setUsers(response.data.items)
            this.props.setUsersTotalCount(response.data.totalCount)
        })
    }


    getNewUserPage(newPage: number) {
        this.props.setCurrentPage(newPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${newPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        let pagesCount = Math.ceil(this.props.usersPage.totalUsersCount / this.props.usersPage.pageSize)

        let pages =[];

         for (let i = 1; i <= pagesCount; i ++) {
             pages.push(i)
         }

        return (
            <div>
               <div>
                   {pages.map( p => <span onClick={() => this.getNewUserPage(p)}
                                          className={ this.props.usersPage.currentPage === p ? style.selectedPage : ""}>{p}</span>)}
               </div>

                {this.props.usersPage.users.map(u => {
                        return (
                            <div key={u.id}>
                                <div className={style.avatar}>
                                    <img src={u.photos.small !== null ? u.photos.small : UserAvatar} alt="avatar"/>
                                </div>
                                <div>
                                    {u.followed
                                        ? <button onClick={() => {
                                            this.props.follow(u.id)
                                        }}>UNFOLLOW</button>
                                        : <button onClick={() => {
                                            this.props.unfollow(u.id)
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
}