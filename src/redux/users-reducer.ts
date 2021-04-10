export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const SET_USERS = "SET_USERS"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT"

export type UsersActionType = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>

export type UserLocationType = {
    city: string
    country: string
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

export type InitialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}


let InitialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 4
}


export const UserReducer = (state: InitialStateType = InitialState, action: UsersActionType): InitialStateType => {
    debugger
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        ////

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
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
        default:
            return state
    }
}

export type followACType = {
    type: typeof FOLLOW,
    userId: number
}

export const followAC = (userId: number): followACType => (
    {type: FOLLOW, userId}
) as const

export type UnfollowACType = {
    type: typeof UNFOLLOW,
    userId: number
}

export const unfollowAC = (userId: number): UnfollowACType => (
    {type: UNFOLLOW, userId}
) as const

export type SetUsersACType = {
    type: typeof SET_USERS
    users: UserType[]
}

export const setUsersAC = (users: UserType[]): SetUsersACType => (
    {type: SET_USERS, users}
) as const


export type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number

}

export const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => (
    {type: SET_CURRENT_PAGE, currentPage}
) as const

export type SetUsersTotalCountACType = {
    type: typeof SET_USERS_TOTAL_COUNT
    totalCount: number

}

export const setUsersTotalCountAC = (totalCount: number): SetUsersTotalCountACType => (
    {type: SET_USERS_TOTAL_COUNT, totalCount}
) as const