import {CommonResponseType, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";
import {updateObjectInArray} from "../utils/helpers/object-helpers";

export const FOLLOW = "USERS/FOLLOW"
export const UNFOLLOW = "USERS/UNFOLLOW"
export const SET_USERS = "USERS/SET_USERS"
export const SET_CURRENT_PAGE = "USERS/SET_CURRENT_PAGE"
export const SET_USERS_TOTAL_COUNT = "USERS/SET_USERS_TOTAL_COUNT"
export const TOGGLE_IS_FETCHING = "USERS/TOGGLE_IS_FETCHING"
export const TOGGLE_IS_FOLLOWING_PROGRESS = "USERS/TOGGLE_IS_FOLLOWING_PROGRESS"

let InitialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export const UserReducer = (state: InitialStateType = InitialState, action: UsersActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : [...state.followingInProgress.filter(id => id !== action.userID)]
            }
        default:
            return state
    }
}


// ACTIONS
export const followSuccess = (userId: number) => ({type: FOLLOW, userId} as const)
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: UserType[]) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setUsersTotalCount = (totalCount: number) => ({type: SET_USERS_TOTAL_COUNT, totalCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingInProgress = (isFetching: boolean, userID: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID} as const)

// TYPES
export type UsersActionType = ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingInProgress>

export type InitialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

export type UserAvatarType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    photos: UserAvatarType
    followed: boolean,
    name: string
    status: string
}


// THUNKS
export const requestUsers = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(setCurrentPage(page))
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items))
    dispatch(setUsersTotalCount(response.data.totalCount))
}

export const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userID: number) => Promise<AxiosResponse<CommonResponseType>>, actionCreator: (userId: number) => {type: "USERS/FOLLOW" | "USERS/UNFOLLOW", userId: number}) => {
    dispatch(toggleFollowingInProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: Dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
}

export const unfollow = (userId: number) => async (dispatch: Dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
}