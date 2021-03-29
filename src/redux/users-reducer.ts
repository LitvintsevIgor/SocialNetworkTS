export const FOLLOW = "FOLLOW"
export const UNFOLLOW = "UNFOLLOW"
export const SET_USERS = "SET_USERS"

export type UsersActionType = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>

export type UserLocationType = {
    city: string
    country: string
}

export type UserType = {
    id: number
    avatar: string
    followed: boolean,
    firstName: string
    status: string
    location: UserLocationType
}

export type InitialStateType = {
    users: UserType[]
}


let InitialState: InitialStateType = {
    users: []
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
        case "SET_USERS":
            return {
                ...state,
                users: [...state.users, ...action.users]
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
    type: typeof SET_USERS,
    users: UserType[]
}

export const setUsersAC = (users: UserType[]): SetUsersACType => (
    {type: SET_USERS, users}
) as const