import {AllAppStateType} from "./redux-store";
import {createSelector} from "reselect";

const getUsersSelector = (state: AllAppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter( u  => true);
})


export const getUsersPage = (state: AllAppStateType) => {
    return state.usersPage
}

export const getPageSize = (state: AllAppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AllAppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AllAppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AllAppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AllAppStateType) => {
    return state.usersPage.followingInProgress
}