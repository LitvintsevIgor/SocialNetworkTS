import {connect} from "react-redux";
import {AllAppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {
    follow,
    InitialStateType,
    setCurrentPage,
    setUsers, setUsersTotalCount, toggleIsFetching,
    unfollow,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";


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
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            })
    }


    getNewUserPage = (newPage: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(newPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${newPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
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

// export type MapDispatchPropsType = {
//     follow: (userId: number) => void
//     unfollow: (userId: number) => void
//     setUsers: (users: UserType[]) => void
//     setCurrentPage: (currentPage: number) => void
//     setUsersTotalCount: (totalCount: number) => void
//     toggleIsFetching: (isFetching: boolean) => void
// }

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
// let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users: UserType[]) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setUsersTotalCount: (totalCount: number) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


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