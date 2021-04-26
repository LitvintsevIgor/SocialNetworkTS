import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/redux-store";

import {
    follow,
    InitialStateType,
    setCurrentPage,
    setUsers, setUsersTotalCount, toggleIsFetching,
    unfollow,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";



export type UsersAPIComponentPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setUsersTotalCount: (totalCount: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: UserType[]
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
}

export class UsersAPIComponent extends React.Component<UsersAPIComponentPropsType> {

    componentDidMount() {
        debugger;
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {

                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setUsersTotalCount(data.totalCount)
            })
    }


    getNewUserPage = (newPage: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(newPage)

        usersAPI.getUsers(newPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })



        // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${newPage}&count=${this.props.pageSize}`, {
        //     withCredentials: true
        // })
        //


    }

    render() {

        return <>
                {this.props.isFetching && <Preloader/>}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   getNewUserPage={this.getNewUserPage}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   users={this.props.users}
            />

        </>


    }
}



export type MapStatePropsType = {
    usersPage: InitialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    users: UserType[]
    isFetching: boolean
}


let mapStateToProps = (state: AllAppStateType): MapStatePropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        users: state.usersPage.users,
        isFetching: state.usersPage.isFetching
    }

}


export const UsersContainer = connect(mapStateToProps,
    {
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setUsersTotalCount,
        toggleIsFetching
    }

    )(UsersAPIComponent);