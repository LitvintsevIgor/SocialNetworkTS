import {connect} from "react-redux";
import {Users} from "./Users";
import {AllAppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, InitialStateType, setUsersAC, unfollowAC, UserType} from "../../redux/users-reducer";


export type MapStatePropsType = {
    usersPage: InitialStateType
}

export type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
}

let mapStateToProps = (state: AllAppStateType): MapStatePropsType => {
    return {
        usersPage: state.usersPage
    }

}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    debugger
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        }
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);