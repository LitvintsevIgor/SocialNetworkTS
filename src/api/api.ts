import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "792fb186-796b-4fb1-b58b-aab163ce4b24"},
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const usersAPI = {
    async getUsers (currentPage: number, pageSize: number) {
        return await instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    async unfollow (userID: number) {
        return await instance.delete<CommonResponseType>(`follow/${userID}`)
    },
    async follow (userID: number) {
        return await instance.post<CommonResponseType>(`follow/${userID}`)
    }
}

export const authAPI = {
    async authMe () {
        return await instance.get(`auth/me`)
    },
    async loginMe (email: string, password: string, rememberMe: boolean = false) {
        return await instance.post(`auth/login`, {email, password, rememberMe})
    },
    async logoutMe () {
        return await instance.delete(`auth/login`)
    },
}

export const profileAPI = {
    async getProfile(userId: string) {
        return await instance.get(`profile/${userId}`)
    },
    async getStatus(userId: string) {
        return await instance.get(`profile/status/${userId}`)
    },
    async updateStatus(status: string) {
        return await instance.put(`profile/status`, {status: status})
    }
}

export type CommonResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}
