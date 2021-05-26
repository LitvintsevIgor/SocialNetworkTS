import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "792fb186-796b-4fb1-b58b-aab163ce4b24"},
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const usersAPI = {

    getUsers (currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then( response => {
                return response.data
            })
    },

    unfollow (userID: number) {
        return instance.delete(`unfollow/${userID}`)
            .then( response => {
                return response.data
            })
    },

    follow (userID: number) {
        return instance.post(`follow/${userID}`)
            .then( response => {
                return response.data
            })
    }
}

export const authAPI = {

    auth () {
        return instance.get(`auth/me`)
            .then( response => {
                return response.data
            })
    },

    login (email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then( response => {
                return response.data
            })
    },
    logout () {
        return instance.delete(`auth/login`)
            .then( response => {
                return response.data
            })
    },


}

export const profileAPI = {

    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },

    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
            .then(response => {
                return response.data
            })
    }

}