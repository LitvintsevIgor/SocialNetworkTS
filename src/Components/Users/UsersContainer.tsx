import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/redux-store";

import {
    follow,
    followSuccess, requestUsers,
    InitialStateType,
    setCurrentPage,
    unfollow,
    unfollowSuccess,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersPage
} from "../../redux/users-selectors";




export type UsersAPIComponentPropsType = {
    unfollowSuccess: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: UserType[]
    isFetching: boolean
    followingInProgress: number[]
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export class UsersAPIComponent extends React.Component<UsersAPIComponentPropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize);
    }

    getNewUserPage = (newPage: number) => {
        const {pageSize} = this.props
        this.props.requestUsers(newPage, pageSize);
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
        usersPage: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        users: getUsers(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType> (
    withAuthRedirect,
    connect(mapStateToProps,
            {
                followSuccess,
                unfollowSuccess,
                setCurrentPage,
                requestUsers,
                follow,
                unfollow
            }

    ))
(UsersAPIComponent);