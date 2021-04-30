import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/redux-store";

import {
    follow,
    followSuccess, getUsers,
    InitialStateType,
    setCurrentPage,
    toggleFollowingInProgress, unfollow,
    unfollowSuccess,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";




export type UsersAPIComponentPropsType = {
    unfollowSuccess: (userId: number) => void
    // follow: (userId: number) => void

    // setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    // setUsersTotalCount: (totalCount: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: UserType[]
    isFetching: boolean
    // toggleIsFetching: (isFetching: boolean) => void
    followingInProgress: number[]
    // toggleFollowingInProgress: (isFetching: boolean, userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void // thunkCreator
    unfollow: (userId: number) => void // thunkCreator
}

export class UsersAPIComponent extends React.Component<UsersAPIComponentPropsType> {

    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.pageSize);   // dispatch thunkCreator, getUsers - thunkCreator
        // this.props.toggleIsFetching(true)
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(data.items)
        //         this.props.setUsersTotalCount(data.totalCount)
        //     })
    }

    getNewUserPage = (newPage: number) => {



        this.props.getUsers(newPage, this.props.pageSize);
        // this.props.toggleIsFetching(true)
        // this.props.setCurrentPage(newPage)
        //
        // usersAPI.getUsers(newPage, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(data.items)
        // })



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
                   followingInProgress={this.props.followingInProgress}
                   // toggleFollowingInProgress={this.props.toggleFollowingInProgress}
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
    followingInProgress: number[]
}


let mapStateToProps = (state: AllAppStateType): MapStatePropsType => {
    return {
        usersPage: state.usersPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        users: state.usersPage.users,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }

}


export const UsersContainer = connect(mapStateToProps,
    {
        followSuccess,
        unfollowSuccess,
        // setUsers,
        setCurrentPage,
        // setUsersTotalCount,
        // toggleIsFetching,
        // toggleFollowingInProgress,
        getUsers, // thunkCreator
        follow, // thunkCreator
        unfollow, // thunkCreator
    }

    )(UsersAPIComponent);