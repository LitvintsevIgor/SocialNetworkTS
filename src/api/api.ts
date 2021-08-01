import axios from "axios";
import {photoFileType} from "../redux/profile-reducer";
import {ProfileType} from "../Components/Profile/ProfileContainer";
import {ProfileFormDataType} from "../Components/Profile/ProfileInfo/ProfileInfo";

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
    async loginMe (email: string, password: string, rememberMe: boolean = false, captcha: string) {
        return await instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    async logoutMe () {
        return await instance.delete(`auth/login`)
    },
}

export const securityAPI = {
    async getCaptchaUrl () {
        return await instance.get(`/security/get-captcha-url`)
    }
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
    },
    async changePhoto(file: photoFileType) {
        const bodyFormData = new FormData();
        // @ts-ignore
        bodyFormData.append('image', file);
        return await instance.put(`/profile/photo`, bodyFormData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
    },
    async editProfileData(profile: ProfileType) {
        return await instance.put('profile', profile)
    }
}

export type CommonResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}
